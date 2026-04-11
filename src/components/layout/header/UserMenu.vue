<template>
  <div class="relative" ref="dropdownRef">
    <button class="flex items-center text-gray-700 dark:text-gray-400" @click.prevent="toggleDropdown">
      <span class="mr-3 overflow-hidden rounded-full w-11 h-11 bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
        <img v-if="avatarSrc" :src="avatarSrc" alt="User" class="w-full h-full object-cover" />
        <UserCircleIcon v-else class="w-7 h-7 text-gray-400" />
      </span>

      <span class="block mr-1 font-medium text-theme-sm">
        {{ displayedUser?.profile?.username || '' }}
      </span>

      <ChevronDownIcon :class="{ 'rotate-180': dropdownOpen }" />
    </button>

    <!-- Dropdown Start -->
    <div v-if="dropdownOpen"
      class="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark">
      <div>
        <span class="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
          {{ displayedUser?.profile?.name || '' }}
        </span>
        <span class="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
          {{ displayedUser?.profile?.email || '' }}
        </span>
      </div>

      <ul class="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
        <li v-for="item in items" :key="item.href">
          <Link :to="item.href" @click="navigateTo(item.href)"
            class="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            <!-- SVG icon would go here -->
            <component :is="item.icon" class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
            {{ $t(item.textKey) }}
          </Link>
        </li>
      </ul>
      <button v-if="showSignOut" type="button" @click="signOut"
        class="flex w-full items-center cursor-pointer gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        aria-label="Sign out">
        <LogoutIcon class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
        {{ $t('common.profile.signOut') }}
      </button>
    </div>
    <!-- Dropdown End -->
  </div>
</template>

<script setup lang="ts">
import { UserCircleIcon, ChevronDownIcon, LogoutIcon, SettingsIcon, SupportIcon } from '../../../icons'
import Link from '../../common/Link.vue'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useAuth } from '../../../composables'
import type { User } from 'oidc-client-ts'
import type { MenuItem } from '../../../types/component.common'
import type { AppUser } from '../../../types'

// Props: make this component generic so callers can provide a user and menu items

const props = defineProps<{
  user?: User | AppUser | null
  menuItems?: MenuItem[]
  avatarSrc?: string
  showSignOut?: boolean
}>()

const emit = defineEmits<{
  signOut: []
  navigate: [path: string]
}>()

const { userManager } = useAuth()
const internalUser = ref<User | null>(null)

onMounted(async () => {
  if (!props.user) {
    try {
      internalUser.value = userManager ? await userManager.getUser() : null
    } catch {
      internalUser.value = null
    }
  }
})

const displayedUser = computed(() => props.user ?? internalUser.value)

const avatarSrc = computed(() => props.avatarSrc ?? displayedUser.value?.profile?.picture)

const showSignOut = computed(() => props.showSignOut ?? true)

const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const defaultMenuItems: MenuItem[] = [
  { href: '/profile', icon: UserCircleIcon, textKey: 'common.profile.editProfile' },
  { href: '/chat', icon: SettingsIcon, textKey: 'common.profile.accountSettings' },
  { href: '/profile', icon: SupportIcon, textKey: 'common.profile.support' },
]

const items = computed(() => props.menuItems ?? defaultMenuItems)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const navigateTo = (path: string) => {
  emit('navigate', path)
  closeDropdown()
}

const signOut = async () => {
  emit('signOut')
  closeDropdown()
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  console.log(showSignOut.value)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
