<template>
  <div
    ref="line"
    @click="clickHandler"
    class="cursor-pointer relative bg-gradient-to-r h-[20px] rounded-md"
    :style="`background-image: linear-gradient(90deg, ${formattedResultPoints})`"
  >
    <GradientColorPoint
      @on-click="pointClickHandler"
      @on-drag="handlePointDrag"
      v-for="{ x, id, hexCode } in points"
      :x="x"
      :key="id"
      :hex-code="hexCode"
      :id="id"
      :is-active="activePoint.id === id"
    />
  </div>

  <canvas ref="canvasRef" class="w-full h-[20px]" id="canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, watch } from 'vue';
import type { IGradientPoint } from './gradient-generator-types';
import GradientColorPoint from './GradientColorPoint.vue';

const resultPoints = inject('resultPoints');
const formattedResultPoints = inject('formattedResultPoints');
const activePoint = inject('activePoint');

const props = defineProps<{
  points: IGradientPoint[];
}>();

const emits = defineEmits(['point-added', 'point-clicked', 'update:points']);

const canvasRef = ref<HTMLCanvasElement | null>(null);
const canvasContext = ref<CanvasRenderingContext2D | null>(null);
const line = ref<HTMLDivElement | null>(null);
const POINT_WIDTH = 25;

let rect: DOMRect;

const updateCanvas = () => {
  if (!canvasContext.value || !rect) return;

  const gradient = canvasContext.value.createLinearGradient(0, 0, rect.width, 0);
  
  resultPoints.value.forEach((point) => {
    gradient.addColorStop(point.percentageX / 100, point.hexCode);
  });

  canvasContext.value.fillStyle = gradient;
  canvasContext.value.fillRect(0, 0, rect.width, rect.height);
};

const clickHandler = (event: MouseEvent) => {
  const xClicked = event.clientX - rect.left;
  const newX = xClicked - POINT_WIDTH / 2;
  const percentageX = Math.floor((newX / rect.width) * 100);

  if (percentageX < 0 || percentageX > 100) return;

  const imageData = canvasContext.value!.getImageData(xClicked, rect.height / 2, 1, 1).data;
  const [r, g, b] = imageData;
  const hexCode = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;

  emits('point-added', {
    x: newX,
    percentageX,
    hexCode,
    gradientColorR: r,
    gradientColorG: g,
    gradientColorB: b,
    gradientColorA: 1,
  });
};

const pointClickHandler = (id: number) => {
  emits('point-clicked', id);
};

const handlePointDrag = ({ id, x }: { id: number, x: number }) => {
  if (!rect) return;
  
  // Constrain x within the line boundaries
  const constrainedX = Math.max(0, Math.min(x, rect.width - POINT_WIDTH));
  const percentageX = Math.round((constrainedX / rect.width) * 100);
  
  // Get color at the new position
  const imageData = canvasContext.value!.getImageData(
    constrainedX + POINT_WIDTH / 2,
    rect.height / 2,
    1,
    1
  ).data;
  
  const [r, g, b] = imageData;
  const hexCode = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;

  // Update the point's position and color
  const updatedPoints = props.points.map(point => {
    if (point.id === id) {
      return {
        ...point,
        x: constrainedX,
        percentageX,
        hexCode,
        gradientColorR: r,
        gradientColorG: g,
        gradientColorB: b
      };
    }
    return point;
  });

  emits('update:points', updatedPoints);
};

onMounted(() => {
  rect = line.value!.getBoundingClientRect();
  canvasRef.value!.width = rect.width;
  canvasRef.value!.height = rect.height;
  canvasContext.value = canvasRef.value!.getContext('2d');
  updateCanvas();
});

watch(resultPoints, updateCanvas, { deep: true });
watch(() => activePoint.value.hexCode, updateCanvas);
</script>

<style lang="scss" scoped></style>
