<template>
  <div
    class="absolute p-[5px] point w-[25px] h-[25px] border border-primary bg-black"
    :class="{ 'border-2 border-primary': isActive }"
    :style="`left: ${x}px`"
    @click.stop="clickHandler"
  >
    <div
      class="rounded-sm h-full"
      :style="`background-color: ${hexCode}`"
    ></div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['on-click']);

const props = defineProps<{
  x: number;

  hexCode: string;

  id: number;

  isActive: boolean;
}>();
const clickHandler = (): void => {
  emits('on-click', props.id);
};
</script>

<style lang="scss" scoped></style>
