import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface NotificationOptions {
    id?: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message?: string
    duration?: number
}

export interface Notification extends Required<NotificationOptions> {
    id: string
}

export const useAppStore = defineStore('app', () => {
    // State
    const isLoading = ref(false)
    const notifications = ref<Notification[]>([])
    const storedTheme = localStorage.getItem('theme')
    const theme = ref<'light' | 'dark'>(
        storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : 'light',
    )

    // Actions
    function setLoading(loading: boolean) {
        isLoading.value = loading
    }

    function setTheme(newTheme: 'light' | 'dark') {
        theme.value = newTheme
        localStorage.setItem('theme', newTheme)
    }

    function toggleTheme() {
        const newTheme = theme.value === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
    }

    function addNotification(options: NotificationOptions) {
        const notification: Notification = {
            id: options.id || Date.now().toString(),
            type: options.type,
            title: options.title,
            message: options.message || '',
            duration: options.duration || 5000,
        }

        notifications.value.push(notification)

        // Auto remove notification after duration
        setTimeout(() => {
            removeNotification(notification.id)
        }, notification.duration)

        return notification.id
    }

    function removeNotification(id: string) {
        const index = notifications.value.findIndex((n) => n.id === id)
        if (index > -1) {
            notifications.value.splice(index, 1)
        }
    }

    function clearAllNotifications() {
        notifications.value = []
    }

    // Convenience methods for different notification types
    function notifySuccess(title: string, message?: string, duration?: number) {
        return addNotification({ type: 'success', title, message, duration })
    }

    function notifyError(title: string, message?: string, duration?: number) {
        return addNotification({ type: 'error', title, message, duration })
    }

    function notifyWarning(title: string, message?: string, duration?: number) {
        return addNotification({ type: 'warning', title, message, duration })
    }

    function notifyInfo(title: string, message?: string, duration?: number) {
        return addNotification({ type: 'info', title, message, duration })
    }

    return {
        // State
        isLoading,
        notifications,
        theme,
        // Actions
        setLoading,
        setTheme,
        toggleTheme,
        addNotification,
        removeNotification,
        clearAllNotifications,
        notifySuccess,
        notifyError,
        notifyWarning,
        notifyInfo,
    }
})
