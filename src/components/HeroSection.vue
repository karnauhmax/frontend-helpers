<template>
  <section class="min-h-screen">
    <div class="grid items-center min-h-[inherit]">
      <div class="grid gap-y-3 justify-items-center">
        <h1 class="font-black text-7xl text-center leading-tight">
          {{ $t('home.title.all') }} <br />
          <span class="text-primary font-black">{{
            $t('home.title.place')
          }}</span>
        </h1>
        <p class="text-text-secondary text-xl">
          {{ $t('home.note') }}
        </p>
      </div>
    </div>
    <ArrowDown class="absolute right-1 bottom-20" />
  </section>
</template>

<script setup>
import ArrowDown from 'vue-material-design-icons/ArrowDown.vue';
</script>
