<template>
  <div class="grid gap-y-5">
    <h3 class="text-xl">{{ title }}</h3>
    <BaseSelect v-model="selectedCategory" :options="propertiesNames" />
    <BaseButton @click="addProperty" class="max-w-[250px]" label="Add property" />

    <template v-for="property in properties" :key="property.id">
      <TailwindConfigPropertyItem
        v-for="item in property.items"
        :key="item.id"
        :id="item.id"
        :property="property"
        v-model:title="item.title"
        v-model:value="item.value"
        @on-property-item-delete="deletePropertyItem"
      />

      {{ property }}
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ICssProperty } from './properties/properties.types'
import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import TailwindConfigPropertyItem from './TailwindConfigPropertyItem.vue'

const props = defineProps<{
  properties: ICssProperty[]

  propertiesNames: string[]

  title: string

  id: number
}>()

const selectedCategory = ref(props.propertiesNames[0])

const emits = defineEmits(['onPropertyCreated', 'onPropertyItemDelete', 'onPropertyItemAdded'])

const addProperty = () => {
  emits('onPropertyCreated', selectedCategory.value)
}

const deletePropertyItem = (itemId: number, property: ICssProperty) => {
  emits('onPropertyItemDelete', itemId, property)
}
</script>

<style lang="scss" scoped></style>
