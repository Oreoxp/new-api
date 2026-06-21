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
 * Mono micro-label (e.g. "// 01 — FRONTIER", "CONTROLLED VELOCITY"). Wide
 * tracking, faint by default; `accent` paints it lime. These are technical
 * readouts and stay English across locales by design.
 */
export function OmMonoLabel(props: {
  accent?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        'om-mono text-[12px] tracking-[0.18em]',
        props.accent ? 'text-[var(--om-accent)]' : 'text-[var(--om-text-faint)]',
        props.className
      )}
    >
      {props.children}
    </span>
  )
}
