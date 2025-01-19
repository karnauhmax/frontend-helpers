import { ref, watch, isRef, isReactive, toValue } from 'vue'

type TStorageType = 'localStorage' | 'sessionStorage'

interface IOptions {
  key: string
  initialValue: any
  type: TStorageType
}

export function useStorage<T>(options: IOptions) {
  const { key, type, initialValue } = options

  const STORAGES: Record<TStorageType, Storage> = {
    localStorage: localStorage,
    sessionStorage: sessionStorage
  }

  const storage = STORAGES[type]

  const storageItem = storage.getItem(key)
  const parsedItem = storageItem ? JSON.parse(storageItem) : null

  const currentValue = ref<T>(parsedItem ?? toValue(initialValue))

  watch(
    currentValue,
    () => {
      const newValueToSet = currentValue.value
      storage.setItem(key, JSON.stringify(newValueToSet))
    },
    {
      deep: true,
      immediate: true
    }
  )

  if (isRef(initialValue) || isReactive(initialValue)) {
    watch(
      initialValue,
      (newVal) => {
        currentValue.value = newVal
      },
      {
        deep: true,
        immediate: true
      }
    )
  }

  return currentValue
}
