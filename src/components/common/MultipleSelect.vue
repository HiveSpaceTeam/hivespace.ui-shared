<template>
  <div class="relative" ref="multiSelectRef" :style="{ '--menu-width': menuWidthPx + 'px' }">
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
      class="dark:bg-dark-900 h-11 flex items-center w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
      :class="{ 'text-gray-800 dark:text-white/90': isOpen }"
    >
      <span v-if="selectedItems.length === 0" class="text-gray-400"> {{ placeholderText }} </span>
      <div class="flex items-center flex-auto gap-2 flex-nowrap overflow-hidden">
        <div
          v-for="item in visibleItems"
          :key="item.value"
          class="group flex items-center justify-center h-[30px] rounded-full border-[0.7px] border-transparent bg-gray-100 py-1 pl-2.5 pr-2 text-sm text-gray-800 hover:border-gray-200 dark:bg-gray-800 dark:text-white/90 dark:hover:border-gray-800"
        >
          <span>{{ item.label }}</span>
          <button
            @click.stop="removeItem(item)"
            class="pl-2 text-gray-500 cursor-pointer group-hover:text-gray-400 dark:text-gray-400"
            aria-label="Remove item"
          >
            <CloseSmallIcon />
          </button>
        </div>
        <div
          v-if="hiddenCount > 0"
          class="flex items-center justify-center h-[30px] w-[30px] rounded-full bg-brand-500 text-white text-sm font-medium"
        >
          +{{ hiddenCount }}
        </div>
      </div>
      <ChevronDownIcon
        ref="chevronRef"
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
        class="absolute z-40 right-0 mt-2 p-2 space-y-1 bg-white border border-gray-200 top-full rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-dark w-[var(--menu-width)]"
      >
        <ul
          class="overflow-y-auto custom-scrollbar max-h-60"
          role="listbox"
          aria-multiselectable="true"
        >
          <li
            v-for="item in props.options"
            :key="item.value"
            role="option"
            :aria-selected="isSelected(item)"
          >
            <button
              type="button"
              @click="toggleItem(item)"
              :class="[
                'flex w-full px-3 py-2 font-medium text-left text-gray-500 rounded-lg text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300',
                isSelected(item) ? 'bg-gray-50 dark:bg-white/[0.03]' : '',
              ]"
            >
              <span class="grow">{{ item.label }}</span>
              <CheckLargeIcon v-if="isSelected(item)" />
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
  <!-- measurement container (hidden) used to measure chip widths -->
  <div ref="measureRef" class="pointer-events-none opacity-0 absolute left-[-9999px] top-[-9999px]">
    <div
      v-for="item in selectedItems"
      :key="item.value"
      class="inline-flex items-center h-[30px] rounded-full py-1 pl-2.5 pr-2 text-sm"
    >
      <span>{{ item.label }}</span>
    </div>
    <div
      ref="plusRef"
      class="inline-flex items-center h-[30px] w-[30px] rounded-full bg-brand-500 text-white text-sm font-medium justify-center"
    >
      +99
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch, computed } from 'vue'

import CloseSmallIcon from '@/icons/CloseSmallIcon.vue'
import ChevronDownIcon from '@/icons/ChevronDownIcon.vue'
import CheckLargeIcon from '@/icons/CheckLargeIcon.vue'

interface Option {
  value: string | number
  label: string
}

const props = withDefaults(
  defineProps<{
    options: Option[]
    modelValue?: Option[]
    label?: string // Added label prop
    placeholder?: string // Added placeholder prop
  }>(),
  {
    modelValue: () => [],
    label: '', // Default empty string for label
    placeholder: 'Select items...', // Default placeholder text
  },
)

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectedItems = ref<Option[]>(props.modelValue || [])
const multiSelectRef = ref<HTMLElement | null>(null)
const measureRef = ref<HTMLElement | null>(null)
const plusRef = ref<HTMLElement | null>(null)
const chevronRef = ref<HTMLElement | null>(null)

const visibleCount = ref<number>(selectedItems.value.length)

// deterministic fallback: show up to this many chips, then +N
const MAX_VISIBLE = 4

// Placeholder text computed property
const placeholderText = computed(() => props.placeholder)

// mirror BaseSelect width behaviour: measure trigger and set CSS var for menu width
const menuWidthPx = ref(0)

function updateMenuWidth() {
  if (!multiSelectRef.value) return
  const w = Math.round(multiSelectRef.value.getBoundingClientRect().width)
  // set menu width to exact trigger width so dropdown lines up with the input
  menuWidthPx.value = w || 0
  updateVisibleCount()
}

let ro: ResizeObserver | null = null

function handleClickOutside(event: Event) {
  if (multiSelectRef.value && !multiSelectRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(async () => {
  await nextTick()
  updateMenuWidth()
  if (multiSelectRef.value && typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(() => updateMenuWidth())
    ro.observe(multiSelectRef.value)
  }
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  if (ro && multiSelectRef.value) ro.unobserve(multiSelectRef.value)
  document.removeEventListener('click', handleClickOutside)
})

// keep internal selectedItems in sync if parent changes modelValue
watch(
  () => props.modelValue,
  (v) => {
    selectedItems.value = v || []
    // recalc visible when items change
    nextTick(() => updateVisibleCount())
  },
)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const toggleItem = (item: Option) => {
  const index = selectedItems.value.findIndex((selected) => selected.value === item.value)
  if (index === -1) selectedItems.value.push(item)
  else selectedItems.value.splice(index, 1)
  emit('update:modelValue', selectedItems.value)
  nextTick(() => updateVisibleCount())
}

const removeItem = (item: Option) => {
  const index = selectedItems.value.findIndex((selected) => selected.value === item.value)
  if (index !== -1) {
    selectedItems.value.splice(index, 1)
    emit('update:modelValue', selectedItems.value)
    nextTick(() => updateVisibleCount())
  }
}

const isSelected = (item: Option) => {
  return selectedItems.value.some((selected) => selected.value === item.value)
}

function updateVisibleCount() {
  // Simple deterministic behavior to match design: show at most MAX_VISIBLE chips
  if (selectedItems.value.length <= MAX_VISIBLE) {
    visibleCount.value = selectedItems.value.length
  } else {
    visibleCount.value = MAX_VISIBLE
  }
}

const visibleItems = computed(() => selectedItems.value.slice(0, visibleCount.value))
const hiddenCount = computed(() => Math.max(0, selectedItems.value.length - visibleCount.value))
</script>
