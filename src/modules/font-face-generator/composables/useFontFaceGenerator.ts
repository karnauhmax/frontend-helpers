import { computed, ref } from 'vue'
import {
  FORMATS,
  type IFontFormat,
  type IFontStyle,
  type IFontWeight,
  type TFontFormats
} from '../types'

const formats = ref<IFontFormat[]>([
  {
    id: 1,
    value: FORMATS.WOFF2
  },

  {
    id: 2,
    value: FORMATS.WOFF
  },

  {
    id: 3,
    value: FORMATS.TTF
  },

  {
    id: 4,
    value: FORMATS.OTF
  }
])

const weights = ref<IFontWeight[]>([
  {
    id: 1,
    value: 100,
    checked: false
  },

  {
    id: 2,
    value: 200,
    checked: false
  },

  {
    id: 3,
    value: 300,
    checked: false
  },

  {
    id: 4,
    value: 400,
    checked: true
  },

  {
    id: 5,
    value: 500,
    checked: false
  },

  {
    id: 6,
    value: 600,
    checked: false
  },

  {
    id: 7,
    value: 700,
    checked: false
  },

  {
    id: 8,
    value: 800,
    checked: false
  },

  {
    id: 9,
    value: 900,
    checked: false
  }
])

const styles = ref<IFontStyle[]>([
  {
    id: 1,
    value: 'normal',
    checked: true
  },

  {
    id: 2,
    value: 'italic',
    checked: false
  },

  {
    id: 3,
    value: 'oblique',
    checked: false
  }
])

const fileName = ref('Montserrat')
const fontPath = ref('../fonts/')
const selectedWeight = ref(400)
const selectedStyle = ref('normal')
const selectedFormats = ref<TFontFormats[]>([FORMATS.WOFF2])

const getSource = (format: string, index: number, array: string[]) => {
  const url = `${fontPath.value}${fileName.value}.${format} `
  return index === 0
    ? `url("${url}") format("${format}")${index < array.length - 1 ? ',' : ';'}`
    : `        url("${url}") format("${format}")${index < array.length - 1 ? ',' : ';'}`
}

const result = computed(() => {
  const result = `@font-face {
    font-family: "${fileName.value}";
    src: ${selectedFormats.value.map(getSource).join('\n     ')}
    font-weight: ${selectedWeight.value};
    font-style: ${selectedStyle.value};
  }`
  return result
})

const checkIfDisabled = (value: TFontFormats) => {
  return selectedFormats.value.length === 1 && selectedFormats.value.includes(value)
}

export function useFontFaceGenerator() {
  return {
    formats,
    weights,
    styles,
    fileName,
    fontPath,
    selectedWeight,
    selectedStyle,
    selectedFormats,
    result,
    checkIfDisabled
  }
}
