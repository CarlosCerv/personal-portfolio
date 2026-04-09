'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export function AppleButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  loading,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-black text-white hover:bg-accent-hover active:bg-accent-active',
    secondary: 'bg-transparent border border-border-primary text-text-primary hover:bg-text-primary hover:text-white',
    tertiary: 'bg-background-alt text-text-primary hover:bg-background-tertiary',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-semibold rounded-full',
    md: 'px-6 py-2.5 text-sm font-semibold rounded-full',
    lg: 'px-8 py-3 text-base font-semibold rounded-full',
  }

  return (
    <motion.button
      whileHover={{ scale: 0.99 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      type="button"
      {...(props as any)}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : null}
      {children}
    </motion.button>
  )
}
