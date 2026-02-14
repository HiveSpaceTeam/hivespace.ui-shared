<template>
  
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-2">
      <div class="space-y-5 sm:space-y-6">
        <ComponentCard title="Video Ratio 16:9">
          <YouTubeEmbed videoId="dQw4w9WgXcQ" />
        </ComponentCard>
        <ComponentCard title="Video Ratio 4:3">
          <YouTubeEmbed videoId="dQw4w9WgXcQ" aspectRatio="4:3" />
        </ComponentCard>
      </div>
      <div class="space-y-5 sm:space-y-6">
        <ComponentCard title="Video Ratio 21:9">
          <YouTubeEmbed videoId="dQw4w9WgXcQ" aspectRatio="21:9" />
        </ComponentCard>
        <ComponentCard title="Video Ratio 1:1">
          <YouTubeEmbed videoId="dQw4w9WgXcQ" aspectRatio="1:1" />
        </ComponentCard>
      </div>
    </div>
  
</template>

<script setup>
import { ref } from 'vue'

import { PageBreadcrumb, ComponentCard, YouTubeEmbed } from '@hivespace/shared'
const currentPageTitle = ref('Videos')
</script>

<style></style>

