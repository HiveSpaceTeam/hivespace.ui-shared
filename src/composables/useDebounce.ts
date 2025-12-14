/**
 * Composable for keyed debounce functionality
 * Maintains separate timers for different keys to allow multiple concurrent debounced operations
 *
 * @returns Object with debounce method
 */
export function useDebounce() {
  const timers = new Map<string, ReturnType<typeof setTimeout>>()

  /**
   * Debounces a callback function with a specified key
   * Clears any existing timer for the key before scheduling the new callback
   *
   * @param key - Unique identifier for this debounced operation
   * @param cb - Callback function to execute after delay
   * @param ms - Delay in milliseconds (default: 400)
   */
  const debounce = (key: string, cb: () => void, ms = 400) => {
    const existing = timers.get(key)
    if (existing) clearTimeout(existing)
    const id = setTimeout(() => {
      cb()
      timers.delete(key)
    }, ms)
    timers.set(key, id)
  }

  return { debounce }
}
