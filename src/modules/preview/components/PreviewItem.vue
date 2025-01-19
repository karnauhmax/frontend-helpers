<template>
  <RouterLink
    :to="renderedPath"
    ref="cardRef"
    class="card relative grid p-4 auto-rows-min gap-y-1  transition-all duration-300 min-h-[140px] border border-b-0 border-transparent  border-transparent border-2 z-10 bg-dark"
  >
    <h3 class="font-bold text-lg">
      {{ title }}
    </h3>
    <p>
      {{ description }}
    </p>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps<{
  title: string

  description: string

  url: string
}>()

const renderedPath: string = `/${props.url}`
</script>
