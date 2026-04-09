'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface AppleButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
}

/**
 * AppleButton - Premium Apple-style button component
 * Follows Apple's design system: minimal, clean, smooth transitions
 */
export function AppleButton({
  variant = 'primary',
  size = 'md',
  className,
  loading = false,
  disabled = false,
  icon,
  children,
  ...props
}: AppleButtonProps) {
  const variantClasses = {
    primary: 'bg-blue text-white hover:bg-blue-hover active:bg-blue-active',
    secondary: 'bg-white-secondary text-gray-dark hover:bg-white-tertiary active:opacity-70',
    tertiary: 'bg-transparent text-blue hover:text-blue-hover active:text-blue-active border border-gray-light',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-medium',
    md: 'px-6 py-2.5 text-sm font-medium',
    lg: 'px-8 py-3 text-base font-medium',
  }

  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-md transition-all duration-150 ease-out'
  const disabledClasses = 'disabled:opacity-50 disabled:cursor-not-allowed'

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 0.98 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={cn(baseClasses, disabledClasses, variantClasses[variant], sizeClasses[size], className)}
      disabled={disabled || loading}
      type="button"
      {...(props as any)}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {icon && !loading && <span className="flex items-center justify-center">{icon}</span>}
      {children}
    </motion.button>
  )
}
