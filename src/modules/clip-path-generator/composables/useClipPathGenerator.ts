import { ref, computed } from 'vue';
import type { IPoint } from '../types';

const points = ref<IPoint[]>([]);
const canvasSize = ref({ width: 400, height: 400 });
const isDragging = ref(false);
const activePointIndex = ref<number | null>(null);

function addPoint(point: IPoint) {
  if (!isDragging.value) {
    points.value.push(point);
  }
}

function updatePoint(index: number, point: IPoint) {
  if (index >= 0 && index < points.value.length) {
    const clampedPoint = {
      x: Math.max(0, Math.min(canvasSize.value.width, point.x)),
      y: Math.max(0, Math.min(canvasSize.value.height, point.y))
    };
    points.value[index] = clampedPoint;
  }
}

function startDragging(index: number) {
  isDragging.value = true;
  activePointIndex.value = index;
}

function stopDragging() {
  isDragging.value = false;
  activePointIndex.value = null;
}

function removePoint(index: number) {
  points.value.splice(index, 1);
}

function clearPoints() {
  points.value = [];
}

const clipPathValue = computed(() => {
  if (!points.value.length) return '';

  const normalizedPoints = points.value.map((point) => ({
    x: (point.x / canvasSize.value.width) * 100,
    y: (point.y / canvasSize.value.height) * 100
  }));

  return `polygon(${normalizedPoints
    .map((point) => `${point.x.toFixed(2)}% ${point.y.toFixed(2)}%`)
    .join(', ')})`;
});

export function useClipPathGenerator() {
  return {
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
  };
}
