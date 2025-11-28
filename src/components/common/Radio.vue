<template>
  <label
    :for="radioId"
    :class="[
      'flex cursor-pointer select-none items-center text-sm font-medium',
      disabled
        ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
        : 'text-gray-700 dark:text-gray-400',
    ]"
  >
    <div class="relative flex items-center">
      <input
        type="radio"
        :id="radioId"
        :name="name"
        :value="value"
        class="sr-only"
        :checked="modelValue === value"
        :disabled="disabled"
        @click="handleClick"
      />
      <!-- Outer circle (track) -->
      <div
        :class="[
          'mr-3 flex h-5 w-5 items-center justify-center rounded-full border-[1.25px] transition-all duration-200 ease-in-out',
          disabled
            ? 'border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-700'
            : modelValue === value
              ? 'border-brand-500 bg-brand-500' // Checked state: blue border, blue background
              : 'border-gray-300 dark:border-gray-700 bg-transparent hover:border-brand-500 dark:hover:border-brand-500', // Unchecked state: gray border, transparent background, hover effect
        ]"
      >
        <!-- Inner circle (thumb) -->
        <span
          :class="[
            'h-2.5 w-2.5 rounded-full bg-white transition-all duration-200 ease-in-out',
            modelValue === value ? 'opacity-100 scale-100' : 'opacity-0 scale-0', // Visible when checked, hidden when unchecked
          ]"
        ></span>
      </div>
    </div>
    <slot></slot>
    <!-- Slot for the label text -->
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string | number | boolean | null
  value: string | number | boolean
  name: string
  id?: string
  disabled?: boolean
  forceSelection?: boolean // New prop to force selection
}>()

const emit = defineEmits(['update:modelValue'])

const radioId = computed(() => props.id || `radio-${Math.random().toString(36).substring(2, 9)}`)

// Handle click event to allow unchecking a selected radio button
const handleClick = (event: Event) => {
  if (props.disabled) return // Do nothing if disabled

  if (props.modelValue === props.value) {
    if (props.forceSelection) {
      // If forceSelection is true and already checked, do nothing (keep it checked)
      event.preventDefault() // Prevent native radio from attempting to uncheck itself
    } else {
      // If not forcing selection and already checked, uncheck it
      event.preventDefault()
      emit('update:modelValue', null)
    }
  } else {
    // If not checked, let the native behavior check it
    emit('update:modelValue', props.value)
  }
}
</script>
