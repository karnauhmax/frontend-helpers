<template>
  <section>
    <div class="mb-4 grid gap-y-2 justify-items-start">
      <BaseInput
        v-model.number="width"
        label="Min size of each card in px"
        type="number"
        placeholder="Width in pxs"
        :isValid="isInputValid"
        errorMessage="Width must be greater than 0"
      />

      <BaseButton label="Generate" @click="generateHandler" />

      <div class="grid gap-y-2 min-h-[84px] auto-rows-min" ref="outputHead">
        <span>Output units</span>
        <div class="flex gap-4">
          <BaseRadioButton
            label="PX"
            v-model="units"
            name="unit"
            value="px"
            checked
            @change="inputHandler"
          />
          <BaseRadioButton
            label="REM"
            v-model="units"
            name="unit"
            value="rem"
            @change="inputHandler"
          />
        </div>
        <p v-show="isRemUnitsSelected" class="text-text-secondary text-sm">
          Calculation based on a root font-size of 16 pixel.
        </p>
      </div>
    </div>

    <GridOutput
      ref="outputRef"
      v-show="generatedWidth"
      :units="units"
      :width="Number(generatedWidth)"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';

import BaseButton from '@/components/base/BaseButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseRadioButton from '@/components/base/BaseRadioButton.vue';
import { useGridBuilder } from '../composables/useGridBuilder';
import { type TUnit, UNITS } from '@/types';
import GridOutput from '../components/GridOutput.vue';

type TOutputElement = InstanceType<typeof GridOutput>;

const { calculateWidth } = useGridBuilder();

const units = ref<TUnit>(UNITS.PX);
const width = ref<number>(0);

const isInputValid = ref<boolean>(true);
const generatedWidth = ref<number>(0);

const outputRef = ref<TOutputElement | null>(null);
const outputHead = ref<HTMLDivElement | null>(null);

const isRemUnitsSelected = computed(() => {
  return units.value === UNITS.REM;
});

const canGenerate = computed(() => {
  return !outputRef.value?.outputElementRef || width.value > 0;
});

const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const scrollToOutputHead = async (): Promise<void> => {
  await nextTick();

  outputHead.value?.scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  });
};

const generateHandler = (): void => {
  if (!canGenerate.value) {
    isInputValid.value = false;
    scrollToTop();
    return;
  }

  generatedWidth.value = calculateWidth(units.value, width.value);

  isInputValid.value = true;

  if (outputRef.value?.outputElementRef) {
    outputRef.value.outputElementRef.style.width = `100%`;
  }

  scrollToOutputHead();
};

const inputHandler = () => {
  if (!generatedWidth.value) return;

  generateHandler();
};
</script>
