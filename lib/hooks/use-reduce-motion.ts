// lib/hooks/use-reduce-motion.ts
'use client'

import { useEffect, useState } from 'react'

/**
 * Hook to detect if user prefers reduced motion
 * Disables heavy animations on slow devices or accessibility preferences
 */
export function useReduceMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for user preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  return prefersReducedMotion
}

/**
 * Hook to check if device is on slow network
 * Disables animations on 2G/3G networks
 */
export function useIsSlowDevice() {
  const [isSlowDevice, setIsSlowDevice] = useState(false)

  useEffect(() => {
    const connection = (navigator as any).connection
    if (!connection) return

    const updateDeviceSpeed = () => {
      const effectiveType = connection.effectiveType
      const isSlow = effectiveType === '2g' || effectiveType === '3g'
      setIsSlowDevice(isSlow)
    }

    updateDeviceSpeed()
    connection.addEventListener('change', updateDeviceSpeed)
    return () => connection.removeEventListener('change', updateDeviceSpeed)
  }, [])

  return isSlowDevice
}

/**
 * Determines if animations should be disabled
 * Factors: reduced motion preference, slow device, viewport size
 */
export function useShouldReduceAnimations() {
  const prefersReducedMotion = useReduceMotion()
  const isSlowDevice = useIsSlowDevice()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Disable animations if: user prefers reduced motion, on slow device, or on mobile
  return prefersReducedMotion || isSlowDevice || isMobile
}
