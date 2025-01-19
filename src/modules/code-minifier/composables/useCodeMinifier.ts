import { ref, toValue } from 'vue'

import { type IMinifyOption, type TMinifyValue, MINIFY_TYPES } from '../types'

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

/**
 * Minifies an HTML string by removing comments, reducing whitespace,
 * and eliminating spaces between tags.
 *
 * @param input - The HTML string to be minified.
 * @returns The minified HTML string.
 */
const minifyHtml = (input: string): string => {
  const minifiedValue = input
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')

  return minifiedValue
}

  /**
   * Minifies a CSS string by removing spaces between property values,
   * property names and their values, semicolons and whitespace, and
   * comments.
   *
   * @param input - The CSS string to be minified.
   * @returns The minified CSS string.
   */
const minifyCss = (input: string): string => {
  const minifiedValue = input
    .replace(/([^0-9a-zA-Z\.#])\s+/g, '$1')
    .replace(/\s([^0-9a-zA-Z\.#]+)/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\/\*.*?\*\//g, '')

  return minifiedValue
}

  /**
   * Minifies a JavaScript string by removing comments, and reducing
   * whitespace to a single space.
   *
   * @param input - The JavaScript string to be minified.
   * @returns The minified JavaScript string.
   */
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

  /**
   * Given a minification type and an input string, returns the minified version
   * of that input string.
   *
   * @param type - The type of minification to perform. Must match one of the
   *   values in the {@link MINIFY_TYPES} object.
   * @param input - The string to be minified.
   * @returns The minified string, or undefined if the `type` is not recognized.
   */
const generateMinifiedCode = (type: TMinifyValue['value'], input: string) => {
  const inputValueValue = toValue(input)

  const selectedHandler = HANDLERS_MAP[type]

  if (!selectedHandler) return

  return selectedHandler(inputValueValue)
}

export function useCodeMinifier() {
  return { minifyOptions, generateMinifiedCode }
}
