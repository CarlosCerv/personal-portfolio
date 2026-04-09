'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface AppleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  interactive?: boolean
  shadow?: 'sm' | 'md' | 'lg'
  hover?: 'lift' | 'glow' | 'none'
}

/**
 * AppleCard - Premium card component following Apple design system
 * Minimal borders, subtle shadows, generous padding
 */
export function AppleCard({
  className,
  children,
  interactive = false,
  shadow = 'sm',
  hover = 'lift',
  ...props
}: AppleCardProps) {
  const shadowMap = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  }

  const hoverClasses = {
    lift: 'hover:shadow-md hover:translate-y-[-2px]',
    glow: 'hover:ring-2 hover:ring-blue hover:ring-opacity-20',
    none: '',
  }

  const cardContent = (
    <div
      className={cn(
        'rounded-lg border border-gray-light bg-white',
        'p-6 md:p-8',
        shadowMap[shadow],
        interactive && `cursor-pointer transition-all duration-150 ease-out ${hoverClasses[hover]}`,
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
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15 }}
        className="w-full"
      >
        {cardContent}
      </motion.div>
    )
  }

  return cardContent
}
