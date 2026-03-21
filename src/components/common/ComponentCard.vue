<template>
  <div
    :class="[
      'rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]',
      fullHeight ? 'flex flex-col flex-1 min-h-0' : '',
      className,
    ]"
  >
    <!-- Card Header -->
    <div class="px-6 py-5 shrink-0">
      <h3 class="text-base font-medium text-gray-800 dark:text-white/90">
        {{ title }}
      </h3>
      <p v-if="desc" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {{ desc }}
      </p>
    </div>

    <!-- Card Body -->
    <div
      :class="[
        'border-t border-gray-100 dark:border-gray-800',
        fullHeight
          ? 'flex-1 min-h-0 flex flex-col p-4 sm:p-6'
          : 'p-4 sm:p-6',
      ]"
    >
      <div :class="fullHeight ? 'flex-1 min-h-0 flex flex-col gap-5' : 'space-y-5'">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  title: string
  className?: string
  desc?: string
  fullHeight?: boolean
}

defineProps<Props>()
</script>
