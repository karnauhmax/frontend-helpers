<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const emits = defineEmits(['file-uploaded']);

type FileEventTarget = EventTarget & { files: FileList };

const dropzoneRef = ref<HTMLElement | null>(null);
function onUpload(event: Event) {
  if (!event.target) return;

  const target = event.target as FileEventTarget;
  const files = Array.from(target.files);

  emits('file-uploaded', files);
}

const props = withDefaults(
  defineProps<{
    title: string;
    description: string;
    accept: string;
    multiple?: boolean;
  }>(),
  {
    multiple: false
  }
);

const destroyEventsSignal = new AbortController();

onMounted(() => {
  if (!dropzoneRef.value) return;

  dropzoneRef.value.addEventListener(
    'dragover',
    (event) => {
      event.preventDefault();
    },
    {
      signal: destroyEventsSignal.signal
    }
  );

  dropzoneRef.value.addEventListener(
    'drop',
    (event) => {
      event.preventDefault();

      if (!event.dataTransfer?.files.length) return;

      if (event.dataTransfer?.items[0].kind !== 'file') return;

      const files = Array.from(event.dataTransfer.files);

      emits('file-uploaded', files);
    },
    {
      signal: destroyEventsSignal.signal
    }
  );
});

onUnmounted(() => {
  destroyEventsSignal.abort();
});
</script>

<template>
  <div
    ref="dropzoneRef"
    class="text-center border-dashed border border-text-primary/50 transition-colors hover:border-primary min-h-[250px] sm:min-h-[300px]"
  >
    <input
      @input="onUpload"
      class="hidden"
      type="file"
      id="fileInput"
      :accept="props.accept"
      :multiple="props.multiple"
    />

    <label
      class="flex flex-col items-center justify-center h-full gap-y-2 cursor-pointer px-4"
      for="fileInput"
    >
      <p class="font-medium sm:text-2xl text-xl">{{ props.title }}</p>
      <p class="text-md text-text-primary/50">
        {{ props.description }}
      </p>
    </label>
  </div>
</template>
