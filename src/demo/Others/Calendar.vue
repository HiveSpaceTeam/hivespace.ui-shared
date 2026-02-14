<template>
  
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div
      class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
    >
      <div class="custom-calendar">
        <FullCalendar ref="calendarRef" class="min-h-screen" :options="calendarOptions" />
      </div>

      <!-- Modal handled globally via ModalManager -->

      <!-- <Teleport to="body">
        <div v-if="isOpen" class="modal-backdrop" @click="closeModal"></div>
        <div v-if="isOpen" class="modal">
          <div >
            <h5
              class="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl"
            >
              {{ selectedEvent ? 'Edit Event' : 'Add Event' }}
            </h5>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Plan your next big moment: schedule or edit an event to stay on track
            </p>

            <div class="mt-8">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Event Title
                </label>
                <input
                  v-model="eventTitle"
                  type="text"
                  class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>

              <div class="mt-6">
                <label class="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                  Event Color
                </label>
                <div class="flex flex-wrap items-center gap-4 sm:gap-5">
                  <div v-for="(value, key) in calendarsEvents" :key="key" class="n-chk">
                    <div :class="`form-check form-check-${value} form-check-inline`">
                      <label
                        class="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                        :for="`modal${key}`"
                      >
                        <span class="relative">
                          <input
                            type="radio"
                            :name="'event-level'"
                            :value="key"
                            :id="`modal${key}`"
                            v-model="eventLevel"
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

              <div class="mt-6">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Enter Start Date
                </label>
                <input
                  v-model="eventStartDate"
                  type="date"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>

              <div class="mt-6">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Enter End Date
                </label>
                <input
                  v-model="eventEndDate"
                  type="date"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>

            <div class="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
              <button
                @click="closeModal"
                class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
              >
                Close
              </button>
              <button
                @click="handleAddOrUpdateEvent"
                class="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
              >
                {{ selectedEvent ? 'Update Changes' : 'Add Event' }}
              </button>
            </div>
          </div>
        </div>
      </Teleport> -->
    </div>
  
</template>

<script setup lang="ts">

import { PageBreadcrumb } from '@hivespace/shared'

const currentPageTitle = ref('Calendar')
import { ref, reactive, onMounted, watch } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type {
  CalendarOptions,
  EventClickArg,
  DateSelectArg,
  EventContentArg,
  EventInput,
} from '@fullcalendar/core'
import { useModal } from '@hivespace/shared'
import EventDetailModal from '@/demo/Others/Popups/EventDetailModal.vue'

const calendarRef = ref(null)
type CalendarLevel = 'Danger' | 'Success' | 'Primary' | 'Warning' | string
interface EventExtProps {
  calendar: CalendarLevel
}
interface EventItem {
  id: string
  title: string
  start: string
  end?: string
  allDay?: boolean
  extendedProps: EventExtProps
}
const events = ref<EventInput[]>([])
const { openModal } = useModal()

const calendarsEvents = reactive({
  Danger: 'danger',
  Success: 'success',
  Primary: 'primary',
  Warning: 'warning',
})

onMounted(() => {
  events.value = [
    {
      id: '1',
      title: 'Event Conf.',
      start: new Date().toISOString().split('T')[0],
      extendedProps: { calendar: 'Danger' },
    },
    {
      id: '2',
      title: 'Meeting',
      start: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      extendedProps: { calendar: 'Success' },
    },
    {
      id: '3',
      title: 'Workshop',
      start: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      end: new Date(Date.now() + 259200000).toISOString().split('T')[0],
      extendedProps: { calendar: 'Primary' },
    },
  ]
})

interface OpenEventPayload {
  mode: 'create' | 'edit'
  data?: Partial<EventItem>
}
type ModalResult =
  | {
      action: 'save'
      data: {
        id?: string
        title: string
        startDate: string
        endDate?: string
        level: CalendarLevel
      }
    }
  | { action: 'delete'; id: string }
  | { action: 'cancel' }

async function openEventModal(payload: OpenEventPayload) {
  const data = payload.data ?? {}
  const result = await openModal(EventDetailModal, {
    title: payload.mode === 'edit' ? 'Edit Event' : 'Add Event',
    description: 'Plan your next big moment: schedule or edit an event to stay on track',
    mode: payload.mode,
    eventId: data.id || '',
    eventTitle: data.title || '',
    eventStartDate: data.start || '',
    eventEndDate: data.end || '',
    eventLevel: data.extendedProps?.calendar || '',
    calendarsEvents,
  })

  if (!result || typeof result !== 'object') return
  const r = result as ModalResult
  if (r.action === 'save') {
    const { id, title, startDate, endDate, level } = r.data
    if (payload.mode === 'edit' && id) {
      events.value = events.value.map((ev) =>
        ev.id === id
          ? { ...ev, title, start: startDate, end: endDate, extendedProps: { calendar: level } }
          : ev,
      )
    } else {
      events.value.push({
        id: Date.now().toString(),
        title,
        start: startDate,
        end: endDate,
        allDay: true,
        extendedProps: { calendar: level },
      })
    }
  } else if (r.action === 'delete') {
    events.value = events.value.filter((ev) => ev.id !== r.id)
  } // cancel -> no-op
}

const handleDateSelect = (selectInfo: DateSelectArg) => {
  openEventModal({
    mode: 'create',
    data: { start: selectInfo.startStr, end: selectInfo.endStr || selectInfo.startStr },
  })
}

const handleEventClick = (clickInfo: EventClickArg) => {
  const ev = clickInfo.event
  openEventModal({
    mode: 'edit',
    data: {
      id: ev.id,
      title: ev.title,
      start: ev.start ? ev.start.toISOString().split('T')[0] : '',
      end: ev.end ? ev.end.toISOString().split('T')[0] : '',
      // extendedProps is Dictionary in types; safely coerce
      extendedProps: {
        calendar: (ev.extendedProps as unknown as EventExtProps)?.calendar as CalendarLevel,
      },
    },
  })
}

const renderEventContent = (eventInfo: EventContentArg) => {
  const level =
    ((eventInfo.event.extendedProps as unknown as EventExtProps)?.calendar as string) || ''
  const colorClass = `fc-bg-${level.toLowerCase()}`
  return {
    html: `
      <div class="event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm">
        <div class="fc-daygrid-event-dot"></div>
        <div class="fc-event-time">${eventInfo.timeText}</div>
        <div class="fc-event-title">${eventInfo.event.title}</div>
      </div>
    `,
  }
}

const calendarOptions = reactive<CalendarOptions>({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next addEventButton',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  events: events.value as EventInput[],
  selectable: true,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventContent: renderEventContent,
  customButtons: {
    addEventButton: {
      text: 'Add Event +',
      click: () => openEventModal({ mode: 'create' }),
    },
  },
})

watch(events, (val) => {
  calendarOptions.events = val as EventInput[]
})
</script>

