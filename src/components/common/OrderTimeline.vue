<script setup lang="ts">
import type { TimelineStep } from './OrderTimeline.types'

defineProps<{ steps: TimelineStep[] }>()

const formatTs = (ts: string) =>
  new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(ts))
</script>

<template>
  <div class="flex items-start w-full overflow-x-auto pb-2">
    <template v-for="(step, index) in steps" :key="step.key">
      <div class="flex flex-col items-center flex-1 min-w-0">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm font-bold flex-shrink-0 transition-colors"
          :class="{
            'bg-green-500 border-green-500 text-white': step.isCompleted && !step.isCurrent,
            'bg-orange-500 border-orange-500 text-white': step.isCurrent,
            'bg-white border-gray-300 text-gray-400 dark:bg-gray-800 dark:border-gray-600': !step.isCompleted && !step.isCurrent,
          }"
        >
          <svg v-if="step.isCompleted && !step.isCurrent" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
          <span v-else-if="step.isCurrent" class="w-3 h-3 rounded-full bg-white inline-block" />
          <span v-else class="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 inline-block" />
        </div>
        <span
          class="text-xs text-center mt-2 px-1 leading-tight font-medium"
          :class="{
            'text-gray-800 dark:text-gray-100': step.isCompleted || step.isCurrent,
            'text-gray-400 dark:text-gray-500': !step.isCompleted && !step.isCurrent,
          }"
        >{{ step.label }}</span>
        <span v-if="step.timestamp" class="text-xs text-gray-400 mt-0.5 text-center px-1 whitespace-nowrap">
          {{ formatTs(step.timestamp) }}
        </span>
      </div>
      <div
        v-if="index < steps.length - 1"
        class="h-0.5 flex-shrink-0 mt-5 w-8 transition-colors"
        :class="step.isCompleted ? 'bg-green-400' : 'bg-gray-200 dark:bg-gray-700'"
      />
    </template>
  </div>
</template>
