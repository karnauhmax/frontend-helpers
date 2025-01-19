<template>
  <div class="generator">
    <div class="mb-4 grid gap-y-4">
      <h2 class="text-2xl">Select a category</h2>
      <BaseSelect v-model="selectedCategory" :options="options" />

      <template v-for="{ id, title, cssProperties, propertiesNames } in properties" :key="id">
        <TailwindConfigSection
          :title="title"
          :properties="cssProperties"
          :properties-names="propertiesNames"
          :id="id"
          v-show="selectedCategory === title"
        />
      </template>
    </div>

    <BaseResult :content-to-copy="resultMarkup">
      <pre>{{ resultMarkup }}</pre>
    </BaseResult>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseResult from '@/components/base/BaseResult.vue'
import TailwindConfigSection from '../components/TailwindConfigGeneratorSection.vue'

import { useTailwindGenerator } from '../composables/useTailwindGenerator'

const { PropertyTypes, properties, resultMarkup } = useTailwindGenerator()

const selectedCategory = ref(PropertyTypes.EFFECTS)

const options = ref<string[]>(Object.values(PropertyTypes))
</script>
