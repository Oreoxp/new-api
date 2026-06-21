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
 * Blinking lime status dot (with restrained glow). Decorative by default.
 */
export function OmStatusDot(props: { className?: string }) {
  return (
    <span
      aria-hidden='true'
      className={cn(
        'inline-block size-[6px] shrink-0 rounded-full bg-[var(--om-accent)] shadow-[var(--om-glow-dot)] animate-[om-blink_2s_ease-in-out_infinite]',
        props.className
      )}
    />
  )
}

/**
 * Tag / badge. Neutral border by default; `accent` switches to the lime ladder.
 * Used for provider chips and inline labels.
 */
export function OmTag(props: {
  accent?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        'om-mono inline-flex items-center gap-2 whitespace-nowrap rounded-[var(--om-radius-btn)] border px-4 py-2 text-[13px]',
        props.accent
          ? 'border-[var(--om-border-accent)] text-[var(--om-accent)]'
          : 'border-[var(--om-border-mid)] text-[#cfd4db]',
        props.className
      )}
    >
      {props.children}
    </span>
  )
}

/**
 * Status pill (radius 999) — lime border + faint tint + glowing dot. For
 * "ONLINE / NOMINAL" style state indicators.
 */
export function OmStatusPill(props: {
  label: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'om-mono inline-flex items-center gap-[7px] rounded-full border border-[rgba(205,255,78,0.3)] bg-[rgba(205,255,78,0.07)] px-[14px] py-2 text-[13px] text-[var(--om-accent)]',
        props.className
      )}
    >
      <OmStatusDot />
      {props.label}
    </span>
  )
}
