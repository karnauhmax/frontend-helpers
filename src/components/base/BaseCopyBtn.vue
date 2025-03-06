<template>
  <button @click="copyHandler" type="button" aria-label="Copy">
    <v-icon name="co-copy" />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  contentToCopy: string;
}>();

const emits = defineEmits(['copied']);

const copyHandler = () => {
  navigator.clipboard.writeText(props.contentToCopy);
  emits('copied');
};
</script>
