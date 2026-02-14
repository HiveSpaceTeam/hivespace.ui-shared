import { useAuth } from '../composables/useAuth'
import type { AppUser } from '../types/app-user'
import type { ApiConfig } from '../types/api.types'
import axios from 'axios'
import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
} from 'axios'

// Extended request config for retry functionality
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
    _retryCount?: number
}

// Simple correlation ID generator
const generateCorrelationId = (): string =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// Simple retry utility
export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

export class ApiService {
    private client: AxiosInstance
    private config: ApiConfig
    private refreshTokenCallback?: (user: AppUser | null) => Promise<AppUser | null>
    private notifyErrorCallback?: (title: string, message: string) => void
    private getTranslationsCallback?: () => {
        unauthorized: { title: string; message: string }
        accessDenied: { title: string; message: string }
        tooManyRequests: { title: string; message: string }
        serverError: { title: string; message: string }
        serviceUnavailable: { title: string; message: string }
        connectionError: { title: string; message: string }
        requestError: { title: string; message: string }
    }

    constructor(
        config: ApiConfig,
        refreshTokenCallback?: (user: AppUser | null) => Promise<AppUser | null>,
        notifyErrorCallback?: (title: string, message: string) => void,
        getTranslationsCallback?: () => {
            unauthorized: { title: string; message: string }
            accessDenied: { title: string; message: string }
            tooManyRequests: { title: string; message: string }
            serverError: { title: string; message: string }
            serviceUnavailable: { title: string; message: string }
            connectionError: { title: string; message: string }
            requestError: { title: string; message: string }
        }
    ) {
        this.config = config
        this.refreshTokenCallback = refreshTokenCallback
        this.notifyErrorCallback = notifyErrorCallback
        this.getTranslationsCallback = getTranslationsCallback

        this.client = axios.create({
            baseURL: config.baseURL,
            timeout: config.timeout,
            headers: config.headers,
            validateStatus: (status) => status >= 200 && status < 300,
        })

        this.setupInterceptors()
    }

    private setupInterceptors() {
        // Request interceptor
        this.client.interceptors.request.use(
            async (requestConfig) => {
                try {
                    const { getCurrentUser } = useAuth()
                    let currentUser: AppUser | null = await getCurrentUser()

                    // Ensure fresh user if refresh callback is provided
                    if (this.refreshTokenCallback) {
                        currentUser = await this.refreshTokenCallback(currentUser)
                    }

                    // Add authorization if available
                    requestConfig.headers = requestConfig.headers ?? {}
                    if (currentUser?.access_token) {
                        ; (requestConfig.headers as Record<string, string>).Authorization =
                            `Bearer ${currentUser.access_token}`
                    }

                    // Add tracing headers
                    requestConfig.headers['X-Correlation-ID'] = generateCorrelationId()
                    requestConfig.headers['X-Request-Timestamp'] = new Date().toISOString()

                    if (this.config.features?.enableDebug) {
                        console.log(`API Request: ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`)
                    }

                    return requestConfig
                } catch (error) {
                    console.error('Request interceptor error:', error)
                    return requestConfig
                }
            },
            (error) => {
                console.error('Request error:', error)
                return Promise.reject(error)
            },
        )

        // Response interceptor
        this.client.interceptors.response.use(
            (response: AxiosResponse) => {
                if (this.config.features?.enableDebug) {
                    console.log(`API Response: ${response.status} ${response.config.url}`)
                }
                return response
            },
            async (error: AxiosError) => {
                const originalRequest = error.config as ExtendedAxiosRequestConfig

                // Retry logic
                if (originalRequest && !originalRequest._retry && this.shouldRetry(error)) {
                    const retryCount = (originalRequest._retryCount || 0) + 1

                    if (retryCount <= this.config.retries) {
                        originalRequest._retry = true
                        originalRequest._retryCount = retryCount

                        const delay = this.config.retryDelay * Math.pow(2, retryCount - 1)
                        await sleep(delay)

                        console.log(
                            `Retrying request (${retryCount}/${this.config.retries}):`,
                            originalRequest.url,
                        )
                        return this.client(originalRequest)
                    }
                }

                const translations = this.getTranslationsCallback?.()

                // Handle specific HTTP errors
                if (error.response) {
                    await this.handleHttpError(error.response.status, translations)
                    return Promise.reject(error.response.data)
                } else if (error.request) {
                    if (translations && this.notifyErrorCallback) {
                        this.notifyErrorCallback(translations.connectionError.title, translations.connectionError.message)
                    }
                    return Promise.reject({ message: translations?.connectionError.message || 'Connection Error' })
                } else {
                    if (translations && this.notifyErrorCallback) {
                        this.notifyErrorCallback(translations.requestError.title, translations.requestError.message)
                    }
                    return Promise.reject({ message: translations?.requestError.message || 'Request Error' })
                }
            },
        )
    }

    private shouldRetry(error: AxiosError): boolean {
        if (!error.response) return true
        const status = error.response.status
        return status >= 500 || status === 408 || status === 429
    }

    private async handleHttpError(status: number, translations?: any): Promise<void> {
        const { logout } = useAuth()

        switch (status) {
            case 401:
                if (translations && this.notifyErrorCallback) {
                    this.notifyErrorCallback(translations.unauthorized.title, translations.unauthorized.message)
                }
                await sleep(2000)
                logout()
                break
            case 403:
                if (translations && this.notifyErrorCallback) {
                    this.notifyErrorCallback(translations.accessDenied.title, translations.accessDenied.message)
                }
                break
            case 429:
                if (translations && this.notifyErrorCallback) {
                    this.notifyErrorCallback(translations.tooManyRequests.title, translations.tooManyRequests.message)
                }
                break
            case 500:
                if (translations && this.notifyErrorCallback) {
                    this.notifyErrorCallback(translations.serverError.title, translations.serverError.message)
                }
                break
            case 502:
            case 503:
            case 504:
                if (translations && this.notifyErrorCallback) {
                    this.notifyErrorCallback(translations.serviceUnavailable.title, translations.serviceUnavailable.message)
                }
                break
        }
    }

    // Generic request method
    private async request<T>(config: AxiosRequestConfig): Promise<T> {
        const response = await this.client(config)
        return response.data
    }

    // Public HTTP methods
    async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'GET', url })
    }

    async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'POST', url, data })
    }

    async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'PUT', url, data })
    }

    async patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'PATCH', url, data })
    }

    async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'DELETE', url })
    }

    async uploadFile<T = unknown>(
        url: string,
        file: File,
        onUploadProgress?: (progress: number) => void,
    ): Promise<T> {
        const formData = new FormData()
        formData.append('file', file)

        return this.request<T>({
            url,
            method: 'POST',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: onUploadProgress
                ? (progressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        onUploadProgress(progress)
                    }
                }
                : undefined,
        })
    }

    async downloadFile(url: string, filename?: string): Promise<void> {
        const response = await this.client.get(url, { responseType: 'blob' })
        const blob = new Blob([response.data])
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = filename || 'download'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(downloadUrl)
    }

    async healthCheck(): Promise<boolean> {
        try {
            await this.get('/health')
            return true
        } catch {
            return false
        }
    }

    getClient(): AxiosInstance {
        return this.client
    }
}
