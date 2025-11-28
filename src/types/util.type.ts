/**
 * Utility Types
 * Helper types and utility type definitions
 */

// Generic utility types
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type Maybe<T> = T | null | undefined

// Object utility types
export type Partial<T> = {
  [P in keyof T]?: T[P]
}

export type Required<T> = {
  [P in keyof T]-?: T[P]
}

export type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// Function types
export type EventHandler<T = Event> = (event: T) => void
export type AsyncHandler<T = void, R = void> = (payload: T) => Promise<R>
export type Callback<T = void> = (value: T) => void

// Promise utilities
export type PromiseType<T> = T extends Promise<infer U> ? U : T
export type UnwrapPromise<T> = PromiseType<T>
// Array utilities
export type ArrayElement<T> = T extends (infer U)[] ? U : never
export type NonEmptyArray<T> = [T, ...T[]]

// String utilities
export type StringLiteral<T> = T extends string ? T : never
export type EmptyString = ''

export type LoadingState = 'idle' | 'pending' | 'fulfilled' | 'rejected'

// Common ID types
export type ID = string | number
export type UUID = string

// Date utilities
export type DateString = string // ISO date string
export type Timestamp = number // Unix timestamp

// API utilities
export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export type HttpStatusCode = number

// Permission utilities
export type Permission = string
export type Role = string

// Theme utilities
export type Theme = 'light' | 'dark' | 'auto'
export type ColorScheme = 'light' | 'dark'

// Responsive breakpoints
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// Component size utilities
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ComponentSize = 'small' | 'medium' | 'large'

// Deep readonly utility
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

// Key-value pairs
export type KeyValuePair<K = string, V = unknown> = {
  key: K
  value: V
}

// Environment types
export type Environment = 'development' | 'staging' | 'production'

// Locale types
export type Locale = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' // Add more as needed
