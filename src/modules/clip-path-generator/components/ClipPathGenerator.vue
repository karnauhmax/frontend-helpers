<template>
  <div class="flex flex-col gap-4">
    <div 
      ref="canvasRef"
      class="relative bg-gray-100 border border-gray-300 rounded-lg cursor-crosshair"
      :style="{ width: `${canvasSize.width}px`, height: `${canvasSize.height}px` }"
      @click="handleCanvasClick"
      @mousemove="handleMouseMove"
      @mouseleave="stopDragging"
      @mouseup="stopDragging"
    >
      <div 
        v-for="(point, index) in points" 
        :key="index"
        class="absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-colors"
        :class="[
          activePointIndex === index 
            ? 'bg-blue-600 ring-2 ring-blue-300' 
            : 'bg-blue-500 hover:bg-blue-600'
        ]"
        :style="{ 
          left: `${point.x}px`, 
          top: `${point.y}px`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }"
        @mousedown.stop="handlePointMouseDown(index)"
        @dblclick.stop="removePoint(index)"
      />
      <div 
        class="absolute inset-0 bg-blue-500/30 pointer-events-none"
        :style="{ clipPath: clipPathValue }"
      />
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex gap-2">
        <button 
          @click="clearPoints"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Clear Points
        </button>
        <span class="text-sm text-gray-500 self-center">
          Double-click a point to remove it
        </span>
      </div>

      <div class="bg-gray-50 rounded-lg p-4 space-y-2">
        <p class="text-gray-700 font-medium">CSS clip-path:</p>
        <div class="relative group">
          <code class="block p-3 bg-white border border-gray-200 rounded-lg font-mono text-sm">
            {{ clipPathValue || 'Click on the canvas to add points' }}
          </code>
          <button
            v-if="clipPathValue"
            @click="copyToClipboard"
            class="absolute right-2 top-2 p-2 text-gray-500 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <span class="sr-only">Copy to clipboard</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useClipPathGenerator } from '../composables/useClipPathGenerator';

const canvasRef = ref<HTMLDivElement | null>(null);

const {
  points,
  canvasSize,
  isDragging,
  activePointIndex,
  addPoint,
  updatePoint,
  startDragging,
  stopDragging,
  removePoint,
  clearPoints,
  clipPathValue
} = useClipPathGenerator();

function handleCanvasClick(event: MouseEvent) {
  if (isDragging.value) return;
  
  const rect = canvasRef.value!.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  addPoint({ x, y });
}

function handlePointMouseDown(index: number) {
  startDragging(index);
}

function handleMouseMove(event: MouseEvent) {
  if (!isDragging.value || activePointIndex.value === null) return;
  
  const rect = canvasRef.value!.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  updatePoint(activePointIndex.value, { x, y });
}

function copyToClipboard() {
  if (clipPathValue.value) {
    navigator.clipboard.writeText(`clip-path: ${clipPathValue.value};`);
  }
}
</script>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(to right, gray 1px, transparent 1px),
    linear-gradient(to bottom, gray 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>