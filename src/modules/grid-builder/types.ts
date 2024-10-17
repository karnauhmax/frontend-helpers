export const UNITS = {
  PX: 'px',
  REM: 'rem'
} as const

export type TUnits = (typeof UNITS)[keyof typeof UNITS]
