<template>
  <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
    <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90" x-text="pageTitle">
      {{ pageTitle }}
    </h2>
    <nav>
      <ol class="flex items-center gap-1.5">
        <li>
          <router-link class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400" to="/">
            {{ $t('common.home') }}
            <BreadcrumbArrowIcon />
          </router-link>
        </li>
        <li class="text-sm text-gray-800 dark:text-white/90">
          {{ pageTitle }}
        </li>
      </ol>
    </nav>
  </div>
</template>

<script setup lang="ts">

import BreadcrumbArrowIcon from '../../icons/BreadcrumbArrowIcon.vue'

interface BreadcrumbProps {
  pageTitle: string
}

defineProps<BreadcrumbProps>()
</script>
