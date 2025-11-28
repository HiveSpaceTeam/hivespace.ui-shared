/**
 * User Settings Types
 * Types for user preferences and settings management
 */

// User settings data structure
export interface UserSettings {
  theme: number // 0 = Light, 1 = Dark
  culture: number // 0 = Vietnamese, 1 = English
}

// API response types (GET returns UserSettings directly)
export type GetUserSettingResponse = UserSettings

// API request types (PUT request body)
export type SetUserSettingRequest = UserSettings

// Theme constants
export const THEME_VALUES = {
  LIGHT: 0,
  DARK: 1,
} as const

// Culture constants
export const CULTURE_VALUES = {
  VIETNAMESE: 0,
  ENGLISH: 1,
} as const

// Culture text constants
export const CULTURE_TEXT = {
  VIETNAMESE: 'vi',
  ENGLISH: 'en',
} as const

// Theme text constants
export const THEME_TEXT = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

// Type helpers
export type ThemeValue = (typeof THEME_VALUES)[keyof typeof THEME_VALUES]
export type CultureValue = (typeof CULTURE_VALUES)[keyof typeof CULTURE_VALUES]
export type CultureText = (typeof CULTURE_TEXT)[keyof typeof CULTURE_TEXT]
export type ThemeText = (typeof THEME_TEXT)[keyof typeof THEME_TEXT]

// Default settings
export const DEFAULT_USER_SETTINGS: UserSettings = {
  theme: THEME_VALUES.LIGHT, // Light theme
  culture: CULTURE_VALUES.VIETNAMESE, // Vietnamese
}

// Culture conversion methods
export const stringToNumericCulture = (cultureText: string): CultureValue => {
  switch (cultureText) {
    case CULTURE_TEXT.VIETNAMESE:
      return CULTURE_VALUES.VIETNAMESE
    case CULTURE_TEXT.ENGLISH:
      return CULTURE_VALUES.ENGLISH
    default:
      return CULTURE_VALUES.VIETNAMESE // Fallback to 0 (Vietnamese)
  }
}

export const numericToStringCulture = (cultureValue: number): CultureText => {
  switch (cultureValue) {
    case CULTURE_VALUES.VIETNAMESE:
      return CULTURE_TEXT.VIETNAMESE
    case CULTURE_VALUES.ENGLISH:
      return CULTURE_TEXT.ENGLISH
    default:
      return CULTURE_TEXT.VIETNAMESE // Fallback to 'vi' (Vietnamese)
  }
}

// Theme conversion methods
export const stringToNumericTheme = (themeText: string): ThemeValue => {
  switch (themeText) {
    case THEME_TEXT.LIGHT:
      return THEME_VALUES.LIGHT
    case THEME_TEXT.DARK:
      return THEME_VALUES.DARK
    default:
      return THEME_VALUES.LIGHT // Fallback to 0 (Light)
  }
}

export const numericToStringTheme = (themeValue: number): ThemeText => {
  switch (themeValue) {
    case THEME_VALUES.LIGHT:
      return THEME_TEXT.LIGHT
    case THEME_VALUES.DARK:
      return THEME_TEXT.DARK
    default:
      return THEME_TEXT.LIGHT // Fallback to 'light' (Light)
  }
}
