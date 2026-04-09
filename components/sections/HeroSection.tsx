import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { animations } from '@/lib/animations'
import { cn } from '@/lib/utils'

type HeroSectionProps = {
  badge?: string
  title: string
  titleHighlight?: string // Part of title to highlight in blue
  description: string
  stats?: Array<{ number: string; label: string }>
  bulletPoints?: string[]
  primaryButtonText: string
  primaryButtonHref: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  className?: string
}

export function HeroSection({
  badge,
  title,
  titleHighlight,
  description,
  stats,
  bulletPoints,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  className
}: HeroSectionProps) {
  // Parse title to find and highlight the specified text
  const getTitleWithHighlight = () => {
    if (!titleHighlight) return title
    const parts = title.split(titleHighlight)
    return (
      <>
        {parts[0]}
        <span className="text-blue">{titleHighlight}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <section className={cn(
      'relative w-full bg-white overflow-hidden pt-32 md:pt-48 pb-20 md:pb-32',
      className
    )}>
      <div className="container max-w-4xl space-y-12 md:space-y-16 text-center">
        {/* Badge */}
        {badge && (
          <motion.div {...animations.fadeInUpStagger} className="w-fit mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-light bg-white hover:bg-white-secondary transition-colors">
              <div className="flex h-2 w-2 rounded-full bg-green animate-pulse" />
              <span className="text-sm font-medium text-gray-dark">{badge}</span>
            </div>
          </motion.div>
        )}

        {/* Title */}
        <motion.div {...animations.fadeInUpStagger} className="space-y-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight text-gray-dark">
            {getTitleWithHighlight()}
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          {...animations.fadeInUpStagger}
          transition={{ delay: 0.16, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-secondary max-w-2xl mx-auto leading-relaxed font-normal"
        >
          {description}
        </motion.p>

        {/* Stats Grid */}
        {stats && (
          <motion.div
            {...animations.fadeInUpStagger}
            transition={{ delay: 0.24, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto pt-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="p-6 rounded-lg border border-gray-light bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue mb-2">
                  {stat.number}
                </div>
                <div className="text-xs font-semibold text-gray-secondary uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bullet Points */}
        {bulletPoints && (
          <motion.div
            {...animations.fadeInUpStagger}
            transition={{ delay: 0.32, duration: 0.6 }}
            className="space-y-3 pt-8 max-w-2xl mx-auto"
          >
            {bulletPoints.map((point, i) => (
              <div key={i} className="flex items-center justify-center gap-3">
                <div className="w-1 h-1 rounded-full bg-blue" />
                <span className="text-base text-gray-secondary">{point}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* CTAs */}
        <motion.div
          {...animations.fadeInUpStagger}
          transition={{ delay: 0.40, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12"
        >
          <Link
            href={primaryButtonHref}
            className="group inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue text-white font-semibold text-base rounded-lg transition-all duration-200 hover:bg-blue-hover hover:shadow-md active:scale-95"
          >
            {primaryButtonText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          {secondaryButtonText && secondaryButtonHref && (
            <Link
              href={secondaryButtonHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-gray-light text-gray-dark font-semibold text-base rounded-lg transition-all duration-200 hover:bg-white-secondary hover:border-gray-secondary"
            >
              {secondaryButtonText}
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
