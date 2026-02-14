import { useModal } from './useModal'
import ConfirmModal from '../components/common/ConfirmModal.vue'
import type { ModalVariant, ModalSize, ButtonVariant } from '../components/common/ConfirmModal.vue'

export interface ConfirmModalOptions extends Record<string, unknown> {
  variant?: ModalVariant
  size?: ModalSize
  title?: string // Title is now optional
  message?: string
  showIcon?: boolean
  confirmText?: string
  cancelText?: string
  thirdText?: string
  confirmVariant?: ButtonVariant
  thirdVariant?: ButtonVariant
  loading?: boolean
  closeOnBackdrop?: boolean
  autoSize?: boolean
}

export type ConfirmModalResult = { result: 'confirm' | 'cancel' | 'third' | null }

export function useConfirmModal() {
  const { openModal } = useModal()

  const openConfirmModal = async (
    options: ConfirmModalOptions,
  ): Promise<'confirm' | 'cancel' | 'third' | null> => {
    try {
      // Apply auto sizing if specified
      const modalOptions = { ...options }
      if (modalOptions.autoSize === true) {
        // Set size to default but CSS will handle auto sizing
        modalOptions.size = 'md'
      }

      const result = (await openModal(ConfirmModal, modalOptions)) as ConfirmModalResult | undefined
      return result?.result || null
    } catch (error) {
      console.error('Error opening confirm modal:', error)
      return null
    }
  }

  // Predefined modal types for common use cases
  const confirm = async (title: string, message?: string): Promise<boolean> => {
    const result = await openConfirmModal({
      variant: 'confirm',
      title,
      message,
      confirmText: 'Confirm',
      cancelText: 'Cancel',
    })
    return result === 'confirm'
  }

  const alert = async (title: string, message?: string): Promise<void> => {
    await openConfirmModal({
      variant: 'alert',
      title,
      message,
      confirmText: 'OK',
      cancelText: undefined,
    })
  }

  const deleteConfirm = async (title: string, message?: string): Promise<boolean> => {
    const result = await openConfirmModal({
      variant: 'danger',
      title,
      message,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      confirmVariant: 'danger',
    })
    return result === 'confirm'
  }

  const warning = async (title: string, message?: string): Promise<boolean> => {
    const result = await openConfirmModal({
      variant: 'warning',
      title,
      message,
      confirmText: 'Continue',
      cancelText: 'Cancel',
      confirmVariant: 'warning',
    })
    return result === 'confirm'
  }

  const saveChanges = async (
    title: string,
    message?: string,
  ): Promise<'save' | 'discard' | 'cancel' | null> => {
    const result = await openConfirmModal({
      variant: 'warning',
      title,
      message,
      confirmText: 'Save',
      cancelText: 'Cancel',
      thirdText: 'Discard',
      confirmVariant: 'success',
      thirdVariant: 'danger',
    })

    if (result === 'confirm') return 'save'
    if (result === 'third') return 'discard'
    if (result === 'cancel') return 'cancel'
    return null
  }

  return {
    confirm,
    alert,
    deleteConfirm,
    warning,
    saveChanges,
    openConfirmModal,
  }
}
