import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { NotificationStatus } from '../types/notification.types'
import type {
  INotificationService,
  InAppNotification,
  NotificationApi,
  NotificationHubEvent,
} from '../types/notification.types'

export interface NotificationStoreOptions {
  service: INotificationService
  resolveLink: (eventType: string, payload: Record<string, unknown>) => string
  resolveMessage: (eventType: string, payload: Record<string, unknown>) => string
  pageSize?: number
  defaultLink?: string
}

const parsePayload = (raw: string): Record<string, unknown> => {
  try {
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    const proto = Object.getPrototypeOf(parsed)
    if (proto !== Object.prototype && proto !== null) return {}
    return parsed as Record<string, unknown>
  } catch {
    return {}
  }
}

const toViewModel = (
  id: string,
  eventType: string,
  rawPayload: string,
  isRead: boolean,
  createdAt: string,
  resolveLink: NotificationStoreOptions['resolveLink'],
  resolveMessage: NotificationStoreOptions['resolveMessage'],
): InAppNotification => {
  const payload = parsePayload(rawPayload)
  return {
    id,
    eventType,
    isRead,
    createdAt,
    message: resolveMessage(eventType, payload),
    link: resolveLink(eventType, payload),
    avatarUrl: typeof payload.avatarUrl === 'string' ? payload.avatarUrl : undefined,
  }
}

export const createNotificationStore = (options: NotificationStoreOptions) => {
  const { service, resolveLink, resolveMessage, pageSize = 20 } = options

  return defineStore('notification', () => {
    const notifications = ref<InAppNotification[]>([])
    const unreadCount = ref(0)
    const total = ref(0)
    const page = ref(1)
    const isLoading = ref(false)
    const toastQueue = ref<InAppNotification[]>([])

    const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))

    const fromApi = (api: NotificationApi): InAppNotification =>
      toViewModel(
        api.id, api.eventType, api.payload,
        api.status === NotificationStatus.Read,
        api.createdAt, resolveLink, resolveMessage,
      )

    const fetchNotifications = async () => {
      isLoading.value = true
      try {
        const result = await service.getNotifications(page.value, pageSize)
        notifications.value = result.items.map(fromApi)
        total.value = result.total
      } finally {
        isLoading.value = false
      }
    }

    const fetchUnreadCount = async () => {
      try {
        unreadCount.value = await service.getUnreadCount()
      } catch {
        // silent — badge just won't show
      }
    }

    const markAsRead = async (id: string) => {
      await service.markAsRead(id)
      const item = notifications.value.find((n) => n.id === id)
      if (item && !item.isRead) {
        item.isRead = true
        unreadCount.value = Math.max(0, unreadCount.value - 1)
      }
    }

    const loadMore = async () => {
      if (page.value >= totalPages.value) return
      isLoading.value = true
      const nextPage = page.value + 1
      try {
        const result = await service.getNotifications(nextPage, pageSize)
        notifications.value.push(...result.items.map(fromApi))
        total.value = result.total
        page.value = nextPage
      } finally {
        isLoading.value = false
      }
    }

    const prependFromHub = (event: NotificationHubEvent) => {
      if (notifications.value.some((item) => item.id === event.id)
        || toastQueue.value.some((item) => item.id === event.id)) {
        return
      }
      const n = toViewModel(
        event.id, event.eventType, event.payload,
        false, event.createdAt, resolveLink, resolveMessage,
      )
      notifications.value.unshift(n)
      unreadCount.value += 1
      toastQueue.value.push(n)
    }

    const dismissToast = (id: string) => {
      toastQueue.value = toastQueue.value.filter((t) => t.id !== id)
    }

    return {
      notifications,
      unreadCount,
      total,
      page,
      pageSize,
      isLoading,
      totalPages,
      toastQueue,
      fetchNotifications,
      fetchUnreadCount,
      markAsRead,
      loadMore,
      prependFromHub,
      dismissToast,
    }
  })
}
