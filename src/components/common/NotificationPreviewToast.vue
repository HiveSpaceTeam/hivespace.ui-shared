<template>
  <Teleport to="body">
    <div class="fixed bottom-4 right-4 z-[9999] flex flex-col gap-3 items-end pointer-events-none"
      style="max-width: 360px; width: 100%" aria-live="polite">
      <TransitionGroup name="toast-slide" tag="div" class="flex flex-col gap-3 items-end w-full">
        <div v-for="toast in toasts" :key="toast.id"
          class="pointer-events-auto w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg px-4 py-3 flex items-start gap-3 cursor-pointer"
          @click="$emit('click', toast.id)">
          <!-- Avatar -->
          <div class="relative flex-shrink-0">
            <img :src="toast.avatarUrl || defaultAvatar" alt=""
              class="h-11 w-11 rounded-full object-cover" />
            <span
              class="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 border-2 border-white dark:border-gray-800">
              <NotificationBellIcon class="h-2.5 w-2.5 text-white" />
            </span>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <p class="text-sm text-gray-700 dark:text-gray-200 line-clamp-2 leading-snug">
              {{ toast.message }}
            </p>
            <p class="text-xs text-brand-500 font-medium mt-0.5">
              {{ $t('common.notifications.justNow') }}
            </p>
          </div>

          <button @click.stop="$emit('dismiss', toast.id)" :aria-label="$t('common.notifications.close')"
            class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mt-0.5">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import type { InAppNotification } from '../../types/notification.types'
import NotificationBellIcon from '../../icons/NotificationBellIcon.vue'

const defaultAvatar =
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='20' fill='%23e5e7eb'/%3E%3Ccircle cx='20' cy='15' r='7' fill='%239ca3af'/%3E%3Cellipse cx='20' cy='34' rx='12' ry='8' fill='%239ca3af'/%3E%3C/svg%3E`

const props = defineProps<{
  toasts: InAppNotification[]
}>()

const emit = defineEmits<{
  dismiss: [id: string]
  click: [id: string]
}>()

const timers = new Map<string, ReturnType<typeof setTimeout>>()

watch(
  () => props.toasts,
  (current) => {
    for (const toast of current) {
      if (!timers.has(toast.id)) {
        const timer = setTimeout(() => {
          emit('dismiss', toast.id)
          timers.delete(toast.id)
        }, 60 * 1000)
        timers.set(toast.id, timer)
      }
    }
    const currentIds = new Set(current.map((t) => t.id))
    for (const [id, timer] of timers.entries()) {
      if (!currentIds.has(id)) {
        clearTimeout(timer)
        timers.delete(id)
      }
    }
  },
  { deep: true, immediate: true },
)

onUnmounted(() => {
  for (const timer of timers.values()) clearTimeout(timer)
  timers.clear()
})
</script>

<style scoped>
.toast-slide-enter-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.toast-slide-leave-active {
  transition: transform 0.2s ease-in, opacity 0.2s ease-in;
  position: absolute;
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
