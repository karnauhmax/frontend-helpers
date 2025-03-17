import type { EnumValues } from '@/types';

export const ImageFormats = {
  jpg: 'jpg',
  png: 'png',
  webp: 'webp',
  avif: 'avif',
  jpeg: 'jpeg'
} as const;

export type ImageFormat = EnumValues<typeof ImageFormats>;

export const ImageStatuses = {
  pending: 'pending',
  success: 'success',
  error: 'error'
} as const;

export type ImageStatus = EnumValues<typeof ImageStatuses>;

export interface IImage {
  quality: number;
  fileFormat: ImageFormat;
  targetFormat: ImageFormat;
  image: File;
  name: string;
}

export interface IGeneratedImageResult {
  name: string;
  oldSize: number;
  newSize: number;
  result: string;
  preview: string;
  id: string;
  status: ImageStatus;
}

export interface IUploadConfig {
  images: File[];
  quality: number;
  targetFormat: ImageFormat;
}

export type TImageCodecModule = typeof import('@jsquash/jpeg');
