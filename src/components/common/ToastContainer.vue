<template>
  <Teleport to="body">
    <!-- Toast Container positioned at top-right -->
    <div
      class="fixed top-4 right-4 left-4 sm:left-auto pointer-events-none z-[9999] space-y-3 max-w-sm sm:max-w-sm ml-auto">
      <Toast v-for="toast in props.toasts" :key="toast.id" :id="toast.id" :variant="toast.type" :title="toast.title"
        :message="toast.message" :duration="toast.duration" :show-progress="true" @close="removeToast" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
import Toast from './Toast.vue'

// Define props for toasts data
interface ToastData {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

const props = defineProps<{
  toasts: ToastData[]
}>()

// Define emits for toast actions
const emit = defineEmits<{
  removeToast: [id: string]
}>()

// Remove toast handler
const removeToast = (id: string) => {
  emit('removeToast', id)
}
</script>
