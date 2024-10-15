<template>
  <label>
    <input
      :max="maxValue"
      :min="minValue"
      :step="stepValue"
      type="range"
      v-model.lazy.number="model"
    />
  </label>
</template>

<script setup lang="ts">
const model = defineModel('modelValue')

interface Props {
  modelValue: string | number;

  minValue: string | number;

  maxValue: string | number;

  stepValue: string | number;
}

withDefaults(defineProps<Props>(), {
  minValue: '0',

  maxValue: '100',

  stepValue: '1',
});
</script>

<style lang="scss" scoped>
/********** Range Input Styles **********/
/*Range Reset*/
input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 240px;
}

/* Removes default focus */
input[type='range']:focus {
  outline: none;
}

/***** Chrome, Safari, Opera and Edge Chromium styles *****/
/* slider track */
input[type='range']::-webkit-slider-runnable-track {
  background-color: rgb(55 65 81 / 0.5);
  height: 0.5rem;
}

/* slider thumb */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  margin-top: -7px; /* Centers thumb on the track */

  /*custom styles*/
  background-color: var(--primary-color);
  height: 20px;
  width: 20px;
  border-radius: 3px;
}

input[type='range']:focus::-webkit-slider-thumb {
  border: 1px solid var(--primary-color);
  outline: 1px solid var(--primary-color);
  outline-offset: 3px;
}

/******** Firefox styles ********/
/* slider track */
input[type='range']::-moz-range-track {
  background-color: #053a5f;
  border-radius: 0.5rem;
  height: 0.5rem;
}

/* slider thumb */
input[type='range']::-moz-range-thumb {
  border: none; /*Removes extra border that FF applies*/
  border-radius: 0; /*Removes default border-radius that FF applies*/

  /*custom styles*/
  background-color: #5cd5eb;
  height: 2rem;
  width: 1rem;
}

input[type='range']:focus::-moz-range-thumb {
  border: 1px solid #053a5f;
  outline: 3px solid #053a5f;
  outline-offset: 0.125rem;
}
</style>
