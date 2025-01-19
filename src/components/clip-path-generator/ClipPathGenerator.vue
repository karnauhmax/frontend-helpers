<template>
  <div class="grid gap-y-10">
    <div class="relative h-[400px] bg-primary rounded-md overflow-hidden">
      <div 
        class="absolute inset-0 bg-secondary" 
        :style="`clip-path: ${clipPathValue}`"
      >
        <div class="p-4">
          <p>Clip-path: {{ clipPathValue }}</p>
        </div>
      </div>
      
      <ClipPathPoint
        v-for="point in points"
        :key="point.id"
        :x="point.x"
        :y="point.y"
        :id="point.id"
        :is-active="activePointId === point.id"
        @on-click="selectPoint"
        @on-drag="updatePointPosition"
      />
    </div>

    <div class="grid gap-4">
      <ClipPathControls
        v-model:shape-type="shapeType"
      />
      
      <ClipPathPointList
        :points="points"
        @point-selected="selectPoint"
        @point-updated="updatePointCoordinates"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ClipPathPoint from './ClipPathPoint.vue';
import ClipPathControls from './ClipPathControls.vue';
import ClipPathPointList from './ClipPathPointList.vue';
import { useClipPathGenerator } from './composables/useClipPathGenerator';

const {
  shapeType,
  activePointId,
  points,
  clipPathValue,
  selectPoint,
  updatePointPosition,
  updatePointCoordinates
} = useClipPathGenerator();
</script> 