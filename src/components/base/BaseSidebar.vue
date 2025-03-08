<template>
  <div
    class="fixed right-0 top-0 h-full z-10 transition-transform lg:transform-none lg:sticky lg:top-[20px] lg:h-auto flex items-center overflow-y-auto"
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
      <v-icon
        name="bi-arrow-left-circle"
        :class="{
          'rotate-180': isSidebarExpanded
        }"
      />
    </button>
    <aside
      class="rounded-md bg-gradient-to-b from-gray-700 lg:from-gray-700/40 to-dark self-start items-start h-full lg:w-full overflow-auto"
    >
      <div class="px-5 py-2 border-b border-text-secondary/10">
        <p class="text-center font-regular">Other Helpers</p>
      </div>
      <div class="px-5 py-2">
        <ul class="grid gap-y-3">
          <li v-for="{ id, url, title } in helpersList" :key="id">
            <RouterLink
              class="font-regular hover:text-primary transition-colors duration-300 focus:underline focus:text-primary focus:outline-none"
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
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useClickOutside } from '@/composables/useClickOutside';
import { helpersList } from '@/constants';

const isSidebarExpanded = ref(false);
const sidebar = ref(null);

const toggleSidebar = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value;
};

useClickOutside(sidebar, () => {
  isSidebarExpanded.value = false;
});
</script>
