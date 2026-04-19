export function useFormatDate() {
  const formatDate = (value?: string | null, format = 'DD/MM/YYYY') => {
    if (!value) return '-'
    try {
      const d = new Date(value)
      if (Number.isNaN(d.getTime())) return '-'

      const map: Record<string, string> = {
        YYYY: String(d.getFullYear()),
        MM: String(d.getMonth() + 1).padStart(2, '0'),
        DD: String(d.getDate()).padStart(2, '0'),
        HH: String(d.getHours()).padStart(2, '0'),
        mm: String(d.getMinutes()).padStart(2, '0'),
        ss: String(d.getSeconds()).padStart(2, '0')
      }

      return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => map[match])
    } catch {
      return '-'
    }
  }

  const formatRelativeTime = (
    iso?: string | null,
    options?: {
      locale?: string
      t?: (key: string, params?: Record<string, number>) => string
    },
  ): string => {
    if (!iso) return '-'

    const date = new Date(iso)
    if (Number.isNaN(date.getTime())) return '-'

    const diff = Date.now() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const translator = options?.t

    if (minutes < 1) {
      return translator ? translator('common.notifications.justNow') : 'just now'
    }

    if (minutes < 60) {
      return translator
        ? translator('common.notifications.minutesAgo', { count: minutes })
        : `${minutes} minute${minutes === 1 ? '' : 's'} ago`
    }

    const hours = Math.floor(minutes / 60)
    if (hours < 24) {
      return translator
        ? translator('common.notifications.hoursAgo', { count: hours })
        : `${hours} hour${hours === 1 ? '' : 's'} ago`
    }

    return new Intl.DateTimeFormat(options?.locale).format(date)
  }

  return { formatDate, formatRelativeTime }
}
