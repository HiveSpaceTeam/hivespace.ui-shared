<template>
  <Teleport to="body">
    <div v-if="visible" class="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div class="flex flex-col items-center gap-3">
        <div class="inline-block animate-spin rounded-full h-14 w-14 border-b-2 border-brand-500"></div>
        <span v-if="message" class="text-gray-600 dark:text-gray-400 text-base font-medium drop-shadow">{{ message
        }}</span>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
  message?: string
}>()
</script>
