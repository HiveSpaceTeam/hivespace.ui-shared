<template>
  <div class="flex items-center justify-between w-full">
    <!-- Mobile View -->
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        :class="[
          'relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
          currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
        ]"
      >
        Trước
      </button>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        :class="[
          'relative ml-3 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
          currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
        ]"
      >
        Sau
      </button>
    </div>

    <!-- Desktop View -->
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div class="flex items-center">
        <slot name="summary">
          <p v-if="totalItems !== undefined" class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, totalItems) }} of {{ totalItems }} entries
          </p>
        </slot>
      </div>
      <div>
        <nav class="isolate inline-flex items-center gap-2" aria-label="Pagination">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            :class="[
              'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300',
              currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
            ]"
          >
            <span class="sr-only">Previous</span>
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          
          <template v-for="(page, index) in pageNumbers" :key="index">
            <span
              v-if="page === '...'"
              class="inline-flex h-9 w-9 items-center justify-center text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              ...
            </span>
            <button
              v-else
              @click="goToPage(page as number)"
              :aria-current="page === currentPage ? 'page' : undefined"
              :class="[
                page === currentPage
                  ? 'inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none dark:bg-brand-500'
                  : 'inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
              ]"
            >
              {{ page }}
            </button>
          </template>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            :class="[
              'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300',
              currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
            ]"
          >
            <span class="sr-only">Next</span>
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    currentPage: number
    totalPages: number
    pageSize: number
    totalItems?: number
  }>(),
  {}
)

const emit = defineEmits<{
  'update:currentPage': [page: number]
  'pageChange': [page: number]
}>()

// Generate page numbers with ellipsis pattern
const pageNumbers = computed(() => {
  const current = props.currentPage
  const total = props.totalPages
  
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  if (current <= 3) {
    return [1, 2, 3, 4, '...', total - 1, total]
  }

  if (current >= total - 2) {
    return [1, 2, '...', total - 3, total - 2, total - 1, total]
  }

  return [1, '...', current - 1, current, current + 1, '...', total]
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:currentPage', page)
    emit('pageChange', page)
  }
}
</script>
