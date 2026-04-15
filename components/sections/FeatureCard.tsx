import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type FeatureCardProps = {
  tag: string
  title: string
  description: string
  points?: string[]
  highlighted?: boolean
}

export function FeatureCard({ tag, title, description, points, highlighted }: FeatureCardProps) {
  return (
    <div
      className={cn(
        'group relative flex h-full flex-col gap-6 rounded-[28px] border p-8 transition-all duration-300 md:p-9',
        highlighted
          ? 'border-transparent bg-[#111113] text-white shadow-[0_30px_70px_rgba(17,17,19,0.24)] hover:-translate-y-1.5'
          : 'border-black/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,250,250,0.92))] shadow-[0_20px_48px_rgba(15,23,42,0.06)] hover:-translate-y-1.5 hover:shadow-[0_28px_70px_rgba(15,23,42,0.1)]'
      )}
    >
      <span
        className={cn(
          'inline-flex w-fit items-center rounded-full px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em]',
          highlighted ? 'bg-white/10 text-white/72' : 'bg-[#111113]/[0.04] text-[#5c5d63]'
        )}
      >
        {tag}
      </span>

      <div className="flex-1 space-y-3">
        <h3
          className={cn(
            'leading-[1.06] tracking-[-0.045em]',
            highlighted ? 'text-white' : 'text-[#111113]'
          )}
          style={{ fontSize: 'clamp(1.7rem, 3vw, 2.7rem)' }}
        >
          {title}
        </h3>
        <p
          className={cn(
            'text-[0.98rem] leading-[1.8]',
            highlighted ? 'text-white/76' : 'text-[#5c5d63]'
          )}
        >
          {description}
        </p>
      </div>

      {points && points.length > 0 && (
        <ul className="grid gap-2.5 pt-1">
          {points.map((point, i) => (
            <li
              key={i}
              className={cn(
                'flex items-center gap-3 rounded-[18px] px-3.5 py-3',
                highlighted ? 'bg-white/6' : 'bg-[#fafafa]'
              )}
            >
              <div
                className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                  highlighted ? 'bg-white/14' : 'bg-[#111113]'
                )}
              >
                <Check
                  className={cn('h-3 w-3', highlighted ? 'text-white' : 'text-white')}
                  strokeWidth={2.5}
                />
              </div>
              <span
                className={cn(
                  'text-[0.87rem] font-medium',
                  highlighted ? 'text-white/88' : 'text-[#111113]'
                )}
              >
                {point}
              </span>
            </li>
          ))}
        </ul>
      )}

      {highlighted && (
        <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_34%),linear-gradient(180deg,transparent,rgba(255,255,255,0.04))]" />
      )}
    </div>
  )
}

export default FeatureCard
