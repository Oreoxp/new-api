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
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useNotifications } from '@/hooks/use-notifications'
import { LanguageSwitcher } from '@/components/language-switcher'
import { NotificationPopover } from '@/components/notification-popover'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { OmStatusDot } from '@/components/omni'
import { OmniBrandMark } from '@/components/omni/om-brand'

const NAV_LINK_CLASS =
  'text-[13.5px] font-medium text-[var(--om-text-muted)] no-underline transition-colors duration-200 hover:text-[var(--om-text)]'

/**
 * Fixed glass top navigation for the landing page. Brand on the left, nav links
 * and controls grouped on the right — matching the console header arrangement.
 * Reuses the app's real header controls (language, announcements, profile) so no
 * functionality is lost.
 */
export function OmniNav(props: { isAuthenticated?: boolean }) {
  const { t } = useTranslation()
  const notifications = useNotifications()
  const consoleTo = props.isAuthenticated ? '/dashboard' : '/sign-in'

  return (
    <nav className='fixed inset-x-0 top-0 z-[80] flex items-center justify-between border-b border-[var(--om-border-weak)] px-6 py-3 backdrop-blur-[14px] [background:linear-gradient(180deg,rgba(6,7,10,0.7),rgba(6,7,10,0))] md:px-9'>
      {/* Brand (left) */}
      <Link to='/' className='no-underline'>
        <OmniBrandMark
          size={28}
          nameClassName='text-base text-[var(--om-text)]'
        />
      </Link>

      {/* Nav links + controls (right — matches the console header) */}
      <div className='flex items-center gap-1.5'>
        <div className='hidden items-center gap-[26px] md:flex'>
          <Link
            to='/'
            className={cn(NAV_LINK_CLASS, 'text-[var(--om-text)]')}
            aria-current='page'
          >
            {t('Home')}
          </Link>
          <Link to={consoleTo} className={NAV_LINK_CLASS}>
            {t('Console')}
          </Link>
          <Link to='/pricing' className={NAV_LINK_CLASS}>
            {t('Model Square')}
          </Link>
          <Link to='/docs' className={NAV_LINK_CLASS}>
            {t('Docs')}
          </Link>
        </div>

        {/* System status indicator */}
        <div className='mr-1 ml-3 hidden items-center gap-2 lg:flex'>
          <OmStatusDot />
          <span className='om-mono text-[11px] tracking-[0.08em] text-[var(--om-text-muted)]'>
            ALL SYSTEMS NOMINAL
          </span>
        </div>

        <div className='mx-1 hidden h-4 w-px bg-[var(--om-border-mid)] md:block' />

        {/* Language switcher (all locales), system announcements */}
        <LanguageSwitcher />
        <NotificationPopover
          open={notifications.popoverOpen}
          onOpenChange={notifications.setPopoverOpen}
          unreadCount={notifications.unreadCount}
          activeTab={notifications.activeTab}
          onTabChange={notifications.setActiveTab}
          notice={notifications.notice}
          announcements={notifications.announcements}
          loading={notifications.loading}
        />

        {/* Auth state: profile menu when signed in, otherwise a sign-in CTA */}
        {props.isAuthenticated ? (
          <ProfileDropdown />
        ) : (
          <Link
            to='/sign-in'
            className='om-mono ml-1 rounded-[var(--om-radius-btn)] bg-[var(--om-accent)] px-3.5 py-1.5 text-[12px] font-bold text-[var(--om-accent-ink)] no-underline transition-transform duration-150 hover:-translate-y-0.5'
          >
            {t('Sign in')}
          </Link>
        )}
      </div>
    </nav>
  )
}
