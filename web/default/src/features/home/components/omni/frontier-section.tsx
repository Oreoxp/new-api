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
import { useMemo, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Check, Copy } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { OmButton, OmMonoLabel, useReveal } from '@/components/omni'
import { API_DOMAIN } from './constants'
import { ModelTicker } from './model-ticker'
import { useMeshField } from './use-omni-canvas'

/**
 * Screen 01 — Frontier. Opens the page: breathing mesh gradient, the brand
 * promise, the "replace your base URL" quick start with the primary Get-API-Key
 * action, and an infinite provider ticker.
 */
export function FrontierSection(props: { getKeyTo: '/keys' | '/sign-in' }) {
  const { t } = useTranslation()
  const meshRef = useRef<HTMLCanvasElement>(null)
  useMeshField(meshRef)
  const reveal = useReveal<HTMLDivElement>()

  const [copied, setCopied] = useState(false)
  const baseUrl = useMemo(
    () =>
      typeof window !== 'undefined'
        ? `${window.location.origin}/v1`
        : `https://${API_DOMAIN}/v1`,
    []
  )
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(baseUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section className='relative flex min-h-screen items-center overflow-hidden'>
      <canvas ref={meshRef} className='absolute inset-0 block h-full w-full' />
      <div
        aria-hidden='true'
        className='absolute inset-0'
        style={{
          background:
            'radial-gradient(120% 100% at 50% 50%,transparent 40%,rgba(6,7,10,0.85) 100%)',
        }}
      />
      <OmMonoLabel className='absolute top-[84px] left-9 z-[3]'>
        // 01 — FRONTIER
      </OmMonoLabel>

      <div
        ref={reveal.ref}
        className={cn(
          'om-reveal relative z-[3] mx-auto w-full max-w-[1100px] px-9 text-center',
          reveal.inView && 'is-in'
        )}
      >
        <OmMonoLabel accent className='mb-[22px] block'>
          {t('Always at the frontier of every model')}
        </OmMonoLabel>
        <h2 className='om-display m-0 text-[clamp(48px,7.5vw,128px)] leading-[0.98] font-extrabold tracking-[-0.03em] text-[var(--om-text-strong)]'>
          {t('The frontier, ready now')}
        </h2>
        <p className='mx-auto mt-7 max-w-[540px] text-[16px] leading-[1.7] text-[var(--om-text-2)]'>
          {t(
            'New models are wired in gateway-side the moment they ship. No re-integration — change the model field and you are on the latest.'
          )}
        </p>

        {/* Replace-your-base-URL quick start */}
        <div className='mt-10 flex flex-col items-center gap-5'>
          <div className='flex flex-col items-center gap-3'>
            <span className='om-mono text-[14px] tracking-[0.06em] text-[var(--om-text-2)]'>
              {t('Just point your base URL to')}
            </span>
            <div className='flex h-12 w-[min(420px,86vw)] items-center gap-2 rounded-[var(--om-radius-input)] border border-[var(--om-border-mid)] bg-[rgba(255,255,255,0.02)] pr-2 pl-4'>
              <span className='om-mono flex-1 truncate text-left text-[15px] text-[#dfe5ea]'>
                {baseUrl}
              </span>
              <button
                type='button'
                onClick={copy}
                aria-label={copied ? t('Copied') : t('Copy')}
                title={copied ? t('Copied') : t('Copy')}
                className='flex size-9 shrink-0 items-center justify-center rounded-[8px] border border-[var(--om-border-accent)] bg-[rgba(205,255,78,0.08)] text-[var(--om-accent)] transition-colors duration-150 hover:bg-[rgba(205,255,78,0.16)]'
              >
                {copied ? (
                  <Check className='size-[18px]' />
                ) : (
                  <Copy className='size-[18px]' />
                )}
              </button>
            </div>
          </div>

          <div className='flex flex-wrap items-center justify-center gap-[14px]'>
            <OmButton render={<Link to={props.getKeyTo} />}>
              {t('Get API Key')}
              <span aria-hidden='true'>→</span>
            </OmButton>
            <OmButton variant='ghost' render={<Link to='/docs' />}>
              {t('Read Docs')}
            </OmButton>
          </div>
        </div>
      </div>

      <div className='absolute inset-x-0 bottom-16 z-[3]'>
        <ModelTicker />
      </div>
    </section>
  )
}
