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
import { cn } from '@/lib/utils'
import { useScrollProgress } from './use-scroll-progress'

// Inline SVG fractal-noise, used as a subtle film-grain overlay across the
// whole surface. Data URI so there's no image asset to ship.
const GRAIN_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

/** Full-viewport film-grain texture. Purely decorative. */
export function OmFilmGrain(props: { className?: string }) {
  return (
    <div
      aria-hidden='true'
      className={cn(
        'pointer-events-none fixed inset-0 z-[90] opacity-[0.05] mix-blend-overlay',
        props.className
      )}
      style={{ backgroundImage: `url("${GRAIN_URI}")` }}
    />
  )
}

/** Thin lime scroll-progress bar pinned to the top of the viewport. */
export function OmScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div
      aria-hidden='true'
      className='fixed inset-x-0 top-0 z-[100] h-0.5 origin-left bg-[var(--om-accent)] shadow-[0_0_10px_rgba(205,255,78,0.7)]'
      style={{ transform: `scaleX(${progress})` }}
    />
  )
}
