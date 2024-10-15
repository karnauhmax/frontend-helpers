<template>
  <div class="grid gap-y-2">
    <div class="flex gap-x-5">
      <BaseInput
        @input="pxHandler"
        v-model="pxValue"
        :label="$t('pxConverter.valuePx')"
        type="number"
      />
      <BaseInput
        @input="remHandler"
        v-model="remValue"
        :label="$t('pxConverter.valueRem')"
        type="number"
      />
    </div>
    <p class="text-text-secondary text-sm">
      {{ $t('pxConverter.note') }}
    </p>
  </div>
</template>

<script setup>
import BaseInput from '@base/BaseInput.vue';
import { pxToRem } from '@/helpers/pxToRem.js';
import { remToPx } from '@/helpers/remToPx.js';
import { ref } from 'vue';
const pxValue = ref(16);
const remValue = ref(1);

const pxHandler = () => {
  remValue.value = pxToRem(pxValue.value);
};

const remHandler = () => {
  pxValue.value = remToPx(remValue.value);
};
</script>
