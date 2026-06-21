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
import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { OmniNav } from '@/features/home/components/omni/omni-nav'
import { DocsMarkdown } from './components/docs-markdown'
import { DocsSidebar } from './components/docs-sidebar'
import { findDocPage, getAdjacentDocs } from './nav'
import '@/styles/omni.css'
import '@/styles/docs.css'

const PAGER_CLASS =
  'flex min-w-0 flex-col gap-1 rounded-[10px] border border-[var(--om-border-weak)] px-4 py-3 no-underline transition-colors duration-150 hover:border-[var(--om-border-accent)]'

/**
 * In-app documentation page. The OmniAPI nav sits on top; a sticky section
 * sidebar on the left; the selected Markdown page in the center. Pages are
 * authored as `.md` files under `./content` (see `./nav.ts`).
 */
export function DocsPage(props: { slug?: string }) {
  const user = useAuthStore((s) => s.auth.user)
  const page = findDocPage(props.slug)
  const { prev, next } = getAdjacentDocs(page.slug)

  // Each doc page starts at the top when navigated to.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [page.slug])

  return (
    <div className='om-root dark relative min-h-svh'>
      <OmniNav isAuthenticated={!!user} />
      <div className='mx-auto flex w-full max-w-[1180px] gap-10 px-6 pt-[88px] pb-24 md:px-9'>
        <DocsSidebar currentSlug={page.slug} />
        <article className='om-doc-content min-w-0 max-w-[820px] flex-1'>
          <DocsMarkdown>{page.content}</DocsMarkdown>

          <div className='mt-14 flex items-stretch justify-between gap-4 border-t border-[var(--om-border-weak)] pt-6'>
            {prev ? (
              <Link to='/docs/$slug' params={{ slug: prev.slug }} className={PAGER_CLASS}>
                <span className='om-mono text-[11px] text-[var(--om-text-faint)]'>
                  ← 上一页
                </span>
                <span className='truncate text-[var(--om-text)]'>
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to='/docs/$slug'
                params={{ slug: next.slug }}
                className={`${PAGER_CLASS} items-end text-right`}
              >
                <span className='om-mono text-[11px] text-[var(--om-text-faint)]'>
                  下一页 →
                </span>
                <span className='truncate text-[var(--om-text)]'>
                  {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </article>
      </div>
    </div>
  )
}
