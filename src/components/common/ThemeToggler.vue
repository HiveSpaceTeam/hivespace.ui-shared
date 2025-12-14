<template>
  <button
    class="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
    @click.prevent="toggleTheme">
    <ThemeTogglerIcon />
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ThemeTogglerIcon from '@/icons/ThemeTogglerIcon.vue'
import { THEME_TEXT } from '@/types'
import { setCookie, getCookie } from '@/utils/cookie'

const props = defineProps<{
  defaultTheme?: string
}>()

const emit = defineEmits<{
  themeChanged: [theme: string]
}>()

// Create a ref from incoming prop or cookie/default
const initial = props.defaultTheme ?? getCookie('theme') ?? THEME_TEXT.LIGHT
const themeRef = ref<string>(initial)

const currentTheme = computed(() => themeRef.value)

function applyThemeToDOM(themeText: string): void {
  if (themeText === THEME_TEXT.DARK) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

async function toggleTheme(): Promise<void> {
  const newTheme = themeRef.value === THEME_TEXT.LIGHT ? THEME_TEXT.DARK : THEME_TEXT.LIGHT
  setCookie('theme', newTheme, 365)
  themeRef.value = newTheme
  applyThemeToDOM(newTheme)
  emit('themeChanged', newTheme)
}

onMounted(() => {
  // Ensure DOM matches initial value and notify parent
  applyThemeToDOM(currentTheme.value)
})
</script>
