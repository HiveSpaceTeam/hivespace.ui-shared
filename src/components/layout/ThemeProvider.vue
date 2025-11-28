<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { provide, computed } from 'vue'
import type { ComputedRef } from 'vue'
import { THEME_TEXT } from '@/types'
import { setCookie } from '@/utils/cookie'
import { applyThemeToDOM } from '@/utils/theme'
import { themeText } from '@/state/theme.state'

interface ThemeContext {
  isDarkMode: ComputedRef<boolean>
  toggleTheme: () => Promise<void>
}

// Define events that can be emitted
const emit = defineEmits<{
  themeChanged: [theme: string]
  themeToggled: [isDark: boolean]
}>()

const isDarkMode = computed(() => themeText.value === THEME_TEXT.DARK)

const toggleTheme = async () => {
  const currentTheme = themeText.value
  const newTheme = currentTheme === THEME_TEXT.LIGHT ? THEME_TEXT.DARK : THEME_TEXT.LIGHT

  // Persist locally (cookie) and update app-level ref
  setCookie('theme', newTheme, 365) // Store for 1 year
  themeText.value = newTheme
  applyThemeToDOM(newTheme)

  // Emit events after theme change is complete
  emit('themeChanged', newTheme)
  emit('themeToggled', newTheme === THEME_TEXT.DARK)
}

provide('theme', {
  isDarkMode,
  toggleTheme,
} as ThemeContext)
</script>

<script lang="ts">
import { inject } from 'vue'

interface ThemeContext {
  isDarkMode: ReturnType<typeof computed<boolean>>
  toggleTheme: () => Promise<void>
}

export function useTheme(): ThemeContext {
  const theme = inject<ThemeContext>('theme')
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return theme
}
</script>
