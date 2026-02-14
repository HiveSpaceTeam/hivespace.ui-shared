<template>
  <div>
    <div class="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 class="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">Address</h4>

          <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Country</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">United States</p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">City/State</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                Phoenix, United States
              </p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Postal Code
              </p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">ERT 2489</p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">TAX ID</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">AS4568384</p>
            </div>
          </div>
        </div>

        <button @click="showAddressDetailModal"
          class="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
          <EditIcon />
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { EditIcon, TrashIcon } from '@hivespace/shared'
import AddressDetailModal from './Popups/AddressDetailModal.vue';
import { useModal } from '@hivespace/shared';

const { openModal } = useModal();

const showAddressDetailModal = () => {
  openModal(AddressDetailModal, {
    title: 'Edit Address',
  });
};
</script>

<style></style>

