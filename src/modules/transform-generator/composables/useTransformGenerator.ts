import { ref, computed } from 'vue'
import { RULES, type ITransformRule } from '../types'
import { UNITS } from '@/types'

const cssRulesToChange = ref<ITransformRule[]>([
  {
    id: 1,
    name: RULES.translateX.title,
    cssValue: RULES.translateX.cssValue,
    value: 0,
    min: -200,
    max: 200,
    step: 1,
    unit: UNITS.PX
  },

  {
    id: 2,
    name: RULES.translateY.title,
    cssValue: RULES.translateY.cssValue,
    value: 0,
    min: -200,
    max: 200,
    step: 1,
    unit: UNITS.PX
  },

  {
    id: 3,
    name: 'Scale',
    cssValue: 'scale',
    value: 1,
    min: 0,
    max: 2,
    step: 0.01,
    unit: ''
  },

  {
    id: 4,
    name: 'Rotate',
    cssValue: 'rotate',
    value: 0,
    min: -360,
    max: 360,
    step: 1,
    unit: UNITS.DEG
  },

  {
    id: 5,
    name: RULES.skew.title,
    cssValue: RULES.skew.cssValue,
    value: 0,
    min: -360,
    max: 360,
    step: 1,
    unit: UNITS.DEG
  }
])

const newRuleHandler = (rule: ITransformRule) => {
  const isScale = rule.cssValue === RULES.scale.cssValue

  if (isScale && rule.value === 1) {
    return null
  }

  if (rule.value || isScale) {
    return `${rule.cssValue}(${rule.value}${rule.unit}) `
  }
}

const showResult = computed(() => {
  return cssRulesToChange.value.some((rule) => {
    const isScale = rule.cssValue === RULES.scale.cssValue

    if (isScale && rule.value === 1) {
      return false
    }

    if (isScale) {
      return true
    }

    return rule.value !== 0
  })
})

const dynamicStyles = computed(() => {
  const result = `

${cssRulesToChange.value.map(newRuleHandler).join('')}

`

  return result
})

const output = computed(() => {
  return `transform: ${dynamicStyles.value} ;`
})

export function useTransformGenerator() {
  return { cssRulesToChange, output, showResult, dynamicStyles }
}
