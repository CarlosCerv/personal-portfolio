import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type ProcessStepProps = {
  number: string
  tag: string
  title: string
  description: string
  points: string[]
  image?: React.ReactNode
  reverse?: boolean
}

export function ProcessStep({ number, tag, title, description, points, image, reverse }: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'grid grid-cols-1 items-center gap-10 rounded-[34px] border border-black/[0.06] bg-white/88 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] lg:grid-cols-2 lg:gap-16 lg:p-10',
        reverse && 'lg:[&>*:first-child]:order-2'
      )}
    >
      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#111113] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white">
            {number}
          </span>
          <span className="section-badge">{tag}</span>
        </div>

        <div className="space-y-5">
          <h3 className="max-w-2xl text-[#111113]" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}>
            {title}
          </h3>
          <p className="max-w-xl text-[1rem] leading-[1.8] text-[#5c5d63] md:text-[1.14rem]">{description}</p>
        </div>

        <ul className="grid gap-3">
          {points.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-[18px] border border-black/[0.05] bg-[#fafafa] px-4 py-4"
            >
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#111113]">
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-[0.95rem] font-medium leading-relaxed text-[#111113]">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,245,247,0.94))] p-3 shadow-[0_28px_70px_rgba(15,23,42,0.12)]">
            {image}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ProcessStep
