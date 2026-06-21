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
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/auth-store'
import { Markdown } from '@/components/ui/markdown'
import { PublicLayout } from '@/components/layout'
import { OmniHome } from './components/omni'
import { useHomePageContent } from './hooks'
// OmniAPI design tokens — also needed by the dark loading state below.
import '@/styles/omni.css'

// ── Legacy default landing building blocks (preserved, not deleted) ──────────
// The redesign swaps the visual style but the old marketing sections may still
// be reused later. Re-enable these imports + the legacy return block below to
// restore the previous landing page.
// import { Footer } from '@/components/layout/components/footer'
// import { CTA, Features, Hero, HowItWorks, Stats } from './components'

export function Home() {
  const { t } = useTranslation()
  const { auth } = useAuthStore()
  const isAuthenticated = !!auth.user
  const { content, isLoaded, isUrl } = useHomePageContent()

  if (!isLoaded) {
    // Dark loader, styled with the OmniAPI tokens, so there's no light flash
    // before the landing page mounts.
    return (
      <div className='om-root flex min-h-svh items-center justify-center'>
        <div className='om-mono text-[13px] tracking-[0.18em] text-[var(--om-text-faint)]'>
          {t('Loading...')}
        </div>
      </div>
    )
  }

  // Custom home page content configured in System Settings (Markdown/HTML, or
  // an iframe URL) still takes precedence — behavior unchanged, kept on the
  // shared public layout.
  if (content) {
    return (
      <PublicLayout showMainContainer={false}>
        <main className='overflow-x-hidden'>
          {isUrl ? (
            <iframe
              src={content}
              className='h-screen w-full border-none'
              title={t('Custom Home Page')}
            />
          ) : (
            <div className='container mx-auto py-8'>
              <Markdown className='custom-home-content'>{content}</Markdown>
            </div>
          )}
        </main>
      </PublicLayout>
    )
  }

  // Default landing: the OmniAPI "Controlled Velocity" redesign.
  return <OmniHome isAuthenticated={isAuthenticated} />

  /*
   * ── Previous default landing (kept for reference / reuse) ──────────────────
   * return (
   *   <PublicLayout showMainContainer={false}>
   *     <Hero isAuthenticated={isAuthenticated} />
   *     <Stats />
   *     <Features />
   *     <HowItWorks />
   *     <CTA isAuthenticated={isAuthenticated} />
   *     <Footer />
   *   </PublicLayout>
   * )
   */
}
