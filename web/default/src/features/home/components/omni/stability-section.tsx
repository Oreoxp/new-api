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
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { OmMonoLabel, OmPanel, useReveal } from '@/components/omni'
import { useScope } from './use-omni-canvas'

function Metric(props: { value: React.ReactNode; label: string; accent?: boolean }) {
  return (
    <div>
      <div
        className={cn(
          'om-mono text-[21px] leading-none font-semibold',
          props.accent ? 'text-[var(--om-accent)]' : 'text-[var(--om-text)]'
        )}
      >
        {props.value}
      </div>
      <div className='om-mono mt-1.5 text-[10.5px] tracking-[0.1em] text-[var(--om-text-faint)]'>
        {props.label}
      </div>
    </div>
  )
}

function useRuntimeClock() {
  const [runtime, setRuntime] = useState('312d 04:11:57')
  useEffect(() => {
    const base = Date.now()
    const start = 312 * 86400 + 4 * 3600 + 11 * 60 + 57
    const pad = (n: number) => String(n).padStart(2, '0')
    const id = setInterval(() => {
      const tot = start + Math.floor((Date.now() - base) / 1000)
      const d = Math.floor(tot / 86400)
      const h = Math.floor((tot % 86400) / 3600)
      const m = Math.floor((tot % 3600) / 60)
      const s = tot % 60
      setRuntime(`${d}d ${pad(h)}:${pad(m)}:${pad(s)}`)
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return runtime
}

export function StabilitySection() {
  const { t } = useTranslation()
  const scopeRef = useRef<HTMLCanvasElement>(null)
  useScope(scopeRef)
  const runtime = useRuntimeClock()
  const left = useReveal<HTMLDivElement>()
  const right = useReveal<HTMLDivElement>()

  const leds = useMemo(
    () =>
      Array.from({ length: 48 }, () => ({
        dur: (1.6 + Math.random() * 1.8).toFixed(2),
        delay: Math.random().toFixed(2),
      })),
    []
  )

  return (
    <section className='relative flex min-h-screen items-center overflow-hidden border-t border-[var(--om-border-weak)] bg-[var(--om-bg)] px-6 py-[120px] md:px-[104px]'>
      <OmMonoLabel className='absolute top-[84px] left-9'>
        // 04 — STABILITY
      </OmMonoLabel>

      <div className='relative z-[3] mx-auto grid w-full max-w-[1320px] grid-cols-1 items-center gap-[72px] lg:grid-cols-[1.05fr_1fr]'>
        {/* Left — narrative + metrics */}
        <div
          ref={left.ref}
          className={cn('om-reveal', left.inView && 'is-in')}
        >
          <OmMonoLabel accent className='mb-5 block tracking-[0.18em]'>
            // PRECISION · ROCK-SOLID
          </OmMonoLabel>
          <h2 className='om-display m-0 text-[clamp(40px,5.4vw,82px)] leading-none font-extrabold tracking-[-0.025em] text-[var(--om-text-strong)]'>
            {t('Rock-solid')}
            <br />
            {t('never goes offline')}
          </h2>
          <p className='mt-[26px] mb-9 max-w-[440px] text-[16px] leading-[1.7] text-[var(--om-text-2)]'>
            {t(
              'Smart load balancing, sub-second failover, multi-channel health probing — however the upstreams wobble, the signal reaching your app stays flat.'
            )}
          </p>

          <div className='flex flex-wrap gap-12'>
            <div>
              <div className='om-display text-[46px] leading-none font-extrabold tracking-[-0.02em] text-[var(--om-accent)]'>
                99.99<span className='text-[var(--om-accent)]'>%</span>
              </div>
              <div className='om-mono mt-2 text-[11px] tracking-[0.12em] text-[var(--om-text-faint)]'>
                30D UPTIME
              </div>
            </div>
            <div>
              <div className='om-mono text-[27px] leading-none font-semibold tracking-[-0.01em] whitespace-nowrap text-[var(--om-text)]'>
                {runtime}
              </div>
              <div className='om-mono mt-3 text-[11px] tracking-[0.12em] text-[var(--om-text-faint)]'>
                CONTINUOUS RUNTIME
              </div>
            </div>
          </div>

          <div className='mt-9 grid grid-cols-[repeat(4,auto)] justify-start gap-x-[38px] gap-y-[18px]'>
            <Metric value='28ms' label='P50 LATENCY' />
            <Metric value='47ms' label='P99 LATENCY' />
            <Metric value='0.00%' label='ERROR RATE' accent />
            <Metric value='<1s' label='FAILOVER' />
          </div>
        </div>

        {/* Right — telemetry panel */}
        <div ref={right.ref} className={cn('om-reveal', right.inView && 'is-in')}>
          <OmPanel>
            <div className='om-mono flex items-center justify-between border-b border-[var(--om-border-weak)] px-[18px] py-3.5 text-[11px] tracking-[0.1em] text-[var(--om-text-muted)]'>
              <span>TELEMETRY · SIGNAL</span>
              <span className='text-[var(--om-accent)]'>● STABLE</span>
            </div>
            <canvas ref={scopeRef} className='block h-[180px] w-full' />
            <div className='border-t border-[var(--om-border-weak)] p-[18px]'>
              <div className='om-mono mb-3 flex items-center justify-between text-[11px] tracking-[0.1em] text-[var(--om-text-muted)]'>
                <span>CHANNEL HEALTH</span>
                <span className='text-[var(--om-accent)]'>48 / 48 OK</span>
              </div>
              <div className='grid grid-cols-[repeat(16,1fr)] gap-1.5'>
                {leds.map((led, i) => (
                  <span
                    key={i}
                    className='h-3.5 rounded-[3px] bg-[var(--om-accent)] opacity-[0.85] shadow-[0_0_6px_rgba(205,255,78,0.5)]'
                    style={{
                      animation: `om-blink ${led.dur}s ease-in-out infinite ${led.delay}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </OmPanel>
        </div>
      </div>
    </section>
  )
}
