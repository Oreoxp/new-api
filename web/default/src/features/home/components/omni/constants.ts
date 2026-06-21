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
 * OmniAPI landing constants.
 *
 * Brand strings are kept here so the marketing identity for this deployment is
 * adjustable in one place. They intentionally do not touch the protected
 * project attribution rendered in the footer.
 */
export const BRAND_NAME = 'OmniAPI'
export const API_DOMAIN = 'omniapi.top'

// Provider names for the infinite ticker. Vendor names only — no version
// numbers / "NEW" tags — so the list stays low-maintenance. `accent` paints
// the chip lime.
export const TICKER_MODELS: { name: string; accent?: boolean }[] = [
  { name: 'GPT' },
  { name: 'Claude', accent: true },
  { name: 'Gemini' },
  { name: 'DeepSeek' },
  { name: 'Grok' },
  { name: 'Llama' },
  { name: 'Qwen' },
  { name: 'Kimi' },
  { name: 'Mistral' },
  { name: 'GLM' },
]
