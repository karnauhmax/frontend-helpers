<script setup lang="ts">
import BaseRadioButton from '@/components/base/BaseRadioButton.vue';
import { ImageFormats, type ImageFormat } from '../types';
import { ref } from 'vue';
import { useImageOptimizer } from '../composables/useImageOptimiser';
import BaseDropZone from '@/components/base/BaseDropZone.vue';
import BaseRangeInput from '@/components/base/BaseRangeInput.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import ImagePreview from '../components/ImagePreview.vue';
import BaseButton from '@/components/base/BaseButton.vue';

const selectedImageFormat = ref<ImageFormat>(ImageFormats.webp);
const quality = ref(75);

const {
  imageFormats,
  optimizeImage,
  previewImages,
  deleteImage,
  downloadImage,
  deleteAllPreviewImages,
  downloadAllImages
} = useImageOptimizer();

async function onUpload(images: File[]) {
  for (const image of images) {
    const fileFormat = image.type.split('/')[1] as ImageFormat;

    const newImage = await optimizeImage({
      quality: quality.value,
      image: image,
      fileFormat: fileFormat,
      targetFormat: selectedImageFormat.value
    });

    previewImages.value.push(newImage);
  }
}
</script>

<template>
  <div class="grid gap-y-8">
    <div>
      <h3 class="font-light text-lg mb-2">Image Format</h3>
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
        <BaseRangeInput class="mb-2" v-model.lazy="quality" />
        <BaseInput
          disabled
          max="100"
          min="0"
          class="max-w-[100px]"
          type="number"
          v-model="quality"
        />
      </div>
    </div>

    <BaseDropZone
      title="Drop your image here or click to upload"
      :description="`Supports ${imageFormats.join(', ')}`"
      accept="image/*"
      multiple
      @file-uploaded="onUpload"
    />

    <Transition name="list-wrapper">
      <div v-if="previewImages.length">
        <TransitionGroup class="grid gap-y-4" name="list" tag="ul">
          <li v-for="image in previewImages" :key="image.id">
            <ImagePreview
              :image="image.preview"
              :old-size="image.oldSize"
              :new-size="image.newSize"
              :name="image.name"
              @delete="deleteImage(image.id)"
              @download="downloadImage(image.id)"
            />
          </li>
        </TransitionGroup>
      </div>
    </Transition>

    <BaseButton @click="downloadAllImages" label="Download All Images" />
    <BaseButton variant="secondary" @click="deleteAllPreviewImages" label="Clear all" />
  </div>
</template>

<style scoped lang="scss">
.list {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.2s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}

.list-wrapper {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.2s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
