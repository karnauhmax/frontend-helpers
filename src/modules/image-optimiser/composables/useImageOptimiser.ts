import { generateId } from '@/helpers/generateId';
import {
  ImageFormats,
  ImageStatuses,
  type IGeneratedImageResult,
  type IImage,
  type ImageFormat,
  type IUploadConfig,
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

function deleteImage(id: string) {
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

function downloadImage(imageId: string) {
  const link = document.createElement('a');

  const image = previewImages.value.find((image) => image.id === imageId);

  if (image) {
    link.href = image.result;
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

async function onUpload(config: IUploadConfig) {
  const { images, quality, targetFormat } = config;

  for (const image of images) {
    const fileFormat = getImageFormat(image);

    try {
      await optimizeImage({
        quality: quality,
        image: image,
        fileFormat: fileFormat,
        targetFormat: targetFormat,
        name: image.name
      });
    } catch (error) {
      console.error(error);
    }
  }
}

async function optimizeImage(config: IImage) {
  const { encode, decode } = await getImageFormatPackage(config.fileFormat, config.targetFormat);
  const imageBuffer = await config.image.arrayBuffer();

  const previewBlob = new Blob([imageBuffer], { type: `image/${config.fileFormat}` });
  const previewImage = URL.createObjectURL(previewBlob);

  const result: IGeneratedImageResult = {
    oldSize: config.image.size,
    name: config.name,
    newSize: 0,
    preview: previewImage,
    result: '',
    status: ImageStatuses.pending,
    id: generateId()
  };

  previewImages.value.push(result);

  const index = previewImages.value.findIndex((image) => image.id === result.id);

  try {
    const decodedImage = await decode(imageBuffer);
    const encodedImageBuffer = await encode(decodedImage, { quality: config.quality });
    const resultBlob = new Blob([encodedImageBuffer], { type: `image/${config.targetFormat}` });

    previewImages.value[index] = {
      ...result,
      name: config.image.name.replace(/\.[^.]+$/, `.${config.targetFormat}`),
      newSize: resultBlob.size,
      preview: previewImage,
      result: URL.createObjectURL(resultBlob),
      status: ImageStatuses.success
    };

    return previewImages.value[index];
  } catch {
    previewImages.value[index].status = 'error';
  }
}

export function formatImageSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const kilobyte = 1024;
  const sizeUnits = ['B', 'KB', 'MB', 'GB'];
  const index = Math.floor(Math.log(bytes) / Math.log(kilobyte));
  return `${parseFloat((bytes / Math.pow(kilobyte, index)).toFixed(2))} ${sizeUnits[index]}`;
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
    formatImageSize,
    onUpload
  };
}
