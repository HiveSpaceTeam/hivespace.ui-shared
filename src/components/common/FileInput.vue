<template>
  <div v-if="previewDirection === 'top'" class="flex flex-col items-center space-y-4">
    <!-- Image Preview (Top) -->
    <div class="relative">
      <div
        :class="[
          `${previewSizeClasses} ${previewShapeClasses}`,
          'border-2 border-dashed bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden cursor-pointer transition-colors',
          displayError
            ? 'border-red-500 dark:border-red-500'
            : 'border-gray-300 dark:border-gray-600 hover:border-brand-500',
        ]"
        @click="triggerFileInput"
      >
        <div v-if="!imagePreview" class="text-center">
          <svg
            :class="
              props.previewSize === 'sm'
                ? 'w-6 h-6'
                : props.previewSize === 'lg'
                  ? 'w-10 h-10'
                  : 'w-8 h-8'
            "
            class="text-gray-400 mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <p class="text-xs text-gray-500 dark:text-gray-400">Add Photo</p>
        </div>
        <img v-else :src="imagePreview" :alt="label" :class="previewImageClasses" />
      </div>

      <!-- Remove button when image is selected -->
      <button
        v-if="imagePreview"
        type="button"
        @click.stop="removeImage"
        :class="removeButtonClasses"
      >
        ×
      </button>
    </div>

    <!-- Label and File Input (Top) -->
    <div class="text-center">
      <label v-if="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {{ label }}
      </label>

      <input
        ref="fileInput"
        type="file"
        :accept="accept"
        @change="handleFileChange"
        class="hidden"
      />

      <button
        type="button"
        @click="triggerFileInput"
        class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none"
      >
        {{ defaultButtonText }}
      </button>

      <!-- File info -->
      <div v-if="selectedFile" class="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})
      </div>

      <!-- Error message -->
      <div v-if="displayError" class="mt-2 text-xs text-red-500">
        {{ displayError }}
      </div>

      <!-- Help text -->
      <div v-if="helpText" class="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {{ helpText }}
      </div>
    </div>
  </div>

  <div v-else>
    <label v-if="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {{ label }}
    </label>

    <div class="flex items-center space-x-3">
      <input
        ref="fileInput"
        type="file"
        :accept="accept"
        @change="handleFileChange"
        class="hidden"
      />

      <button
        type="button"
        @click="triggerFileInput"
        class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none"
      >
        {{ defaultButtonText }}
      </button>

      <!-- Image Preview (Right of button) -->
      <div class="relative">
        <div
          :class="[
            `${previewSizeClasses} ${previewShapeClasses}`,
            'border-2 border-dashed bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden cursor-pointer transition-colors',
            displayError
              ? 'border-red-500 dark:border-red-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-brand-500',
          ]"
          @click="triggerFileInput"
        >
          <div v-if="!imagePreview" class="text-center">
            <svg
              :class="
                props.previewSize === 'sm'
                  ? 'w-4 h-4'
                  : props.previewSize === 'lg'
                    ? 'w-8 h-8'
                    : 'w-6 h-6'
              "
              class="text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <img v-else :src="imagePreview" :alt="label" :class="previewImageClasses" />
        </div>

        <!-- Remove button when image is selected -->
        <button
          v-if="imagePreview"
          type="button"
          @click.stop="removeImage"
          :class="removeButtonClasses"
        >
          ×
        </button>
      </div>
    </div>

    <!-- File info -->
    <div v-if="selectedFile" class="mt-2 text-xs text-gray-500 dark:text-gray-400">
      {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})
    </div>

    <!-- Error message -->
    <div v-if="displayError" class="mt-2 text-xs text-red-500">
      {{ displayError }}
    </div>

    <!-- Help text -->
    <div v-if="helpText" class="mt-1 text-xs text-gray-500 dark:text-gray-400">
      {{ helpText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  label?: string
  accept?: string
  maxSize?: number // in bytes
  previewDirection?: 'top' | 'right'
  buttonText?: string
  helpText?: string
  required?: boolean
  modelValue?: File | null
  previewSize?: 'sm' | 'md' | 'lg'
  previewShape?: 'circle' | 'square' | 'rectangle'
  error?: string
}

interface Emits {
  (e: 'update:modelValue', file: File | null): void
  (e: 'change', file: File | null): void
  (e: 'error', message: string): void
}

const { t } = useI18n()

const props = withDefaults(defineProps<Props>(), {
  accept: 'image/*',
  maxSize: 5 * 1024 * 1024, // 5MB default
  previewDirection: 'top',
  buttonText: undefined,
  required: false,
  previewSize: 'md',
  previewShape: 'circle',
})

const defaultButtonText = computed(() => props.buttonText || t('component.fileInput.chooseFile'))

const emit = defineEmits<Emits>()

const fileInput = ref<HTMLInputElement>()
const selectedFile = ref<File | null>(props.modelValue || null)
const imagePreview = ref<string | null>(null)
const errorMessage = ref<string>('')

// Computed properties for dynamic classes
const previewSizeClasses = computed(() => {
  if (props.previewShape === 'rectangle') {
    // For rectangles, use different width/height ratios
    switch (props.previewSize) {
      case 'sm':
        return 'w-16 h-12'
      case 'md':
        return 'w-20 h-16'
      case 'lg':
        return 'w-32 h-24'
      default:
        return 'w-20 h-16'
    }
  } else {
    // For circles and squares, keep equal dimensions
    switch (props.previewSize) {
      case 'sm':
        return 'w-12 h-12'
      case 'md':
        return 'w-16 h-16'
      case 'lg':
        return 'w-24 h-24'
      default:
        return 'w-16 h-16'
    }
  }
})

const previewShapeClasses = computed(() => {
  switch (props.previewShape) {
    case 'circle':
      return 'rounded-full'
    case 'square':
      return 'rounded-lg'
    case 'rectangle':
      return 'rounded-lg'
    default:
      return 'rounded-full'
  }
})

const previewImageClasses = computed(() => {
  const baseClasses = 'w-full h-full object-cover'
  return `${baseClasses} ${previewShapeClasses.value}`
})

const removeButtonClasses = computed(() => {
  const baseClasses =
    'absolute bg-red-500 text-white flex items-center justify-center text-xs hover:bg-red-600 transition-colors'
  const sizeClasses =
    props.previewSize === 'sm'
      ? 'w-4 h-4 -top-1 -right-1'
      : props.previewSize === 'lg'
        ? 'w-6 h-6 -top-2 -right-2'
        : 'w-5 h-5 -top-1 -right-1'
  return `${baseClasses} ${sizeClasses} rounded-full`
})

const displayError = computed(() => {
  // Return external error if provided
  if (props.error) return props.error
  // Return internal error if exists
  if (errorMessage.value) return errorMessage.value
  // Return required error if field is required and no file is selected
  if (props.required && !selectedFile.value) return 'This field is required'
  return ''
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0] || null

  if (file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      const error = 'Please select an image file'
      errorMessage.value = error
      emit('error', error)
      return
    }

    // Validate file size
    if (file.size > props.maxSize) {
      const error = `File size must be less than ${formatFileSize(props.maxSize)}`
      errorMessage.value = error
      emit('error', error)
      return
    }

    selectedFile.value = file
    errorMessage.value = ''

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)

    emit('update:modelValue', file)
    emit('change', file)
  } else {
    removeImage()
  }
}

const removeImage = () => {
  selectedFile.value = null
  imagePreview.value = null
  errorMessage.value = ''

  if (fileInput.value) {
    fileInput.value.value = ''
  }

  emit('update:modelValue', null)
  emit('change', null)
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>
