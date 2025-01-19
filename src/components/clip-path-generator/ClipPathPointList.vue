<template>
  <div class="grid gap-y-4">
    <div 
      v-for="point in points" 
      :key="point.id"
      class="grid grid-cols-2 gap-x-4"
    >
      <BaseInput
        type="number"
        :label="`Point ${point.id} X`"
        :model-value="point.x"
        @update:model-value="(value) => updatePoint(point.id, Number(value), point.y)"
      />
      <BaseInput
        type="number"
        :label="`Point ${point.id} Y`"
        :model-value="point.y"
        @update:model-value="(value) => updatePoint(point.id, point.x, Number(value))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Point } from './clip-path-types';
import BaseInput from '@/components/base/BaseInput.vue';

const props = defineProps<{
  points: Point[];
}>();

const emit = defineEmits(['point-selected', 'point-updated']);

const updatePoint = (id: number, x: number, y: number) => {
  emit('point-updated', id, x, y);
};
</script> 