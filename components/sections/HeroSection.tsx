import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type HeroSectionProps = {
  badge?: string
  title: string
  titleHighlight?: string
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
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  className,
}: HeroSectionProps) {
  const getTitleWithHighlight = () => {
    if (!titleHighlight) return title
    const parts = title.split(titleHighlight)
    return (
      <>
        {parts[0]}
        <span className="text-[#0071e3]">{titleHighlight}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-white pb-20 pt-8 md:min-h-[calc(100vh-108px)] md:pb-28 md:pt-14',
        className
      )}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-12%] top-[12%] h-72 w-72 rounded-full bg-[#0071e3]/[0.08] blur-3xl" />
        <div className="absolute right-[-10%] top-[24%] h-80 w-80 rounded-full bg-[#111113]/[0.05] blur-3xl" />
        <div className="absolute bottom-[-12%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#f5f5f7] blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8">
        <div className="max-w-4xl">
          {badge ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <span className="section-badge">
                <span className="status-dot-green" />
                {badge}
              </span>
            </motion.div>
          ) : null}

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl text-[#111113]"
          >
            {getTitleWithHighlight()}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-2xl text-[1.08rem] leading-[1.75] text-[#5c5d63] md:text-[1.24rem]"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.64, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
          >
            <Link href={primaryButtonHref} className="btn-base btn-primary px-7">
              {primaryButtonText}
              <ArrowRight className="h-4 w-4" />
            </Link>

            {secondaryButtonText && secondaryButtonHref ? (
              <Link href={secondaryButtonHref} className="btn-base btn-secondary px-7">
                {secondaryButtonText}
              </Link>
            ) : null}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[32px] border border-black/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,245,247,0.92))] p-4 shadow-[0_36px_84px_rgba(15,23,42,0.12)] sm:p-5">
            <div className="rounded-[26px] border border-black/[0.06] bg-white p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:p-6">
              <div className="flex items-center gap-2 border-b border-black/[0.05] pb-4">
                <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2f]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <div className="ml-auto h-2 w-24 rounded-full bg-[#111113]/[0.08]" />
              </div>

              <div className="mt-5 grid gap-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {(stats || []).slice(0, 2).map((stat, index) => (
                    <div
                      key={`${stat.label}-${index}`}
                      className={cn(
                        'rounded-[22px] p-5',
                        index === 0 ? 'bg-[#111113] text-white' : 'border border-black/[0.06] bg-[#fafafa] text-[#111113]'
                      )}
                    >
                      <div className="h-2 w-16 rounded-full bg-current/10" />
                      <div className="mt-8">
                        <p className="text-4xl font-semibold tracking-[-0.05em]">{stat.number}</p>
                        <p
                          className={cn(
                            'mt-2 text-[0.76rem] font-semibold uppercase tracking-[0.16em]',
                            index === 0 ? 'text-white/68' : 'text-[#8a8b92]'
                          )}
                        >
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-[24px] border border-black/[0.06] bg-[#fafafa] p-5">
                  <div className="grid gap-3">
                    {(stats || []).map((stat, index) => (
                      <div
                        key={`${stat.label}-row-${index}`}
                        className="flex items-center justify-between rounded-[18px] border border-black/[0.05] bg-white px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              'h-2.5 w-2.5 rounded-full',
                              index === 0 && 'bg-[#111113]',
                              index === 1 && 'bg-[#0071e3]',
                              index === 2 && 'bg-[#22c55e]'
                            )}
                          />
                          <span className="text-sm font-medium text-[#111113]">{stat.label}</span>
                        </div>
                        <span className="text-[0.82rem] font-semibold tracking-[-0.02em] text-[#111113]">
                          {stat.number}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {stats && stats.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.66, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-14 max-w-7xl px-5 sm:px-6 lg:px-8"
        >
          <div className="grid gap-3 rounded-[30px] border border-black/[0.06] bg-[#fafafa] p-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)] sm:grid-cols-3 sm:gap-4 sm:p-5">
            {stats.map((stat, index) => (
              <div
                key={`${stat.label}-${index}`}
                className="rounded-[22px] border border-white/70 bg-white px-5 py-6 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
              >
                <p className="text-[2.25rem] font-semibold tracking-[-0.06em] text-[#111113] md:text-[2.75rem]">
                  {stat.number}
                </p>
                <p className="mt-2 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-[#8a8b92]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      ) : null}
    </section>
  )
}

export default HeroSection
