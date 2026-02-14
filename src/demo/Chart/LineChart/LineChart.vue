<template>
  
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Line Chart 1">
        <LineChartOne />
      </ComponentCard>
    </div>
  
</template>

<script setup>
import { ComponentCard, PageBreadcrumb, LineChartOne } from '@hivespace/shared';

import { ref } from 'vue';
const currentPageTitle = ref('Line Chart');
</script>

