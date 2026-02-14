<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center gap-8">
      <!-- Default Checkbox -->
      <div>
        <Checkbox v-model="checkboxOne">Default</Checkbox>
      </div>

      <!-- Checked Checkbox -->
      <div>
        <Checkbox v-model="checkboxTwo">Checked</Checkbox>
      </div>

      <!-- Disabled Checkbox -->
      <div>
        <Checkbox v-model="checkboxThree" :disabled="true">Disabled</Checkbox>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkboxOne = ref(false)
const checkboxTwo = ref(true)
const checkboxThree = ref(true)

import { Checkbox } from '@hivespace/shared'
</script>

