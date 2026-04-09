import React from 'react'
import { motion } from 'framer-motion'
import { animations } from '@/lib/animations'
import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  badge?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  badge,
  title,
  description,
  align = 'center',
  className
}: SectionHeaderProps) {
  return (
    <div className={cn(
      'space-y-4 mb-12 md:mb-16',
      align === 'center' ? 'text-center' : 'text-left',
      className
    )}>
      {badge && (
        <motion.span
          {...animations.fadeInUp}
          className="text-xs font-semibold uppercase tracking-widest text-blue"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        {...animations.fadeInUp}
        className="text-5xl md:text-6xl font-bold tracking-tight text-gray-dark leading-tight"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          {...animations.fadeInUp}
          className="text-lg text-gray-secondary max-w-2xl leading-relaxed"
          style={align === 'left' ? {} : { marginLeft: 'auto', marginRight: 'auto' }}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}

export default SectionHeader
