import { decode } from '@jsquash/png';
import { encode } from '@jsquash/webp';
import {
  ImageFormats,
  type IGeneratedImageResult,
  type IImageOptimizerConfig,
  type ImageFormat
} from '../types';
import { ref } from 'vue';

const imageFormats: ImageFormat[] = [
  ImageFormats.jpg,
  ImageFormats.png,
  ImageFormats.webp,
  ImageFormats.avif
];

const previewImages = ref<IGeneratedImageResult[]>([]);

function deleteImage(id: number) {
  previewImages.value = previewImages.value.filter((image) => image.id !== id);
}

function deleteAllPreviewImages() {
  previewImages.value = [];
}

function downloadImage() {}

async function optimizeImage(config: IImageOptimizerConfig): Promise<IGeneratedImageResult> {
  const imageBuffer = await config.image.arrayBuffer();
  const decodedImage = await decode(imageBuffer);

  const webpImageBuffer = await encode(decodedImage, {
    quality: config.quality
  });

  const blob = new Blob([webpImageBuffer], { type: 'image/webp' });
  const preview = URL.createObjectURL(blob);

  const result = {
    oldSize: config.image.size,
    newSize: blob.size,
    name: config.image.name,
    preview,
    id: Date.now()
  };

  return result;
}

export function useImageOptimizer() {
  return {
    imageFormats,
    optimizeImage,
    previewImages,
    deleteImage,
    downloadImage,
    deleteAllPreviewImages
  };
}
