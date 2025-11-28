import { THEME_TEXT } from '@/types'

export const applyThemeToDOM = (themeText: string): void => {
  if (themeText === THEME_TEXT.DARK) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
