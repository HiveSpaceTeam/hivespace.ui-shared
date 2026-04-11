<template>
  <div class="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-999">
    <div
      class="fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]"
      aria-hidden="true"
      @click="$emit('close')"
    ></div>
    <div class="relative z-10 flex items-center justify-center w-full px-4 py-8">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

onMounted(() => { document.body.style.overflow = 'hidden' })
onUnmounted(() => { document.body.style.overflow = '' })
</script>
