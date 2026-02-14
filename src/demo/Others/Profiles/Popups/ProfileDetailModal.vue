<template>
  <!-- This is a specific modal implementation -->
  <div class="w-full max-w-[700px] overflow-y-auto">
    <form class="flex flex-col">
      <div class="custom-scrollbar h-[458px] overflow-y-auto p-2">
        <div>
          <h5 class="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
            Social Links
          </h5>

          <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div>
              <Input id="profile-facebook" v-model="form.facebook" label="Facebook" type="text" />
            </div>

            <div>
              <Input id="profile-xcom" v-model="form.x" label="X.com" type="text" />
            </div>

            <div>
              <Input id="profile-linkedin" v-model="form.linkedin" label="Linkedin" type="text" />
            </div>

            <div>
              <Input
                id="profile-instagram"
                v-model="form.instagram"
                label="Instagram"
                type="text"
              />
            </div>
          </div>
        </div>
        <div class="mt-7">
          <h5 class="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h5>

          <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div class="col-span-2 lg:col-span-1">
              <Input
                id="profile-firstName"
                v-model="form.firstName"
                label="First Name"
                type="text"
              />
            </div>

            <div class="col-span-2 lg:col-span-1">
              <Input id="profile-lastName" v-model="form.lastName" label="Last Name" type="text" />
            </div>

            <div class="col-span-2 lg:col-span-1">
              <Input id="profile-email" v-model="form.email" label="Email Address" type="text" />
            </div>

            <div class="col-span-2">
              <Input id="profile-bio" v-model="form.bio" label="Bio" type="text" />
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="flex items-center gap-3 px-2 mt-6 lg:justify-end">
      <Button variant="outline" type="button" :onClick="() => emit('close')">Close</Button>
      <Button variant="primary" type="button" :onClick="saveProfile">Save Changes</Button>
    </div>
  </div>
</template>

<script setup>
import { reactive, defineProps, defineEmits } from 'vue'
import { Input, Button } from '@hivespace/shared'

defineProps({
  userId: Number,
  userName: String,
})

const emit = defineEmits(['close'])

function saveProfile() {
  // TODO: Persist profile edits
  emit('close')
}

const form = reactive({
  facebook: 'https://www.facebook.com/PimjoHQ',
  x: 'https://x.com/PimjoHQ',
  linkedin: 'https://www.linkedin.com/company/pimjo/posts/?feedView=all',
  instagram: 'https://instagram.com/PimjoHQ',
  firstName: 'Musharof',
  lastName: 'Chowdhury',
  email: 'randomuser@pimjo.com',
  bio: 'Team Manager',
})
</script>

<style scoped>
.user-info {
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
}
</style>

