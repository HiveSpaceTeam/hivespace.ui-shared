/**
 * Common API Types
 * Shared types used across multiple API endpoints
 */

// Generic API response wrappers
export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  success: boolean
  timestamp: string
}

export interface PaginatedResponse<T = unknown> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

// Standard pagination metadata used across the frontend
export interface Pagination {
  currentPage: number
  pageSize: number
  totalItems: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

// API Error structure matching your backend
export interface ApiError {
  code: string
  messageCode: string
  source: string
}

export interface ErrorResponse {
  errors: ApiError[]
  status: string
  timestamp: string
  traceId: string
  version: string
}

// Common query parameters
export interface PaginationParams {
  page?: number
  limit?: number
}

export interface SortParams {
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export interface SearchParams {
  searchTerm?: string
  searchFields?: string[]
}

export interface FilterParams extends PaginationParams, SortParams, SearchParams {
  filters?: Record<string, unknown>
}

// File upload types
export interface FileUploadResponse {
  fileId: string
  filename: string
  originalName: string
  mimetype: string
  size: number
  url: string
  thumbnailUrl?: string
}

export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

export enum Status {
  Inactive = 0,
  Active = 1,
}

export enum StatusFilter {
  All = -1,
  Inactive = 0,
  Active = 1,
}

// Role filter enum matching backend role definitions
export enum RoleFilter {
  All = -1,
  Customer = 0,
  Seller = 1,
  RegularAdmin = 2,
  SystemAdmin = 3,
}

export enum UserType {
  User = 1,
  Admin = 2,
}
