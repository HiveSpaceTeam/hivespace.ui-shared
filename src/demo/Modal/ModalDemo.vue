<template>
  
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <!-- Modal Overview -->
      <ComponentCard
        title="Modal Popup Components"
        description="Centered modal dialogs for confirmations, alerts, and user interactions"
      >
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-400">
            Modal popups appear in the center of the screen with backdrop overlay. Perfect for
            confirmations, alerts, forms, and any content that requires user attention.
          </p>

          <div
            class="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
          >
            <InfoIcon class="w-5 h-5 text-blue-500" />
            <p class="text-sm text-blue-700 dark:text-blue-300">
              All modals use
              <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">Teleport</code> to render at
              body level and include proper focus management and accessibility features.
            </p>
          </div>
        </div>
      </ComponentCard>

      <!-- Basic Modal Types -->
      <ComponentCard
        title="Basic Modal Types"
        description="Common modal patterns for different use cases"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Confirm Modal -->
          <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 class="text-sm font-semibold text-gray-800 dark:text-white mb-2">Confirm Dialog</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Standard confirmation with OK/Cancel buttons
            </p>
            <Button @click="showConfirmModal" variant="primary" class="w-full">
              <CheckIcon class="w-4 h-4 mr-2" />
              Show Confirm
            </Button>
          </div>

          <!-- Alert Modal -->
          <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 class="text-sm font-semibold text-gray-800 dark:text-white mb-2">Alert Dialog</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Information alert with single OK button
            </p>
            <Button @click="showAlertModal" variant="secondary" class="w-full">
              <InfoIcon class="w-4 h-4 mr-2" />
              Show Alert
            </Button>
          </div>

          <!-- Warning Modal -->
          <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 class="text-sm font-semibold text-gray-800 dark:text-white mb-2">Warning Dialog</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Warning message with proceed/cancel options
            </p>
            <Button @click="showWarningModal" variant="warning" class="w-full">
              <WarningIcon class="w-4 h-4 mr-2" />
              Show Warning
            </Button>
          </div>
        </div>
      </ComponentCard>

      <!-- Action-Specific Modals -->
      <ComponentCard
        title="Action-Specific Modals"
        description="Modals designed for specific user actions"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Delete Confirmation -->
          <div
            class="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/10"
          >
            <h4 class="text-sm font-semibold text-red-800 dark:text-red-300 mb-2">
              Delete Confirmation
            </h4>
            <p class="text-sm text-red-600 dark:text-red-400 mb-3">
              Destructive action with Delete/Keep buttons
            </p>
            <Button @click="showDeleteModal" variant="danger" class="w-full">
              <TrashIcon class="w-4 h-4 mr-2" />
              Delete Item
            </Button>
          </div>

          <!-- Yes/No Dialog -->
          <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 class="text-sm font-semibold text-gray-800 dark:text-white mb-2">Yes/No Dialog</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Binary choice with Yes/No buttons
            </p>
            <Button @click="showYesNoModal" variant="primary" class="w-full">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clip-rule="evenodd"
                />
              </svg>
              Ask Question
            </Button>
          </div>

          <!-- Save/Discard -->
          <div
            class="p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/10"
          >
            <h4 class="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
              Save Changes
            </h4>
            <p class="text-sm text-blue-600 dark:text-blue-400 mb-3">
              Unsaved changes with Save/Discard/Cancel
            </p>
            <Button @click="showSaveModal" variant="primary" class="w-full">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"
                />
              </svg>
              Exit Form
            </Button>
          </div>
        </div>
      </ComponentCard>

      <!-- Advanced Examples -->
      <ComponentCard
        title="Advanced Modal Features"
        description="Modals with custom content, loading states, and special behaviors"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Loading Modal -->
          <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 class="text-sm font-semibold text-gray-800 dark:text-white mb-2">Loading State</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Modal with async operation and loading spinner
            </p>
            <Button @click="showLoadingModal" variant="primary" class="w-full">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Process Data
            </Button>
          </div>

          <!-- Custom Content Modal -->
          <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 class="text-sm font-semibold text-gray-800 dark:text-white mb-2">Custom Content</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Modal with custom form content and validation
            </p>
            <Button @click="showCustomModal" variant="secondary" class="w-full">
              <EditIcon class="w-4 h-4 mr-2" />
              Custom Form
            </Button>
          </div>
        </div>
      </ComponentCard>

      <!-- API & Usage -->
      <ComponentCard title="Usage Examples & API">
        <div class="space-y-6">
          <!-- Basic Usage -->
          <div>
            <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              1. Basic Confirm Modal
            </h4>
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
              <pre
                class="text-sm text-gray-700 dark:text-gray-300"
              ><code>// Using useConfirmModal composable
const { confirm } = useConfirmModal()

const handleAction = async () => {
  const confirmed = await confirm(
    'Confirm Action',
    'Are you sure you want to proceed?'
  )

  if (confirmed) {
    // Handle confirmation
  }
}</code></pre>
            </div>
          </div>

          <!-- Delete Modal -->
          <div>
            <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              2. Delete Confirmation
            </h4>
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
              <pre
                class="text-sm text-gray-700 dark:text-gray-300"
              ><code>// Using deleteConfirm helper
const { deleteConfirm } = useConfirmModal()

const handleDelete = async () => {
  const confirmed = await deleteConfirm(
    'Delete Item',
    'This action cannot be undone. Are you sure?'
  )

  if (confirmed) {
    // Delete the item
  }
}</code></pre>
            </div>
          </div>

          <!-- Three Button Modal -->
          <div>
            <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              3. Three Button Modal
            </h4>
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
              <pre
                class="text-sm text-gray-700 dark:text-gray-300"
              ><code>// Using saveChanges helper for 3-button modal
const { saveChanges } = useConfirmModal()

const handleUnsavedChanges = async () => {
  const result = await saveChanges(
    'Unsaved Changes',
    'You have unsaved changes. What would you like to do?'
  )

  if (result === 'save') {
    // Save changes
  } else if (result === 'discard') {
    // Discard changes
  }
  // result === 'cancel' means stay on page
}</code></pre>
            </div>
          </div>
        </div>
      </ComponentCard>
    </div>
  
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useAppStore } from '@hivespace/shared'
import { useConfirmModal, PageBreadcrumb, ComponentCard, Button } from '@hivespace/shared'

import { CheckIcon, InfoIcon, WarningIcon, TrashIcon, EditIcon } from '@hivespace/shared'

const appStore = useAppStore()
const currentPageTitle = computed(() => 'Modal Popups Demo')

// Use confirm modal composable
const { confirm, alert, deleteConfirm, warning, saveChanges, openConfirmModal } = useConfirmModal()

// Form state for custom modal
const customForm = reactive({
  name: '',
  email: '',
  role: '',
})

// Modal trigger functions using composable
const showConfirmModal = async () => {
  const confirmed = await confirm(
    'Confirm Action',
    'Are you sure you want to proceed with this action? This action cannot be undone.',
  )

  if (confirmed) {
    appStore.notifySuccess('Confirmed!', 'Your action has been confirmed successfully.')
  }
}

const showAlertModal = async () => {
  await alert(
    'Information',
    'This is an important information alert. Please read this message carefully before proceeding.',
  )
  appStore.notifyInfo('Alert Closed', 'You have acknowledged the information.')
}

const showWarningModal = async () => {
  const proceed = await warning(
    'Warning: Potential Data Loss',
    'This action may result in data loss. Are you sure you want to continue?',
  )

  if (proceed) {
    appStore.notifyWarning('Proceeding...', 'Action completed with warnings.')
  }
}

const showDeleteModal = async () => {
  const confirmed = await deleteConfirm(
    'Delete Item',
    'This will permanently delete the selected item. This action cannot be undone.',
  )

  if (confirmed) {
    appStore.notifySuccess('Deleted!', 'Item has been deleted successfully.')
  }
}

const showYesNoModal = async () => {
  const confirmed = await confirm(
    'Enable Notifications?',
    'Would you like to enable push notifications for this application?',
  )

  if (confirmed) {
    appStore.notifySuccess('Enabled!', 'Push notifications have been enabled.')
  } else {
    appStore.notifyInfo('Disabled', 'Push notifications remain disabled.')
  }
}

const showSaveModal = async () => {
  const result = await saveChanges(
    'Unsaved Changes',
    'You have unsaved changes. Would you like to save them before leaving?',
  )

  if (result === 'save') {
    appStore.notifySuccess('Saved!', 'Your changes have been saved successfully.')
  } else if (result === 'discard') {
    appStore.notifyInfo('Discarded', 'Changes have been discarded.')
  }
}

const showLoadingModal = async () => {
  const confirmed = await openConfirmModal({
    title: 'Process Data?',
    message: 'This will take approximately 30 seconds to complete.',
    confirmText: 'Start Processing',
    loading: false,
    variant: 'confirm',
  })

  if (confirmed === 'confirm') {
    // Simulate processing with loading state
    await openConfirmModal({
      title: 'Processing Data...',
      message: 'Please wait while we process your request.',
      confirmText: 'Processing...',
      cancelText: undefined,
      loading: true,
      variant: 'info',
    })

    setTimeout(() => {
      appStore.notifySuccess('Processing Complete!', 'Your data has been processed successfully.')
    }, 3000)
  }
}

const showCustomModal = async () => {
  const result = await openConfirmModal({
    title: 'Create New User',
    message: 'Please fill in the user details and confirm to create a new user account.',
    confirmText: 'Create User',
    cancelText: 'Cancel',
    variant: 'confirm',
    size: 'lg',
  })

  if (result === 'confirm') {
    if (!customForm.name || !customForm.email || !customForm.role) {
      appStore.notifyError('Validation Error', 'Please fill in all required fields.')
      return
    }

    appStore.notifySuccess(
      'User Created!',
      `User ${customForm.name} has been created successfully.`,
    )
    resetCustomForm()
  }
}

const resetCustomForm = () => {
  customForm.name = ''
  customForm.email = ''
  customForm.role = ''
}
</script>

