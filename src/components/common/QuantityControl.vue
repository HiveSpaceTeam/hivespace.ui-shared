<template>
  <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-sm">
    <button 
      @click="decrement" 
      :disabled="modelValue <= min"
      :class="[
        'flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed',
        size === 'sm' ? 'w-6 h-6' : 'w-7 h-7'
      ]"
    >
      <Minus :class="size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'" />
    </button>
    <input 
      type="text" 
      :value="modelValue" 
      @change="handleInput"
      :class="[
        'text-center border-x border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none',
        size === 'sm' ? 'w-8 h-6 text-xs' : 'w-10 h-7 text-sm'
      ]"
    />
    <button 
      @click="increment" 
      :disabled="max !== undefined && modelValue >= max"
      :class="[
        'flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed',
        size === 'sm' ? 'w-6 h-6' : 'w-7 h-7'
      ]"
    >
      <Plus :class="size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Minus, Plus } from 'lucide-vue-next'

interface Props {
  modelValue: number
  min?: number
  max?: number
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  min: 1,
  max: undefined,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const increment = () => {
  if (props.max === undefined || props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
  }
}

const decrement = () => {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

const handleInput = (event: Event) => {
  const val = parseInt((event.target as HTMLInputElement).value)
  if (!isNaN(val) && val >= props.min && (props.max === undefined || val <= props.max)) {
    emit('update:modelValue', val)
  }
}
</script>
