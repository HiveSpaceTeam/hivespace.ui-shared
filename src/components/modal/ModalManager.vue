<template>
  <!-- Legacy wrapped mode: ModalWrapper provides chrome (adminportal / sellercenter) -->
  <ModalWrapper v-if="isOpen && modalComponent" v-model="isOpen" :title="modalProps.title || 'Modal'"
    :description="modalProps.description || ''" :max-width="modalProps.maxWidth" @close="closeModal">
    <component :is="modalComponent" v-bind="modalProps" @close="closeModalWithResult" />
  </ModalWrapper>

  <!-- Raw modal stack: component provides its own chrome, ModalManager provides backdrop -->
  <Teleport v-if="rawModalStack.length > 0" to="body">
    <div
      class="fixed inset-0 z-[9000] flex items-center justify-center overflow-y-auto px-4 py-8"
      @keydown.esc.stop="closeModal(undefined)"
    >
      <!-- Backdrop -->
      <div
        class="fixed inset-0"
        style="background-color: #0006"
        @click="closeModal(undefined)"
      />
      <!-- Top-of-stack component -->
      <div class="relative z-10 w-full flex items-center justify-center">
        <component
          :is="rawModalStack[rawModalStack.length - 1].component"
          v-bind="rawModalStack[rawModalStack.length - 1].props"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { watch } from 'vue'
import { useModal } from '../../composables/useModal'
import ModalWrapper from './ModalWrapper.vue'

const { isOpen, modalComponent, modalProps, rawModalStack, closeModal } = useModal()

function closeModalWithResult(result) {
  closeModal(result)
}

// Lock body scroll while any raw modal is open
watch(
  () => rawModalStack.value.length,
  (len) => {
    document.body.style.overflow = len > 0 ? 'hidden' : ''
  },
)
</script>
