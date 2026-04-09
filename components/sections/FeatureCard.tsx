import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { animations } from '@/lib/animations'
import { cn } from '@/lib/utils'

type FeatureCardProps = {
  icon?: React.ReactNode
  title: string
  description: string
  points?: string[]
  highlighted?: boolean
  className?: string
}

export function FeatureCard({
  icon,
  title,
  description,
  points,
  highlighted = false,
  className
}: FeatureCardProps) {
  return (
    <motion.article
      {...animations.fadeInUpStagger}
      className={cn(
        'p-6 md:p-8 rounded-lg border transition-all h-full flex flex-col justify-between',
        highlighted
          ? 'bg-blue text-white border-blue shadow-md'
          : 'bg-white border-gray-light hover:shadow-md hover:border-blue/20'
      )}
    >
      <div className="space-y-6">
        {icon && (
          <div className={cn(
            'text-4xl',
            highlighted ? 'text-white' : 'text-blue'
          )}>
            {icon}
          </div>
        )}
        <div className="space-y-2">
          <h3 className={cn(
            'text-lg font-semibold tracking-tight',
            highlighted ? 'text-white' : 'text-gray-dark'
          )}>
            {title}
          </h3>
          <p className={cn(
            'text-sm leading-relaxed',
            highlighted ? 'text-white/80' : 'text-gray-secondary'
          )}>
            {description}
          </p>
        </div>
      </div>
      {points && (
        <div className="mt-6 space-y-2">
          {points.map((point, i) => (
            <div
              key={i}
              className={cn(
                'flex items-center gap-2 text-xs font-semibold',
                highlighted ? 'text-white' : 'text-gray-dark'
              )}
            >
              <Check className="w-3 h-3" /> {point}
            </div>
          ))}
        </div>
      )}
    </motion.article>
  )
}

export default FeatureCard
