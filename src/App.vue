<template>
  <AppLayout>
    <RouterView v-slot="{ Component }">
      <Transition name="route-transition" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </AppLayout>

  <TheFooter />
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import TheFooter from './components/TheFooter.vue';
</script>

<style lang="scss">
.route-transition-enter-active,
.route-transition-leave-active {
  transition: 0.25s ease;
  transition-property: opacity, transform;
}

.route-transition-enter-from,
.route-transition-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
