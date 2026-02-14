<template>
  
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Basic Table 1">
        <BasicTableOne />
      </ComponentCard>
    </div>
  
</template>

<script setup>
import { ref } from 'vue'

import { PageBreadcrumb, ComponentCard, BasicTableOne } from '@hivespace/shared'

const currentPageTitle = ref('Basic Tables')
</script>

