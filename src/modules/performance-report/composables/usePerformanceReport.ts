import { getPageSpeedReport } from '@/services/api'
import type { TDevice, TPerformanceMetric } from '../types'
import { computed, readonly, ref } from 'vue'

const METRICS_MAP = [
  'cumulative-layout-shift',
  'largest-contentful-paint',
  'first-contentful-paint',
  'speed-index',
  'total-blocking-time',
  'first-input-delay',
  'first-meaningful-paint'
]

export function usePerformanceReport() {
  const pagespeedReport = ref()
  const isProcessing = ref<boolean>(false)

  const generatePageSpeedReport = async (url: string, device: TDevice): Promise<void> => {
    isProcessing.value = true
    try {
      const { lighthouseResult } = await getPageSpeedReport(url, device)
      pagespeedReport.value = lighthouseResult
    } catch (error) {
      throw new Error(error as string)
    } finally {
      isProcessing.value = false
    }
  }

  const pagespeedReportAudits = computed(() => pagespeedReport.value?.audits)

  const filteredMetrics = computed<TPerformanceMetric[]>(() => {
    const splitedMetrics: TPerformanceMetric[] = Object.entries(pagespeedReportAudits.value)

    return splitedMetrics.filter(([title]) => METRICS_MAP.includes(title))
  })

  const performanceScore = computed(() => pagespeedReport.value?.categories.performance.score)

  return {
    generatePageSpeedReport,
    pagespeedReport,
    filteredMetrics,
    performanceScore,
    isProcessing: readonly(isProcessing)
  }
}
