'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  interactive?: boolean
  elevation?: 'sm' | 'md' | 'lg'
}

export function AppleCard({
  className,
  children,
  interactive = false,
  elevation = 'sm',
  ...props
}: CardProps) {
  const elevationClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  }

  const cardContent = (
    <div
      className={cn(
        'rounded-lg border border-border-primary bg-white',
        'p-6 md:p-8',
        elevationClasses[elevation],
        interactive && 'hover:shadow-card hover:-translate-y-1 transition-all duration-300 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )

  if (interactive) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {cardContent}
      </motion.div>
    )
  }

  return cardContent
}
