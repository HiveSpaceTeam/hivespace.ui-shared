import type { User } from 'oidc-client-ts'

export interface AppUser extends User {
  isSystemAdmin: () => boolean
  isAdmin: () => boolean
  isSeller: () => boolean
}

export function toAppUser(user: User | null): AppUser | null {
  if (!user) return null
  const u = user as AppUser

  // Helper function to check if role matches
  /**
   * Determines whether a given role value matches a target role.
   *
   * The function accepts a role value of unknown shape and checks:
   * - If role is a string, returns true when it strictly equals the targetRole.
   * - If role is an array, flattens one level and returns true when targetRole is included.
   * - If role is falsy or any other type, returns false.
   *
   * @param role - The role value from a user profile (can be a string, an array of strings or nested arrays, or undefined/other).
   * @param targetRole - The target role name to check against.
   * @returns True if the role matches or contains the targetRole; otherwise false.
   */
  const hasRole = (role: unknown, targetRole: string): boolean => {
    if (!role) return false
    if (typeof role === 'string') return role === targetRole
    if (Array.isArray(role)) return role.flat().includes(targetRole)
    return false
  }

  if (!u.isSystemAdmin) {
    u.isSystemAdmin = () => {
      return hasRole(u.profile?.role, 'SystemAdmin')
    }
  }

  if (!u.isAdmin) {
    u.isAdmin = () => {
      return hasRole(u.profile?.role, 'Admin')
    }
  }

  if (!u.isSeller) {
    u.isSeller = () => {
      return hasRole(u.profile?.role, 'Seller')
    }
  }

  return u
}
