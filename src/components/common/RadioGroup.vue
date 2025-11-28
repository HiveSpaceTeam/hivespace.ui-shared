<template>
  <div :class="[direction === 'vertical' ? 'flex-col' : 'flex-row items-center', 'flex gap-3']">
    <Radio
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :name="groupName"
      :modelValue="modelValue"
      :disabled="option.disabled"
      @update:modelValue="$emit('update:modelValue', $event)"
    >
      {{ option.label }}
    </Radio>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Radio from './Radio.vue'

const props = defineProps<{
  modelValue: string | number | boolean | null
  options: { label: string; value: string | number; disabled?: boolean }[] // Added disabled to option interface
  name?: string
  direction?: 'vertical' | 'horizontal'
}>()

defineEmits(['update:modelValue'])

const groupName = computed(
  () => props.name || `radio-group-${Math.random().toString(36).substring(2, 9)}`,
)
</script>
