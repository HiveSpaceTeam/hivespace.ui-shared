<template>
  <div>
    <label v-if="label" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">{{
      label
    }}</label>
    <div class="relative">
      <flat-pickr
        v-model="innerValue"
        :config="mergedConfig"
        :placeholder="placeholder"
        class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
      />
      <span
        class="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400"
      >
        <Calendar2Line class="fill-current" width="20" height="20" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import Calendar2Line from '@/icons/Calendar2Line.vue'

type Model = string | number | Date | null

const props = defineProps<{
  modelValue: Model
  placeholder?: string
  label?: string
  // Pass extra flatpickr options to override defaults
  config?: Record<string, unknown>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Model): void
}>()

const defaultConfig = {
  dateFormat: 'Y-m-d',
  altInput: true,
  altFormat: 'F j, Y',
  wrap: true,
}

const mergedConfig = computed(() => ({
  ...defaultConfig,
  ...(props.config ?? {}),
}))

const placeholder = computed(() => props.placeholder ?? 'Select date')

const innerValue = computed<Model>({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>
