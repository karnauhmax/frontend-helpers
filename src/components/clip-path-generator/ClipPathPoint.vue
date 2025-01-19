<template>
  <div
    ref="pointRef"
    class="absolute w-4 h-4 rounded-full bg-white border-2 cursor-move"
    :class="{ 'border-accent': isActive, 'border-primary': !isActive }"
    :style="`left: ${x}%; top: ${y}%; transform: translate(-50%, -50%)`"
    @mousedown.stop="startDragging"
    @click.stop="handleClick"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  id: number;
  x: number;
  y: number;
  isActive: boolean;
}>();

const emits = defineEmits(['on-drag', 'on-click']);

const pointRef = ref<HTMLElement | null>(null);
let isDragging = false;
let startX = 0;
let startY = 0;
let originalX = 0;
let originalY = 0;

const handleClick = () => {
  emits('on-click', props.id);
};

const startDragging = (e: MouseEvent) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  originalX = props.x;
  originalY = props.y;

  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDragging);
};

const onDrag = (e: MouseEvent) => {
  if (!isDragging || !pointRef.value) return;

  const parentRect = pointRef.value.parentElement!.getBoundingClientRect();
  
  const deltaX = e.clientX - startX;
  const deltaY = e.clientY - startY;
  
  const newX = originalX + (deltaX / parentRect.width) * 100;
  const newY = originalY + (deltaY / parentRect.height) * 100;

  emits('on-drag', props.id, newX, newY);
};

const stopDragging = () => {
  isDragging = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDragging);
};
</script> 