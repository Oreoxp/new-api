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
import { cn } from '@/lib/utils'
import { DOC_SECTIONS } from '../nav'

const LINK_BASE =
  'block rounded-[7px] px-3 py-1.5 text-[13.5px] no-underline transition-colors duration-150'
const LINK_ACTIVE =
  'bg-[rgba(205,255,78,0.1)] font-medium text-[var(--om-accent)]'
const LINK_IDLE =
  'text-[var(--om-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--om-text)]'

/**
 * Sticky left navigation — stays fixed while content scrolls. Each section is
 * a category header + page links; the manual-integration tools are individual
 * short pages, so jumping between them is a normal page navigation (no in-page
 * scrolling required).
 */
export function DocsSidebar(props: { currentSlug: string }) {
  return (
    <aside className='hidden w-56 shrink-0 md:block'>
      <nav className='hover-scrollbar sticky top-[84px] flex max-h-[calc(100svh-104px)] flex-col gap-6 overflow-y-auto pr-1 pb-6'>
        {DOC_SECTIONS.map((section) => (
          <div key={section.title}>
            <div className='om-mono mb-2.5 text-[11px] tracking-[0.16em] text-[var(--om-text-faint)] uppercase'>
              {section.title}
            </div>
            <ul className='flex flex-col gap-0.5'>
              {section.pages.map((page) => (
                <li key={page.slug}>
                  <Link
                    to='/docs/$slug'
                    params={{ slug: page.slug }}
                    className={cn(
                      LINK_BASE,
                      page.slug === props.currentSlug ? LINK_ACTIVE : LINK_IDLE
                    )}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
