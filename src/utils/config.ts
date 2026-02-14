/**
 * Configuration and Environment Utilities
 */

import type { Environment } from '../types'

export const validateUrl = (url: string, name: string): string => {
    if (!url) throw new Error(`${name} is required`)
    try {
        new URL(url)
        return url
    } catch {
        throw new Error(`${name} must be a valid URL`)
    }
}

export const validateEnvironment = (env: string): Environment => {
    const validEnvironments: Environment[] = ['development', 'staging', 'production']
    if (validEnvironments.includes(env as Environment)) {
        return env as Environment
    }
    console.warn(`Invalid environment "${env}", defaulting to "development"`)
    return 'development'
}

export const parseBoolean = (value: string | undefined, defaultValue: boolean): boolean => {
    if (value === undefined) return defaultValue
    return value.toLowerCase() === 'true'
}

export const parseNumber = (value: string | undefined, defaultValue: number): number => {
    if (value === undefined) return defaultValue
    const parsed = Number(value)
    return isNaN(parsed) ? defaultValue : parsed
}

export const getEnvVar = (key: string, defaultValue?: string): string => {
    return import.meta.env[key] || defaultValue || ''
}

// URL utility functions
export const joinUrl = (base: string, path: string): string => {
    const prefix = base.endsWith('/') ? base.slice(0, -1) : base
    const suffix = path.startsWith('/') ? path.slice(1) : path
    return `${prefix}/${suffix}`
}
