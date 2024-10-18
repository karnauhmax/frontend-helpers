<template>
  <div class="grid gap-y-4">
    <div class="grid gap-y-2">
      <div class="border border-text-secondary/10 px-4 py-2">
        <span>Output</span>
      </div>
      <div class="border border-text-secondary/10 px-4 py-2">
        {{ output }}
      </div>
    </div>

    <div class="grid gap-y-2">
      <div class="border border-text-secondary/10 px-4 py-2 overflow-hidden">
        <span>Result</span>
      </div>

      <div clas="overflow-hidden">
        <div
          class="resize-x overflow-hidden transition-[width] will-change-[width]"
          ref="outputElementRef"
        >
          <div class="grid gap-4 builder-grid border border-text-secondary/10 p-4 overflow-hidden">
            <div
              v-for="(item, index) in 12"
              :key="`item-${index}`"
              class="bg-primary rounded-md min-h-[150px]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TUnit } from '@/types'

const props = defineProps<{
  units: TUnit
  width: number
}>()

const outputElementRef = ref<HTMLDivElement | null>(null)

defineExpose({
  outputElementRef
})

const cardsWidth = computed(
  () => `repeat(auto-fill, minmax(min(100%, ${props.width}${props.units}), 1fr))`
)

const output = computed(() => {
  return `grid-template-columns: ${cardsWidth.value}`
})
</script>

<style lang="scss" scoped>
.builder-grid {
  grid-template-columns: v-bind('cardsWidth');
}
</style>
