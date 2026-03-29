<template>
  <div :class="[direction === 'vertical' ? 'flex-col' : 'flex-row items-center', 'flex', gapClass]">
    <Radio v-for="option in options" :key="String(option.value)" :value="option.value" :name="groupName"
      :modelValue="modelValue" :disabled="option.disabled" @update:modelValue="$emit('update:modelValue', $event)"
      :class="optionClass">
      <slot name="option" :option="option">
        {{ option.label }}
      </slot>
    </Radio>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Radio from './Radio.vue'

const props = withDefaults(defineProps<{
  modelValue: string | number | boolean | null
  options: { label: string; value: string | number | boolean; disabled?: boolean; [key: string]: any }[]
  name?: string
  direction?: 'vertical' | 'horizontal'
  gapClass?: string
  optionClass?: any
}>(), {
  gapClass: 'gap-3',
  direction: 'horizontal'
})

defineEmits(['update:modelValue'])

const groupName = computed(
  () => props.name || `radio-group-${Math.random().toString(36).substring(2, 9)}`,
)
</script>
