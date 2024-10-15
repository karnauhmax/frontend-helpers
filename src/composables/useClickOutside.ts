import { onMounted, onBeforeUnmount } from 'vue'

export function useClickOutside(target: any, callback: () => void) {
  const handler = (event: Event) => {
    const applyCallback = !(event.target === target.value || target.value.contains(event.target))

    if (applyCallback) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handler)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handler)
  })
}
