import { decode } from '@jsquash/png';
import { encode } from '@jsquash/webp';
import { ImageFormats, type IImageOptimizerConfig, type ImageFormat } from '../types';

const imageFormats: ImageFormat[] = [
  ImageFormats.jpg,
  ImageFormats.png,
  ImageFormats.webp,
  ImageFormats.avif
];

async function optimizeImage(config: IImageOptimizerConfig) {
  const decodedImage = await decode(config.images[0]);

  const webpImageBuffer = await encode(decodedImage, {
    quality: config.quality
  });

  const blob = new Blob([webpImageBuffer], { type: 'image/webp' });
  const preview = URL.createObjectURL(blob);

  return preview;
}

export function useImageOptimizer() {
  return { imageFormats, optimizeImage };
}
