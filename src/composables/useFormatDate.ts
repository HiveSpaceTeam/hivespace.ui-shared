export default function useFormatDate() {
  const formatDate = (value?: string | null) => {
    if (!value) return '-'
    try {
      const d = new Date(value)
      if (Number.isNaN(d.getTime())) return '-'
      return d.toLocaleDateString()
    } catch {
      return '-'
    }
  }
  return { formatDate }
}
