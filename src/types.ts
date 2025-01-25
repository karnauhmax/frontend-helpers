export const UNITS = {
  PX: 'px',
  REM: 'rem',
  DEG: 'deg'
} as const;

export type TUnit = (typeof UNITS)[keyof typeof UNITS];

export interface IPreviewItem {
  id: number;
  title: string;
  description: string;
  url: string;
}

export type EnumValues<T> = T[keyof T];
