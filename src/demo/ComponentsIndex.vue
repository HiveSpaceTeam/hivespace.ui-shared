<template>
  
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <!-- Demo Overview -->
      <ComponentCard title="HiveSpace Admin Portal - Component Library"
        description="Interactive components showcase for developers">
        <div class="space-y-6">
          <p class="text-gray-600 dark:text-gray-400">
            This section contains all the UI components and features available in the HiveSpace
            Admin Portal. Use these examples as reference for your development work.
          </p>

          <div
            class="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <InfoIcon class="w-5 h-5 text-blue-500" />
            <p class="text-sm text-blue-700 dark:text-blue-300">
              Access this demo section at:
              <code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">/demo/components</code>
            </p>
          </div>
        </div>
      </ComponentCard>

      <!-- UI Elements -->
      <ComponentCard title="UI Elements">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <router-link to="/demo/toast"
            class="block p-6 bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl hover:shadow-lg transition-all duration-200 group">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <SuccessIcon class="w-5 h-5 text-white" />
              </div>
              <h3
                class="font-semibold text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
                Toast Notifications
              </h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Modern popup notifications with auto-dismiss, stacking, and multiple variants.
            </p>
            <div class="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
              <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded">New</span>
              <span>4 variants • Auto-dismiss • Stackable</span>
            </div>
          </router-link>

          <router-link to="/demo/modal"
            class="block p-6 bg-linear-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border border-purple-200 dark:border-purple-800 rounded-xl hover:shadow-lg transition-all duration-200 group">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <h3
                class="font-semibold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                Modal Popups
              </h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Centered modal dialogs for confirmations, alerts, and user interactions with backdrop
              overlay.
            </p>
            <div class="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400">
              <span class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 rounded">New</span>
              <span>Confirm • Alert • Custom • Loading</span>
            </div>
          </router-link>

          <router-link to="/demo/alerts"
            class="block p-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200 group">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <WarningIcon class="w-5 h-5 text-white" />
              </div>
              <h3
                class="font-semibold text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400">
                Alert Components
              </h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Inline alert messages for forms and content areas.
            </p>
            <div class="flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400">
              <span>4 variants • Inline display</span>
            </div>
          </router-link>

          <router-link to="/demo/buttons"
            class="block p-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200 group">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <BoxIcon class="w-5 h-5 text-white" />
              </div>
              <h3
                class="font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Button Components
              </h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Various button styles, sizes, and states for all use cases.
            </p>
            <div class="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
              <span>Multiple variants • Icons • Loading states</span>
            </div>
          </router-link>

          <router-link to="/demo/avatars"
            class="block p-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200 group">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <UserCircleIcon class="w-5 h-5 text-white" />
              </div>
              <h3
                class="font-semibold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                Avatar Components
              </h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              User profile pictures with different sizes and styles.
            </p>
            <div class="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400">
              <span>Multiple sizes • Fallbacks</span>
            </div>
          </router-link>

          <router-link to="/demo/badge"
            class="block p-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200 group">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <StaredIcon class="w-5 h-5 text-white" />
              </div>
              <h3
                class="font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Badge Components
              </h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Status indicators and labels for content categorization.
            </p>
            <div class="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400">
              <span>Status badges • Colors • Sizes</span>
            </div>
          </router-link>

          <router-link to="/demo/images"
            class="block p-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200 group">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <h3
                class="font-semibold text-gray-800 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400">
                Image Components
              </h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Responsive images with various layouts and grids.
            </p>
            <div class="flex items-center gap-2 text-xs text-pink-600 dark:text-pink-400">
              <span>Responsive • Grid layouts</span>
            </div>
          </router-link>
        </div>
      </ComponentCard>

      <!-- Forms -->
      <ComponentCard title="Form Components">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <router-link to="/demo/form-elements"
            class="block p-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200 group">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <EditIcon class="w-5 h-5 text-white" />
              </div>
              <h3
                class="font-semibold text-gray-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                Form Elements
              </h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Complete form inputs, selects, checkboxes, and form validation.
            </p>
            <div class="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
              <span>Inputs • Validation • States</span>
            </div>
          </router-link>

          <router-link to="/demo/quill"
            class="block p-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200 group">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <DocsIcon class="w-5 h-5 text-white" />
              </div>
              <h3
                class="font-semibold text-gray-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                Rich Text Editor
              </h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Quill.js integration for rich text editing capabilities.
            </p>
            <div class="flex items-center gap-2 text-xs text-teal-600 dark:text-teal-400">
              <span>WYSIWYG • Quill.js</span>
            </div>
          </router-link>
        </div>
      </ComponentCard>

      <!-- Data Display -->
      <ComponentCard title="Data Display">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <router-link to="/demo/basic-tables"
            class="block p-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200 group">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                <TableIcon class="w-5 h-5 text-white" />
              </div>
              <h3
                class="font-semibold text-gray-800 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                Data Tables
              </h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Advanced data tables with sorting, filtering, and pagination.
            </p>
            <div class="flex items-center gap-2 text-xs text-cyan-600 dark:text-cyan-400">
              <span>Sorting • Filtering • Responsive</span>
            </div>
          </router-link>

          <router-link to="/demo/line-chart"
            class="block p-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200 group">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center">
                <BarChartIcon class="w-5 h-5 text-white" />
              </div>
              <h3
                class="font-semibold text-gray-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400">
                Line Charts
              </h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Interactive line charts using ApexCharts library.
            </p>
            <div class="flex items-center gap-2 text-xs text-violet-600 dark:text-violet-400">
              <span>ApexCharts • Interactive</span>
            </div>
          </router-link>

          <router-link to="/demo/bar-chart"
            class="block p-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200 group">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <PieChartIcon class="w-5 h-5 text-white" />
              </div>
              <h3
                class="font-semibold text-gray-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                Bar Charts
              </h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Beautiful bar charts with customizable colors and data.
            </p>
            <div class="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
              <span>ApexCharts • Customizable</span>
            </div>
          </router-link>
        </div>
      </ComponentCard>

      <!-- Development Resources -->
      <ComponentCard title="Development Resources">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href="/docs/toast-notification-system.md" target="_blank"
            class="block p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl hover:shadow-lg transition-all duration-200 group">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <DocsIcon class="w-5 h-5 text-white" />
              </div>
              <h3
                class="font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Documentation
              </h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Complete documentation for all components and features.
            </p>
            <div class="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
              <span>API Reference • Examples • Guides</span>
            </div>
          </a>

          <router-link to="/demo/icons"
            class="block p-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200 group">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
                <GridIcon class="w-5 h-5 text-white" />
              </div>
              <h3
                class="font-semibold text-gray-800 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400">
                Icon Library
              </h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Complete icon set with search and usage examples.
            </p>
            <div class="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400">
              <span>70+ icons • SVG • Searchable</span>
            </div>
          </router-link>
        </div>
      </ComponentCard>
    </div>
  
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { PageBreadcrumb, ComponentCard } from '@hivespace/shared'
import {
  BarChartIcon,
  BoxIcon,
  DocsIcon,
  EditIcon,
  GridIcon,
  InfoIcon,
  PieChartIcon,
  StaredIcon,
  SuccessIcon,
  TableIcon,
  UserCircleIcon,
  WarningIcon
} from '@hivespace/shared'

const currentPageTitle = computed(() => 'Component Library')
</script>

