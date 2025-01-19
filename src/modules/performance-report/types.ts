export type TDevice = 'desktop' | 'mobile'

export type TPerformanceMetric = [string, IPerformanceMetricInfo]

export interface IPerformanceMetricInfo {
  description: string
  id: string
  numericUnit: string
  score: number
  scoreDisplayMode: string
  title: string
  displayValue: string | number
}
