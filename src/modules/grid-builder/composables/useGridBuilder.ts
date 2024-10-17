import { pxToRem } from '@/helpers/pxToRem'
import { type TUnits } from '../types'

/**
 *
 * @param units Units seleceted. Either 'px' or 'rem'
 * @param width Width in pixels
 * @returns Width in px or rem
 */

function calculateWidth(units: TUnits, width: number) {
  if (units === 'rem') {
    return pxToRem(width)
  }

  return width
}

export function useGridBuilder() {
  return { calculateWidth }
}
