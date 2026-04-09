import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { animations } from '@/lib/animations'
import { cn } from '@/lib/utils'

type ProcessStepProps = {
  number: string
  tag: string
  title: string
  description: string
  points: string[]
  image?: React.ReactNode
  reverse?: boolean
  className?: string
}

export function ProcessStep({
  number,
  tag,
  title,
  description,
  points,
  image,
  reverse = false,
  className
}: ProcessStepProps) {
  return (
    <motion.div
      {...animations.fadeInUp}
      className={cn(
        'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
        reverse && 'lg:grid-cols-2 [&>*:first-child]:lg:order-2 [&>*:last-child]:lg:order-1',
        className
      )}
    >
      {/* Left Content */}
      <div className="space-y-8">
        <div className="space-y-4">
          <span className="text-xs font-semibold text-gray-secondary uppercase tracking-wide">
            {number}
          </span>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue/10 border border-blue/20">
            <div className="w-2 h-2 bg-blue rounded-full" />
            <span className="text-sm font-semibold text-blue">{tag}</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-dark leading-tight">
            {title}
          </h3>
          <p className="text-lg text-gray-secondary leading-relaxed">{description}</p>
        </div>
        <ul className="space-y-4">
          {points.map((point, i) => (
            <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-dark">
              <div className="w-5 h-5 rounded-full bg-green/20 text-green flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3" />
              </div>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side Image/Content */}
      {image && (
        <motion.div
          {...animations.fadeInUp}
          className="p-6 bg-white rounded-lg border border-gray-light shadow-sm"
        >
          {image}
        </motion.div>
      )}
    </motion.div>
  )
}

export default ProcessStep
