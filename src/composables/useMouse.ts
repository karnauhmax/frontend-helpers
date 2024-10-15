import { ref, onMounted, onBeforeUnmount } from 'vue'

const x = ref(0)
const y = ref(0)

export function useMouse() {

 const handler = (event: MouseEvent) => {
  const { pageX, pageY } = event;

  x.value = pageX
  y.value = pageY
 }

  onMounted(() => {
   window.addEventListener('mousemove', handler)
  })

  onBeforeUnmount(() => {
   window.removeEventListener('mousemove', handler)
  })

  return {
   x, 
   y
  }
}