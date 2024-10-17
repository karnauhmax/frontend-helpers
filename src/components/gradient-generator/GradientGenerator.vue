<template>
  <div class="grid gap-y-10">
    <div class="h-[250px] rounded-md" :style="`background-image: ${result}`">
      {{ result }}
    </div>

    <GradientColorLine
      @point-added="addPoint"
      @point-clicked="selectPoint"
      :points="gradientPoints"
    />

    <GradientSettings
      v-model:angle="gradientAngle"
      v-model:type="gradientType"
    />

    <GradientPointSettings
      v-model:hex="selectedPoint.hexCode"
      v-model:gradientColorR="selectedPoint.gradientColorR"
      v-model:gradientColorG="selectedPoint.gradientColorG"
      v-model:gradientColorB="selectedPoint.gradientColorB"
      v-model:gradientColorA="selectedPoint.gradientColorA"
    />

    <GradientItem />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRefs, provide } from 'vue';
import type { IGradientPoint } from './gradient-generator-types';
import { rgbaToHex } from '@/helpers/rgbToHex';
import GradientColorLine from './GradientColorLine.vue';
import GradientPointSettings from './GradientPointSettings.vue';
import GradientSettings from './GradientSettings.vue';
import GradientItem from './GradientItem.vue';

const gradientSettings = ref({
  gradientAngle: 0,
  gradientType: 'linear',
});

const { gradientAngle, gradientType } = toRefs(gradientSettings.value);

const gradientAngleType = computed(() => {
  return `${
    gradientType.value === 'linear' ? `${gradientAngle.value}deg` : 'circle'
  }`;
});

const gradientPoints = ref<IGradientPoint[]>([
  {
    id: Math.random(),
    x: 0,
    percentageX: 0,
    gradientColorR: 255,
    gradientColorG: 255,
    gradientColorB: 255,
    gradientColorA: 1,
    hexCode: '#1a1a1a',
  },

  {
    id: Math.random(),
    x: 414,
    percentageX: 40,
    gradientColorR: 255,
    gradientColorG: 255,
    gradientColorB: 255,
    gradientColorA: 1,
    hexCode: 'red',
  },
]);

const resultPoints = computed(() => {
  return gradientPoints.value
    .map((point) => {
      return {
        percentageX: point.percentageX,
        hexCode: point.hexCode,
      }
    }).sort((a, b) => a.percentageX - b.percentageX)
});

const formattedResultPoints = computed(() => {
  return resultPoints.value.map((point) => {
    return `${point.hexCode} ${point.percentageX}%`
  }).join(', ')
})

const selectedPoint = ref(gradientPoints.value[0]);

const selectPoint = (id: number) => {
  const clickedPoint = gradientPoints.value.find((point) => point.id === id);

  selectedPoint.value = clickedPoint;
};

const result = computed(() => {
  return `${gradientType.value}-gradient(${gradientAngleType.value}, ${formattedResultPoints.value});`;
});

console.log(result.value);

provide('resultPoints', resultPoints);
provide('activePoint', selectedPoint);
provide('formattedResultPoints', formattedResultPoints);

console.log(formattedResultPoints.value);

const addPoint = (info: IGradientPoint) => {
  const { x, percentageX, hexCode } = info;

  const newPoint: IGradientPoint = {
    id: Date.now(),
    x,
    percentageX,
    hexCode,
  };

  gradientPoints.value.push(newPoint);

  selectPoint(newPoint.id);
};
</script>
