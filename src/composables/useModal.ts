import { ref, shallowRef, readonly, type Component } from 'vue'

// ─── Legacy single-modal state (used by ModalWrapper / adminportal / sellercenter) ───
const modalComponent = shallowRef<Component | null>(null)
const modalProps = ref<Record<string, unknown>>({})
let resolvePromise: ((value: unknown) => void) | null = null
const isOpen = ref<boolean>(false)

// ─── Raw modal stack (used by storefront custom modals with their own chrome) ────────
interface RawModalItem {
  component: Component
  props: Record<string, unknown>
  resolve: (value: unknown) => void
}
const rawModalStack = ref<RawModalItem[]>([])

export function useModal(): {
  isOpen: any
  modalComponent: any
  modalProps: any
  rawModalStack: any
  openModal: (component: Component, props?: Record<string, unknown>) => Promise<unknown>
  closeModal: (result?: unknown) => void
} {
  /**
   * Opens a modal and returns a promise that resolves when the modal is closed.
   *
   * Pass `raw: true` in props to render the component directly with a simple
   * backdrop (no ModalWrapper chrome). Supports nested/stacked raw modals.
   */
  const openModal = (component: Component, props: Record<string, unknown> = {}) => {
    if (props.raw) {
      return new Promise<unknown>((resolve) => {
        rawModalStack.value = [...rawModalStack.value, { component, props, resolve }]
      })
    }

    // Legacy: single modal rendered inside ModalWrapper
    modalComponent.value = component
    modalProps.value = props
    isOpen.value = true
    return new Promise<unknown>((resolve) => {
      resolvePromise = resolve
    })
  }

  /**
   * Closes the currently active modal (raw stack takes priority over legacy).
   */
  const closeModal = (result?: unknown) => {
    if (rawModalStack.value.length > 0) {
      const item = rawModalStack.value[rawModalStack.value.length - 1]
      rawModalStack.value = rawModalStack.value.slice(0, -1)
      setTimeout(() => item.resolve(result), 200)
      return
    }

    // Legacy close
    isOpen.value = false
    setTimeout(() => {
      modalComponent.value = null
      modalProps.value = {}
      if (resolvePromise) {
        resolvePromise(result)
        resolvePromise = null
      }
    }, 200)
  }

  return {
    isOpen: readonly(isOpen),
    modalComponent: readonly(modalComponent),
    modalProps: readonly(modalProps),
    rawModalStack: readonly(rawModalStack),
    openModal,
    closeModal,
  }
}
