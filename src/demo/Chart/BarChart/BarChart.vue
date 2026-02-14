<template>
  
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Bar Chart 1">
        <BarChartOne />
      </ComponentCard>
    </div>
  
</template>

<script setup>
import { ComponentCard, PageBreadcrumb, BarChartOne } from '@hivespace/shared';

import { ref } from 'vue';
const currentPageTitle = ref('Bar Chart');
</script>

