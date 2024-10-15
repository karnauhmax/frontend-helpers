<template>
  <label class="grid gap-y-2 justify-items-start">
    <p v-if="label">{{ label }}</p>

    <input
      :class="`text-secondary w-full bg-dark border p-2 focus:outline-none focus:border2 focus:border-primary pr-8 ${
        isValid ? 'border-text-secondary' : 'border-red-500/100'
      }`"
      v-model.lazy="model"
      :value="modelValue"
      v-bind="$attrs"
    />

    <span
      v-if="units"
      class="absolute text-sm text-text-secondary right-[10px] top-[57%]"
      >{{ units }}</span
    >

    <span v-if="!isValid && errorMessage" class="text-sm text-red-500">
      {{ errorMessage }}
    </span>
  </label>
</template>

<script setup lang="ts">
const model = defineModel<string | number>();

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
  units: false,
});

const emits = defineEmits(['update:modelValue']);

const inputHandler = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  emits('update:modelValue', target.value);
};
</script>
