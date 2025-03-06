import type { EnumValues } from '@/types';

export const ImageFormats = {
  jpg: 'jpg',
  png: 'png',
  webp: 'webp',
  avif: 'avif',
  jpeg: 'jpeg'
} as const;

export type ImageFormat = EnumValues<typeof ImageFormats>;

export interface IImageOptimizerConfig {
  quality: number;
  fileFormat: ImageFormat;
  targetFormat: ImageFormat;
  image: File;
}

export interface IGeneratedImageResult {
  name: string;
  oldSize: number;
  newSize: number;
  preview: string;
  id: number;
}
