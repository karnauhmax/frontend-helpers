import type { TUnit } from '@/types'

export interface ITransformRule {
  id: number
  name: TRule['title']
  cssValue: TRule['cssValue']
  value: number
  min: number
  max: number
  step: number
  unit: TUnit | ''
}

export const RULES = {
  translateX: {
    title: 'Translate X',
    cssValue: 'translateX'
  },

  translateY: {
    title: 'Translate Y',
    cssValue: 'translateY'
  },

  scale: {
    title: 'Scale',
    cssValue: 'scale'
  },

  rotate: {
    title: 'Rotate',
    cssValue: 'rotate'
  },

  skew: {
    title: 'Skew',
    cssValue: 'skew'
  }
} as const

export type TRule = (typeof RULES)[keyof typeof RULES]
