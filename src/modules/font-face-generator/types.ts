const FORMATS = {
  WOFF2: 'woff2',
  WOFF: 'woff',
  TTF: 'ttf',
  OTF: 'otf'
} as const

type TFontFormats = (typeof FORMATS)[keyof typeof FORMATS]

interface IFontStyleWeight {
  id: number
  checked: boolean
}

interface IFontWeight extends IFontStyleWeight {
  value: number
}

interface IFontStyle extends IFontStyleWeight {
  value: 'normal' | 'italic' | 'oblique'
}

interface IFontFormat {
  id: number
  value: TFontFormats
}

export {
  FORMATS,
  type IFontFormat,
  type IFontStyle,
  type IFontStyleWeight,
  type IFontWeight,
  type TFontFormats
}
