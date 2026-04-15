'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ProfileStat } from '@/lib/content/public-content'

function extractNumericValue(value: string) {
  const match = value.match(/\d[\d,.]*/)
  if (!match) return null
  return Number(match[0].replace(/,/g, ''))
}

function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current || visible) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [visible])

  return { ref, visible }
}

function AnimatedMetric({ stat }: { stat: ProfileStat }) {
  const { ref, visible } = useInViewOnce<HTMLDivElement>()
  const finalNumeric = useMemo(() => extractNumericValue(stat.numero), [stat.numero])
  const [display, setDisplay] = useState(finalNumeric ?? 0)

  useEffect(() => {
    if (!visible || finalNumeric === null) return

    let frame = 0
    const totalFrames = 40
    const step = finalNumeric / totalFrames

    const interval = window.setInterval(() => {
      frame += 1
      const next = Math.min(finalNumeric, Math.round(step * frame))
      setDisplay(next)
      if (frame >= totalFrames) {
        window.clearInterval(interval)
      }
    }, 24)

    return () => window.clearInterval(interval)
  }, [visible, finalNumeric])

  const shownValue =
    finalNumeric === null ? stat.numero : stat.numero.replace(/\d[\d,.]*/, display.toLocaleString())

  return (
    <div ref={ref} className="surface-card px-6 py-8 transition-all">
      <p className="text-[30px] font-semibold tracking-[-0.06em] text-[#111113] md:text-[38px]">{shownValue}</p>
      <p className="mt-2 text-[13px] leading-[1.7] text-[#6f6f77]">{stat.label}</p>
    </div>
  )
}

export function ProfileStats({ stats }: { stats: ProfileStat[] }) {
  return (
    <section className="surface-panel px-6 py-10 md:px-12">
      <div className="mb-10">
        <h2 className="section-title">
          Impacto comprobable
        </h2>
        <p className="section-copy mt-3">
          Métricas que resumen el alcance real del trabajo de Carlos en calidad, automatización y performance.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <AnimatedMetric key={`${stat.numero}-${stat.label}`} stat={stat} />
        ))}
      </div>
    </section>
  )
}
