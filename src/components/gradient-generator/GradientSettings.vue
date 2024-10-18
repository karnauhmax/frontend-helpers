<template>
  <div class="grid gap-y-3">
    <p>Gradient Type:</p>
    <div class="flex gap-x-4">
      <BaseRadioButton checked label="Linear" v-model="type" value="linear" name="gradient-type" />

      <BaseRadioButton label="Radial" value="radial" name="gradient-type" v-model="type" />
    </div>
    <div>
      <p>Angle (deg)</p>
      <div class="flex items-center gap-3">
        <BaseRangeInput :min-value="-360" :max-value="360" v-model.number="angle" />

        <BaseInput class="max-w-[100px]" type="number" v-model.number="angle" />
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from '@/components/base/BaseInput.vue'
import BaseRangeInput from '@/components/base/BaseRangeInput.vue'
import BaseRadioButton from '@/components/base/BaseRadioButton.vue'
const angle = defineModel('angle', {
  type: Number,
  required: true
})

const type = defineModel('type', {
  type: String,
  required: true
})
</script>

<style lang="scss" scoped></style>
