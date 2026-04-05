<template>
  <div :class="['relative rounded-full flex-shrink-0', sizeClasses[size]]">
    <img v-if="src" :src="src" :alt="alt" class="object-cover rounded-full w-full h-full" />
    <div
      v-else
      class="flex items-center justify-center rounded-full w-full h-full bg-gray-100 dark:bg-gray-800"
    >
      <UserCircleIcon :class="iconSizeClasses[size]" class="text-gray-400 dark:text-gray-500" />
    </div>
    <span
      v-if="status !== 'none'"
      :class="[
        'absolute bottom-0 right-0 rounded-full border-[1.5px] border-white dark:border-gray-900',
        statusSizeClasses[size],
        statusColorClasses[status] || '',
      ]"
    ></span>
  </div>
</template>

<script setup lang="ts">
import UserCircleIcon from '../../icons/UserCircleIcon.vue'

interface AvatarProps {
  src?: string
  alt?: string
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
  status?: 'online' | 'offline' | 'busy' | 'none'
}

withDefaults(defineProps<AvatarProps>(), {
  alt: 'User Avatar',
  size: 'medium',
  status: 'none',
})

const iconSizeClasses = {
  xsmall: 'w-3.5 h-3.5',
  small: 'w-5 h-5',
  medium: 'w-6 h-6',
  large: 'w-7 h-7',
  xlarge: 'w-8 h-8',
  xxlarge: 'w-10 h-10',
}

const sizeClasses = {
  xsmall: 'h-6 w-6 max-w-6',
  small: 'h-8 w-8 max-w-8',
  medium: 'h-10 w-10 max-w-10',
  large: 'h-12 w-12 max-w-12',
  xlarge: 'h-14 w-14 max-w-14',
  xxlarge: 'h-16 w-16 max-w-16',
}

const statusSizeClasses = {
  xsmall: 'h-1.5 w-1.5 max-w-1.5',
  small: 'h-2 w-2 max-w-2',
  medium: 'h-2.5 w-2.5 max-w-2.5',
  large: 'h-3 w-3 max-w-3',
  xlarge: 'h-3.5 w-3.5 max-w-3.5',
  xxlarge: 'h-4 w-4 max-w-4',
}

const statusColorClasses = {
  online: 'bg-success-500',
  offline: 'bg-error-400',
  busy: 'bg-warning-500',
}
</script>
