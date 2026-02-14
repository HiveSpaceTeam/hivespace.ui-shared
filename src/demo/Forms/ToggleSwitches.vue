<template>
  <div class="flex gap-6">
    <ToggleSwitch v-model="isToggled">Default</ToggleSwitch>
    <ToggleSwitch v-model="isChecked">Checked</ToggleSwitch>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ToggleSwitch } from '@hivespace/shared'

const isToggled = ref(false)
const isChecked = ref(true)
</script>

