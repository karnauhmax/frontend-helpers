<template>
  <div>
    <form class="grid gap-y-4 mb-5">
      <label>
        <BaseInput v-model="fontPath" :label="$t('fontFaceGenerator.fontPath')" />
      </label>

      <label>
        <BaseInput v-model="fileName" :label="$t('fontFaceGenerator.fontName')" />
      </label>

      <div class="grid gap-y-2">
        <p>{{ $t('fontFaceGenerator.fontFormat') }}</p>
        <div class="flex gap-x-3">
          <BaseCheckbox
            v-for="format in formats"
            :key="format.id"
            :value="format.value"
            :label="format.value"
            v-model="selectedFormats"
            :class="{ 'pointer-events-none': checkIfDisabled(format.value) }"
          />
        </div>
      </div>

      <div class="grid gap-y-2">
        <p>{{ $t('fontFaceGenerator.fontWeight') }}</p>
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
        <p>{{ $t('fontFaceGenerator.fontStyle') }}</p>
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
    <BaseResult :content-to-copy="result">
      <pre
        >{{ result }}
      </pre>
    </BaseResult>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseCheckbox from '@base/BaseCheckbox.vue'
import BaseInput from '@base/BaseInput.vue'
import BaseRadioButton from '@base/BaseRadioButton.vue'
import BaseResult from '@base/BaseResult.vue'

import { useFontFaceGenerator } from './composables/useFontFaceGenerator'

const { weights, styles, formats } = useFontFaceGenerator()

const fileName = ref('Montserrat')
const fontPath = ref('../fonts/')
const selectedWeight = ref(400)
const selectedStyle = ref('normal')
const selectedFormats = ref(['woff2'])

const result = computed(() => {
  const result = `@font-face {
    font-family: "${fileName.value}";
    src: ${selectedFormats.value.map(generateSource).join('\n     ')}
    font-weight: ${selectedWeight.value};
    font-style: ${selectedStyle.value};
  }`
  return result
})

const checkIfDisabled = (value: string) => {
  return selectedFormats.value.length === 1 && selectedFormats.value.includes(value)
}
</script>
