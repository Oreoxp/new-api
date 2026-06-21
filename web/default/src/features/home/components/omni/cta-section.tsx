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
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { OmButton, OmCornerFrame, OmMonoLabel, useReveal } from '@/components/omni'

/**
 * Screen 05 — closing CTA. Corner HUD echoes the hero; the largest headline on
 * the page drives the final conversion.
 */
export function CtaSection(props: { consoleTo: '/dashboard' | '/sign-up' }) {
  const { t } = useTranslation()
  const reveal = useReveal<HTMLDivElement>()

  return (
    <section className='relative flex min-h-[92vh] items-center justify-center overflow-hidden border-t border-[var(--om-border-weak)]'>
      <div
        aria-hidden='true'
        className='absolute inset-0'
        style={{
          background:
            'radial-gradient(80% 90% at 50% 100%,rgba(205,255,78,0.08),transparent 60%)',
        }}
      />

      <OmCornerFrame className='top-20 right-9 bottom-40 left-9' size={48} opacity={0.45} />

      <div
        ref={reveal.ref}
        className={cn(
          'om-reveal relative z-[3] px-6 text-center',
          reveal.inView && 'is-in'
        )}
      >
        <OmMonoLabel accent className='mb-[26px] block tracking-[0.2em]'>
          // ENTER THE CONTROL CENTER
        </OmMonoLabel>
        <h2 className='om-display m-0 text-[clamp(48px,8.5vw,150px)] leading-[0.92] font-black tracking-[-0.03em] text-[var(--om-text-strong)]'>
          {t('Take command of')}
          <br />
          {t('your AI APIs')}
        </h2>
        <p className='mx-auto mt-[30px] mb-10 max-w-[480px] text-[16px] leading-[1.7] text-[var(--om-text-2)]'>
          {t(
            'Sign up for free trial credits and land your first request in five minutes. Fast, stable, and precise.'
          )}
        </p>
        <div className='flex items-center justify-center gap-[18px]'>
          <OmButton size='lg' render={<Link to={props.consoleTo} />}>
            {t('Enter Console')}
            <span aria-hidden='true'>→</span>
          </OmButton>
          <OmButton size='lg' variant='ghost' render={<Link to='/docs' />}>
            {t('View Docs')}
          </OmButton>
        </div>
      </div>
    </section>
  )
}
