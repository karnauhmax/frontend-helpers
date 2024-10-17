<template>
  <button type="button" aria-label="Copy">
    <ContentCopy
      @click="copyHandler"
      fillColor="rgba(235, 235, 235, .6)"
      :size="18"
    />
  </button>
</template>

<script setup lang="ts">
import ContentCopy from 'vue-material-design-icons/ContentCopy.vue';

const props = defineProps<{
  contentToCopy: string | number;
}>();

const emits = defineEmits(['copied']);

const copyHandler = () => {
  navigator.clipboard.writeText(props.contentToCopy);
  emits('copied');
};
</script>
