<template>
  <label class="relative pl-[18px] cursor-pointer radio-label">
    <input class="appearance-none peer" type="radio" @change="changeHandler" v-bind="$attrs" />
    <span class="radio-container"></span>
    {{ label }}
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string | number
    modelValue: any
  }>(),
  {
    modelValue: ''
  }
)

defineOptions({
  inheritAttrs: false
})

const emits = defineEmits(['change', 'update:modelValue'])

const changeHandler = (event: HTMLInputElement) => {
  emits('update:modelValue', event.target.value)
  emits('change')
}
</script>
