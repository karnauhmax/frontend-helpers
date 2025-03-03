<template>
  <section class="min-h-screen">
    <div class="grid items-center min-h-[inherit]">
      <div class="grid gap-y-3 justify-items-center font-extralight">
        <h1 class="text-7xl text-center leading-tight">
          All Frontend Helpers <br />
          <span class="text-primary font-light">In One Place</span>
        </h1>
        <p class="text-text-secondary font-extralight text-xl">Well, or almost all of them :D</p>
      </div>
    </div>
    <ArrowDown class="absolute right-1 bottom-20" />
  </section>
</template>

<script setup lang="ts">
import ArrowDown from 'vue-material-design-icons/ArrowDown.vue';
</script>
