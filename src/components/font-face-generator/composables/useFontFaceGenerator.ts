import { ref } from 'vue'
import { FORMATS, type IFontFormat, type IFontStyle, type IFontWeight } from '../types'
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

export function useFontFaceGenerator() {
  return { formats, weights, styles }
}
