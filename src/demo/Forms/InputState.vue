<template>
  <div class="space-y-6">
    <!-- Error State Input -->
    <div>
      <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        Email
      </label>
      <div class="relative">
        <input
          type="text"
          v-model="errorEmail"
          class="dark:bg-dark-900 w-full rounded-lg border border-error-300 bg-transparent px-4 py-2.5 pr-10 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-error-300 focus:outline-hidden focus:ring-3 focus:ring-error-500/10 dark:border-error-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-error-800"
        />
        <span class="absolute right-3.5 top-1/2 -translate-y-1/2">
          <InputErrorIcon width="16" height="16" />
        </span>
      </div>
      <p class="mt-1.5 text-theme-xs text-error-500">This is an error message.</p>
    </div>

    <!-- Success State Input -->
    <div>
      <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        Email
      </label>
      <div class="relative">
        <input
          type="text"
          v-model="successEmail"
          class="dark:bg-dark-900 w-full rounded-lg border border-success-300 bg-transparent px-4 py-2.5 pr-10 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-success-300 focus:outline-hidden focus:ring-3 focus:ring-success-500/10 dark:border-success-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-success-800"
        />
        <span class="absolute right-3.5 top-1/2 -translate-y-1/2">
          <InputSuccessIcon width="16" height="16" />
        </span>
      </div>
      <p class="mt-1.5 text-theme-xs text-success-500">This is a success message.</p>
    </div>

    <!-- Disabled State Input -->
    <div>
      <label class="mb-1.5 block text-sm font-medium text-gray-300 dark:text-white/15">
        Email
      </label>
      <input
        type="text"
        placeholder="info@gmail.com"
        disabled
        class="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:shadow-focus-ring focus:outline-hidden disabled:border-gray-100 disabled:placeholder:text-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-400 dark:focus:border-brand-300 dark:disabled:border-gray-800 dark:disabled:placeholder:text-white/15"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { InputErrorIcon, InputSuccessIcon } from '@hivespace/shared'

const errorEmail = ref('demoemail')
const successEmail = ref('demoemail@gmail.com')
</script>
```

