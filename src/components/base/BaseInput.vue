<template>
  <label class="grid gap-y-2 justify-items-start" :for="id">
    <span v-if="label">{{ label }}</span>

    <input
      :class="`text-secondary w-full bg-dark border p-2 focus:outline-none focus:border2 focus:border-primary pr-8 ${
        isValid ? 'border-primary' : 'border-red-500/100'
      }`"
      v-model="model"
      :value="model"
      v-bind="$attrs"
      :id="id"
    />

    <span v-if="units" class="absolute text-sm text-text-secondary right-[10px] top-[57%]">{{
      units
    }}</span>

    <span v-if="!isValid && errorMessage" class="text-sm text-red-500">
      {{ errorMessage }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { useId } from 'vue';

interface Props {
  label?: string | boolean;

  isValid?: boolean;

  errorMessage?: string | boolean;

  units?: string | boolean;
}

withDefaults(defineProps<Props>(), {
  label: false,
  isValid: true,
  errorMessage: false,
  units: false
});

const model = defineModel<string | number>('modelValue', {});
const id = useId();
</script>
