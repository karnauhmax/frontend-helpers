<template>
  <div>
    <div class="grid gap-y-5 md:gap-y-10">
      <form
        @submit.prevent="generateHandler"
        :class="`grid gap-y-5 ${isProcessing ? 'disabled' : ''}`"
      >
        <BaseInput v-model="url" :label="$t('performanceReport.url')" />

        <div class="flex gap-x-4">
          <BaseRadioButton
            v-model="deviceType"
            :label="$t('performanceReport.mobile')"
            value="mobile"
            name="device-type"
            checked
          />
          <BaseRadioButton
            v-model="deviceType"
            name="device-type"
            :label="$t('performanceReport.desktop')"
            value="desktop"
          />
        </div>

        <BaseButton
          :label="$t('global.generate')"
          class="justify-self-start"
          type="submit"
          :disabled="isProcessing"
        />
      </form>

      <div class="grid gap-y-8" v-if="showReport && !isProcessing">
        <div class="grid gap-y-2 md:max-w-[200px] w-full justify-self-center">
          <PerformanceReportMetric
            title="Performance Score"
            :display-value="performanceScore * 100"
            :score="performanceScore"
          />
        </div>

        <div class="grid grid-cols-performance-metrics-layout gap-x-6 gap-y-8">
          <PerformanceReportMetric
            v-for="[, { id, title, description, displayValue, score }] in filteredMetrics"
            :title="title"
            :display-value="displayValue"
            :score="score"
            :description="description"
            :key="id"
          />
        </div>
      </div>
    </div>
    <BaseLoader class="absolute right-1/2 transform-x-1/2" v-if="isProcessing" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseLoader from '@/components/base/BaseLoader.vue'
import BaseRadioButton from '@/components/base/BaseRadioButton.vue'
import PerformanceReportMetric from '../components/PerformanceReportMetric.vue'
import { usePerformanceReport } from '../composables/usePerformanceReport'
import type { TDevice } from '../types'

const { performanceScore, generatePageSpeedReport, filteredMetrics, isProcessing } =
  usePerformanceReport()

const url = ref('https://alescalifetech.com/')
const showReport = ref(false)
const deviceType = ref<TDevice>('mobile')

const generateHandler = async (): Promise<void> => {
  try {
    await generatePageSpeedReport(url.value, deviceType.value)
    showReport.value = true
  } catch {
    showReport.value = false
  }
}
</script>
