interface ITransformRule {
  id: number,
  name: string,
  cssValue: string,
  value: number,
  min: number,
  max: number,
  step: number,
  unit: string,
}

export type { ITransformRule };