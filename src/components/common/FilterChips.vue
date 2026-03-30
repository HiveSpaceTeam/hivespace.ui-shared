<template>
  <div class="inline-flex items-center gap-2 flex-wrap">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      @click="$emit('update:modelValue', option.value)"
      :class="[
        'px-4 py-1.5 text-sm font-medium rounded-full border transition-colors whitespace-nowrap',
        modelValue === option.value
          ? 'border-brand-500 text-brand-500 bg-brand-50 dark:border-brand-400 dark:text-brand-400 dark:bg-brand-500/10'
          : 'border-gray-300 text-gray-600 bg-white hover:border-gray-400 dark:border-gray-700 dark:text-gray-400 dark:bg-transparent dark:hover:border-gray-500',
      ]"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  options: { label: string; value: string }[]
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
