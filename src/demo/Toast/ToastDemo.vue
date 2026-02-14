<template>
  
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <!-- Basic Toast Examples -->
      <ComponentCard
        title="Toast Notifications - Basic Examples"
        description="Click buttons below to see toast notifications appear at top-right corner"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button @click="showSuccessToast" variant="primary" class="w-full">
            <SuccessIcon class="w-4 h-4 mr-2" />
            Success Toast
          </Button>
          <Button @click="showErrorToast" variant="danger" class="w-full">
            <ErrorIcon class="w-4 h-4 mr-2" />
            Error Toast
          </Button>
          <Button @click="showWarningToast" variant="warning" class="w-full">
            <WarningIcon class="w-4 h-4 mr-2" />
            Warning Toast
          </Button>
          <Button @click="showInfoToast" variant="secondary" class="w-full">
            <InfoIcon class="w-4 h-4 mr-2" />
            Info Toast
          </Button>
        </div>
      </ComponentCard>

      <!-- Custom Duration Examples -->
      <ComponentCard
        title="Custom Duration & Behavior"
        description="Toast notifications with different auto-dismiss timing"
      >
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button @click="showQuickToast" variant="outline" class="w-full">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              />
            </svg>
            Quick (2 seconds)
          </Button>
          <Button @click="showLongToast" variant="outline" class="w-full">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              />
            </svg>
            Long (10 seconds)
          </Button>
          <Button @click="showPersistentToast" variant="outline" class="w-full">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            No Auto-close
          </Button>
        </div>
      </ComponentCard>

      <!-- Multiple Toasts & Control -->
      <ComponentCard
        title="Multiple Toasts & Management"
        description="Test stacking behavior and global management"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button @click="showMultipleToasts" variant="primary" class="w-full">
            <PlusIcon class="w-4 h-4 mr-2" />
            Show 3 Random Toasts
          </Button>
          <Button @click="clearAllToasts" variant="outline" class="w-full">
            <TrashIcon class="w-4 h-4 mr-2" />
            Clear All Toasts
          </Button>
        </div>
      </ComponentCard>

      <!-- Real-world Scenarios -->
      <ComponentCard
        title="Real-world Use Cases"
        description="Common scenarios where toast notifications are used"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button @click="simulateFormSave" variant="primary" class="w-full">
            <CheckIcon class="w-4 h-4 mr-2" />
            Form Save Success
          </Button>
          <Button @click="simulateApiError" variant="danger" class="w-full">
            <ErrorIcon class="w-4 h-4 mr-2" />
            API Connection Error
          </Button>
          <Button @click="simulateUpload" variant="secondary" class="w-full">
            <UploadIcon class="w-4 h-4 mr-2" />
            File Upload Process
          </Button>
        </div>
      </ComponentCard>

      <!-- Implementation Code -->
      <ComponentCard title="Implementation Examples">
        <div class="space-y-6">
          <!-- Basic Usage -->
          <div>
            <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">1. Basic Usage</h4>
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
              <pre
                class="text-sm text-gray-700 dark:text-gray-300"
              ><code>import { useAppStore } from '@hivespace/shared'

const appStore = useAppStore()

// Success notification
appStore.notifySuccess(
  'Success!',
  'Operation completed successfully.'
)

// Error notification
appStore.notifyError(
  'Error occurred',
  'Unable to connect to server. Please try again.'
)</code></pre>
            </div>
          </div>

          <!-- Custom Duration -->
          <div>
            <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              2. Custom Duration
            </h4>
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
              <pre class="text-sm text-gray-700 dark:text-gray-300"><code>// Quick toast (2 seconds)
appStore.addNotification({
  type: 'success',
  title: 'Quick notification',
  message: 'This disappears in 2 seconds',
  duration: 2000
})

// Persistent toast (manual close only)
appStore.addNotification({
  type: 'warning',
  title: 'Important notice',
  message: 'Click X to dismiss this toast',
  duration: 0  // 0 = no auto-close
})</code></pre>
            </div>
          </div>

          <!-- Form Integration -->
          <div>
            <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              3. Form Integration Example
            </h4>
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
              <pre
                class="text-sm text-gray-700 dark:text-gray-300"
              ><code>const handleFormSubmit = async () => {
  try {
    appStore.setLoading(true)

    // API call
    await submitForm(formData)

    // Success toast
    appStore.notifySuccess(
      'Form submitted!',
      'Your data has been saved successfully.'
    )

    // Redirect or reset form
    router.push('/success')

  } catch (error) {
    // Error toast
    appStore.notifyError(
      'Submission failed',
      error.message || 'Please check your data and try again.'
    )
  } finally {
    appStore.setLoading(false)
  }
}</code></pre>
            </div>
          </div>

          <!-- Multiple Management -->
          <div>
            <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              4. Toast Management
            </h4>
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
              <pre
                class="text-sm text-gray-700 dark:text-gray-300"
              ><code>// Get toast ID for manual control
const toastId = appStore.notifyInfo(
  'Processing...',
  'Please wait while we process your request.'
)

// Remove specific toast
setTimeout(() => {
  appStore.removeNotification(toastId)
}, 3000)

// Clear all toasts
appStore.clearAllNotifications()</code></pre>
            </div>
          </div>
        </div>
      </ComponentCard>

      <!-- Advanced Examples -->
      <ToastExamples />

      <!-- API Reference -->
      <ComponentCard title="API Reference">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Method
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Parameters
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Return
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white"
                >
                  notifySuccess
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  title: string, message?: string, duration?: number
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  string (toast ID)
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  Show green success toast
                </td>
              </tr>
              <tr>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white"
                >
                  notifyError
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  title: string, message?: string, duration?: number
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  string (toast ID)
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  Show red error toast
                </td>
              </tr>
              <tr>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white"
                >
                  notifyWarning
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  title: string, message?: string, duration?: number
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  string (toast ID)
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  Show yellow warning toast
                </td>
              </tr>
              <tr>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white"
                >
                  notifyInfo
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  title: string, message?: string, duration?: number
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  string (toast ID)
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  Show blue info toast
                </td>
              </tr>
              <tr>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white"
                >
                  addNotification
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  NotificationOptions
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  string (toast ID)
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  Advanced toast with full control
                </td>
              </tr>
              <tr>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white"
                >
                  removeNotification
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">id: string</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">void</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  Remove specific toast by ID
                </td>
              </tr>
              <tr>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white"
                >
                  clearAllNotifications
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">-</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">void</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  Clear all active toasts
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ComponentCard>
    </div>
  
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@hivespace/shared'

import { PageBreadcrumb, ComponentCard, Button } from '@hivespace/shared'
import ToastExamples from './ToastExamples.vue'
import {
  SuccessIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  PlusIcon,
  TrashIcon,
  CheckIcon,
  UploadIcon,
} from '@hivespace/shared'

const appStore = useAppStore()

const currentPageTitle = computed(() => 'Toast Notifications Demo')

// Basic toast examples
const showSuccessToast = () => {
  appStore.notifySuccess(
    'Success!',
    'Your operation has been completed successfully. All changes have been saved.',
  )
}

const showErrorToast = () => {
  appStore.notifyError(
    'Error occurred',
    'Unable to complete the operation. Please check your connection and try again.',
  )
}

const showWarningToast = () => {
  appStore.notifyWarning(
    'Warning',
    'Some required fields are missing. Please review your information before proceeding.',
  )
}

const showInfoToast = () => {
  appStore.notifyInfo(
    'Information',
    'System maintenance is scheduled for tonight at 2:00 AM. Please save your work.',
  )
}

// Custom duration examples
const showQuickToast = () => {
  appStore.addNotification({
    type: 'success',
    title: 'Quick notification',
    message: 'This toast will disappear in just 2 seconds',
    duration: 2000,
  })
}

const showLongToast = () => {
  appStore.addNotification({
    type: 'info',
    title: 'Extended notification',
    message: 'This toast will stay visible for a full 10 seconds to ensure you see it',
    duration: 10000,
  })
}

const showPersistentToast = () => {
  appStore.addNotification({
    type: 'warning',
    title: 'Persistent notification',
    message: 'This toast will not auto-close. You must click the X button to dismiss it.',
    duration: 0,
  })
}

// Multiple toasts
const showMultipleToasts = () => {
  const messages = [
    {
      type: 'success',
      title: 'First notification',
      message: 'This is the first toast in the sequence',
    },
    {
      type: 'warning',
      title: 'Second notification',
      message: 'This is the second toast that will stack below',
    },
    {
      type: 'info',
      title: 'Third notification',
      message: 'This is the third and final toast in this demo',
    },
  ]

  messages.forEach((msg, index) => {
    setTimeout(() => {
      appStore.addNotification({
        type: msg.type as 'success' | 'error' | 'warning' | 'info',
        title: msg.title,
        message: msg.message,
      })
    }, index * 800) // Stagger by 800ms
  })
}

const clearAllToasts = () => {
  appStore.clearAllNotifications()
}

// Real-world examples
const simulateFormSave = () => {
  appStore.setLoading(true)

  setTimeout(() => {
    appStore.setLoading(false)
    appStore.notifySuccess(
      'Form saved successfully',
      'Your profile information has been updated and is now live on the system.',
    )
  }, 1500)
}

const simulateApiError = () => {
  appStore.setLoading(true)

  setTimeout(() => {
    appStore.setLoading(false)
    appStore.notifyError(
      'API Connection Failed',
      'Failed to connect to the server. Error code: 500. Please try again in a few moments.',
    )
  }, 2000)
}

const simulateUpload = () => {
  appStore.notifyInfo(
    'Upload started',
    'Your file is being uploaded to the server. Please do not close this window.',
  )

  setTimeout(() => {
    appStore.notifySuccess(
      'Upload completed',
      'Your file has been successfully uploaded and is now available for download.',
    )
  }, 3500)
}
</script>

