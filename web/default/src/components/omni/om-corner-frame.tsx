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

/**
 * HUD corner ticks — four L-shaped marks at the corners of this box. Position
 * and size the frame from the parent; the ticks sit at its corners:
 *   <OmCornerFrame className='inset-x-9 top-24 bottom-9' />
 */
export function OmCornerFrame(props: {
  className?: string
  size?: number
  /** Border opacity for the lime ticks (default 0.5). */
  opacity?: number
}) {
  const size = props.size ?? 54
  const color = `rgba(205,255,78,${props.opacity ?? 0.5})`
  const box = { width: size, height: size, position: 'absolute' as const }
  const line = `1px solid ${color}`

  return (
    <div
      aria-hidden='true'
      className={cn('pointer-events-none absolute', props.className)}
    >
      <span
        style={{ ...box, top: 0, left: 0, borderLeft: line, borderTop: line }}
      />
      <span
        style={{ ...box, top: 0, right: 0, borderRight: line, borderTop: line }}
      />
      <span
        style={{
          ...box,
          bottom: 0,
          left: 0,
          borderLeft: line,
          borderBottom: line,
        }}
      />
      <span
        style={{
          ...box,
          bottom: 0,
          right: 0,
          borderRight: line,
          borderBottom: line,
        }}
      />
    </div>
  )
}
