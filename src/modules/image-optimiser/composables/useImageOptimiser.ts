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

function deleteAllImages() {
  previewImages.value = [];
}

async function getImageFormatPackage(fileFormat: ImageFormat, targetFormat: ImageFormat) {
  async function getModule(format: ImageFormat) {
    switch (format) {
      case ImageFormats.jpg:
      case ImageFormats.jpeg:
        return import('@jsquash/jpeg');
      case ImageFormats.png:
        return import('@jsquash/png');
      case ImageFormats.webp:
        return import('@jsquash/webp');
      case ImageFormats.avif:
        return import('@jsquash/avif');
      default:
        throw new Error(`Unsupported image format: ${format}`);
    }
  }

  const [sourceModule, targetModule] = await Promise.all([
    getModule(fileFormat),
    getModule(targetFormat)
  ]);

  return {
    decode: sourceModule.decode,
    encode: targetModule.encode
  };
}

function downloadImage(imageId: number) {
  const link = document.createElement('a');

  const image = previewImages.value.find((image) => image.id === imageId);

  if (image) {
    link.href = image.preview;
    link.download = image.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

function downloadAllImages() {
  previewImages.value.forEach((image) => {
    downloadImage(image.id);
  });
}

async function optimizeImage(config: IImageOptimizerConfig): Promise<IGeneratedImageResult> {
  const { encode, decode } = await getImageFormatPackage(config.fileFormat, config.targetFormat);

  const imageBuffer = await config.image.arrayBuffer();
  const decodedImage = await decode(imageBuffer);

  const encodedImageBuffer = await encode(decodedImage, {
    quality: config.quality
  });

  const blob = new Blob([encodedImageBuffer], { type: `image/${config.targetFormat}` });
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

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function useImageOptimizer() {
  return {
    imageFormats,
    optimizeImage,
    previewImages,
    deleteImage,
    downloadImage,
    downloadAllImages,
    deleteAllImages,
    formatFileSize
  };
}
