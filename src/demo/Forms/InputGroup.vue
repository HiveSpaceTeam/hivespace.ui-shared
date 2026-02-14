<template>
  <div class="space-y-6">
    <!-- Email Input -->
    <div>
      <Input v-model="email" label="Email" placeholder="info@gmail.com" :inputClass="'pl-[62px]'">
        <template #prepend>
          <span
            class="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
            <MailIcon />
          </span>
        </template>
      </Input>
    </div>

    <!-- Phone Input with Prepended Country Code -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
      <div class="md:col-span-1">
        <Select v-model="selectedCountry" :options="countryOptions" label="Country" placeholder="Select country"
          @change="updatePhoneNumber" />
      </div>
      <div class="md:col-span-3">
        <Input v-model="phoneNumber" label="Phone" placeholder="(555) 000-0000" />
      </div>
    </div>

    <!-- Phone Input Alternative Layout -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
      <div class="md:col-span-3">
        <Input v-model="phoneNumber2" label="Phone" placeholder="(555) 000-0000" />
      </div>
      <div class="md:col-span-1">
        <Select v-model="selectedCountry2" :options="countryOptions" label="Country" placeholder="Select country"
          @change="updatePhoneNumber2" />
      </div>
    </div>

    <!-- URL Input -->
    <div>
      <Input v-model="url" label="URL" placeholder="www.tailadmin.com" :inputClass="'pl-[90px]'">
        <template #prepend>
          <span
            class="absolute left-0 top-1/2 inline-flex h-11 -translate-y-1/2 items-center justify-center border-r border-gray-200 py-3 pl-3.5 pr-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
            http://
          </span>
        </template>
      </Input>
    </div>

    <!-- Website Input with Copy Button -->
    <div>
      <Input v-model="website" label="Website" :inputClass="'pr-[90px] pl-4'">
        <template #append>
          <button @click="copyWebsite"
            class="absolute right-0 top-1/2 inline-flex -translate-y-1/2 cursor-pointer items-center gap-1 border-l border-gray-200 py-3 pl-3.5 pr-3 text-sm font-medium text-gray-700 dark:border-gray-800 dark:text-gray-400">
            <CopyIcon class="fill-current" />
            <div>{{ copyText }}</div>
          </button>
        </template>
      </Input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Input, Select } from '@hivespace/shared'

const email = ref('')
const selectedCountry = ref('US')
const selectedCountry2 = ref('US')
const phoneNumber = ref('')
const phoneNumber2 = ref('')
const url = ref('')
const website = ref('www.tailadmin.com')
const copyText = ref('Copy')

const countryCodes = {
  US: '+1',
  GB: '+44',
  CA: '+1',
  AU: '+61',
}

const countryOptions = [
  { value: 'US', label: 'US +1' },
  { value: 'GB', label: 'GB +44' },
  { value: 'CA', label: 'CA +1' },
  { value: 'AU', label: 'AU +61' },
]

const updatePhoneNumber = () => {
  const countryCode = countryCodes[selectedCountry.value as keyof typeof countryCodes]
  // Only update if phone number doesn't already start with the country code
  if (!phoneNumber.value.startsWith(countryCode)) {
    phoneNumber.value = countryCode + ' ' + phoneNumber.value.replace(/^\+?\d+\s?/, '')
  }
}

const updatePhoneNumber2 = () => {
  const countryCode = countryCodes[selectedCountry2.value as keyof typeof countryCodes]
  // Only update if phone number doesn't already start with the country code
  if (!phoneNumber2.value.startsWith(countryCode)) {
    phoneNumber2.value = countryCode + ' ' + phoneNumber2.value.replace(/^\+?\d+\s?/, '')
  }
}

const copyWebsite = () => {
  navigator.clipboard.writeText(website.value)
  copyText.value = 'Copied!'
  setTimeout(() => {
    copyText.value = 'Copy'
  }, 2000)
}
</script>

