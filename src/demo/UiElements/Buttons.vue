<template>
  
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Primary Button">
        <div class="flex items-center gap-5">
          <Button size="sm" variant="primary"> Button Text </Button>
          <Button size="md" variant="primary"> Button Text </Button>
        </div>
      </ComponentCard>
      <ComponentCard title="Primary Button with Left Icon">
        <div class="flex items-center gap-5">
          <Button size="sm" variant="primary" :startIcon="BoxIcon"> Button Text </Button>
          <Button size="md" variant="primary" :startIcon="BoxIcon"> Button Text </Button>
        </div>
      </ComponentCard>
      <ComponentCard title="Primary Button with Right Icon">
        <div class="flex items-center gap-5">
          <Button size="sm" variant="primary" :endIcon="BoxIcon"> Button Text </Button>
          <Button size="md" variant="primary" :endIcon="BoxIcon"> Button Text </Button>
        </div>
      </ComponentCard>
      <ComponentCard title="Primary Button">
        <div class="flex items-center gap-5">
          <Button size="sm" variant="outline"> Button Text </Button>
          <Button size="md" variant="outline"> Button Text </Button>
        </div>
      </ComponentCard>
      <ComponentCard title="Primary Button with Left Icon">
        <div class="flex items-center gap-5">
          <Button size="sm" variant="outline" :startIcon="BoxIcon"> Button Text </Button>
          <Button size="md" variant="outline" :startIcon="BoxIcon"> Button Text </Button>
        </div>
      </ComponentCard>
      <ComponentCard title="Primary Button with Right Icon">
        <div class="flex items-center gap-5">
          <Button size="sm" variant="outline" :endIcon="BoxIcon"> Button Text </Button>
          <Button size="md" variant="outline" :endIcon="BoxIcon"> Button Text </Button>
        </div>
      </ComponentCard>
    </div>
  
</template>

<script setup>
import { ref } from 'vue'

import { PageBreadcrumb, ComponentCard, Button } from '@hivespace/shared'
import { BoxIcon } from '@hivespace/shared'
const currentPageTitle = ref('Buttons')
</script>

<style></style>

