<template>
  <div class="relative" ref="rootRef" :style="{ '--menu-width': menuWidthPx + 'px' }">
    <label
      v-if="props.label"
      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
      >{{ props.label }}</label
    >

    <div
      @click="toggleDropdown"
      @keydown.enter.prevent="toggleDropdown"
      @keydown.space.prevent="toggleDropdown"
      role="button"
      tabindex="0"
      :class="[
        'h-11 flex items-center w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800',
        disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer',
      ]"
    >
      <span v-if="!selectedLabel" class="text-gray-400">{{ placeholder }}</span>
      <span v-else class="truncate">{{ selectedLabel }}</span>
      <ChevronDownIcon
        class="ml-auto text-gray-400 transition-transform"
        :class="{ 'rotate-180': isOpen }"
      />
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute z-40 right-0 p-2 space-y-1 bg-white border border-gray-200 top-full rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-dark w-[var(--menu-width)] mt-2"
      >
        <ul :class="`overflow-y-auto custom-scrollbar ${props.maxHeight}`" role="listbox">
          <li
            v-for="(opt, idx) in options"
            :key="opt.value ?? idx"
            role="option"
            :aria-selected="isSelected(opt)"
          >
            <button
              type="button"
              @click="select(opt.value)"
              :class="[
                'flex w-full px-3 py-2 font-medium text-left text-gray-500 rounded-lg text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300',
                isSelected(opt) ? 'bg-gray-50 dark:bg-white/[0.03]' : '',
              ]"
            >
              <span class="grow">{{ opt.label }}</span>
              <CheckLargeIcon v-if="isSelected(opt)" />
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import ChevronDownIcon from '@/icons/ChevronDownIcon.vue'
import CheckLargeIcon from '@/icons/CheckLargeIcon.vue' // New import

interface Option {
  value: string | number
  label: string
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null
    options?: Option[]
    label?: string
    placeholder?: string
    disabled?: boolean
    maxHeight?: string
  }>(),
  {
    options: () => [],
    placeholder: 'Select',
    disabled: false,
    label: '',
    maxHeight: 'max-h-60', // Default to showing ~6-8 options
  },
)

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const rootRef = ref<HTMLElement | null>(null)

// mirror MultipleSelect width behaviour: measure trigger and set CSS var for menu width
const menuWidthPx = ref(0)

function updateMenuWidth() {
  if (!rootRef.value) return
  const w = Math.round(rootRef.value.getBoundingClientRect().width)
  // set menu width to exact trigger width so dropdown lines up with the input
  menuWidthPx.value = w || 0
}

let ro: ResizeObserver | null = null

function handleClickOutside(event: Event) {
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(async () => {
  await nextTick()
  updateMenuWidth()
  if (rootRef.value && typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(() => updateMenuWidth())
    ro.observe(rootRef.value)
  }
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  if (ro && rootRef.value) ro.unobserve(rootRef.value)
  document.removeEventListener('click', handleClickOutside)
})

// Make options reactive to prop changes (important for i18n label updates)
const options = computed(() => props.options ?? [])

const selectedLabel = computed(() => {
  const found = options.value.find((o) => o.value === props.modelValue)
  return found ? found.label : ''
})

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const select = (value: string | number) => {
  emit('update:modelValue', value)
  emit('change', value)
  isOpen.value = false // Close dropdown after selection
}

const isSelected = (item: Option) => {
  return props.modelValue === item.value
}
</script>
