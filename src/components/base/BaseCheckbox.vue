<template>
  <label class="checkbox-label relative flex items-center cursor-pointer">
    <input
      type="checkbox"
      class="appearance-none peer"
      v-model="model"
      :value="value"
    />
    <span class="checkbox-container" />
    <span>{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: any[] | boolean;
  value: boolean | string | number;
  label: string;
}>();

const emit = defineEmits(['update:modelValue']);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>
