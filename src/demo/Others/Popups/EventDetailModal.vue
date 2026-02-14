<template>
  <!-- Event modal content rendered inside global ModalWrapper -->
  <div class="w-full max-w-[700px] overflow-y-auto">
    <form class="flex flex-col">
      <div class="custom-scrollbar overflow-y-auto p-2">
        <div>
          <h5 class="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
            Event Details
          </h5>

          <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div class="col-span-2">
              <Input id="event-title" v-model="form.title" label="Event Title" type="text" />
            </div>

            <div class="col-span-2 lg:col-span-1">
              <DatePicker v-model="form.startDate" label="Start Date" />
            </div>

            <div class="col-span-2 lg:col-span-1">
              <DatePicker v-model="form.endDate" label="End Date" />
            </div>

            <div class="col-span-2">
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Event Color
              </label>
              <div class="flex flex-wrap items-center gap-4 sm:gap-5">
                <div v-for="(value, key) in calendarsEvents" :key="key" class="n-chk">
                  <div :class="`form-check form-check-${value} form-check-inline`">
                    <label
                      class="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                      :for="`modal-${key}`"
                    >
                      <span class="relative">
                        <input
                          type="radio"
                          :name="'event-level'"
                          :value="key"
                          :id="`modal-${key}`"
                          v-model="form.level"
                          class="sr-only form-check-input"
                        />
                        <span
                          class="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700"
                        >
                          <span class="w-2 h-2 bg-white rounded-full dark:bg-transparent"></span>
                        </span>
                      </span>
                      {{ key }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="flex items-center gap-3 px-2 mt-6 lg:justify-end">
      <Button variant="outline" type="button" :onClick="() => emit('close', { action: 'cancel' })"
        >Close</Button
      >
      <Button variant="primary" type="button" :onClick="saveEvent">{{
        isEdit ? 'Update Changes' : 'Add Event'
      }}</Button>
      <Button v-if="isEdit" variant="danger" type="button" :onClick="deleteEvent"
        >Delete Event</Button
      >
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, defineProps, defineEmits } from 'vue'
import { Input, Button, DatePicker } from '@hivespace/shared'

const props = defineProps({
  eventId: { type: String, default: '' },
  eventTitle: { type: String, default: '' },
  eventStartDate: { type: String, default: '' },
  eventEndDate: { type: String, default: '' },
  eventLevel: { type: String, default: '' },
  calendarsEvents: { type: Object, required: true },
  mode: { type: String, default: 'create' }, // 'create' | 'edit'
})

const emit = defineEmits(['close'])

const form = reactive({
  id: props.eventId,
  title: props.eventTitle,
  startDate: props.eventStartDate,
  endDate: props.eventEndDate,
  level: props.eventLevel,
})

const isEdit = computed(() => props.mode === 'edit')

function saveEvent() {
  emit('close', {
    action: 'save',
    data: {
      id: form.id,
      title: form.title,
      startDate: form.startDate,
      endDate: form.endDate,
      level: form.level,
    },
  })
}

function deleteEvent() {
  emit('close', {
    action: 'delete',
    id: form.id,
  })
}
</script>

<style scoped></style>

