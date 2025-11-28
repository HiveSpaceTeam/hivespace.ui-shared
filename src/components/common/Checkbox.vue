<template>
  <label
    :for="idComputed"
    :class="[
      'flex items-center text-sm font-medium select-none',
      disabled
        ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50' // All disabled styles, including opacity
        : 'text-gray-700 dark:text-gray-400 cursor-pointer', // All enabled styles
    ]"
  >
    <div class="relative">
      <input
        :id="idComputed"
        type="checkbox"
        class="sr-only"
        :disabled="disabled"
        :checked="modelValue"
        @change="onChange"
      />
      <div
        :class="[
          boxBaseClass,
          disabled
            ? 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-800'
            : modelValue
              ? 'border-brand-500 bg-brand-500'
              : 'bg-transparent border-gray-300 dark:border-gray-700 hover:border-brand-500 dark:hover:border-brand-500',
        ]"
      >
        <span :class="modelValue ? '' : 'opacity-0'">
          <!-- text-white is sufficient; parent opacity will handle the disabled state -->
          <CheckIcon v-if="modelValue" class="text-white" />
        </span>
      </div>
    </div>
    <span class="ml-2">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CheckIcon from '@/icons/CheckIcon.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  id: { type: String, default: '' },
})

const emits = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'change', v: boolean): void
}>()

const idComputed = computed(() => props.id || `checkbox-${Math.random().toString(36).slice(2, 9)}`)
const boxBaseClass = 'mr-3 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px]'

function onChange(e: Event) {
  if (props.disabled) return
  const target = e.target as HTMLInputElement
  const checked = !!target.checked
  emits('update:modelValue', checked)
  emits('change', checked)
}
</script>
