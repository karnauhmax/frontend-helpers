import { ref } from 'vue'

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

const outputValue = ref('')
const inputValue = ref('')
const selectedOption = ref<TMinifyValue.title>('jsd')
const showOutput = ref(false)

const HANDLERS_MAP = {
  [MINIFY_TYPES.JS]: minifyJavaScript,
  [MINIFY_TYPES.CSS]: minifyCss,
  [MINIFY_TYPES.HTML]: minifyHtml
}

const generateHandler = () => {
  const selectedOptionValue = selectedOption.value
  const inputValueValue = inputValue.value

  const selectedHandler = HANDLERS_MAP[selectedOptionValue]

  if (!selectedHandler) return

  outputValue.value = selectedHandler(inputValueValue)

  showOutput.value = true
}

const updateHandler = (value) => {
  selectedOption.value = value

  outputValue.value = ''
  inputValue.value = ''
  showOutput.value = false
}

export function useCodeMinifier() {}
