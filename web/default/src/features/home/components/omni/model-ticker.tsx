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
import { OmTag } from '@/components/omni'
import { TICKER_MODELS } from './constants'

/**
 * Infinite horizontal provider ticker. The list is rendered twice and the
 * track translates -50%, so the seam is invisible (head meets tail).
 */
export function ModelTicker() {
  const loop = [...TICKER_MODELS, ...TICKER_MODELS]
  return (
    <div className='overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]'>
      <div className='flex w-max animate-[om-tick_40s_linear_infinite]'>
        {loop.map((model, i) => (
          <OmTag key={i} accent={model.accent} className='mr-3.5'>
            {model.name}
          </OmTag>
        ))}
      </div>
    </div>
  )
}
