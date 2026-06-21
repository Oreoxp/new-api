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
 * Panel / card surface. Thin border + a very faint top-down glass gradient.
 * Depth comes from the border and base-lightness difference — never from heavy
 * shadows or colored glows (see design system DON'Ts).
 */
export function OmPanel(props: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[var(--om-radius-panel)] border border-[var(--om-border-weak)] bg-[image:var(--om-panel-glass)]',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
