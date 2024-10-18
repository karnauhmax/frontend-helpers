export const UNITS = {
  PX: 'px',
  REM: 'rem',
  DEG: 'deg'
} as const

export type TUnit = (typeof UNITS)[keyof typeof UNITS]
