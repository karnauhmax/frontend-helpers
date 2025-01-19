<template>
  <div class="grid gap-y-2">
    <div class="grid items-center gap-x-2 grid-cols-performance-items-layout">
      <p class="text-md">{{ title }}</p>
    </div>
    <div
      :class="`min-w-[80px] min-h-[80px] rounded-sm border text-primary font-bold text-3xl grid place-items-center ${getColorByScore(
        score
      )}`"
    >
      {{ displayValue }}
    </div>
  </div>
</template>

<script setup lang="ts">
const getColorByScore = (score: number): string => {
  const percentageScore: number = score * 100;

  return percentageScore >= 89
    ? 'border-score-high text-score-high'
    : percentageScore >= 50 && percentageScore < 89
    ? 'border-score-mid text-score-mid'
    : 'border-score-low text-score-low';
};

defineProps<{
  title: string;

  displayValue: string | number;

  score: number;
}>();
</script>
