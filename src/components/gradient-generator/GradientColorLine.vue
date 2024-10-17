<template>
  <div
    ref="line"
    @click="clickHandler"
    class="cursor-pointer relative bg-gradient-to-r h-[20px] rounded-md"
    :style="`background-image: linear-gradient(90deg, ${formattedResultPoints})`"
  >
    <GradientColorPoint
      @on-click="pointClickHandler"
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

console.log(activePoint);

defineProps<{
  points: IGradientPoint[];
}>();

const emits = defineEmits(['point-added', 'point-clicked', 'point-edited']);

let rect;
const canvasRef = ref<HTMLCanvasElement | null>(null);
const canvasContext = ref<CanvasRenderingContext2D | null>(null);
const canvasGradient = ref<CanvasGradient | null>(null);

const x = ref(0);
const line = ref<HTMLDivElement | null>(null);
const POINT_WIDTH: number = 25;

const clickHandler = (event: MouseEvent): void => {
  const xClicked = event.clientX - rect.left;
  const newX = xClicked - POINT_WIDTH / 2;
  const percentageX = Math.floor((newX / rect.width) * 100);

  console.log(rect.height);

  x.value = newX;

  // Получаем данные о пикселе
  const imageData = canvasContext.value!.getImageData(xClicked, rect.height / 2, 1, 1).data;
  const [r, g, b] = imageData;

  console.log(r, g, b);

  // Преобразуем RGB в HEX
  const hexCode = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;

  const newPoint = { x: x.value, percentageX, hexCode: '#000' };  

  canvasGradient.value!.addColorStop(percentageX * 0.01, hexCode);

  canvasGradient.value! = canvasContext.value!.createLinearGradient(0, 0, rect.width, 0);

  resultPoints.value.forEach((point) => {
    canvasGradient.value!.addColorStop(point.percentageX * 0.01, point.hexCode);
  })

  canvasContext.value!.fillStyle = canvasGradient.value;
  canvasContext.value!.fillRect(0, 0, rect.width, rect.height)

  console.log(percentageX * 0.01);
  emits('point-added', newPoint);
};


const pointClickHandler = (id: number): void => {
  emits('point-clicked', id);
};

onMounted(() => {
  rect = line.value!.getBoundingClientRect();
  canvasRef.value!.width = rect.width;
  canvasRef.value!.height = rect.height;
  canvasContext.value = canvasRef.value!.getContext('2d');
  canvasGradient.value = canvasContext.value!.createLinearGradient(0, 0, rect.width, 0);

  resultPoints.value.forEach((point) => {
    canvasGradient.value!.addColorStop(point.percentageX * 0.01, point.hexCode);
  })

  canvasContext.value!.fillStyle = canvasGradient.value;
  canvasContext.value!.fillRect(0, 0, rect.width, rect.height)
})

// watch(resultPoints, (newValue, oldValue) => {
//   canvasGradient.value! = canvasContext.value!.createLinearGradient(0, 0, rect.width, 0);
//     newValue.forEach((point) => {
//       canvasGradient.value!.addColorStop(point.percentageX * 0.01, point.hexCode);
//     })

//     canvasContext.value!.fillStyle = canvasGradient.value;
//     canvasContext.value!.fillRect(0, 0, rect.width, rect.height)
// }, {
//   deep: true
// })

// watch(() => activePoint.value.hexCode, (newValue, oldValue) => {
//   console.log(newValue, oldValue);

//   console.log(newValue.percentageX);
//   canvasGradient.value! = canvasContext.value!.createLinearGradient(0, 0, rect.width, 0);
//   canvasGradient.value!.addColorStop(newValue.percentageX * 0.01, newValue.hexCode);
//   canvasContext.value!.fillStyle = canvasGradient.value;
//   canvasContext.value!.fillRect(0, 0, rect.width, rect.height)

// }, {
//   deep: true
// })
</script>

<style lang="scss" scoped></style>
