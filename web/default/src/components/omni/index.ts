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
/**
 * OmniAPI UI kit — "Controlled Velocity".
 *
 * Reusable, single-dark-style primitives for the redesigned frontend. New
 * pages should build on these so the visual language stays consistent. Wrap
 * any screen using them in an element carrying the `om-root` class (see
 * src/styles/omni.css) to scope the dark tokens.
 */
export { OmniBrandMark, OMNI_BRAND_NAME } from './om-brand'
export { OmButton, omButtonVariants } from './om-button'
export { OmTag, OmStatusPill, OmStatusDot } from './om-tag'
export { OmPanel } from './om-panel'
export { OmMonoLabel } from './om-mono-label'
export { OmCornerFrame } from './om-corner-frame'
export { OmFilmGrain, OmScrollProgress } from './om-texture'
export { useReveal } from './use-reveal'
export { useScrollProgress } from './use-scroll-progress'
