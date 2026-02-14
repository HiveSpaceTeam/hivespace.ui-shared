<template>
  <div class="space-y-6">
    <!-- Single Select Input using Select -->
    <div>
      <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        Select Input
      </label>
      <div class="">
        <Select
          v-model="singleSelect"
          :options="options"
          :buttonClass="'h-11 w-full text-left px-4 py-2.5 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white flex justify-between items-center'"
          placeholder="Select Option"
        />
      </div>
    </div>

    <!-- Multiple Select Input -->
    <div>
      <MultipleSelect
        v-model="selectedItems"
        :options="options"
        class="w-full"
        label="Multi select"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MultipleSelect, Select } from '@hivespace/shared'

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'graphs', label: 'Graphs' },
]

const selectedItems = ref([])

const singleSelect = ref('')
</script>

