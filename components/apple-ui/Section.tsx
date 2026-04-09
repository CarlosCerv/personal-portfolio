'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface AppleSectionProps {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'gray' | 'gradient'
  id?: string
}

/**
 * AppleSection - Premium section wrapper with proper spacing
 * Uses CSS variables for responsive margins and padding
 */
export function AppleSection({
  children,
  className,
  background = 'white',
  id,
}: AppleSectionProps) {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-white-secondary',
    gradient: 'bg-gradient-to-b from-white to-white-secondary',
  }

  return (
    <section
      id={id}
      className={cn(
        backgrounds[background],
        'section-spacing', // Uses CSS var: margin-top/bottom based on viewport
        className
      )}
    >
      <div className="container">
        {children}
      </div>
    </section>
  )
}

interface AppleSectionHeaderProps {
  badge?: string
  title: React.ReactNode
  description?: string
  subtitle?: string
  centered?: boolean
}

/**
 * AppleSectionHeader - Premium section header with hierarchical typography
 * Badge → Title → Description hierarchy following Apple design
 */
export function AppleSectionHeader({
  badge,
  title,
  description,
  subtitle,
  centered = false,
}: AppleSectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16 lg:mb-20',
        centered && 'text-center max-w-2xl mx-auto'
      )}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 mb-6">
          <p className="text-label text-blue uppercase font-medium tracking-wide">
            {badge}
          </p>
          <div className="h-1 w-6 bg-blue rounded-full" />
        </div>
      )}

      <h2 className="text-h2 font-bold text-gray-dark mb-6 tracking-tight leading-tight">
        {title}
      </h2>

      {description && (
        <p className="text-lg md:text-xl text-gray-medium max-w-3xl leading-relaxed">
          {description}
        </p>
      )}

      {subtitle && (
        <p className="text-sm md:text-base text-gray-light mt-4">
          {subtitle}
        </p>
      )}
    </div>
  )
}
