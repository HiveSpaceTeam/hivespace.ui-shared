<template>
  <div>
    <div class="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div class="flex flex-col items-center w-full gap-6 xl:flex-row">
          <div class="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
            <!-- <img src="/images/user/owner.jpg" alt="user" /> -->
          </div>
          <div class="order-3 xl:order-2">
            <h4 class="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
              John Doe
            </h4>
            <div class="flex items-center justify-center gap-2 xl:justify-start">
              <a href="https://www.facebook.com/PimjoHQ" target="_blank" rel="noopener" class="social-button">
                <FacebookIcon class="fill-current" width="20" height="20" />
              </a>
              <a href="https://x.com/PimjoHQ" target="_blank" rel="noopener" class="social-button">
                <XIcon class="fill-current" width="20" height="20" />
              </a>
              <a href="https://www.linkedin.com/company/pimjo/" target="_blank" rel="noopener" class="social-button">
                <LinkedInIcon class="fill-current" width="20" height="20" />
              </a>
              <a href="https://www.instagram.com/PimjoHQ" target="_blank" rel="noopener" class="social-button">
                <InstagramIcon class="fill-current" width="20" height="20" />
              </a>
            </div>
          </div>
        </div>
        <button @click="showProfileDetailModal" class="edit-button">
          <EditIcon class="fill-current" width="18" height="18" />
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FacebookIcon, XIcon, LinkedInIcon, InstagramIcon, EditIcon } from '@hivespace/shared';
import ProfileDetailModal from './Popups/ProfileDetailModal.vue';
import { useModal } from '@hivespace/shared';
const { openModal } = useModal();
const showProfileDetailModal = () => {
  openModal(ProfileDetailModal, {
    title: 'User Profile',
    description: 'Edit user profile information',
    userId: 101,
    userName: 'Alice',
  });
};
</script>
