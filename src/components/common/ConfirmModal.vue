<template>
  <div class="w-auto overflow-y-auto">
    <div class="flex justify-center">
      <div
        :class="[
          'relative transform overflow-hidden bg-white dark:bg-gray-800 text-left transition-all w-full',
          sizeClasses[size],
        ]"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? 'confirm-modal-title' : undefined"
        :aria-describedby="message ? 'confirm-modal-desc' : undefined"
        tabindex="-1"
      >
        <!-- Content -->
        <div class="flex flex-col">
          <!-- Content section -->
          <div class="flex mb-4 items-center">
            <div
              v-if="showIcon"
              :class="[
                'flex-shrink-0 flex items-center justify-center rounded-full p-2 mr-3',
                iconClasses[variant].background,
              ]"
            >
              <component
                :is="iconClasses[variant].icon"
                :class="['h-5 w-5', iconClasses[variant].color]"
              />
            </div>

            <div class="flex-1">
              <div v-if="message">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ message }}
                </p>
              </div>

              <!-- Custom slot content -->
              <div v-if="$slots.default">
                <slot />
              </div>
            </div>
          </div>

          <!-- Actions section -->
          <div class="flex flex-row-reverse gap-3">
            <Button
              v-if="confirmText"
              @click="handleConfirm"
              :variant="confirmVariant"
              :loading="loading"
              :disabled="loading"
              class="w-auto"
            >
              {{ confirmText }}
            </Button>

            <Button
              v-if="cancelText"
              @click="handleCancel"
              variant="outline"
              :disabled="loading"
              class="w-auto"
            >
              {{ cancelText }}
            </Button>

            <Button
              v-if="thirdText"
              @click="handleThird"
              :variant="thirdVariant"
              :disabled="loading"
              class="w-auto"
            >
              {{ thirdText }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue'
import { CheckIcon, WarningIcon, InfoIcon, TrashIcon } from '../../icons'

export type ModalVariant = 'confirm' | 'alert' | 'warning' | 'danger' | 'info' | 'success'
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'outline'

interface ModalProps {
  variant?: ModalVariant
  size?: ModalSize
  title?: string // Title is now optional
  message?: string
  showIcon?: boolean
  confirmText?: string
  cancelText?: string
  thirdText?: string
  confirmVariant?: ButtonVariant
  thirdVariant?: ButtonVariant
  loading?: boolean
}

type ConfirmModalResult = { result: 'confirm' | 'cancel' | 'third' | null }
const emit = defineEmits<{
  (e: 'close', payload?: ConfirmModalResult): void
}>()

const props = withDefaults(defineProps<ModalProps>(), {
  variant: 'confirm',
  size: 'md',
  showIcon: true,
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  confirmVariant: 'primary',
  thirdVariant: 'secondary',
  loading: false,
})

// Icon configuration for each variant
const iconClasses = {
  confirm: {
    icon: CheckIcon,
    background: 'bg-green-100 dark:bg-green-900/30',
    color: 'text-green-600 dark:text-green-400',
  },
  alert: {
    icon: InfoIcon,
    background: 'bg-blue-100 dark:bg-blue-900/30',
    color: 'text-blue-600 dark:text-blue-400',
  },
  warning: {
    icon: WarningIcon,
    background: 'bg-yellow-100 dark:bg-yellow-900/30',
    color: 'text-yellow-600 dark:text-yellow-400',
  },
  danger: {
    icon: TrashIcon,
    background: 'bg-red-100 dark:bg-red-900/30',
    color: 'text-red-600 dark:text-red-400',
  },
  info: {
    icon: InfoIcon,
    background: 'bg-blue-100 dark:bg-blue-900/30',
    color: 'text-blue-600 dark:text-blue-400',
  },
  success: {
    icon: CheckIcon,
    background: 'bg-green-100 dark:bg-green-900/30',
    color: 'text-green-600 dark:text-green-400',
  },
}

// Size classes
const sizeClasses = {
  sm: 'min-w-[280px]',
  md: 'min-w-[320px]',
  lg: 'min-w-[480px]',
  xl: 'min-w-[640px]',
}

// Event handlers
const handleConfirm = () => {
  if (!props.loading) {
    emit('close', { result: 'confirm' })
  }
}

const handleCancel = () => {
  emit('close', { result: 'cancel' })
}

const handleThird = () => {
  emit('close', { result: 'third' })
}
</script>
