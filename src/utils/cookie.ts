/**
 * Cookie utility functions
 * Simple cookie management for client-side storage
 */

export const setCookie = (name: string, value: string, days = 30): void => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  const encodedName = encodeURIComponent(name)
  const encodedValue = encodeURIComponent(value)
  document.cookie = `${encodedName}=${encodedValue};expires=${expires.toUTCString()};path=/`
}

export const getCookie = (name: string): string | null => {
  const nameEQ = `${encodeURIComponent(name)}=`
  const ca = document.cookie.split(';')

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) {
      const rawValue = c.substring(nameEQ.length, c.length)
      return decodeURIComponent(rawValue)
    }
  }
  return null
}

export const deleteCookie = (name: string): void => {
  const encodedName = encodeURIComponent(name)
  document.cookie = `${encodedName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}
