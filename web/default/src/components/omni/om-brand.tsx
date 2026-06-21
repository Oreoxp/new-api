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

/** Default marketing brand for this deployment's landing/chrome. */
export const OMNI_BRAND_NAME = 'OmniAPI'

const OMNI_BRAND_FONT =
  "'Archivo', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif"

/**
 * OmniAPI logo mark — a lime rounded square with the ∞ glyph, optionally
 * followed by the brand name. Uses the global `--primary` token (set to acid
 * lime by omni-theme.css) so it renders identically across the landing page,
 * the console header, the sidebar, and public pages — no `.om-root` scope
 * required. Archivo is loaded globally via index.html.
 */
export function OmniBrandMark(props: {
  size?: number
  showName?: boolean
  name?: string
  className?: string
  nameClassName?: string
}) {
  const size = props.size ?? 28
  const name = props.name ?? OMNI_BRAND_NAME
  return (
    <span
      className={cn('inline-flex items-center gap-2', props.className)}
      style={{ fontFamily: OMNI_BRAND_FONT }}
    >
      <span
        aria-hidden='true'
        className='bg-primary text-primary-foreground inline-flex shrink-0 items-center justify-center rounded-[7px] font-extrabold'
        style={{
          width: size,
          height: size,
          fontSize: Math.round(size * 0.56),
        }}
      >
        ∞
      </span>
      {props.showName !== false && (
        <span
          className={cn('font-bold tracking-[-0.01em]', props.nameClassName)}
        >
          {name}
        </span>
      )}
    </span>
  )
}
