<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-medium gap-2 rounded-lg transition-all duration-200',
      sizeClasses[size],
      variantClasses[variant],
      className,
      {
        'cursor-not-allowed opacity-50': disabled || loading,
        'pointer-events-none': loading,
      },
    ]"
    @click="onClick"
    :disabled="disabled || loading"
    :type="type"
  >
    <!-- Loading Spinner -->
    <LoadingSpinnerIcon v-if="loading" class="-ml-1 mr-2" />

    <span v-if="startIcon && !loading" class="flex items-center">
      <component :is="startIcon" />
    </span>

    <slot></slot>

    <span v-if="endIcon && !loading" class="flex items-center">
      <component :is="endIcon" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { LoadingSpinnerIcon } from '../../icons'

interface ButtonProps {
  size?: 'sm' | 'md'
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'outline'
  startIcon?: object
  endIcon?: object
  onClick?: () => void
  className?: string
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'md',
  variant: 'primary',
  className: '',
  disabled: false,
  loading: false,
  type: 'button',
})

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-sm',
}

const variantClasses = {
  primary:
    'bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:outline-none disabled:bg-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:disabled:bg-blue-800',
  secondary:
    'bg-gray-600 text-white shadow-sm hover:bg-gray-700 focus:outline-none disabled:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 dark:disabled:bg-gray-700',
  danger:
    'bg-red-600 text-white shadow-sm hover:bg-red-700 focus:outline-none disabled:bg-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:disabled:bg-red-800',
  warning:
    'bg-yellow-600 text-white shadow-sm hover:bg-yellow-700 focus:outline-none disabled:bg-yellow-300 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:disabled:bg-yellow-800',
  success:
    'bg-green-600 text-white shadow-sm hover:bg-green-700 focus:outline-none disabled:bg-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:disabled:bg-green-800',
  outline:
    'bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none disabled:text-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:disabled:text-gray-500',
}

const onClick = () => {
  if (!props.disabled && !props.loading && props.onClick) {
    props.onClick()
  }
}
</script>
