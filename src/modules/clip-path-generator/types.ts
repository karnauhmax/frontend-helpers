export interface IPoint {
  x: number;
  y: number;
}

export interface IClipPathConfig {
  points: IPoint[];
  width: number;
  height: number;
}

export interface IClipPathResult {
  cssValue: string;
  points: IPoint[];
}