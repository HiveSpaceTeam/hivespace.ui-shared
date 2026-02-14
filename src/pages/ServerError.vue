<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
    <!-- Server Error Page -->
    <!-- Language Switcher and Theme Toggler - Top Right -->
    <div class="absolute top-4 right-4 z-10 flex items-center gap-3">
      <ThemeToggler />
      <LanguageSwitcher />
    </div>

    <div>
      <div class="absolute right-0 top-0 -z-1 w-full max-w-62.5 xl:max-w-112.5">
        <img :src="gridShape" alt="grid" />
      </div>
      <div class="absolute bottom-0 left-0 -z-1 w-full max-w-62.5 rotate-180 xl:max-w-112.5">
        <img :src="gridShape" alt="grid" />
      </div>
    </div>

    <div class="mx-auto w-full max-w-60.5 text-center sm:max-w-140.5">
      <h1 class="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
        {{ t('pages.serverError.title') }}
      </h1>
      <img :src="error500" alt="500" class="dark:hidden" />
      <img :src="error500Dark" alt="500" class="hidden dark:block" />
      <p class="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
        {{ t('pages.serverError.message') }}
      </p>
      <a href="/"
        class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200">
        {{ t('pages.common.backHome') }}
      </a>
    </div>

    <p class="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
      © {{ new Date().getFullYear() }} - HiveSpace
    </p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ThemeToggler, LanguageSwitcher } from '../components'
import gridShape from '../assets/images/shape/grid-01.svg'
import error500 from '../assets/images/error/500.svg'
import error500Dark from '../assets/images/error/500-dark.svg'

const { t } = useI18n()
</script>
