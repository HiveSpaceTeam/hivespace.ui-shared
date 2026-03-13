<template>
  <div class="relative inline-block w-full">
    <div ref="tabsContainer" :class="[
      'inline-flex items-center gap-0.5 p-0.5',
      variant === 'pills' ? 'rounded-lg bg-gray-100 dark:bg-gray-900' : 'w-full',
    ]">
      <button v-for="option in options" :key="option.value" @click="$emit('update:modelValue', option.value)" :class="[
        modelValue === option.value
          ? variant === 'pills'
            ? 'shadow-theme-xs  dark:bg-gray-800 text-gray-900 dark:text-white bg-white'
            : 'text-gray-900 dark:text-white'
          : 'text-gray-500 dark:text-gray-400',
        'px-3 py-2 font-medium rounded-md text-theme-sm hover:text-gray-900 hover:shadow-theme-xs dark:hover:bg-gray-800 dark:hover:text-white whitespace-nowrap',
        variant === 'pills' ? '' : ' border-b-2 border-transparent',
      ]">
        {{ option.label }}
      </button>
    </div>
    <div v-if="variant === 'default'" class="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
    <div v-if="variant === 'default'" class="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
      :style="indicatorStyle" :class="modelValue ? 'bg-brand-500' : 'transparent'"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'

const props = withDefaults(defineProps<{
  options: { label: string; value: string }[]
  modelValue: string
  variant?: 'default' | 'pills'
}>(), {
  variant: 'default'
})

defineEmits(['update:modelValue'])

const tabsContainer = ref<HTMLElement | null>(null)
const indicatorStyle = ref({ width: '0px', transform: 'translateX(0px)' })

const updateIndicator = async () => {
  if (props.variant !== 'default' || !tabsContainer.value) return

  await nextTick()

  const activeIndex = props.options.findIndex(o => o.value === props.modelValue)
  if (activeIndex === -1) {
    indicatorStyle.value = { width: '0px', transform: 'translateX(0px)' }
    return
  }

  const buttons = Array.from(tabsContainer.value.querySelectorAll('button'))
  const activeButton = buttons[activeIndex]

  if (activeButton) {
    indicatorStyle.value = {
      width: `${activeButton.offsetWidth}px`,
      transform: `translateX(${activeButton.offsetLeft}px)`
    }
  }
}

watch(() => props.modelValue, updateIndicator)
watch(() => props.options, updateIndicator, { deep: true })

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  updateIndicator()
  if (typeof window !== 'undefined' && tabsContainer.value) {
    resizeObserver = new ResizeObserver(() => {
      updateIndicator()
    })
    resizeObserver.observe(tabsContainer.value)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>
