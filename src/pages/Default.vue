<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
    <!-- Language Switcher and Theme Toggler - Top Right -->
    <div class="absolute top-4 right-4 z-10 flex items-center gap-3">
      <ThemeToggler />
      <LanguageSwitcher />
    </div>

    <div>
      <div class="absolute right-0 top-0 -z-1 w-full max-w-[250px] xl:max-w-[450px]">
        <img :src="gridShape" alt="grid" />
      </div>
      <div class="absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
        <img :src="gridShape" alt="grid" />
      </div>
    </div>

    <div class="mx-auto w-full max-w-[242px] text-center sm:max-w-[562px]">
      <img class="dark:hidden w-full h-auto" :src="logoLight" alt="home" />
      <img class="hidden dark:block w-full h-auto" :src="logoDark" alt="home" />
      <p class="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
        {{ t('pages.default.welcome') }}
      </p>
      <Button :disabled="isSigningIn" @click="signIn" variant="primary">
        {{ t('pages.default.signIn') }}
      </Button>
      <Button v-if="showSignUp" class="ml-4" :disabled="isSigningIn" @click="signIn" variant="outline">
        {{ t('pages.default.signUp') }}
      </Button>
    </div>

    <p class="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
      © {{ new Date().getFullYear() }} - HiveSpace
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ThemeToggler, LanguageSwitcher, Button } from '../components'
import { useAuth } from '../composables'
import gridShape from '../assets/images/shape/grid-01.svg'
import logoLight from '../assets/images/logo/logo-light.svg'
import logoDark from '../assets/images/logo/logo-dark.svg'

interface Props {
  redirectPath: string
  showSignUp?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showSignUp: false
})

const emit = defineEmits<{
  (e: 'navigate', path: string): void
}>()

const { t } = useI18n()
const { getCurrentUser, login } = useAuth()
const isSigningIn = ref(false)

// Helper: check current local user once and navigate to account if present.
async function checkUserAndRedirect() {
  try {
    const user = await getCurrentUser()
    if (user) {
      // If the user already appears signed in locally, emit navigation event
      emit('navigate', props.redirectPath)
      return user
    }
    return null
  } catch (err) {
    // Don't block the UI on unexpected storage/read errors. Log for diagnostics.
    console.error('Error checking current user', err)
    return null
  }
}

onMounted(() => {
  // fire-and-forget; if there's a local user navigate away immediately
  void checkUserAndRedirect()
})

const signIn = async () => {
  if (isSigningIn.value) return
  isSigningIn.value = true
  try {
    // Always start a fresh IdP login flow. Do not reuse any existing local user.
    await login()
  } catch (err) {
    console.error('Sign-in failed', err)
  } finally {
    isSigningIn.value = false
  }
}
</script>
