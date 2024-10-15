``
<template>
  <div ref="switcher" class="language-switcher hidden relative">
    <button
      @click="isMenuOpened = !isMenuOpened"
      class="selected flex items-center gap-x-1 font-bold"
    >
      <img width="20" height="20" :src="`/flags/${$i18n.locale}.svg`" />
      <ArrowDown
        :class="`transition-transform ${isMenuOpened ? 'rotate-[-180deg]' : ''}`"
        :size="16"
      />
    </button>

    <ul
      class="absolute border border-primary translate-y-[25%] translate-x-[-25%] z-20 bg-black/80 transition-all"
      :class="{
        'opacity-100 visible': isMenuOpened,
        'opacity-0 invisible': !isMenuOpened
      }"
    >
      <li class="border-primary" v-for="locale in translations.supportedLocales">
        <button
          @click="handleLocale(locale)"
          class="w-full text-start p-2 flex items-center gap-x-2"
        >
          <img width="20" height="20" :src="`/flags/${locale}.svg`" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import translations from '@/i18n/translations'
import ArrowDown from 'vue-material-design-icons/ArrowDown.vue'

const router = useRouter()
const switcher = ref(null)

const isMenuOpened = ref(false)

const handleLocale = async (selectedLocale) => {
  isMenuOpened.value = false

  await translations.switchLanguage(selectedLocale)
}

// onClickOutside(switcher, () => {
//   isMenuOpened.value = false;
// });

const locales = [
  {
    id: 1,
    value: 'en'
  },

  {
    id: 2,
    value: 'uk'
  }
]
</script>

<style lang="scss" scoped>
.selected {
}
</style>
