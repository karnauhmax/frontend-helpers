<template>
  <button
    @click="clickHandler"
    class="border-2 border-primary bg-primary text-dark px-2 py-2 rounded-md min-w-[150px] inline-flex items-center justify-center transition-colors duration-300 hover:bg-dark hover:text-white disabled:opacity-50 disabled:pointer-events-none"
    :disabled="disabled"
  >
    <span class="font-regular" v-if="label">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
const emits = defineEmits(['click']);

defineProps<{
  label: string | boolean;

  disabled?: boolean;
}>();

const clickHandler = (): void => {
  emits('click');
};
</script>
