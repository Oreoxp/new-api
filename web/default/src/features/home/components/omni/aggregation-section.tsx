/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { OmMonoLabel, useReveal } from '@/components/omni'
import { ConvergenceLines } from './convergence'

type LabelSpec = {
  name: string
  accent?: boolean
  dotFirst?: boolean
  style: React.CSSProperties
}

// Provider names are proper nouns — kept verbatim across locales.
const SOURCE_LABELS: LabelSpec[] = [
  { name: 'OpenAI', dotFirst: true, style: { left: '3%', top: '13%' } },
  { name: 'Claude', accent: true, dotFirst: true, style: { left: '3%', top: '43%' } },
  { name: 'Gemini', dotFirst: true, style: { left: '3%', top: '73%' } },
  { name: 'DeepSeek', style: { right: '3%', top: '18%' } },
  { name: 'xAI Grok', accent: true, style: { right: '3%', top: '48%' } },
  { name: 'Mistral', style: { right: '3%', top: '78%' } },
  { name: 'Qwen', style: { left: '24%', top: '5%' } },
  { name: 'Kimi', dotFirst: true, style: { right: '24%', top: '5%' } },
]

function SourceDot(props: { accent?: boolean }) {
  return (
    <span
      aria-hidden='true'
      className={cn(
        'size-[6px] shrink-0 rounded-full',
        props.accent
          ? 'bg-[var(--om-accent)] shadow-[0_0_6px_#cdff4e]'
          : 'bg-[#6b7585]'
      )}
    />
  )
}

export function AggregationSection() {
  const { t } = useTranslation()
  const topReveal = useReveal<HTMLDivElement>()
  const headlineReveal = useReveal<HTMLDivElement>()

  return (
    <section className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--om-bg)]'>
      {/* Top heading */}
      <div
        ref={topReveal.ref}
        className={cn(
          'om-reveal absolute top-[92px] left-1/2 z-[5] max-w-[520px] -translate-x-1/2 px-6 text-center',
          topReveal.inView && 'is-in'
        )}
      >
        <OmMonoLabel>// 03 — AGGREGATION</OmMonoLabel>
        <h3 className='om-display mt-3.5 text-[clamp(22px,2.5vw,32px)] font-bold tracking-[-0.01em] text-[var(--om-text)]'>
          {t('Scattered inputs, one converged stream')}
        </h3>
        <p className='mx-auto mt-[11px] max-w-[440px] text-[14px] leading-[1.65] text-[var(--om-text-2)]'>
          {t(
            'All provider APIs, keys and billing converge along one line into a single gateway node — centrally scheduled, uniformly metered, uniformly observable.'
          )}
        </p>
      </div>

      {/* Convergence curves */}
      <ConvergenceLines />

      {/* Source labels */}
      {SOURCE_LABELS.map((label) => (
        <div
          key={label.name}
          className={cn(
            'om-mono absolute flex items-center gap-[9px] text-[16px] font-medium text-[#c8cfd8]',
            !label.dotFirst && 'justify-end'
          )}
          style={label.style}
        >
          {label.dotFirst && <SourceDot accent={label.accent} />}
          {label.name}
          {!label.dotFirst && <SourceDot accent={label.accent} />}
        </div>
      ))}

      {/* Center node */}
      <div className='absolute top-1/2 left-1/2 z-[4] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center'>
        <div className='relative flex size-24 items-center justify-center'>
          <span className='absolute top-1/2 left-1/2 size-24 rounded-full border border-[var(--om-border-accent)] animate-[om-ring-pulse_3s_ease-out_infinite]' />
          <span className='absolute top-1/2 left-1/2 size-24 rounded-full border border-[var(--om-border-accent)] animate-[om-ring-pulse_3s_ease-out_infinite_1.5s]' />
          <span className='om-display flex size-16 items-center justify-center rounded-2xl bg-[var(--om-accent)] text-[30px] font-extrabold text-[var(--om-accent-ink)] shadow-[0_0_50px_-8px_rgba(205,255,78,0.7)]'>
            ∞
          </span>
        </div>
      </div>

      {/* Resolving headline */}
      <div
        ref={headlineReveal.ref}
        className={cn(
          'om-reveal absolute bottom-[11%] left-1/2 z-[5] -translate-x-1/2 text-center',
          headlineReveal.inView && 'is-in'
        )}
      >
        <h2 className='om-display m-0 text-[clamp(34px,5.2vw,72px)] leading-[1.02] font-extrabold tracking-[-0.02em] text-[var(--om-text-strong)]'>
          {t('One endpoint, access everything')}
        </h2>
        <OmMonoLabel accent className='mt-3.5 block tracking-[0.16em]'>
          // 1 ENDPOINT · 30+ PROVIDERS · UNIFIED
        </OmMonoLabel>
      </div>
    </section>
  )
}
