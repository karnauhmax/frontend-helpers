import { pxToRem } from '@/helpers/pxToRem'
import { type MaybeRefOrGetter, computed, toValue } from 'vue'

interface IOptions {
  viewportMin: MaybeRefOrGetter<number>
  viewportMax: MaybeRefOrGetter<number>
  valuesMin: MaybeRefOrGetter<number>
  valuesMax: MaybeRefOrGetter<number>
}

/**
 * Calculates clamp CSS function based on viewport and values min and max
 *
 * @param {IOptions} options - object with 4 properties:
 *   - viewportMin: the minimum viewport width
 *   - viewportMax: the maximum viewport width
 *   - valuesMin: the minimum value
 *   - valuesMax: the maximum value
 *
 * @returns {Object} an object with a single property `calculatedClamp`, which is a computed property
 *   returning the calculated clamp function as a string.
 *
 * @example
 * const { calculatedClamp } = useClampCalculator({
 *   viewportMin: 360,
 *   viewportMax: 1920,
 *   valuesMin: 16,
 *   valuesMax: 24,
 * })
 *
 * console.log(calculatedClamp.value) // 'clamp(1rem, 0.0625rem + 4.166667vw, 1.5rem)'
 */

export function useClampCalculator(options: IOptions) {
  const { viewportMin, viewportMax, valuesMin, valuesMax } = options

  const variablePart = computed(() => {
    return (toValue(valuesMax) - toValue(valuesMin)) / (toValue(viewportMax) - toValue(viewportMin))
  })

  const constant = computed(() => {
    return parseFloat(((toValue(valuesMin) - toValue(viewportMax) * variablePart.value) / 16).toFixed(3))
  })

  const minPx = computed(() => {
    return pxToRem(toValue(valuesMin))
  })

  const maxPx = computed(() => {
    return pxToRem(toValue(valuesMax))
  })

  const calculatedClamp = computed(() => {
    return `clamp(${minPx.value}rem, ${
      constant.value ? `${constant.value}rem + ` : ''
    } ${parseFloat((100 * variablePart.value).toFixed(2))}vw, ${maxPx.value}rem)`
  })

  return { calculatedClamp }
}
