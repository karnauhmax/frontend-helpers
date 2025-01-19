<template>
  <div class="grid gap-y-3">
    <p>Shape Type:</p>
    <div class="flex gap-x-4">
      <BaseRadioButton
        v-for="type in shapeTypes"
        :key="type"
        :checked="modelValue === type"
        :label="type"
        :value="type"
        name="shape-type"
        @update:modelValue="$emit('update:modelValue', type)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ShapeType } from './clip-path-types';
import BaseRadioButton from '@/components/base/BaseRadioButton.vue';

defineProps<{
  modelValue: ShapeType;
}>();

defineEmits<{
  'update:modelValue': [value: ShapeType];
}>();

const shapeTypes: ShapeType[] = ['polygon', 'circle', 'ellipse', 'inset'];
</script> 