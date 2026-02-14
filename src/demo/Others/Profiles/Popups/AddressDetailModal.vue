<template>
  <!-- Address Detail Modal Content -->
  <div class="w-full max-w-[700px] overflow-y-auto">
    <form class="flex flex-col">
      <div class="custom-scrollbar overflow-y-auto p-2">
        <div>
          <h5 class="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">Address</h5>

          <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div>
              <Input id="address-country" v-model="form.country" label="Country" type="text" />
            </div>

            <div>
              <Input
                id="address-citystate"
                v-model="form.cityState"
                label="City/State"
                type="text"
              />
            </div>

            <div>
              <Input
                id="address-postal"
                v-model="form.postalCode"
                label="Postal Code"
                type="text"
              />
            </div>

            <div>
              <Input id="address-tax" v-model="form.taxId" label="TAX ID" type="text" />
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button variant="outline" type="button" :onClick="() => emit('close')">Close</Button>
          <Button variant="primary" type="button" :onClick="saveAddress">Save Changes</Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { Input, Button } from '@hivespace/shared'

const emit = defineEmits(['close'])

const form = reactive({
  country: 'United States',
  cityState: 'Phoenix, Arizona, United States',
  postalCode: 'ERT 2489',
  taxId: 'AS4568384',
})

function saveAddress() {
  // TODO: Persist address edits
  emit('close')
}
</script>

<style scoped>
/* Add component-specific styles here if needed */
</style>

