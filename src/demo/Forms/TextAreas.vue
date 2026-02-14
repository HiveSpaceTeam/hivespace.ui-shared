<template>
  <div class="space-y-6">
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        TextArea Component Examples
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        Various examples of the TextArea component with different configurations.
      </p>
    </div>

    <!-- Basic TextArea -->
    <div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Basic TextArea</h3>
      <TextArea
        v-model="basicDescription"
        label="Description"
        placeholder="Enter a description..."
        :rows="4"
      />
    </div>

    <!-- Required TextArea -->
    <div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Required TextArea</h3>
      <TextArea
        v-model="requiredDescription"
        label="Required Description"
        placeholder="This field is required..."
        :rows="3"
        :required="true"
      />
    </div>

    <!-- Disabled TextArea -->
    <div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Disabled TextArea</h3>
      <TextArea
        v-model="disabledDescription"
        label="Disabled Description"
        placeholder="Enter a description..."
        :rows="4"
        :disabled="true"
      />
    </div>

    <!-- TextArea with Error -->
    <div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">
        TextArea with Error State
      </h3>
      <TextArea
        v-model="errorDescription"
        label="Description with Error"
        placeholder="Enter a description..."
        :rows="4"
        error="Please enter a valid description."
      />
    </div>

    <!-- Different Label Positions -->
    <div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">
        Different Label Positions
      </h3>

      <!-- Label on Left -->
      <div class="mb-4">
        <h4 class="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Label on Left</h4>
        <TextArea
          v-model="leftLabelDescription"
          label="Description"
          label-position="left"
          placeholder="Description with left label..."
          :rows="3"
        />
      </div>

      <!-- Label on Right -->
      <div class="mb-4">
        <h4 class="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Label on Right</h4>
        <TextArea
          v-model="rightLabelDescription"
          label="Description"
          label-position="right"
          placeholder="Description with right label..."
          :rows="3"
        />
      </div>

      <!-- Label on Bottom -->
      <div class="mb-4">
        <h4 class="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Label on Bottom</h4>
        <TextArea
          v-model="bottomLabelDescription"
          label="Description"
          label-position="bottom"
          placeholder="Description with bottom label..."
          :rows="3"
        />
      </div>
    </div>

    <!-- Different Sizes -->
    <div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Different Sizes</h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Small -->
        <div>
          <h4 class="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Small (2 rows)</h4>
          <TextArea
            v-model="smallDescription"
            label="Small TextArea"
            placeholder="Small textarea..."
            :rows="2"
          />
        </div>

        <!-- Medium -->
        <div>
          <h4 class="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Medium (4 rows)</h4>
          <TextArea
            v-model="mediumDescription"
            label="Medium TextArea"
            placeholder="Medium textarea..."
            :rows="4"
          />
        </div>

        <!-- Large -->
        <div>
          <h4 class="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Large (6 rows)</h4>
          <TextArea
            v-model="largeDescription"
            label="Large TextArea"
            placeholder="Large textarea..."
            :rows="6"
          />
        </div>
      </div>
    </div>

    <!-- Custom TextArea Class -->
    <div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Custom Styling</h3>
      <TextArea
        v-model="customDescription"
        label="Custom Styled TextArea"
        placeholder="TextArea with custom styling..."
        :rows="4"
        textarea-class="border-2 border-blue-300 focus:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
      />
    </div>

    <!-- Form Example -->
    <div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Form Example</h3>
      <form @submit.prevent="handleSubmit" class="space-y-4 max-w-md">
        <TextArea
          v-model="formData.message"
          label="Message"
          placeholder="Enter your message..."
          :rows="4"
          :required="true"
          :error="formErrors.message"
        />

        <TextArea
          v-model="formData.notes"
          label="Additional Notes"
          placeholder="Any additional notes (optional)..."
          :rows="3"
        />

        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>

    <!-- Values Display -->
    <div class="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Current Values</h3>
      <div class="space-y-2 text-sm">
        <div><strong>Basic:</strong> {{ basicDescription || 'Empty' }}</div>
        <div><strong>Required:</strong> {{ requiredDescription || 'Empty' }}</div>
        <div><strong>Disabled:</strong> {{ disabledDescription || 'Empty' }}</div>
        <div><strong>Error:</strong> {{ errorDescription || 'Empty' }}</div>
        <div><strong>Left Label:</strong> {{ leftLabelDescription || 'Empty' }}</div>
        <div><strong>Right Label:</strong> {{ rightLabelDescription || 'Empty' }}</div>
        <div><strong>Bottom Label:</strong> {{ bottomLabelDescription || 'Empty' }}</div>
        <div><strong>Small:</strong> {{ smallDescription || 'Empty' }}</div>
        <div><strong>Medium:</strong> {{ mediumDescription || 'Empty' }}</div>
        <div><strong>Large:</strong> {{ largeDescription || 'Empty' }}</div>
        <div><strong>Custom:</strong> {{ customDescription || 'Empty' }}</div>
        <div><strong>Form Message:</strong> {{ formData.message || 'Empty' }}</div>
        <div><strong>Form Notes:</strong> {{ formData.notes || 'Empty' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { TextArea } from '@hivespace/shared'

// Basic examples
const basicDescription = ref('')
const requiredDescription = ref('')
const disabledDescription = ref('This textarea is disabled and cannot be edited')
const errorDescription = ref('')

// Label position examples
const leftLabelDescription = ref('')
const rightLabelDescription = ref('')
const bottomLabelDescription = ref('')

// Size examples
const smallDescription = ref('')
const mediumDescription = ref('')
const largeDescription = ref('')

// Custom styling example
const customDescription = ref('')

// Form example
const formData = reactive({
  message: '',
  notes: '',
})

const formErrors = reactive({
  message: '',
})

const handleSubmit = () => {
  // Reset errors
  formErrors.message = ''

  // Validate
  if (!formData.message.trim()) {
    formErrors.message = 'Message is required'
    return
  }

  // Success
  alert(`Form submitted!\nMessage: ${formData.message}\nNotes: ${formData.notes || 'None'}`)
}
</script>

