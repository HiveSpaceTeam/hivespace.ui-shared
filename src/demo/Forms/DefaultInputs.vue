<template>
  <div class="space-y-6">
    <!-- Text Input -->
    <div>
      <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        Input
      </label>
      <input type="text" v-model="formData.input"
        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
    </div>

    <!-- Input with Placeholder -->
    <div>
      <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        Input with Placeholder
      </label>
      <input type="text" v-model="formData.inputWithPlaceholder" placeholder="info@gmail.com"
        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
    </div>

    <!-- Select Input -->
    <div>
      <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        Select Input
      </label>
      <div class="relative z-20 bg-transparent">
        <select v-model="formData.selectInput"
          class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          :class="{ 'text-gray-800 dark:text-white/90': formData.selectInput }">
          <option value="" disabled selected>Select Option</option>
          <option value="marketing">Marketing</option>
          <option value="template">Template</option>
          <option value="development">Development</option>
        </select>
        <span
          class="absolute z-30 text-gray-500 -translate-y-1/2 pointer-events-none right-4 top-1/2 dark:text-gray-400">
          <ChevronDownIcon class="stroke-current" width="20" height="20" />
        </span>
      </div>
    </div>

    <!-- Password Input -->
    <div>
      <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        Password Input
      </label>
      <div class="relative">
        <input :type="showPassword ? 'text' : 'password'" v-model="formData.password" placeholder="Enter your password"
          class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
        <span @click="showPassword = !showPassword"
          class="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
          <EyeIcon v-if="!showPassword" class="fill-gray-500 dark:fill-gray-400" width="20" height="20" />
          <EyeOffIcon v-else class="fill-gray-500 dark:fill-gray-400" width="20" height="20" />
        </span>
      </div>
    </div>

    <!-- Date Picker Input -->
    <div>
      <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        Date Picker Input
      </label>
      <DatePicker v-model="date" />
    </div>

    <!-- Time Select Input -->
    <div>
      <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        Time Select Input
      </label>
      <TimePicker v-model="time" />
    </div>

    <!-- Input with Payment -->
    <div>
      <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        Input with Payment
      </label>
      <div class="relative">
        <input type="text" v-model="formData.cardNumber" placeholder="Card number"
          class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-[62px] text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
        <span
          class="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
          <PaymentIcon width="20" height="20" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { EyeIcon, EyeOffIcon, PaymentIcon } from '@hivespace/shared'
import { DatePicker, TimePicker } from '@hivespace/shared'

const showPassword = ref(false)

const formData = reactive({
  input: '',
  inputWithPlaceholder: '',
  selectInput: '',
  password: '',
  date: '',
  time: '',
  cardNumber: '',
})

const date = ref(null)

// configs moved into DatePicker/TimePicker components

const time = ref(null)
</script>

