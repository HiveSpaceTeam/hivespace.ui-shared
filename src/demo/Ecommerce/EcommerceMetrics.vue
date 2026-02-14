<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
    >
      <div
        class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800"
      >
        <UserGroupIcon class="fill-gray-800 dark:fill-white/90" width="24" height="24" />
      </div>

      <div class="flex items-end justify-between mt-5">
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Customers</span>
          <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">3,782</h4>
        </div>

        <span
          class="flex items-center gap-1 rounded-full bg-success-50 py-0.5 pl-2 pr-2.5 text-sm font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500"
        >
          <CheckIcon class="fill-current" width="12" height="12" />

          11.01%
        </span>
      </div>
    </div>

    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
    >
      <div
        class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800"
      >
        <TaskIcon class="fill-gray-800 dark:fill-white/90" width="24" height="24" />
      </div>

      <div class="flex items-end justify-between mt-5">
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Orders</span>
          <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">5,359</h4>
        </div>

        <span
          class="flex items-center gap-1 rounded-full bg-error-50 py-0.5 pl-2 pr-2.5 text-sm font-medium text-error-600 dark:bg-error-500/15 dark:text-error-500"
        >
          <ArrowDownRedIcon class="fill-current" width="12" height="12" />

          9.05%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserGroupIcon, CheckIcon, TaskIcon, ArrowDownRedIcon } from '@hivespace/shared'
</script>

