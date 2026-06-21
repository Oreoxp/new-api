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
import { OmFilmGrain, OmScrollProgress } from '@/components/omni'
import '@/styles/omni.css'
import { AggregationSection } from './aggregation-section'
import { BrandWordmark } from './brand-wordmark'
import { CtaSection } from './cta-section'
import { FrontierSection } from './frontier-section'
import { OmniFooter } from './omni-footer'
import { OmniNav } from './omni-nav'
import { StabilitySection } from './stability-section'
import { VelocitySection } from './velocity-section'

/**
 * OmniAPI landing page — "Controlled Velocity".
 *
 * A single long-scroll page wrapped in `.om-root` so it renders in the one dark
 * style regardless of the app's global theme. Built entirely from the OmniAPI
 * UI kit (src/components/omni) + section-local canvas effects. Section order:
 * Frontier → Velocity → Aggregation → Stability → CTA → wordmark → footer.
 */
export function OmniHome(props: { isAuthenticated?: boolean }) {
  const consoleTo: '/dashboard' | '/sign-up' = props.isAuthenticated
    ? '/dashboard'
    : '/sign-up'
  const getKeyTo: '/keys' | '/sign-in' = props.isAuthenticated
    ? '/keys'
    : '/sign-in'

  // `dark` keeps the reused app header controls (language menu, announcements,
  // profile dropdown) rendering on the dark palette inside this scope.
  return (
    <div id='om-top' className='om-root dark relative flex min-h-svh flex-col'>
      <OmFilmGrain />
      {/* Scanline vignette */}
      <div
        aria-hidden='true'
        className='pointer-events-none fixed inset-0 z-[88]'
        style={{
          background:
            'radial-gradient(120% 120% at 50% 0%,transparent 55%,rgba(0,0,0,0.55) 100%)',
        }}
      />
      <OmScrollProgress />
      <OmniNav isAuthenticated={props.isAuthenticated} />

      <main>
        <FrontierSection getKeyTo={getKeyTo} />
        <VelocitySection />
        <AggregationSection />
        <StabilitySection />
        <CtaSection consoleTo={consoleTo} />
      </main>

      <BrandWordmark />
      <OmniFooter isAuthenticated={props.isAuthenticated} />
    </div>
  )
}
