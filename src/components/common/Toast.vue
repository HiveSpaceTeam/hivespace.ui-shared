<template>
  <Transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transform ease-in duration-200 transition"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-full opacity-0"
  >
    <div
      v-if="visible"
      :class="[
        'relative max-w-sm w-full shadow-lg rounded-xl border p-4 pointer-events-auto',
        variantClasses[variant].container,
      ]"
    >
      <div class="flex items-start gap-3">
        <div :class="['-mt-0.5 flex-shrink-0', variantClasses[variant].icon]">
          <component :is="icons[variant]" />
        </div>

        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-semibold text-gray-800 dark:text-white/90 truncate">
            {{ title }}
          </h4>

          <p v-if="message" class="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {{ message }}
          </p>

          <router-link
            v-if="showLink"
            :to="linkHref"
            class="inline-block mt-2 text-sm font-medium text-gray-500 underline dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            {{ linkText }}
          </router-link>
        </div>

        <!-- Close button -->
        <button
          @click="handleClose"
          class="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!-- Progress bar for auto-dismiss -->
      <div
        v-if="showProgress && duration > 0"
        class="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1"
      >
        <div
          :class="['h-1 rounded-full transition-all ease-linear', variantClasses[variant].progress]"
          :style="{ width: `${progress}%`, transitionDuration: `${duration}ms` }"
        ></div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { SuccessIcon, ErrorIcon, WarningIcon, SupportIcon } from '@/icons'

interface ToastProps {
  id: string
  variant: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  showLink?: boolean
  linkHref?: string
  linkText?: string
  showProgress?: boolean
}

interface ToastEmits {
  close: [id: string]
}

const props = withDefaults(defineProps<ToastProps>(), {
  duration: 5000,
  showLink: false,
  linkHref: '#',
  linkText: 'Learn more',
  showProgress: true,
})

const emit = defineEmits<ToastEmits>()

const visible = ref(false)
const progress = ref(100)
let progressTimer: ReturnType<typeof setTimeout> | null = null
let autoCloseTimer: ReturnType<typeof setTimeout> | null = null

const variantClasses = {
  success: {
    container:
      'border-success-500 bg-success-50 dark:border-success-500/30 dark:bg-success-500/15 backdrop-blur-sm',
    icon: 'text-success-500',
    progress: 'bg-success-500',
  },
  error: {
    container:
      'border-error-500 bg-error-50 dark:border-error-500/30 dark:bg-error-500/15 backdrop-blur-sm',
    icon: 'text-error-500',
    progress: 'bg-error-500',
  },
  warning: {
    container:
      'border-warning-500 bg-warning-50 dark:border-warning-500/30 dark:bg-warning-500/15 backdrop-blur-sm',
    icon: 'text-warning-500',
    progress: 'bg-warning-500',
  },
  info: {
    container:
      'border-blue-light-500 bg-blue-light-50 dark:border-blue-light-500/30 dark:bg-blue-light-500/15 backdrop-blur-sm',
    icon: 'text-blue-light-500',
    progress: 'bg-blue-light-500',
  },
}

const icons = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: SupportIcon,
}

const handleClose = () => {
  visible.value = false
  setTimeout(() => {
    emit('close', props.id)
  }, 200) // Wait for exit animation
}

const startAutoClose = () => {
  if (props.duration <= 0) return

  // Auto close timer
  autoCloseTimer = setTimeout(() => {
    handleClose()
  }, props.duration)

  // Progress bar animation
  if (props.showProgress) {
    progress.value = 100
    progressTimer = setTimeout(() => {
      progress.value = 0
    }, 50) // Small delay to trigger transition
  }
}

const stopAutoClose = () => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
    autoCloseTimer = null
  }
  if (progressTimer) {
    clearTimeout(progressTimer)
    progressTimer = null
  }
  if (props.showProgress) {
    progress.value = 100
  }
}

onMounted(() => {
  visible.value = true
  startAutoClose()
})

onUnmounted(() => {
  stopAutoClose()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
