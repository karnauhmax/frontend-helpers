<template>
  <div class="border border-text-secondary/10 p-4 grid grid-cols-2 gap-x-4 xl:gap-x-7 gap-y-4">
    <div class="grid gap-y-4">
      <p class="font-bold">{{ $t('clampCalculator.values') }}</p>

      <div class="flex flex-col xl:flex-row gap-2">
        <BaseInput
          v-for="({ id, label, units, type }, index) in valuesInputsConfig"
          :key="id"
          :units="units"
          :type="type"
          :label="label"
          v-model.lazy="valuesInputsConfig[index].value"
        />
      </div>
    </div>
    <div class="grid gap-y-5">
      <p class="font-bold">{{ $t('clampCalculator.viewport') }}</p>
      <div class="flex flex-col xl:flex-row gap-2">
        <BaseInput
          v-for="item in viewportInputsConfig"
          :key="item.id"
          :units="item.units"
          :type="item.type"
          :label="item.label"
          v-model.lazy="item.value"
        />
      </div>
    </div>

    <BaseResult class="col-span-2" size="sm" :content-to-copy="calculatedClamp">
      <p class="self-center">
        {{ calculatedClamp }}
      </p>
    </BaseResult>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import i18n from '@/i18n'
import BaseInput from '@/components/base/BaseInput.vue'
import { useClampCalculator } from '../composables/useClampCalculator'
import BaseResult from '@/components/base/BaseResult.vue'
import { UNITS } from '@/types'

const { t } = i18n.global

const viewportMin = ref(360)
const viewportMax = ref(1920)
const valuesMax = ref(24)
const valuesMin = ref(16)

const { calculatedClamp } = useClampCalculator({
  viewportMin,
  viewportMax,
  valuesMin,
  valuesMax
})

const viewportInputsConfig = ref([
  {
    id: 1,
    label: t('global.labels.min'),
    units: UNITS.PX,
    type: 'number',
    value: viewportMin
  },

  {
    id: 2,
    label: t('global.labels.max'),
    units: UNITS.PX,
    type: 'number',
    value: viewportMax
  }
])

const valuesInputsConfig = ref([
  {
    id: 1,
    label: t('global.labels.min'),
    units: UNITS.PX,
    type: 'number',
    value: valuesMin
  },

  {
    id: 2,
    label: t('global.labels.max'),
    units: UNITS.PX,
    type: 'number',
    value: valuesMax
  }
])
</script>
