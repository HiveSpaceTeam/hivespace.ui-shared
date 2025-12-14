/**
 * Common Component Types
 * Shared types used across Vue components
 */

// Theme-related types
export interface ThemeContext {
    isDarkMode: boolean
    currentTheme: string
    toggleTheme: () => Promise<void>
}

export interface ComponentProps {
    theme?: string
    className?: string
    disabled?: boolean
}

// Common component event types
export interface ComponentEvents {
    themeChanged: [theme: string]
    click: [event: MouseEvent]
    change: [value: any]
}

// Form component types
export interface FormFieldProps {
    label?: string
    placeholder?: string
    required?: boolean
    error?: string
    helpText?: string
}

export interface SelectOption {
    label: string
    value: string | number
    disabled?: boolean
}

// Layout component types
export interface LayoutProps {
    sidebar?: boolean
    header?: boolean
    footer?: boolean
}

// Modal/Dialog types
export interface ModalProps {
    open: boolean
    title?: string
    closable?: boolean
    width?: string | number
}

// Menu item types
export interface MenuItem {
    href: string
    icon: any
    textKey: string
}

// Button variants and sizes
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
export type ButtonSize = 'small' | 'medium' | 'large'