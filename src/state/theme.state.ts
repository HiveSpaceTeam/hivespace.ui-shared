import { ref } from 'vue'
import { THEME_TEXT } from '@/types'

// Shared app-level theme text ref. Main sets this at startup; ThemeProvider uses it.
export const themeText = ref<string>(THEME_TEXT.LIGHT)
