<template>
  <div class="grid gap-y-5">
    <h3 class="text-xl">{{ title }}</h3>
    <BaseSelect v-model="selectedPropertyName" :options="props.propertiesNames" />
    <BaseButton 
      @click="() => handleNewProperty(id)" 
      class="max-w-[250px]" 
      label="Add property" 
    />

    <template v-for="property in props.properties" :key="property.id">
      <template v-if="property.value === selectedPropertyName">
        <TailwindConfigPropertyItem
          v-for="item in property.items"
          :key="item.id"
          :id="item.id"
          :property="property"
          v-model:title="item.title"
          v-model:value="item.value"
          @on-property-item-delete="removePropertyItem"
        />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ICssProperty } from '../properties/properties.types'
import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import TailwindConfigPropertyItem from './TailwindConfigPropertyItem.vue'
import { useTailwindGenerator } from '../composables/useTailwindGenerator'

const { removePropertyItem, handleNewProperty, selectedPropertyName } = useTailwindGenerator()

const props = defineProps<{
  properties: ICssProperty[]
  propertiesNames: string[]
  title: string
  id: number
}>()
</script>

<style lang="scss" scoped></style>
