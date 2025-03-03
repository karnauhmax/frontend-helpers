<template>
  <div
    :class="`grid justify-start px-4 py-2 gap-y-2 transition-colors duration-300  relative border ${copiedClass} relative`"
    :style="`min-height: ${SIZES[props.size]}`"
  >
    <BaseCopyBtn
      class="absolute right-4 top-4"
      :content-to-copy="contentToCopy"
      @copied="copyHandler"
    />
    <div v-if="label" class="px-4 py-2 overflow-hidden">
      <span>{{ label }}</span>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseCopyBtn from './BaseCopyBtn.vue';

type Size = 'sm' | 'md' | 'lg';

const props = withDefaults(
  defineProps<{
    label?: string;

    size?: Size;

    contentToCopy: string | number;
  }>(),
  {
    size: 'lg'
  }
);

const isCopied = ref(false);

const COPY_DURATION: number = 3000;

const copiedClass = computed(() => {
  return isCopied.value ? 'border-primary' : 'border-text-secondary/10';
});

const SIZES: Record<Size, string> = {
  sm: '50px',
  md: '200px',
  lg: '350px'
};

const copyHandler = (): void => {
  isCopied.value = true;

  setTimeout(() => {
    isCopied.value = false;
  }, COPY_DURATION);
};
</script>
