import { ref, shallowRef, readonly, type Component } from 'vue'

// This composable manages the global state for all modals.
// By using a singleton pattern (creating the state outside the function),
// the same state is shared across every component that calls useModal().

// The component to be displayed in the modal. shallowRef is used for performance.
const modalComponent = shallowRef<Component | null>(null)

// The props to pass to the modal component. Using `unknown` for better type safety.
const modalProps = ref<Record<string, unknown>>({})

// A promise resolver that can be used to await the modal's result.
let resolvePromise: ((value: unknown) => void) | null = null

// The reactive state for modal visibility.
const isOpen = ref<boolean>(false)

export function useModal() {
  /**
   * Opens a modal and returns a promise that resolves when the modal is closed.
   * @param component The Vue component to display.
   * @param props The props to pass to the component.
   * @returns A promise that resolves with the value passed to closeModal.
   */
  const openModal = (component: Component, props: Record<string, unknown> = {}) => {
    modalComponent.value = component
    modalProps.value = props
    isOpen.value = true

    // Return a new promise that can be awaited
    return new Promise<unknown>((resolve) => {
      resolvePromise = resolve
    })
  }

  /**
   * Closes the currently active modal.
   * @param result The value to resolve the promise with.
   */
  const closeModal = (result?: unknown) => {
    isOpen.value = false
    // A small delay to allow for closing animations
    setTimeout(() => {
      modalComponent.value = null
      modalProps.value = {}
      if (resolvePromise) {
        resolvePromise(result)
        resolvePromise = null
      }
    }, 200) // Match this with your CSS transition duration
  }

  return {
    // We use `readonly` to prevent components from directly modifying the state.
    isOpen: readonly(isOpen),
    modalComponent: readonly(modalComponent),
    modalProps: readonly(modalProps),
    openModal,
    closeModal,
  }
}
