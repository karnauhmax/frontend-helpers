import { pxToRem } from '@/helpers/pxToRem'
import { type MaybeRefOrGetter, computed, toValue } from 'vue'

interface IOptions {
  viewportMin: MaybeRefOrGetter<number>
  viewportMax: MaybeRefOrGetter<number>
  valuesMin: MaybeRefOrGetter<number>
  valuesMax: MaybeRefOrGetter<number>
}

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
