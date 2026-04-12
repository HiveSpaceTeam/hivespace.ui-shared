<template>
  <div :class="[sizeClass, 'inline-block animate-spin rounded-full border-b-2 border-brand-500']"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg'
}>(), { size: 'md' })

const sizeClass = computed(() => ({
  sm: 'h-5 w-5',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
}[props.size]))
</script>
