import { ref, toValue } from 'vue'

import { type IMinifyOption, type TMinifyValue, MINIFY_TYPES } from '@/modules/code-minifier/types'

const minifyOptions = ref<IMinifyOption[]>([
  {
    title: 'HTML',
    value: 'html',
    checked: false
  },

  {
    title: 'JavaScript',
    value: 'js',
    checked: true
  },
  {
    title: 'CSS',
    value: 'css',
    checked: false
  },

  {
    title: 'SCSS',
    value: 'scss',
    checked: false
  }
])

const minifyHtml = (input: string): string => {
  const minifiedValue = input
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')

  return minifiedValue
}

const minifyCss = (input: string): string => {
  const minifiedValue = input
    .replace(/([^0-9a-zA-Z\.#])\s+/g, '$1')
    .replace(/\s([^0-9a-zA-Z\.#]+)/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\/\*.*?\*\//g, '')

  return minifiedValue
}

const minifyJavaScript = (input: string): string => {
  let minifiedValue = input.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')

  minifiedValue = minifiedValue.replace(/\s+/g, ' ')

  return minifiedValue
}

const HANDLERS_MAP: Record<TMinifyValue['value'], (input: string) => string> = {
  [MINIFY_TYPES.JS.value]: minifyJavaScript,
  [MINIFY_TYPES.CSS.value]: minifyCss,
  [MINIFY_TYPES.HTML.value]: minifyHtml,
  [MINIFY_TYPES.SCSS.value]: minifyCss
}

const generateMinifiedCode = (type: TMinifyValue['value'], input: string) => {
  const inputValueValue = toValue(input)

  const selectedHandler = HANDLERS_MAP[type]

  if (!selectedHandler) return

  return selectedHandler(inputValueValue)
}

export function useCodeMinifier() {
  return { minifyOptions, generateMinifiedCode }
}
