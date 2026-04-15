import React from 'react'
import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  badge?: string
  title: string
  description?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({ badge, title, description, centered = true, className }: SectionHeaderProps) {
  return (
    <div className={cn('space-y-5 px-5 sm:px-6 lg:px-8', centered && 'text-center', className)}>
      {badge && (
        <div className={cn(centered && 'flex justify-center')}>
          <span className="section-badge">{badge}</span>
        </div>
      )}
      <h2 className="max-w-4xl font-semibold tracking-[-0.05em] text-[#111113] leading-[1.05]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'max-w-3xl text-[1.03rem] leading-[1.75] text-[#5c5d63] md:text-[1.16rem]',
            centered && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeader
