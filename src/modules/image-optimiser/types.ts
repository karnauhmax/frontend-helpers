import type { EnumValues } from '@/types';

export const ImageFormats = {
  jpg: 'jpg',
  png: 'png',
  webp: 'webp',
  avif: 'avif'
} as const;

export type ImageFormat = EnumValues<typeof ImageFormats>;

export interface IImageOptimizerConfig {
  quality: number;
  format: ImageFormat;
  images: ArrayBuffer[];
}
