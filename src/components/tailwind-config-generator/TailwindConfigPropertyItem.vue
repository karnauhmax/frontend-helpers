<template>
  <div>
    <div class="flex justify-between items-center gap-x-2">
      <h4>{{ property.title }}</h4>

      <button
        class="group p-2 transition-opacity hover:opacity-50"
        type="button"
        aria-label="Delete Property Item"
        @click="deletePropertyItem"
      >
        <TrashcanOutline fill-color="#42b883" />
      </button>
    </div>

    <div class="grid gap-2">
      <BaseInput v-model="title" placeholder="Name..." />

      <label>
        <textarea
          class="bg-dark border border-text-secondary/10 resize-none w-full min-h-[100px] transition focus:outline-none focus:border-primary p-2 custom-scrollbar"
          placeholder="Value..."
          v-model="value"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import type { ICssPropertyItem } from './properties/properties.types';

import TrashcanOutline from 'vue-material-design-icons/TrashcanOutline.vue';
import BaseInput from '@base/BaseInput.vue';

const title = defineModel<string>('title', { required: true });
const value = defineModel<string>('value', { required: true });

const props = defineProps<{
  title: string;

  id: number;

  property: ICssPropertyItem;

  value: string;
}>();

const { id, property } = toRefs(props);

const emits = defineEmits(['onPropertyItemDelete']);

const deletePropertyItem = () => {
  emits('onPropertyItemDelete', id.value, property.value);
};
</script>

<style lang="scss" scoped></style>
