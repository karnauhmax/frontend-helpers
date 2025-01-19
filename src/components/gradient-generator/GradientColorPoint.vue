<template>
  <div
    ref="pointRef"
    class="absolute p-[5px] point w-[25px] h-[25px] border border-primary bg-black"
    :class="{ 'border-2 border-primary': isActive }"
    :style="`left: ${x}px`"
    @click.stop="clickHandler"
    @mousedown.stop="startDragging"
  >
    <div
      class="rounded-sm h-full"
      :style="`background-color: ${hexCode}`"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emits = defineEmits(['on-click', 'on-drag']);

const props = defineProps<{
  x: number;
  hexCode: string;
  id: number;
  isActive: boolean;
}>();

const pointRef = ref<HTMLElement | null>(null);
let isDragging = false;
let startX = 0;
let originalX = 0;

const clickHandler = (): void => {
  emits('on-click', props.id);
};

const startDragging = (e: MouseEvent) => {
  isDragging = true;
  startX = e.clientX;
  originalX = props.x;
  
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDragging);
};

const onDrag = (e: MouseEvent) => {
  if (!isDragging) return;
  
  const deltaX = e.clientX - startX;
  const newX = originalX + deltaX;
  
  emits('on-drag', {
    id: props.id,
    x: newX
  });
};

const stopDragging = () => {
  isDragging = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDragging);
};
</script>

<style lang="scss" scoped>
.point {
  transform: translateY(-2px);
  cursor: move;
}
</style>
