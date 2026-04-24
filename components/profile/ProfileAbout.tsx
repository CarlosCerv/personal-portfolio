'use client'

import { useState } from 'react'

export function ProfileAbout({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false)
  const visibleParagraphs = expanded ? paragraphs : paragraphs.slice(0, 2)

  return (
    <section className="surface-panel p-8 md:p-12">
      <div className="max-w-4xl space-y-6">
        <div>
          <h2 className="section-title">About me</h2>
          <p className="section-copy mt-3">
            A comprehensive profile of how Carlos thinks, executes, and turns quality into an operational advantage.
          </p>
        </div>

        {visibleParagraphs.map((paragraph) => (
          <p key={paragraph} className="text-[16px] leading-[1.9] text-[#5c5d63] md:text-[17px]">
            {paragraph}
          </p>
        ))}

        {paragraphs.length > 2 ? (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="text-[14px] font-semibold text-[#111113] transition-colors hover:text-[#0071e3]"
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        ) : null}
      </div>
    </section>
  )
}
