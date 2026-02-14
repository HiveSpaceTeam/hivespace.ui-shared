<template>
  
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Responsive Image">
        <ResponsiveImage src="https://placehold.co/600x400" alt="Sample image" />
      </ComponentCard>
    </div>
  
</template>

<script setup>
import { ref } from 'vue'

import { PageBreadcrumb, ComponentCard, ResponsiveImage } from '@hivespace/shared'
const currentPageTitle = ref('Images')
</script>

<style></style>

