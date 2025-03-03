<script setup lang="ts">
import TrashCanOutline from 'vue-material-design-icons/TrashCanOutline.vue';
import TrayArrowDown from 'vue-material-design-icons/TrayArrowDown.vue';

const emits = defineEmits(['download', 'delete']);

const props = defineProps<{
  name: string;
  image: string;
  oldSize: number;
  newSize: number;
}>();
</script>

<template>
  <div
    class="grid grid-cols-[auto_1fr_min-content] border-dashed border border-text-primary items-center gap-4 p-4"
  >
    <img width="60" height="60" :src="props.image" :alt="props.name" />
    <div class="grid gap-y-2">
      <p>{{ props.name }}</p>
      <p>{{ props.oldSize }} -> {{ props.newSize }}</p>
    </div>

    <div class="flex gap-x-3 self-start">
      <button
        @click="emits('delete')"
        class="hover:opacity-85 transition-opacity"
        aria-label="Delete this image"
      >
        <TrashCanOutline />
      </button>

      <button
        @click="emits('download')"
        class="hover:opacity-85 transition-opacity"
        aria-label="Download this image"
      >
        <TrayArrowDown />
      </button>
    </div>
  </div>
</template>
