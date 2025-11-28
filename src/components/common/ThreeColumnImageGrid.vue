<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
    <img
      v-for="(src, i) in images"
      :key="i"
      :src="src"
      class="w-full h-auto rounded-lg object-cover"
      alt="Image"
    />
  </div>
</template>

<script setup lang="ts">
const images = [
  '/images/product/product-01.png',
  '/images/product/product-02.png',
  '/images/product/product-03.png',
]
</script>
