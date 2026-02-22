import { ref, computed } from 'vue'
import { User, UserManager, WebStorageStateStore } from 'oidc-client-ts'
import type { AppUser } from '../types'
import { toAppUser } from '../types'
import type { CultureText } from '../types'
import { CULTURE_TEXT } from '../types'
import { getCookie } from '../utils/cookie'
import { useI18n } from 'vue-i18n'

// Auth configuration interface
export interface AuthConfig {
  authority: string
  clientId: string
  redirectUri: string
  responseType: string
  scope: string
  postLogoutRedirectUri: string
  responseMode?: 'query' | 'fragment'
  /**
   * Storage backend for the OIDC user session.
   * - 'session' (default): sessionStorage — cleared when the tab is closed.
   *    Tokens are NOT shared between tabs.
   * - 'local': localStorage — persists across tabs and browser restarts.
   *    Needed when users open links (e.g. email verification) in a new tab.
   */
  storageType?: 'session' | 'local'
}

// Global state for auth
let userManagerInstance: UserManager | null = null
let currentConfig: AuthConfig | null = null
let isInitialized = false

/**
 * Initialize the authentication system with configuration
 * Call this once in your main application before using useAuth
 */
export const initializeAuth = (config: AuthConfig): void => {
  currentConfig = config
  const storage = config.storageType === 'local' ? window.localStorage : window.sessionStorage
  const oidcSettings = {
    authority: config.authority,
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: config.responseType,
    scope: config.scope,
    post_logout_redirect_uri: config.postLogoutRedirectUri,
    response_mode: config.responseMode,
    userStore: new WebStorageStateStore({ store: storage }),
  }
  userManagerInstance = new UserManager(oidcSettings)
  isInitialized = true
}

/**
 * Reset the authentication system
 * Useful for testing or when switching configurations
 */
export const resetAuth = (): void => {
  userManagerInstance = null
  currentConfig = null
  isInitialized = false
}

/**
 * Check if auth has been initialized
 */
export const isAuthInitialized = (): boolean => {
  return isInitialized && userManagerInstance !== null
}

/**
 * Composable for authentication management using OIDC
 * Must call initializeAuth() first before using this composable
 */
export const useAuth = () => {
  // Reactive state
  const currentUser = ref<AppUser | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Try to use i18n if available (inside component setup)
  // If called outside setup (e.g. main.ts), this might throw or fail, so we catch it
  let i18nLocale: any = null
  try {
    const { locale } = useI18n()
    i18nLocale = locale
  } catch (e) {
    // Ignore error - likely called outside of component setup
  }

  // Computed properties
  const isAuthenticated = computed(async () => {
    return currentUser.value !== null || await getCurrentUser() !== null
  })
  const isConfigured = computed(() => isAuthInitialized())

  /**
   * Helper: persist an updated user object into the same WebStorageStateStore
   * used by the UserManager so the library's getUser() returns the rotated tokens.
   */
  const storeUpdatedUser = async (appUser: AppUser): Promise<void> => {
    if (!userManagerInstance || !currentConfig) {
      console.warn('Auth not initialized, cannot store updated user')
      return
    }

    try {
      const authority = String(currentConfig.authority)
      const clientId = String(currentConfig.clientId)

      // The oidc-client-ts WebStorageStateStore prepends its own prefix (usually 'oidc.')
      // to keys passed into set(). The library expects a key of the form
      //   'user:{authority}:{clientId}'
      // and will store it as 'oidc.user:{authority}:{clientId}'. If we write a key
      // that already includes the 'oidc.' prefix (for example 'oidc.user:...') the
      // store implementation will add another 'oidc.' resulting in a double-prefixed
      // key like 'oidc.oidc.user:...'. To avoid creating duplicates, pass the base
      // key (without the 'oidc.' prefix) to store.set().
      const storageKeyBase = `user:${authority}:${clientId}`

      // Access the configured userStore (fall back to a localStorage store)
      // The UserManager exposes its settings via userManager.settings
      const store = (userManagerInstance.settings?.userStore ??
        new WebStorageStateStore({ store: window.localStorage })) as WebStorageStateStore

      // WebStorageStateStore expects set(key, value) where it will prefix the key.
      await store.set(storageKeyBase, JSON.stringify(appUser))

      // Cleanup: remove any accidentally created double-prefixed key from older runs.
      try {
        const doublePrefixed = `oidc.oidc.user:${authority}:${clientId}`
        if (window?.localStorage?.getItem(doublePrefixed)) {
          window.localStorage.removeItem(doublePrefixed)
        }
      } catch {
        // ignore localStorage access errors
      }
    } catch (err) {
      // Best-effort; do not throw. Log for diagnostics.
      console.error('storeUpdatedUser failed', err)
    }
  }

  /**
   * Get the current authenticated user
   */
  const getCurrentUser = async (): Promise<AppUser | null> => {
    if (!userManagerInstance) {
      error.value = 'Auth not initialized'
      return null
    }
    try {
      error.value = null
      const user = await userManagerInstance.getUser()
      const appUser = toAppUser(user)
      currentUser.value = appUser
      return appUser
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to get current user'
      return null
    }
  }

  /**
   * Initiate the login process
   * Ensures we push a safe in-app history entry before navigating to the IdP.
   * This prevents the browser Back button from landing on the IdP URL or error pages.
   */
  const login = async (): Promise<void> => {
    if (!userManagerInstance) {
      error.value = 'Auth not initialized'
      throw new Error('Auth not initialized')
    }

    try {
      isLoading.value = true
      error.value = null

      // Use history.replaceState to avoid adding an extra entry if already on a transient route,
      // then push a known internal transition state so Back returns into the SPA.
      // We choose '/' as the transition path since it's the Default.vue route that handles auth gracefully.
      const transitionPath = '/'
      if (window && window.history && window.location) {
        // Only push if the current location isn't already the transition path.
        if (window.location.pathname !== transitionPath) {
          window.history.pushState({}, '', transitionPath)
        }
      }
    } catch {
      // ignore — best-effort history manipulation
    }

    try {
      // Get current locale preferably from injected i18n, else from cookie
      let currentCulture: CultureText = CULTURE_TEXT.VIETNAMESE

      if (i18nLocale && i18nLocale.value) {
        currentCulture = i18nLocale.value as CultureText
      } else {
        // Fallback to cookie if i18n instance not available (e.g. called from main.ts)
        const cookieCulture = getCookie('culture')
        if (cookieCulture) {
          currentCulture = cookieCulture as CultureText
        }
      }

      const extraArgs = {
        extraQueryParams: {
          culture: currentCulture,
        },
      }

      await userManagerInstance.signinRedirect(extraArgs)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Initiate the logout process
   */
  const logout = async (redirectTo?: string, useState = true): Promise<void> => {
    if (!userManagerInstance || !currentConfig) {
      error.value = 'Auth not initialized'
      throw new Error('Auth not initialized')
    }

    try {
      isLoading.value = true
      error.value = null

      const defaultPostLogout = currentConfig.postLogoutRedirectUri

      // Best-effort: push an internal transition entry so Back doesn't go to the IdP URL.
      try {
        const transitionPath = '/'
        if (window && window.history && window.location) {
          if (window.location.pathname !== transitionPath) {
            window.history.pushState({}, '', transitionPath)
          }
        }
      } catch {
        // ignore
      }

      const args: Record<string, unknown> = {
        post_logout_redirect_uri: defaultPostLogout,
      }
      if (redirectTo) {
        // If useState is true, put the SPA route in state so the callback can
        // navigate internally. Otherwise try to set a post_logout_redirect_uri.
        if (useState) {
          args.state = { redirectTo }
        } else {
          args.post_logout_redirect_uri = redirectTo
        }
      }

      await userManagerInstance.signoutRedirect(args)
      currentUser.value = null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Logout failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Get user (alias for getCurrentUser for backward compatibility)
   */
  const getUser = async (): Promise<AppUser | null> => {
    return getCurrentUser()
  }

  /**
   * Handle the login callback from the identity provider
   */
  const handleLoginCallback = async (): Promise<User> => {
    if (!userManagerInstance) {
      error.value = 'Auth not initialized'
      throw new Error('Auth not initialized')
    }

    try {
      isLoading.value = true
      error.value = null

      const user = await userManagerInstance.signinRedirectCallback()
      await getCurrentUser() // Update reactive state
      return user
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login callback failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    // Reactive state
    currentUser,
    isLoading,
    error,
    isAuthenticated,
    isConfigured,

    // Methods
    login,
    logout,
    getCurrentUser,
    getUser,
    handleLoginCallback,
    storeUpdatedUser,

    // Direct access to userManager if needed (can be null)
    userManager: userManagerInstance,
  }
}
