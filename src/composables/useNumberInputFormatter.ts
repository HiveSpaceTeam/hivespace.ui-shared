import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export function useNumberInputFormatter(
    modelValue: Ref<number | string | null | undefined>,
    locale: string = 'en-US'
) {
    const displayValue = ref<string>('')

    // Format a raw number into a localized string
    const formatNumber = (val: number | string | null | undefined) => {
        if (val === null || val === undefined || val === '') return ''
        const num = Number(val)
        if (isNaN(num)) return ''
        return new Intl.NumberFormat(locale).format(num)
    }

    // Sync incoming modelValue changes to the displayValue target
    watch(
        modelValue,
        (newVal) => {
            displayValue.value = formatNumber(newVal)
        },
        { immediate: true }
    )

    const handleInput = (event: Event) => {
        const input = event.target as HTMLInputElement

        // Strip out any non-digits instantly
        const sanitized = input.value.replace(/[^\d]/g, '')

        const rawValue = sanitized ? Number(sanitized) : ''

        // Update the parent's v-model value
        modelValue.value = rawValue

        // Synchronously reformat and flush to the DOM
        // This ensures letters are visually erased exactly as they are typed
        const formatted = formatNumber(rawValue)
        input.value = formatted
        displayValue.value = formatted
    }

    // To solve cursor jumping when formatting input in place,
    // we could format on blur instead.
    const handleBlur = (_event: Event) => {
        displayValue.value = formatNumber(modelValue.value)
    }

    const handleFocus = (_event: Event) => {
        // Optionally strip formatting on focus so user can edit raw number
        // displayValue.value = modelValue.value !== null ? String(modelValue.value) : ''
    }

    return {
        displayValue,
        handleInput,
        handleBlur,
        handleFocus,
        formatNumber
    }
}
