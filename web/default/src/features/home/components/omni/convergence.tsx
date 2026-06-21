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

// Convergence lines for screen 03 — eight curves running permanently from the
// provider labels to the central node, with a light pulse flowing along each.
// The geometry is static (no scroll dependency); the flowing dots use SMIL
// animateMotion (declarative, no rAF) so they ride the exact path.

const CENTER = { x: 600, y: 350 }

// Pixel coords inside the 1200×700 viewBox (stretched, preserveAspectRatio
// none). Indices 1 and 4 are the lime-accented providers (Claude, Grok).
const SOURCES = [
  { x: 60, y: 91 },
  { x: 60, y: 301 },
  { x: 60, y: 511 },
  { x: 1140, y: 126 },
  { x: 1140, y: 336 },
  { x: 1140, y: 546 },
  { x: 300, y: 35 },
  { x: 900, y: 35 },
]

function isAccent(i: number): boolean {
  return i === 1 || i === 4
}

function buildPath(s: { x: number; y: number }): string {
  const c1x = s.x + (CENTER.x - s.x) * 0.42
  const c1y = s.y + (CENTER.y - s.y) * 0.12
  const c2x = CENTER.x + (s.x - CENTER.x) * 0.16
  const c2y = CENTER.y + (s.y - CENTER.y) * 0.28
  return `M${s.x} ${s.y} C ${c1x} ${c1y} ${c2x} ${c2y} ${CENTER.x} ${CENTER.y}`
}

export function ConvergenceLines() {
  return (
    <svg
      aria-hidden='true'
      viewBox='0 0 1200 700'
      preserveAspectRatio='none'
      className='absolute inset-0 h-full w-full'
    >
      {SOURCES.map((s, i) => {
        const accent = isAccent(i)
        const id = `om-conv-path-${i}`
        const d = buildPath(s)
        const dotColor = accent ? '#cdff4e' : '#aebbd2'
        const dur = `${3 + (i % 4) * 0.7}s`
        const begin = `-${(i * 0.6).toFixed(1)}s`
        return (
          <g key={id}>
            <path
              id={id}
              d={d}
              fill='none'
              stroke={accent ? '#cdff4e' : 'rgba(150,175,215,0.6)'}
              strokeWidth={accent ? 2.4 : 1.2 + (i % 3) * 0.5}
              strokeLinecap='round'
              opacity={accent ? 0.95 : 0.78}
            />
            <circle
              r={accent ? 3.6 : 2.4}
              fill={dotColor}
              style={{
                filter: `drop-shadow(0 0 6px ${
                  accent ? 'rgba(205,255,78,.9)' : 'rgba(150,170,205,.6)'
                })`,
              }}
            >
              <animateMotion
                dur={dur}
                begin={begin}
                repeatCount='indefinite'
                rotate='auto'
              >
                <mpath href={`#${id}`} />
              </animateMotion>
            </circle>
          </g>
        )
      })}
    </svg>
  )
}
