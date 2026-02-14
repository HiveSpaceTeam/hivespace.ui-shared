import { useI18n } from 'vue-i18n'
import type { ErrorResponse } from '../types'

export interface ValidationErrors {
  common: string[] // Required field for n on-field-specific errors as array
  [key: string]: string[] | string // Other fields are single strings
}

export function useFieldValidation() {
  const { t } = useI18n()

  const handleFieldValidationErrors = (
    errorData: ErrorResponse,
    errors: ValidationErrors,
  ): boolean => {
    if (!errorData?.errors || !Array.isArray(errorData.errors)) {
      return false
    }

    let hasFieldErrors = false

    // First clear all errors
    clearFieldErrors(errors)

    errorData.errors.forEach((err: { code: string; source?: string }) => {
      const errorCode = err.code
      const source = err.source

      // Translate with explicit fallback if key is missing
      const key = `backendErrors.${errorCode}`
      const translated = t(key)
      const errorMessage = translated === key ? t('errors.UNKNOWN_ERROR') : translated

      if (!source) {
        // If no source is provided, treat as common error
        errors.common.push(errorMessage as string)
        hasFieldErrors = true
      } else if (source in errors && source !== 'common') {
        // Map to specific field if it exists (and isn't common)
        errors[source] = errorMessage as string
        hasFieldErrors = true
      } else {
        // If source doesn't match any field, add to common errors
        errors.common.push(errorMessage as string)
        hasFieldErrors = true
      }
    })

    return hasFieldErrors
  }

  const clearFieldErrors = (errors: ValidationErrors): void => {
    // Clear common errors (array)
    errors.common = []
    // Clear all other field errors (strings)
    Object.keys(errors).forEach((key) => {
      if (key !== 'common') {
        errors[key] = ''
      }
    })
  }

  return { handleFieldValidationErrors, clearFieldErrors }
}
