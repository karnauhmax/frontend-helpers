<template>
  <div>
    <div class="flex gap-x-4 gap-y-8 flex-wrap mb-8">
      <div class="grid gap-y-4" v-for="rule in cssRulesToChange" :key="rule.id">
        <p>
          {{ rule.name }} <span v-if="rule.unit">({{ rule.unit }})</span>
        </p>

        <BaseRangeInput
          :name="rule.name"
          :value="rule.value"
          :minValue="rule.min"
          :maxValue="rule.max"
          :stepValue="rule.step"
          v-model="rule.value"
        />

        <BaseInput type="number" class="max-w-[100px]" v-model="rule.value" />
      </div>
    </div>

    <div
      class="bg-dark overflow-hidden border border-text-secondary/10 resize-none w-full min-h-[500px] transition p-4 grid place-items-center mb-4"
    >
      <div class="result transition-transform" />
    </div>

    <BaseResult v-if="showResult" :content-to-copy="output" size="sm">
      <p class="self-center">
        {{ output }}
      </p>
    </BaseResult>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ITransformRule } from './transform-generator-types';

import BaseInput from '@base/BaseInput.vue';
import BaseRangeInput from '@base/BaseRangeInput.vue';
import BaseResult from '@base/BaseResult.vue';

const cssRulesToChange = ref<ITransformRule[]>([
  {
    id: 1,
    name: 'Translate X',
    cssValue: 'translateX',
    value: 0,
    min: -200,
    max: 200,
    step: 1,
    unit: 'px',
  },

  {
    id: 2,
    name: 'Translate Y',
    cssValue: 'translateY',
    value: 0,
    min: -200,
    max: 200,
    step: 1,
    unit: 'px',
  },

  {
    id: 3,
    name: 'Scale',
    cssValue: 'scale',
    value: 1,
    min: 0,
    max: 2,
    step: 0.01,
    unit: '',
  },

  {
    id: 4,
    name: 'Rotate',
    cssValue: 'rotate',
    value: 0,
    min: -360,
    max: 360,
    step: 1,
    unit: 'deg',
  },

  {
    id: 5,
    name: 'Skew',
    cssValue: 'skew',
    value: 0,
    min: -360,
    max: 360,
    step: 1,
    unit: 'deg',
  },
]);

const newRuleHandler = (rule: ITransformRule) => {
  if (rule.cssValue === 'scale' && rule.value === 1) {
    return null;
  }

  if (rule.value) {
    return `${rule.cssValue}(${rule.value}${rule.unit}) `;
  }
};

const showResult = computed(() => {
 return cssRulesToChange.value.some((rule) => {
   if (rule.cssValue === 'scale' && rule.value === 1) {
     return false;
   }

   return rule.value !== 0
 })
})


const dynamicStyles = computed(() => {
  const result = `

  ${cssRulesToChange.value.map(newRuleHandler).join('')}

  `;

  return result;
});

const output = computed(() => {
  return `transform: ${dynamicStyles.value} ;`;
});
</script>

<style lang="scss" scoped>
.result {
  width: 300px;
  height: 300px;
  background-color: var(--primary-color);
  border-radius: 5px;
  transform: v-bind('dynamicStyles');
}
</style>
