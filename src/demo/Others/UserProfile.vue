<template>
  
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 lg:p-6">
      <h3 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Profile</h3>
      <profile-card />
      <personal-info-card />
      <address-card />
    </div>
  
</template>

<script setup>

import { PageBreadcrumb } from '@hivespace/shared';
import { ref } from 'vue';
import ProfileCard from './Profiles/ProfileCard.vue';
import PersonalInfoCard from './Profiles/PersonalInfoCard.vue';
import AddressCard from './Profiles/AddressCard.vue';
const currentPageTitle = ref('User Profile');
</script>

