import { ref, type Ref } from 'vue'
import { defineStore, type StoreDefinition } from 'pinia'
import { NotificationStatus } from '../types/notification.types'
import type {
  INotificationService,
  InAppNotification,
  NotificationDto,
  NotificationHubEvent,
} from '../types/notification.types'

export interface NotificationStoreReturn {
  notifications: Ref<InAppNotification[]>
  unreadCount: Ref<number>
  hasMore: Ref<boolean>
  page: Ref<number>
  pageSize: number
  isLoading: Ref<boolean>
  toastQueue: Ref<InAppNotification[]>
  fetchNotifications: (unreadOnly?: boolean) => Promise<void>
  fetchUnreadCount: () => Promise<void>
  markAsRead: (id: string) => Promise<void>
  loadMore: () => Promise<void>
  prependFromHub: (event: NotificationHubEvent) => void
  dismissToast: (id: string) => void
}

export interface NotificationStoreState {
  notifications: InAppNotification[]
  unreadCount: number
  hasMore: boolean
  page: number
  pageSize: number
  isLoading: boolean
  toastQueue: InAppNotification[]
}

export type NotificationStoreActions = Pick<
  NotificationStoreReturn,
  'fetchNotifications' | 'fetchUnreadCount' | 'markAsRead' | 'loadMore' | 'prependFromHub' | 'dismissToast'
>

export type NotificationStoreDefinition = StoreDefinition<
  'notification',
  NotificationStoreState,
  Record<never, never>,
  NotificationStoreActions
>

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

export const createNotificationStore = (options: NotificationStoreOptions): NotificationStoreDefinition => {
  const { service, resolveLink, resolveMessage, pageSize = 20 } = options

  return defineStore('notification', () => {
    const notifications = ref<InAppNotification[]>([])
    const unreadCount = ref(0)
    const hasMore = ref(false)
    const page = ref(1)
    const isLoading = ref(false)
    const toastQueue = ref<InAppNotification[]>([])
    const currentUnreadOnly = ref(false)

    const fromApi = (api: NotificationDto): InAppNotification =>
      toViewModel(
        api.id, api.eventType, api.payload,
        api.status === NotificationStatus.Read,
        api.createdAt, resolveLink, resolveMessage,
      )

    const fetchNotifications = async (unreadOnly = false) => {
      currentUnreadOnly.value = unreadOnly
      page.value = 1
      isLoading.value = true
      try {
        const result = await service.getNotifications(1, pageSize, unreadOnly)
        notifications.value = result.notifications.map(fromApi)
        hasMore.value = result.hasMore
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
      if (!hasMore.value) return
      isLoading.value = true
      const nextPage = page.value + 1
      try {
        const result = await service.getNotifications(nextPage, pageSize, currentUnreadOnly.value)
        notifications.value.push(...result.notifications.map(fromApi))
        hasMore.value = result.hasMore
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
      hasMore,
      page,
      pageSize,
      isLoading,
      toastQueue,
      fetchNotifications,
      fetchUnreadCount,
      markAsRead,
      loadMore,
      prependFromHub,
      dismissToast,
    }
  }) as unknown as NotificationStoreDefinition
}
