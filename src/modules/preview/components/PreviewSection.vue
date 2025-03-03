<template>
  <section class="preview-section">
    <h2 class="text-secondary text-3xl font-regular mb-7">Available Helpers</h2>
    <div
      class="list grid grid-cols-preview-layout gap-[2px] p-[2px]"
      ref="sectionRef"
      @mousemove="updateMousePosition"
      :style="{
        '--x': `${mouseX}px`,
        '--y': `${mouseY}px`
      }"
    >
      <PreviewItem
        v-for="{ id, title, description, url } in helpersList"
        :key="id"
        :title="title"
        :description="description"
        :url="url"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PreviewItem from './PreviewItem.vue';
import { helpersList } from '@/constants';

const sectionRef = ref<HTMLElement | null>(null);
const mouseX = ref(0);
const mouseY = ref(0);

const updateMousePosition = (event: MouseEvent) => {
  if (sectionRef.value) {
    const rect = sectionRef.value.getBoundingClientRect();
    mouseX.value = event.clientX - rect.left;
    mouseY.value = event.clientY - rect.top;
  }
};
</script>

<style scoped lang="scss">
.list {
  position: relative;
  overflow: hidden;

  @media (hover: hover) {
    &:hover {
      &::after {
        opacity: 1;
      }
    }
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0px;
    z-index: 2;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    background: radial-gradient(
      200px circle at var(--x) var(--y),
      var(--primary-color),
      transparent 100%
    );
  }
}
</style>
