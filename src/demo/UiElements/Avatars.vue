<template>
  
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Default Avatar">
        <div class="flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Avatar :src="avatarSrc" :size="size" v-for="size in sizes" :key="size" />
        </div>
      </ComponentCard>
      <ComponentCard title="Avatar with online indicator">
        <div class="flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Avatar :src="avatarSrc" status="online" :size="size" v-for="size in sizes" :key="size" />
        </div>
      </ComponentCard>
      <ComponentCard title="Avatar with Offline indicator">
        <div class="flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Avatar
            :src="avatarSrc"
            status="offline"
            :size="size"
            v-for="size in sizes"
            :key="size"
          />
        </div>
      </ComponentCard>
      <ComponentCard title="Avatar with busy indicator">
        <div class="flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Avatar :src="avatarSrc" status="busy" :size="size" v-for="size in sizes" :key="size" />
        </div>
      </ComponentCard>
    </div>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { PageBreadcrumb, ComponentCard, Avatar } from '@hivespace/shared'
const currentPageTitle = ref('Avatars')

const avatarSrc = 'https://placehold.co/150'
const sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'] as const
</script>

