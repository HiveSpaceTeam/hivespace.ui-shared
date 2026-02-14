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
  return { formatDate }
}
