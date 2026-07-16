'use client'
import { usePathname } from 'next/navigation'
import { brand } from '@/lib/brand'

export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // Schoolr is a single self-contained page with its own header/footer.
  if (brand.id === 'schoolr') return null
  if (pathname?.startsWith('/lp')) return null
  return <>{children}</>
}
