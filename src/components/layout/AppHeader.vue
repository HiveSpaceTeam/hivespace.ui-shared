<template>
  <header
    :class="[
      'sticky top-0 flex flex-col w-full border-gray-200 z-999 dark:border-gray-800 lg:border-b',
      headerClass || 'bg-white dark:bg-gray-900'
    ]">
    <div :class="['flex flex-col items-center justify-between grow lg:flex-row lg:px-6 w-full', containerClass]">
      <div
        class="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
        <button v-if="showSidebarToggle" @click="emit('toggle-sidebar')"
          :aria-label="sidebarOpen ? 'Close sidebar' : 'Open sidebar'" :aria-expanded="sidebarOpen ? 'true' : 'false'"
          class="flex items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-999 dark:border-gray-800 dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
          :class="[
            sidebarOpen
              ? 'lg:bg-transparent dark:lg:bg-transparent bg-gray-100 dark:bg-gray-800'
              : '',
          ]">
          <X v-if="sidebarOpen" class="w-6 h-6" />
          <Menu v-else class="w-6 h-6" />
        </button>
        <!-- Spacer when toggle button is hidden to maintain layout -->
        <div v-else class="w-10 h-10 lg:w-11 lg:h-11"></div>
        <button @click="toggleApplicationMenu"
          class="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden">
          <MoreVertical class="w-6 h-6" />
        </button>
        <HeaderLogo />
        <button @click="toggleApplicationMenu"
          class="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden">
          <MoreVertical class="w-6 h-6" />
        </button>
      </div>

      <div :class="[isApplicationMenuOpen ? 'flex' : 'hidden']"
        class="items-center justify-between w-full gap-4 px-5 py-4 shadow-theme-md lg:flex lg:justify-end lg:px-0 lg:shadow-none">
        <div class="flex items-center gap-2 2xsm:gap-3">
          <ThemeToggler @theme-changed="(theme: string) => emit('theme-changed', theme)" />
          <LanguageSwitcher @language-changed="(lang: string) => emit('language-changed', lang)" />
          <NotificationMenu />
        </div>
        <UserMenu :user="user" :menu-items="menuItems" :show-sign-out="true" @sign-out="emit('sign-out')" />
      </div>
    </div>
    <slot name="bottom" />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { X, Menu, MoreVertical } from 'lucide-vue-next'
import HeaderLogo from './header/HeaderLogo.vue'
import ThemeToggler from '../common/ThemeToggler.vue'
import LanguageSwitcher from './header/LanguageSwitcher.vue'
import NotificationMenu from './header/NotificationMenu.vue'
import UserMenu from './header/UserMenu.vue'
import type { MenuItem } from '../../types'

interface Props {
  showSidebarToggle?: boolean
  sidebarOpen?: boolean
  user?: any
  menuItems?: MenuItem[]
  headerClass?: string
  containerClass?: string
}

withDefaults(defineProps<Props>(), {
  showSidebarToggle: true,
  sidebarOpen: false,
  menuItems: () => [],
})

const emit = defineEmits<{
  'toggle-sidebar': []
  'theme-changed': [theme: string]
  'language-changed': [lang: string]
  'sign-out': []
}>()

const isApplicationMenuOpen = ref(false)

const toggleApplicationMenu = () => {
  isApplicationMenuOpen.value = !isApplicationMenuOpen.value
}
</script>
