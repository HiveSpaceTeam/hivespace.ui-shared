import { ref, onUnmounted, watch } from 'vue'
import * as signalR from '@microsoft/signalr'
import { useAuth } from './useAuth'
import type { NotificationHubEvent } from '../types/notification.types'

/**
 * Manages a SignalR connection to /hubs/notifications.
 *
 * @param hubBaseUrl  Gateway base URL without /api suffix (e.g. "https://localhost:7001").
 *                    Trailing /api is stripped automatically.
 * @param onReceive   Called for every ReceiveNotification push event.
 */
export function useNotificationHub(
  hubBaseUrl: string,
  onReceive: (event: NotificationHubEvent) => void,
) {
  const hubUrl = `${hubBaseUrl.replace(/\/api(\/.*)?$/, '').replace(/\/+$/, '')}/hubs/notifications`

  const { currentUser } = useAuth()
  const connectionStatus = ref<'disconnected' | 'connecting' | 'connected' | 'error'>(
    'disconnected',
  )

  let connection: signalR.HubConnection | null = null

  const connect = async () => {
    if (connection) return

    if (!currentUser.value?.access_token) {
      connectionStatus.value = 'disconnected'
      return
    }

    connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => {
          const token = currentUser.value?.access_token
          if (!token) {
            throw new Error('Missing access token')
          }
          return token
        },
      })
      .withAutomaticReconnect([0, 5000, 20000])
      .configureLogging(signalR.LogLevel.Warning)
      .build()

    connection.on('ReceiveNotification', onReceive)
    connection.onreconnecting(() => {
      connectionStatus.value = 'connecting'
    })
    connection.onreconnected(() => {
      console.info('[NotificationHub] Reconnected')
      connectionStatus.value = 'connected'
    })
    connection.onclose(() => {
      connection = null
      connectionStatus.value = 'disconnected'
      console.warn('[NotificationHub] Connection permanently closed.')
    })

    try {
      connectionStatus.value = 'connecting'
      await connection.start()
      connectionStatus.value = 'connected'
    } catch (err) {
      connection = null
      connectionStatus.value = 'error'
      console.error('[NotificationHub] Connection failed:', err)
    }
  }

  const disconnect = async () => {
    if (!connection) return
    try {
      await connection.stop()
    } catch (err) {
      console.warn('[NotificationHub] Disconnect failed:', err)
    } finally {
      connection = null
      connectionStatus.value = 'disconnected'
    }
  }

  watch(
    () => currentUser.value?.access_token,
    (token) => {
      if (!token && connection) {
        void disconnect()
      }
    },
  )

  onUnmounted(disconnect)

  return { connect, disconnect, connectionStatus }
}
