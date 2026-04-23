<template>
  <div class="relative" ref="dropdownRef">
    <button
      class="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      @click="toggleDropdown">
      <span v-if="notifying"
        class="absolute -top-0.5 -right-0.5 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-orange-400 text-[9px] font-bold text-white">
        <span class="absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 -z-1 animate-ping"></span>
        <span class="relative z-10">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
      </span>
      <NotificationBellIcon />
    </button>

    <!-- Dropdown Start -->
    <div v-if="dropdownOpen"
      class="absolute -right-[240px] mt-[17px] flex w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[361px] lg:right-0">
      <div class="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
        <h5 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          {{ $t('common.notifications.notification') }}
        </h5>
        <div class="flex items-center gap-3">
          <router-link :to="viewAllTo"
            class="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300"
            @click.prevent="handleViewAllClick">
            {{ $t('common.notifications.viewAllShort') }}
          </router-link>
          <button @click="closeDropdown" class="text-gray-500 dark:text-gray-400">
            <CloseMenuIcon />
          </button>
        </div>
      </div>

      <div class="py-3">
        <FilterChips :options="filterOptions" v-model="filterValue" />
      </div>

      <ul ref="listRef" class="flex flex-col overflow-y-auto custom-scrollbar space-y-1" :style="listStyle">
        <li v-if="isLoading" class="flex justify-center py-6">
          <Spinner size="sm" />
        </li>

        <li v-else-if="notifications.length === 0"
          class="flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-500">
          <NotificationBellIcon class="w-10 h-10 mb-2 opacity-30" />
          <span class="text-theme-sm">{{ $t('common.notifications.empty') }}</span>
        </li>

        <li v-else v-for="notification in notifications" :key="notification.id">
          <a @click.prevent="handleItemClick(notification)" :class="[
            'flex items-start gap-3 rounded-lg px-3 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5',
            !notification.isRead ? 'bg-brand-50/50 dark:bg-brand-900/10' : ''
          ]" href="#">
            <!-- Avatar -->
            <div class="relative flex-shrink-0">
              <img :src="notification.avatarUrl || defaultAvatar" alt="" class="h-11 w-11 rounded-full object-cover" />
              <span
                class="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 border-2 border-white dark:border-gray-dark">
                <NotificationBellIcon class="h-2.5 w-2.5 text-white" />
              </span>
            </div>

            <!-- Content -->
            <span class="flex-1 min-w-0">
              <span class="block text-theme-sm text-gray-700 dark:text-gray-300 line-clamp-2 leading-snug">
                {{ notification.message }}
              </span>
              <span
                :class="['block text-theme-xs mt-1', !notification.isRead ? 'text-brand-500 font-medium' : 'text-gray-400 dark:text-gray-500']">
                {{ formatNotificationTime(notification.createdAt) }}
              </span>
            </span>

            <!-- Unread dot -->
            <span v-if="!notification.isRead" class="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brand-500" />
          </a>
        </li>
      </ul>

      <button v-if="hasMore && !isLoading" @click="$emit('load-more')"
        class="mt-3 flex w-full justify-center rounded-lg border border-gray-300 bg-white p-3 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
        {{ $t('common.notifications.loadMore') }}
      </button>
    </div>
    <!-- Dropdown End -->
  </div>
</template>

<script setup lang="ts">
import NotificationBellIcon from '@/icons/NotificationBellIcon.vue'
import CloseMenuIcon from '@/icons/CloseMenuIcon.vue'
import Spinner from '@/components/common/Spinner.vue'
import FilterChips from '@/components/common/FilterChips.vue'
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { InAppNotification } from '@/types/notification.types'
import { useFormatDate } from '@/composables/useFormatDate'

const defaultAvatar =
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='20' fill='%23e5e7eb'/%3E%3Ccircle cx='20' cy='15' r='7' fill='%239ca3af'/%3E%3Cellipse cx='20' cy='34' rx='12' ry='8' fill='%239ca3af'/%3E%3C/svg%3E`

const props = withDefaults(
  defineProps<{
    notifications?: InAppNotification[]
    unreadCount?: number
    isLoading?: boolean
    hasMore?: boolean
    viewAllTo?: string
  }>(),
  {
    notifications: () => [],
    unreadCount: 0,
    isLoading: false,
    hasMore: false,
    viewAllTo: '/notifications',
  },
)

const emit = defineEmits<{
  (e: 'notification-read', id: string): void
  (e: 'notification-clicked', id: string): void
  (e: 'view-all'): void
  (e: 'open', unreadOnly: boolean): void
  (e: 'load-more'): void
  (e: 'filter-change', unreadOnly: boolean): void
}>()

const { t, locale } = useI18n()
const router = useRouter()
const { formatRelativeTime } = useFormatDate()

const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLUListElement | null>(null)
const measuredMaxHeight = ref<number | null>(null)
const filterValue = ref<'all' | 'unread'>('all')

const notifying = computed(() => props.unreadCount > 0)

const filterOptions = computed(() => [
  { label: t('common.notifications.all'), value: 'all' },
  { label: t('common.notifications.unread'), value: 'unread' },
])

const listStyle = computed(() => {
  if (!measuredMaxHeight.value) return {}
  return { maxHeight: `${measuredMaxHeight.value}px` }
})

const measureListHeight = () => {
  if (!listRef.value || props.notifications.length === 0) {
    measuredMaxHeight.value = null
    return
  }
  const firstItem = listRef.value.querySelector('li') as HTMLElement | null
  if (!firstItem) return
  // gap from space-y-1 = 4px
  measuredMaxHeight.value = firstItem.offsetHeight * 4 + 4 * 3
}

watch(
  () => [dropdownOpen.value, props.notifications.length] as const,
  () => { nextTick(measureListHeight) },
  { flush: 'post' },
)

watch(filterValue, (val) => {
  emit('filter-change', val === 'unread')
})

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
  if (dropdownOpen.value) {
    emit('open', filterValue.value === 'unread')
  }
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

const navigateTo = (target: string) => {
  if (/^https?:\/\//i.test(target)) {
    window.location.assign(target)
    return
  }
  router.push(target)
}

const handleItemClick = (notification: InAppNotification) => {
  emit('notification-clicked', notification.id)
  emit('notification-read', notification.id)
  closeDropdown()
  navigateTo(notification.link ?? props.viewAllTo)
}

const handleViewAllClick = () => {
  emit('view-all')
  closeDropdown()
  navigateTo(props.viewAllTo)
}

const formatNotificationTime = (iso: string): string => {
  return formatRelativeTime(iso, {
    locale: locale.value,
    t: (key, params) => (params ? t(key, params) : t(key)),
  })
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
