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
import { OmniBrandMark } from '@/components/omni/om-brand'
import { API_DOMAIN, BRAND_NAME } from './constants'

const FOOTER_LINK_CLASS =
  'om-mono text-[12px] text-[var(--om-text-muted)] no-underline transition-colors duration-200 hover:text-[var(--om-accent)]'

export function OmniFooter(props: { isAuthenticated?: boolean }) {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  const consoleTo = props.isAuthenticated ? '/dashboard' : '/sign-in'

  return (
    <footer className='relative z-[3] border-t border-[var(--om-border-weak)] bg-[var(--om-bg)] px-9 py-10'>
      <div className='flex flex-wrap items-center justify-between gap-5'>
        {/* Brand */}
        <div className='flex items-center gap-[11px]'>
          <OmniBrandMark
            size={26}
            name={BRAND_NAME}
            nameClassName='text-[15px] text-[var(--om-text)]'
          />
          <span className='om-mono ml-2.5 text-[12px] text-[var(--om-text-faint)]'>
            {API_DOMAIN}
          </span>
        </div>

        {/* Links */}
        <div className='flex items-center gap-6'>
          <Link to={consoleTo} className={FOOTER_LINK_CLASS}>
            {t('Console')}
          </Link>
          <Link to='/pricing' className={FOOTER_LINK_CLASS}>
            {t('Model Square')}
          </Link>
          <Link to='/docs' className={FOOTER_LINK_CLASS}>
            {t('Docs')}
          </Link>
          <a href='#om-top' className={FOOTER_LINK_CLASS}>
            {t('Status')}
          </a>
        </div>

        {/* Copyright */}
        <div className='om-mono text-[12px] text-[var(--om-text-faint)]'>
          © {year} {BRAND_NAME.toUpperCase()} · CONTROLLED VELOCITY
        </div>
      </div>

      {/*
        Project attribution — required by project policy. Do not remove the
        New API / QuantumNous credit and repository link.
      */}
      <div className='mt-6 border-t border-[var(--om-border-weak)] pt-5 text-center'>
        <span className='om-mono text-[11px] text-[var(--om-text-faint)]'>
          Powered by{' '}
          <a
            href='https://github.com/QuantumNous/new-api'
            target='_blank'
            rel='noopener noreferrer'
            className='text-[var(--om-text-muted)] no-underline transition-colors duration-200 hover:text-[var(--om-accent)]'
          >
            New API
          </a>
        </span>
      </div>
    </footer>
  )
}
