<template>
  <!-- This is the generic shell for all modals -->
  <VueFinalModal
    class="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-9999"
    content-class="modal-content bg-white dark:bg-gray-800 no-scrollbar relative rounded-xl"
    overlay-class="fixed inset-0 h-full w-full"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    teleport-to="body"
    :esc-to-close="true"
    :click-to-close="true"
    @closed="$emit('close')"
  >
    <div class="flex space-between items-center p-6">
      <div class="pr-14">
        <h4 class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          {{ title }}
        </h4>
        <p
          class="text-sm text-gray-500 dark:text-gray-400"
          v-if="description && description.length"
        >
          {{ description }}
        </p>
      </div>
      <button
        @click="$emit('close')"
        class="modal-close-btn transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300"
      >
        <CloseIcon class="fill-current" width="24" height="24" />
      </button>
    </div>

    <div class="modal-body p-6 pt-0">
      <!-- The specific modal's content will be injected here -->
      <slot />
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import CloseIcon from '../../icons/CloseIcon.vue'
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
})

defineEmits(['close'])
</script>

<style>
.modal-content {
  max-height: 90%;
  width: 100%;
  max-width: 700px;
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
