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
import BaseInput from '@/components/base/BaseInput.vue'
import BaseRangeInput from '@/components/base/BaseRangeInput.vue'
import BaseResult from '@/components/base/BaseResult.vue'
import { useTransformGenerator } from './composables/useTransformGenerator'

const { cssRulesToChange, output, showResult, dynamicStyles } = useTransformGenerator()
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
