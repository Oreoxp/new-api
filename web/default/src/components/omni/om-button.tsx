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
import { isValidElement } from 'react'
import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * OmniAPI button — "Controlled Velocity" kit.
 *
 * - primary: acid-lime fill, mono 700, restrained lime glow, hover lift.
 * - ghost: 1px strong border, transparent, border turns lime on hover.
 *
 * Polymorphic via Base UI's `render` (same pattern as the app's Button), so it
 * composes with TanStack `<Link>` and plain `<a>`:
 *   <OmButton render={<Link to="/dashboard" />}>Enter Console →</OmButton>
 */
const omButtonVariants = cva(
  "om-mono inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[var(--om-radius-btn)] no-underline outline-none transition-[transform,box-shadow,border-color,color] duration-150 ease-[var(--om-ease)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--om-accent)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          'border-none bg-[var(--om-accent)] font-bold tracking-[0.02em] text-[var(--om-accent-ink)] shadow-[var(--om-shadow-cta)] hover:-translate-y-0.5',
        ghost:
          'border border-[var(--om-border-strong)] bg-transparent font-medium text-[var(--om-text)] hover:border-[var(--om-accent)]',
      },
      size: {
        md: 'px-7 py-[15px] text-sm',
        lg: 'px-[34px] py-[17px] text-[15px]',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        size: 'lg',
        class: 'shadow-[var(--om-shadow-cta-lg)]',
      },
    ],
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

function isNativeButtonRender(render: ButtonPrimitive.Props['render']) {
  if (!render || !isValidElement(render)) {
    return true
  }
  return render.type === 'button'
}

function OmButton({
  className,
  variant = 'primary',
  size = 'md',
  nativeButton,
  render,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof omButtonVariants>) {
  return (
    <ButtonPrimitive
      data-slot='om-button'
      className={cn(omButtonVariants({ variant, size, className }))}
      nativeButton={nativeButton ?? isNativeButtonRender(render)}
      render={render}
      {...props}
    />
  )
}

export { OmButton, omButtonVariants }
