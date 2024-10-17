<template>
  <div class="grid gap-y-5">
    <div>
      <BaseInput label="Hex code" v-model="hexCode" />
    </div>

    <div class="grid gap-4 grid-cols-4">
      <BaseInput label="r" v-model="gradientColorR" type="number" />
      <BaseInput label="g" v-model="gradientColorG" type="number" />
      <BaseInput label="b" v-model="gradientColorB" type="number" />
      <BaseInput label="a" v-model="gradientColorA" type="number" />
    </div>
  </div>
</template>

<script setup>
import BaseInput from '@base/BaseInput.vue';

const hexCode = defineModel('hex', {
  type: String,
  required: true,
});

const gradientColorR = defineModel('gradientColorR', {
  type: Number,
  required: true,
});

const gradientColorG = defineModel('gradientColorG', {
  type: Number,
  required: true,
});

const gradientColorB = defineModel('gradientColorB', {
  type: Number,
  required: true,
});

const gradientColorA = defineModel('gradientColorA', {
  type: Number,
  required: true,
});
</script>

<style lang="scss" scoped></style>
