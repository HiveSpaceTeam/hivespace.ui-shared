export interface TimelineStep {
  key: string
  label: string
  timestamp?: string | null
  isCompleted: boolean
  isCurrent: boolean
}
