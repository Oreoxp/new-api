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
import { BRAND_NAME } from './constants'

/**
 * Oversized brand wordmark — dark engraved gradient text with a thin lime
 * gradient hairline beneath, bridging the CTA section and the footer.
 */
export function BrandWordmark() {
  return (
    <div className='relative overflow-hidden bg-[var(--om-bg)] pt-10 leading-[0]'>
      <div className='absolute inset-x-0 top-0 h-px bg-[var(--om-border-weak)]' />
      <div className='om-display bg-clip-text text-center text-[clamp(96px,23vw,420px)] leading-[0.78] font-black tracking-[-0.04em] whitespace-nowrap text-transparent select-none [background-image:linear-gradient(180deg,#1b2026_0%,#0c0e12_70%)]'>
        {BRAND_NAME.toUpperCase()}
      </div>
      <div className='absolute bottom-0 left-1/2 h-px w-[min(1100px,86%)] -translate-x-1/2 [background:linear-gradient(90deg,transparent,rgba(205,255,78,.5),transparent)]' />
    </div>
  )
}
