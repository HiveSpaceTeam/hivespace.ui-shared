<template>
  <div class="flex flex-col gap-5">
    <RadioGroup
      v-model="selectedRadio1"
      :options="radioOptions1"
      name="radioGroupExample1"
      direction="horizontal"
    />
    <RadioGroup
      v-model="selectedRadio2"
      :options="radioOptions2"
      name="radioGroupExample2"
      direction="vertical"
    />
    <!-- New single Radio for demo -->
    <div>
      <Radio v-model="selectedSingleRadio" value="single" name="singleRadioExample">
        Single Radio
      </Radio>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup, Radio } from '@hivespace/shared'

const selectedRadio1 = ref('default')
const radioOptions1 = [
  { label: 'Default', value: 'default' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Disabled', value: 'disabled1', disabled: true },
]

const selectedRadio2 = ref('optionA')
const radioOptions2 = [
  { label: 'Option A', value: 'optionA' },
  { label: 'Option B', value: 'optionB' },
  { label: 'Disabled C', value: 'disabledC', disabled: true },
]

const selectedSingleRadio = ref('single') // New ref for the single radio
</script>

