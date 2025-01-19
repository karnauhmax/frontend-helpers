<script setup lang="ts">
import { useRoute } from 'vue-router';
import TheHeader from '@/components/TheHeader.vue';

const route = useRoute();
</script>

<template>
  <TheHeader />
  <component :is="route.meta.layoutComponent">
    <slot />
  </component>
</template>
