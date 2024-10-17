<template>
  <div class="grid gap-y-3">
    <div class="item grid grid-cols-2 gap-x-3 items-start">
      <BaseInput type="text" label="hex" />
      <BaseInput type="number" label="Stop" />
    </div>

    <div class="h-[30px] rounded-sm bg-primary"></div>
  </div>
</template>

<script setup>
import BaseInput from '@base/BaseInput.vue';
defineProps({});
</script>

<style lang="scss" scoped></style>
