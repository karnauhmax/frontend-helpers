<template>
  <button
    @click="clickHandler"
    class="border-2 px-2 py-2 rounded-md min-w-[150px] inline-flex items-center justify-center transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none"
    :class="buttonClasses"
    :disabled="disabled"
  >
    <span class="font-regular" v-if="label">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const emits = defineEmits(['click']);

const props = withDefaults(
  defineProps<{
    label: string | boolean;
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
  }>(),
  {
    variant: 'primary'
  }
);

const clickHandler = (): void => {
  emits('click');
};

const buttonClasses = computed(() => {
  return {
    'border-primary bg-primary text-dark hover:bg-dark hover:text-white':
      props.variant === 'primary',
    'border-primary bg-transparent text-primary hover:bg-primary hover:text-dark':
      props.variant === 'secondary'
  };
});
</script>
