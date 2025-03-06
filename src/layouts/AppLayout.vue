<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <Transition name="route-transition" mode="out-in">
    <component :is="route.meta.layoutComponent">
      <slot />
    </component>
  </Transition>
</template>
