<template>
  <div class="space-y-6">
    <!-- Advanced Toast Examples -->
    <ComponentCard
      title="Advanced Toast Features"
      description="More sophisticated toast notification patterns"
    >
      <div class="space-y-4">
        <!-- Progress Toast -->
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h4 class="text-sm font-semibold text-gray-800 dark:text-white mb-2">
            Progress Toast Example
          </h4>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Toast with progress tracking for long-running operations
          </p>
          <Button @click="simulateProgressToast" variant="primary" class="w-full sm:w-auto">
            Start Progress Toast
          </Button>
        </div>

        <!-- Action Toast -->
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h4 class="text-sm font-semibold text-gray-800 dark:text-white mb-2">Actionable Toast</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Toast with action button for user interaction
          </p>
          <Button @click="showActionToast" variant="secondary" class="w-full sm:w-auto">
            Show Action Toast
          </Button>
        </div>

        <!-- Conditional Toast -->
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h4 class="text-sm font-semibold text-gray-800 dark:text-white mb-2">
            Conditional Toasts
          </h4>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Different toasts based on operation results
          </p>
          <div class="flex gap-2">
            <Button @click="simulateSuccessOperation" variant="primary" size="sm">
              Success Operation
            </Button>
            <Button @click="simulatePartialOperation" variant="warning" size="sm">
              Partial Success
            </Button>
            <Button @click="simulateFailedOperation" variant="danger" size="sm">
              Failed Operation
            </Button>
          </div>
        </div>
      </div>
    </ComponentCard>

    <!-- Toast Positioning Options -->
    <ComponentCard
      title="Toast Positioning & Styling"
      description="Different positioning and styling options (future enhancements)"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 class="text-sm font-semibold text-gray-800 dark:text-white mb-2">Current Position</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Top-right corner with vertical stacking
          </p>
          <div
            class="w-full h-20 bg-white dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg relative"
          >
            <div class="absolute top-2 right-2 w-16 h-3 bg-green-500 rounded opacity-75"></div>
            <div class="absolute top-6 right-2 w-16 h-3 bg-blue-500 rounded opacity-75"></div>
            <div class="absolute top-10 right-2 w-16 h-3 bg-orange-500 rounded opacity-75"></div>
          </div>
        </div>

        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 class="text-sm font-semibold text-gray-800 dark:text-white mb-2">Future Options</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Potential positioning variations
          </p>
          <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Top-left corner</li>
            <li>• Bottom-right corner</li>
            <li>• Bottom-left corner</li>
            <li>• Center overlay</li>
          </ul>
        </div>
      </div>
    </ComponentCard>

    <!-- Integration Patterns -->
    <ComponentCard title="Common Integration Patterns">
      <div class="space-y-4">
        <!-- Form Validation Pattern -->
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h4 class="text-sm font-semibold text-gray-800 dark:text-white mb-2">
            Form Validation Pattern
          </h4>
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-3">
            <pre
              class="text-xs text-gray-700 dark:text-gray-300"
            ><code>const validateAndSubmit = async () => {
  if (!formData.email) {
    appStore.notifyWarning('Validation Error', 'Email is required')
    return
  }

  try {
    await submitForm(formData)
    appStore.notifySuccess('Success', 'Form submitted successfully')
  } catch (error) {
    appStore.notifyError('Submission Failed', error.message)
  }
}</code></pre>
          </div>
        </div>

        <!-- API Integration Pattern -->
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h4 class="text-sm font-semibold text-gray-800 dark:text-white mb-2">
            API Integration Pattern
          </h4>
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-3">
            <pre class="text-xs text-gray-700 dark:text-gray-300"><code>// In API interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      appStore.notifyError('Session Expired', 'Please login again')
    } else if (error.response?.status === 500) {
      appStore.notifyError('Server Error', 'Please try again later')
    }
    return Promise.reject(error)
  }
)</code></pre>
          </div>
        </div>
      </div>
    </ComponentCard>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@hivespace/shared'
import { ComponentCard, Button } from '@hivespace/shared'

const appStore = useAppStore()

// Advanced toast examples
const simulateProgressToast = () => {
  // Start progress
  const progressToastId = appStore.notifyInfo(
    'Processing...',
    'Operation in progress. Please wait...',
    0, // Don't auto-close
  )

  // Simulate progress updates
  let progress = 0
  const interval = setInterval(() => {
    progress += 20

    if (progress <= 80) {
      appStore.removeNotification(progressToastId)
      appStore.notifyInfo(`Processing... ${progress}%`, 'Operation in progress. Please wait...', 0)
    } else {
      clearInterval(interval)
      appStore.removeNotification(progressToastId)
      appStore.notifySuccess(
        'Processing Complete!',
        'Your operation has been completed successfully.',
      )
    }
  }, 1000)
}

const showActionToast = () => {
  appStore.addNotification({
    type: 'info',
    title: 'New version available',
    message: 'Click the link below to update to the latest version.',
    duration: 8000,
  })
}

// Conditional operations
const simulateSuccessOperation = () => {
  setTimeout(() => {
    appStore.notifySuccess('Operation Successful', 'All items were processed without any issues.')
  }, 500)
}

const simulatePartialOperation = () => {
  setTimeout(() => {
    appStore.notifyWarning('Partial Success', '8 of 10 items were processed. 2 items had warnings.')
  }, 500)
}

const simulateFailedOperation = () => {
  setTimeout(() => {
    appStore.notifyError(
      'Operation Failed',
      'Unable to process any items. Please check your data and try again.',
    )
  }, 500)
}
</script>

