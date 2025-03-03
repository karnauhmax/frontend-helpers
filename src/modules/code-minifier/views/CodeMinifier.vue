<template>
  <div>
    <div class="flex flex-wrap gap-x-5 gap-y-3 mb-4">
      <BaseRadioButton
        v-for="option in minifyOptions"
        name="option"
        :key="option.value"
        :value="option.value"
        :label="option.title"
        :checked="option.checked"
        :modelValue="selectedOption"
        @update:modelValue="updateHandler($event)"
      />
    </div>

    <div class="grid gap-y-4">
      <div class="border border-text-secondary/10 py-2 px-4">
        <p>Input</p>
      </div>

      <div class="relative">
        <textarea
          class="bg-dark border border-text-secondary/10 resize-none w-full min-h-[300px] transition focus:outline-none focus:border-primary p-4 custom-scrollbar"
          v-model="inputValue"
        />
        <BaseCopyBtn class="top-4 right-4 absolute" :content-to-copy="outputValue" />
      </div>
      <BaseButton
        class="max-w-[150px]"
        label="Generate"
        @click="generateHandler"
        :disabled="isButtonDisabled"
      />

      <div class="grid gap-y-4" v-show="showOutput">
        <div class="border border-text-secondary/10 py-2 px-4">
          <p>Output</p>
        </div>
        <div class="relative">
          <label for="textarea">
            <textarea
              id="textarea"
              class="bg-dark border border-text-secondary/10 resize-none w-full min-h-[300px] transition focus:outline-none focus:border-primary p-4 custom-scrollbar"
              v-model="outputValue"
            />
          </label>
          <BaseCopyBtn class="top-4 right-4 absolute" :content-to-copy="outputValue" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCopyBtn from '@/components/base/BaseCopyBtn.vue';
import BaseRadioButton from '@/components/base/BaseRadioButton.vue';
import { useCodeMinifier } from '../composables/useCodeMinifier';
import type { TMinifyValue } from '../types';

const { generateMinifiedCode, minifyOptions } = useCodeMinifier();

const outputValue = ref('');
const inputValue = ref('');
const selectedOption = ref<TMinifyValue['value']>('JS');
const showOutput = ref(false);

const isButtonDisabled = computed(() => {
  return !inputValue.value;
});

const generateHandler = () => {
  outputValue.value = generateMinifiedCode(selectedOption.value, inputValue.value);

  showOutput.value = true;
};

const updateHandler = (value) => {
  selectedOption.value = value;

  outputValue.value = '';
  inputValue.value = '';
  showOutput.value = false;
};
</script>
