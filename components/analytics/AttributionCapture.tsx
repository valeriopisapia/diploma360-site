// components/analytics/AttributionCapture.tsx
'use client'

import { useEffect } from 'react'
import { captureAttribution } from '@/lib/attribution'

/**
 * Runs once per page load, on every route, to persist ad-click identifiers
 * (gclid/utm/…) from the landing URL into the mkt_attr cookie before the user
 * navigates or submits a lead. No UI.
 */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution()
  }, [])
  return null
}
