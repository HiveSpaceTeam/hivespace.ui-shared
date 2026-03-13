<template>
  <div class="relative" v-click-outside="closePopover">
    <!-- Trigger Input -->
    <label v-if="label" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>
    <div
      :class="['relative', disabled ? 'cursor-not-allowed opacity-70 bg-gray-100/50 dark:bg-gray-800/20 rounded-lg' : 'cursor-pointer']"
      @click="togglePopover">
      <input type="text" readonly :value="displayValue" :placeholder="placeholder" :disabled="disabled"
        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 disabled:cursor-not-allowed" />
      <span class="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
        <Calendar2Line class="fill-current" width="20" height="20" />
      </span>
    </div>

    <!-- Popover Container -->
    <div v-if="isOpen"
      class="absolute z-500 mt-1 flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg rounded-lg overflow-hidden flex-nowrap"
      style="min-width: 320px;">
      <!-- Main Content Area: Calendar + Time -->
      <div class="flex flex-col md:flex-row flex-1">
        <!-- Date Panel -->
        <div class="p-3 w-64 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800">
          <!-- Calendar Header -->
          <div class="flex items-center justify-between mb-4 px-1">
            <div class="flex gap-1">
              <button @click.stop="prevYear" class="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="11 17 6 12 11 7"></polyline>
                  <polyline points="18 17 13 12 18 7"></polyline>
                </svg>
              </button>
              <button @click.stop="prevMonth" class="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            </div>
            <div class="font-medium text-sm text-gray-800 dark:text-gray-200 cursor-pointer hover:text-brand-500">
              {{ currentMonthName }} {{ currentYear }}
            </div>
            <div class="flex gap-1">
              <button @click.stop="nextMonth" class="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
              <button @click.stop="nextYear" class="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="13 17 18 12 13 7"></polyline>
                  <polyline points="6 17 11 12 6 7"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <!-- Days Header -->
          <div class="grid grid-cols-7 mb-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400">
            <div v-for="day in weekDays" :key="day">{{ day }}</div>
          </div>

          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-y-1">
            <div v-for="(day, idx) in calendarDays" :key="idx" @click.stop="selectDate(day)"
              class="flex items-center justify-center p-1 cursor-pointer">
              <span class="w-7 h-7 flex items-center justify-center text-sm rounded transition-colors" :class="[
                !day.isCurrentMonth ? 'text-gray-300 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300',
                isSelectedDate(day) ? 'bg-brand-500 text-white hover:bg-brand-600 font-medium' : 'hover:bg-gray-100 dark:hover:bg-gray-800',
                isToday(day) && !isSelectedDate(day) ? 'text-brand-500 font-bold' : ''
              ]">
                {{ day.date.getDate() }}
              </span>
            </div>
          </div>
        </div>

        <!-- Time Panel -->
        <div
          class="flex flex-col w-32 bg-gray-50/50 dark:bg-gray-900/50 p-2 border-l border-gray-100 dark:border-gray-800 overflow-hidden">
          <!-- Interactive Time Header (Matches AntD style exactly) -->
          <div
            class="flex items-center justify-center gap-1 mb-2 px-2 py-1 pb-3 text-sm font-medium border-b border-gray-100 dark:border-gray-800">
            <span class="text-brand-500">{{ formatTwoDigits(tempHour) }}</span>
            <span class="text-gray-400">:</span>
            <span class="text-brand-500">{{ formatTwoDigits(tempMinute) }}</span>
          </div>

          <div
            class="flex-1 flex flex-col justify-center overflow-hidden border-t border-gray-100 dark:border-gray-800">
            <div class="flex h-[256px] w-full overflow-hidden relative">

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

const props = defineProps<{
  modelValue: string | Date | null
  placeholder?: string
  label?: string
  format?: 'datetime-local' | 'iso' // Output format back to parent
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

// State
const isOpen = ref(false)

// Working date represents the current calendar view month/year
const currentMonthYear = ref(new Date())

// Temporary selection state (before clicking confirm)
const tempSelectedDate = ref<Date | null>(null)
const tempHour = ref(0)
const tempMinute = ref(0)

// Refs for scroll elements to center active times
const hourScrollContainer = ref<HTMLElement | null>(null)
const minuteScrollContainer = ref<HTMLElement | null>(null)

// Initialize state from modelValue
const initializeState = () => {
  if (props.modelValue) {
    const d = new Date(props.modelValue)
    if (!isNaN(d.getTime())) {
      currentMonthYear.value = new Date(d)
      tempSelectedDate.value = new Date(d)
      tempHour.value = d.getHours()
      tempMinute.value = d.getMinutes()
      return
    }
  }

  // Defaults if null
  const now = new Date()
  currentMonthYear.value = new Date(now)
  tempSelectedDate.value = null // Don't pre-select a calendar day unless one is passed in
  tempHour.value = 0
  tempMinute.value = 0
}

// Watch modelValue changes from parent
watch(() => props.modelValue, (newVal, oldVal) => {
  if (newVal !== oldVal && !isOpen.value) {
    initializeState()
  }
}, { immediate: true })

// Month/Year Formatting
const currentMonthName = computed(() => {
  return currentMonthYear.value.toLocaleString('default', { month: 'short' })
})
const currentYear = computed(() => {
  return currentMonthYear.value.getFullYear()
})

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Calculate days to display in the 7x6 calendar grid
interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
}

const calendarDays = computed<CalendarDay[]>(() => {
  const days: CalendarDay[] = []
  const year = currentMonthYear.value.getFullYear()
  const month = currentMonthYear.value.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  // Calculate days from previous month to pad the first row
  const firstDayOfWeek = firstDayOfMonth.getDay() // 0 (Sun) to 6 (Sat)
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month, -i),
      isCurrentMonth: false
    })
  }

  // Add days of current month
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true
    })
  }

  // Calculate days from next month to pad the end up to 42 cells (6 rows)
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false
    })
  }

  return days
})

// Navigation Actions
const prevMonth = () => {
  const d = new Date(currentMonthYear.value)
  d.setMonth(d.getMonth() - 1)
  currentMonthYear.value = d
}

const nextMonth = () => {
  const d = new Date(currentMonthYear.value)
  d.setMonth(d.getMonth() + 1)
  currentMonthYear.value = d
}

const prevYear = () => {
  const d = new Date(currentMonthYear.value)
  d.setFullYear(d.getFullYear() - 1)
  currentMonthYear.value = d
}

const nextYear = () => {
  const d = new Date(currentMonthYear.value)
  d.setFullYear(d.getFullYear() + 1)
  currentMonthYear.value = d
}

// Selection Actions
const selectDate = (day: CalendarDay) => {
  tempSelectedDate.value = day.date
  // If clicking a day outside current month, auto-navigate there
  if (!day.isCurrentMonth) {
    currentMonthYear.value = new Date(day.date.getFullYear(), day.date.getMonth(), 1)
  }
}

const selectHour = (h: number) => {
  tempHour.value = h
  scrollToCenter(hourScrollContainer.value, h)
}

const selectMinute = (m: number) => {
  tempMinute.value = m
  scrollToCenter(minuteScrollContainer.value, m)
}

// Helpers
const isSelectedDate = (day: CalendarDay) => {
  if (!tempSelectedDate.value) return false
  return day.date.getFullYear() === tempSelectedDate.value.getFullYear() &&
    day.date.getMonth() === tempSelectedDate.value.getMonth() &&
    day.date.getDate() === tempSelectedDate.value.getDate()
}

const isToday = (day: CalendarDay) => {
  const today = new Date()
  return day.date.getFullYear() === today.getFullYear() &&
    day.date.getMonth() === today.getMonth() &&
    day.date.getDate() === today.getDate()
}

const formatTwoDigits = (num: number) => {
  return num.toString().padStart(2, '0')
}

// Popover State
const togglePopover = () => {
  if (props.disabled) return
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
  if (!tempSelectedDate.value) {
    // If user clicks confirm without ever selecting a date, default to current local date
    tempSelectedDate.value = new Date()
  }

  const finalDate = new Date(
    tempSelectedDate.value.getFullYear(),
    tempSelectedDate.value.getMonth(),
    tempSelectedDate.value.getDate(),
    tempHour.value,
    tempMinute.value
  )

  // Format based on prop config, default to ISO or local datetime format standard
  let formattedString: string

  if (props.format === 'datetime-local') {
    // Used natively with standard HTML date limits (YYYY-MM-DDThh:mm)
    const yyyy = finalDate.getFullYear()
    const MM = formatTwoDigits(finalDate.getMonth() + 1)
    const dd = formatTwoDigits(finalDate.getDate())
    const hh = formatTwoDigits(finalDate.getHours())
    const mm = formatTwoDigits(finalDate.getMinutes())
    formattedString = `${yyyy}-${MM}-${dd}T${hh}:${mm}`
  } else {
    // Default to strict ISO representation
    formattedString = finalDate.toISOString()
  }

  emit('update:modelValue', formattedString)
  closePopover()
}

const displayValue = computed(() => {
  if (!props.modelValue) return ''
  const d = new Date(props.modelValue)
  if (isNaN(d.getTime())) return ''

  // Format identically to screenshot preview e.g. "2026-02-25 15:30"
  const yyyy = d.getFullYear()
  const MM = formatTwoDigits(d.getMonth() + 1)
  const dd = formatTwoDigits(d.getDate())
  const hh = formatTwoDigits(d.getHours())
  const mm = formatTwoDigits(d.getMinutes())

  return `${yyyy}-${MM}-${dd} ${hh}:${mm}`
})

// Optional directive registration within the component for isolated re-use
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
