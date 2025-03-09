import {
  ImageFormats,
  type IGeneratedImageResult,
  type IImageOptimizerConfig,
  type ImageFormat,
  type TImageCodecModule
} from '../types';
import { ref } from 'vue';

const IMAGE_FORMATS: ImageFormat[] = [
  ImageFormats.jpg,
  ImageFormats.png,
  ImageFormats.webp,
  ImageFormats.avif
];

const moduleCache = new Map<ImageFormat, TImageCodecModule>();

const previewImages = ref<IGeneratedImageResult[]>([]);

function deleteImage(id: number) {
  previewImages.value = previewImages.value.filter((image) => image.id !== id);
}

function deleteAllImages() {
  previewImages.value = [];
}

function getImageFormat(image: File) {
  return image.type.split('/')[1] as ImageFormat;
}

async function getImageFormatPackage(fileFormat: ImageFormat, targetFormat: ImageFormat) {
  async function getModule(format: ImageFormat) {
    if (moduleCache.has(format)) {
      return moduleCache.get(format);
    }

    let module;
    switch (format) {
      case ImageFormats.jpg:
      case ImageFormats.jpeg:
        module = await import('@jsquash/jpeg');
        break;
      case ImageFormats.png:
        module = await import('@jsquash/png');
        break;
      case ImageFormats.webp:
        module = await import('@jsquash/webp');
        break;
      case ImageFormats.avif:
        module = await import('@jsquash/avif');
        break;
      default:
        throw new Error(`Unsupported image format: ${format}`);
    }

    moduleCache.set(format, module);
    return module;
  }

  const [sourceModule, targetModule] = await Promise.all([
    getModule(fileFormat),
    getModule(targetFormat)
  ]);

  return {
    decode: sourceModule!.decode,
    encode: targetModule!.encode
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

  const originalName = config.image.name;
  const newName = originalName.replace(/\.[^.]+$/, `.${config.targetFormat}`);

  const result = {
    oldSize: config.image.size,
    newSize: blob.size,
    name: newName,
    preview,
    id: Date.now()
  };

  return result;
}

export function formatImageSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function useImageOptimizer() {
  return {
    IMAGE_FORMATS,
    optimizeImage,
    previewImages,
    deleteImage,
    downloadImage,
    downloadAllImages,
    deleteAllImages,
    getImageFormat,
    formatImageSize
  };
}
