import type { TDevice } from '@/modules/performance-report/types'

const fetchData = async <T>(url: string, options?: object): Promise<T> => {
  try {
    const res = await fetch(url, options)
    const data = await res.json()

    return data
  } catch (error) {
    throw error
  }
}

const getPageSpeedReport = async (url: string, device: TDevice) => {
  const data = await fetchData(
    `${import.meta.env.VITE_PAGESPEED_REPORT_URL}${url}&strategy=${device}`
  )

  return data
}

export { getPageSpeedReport }
