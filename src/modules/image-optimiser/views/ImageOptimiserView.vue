<script setup lang="ts">
import BaseRadioButton from '@/components/base/BaseRadioButton.vue';
import { ImageFormats, type ImageFormat } from '../types';
import { ref } from 'vue';
import { useImageOptimizer } from '../composables/useImageOptimiser';
import BaseDropZone from '@/components/base/BaseDropZone.vue';
import BaseRangeInput from '@/components/base/BaseRangeInput.vue';
import BaseInput from '@/components/base/BaseInput.vue';

const selectedImageFormat = ref<ImageFormat>(ImageFormats.webp);
const quality = ref(75);

const { imageFormats, optimizeImage } = useImageOptimizer();
const previewImages = ref([]);

async function onUpload(images: File[]) {
  const formattedImages: ArrayBuffer[] = [];

  for (const image of images) {
    const bufferImage = await image.arrayBuffer();

    formattedImages.push(bufferImage);
  }

  const test = await optimizeImage({
    quality: quality.value,
    images: formattedImages,
    format: selectedImageFormat.value
  });

  previewImages.value.push(test);
}
</script>

<template>
  <div class="grid gap-y-8">
    <div>
      <h3 class="font-medium text-lg mb-2">Image Format</h3>
      <ul class="flex gap-4 uppercase mb-6">
        <li v-for="format in imageFormats" :key="format">
          <BaseRadioButton
            :value="format"
            v-model="selectedImageFormat"
            name="image-format"
            :label="format"
            :checked="selectedImageFormat === format"
          />
        </li>
      </ul>

      <div class="grid gap-y-1">
        <p>Quality:</p>
        <BaseRangeInput class="mb-2" v-model="quality" />
        <BaseInput class="max-w-[100px]" type="number" v-model="quality" />
      </div>
    </div>

    <img v-for="image in previewImages" :key="image" :src="image" />

    <BaseDropZone
      title="Drop your image here or click to upload"
      :description="`Supports ${imageFormats.join(', ')}`"
      accept="image/*"
      multiple
      @file-uploaded="onUpload"
    />
  </div>
</template>
