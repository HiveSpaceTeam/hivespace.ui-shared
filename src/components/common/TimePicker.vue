<template>
  <div class="relative" v-click-outside="closePopover">
    <!-- Trigger Input -->
    <label v-if="label" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>
    <div class="relative cursor-pointer" @click="togglePopover">
      <input type="text" readonly :value="displayValue" :placeholder="placeholder"
        class="dark:bg-dark-900 h-11 w-full cursor-pointer rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
      <span class="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
        <Calendar2Line class="fill-current" width="20" height="20" />
      </span>
    </div>

    <!-- Popover Container -->
    <div v-if="isOpen"
      class="absolute z-50 mt-1 flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg rounded-lg overflow-hidden flex-nowrap"
      style="min-width: 140px;">
      <!-- Main Content Area: Time -->
      <div class="flex flex-col flex-1">
        <!-- Time Panel -->
        <div class="flex flex-col w-full bg-gray-50/50 dark:bg-gray-900/50 p-2 overflow-hidden">
          <!-- Interactive Time Header (Matches AntD style exactly) -->
          <div
            class="flex items-center justify-center gap-1 mb-2 px-2 py-1 pb-3 text-sm font-medium border-b border-gray-100 dark:border-gray-800">
            <span class="text-brand-500">{{ formatTwoDigits(tempHour) }}</span>
            <span class="text-gray-400">:</span>
            <span class="text-brand-500">{{ formatTwoDigits(tempMinute) }}</span>
          </div>

          <div
            class="flex-1 flex flex-col justify-center overflow-hidden border-t border-gray-100 dark:border-gray-800">
            <div class="flex w-full overflow-hidden relative" :style="{ height: `${visibleItemsCount * 32}px` }">
              <!-- Hours Scroll Column -->
              <div class="flex-1 overflow-y-auto hidden-scrollbar relative text-center" ref="hourScrollContainer">
                <div>
                  <div v-for="h in 24" :key="`h-${h - 1}`" @click.stop="selectHour(h - 1)"
                    class="h-8 leading-8 text-sm cursor-pointer transition-colors"
                    :class="tempHour === h - 1 ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 font-medium' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'">
                    {{ formatTwoDigits(h - 1) }}
                  </div>
                </div>
              </div>

              <!-- Minutes Scroll Column -->
              <div class="flex-1 overflow-y-auto hidden-scrollbar relative text-center" ref="minuteScrollContainer">
                <div>
                  <div v-for="m in 60" :key="`m-${m - 1}`" @click.stop="selectMinute(m - 1)"
                    class="h-8 leading-8 text-sm cursor-pointer transition-colors"
                    :class="tempMinute === m - 1 ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 font-medium' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'">
                    {{ formatTwoDigits(m - 1) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="border-t border-gray-100 dark:border-gray-800 p-2 flex justify-end">
        <button @click.stop="confirmSelection"
          class="px-4 py-1.5 bg-brand-500 text-white text-sm font-medium rounded hover:bg-brand-600 transition-colors">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import vClickOutside from './v-click-outside.vue'
import Calendar2Line from '../../icons/Calendar2Line.vue'

const props = withDefaults(defineProps<{
  modelValue: string | Date | null
  placeholder?: string
  label?: string
  format?: 'time-local' | 'iso' // Output format back to parent
  visibleItemsCount?: number
}>(), {
  visibleItemsCount: 8
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

// State
const isOpen = ref(false)

// Temporary selection state (before clicking confirm)
const tempHour = ref(0)
const tempMinute = ref(0)

// Refs for scroll elements to center active times
const hourScrollContainer = ref<HTMLElement | null>(null)
const minuteScrollContainer = ref<HTMLElement | null>(null)

// Initialize state from modelValue
const initializeState = () => {
  if (props.modelValue) {
    if (typeof props.modelValue === 'string' && props.modelValue.includes(':') && !props.modelValue.includes('T')) {
      // Basic support for HH:mm strings
      const parts = props.modelValue.split(':')
      tempHour.value = parseInt(parts[0], 10) || 0
      tempMinute.value = parseInt(parts[1], 10) || 0
      return
    }

    const d = new Date(props.modelValue)
    if (!isNaN(d.getTime())) {
      tempHour.value = d.getHours()
      tempMinute.value = d.getMinutes()
      return
    }
  }

  // Defaults if null
  tempHour.value = 0
  tempMinute.value = 0
}

// Watch modelValue changes from parent
watch(() => props.modelValue, (newVal, oldVal) => {
  if (newVal !== oldVal && !isOpen.value) {
    initializeState()
  }
}, { immediate: true })

// Selection Actions
const selectHour = (h: number) => {
  tempHour.value = h
  scrollToCenter(hourScrollContainer.value, h)
}

const selectMinute = (m: number) => {
  tempMinute.value = m
  scrollToCenter(minuteScrollContainer.value, m)
}

// Helpers
const formatTwoDigits = (num: number) => {
  return num.toString().padStart(2, '0')
}

// Popover State
const togglePopover = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    initializeState()
    // Scroll time lists to current selection when popover opens
    nextTick(() => {
      scrollToCenter(hourScrollContainer.value, tempHour.value)
      scrollToCenter(minuteScrollContainer.value, tempMinute.value)
    })
  }
}

const closePopover = () => {
  if (isOpen.value) {
    isOpen.value = false
  }
}

// Programmatic scroll center animation
const scrollToCenter = (container: HTMLElement | null, itemIndex: number) => {
  if (!container) return
  // Item height is 32px (h-8).
  const targetScrollTop = itemIndex * 32

  // Calculate to make the item visible if it's outside viewport
  const currentScroll = container.scrollTop
  const viewHeight = container.clientHeight

  if (targetScrollTop < currentScroll) {
    container.scrollTo({ top: targetScrollTop, behavior: 'instant' })
  } else if (targetScrollTop + 32 > currentScroll + viewHeight) {
    container.scrollTo({ top: targetScrollTop - viewHeight + 32, behavior: 'instant' })
  }
}

// Finalization
const confirmSelection = () => {
  const finalDate = new Date()
  finalDate.setHours(tempHour.value)
  finalDate.setMinutes(tempMinute.value)
  finalDate.setSeconds(0)
  finalDate.setMilliseconds(0)

  // Format based on prop config, default to ISO or local time format standard
  let formattedString: string

  if (props.format === 'time-local' || !props.format) {
    // HH:mm format
    const hh = formatTwoDigits(tempHour.value)
    const mm = formatTwoDigits(tempMinute.value)
    formattedString = `${hh}:${mm}`
  } else {
    // Default to strict ISO representation
    formattedString = finalDate.toISOString()
  }

  emit('update:modelValue', formattedString)
  closePopover()
}

const displayValue = computed(() => {
  if (!props.modelValue) return ''

  if (typeof props.modelValue === 'string' && props.modelValue.includes(':') && !props.modelValue.includes('T')) {
    // Format is already HH:mm
    return props.modelValue
  }

  const d = new Date(props.modelValue)
  if (isNaN(d.getTime())) return ''

  const hh = formatTwoDigits(d.getHours())
  const mm = formatTwoDigits(d.getMinutes())

  return `${hh}:${mm}`
})
</script>

<script lang="ts">
export default {
  directives: {
    clickOutside: vClickOutside,
  },
}
</script>

<style scoped>
/* Scoped style to hide real scrollbars but allow native scroll behavior */
.hidden-scrollbar::-webkit-scrollbar {
  display: none;
}

.hidden-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
