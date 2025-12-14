<template>
  <!-- This component dynamically renders the correct modal based on global state -->
  <ModalWrapper v-if="isOpen && modalComponent" v-model="isOpen" :title="modalProps.title || 'Modal'"
    :description="modalProps.description || ''" @close="closeModal">
    <!-- Use Vue's dynamic <component> to render the correct modal -->
    <component :is="modalComponent" v-bind="modalProps" @close="closeModalWithResult" />
  </ModalWrapper>
</template>

<script setup>
import { useModal } from '@/composables/useModal';
import ModalWrapper from './ModalWrapper.vue';

const { isOpen, modalComponent, modalProps, closeModal } = useModal();

// This allows the modal content component to emit a close event with a payload
function closeModalWithResult(result) {
  closeModal(result);
}
</script>
