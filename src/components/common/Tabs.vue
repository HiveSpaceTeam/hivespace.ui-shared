<template>
  <div class="relative">
    <div
      :class="[
        'inline-flex items-center gap-0.5 p-0.5',
        variant === 'pills' ? 'rounded-lg bg-gray-100 dark:bg-gray-900' : '',
      ]"
    >
      <button
        v-for="option in options"
        :key="option.value"
        @click="$emit('update:modelValue', option.value)"
        :class="[
          variant === 'pills'
            ? modelValue === option.value
              ? 'shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800'
              : 'text-gray-500 dark:text-gray-400'
            : '',
          'px-3 py-2 font-medium rounded-md text-theme-sm hover:text-gray-900 hover:shadow-theme-xs dark:hover:bg-gray-800 dark:hover:text-white',
          variant === 'pills' ? '' : 'rounded-none border-b-2 border-transparent',
        ]"
      >
        {{ option.label }}
      </button>
    </div>
    <div
      v-if="variant === 'default'"
      class="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700"
    />
    <div
      v-if="variant === 'default'"
      class="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
      :style="{
        width: `${100 / options.length}%`,
        transform: `translateX(${options.findIndex((o) => o.value === modelValue) * 100}%`,
      }"
      :class="modelValue ? 'bg-brand-500' : 'transparent'"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue'

withDefaults(
  defineProps<{
    options: { label: string; value: string }[]
    modelValue: string
    variant?: 'default' | 'pills'
  }>(),
  { variant: 'default' },
)

defineEmits(['update:modelValue'])
</script>
