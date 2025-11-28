import { ref, computed } from 'vue'
import { User, UserManager, WebStorageStateStore } from 'oidc-client-ts'
import type { AppUser } from '@/types'
import { toAppUser } from '@/types'
import type { CultureText } from '@/types'
import { CULTURE_TEXT } from '@/types'

// Auth configuration interface
export interface AuthConfig {
  authority: string
  clientId: string
  redirectUri: string
  responseType: string
  scope: string
  postLogoutRedirectUri: string
  responseMode?: 'query' | 'fragment'
}

// Default configuration for when no config is provided
const defaultAuthConfig: AuthConfig = {
  authority: '',
  clientId: '',
  redirectUri: '',
  responseType: 'code',
  scope: 'openid profile',
  postLogoutRedirectUri: '',
  responseMode: 'query'
}

// Singleton instance for lazy initialization
let userManagerInstance: UserManager | null = null

/**
 * Creates or returns the existing UserManager instance
 */
let currentConfig: AuthConfig | null = null

const createUserManager = (config?: AuthConfig): UserManager | null => {
  // Return null if no config provided or config is incomplete
  if (!config || !config.authority || !config.clientId) {
    return null
  }

  if (!userManagerInstance || !currentConfig || JSON.stringify(currentConfig) !== JSON.stringify(config)) {
    currentConfig = config
    const oidcSettings = {
      authority: config.authority,
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: config.responseType,
      scope: config.scope,
      post_logout_redirect_uri: config.postLogoutRedirectUri,
      response_mode: config.responseMode,
      userStore: new WebStorageStateStore({ store: window.sessionStorage }),
    }
    userManagerInstance = new UserManager(oidcSettings)
  }
  return userManagerInstance
}

/**
 * Composable for authentication management using OIDC
 * @param config Optional authentication configuration. If not provided, auth features will be disabled.
 */
export const useAuth = (config?: AuthConfig) => {
  // Use provided config or default
  const authConfig = config || defaultAuthConfig

  // Reactive state
  const currentUser = ref<AppUser | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Lazy-initialized user manager (can be null if no valid config)
  const userManager = createUserManager(authConfig)

  // Computed properties
  const isAuthenticated = computed(() => currentUser.value !== null)
  const isConfigured = computed(() => userManager !== null)

  /**
   * Helper: persist an updated user object into the same WebStorageStateStore
   * used by the UserManager so the library's getUser() returns the rotated tokens.
   */
  const storeUpdatedUser = async (appUser: AppUser): Promise<void> => {
    if (!userManager || !authConfig.authority || !authConfig.clientId) {
      console.warn('Auth not configured, cannot store updated user')
      return
    }

    try {
      const authority = String(authConfig.authority)
      const clientId = String(authConfig.clientId)

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
      const store = (userManager.settings?.userStore ??
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
    if (!userManager) {
      error.value = 'Auth not configured'
      return null
    }

    try {
      error.value = null
      const user = await userManager.getUser()
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
    if (!userManager) {
      error.value = 'Auth not configured'
      throw new Error('Auth not configured')
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
      // Get current locale from i18n
      const i18n = (await import('../i18n')).default
      const currentCulture = (i18n.global.locale.value as CultureText) || CULTURE_TEXT.VIETNAMESE

      const extraArgs = {
        extraQueryParams: {
          culture: currentCulture,
        },
      }

      await userManager.signinRedirect(extraArgs)
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
    if (!userManager) {
      error.value = 'Auth not configured'
      throw new Error('Auth not configured')
    }

    try {
      isLoading.value = true
      error.value = null

      const defaultPostLogout = authConfig.postLogoutRedirectUri

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

      await userManager.signoutRedirect(args)
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
    if (!userManager) {
      error.value = 'Auth not configured'
      throw new Error('Auth not configured')
    }

    try {
      isLoading.value = true
      error.value = null

      const user = await userManager.signinRedirectCallback()
      await getCurrentUser() // Update reactive state
      return user
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login callback failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Initialize current user on composable creation
  getCurrentUser()

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
    userManager,
  }
}
