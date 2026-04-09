// lib/hooks/use-lazy-load.ts
'use client'

import { useEffect, useRef, useState, RefObject } from 'react'

/**
 * Hook for lazy loading components/images when they enter the viewport
 * Improves initial page load by deferring non-critical content
 */
export function useLazyLoad(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [options])

  return { ref, isVisible }
}

/**
 * Hook for prefetching links on hover for faster navigation
 */
export function usePrefetch(href: string) {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [href])
}

/**
 * Hook to detect slow network speed and adjust loading strategy
 */
export function useNetworkStatus() {
  const [effectiveType, setEffectiveType] = useState('4g')
  const [saveData, setSaveData] = useState(false)

  useEffect(() => {
    const connection = (navigator as any).connection || 
                       (navigator as any).mozConnection ||
                       (navigator as any).webkitConnection

    if (!connection) return

    setEffectiveType(connection.effectiveType)
    setSaveData(connection.saveData)

    const handleChange = () => {
      setEffectiveType(connection.effectiveType)
      setSaveData(connection.saveData)
    }

    connection.addEventListener('change', handleChange)
    return () => connection.removeEventListener('change', handleChange)
  }, [])

  const isSlowNetwork = effectiveType === '2g' || effectiveType === '3g' || saveData
  return { effectiveType, saveData, isSlowNetwork }
}

/**
 * Hook for debouncing expensive operations
 */
export function useDebounce<T>(value: T, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}
