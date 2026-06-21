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
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { OmCornerFrame, OmMonoLabel, useReveal } from '@/components/omni'
import { BRAND_NAME } from './constants'
import { useSpeedField } from './use-omni-canvas'

function Readout(props: {
  label: string
  value: React.ReactNode
  accent?: boolean
  className?: string
  align?: 'left' | 'right'
}) {
  return (
    <div
      className={cn(
        'absolute z-[4]',
        props.align === 'right' && 'text-right',
        props.className
      )}
    >
      <div className='om-mono text-[10px] tracking-[0.16em] text-[var(--om-text-faint)]'>
        {props.label}
      </div>
      <div
        className={cn(
          'om-mono mt-[3px] text-[15px] font-semibold',
          props.accent ? 'text-[var(--om-accent)]' : 'text-[var(--om-text)]'
        )}
      >
        {props.value}
      </div>
    </div>
  )
}

/**
 * Screen 02 — Velocity. The hero: speed light-field, four-corner HUD with live
 * readouts, and a kinetic title entrance (CSS animation, not the prototype's
 * per-frame rAF).
 */
export function VelocitySection() {
  const { t } = useTranslation()
  const speedRef = useRef<HTMLCanvasElement>(null)
  useSpeedField(speedRef)
  const reveal = useReveal<HTMLDivElement>()

  const [latency, setLatency] = useState(47)
  const [requests, setRequests] = useState(12840)
  useEffect(() => {
    const id = setInterval(() => {
      setLatency(44 + Math.floor(Math.random() * 9))
      setRequests(11800 + Math.floor(Math.random() * 1900))
    }, 1300)
    return () => clearInterval(id)
  }, [])

  return (
    <section className='relative h-screen min-h-[680px] overflow-hidden'>
      <canvas ref={speedRef} className='absolute inset-0 block h-full w-full' />
      <div
        aria-hidden='true'
        className='absolute inset-0'
        style={{
          background:
            'linear-gradient(90deg,rgba(6,7,10,0.92) 0%,rgba(6,7,10,0.4) 45%,rgba(6,7,10,0.75) 100%)',
        }}
      />
      <div
        aria-hidden='true'
        className='absolute inset-0'
        style={{
          background:
            'linear-gradient(180deg,rgba(6,7,10,0.85) 0%,transparent 30%,transparent 60%,rgba(6,7,10,0.95) 100%)',
        }}
      />

      {/* HUD corner ticks */}
      <OmCornerFrame className='top-24 right-9 bottom-9 left-9' size={54} />

      {/* HUD readouts */}
      <Readout
        label='P99 LATENCY'
        value={`${latency}ms`}
        accent
        className='top-[104px] left-[104px]'
      />
      <Readout
        label='REQUESTS / SEC'
        value={requests.toLocaleString('en-US')}
        align='right'
        className='top-[104px] right-[104px]'
      />
      <Readout
        label='MODELS ONLINE'
        value='38'
        className='bottom-12 left-[104px]'
      />
      <Readout
        label='NODE'
        value='CTRL-CENTER · AP-EAST'
        align='right'
        className='right-[104px] bottom-12'
      />

      {/* Hero content */}
      <div
        ref={reveal.ref}
        className={cn(
          'om-reveal relative z-[5] flex h-full flex-col justify-center px-6 md:px-[104px]',
          reveal.inView && 'is-in'
        )}
      >
        <div className='mb-6 flex items-center gap-3'>
          <span className='h-px w-7 bg-[var(--om-accent)]' />
          <OmMonoLabel className='tracking-[0.2em] text-[var(--om-text-muted)]'>
            {BRAND_NAME.toUpperCase()} · AI GATEWAY TELEMETRY
          </OmMonoLabel>
        </div>
        <h1
          className={cn(
            'om-display m-0 text-[clamp(64px,12.5vw,210px)] leading-[0.92] font-black tracking-[-0.03em] text-[var(--om-text-strong)]',
            reveal.inView && 'om-hero-in'
          )}
        >
          {t('Velocity')}
        </h1>
        <p className='mt-[26px] max-w-[560px] text-[17px] leading-[1.65] text-[var(--om-text-2)]'>
          {t('A fast, precise control center for frontier AI APIs.')}
          <br />
          {t('One endpoint, steadily relaying every large model.')}
        </p>
        <OmMonoLabel accent className='mt-[22px] tracking-[0.18em]'>
          CONTROLLED&nbsp;&nbsp;VELOCITY
        </OmMonoLabel>
      </div>

      {/* Scroll indicator */}
      <div className='absolute bottom-[42px] left-1/2 z-[5] flex -translate-x-1/2 flex-col items-center gap-1.5'>
        <span className='om-mono text-[10px] tracking-[0.2em] text-[var(--om-text-faint)]'>
          SCROLL
        </span>
        <span className='size-[5px] rounded-full bg-[var(--om-accent)] animate-[om-scroll-dot_1.6s_ease-in-out_infinite]' />
      </div>
    </section>
  )
}
