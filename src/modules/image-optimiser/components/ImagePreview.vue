<script setup lang="ts">
import { computed } from 'vue';
import { useImageOptimizer } from '@/modules/image-optimiser/composables/useImageOptimiser';

const emits = defineEmits(['download', 'delete']);
const { formatFileSize } = useImageOptimizer();

const props = defineProps<{
  name: string;
  image: string;
  oldSize: number;
  newSize: number;
}>();

const formattedSize = computed(() => {
  return `${formatFileSize(props.oldSize)} -> ${formatFileSize(props.newSize)}`;
});
</script>

<template>
  <div
    class="grid grid-cols-[auto_1fr_min-content] border-dashed border border-text-primary items-center gap-4 p-4"
  >
    <img width="60" height="60" :src="props.image" :alt="props.name" />
    <div class="grid gap-y-2">
      <p>{{ props.name }}</p>
      <p>{{ formattedSize }}</p>
    </div>

    <div class="flex gap-x-3 self-start">
      <button
        @click="emits('delete')"
        class="hover:opacity-85 transition-opacity text-text-primary"
        aria-label="Delete this image"
      >
        <v-icon fill="#fff" name="bi-trash" scale="1.1" />
      </button>

      <button
        @click="emits('download')"
        class="hover:opacity-85 transition-opacity text-text-primary"
        aria-label="Download this image"
      >
        <v-icon fill="#fff" name="co-cloud-download" scale="1.1" />
      </button>
    </div>
  </div>
</template>
