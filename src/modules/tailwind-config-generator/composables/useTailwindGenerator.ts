import { computed, ref } from 'vue'
import type {
  ICssCategory,
  ICssProperty,
  ICssPropertyItem
} from '@/modules/tailwind-config-generator/properties/properties.types'
import propertiesStorage from '@/modules/tailwind-config-generator/properties/properties'
import { useStorage } from '@/composables/useStorage'

const PropertyTypes = {
  EFFECTS: 'Effects',
  GRID: 'Grid',
  SPACING: 'Spacing',
  FLEX: 'Flex',
  BACKGROUND: 'Background',
  SIZES: 'Sizes',
  BORDER_OUTLINE: 'Border/Outline',
  COLORS: 'Colors',
  TYPOGRAPHY: 'Typography'
}

const properties = useStorage<ICssCategory[]>({
  type: 'localStorage',
  key: 'tailwind-properties',
  initialValue: propertiesStorage
})

export function useTailwindGenerator() {
  const selectedPropertyName = ref(properties.value[0].cssProperties[0].value)

  const generateCssItems = (cssProperty: ICssProperty) => {
    const cssItems = cssProperty.items
      .filter((item) => item.title && item.value)
      .map((item) => `"${item.title}": "${item.value}" ,`)
      .join('\n          ')

    return cssItems
      ? `
          ${cssProperty.value}: {
            ${cssItems}
          },
        `
      : ''
  }

  const resultList = useStorage({
    type: 'localStorage',
    key: 'tailwind-result-list',
    initialValue: computed(() => {
      return properties.value
        .map((property) => {
          const cssProperties = property.cssProperties
            .map((cssProperty: ICssProperty) => generateCssItems(cssProperty))
            .join('')

          return cssProperties
        })
        .join('')
    })
  })

  const resultMarkup = computed(() => {
    return `/** @type {import('tailwindcss').Config} */
export default {
  "theme": {
    extend: {${resultList.value}}
  },
  "variants": {},
  "plugins": []
};`
  })

  const createNewPropertyItem = (propertyToPush: ICssProperty) => {
    const newPropertyItem: ICssPropertyItem = {
      id: Date.now(),
      title: '',
      value: ''
    }

    propertyToPush.items.push(newPropertyItem)
  }

  const removePropertyItem = (itemId: number, property: ICssProperty) => {
    const indexToDelete = property.items.findIndex((item) => item.id === itemId)

    if (indexToDelete !== -1) {
      property.items.splice(indexToDelete, 1)
    }
  }

  const handleNewProperty = (categoryId: number) => {
    const category = properties.value.find((cat) => cat.id === categoryId)
    if (!category) return

    const foundProperty = category.cssProperties.find(
      (item: ICssProperty) => item.value === selectedPropertyName.value
    )

    if (foundProperty) {
      createNewPropertyItem(foundProperty)
    }
  }

  return {
    PropertyTypes,
    properties,
    selectedPropertyName,
    handleNewProperty,
    removePropertyItem,
    generateCssItems,
    resultMarkup
  }
}
