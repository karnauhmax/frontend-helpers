import { ref, computed } from 'vue';
import type { Point, ShapeType } from '../clip-path-types';

export function useClipPathGenerator() {
  const shapeType = ref<ShapeType>('polygon');
  const activePointId = ref<number | null>(null);

  const points = ref<Point[]>([
    { id: 1, x: 0, y: 0 },
    { id: 2, x: 100, y: 0 },
    { id: 3, x: 100, y: 100 },
    { id: 4, x: 0, y: 100 },
  ]);

  const clipPathValue = computed(() => {
    const pointsString = points.value
      .map(point => `${point.x}% ${point.y}%`)
      .join(', ');
    
    return `${shapeType.value}(${pointsString})`;
  });

  const selectPoint = (id: number) => {
    activePointId.value = id;
  };

  const updatePointPosition = (id: number, x: number, y: number) => {
    const point = points.value.find(p => p.id === id);
    if (point) {
      point.x = Math.round(Math.max(0, Math.min(100, x)));
      point.y = Math.round(Math.max(0, Math.min(100, y)));
    }
  };

  const updatePointCoordinates = (id: number, x: number, y: number) => {
    updatePointPosition(id, x, y);
  };

  return {
    shapeType,
    activePointId,
    points,
    clipPathValue,
    selectPoint,
    updatePointPosition,
    updatePointCoordinates
  };
} 