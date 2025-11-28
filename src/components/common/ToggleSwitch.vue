<template>
  <label
    :for="toggleId"
    class="flex cursor-pointer select-none items-center text-sm font-medium text-gray-700 dark:text-gray-400 gap-4"
  >
    <div class="relative">
      <input
        type="checkbox"
        :id="toggleId"
        class="sr-only"
        :checked="modelValue"
        @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <!-- Track -->
      <div
        :class="[
          'block h-6 w-11 rounded-full border-2 transition-colors ease-in-out duration-200',
          modelValue
            ? 'bg-brand-500 dark:bg-brand-500 border-brand-500'
            : 'bg-gray-200 dark:bg-gray-600 border-gray-200 dark:border-gray-600',
        ]"
      ></div>
      <!-- Thumb -->
      <div
        :class="[
          modelValue ? 'translate-x-[20px]' : '',
          'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-theme-sm duration-300 ease-linear',
        ]"
      ></div>
    </div>
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  id?: string // Optional id prop
}>()

const emit = defineEmits(['update:modelValue'])

// Generate a unique ID if not provided, for accessibility
const toggleId = computed(() => props.id || `toggle-${Math.random().toString(36).substring(2, 9)}`)
</script>
