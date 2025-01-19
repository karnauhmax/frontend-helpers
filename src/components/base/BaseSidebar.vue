<template>
  <div
    class="fixed right-0 h-full top-[var(--header-height)] z-10 transition-transform lg:transform-none lg:relative lg:top-0 lg:h-auto flex items-center overflow-y-auto"
    ref="sidebar"
    :class="{
      'translate-x-0': isSidebarExpanded,
      'translate-x-[91%]': !isSidebarExpanded
    }"
  >
    <button
      type="button"
      @click="toggleSidebar"
      class="from-gray-700 to-dark bg-gradient-to-b rounded-bl-sm rounded-tl-sm w-[25px] h-[50px] grid place-items-center lg:hidden"
    >
      <ArrowLeft
       :class="{
         'rotate-180': isSidebarExpanded,
       }"
      :size="18" />
    </button>
    <aside
      class="rounded-md bg-gradient-to-b from-gray-700 lg:from-gray-700/50 to-dark self-start items-start h-full lg:w-full overflow-auto"
    >
      <div class="px-5 py-2 border-b border-text-secondary/10">
        <p class="text-center font-bold">{{ $t('global.check') }}</p>
      </div>
      <div class="px-5 py-2">
        <ul class="grid gap-y-3">
          <li v-for="{ id, url, title } in helpersList" :key="id">
            <RouterLink
              class="font-bold hover:text-primary transition-colors duration-300 focus:underline focus:text-primary focus:outline-none"
              active-class="active"
              @click="isSidebarExpanded = false"
              :to="`/${url}`"
            >
              {{ title }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArrowLeft from 'vue-material-design-icons/ArrowLeft.vue'
import { RouterLink } from 'vue-router'
import { useClickOutside } from '@/composables/useClickOutside'
import { useHelpersList } from '@/composables/useHelpersList'

const isSidebarExpanded = ref(false)
const sidebar = ref(null)

const { helpersList } = useHelpersList()

const toggleSidebar = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value
}

useClickOutside(sidebar, () => {
  isSidebarExpanded.value = false
})
</script>
