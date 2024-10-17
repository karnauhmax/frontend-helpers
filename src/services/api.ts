const fetchData = async <T>(url: string, options?: object): Promise<T> => {
  const res = await fetch(url, options)

  if (!res.ok) return Promise.reject()

  try {
    const data = await res.json()

    return data
  } catch (error) {
    throw error
  }
}

type Device = 'desktop' | 'mobile'

const getPageSpeedReport = async (url: string, device: Device) => {
  const data = await fetchData(
    `${import.meta.env.VITE_PAGESPEED_REPORT_URL}${url}&strategy=${device}`
  )

  console.log(data)

  return data
}

export { getPageSpeedReport }
