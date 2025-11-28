<template>
  <img :src="src" :alt="alt" class="w-full h-auto" />
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
})
</script>
