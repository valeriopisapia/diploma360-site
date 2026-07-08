'use client'

/**
 * Reveal-on-scroll + number-counter motion primitives.
 *
 * Reimplements (idiomatic React, no jQuery, no global DOM scanning) the
 * behavior of the reference's inline motion script:
 *   materiale/consegna-valerio 2/SiteHeader.dc.html (<script> inside <helmet>)
 * — the reference auto-hides every <section> then reveals it via
 * IntersectionObserver, and auto-detects large stat numbers ("+5.000", "97%",
 * "150+") to count them up on view. Here that becomes two explicit,
 * composable pieces instead of a global scan: <Reveal> to wrap a
 * section/card, and <Counter value="…"/> to wrap a stat number — a cleaner
 * mapping onto React's component model than replicating the auto-detection.
 *
 * Safe by default: everything renders at its FINAL, visible state. Only once
 * an effect confirms IntersectionObserver support AND the user has NOT
 * requested reduced motion do we flip to a "hidden/zeroed, waiting to
 * reveal" state — so a script that never runs (or prefers-reduced-motion)
 * never leaves content invisible or stuck at 0.
 */

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

function prefersReducedMotion(): boolean {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

/**
 * useReveal — reveal-on-scroll hook. Returns a ref to attach to the element
 * and whether it should currently render in its final ("visible") state.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      return // no-op: stays visible
    }

    setVisible(false)
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { ref, visible } as const
}

interface RevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  /** Element/tag to render, e.g. "section" | "div" | "li". Default "div". */
  as?: ElementType
}

/** <Reveal as="section">…</Reveal> — fade + slide-up wrapper driven by useReveal(). */
export function Reveal({ as: Tag = 'div', children, style, ...rest }: RevealProps) {
  const { ref, visible } = useReveal()
  return (
    <Tag
      ref={ref}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition:
          'opacity .6s cubic-bezier(.22,.61,.36,1), transform .6s cubic-bezier(.22,.61,.36,1)',
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// ---------------------------------------------------------------------------
// Counter — animated count-up, ported from the same reference script.
// ---------------------------------------------------------------------------

interface ParsedCounter {
  prefix: string
  suffix: string
  target: number
  decimals: number
  thousands: boolean
}

// Matches the same stat-number shapes the reference auto-detected:
// "+5.000", "97%", "150+", "3.000"…
const COUNTER_RE = /^([+]?)(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?)([%+]?)$/

function parseCounterValue(raw: string): ParsedCounter | null {
  const trimmed = raw.trim()
  const m = COUNTER_RE.exec(trimmed)
  if (!m) return null
  const prefix = m[1] ?? ''
  const suffix = m[3] ?? ''
  const core = trimmed.replace(/^[+]/, '').replace(/[%+]$/, '')
  const thousands = /\d\.\d{3}(\D|$)/.test(core)
  const normalized = (thousands ? core.replace(/\./g, '') : core).replace(',', '.')
  const target = parseFloat(normalized)
  if (Number.isNaN(target)) return null
  const decMatch = core.match(/[.,](\d+)$/)
  const decimals =
    decMatch && !(thousands && decMatch[1].length === 3) ? decMatch[1].length : 0
  return { prefix, suffix, target, decimals, thousands }
}

function formatCounterValue(v: number, parsed: ParsedCounter): string {
  let s: string
  if (parsed.decimals > 0) {
    s = v.toFixed(parsed.decimals).replace('.', ',')
  } else {
    s = Math.round(v).toString()
    if (parsed.thousands) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
  return parsed.prefix + s + parsed.suffix
}

interface CounterProps {
  /** Final display value, e.g. "+5.000", "97%", "150+". Rendered verbatim if
   *  it doesn't match a countable number shape. */
  value: string
  className?: string
  durationMs?: number
}

/** <Counter value="+5.000"/> — counts up from 0 once scrolled into view. */
export function Counter({ value, className, durationMs = 1000 }: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    setDisplay(value)
    const el = ref.current
    if (!el) return

    const parsed = parseCounterValue(value)
    if (
      prefersReducedMotion() ||
      !parsed ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return // no-op: stays at the final value
    }

    let raf = 0
    let started = false

    const step = (start: number, ts: number) => {
      const p = Math.min((ts - start) / durationMs, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(formatCounterValue(parsed.target * eased, parsed))
      if (p < 1) raf = requestAnimationFrame((next) => step(start, next))
      else setDisplay(value)
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true
            setDisplay(formatCounterValue(0, parsed))
            raf = requestAnimationFrame((first) => step(first, first))
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, durationMs])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
