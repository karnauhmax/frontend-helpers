<template>
  <div>
    <form class="grid gap-y-4 mb-5">
      <label>
        <BaseInput v-model="fontPath" label="Font Path" />
      </label>

      <label>
        <BaseInput v-model="fileName" label="Font Name" />
      </label>

      <div class="grid gap-y-2">
        <p>Formats:</p>
        <div class="flex gap-x-3">
          <BaseCheckbox
            v-for="format in formats"
            :key="format.id"
            :value="format.value"
            :label="format.value"
            v-model="selectedFormats"
          />
        </div>
      </div>

      <div class="grid gap-y-2">
        <p>Weights:</p>
        <div class="flex flex-wrap gap-3">
          <BaseRadioButton
            v-for="weight in weights"
            :key="weight.id"
            :checked="weight.checked"
            name="weight"
            :value="weight.value"
            :label="weight.value"
            v-model="selectedWeight"
          />
        </div>
      </div>

      <div class="grid gap-y-2">
        <p>Styles:</p>
        <div class="flex wrap gap-3">
          <BaseRadioButton
            v-for="style in styles"
            name="style"
            :key="style.id"
            :checked="style.checked"
            :value="style.value"
            :label="style.value"
            v-model="selectedStyle"
          />
        </div>
      </div>
    </form>
    <BaseResult v-if="showResult" :content-to-copy="result">
      <pre
        >{{ result }}
      </pre>
    </BaseResult>
  </div>
</template>

<script setup lang="ts">
import BaseCheckbox from '@/components/base/BaseCheckbox.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseRadioButton from '@/components/base/BaseRadioButton.vue';
import BaseResult from '@/components/base/BaseResult.vue';
import { useFontFaceGenerator } from '../composables/useFontFaceGenerator';
import { computed } from 'vue';

const showResult = computed(() => {
  return (
    selectedFormats.value.length > 0 && selectedWeight && selectedStyle && fontPath && fileName
  );
});

const {
  weights,
  styles,
  formats,
  selectedFormats,
  selectedWeight,
  selectedStyle,
  fontPath,
  fileName,
  result
} = useFontFaceGenerator();
</script>
