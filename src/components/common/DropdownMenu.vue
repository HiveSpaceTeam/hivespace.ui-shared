<template>
  <div class="relative" v-click-outside="closeDropdown" ref="dropdown">
    <!-- Dropdown Trigger Button -->
    <button @click="toggleDropdown" :class="buttonClass">
      <slot name="icon" :open="open">
        <!-- Default icon -->
        <MenuDotsIcon />
      </slot>
    </button>
    <!-- Dropdown Menu -->
    <div v-if="open" :class="menuClass">
      <slot name="menu">
        <!-- Default menu items -->
        <template v-for="(item, index) in menuItems">
          <Link v-if="item.to" :key="`link-${index}`" :to="item.to" @click="handleLinkClick(item.to, item.onClick)"
            :class="itemClass">
            {{ item.label }}
          </Link>

          <button v-else :key="`button-${index}`" @click="handleMenuItemClick(item.onClick)" :class="itemClass">
            {{ item.label }}
          </button>
        </template>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type VNode } from 'vue'
import vClickOutside from './v-click-outside.vue'
import MenuDotsIcon from '../../icons/MenuDotsIcon.vue'
import Link from './Link.vue'
import type { DropdownMenuProps } from './DropdownMenu.types'

const emit = defineEmits<{
  navigate: [path: string]
}>()

defineSlots<{
  icon?: (props: { open: boolean }) => VNode[]
  menu?: () => VNode[]
  default?: () => VNode[]
}>()

withDefaults(defineProps<DropdownMenuProps>(), {
  menuItems: () => [],
  buttonClass: 'text-gray-500 dark:text-gray-400',
  menuClass:
    'absolute right-0 z-50 w-40 p-2 space-y-1 bg-white border border-gray-200 top-full rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-dark',
  itemClass:
    'flex w-full px-3 py-2 font-medium text-left text-gray-500 rounded-lg text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300',
})

const open = ref(false)

const toggleDropdown = () => {
  open.value = !open.value
}

const closeDropdown = () => {
  open.value = false
}

const handleMenuItemClick = (callback?: () => void) => {
  if (typeof callback === 'function') {
    callback() // Execute the provided callback function
  }
  closeDropdown() // Close the dropdown after the item is clicked
}

const handleLinkClick = (path: string, callback?: () => void) => {
  emit('navigate', path)
  handleMenuItemClick(callback)
}
</script>

<script lang="ts">
export default {
  directives: {
    clickOutside: vClickOutside,
  },
}
</script>
