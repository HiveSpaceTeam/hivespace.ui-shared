export type ApiConfig = {
    baseURL: string
    timeout: number
    retries: number
    retryDelay: number
    headers: Record<string, string>
    features?: {
        enableDebug: boolean
    }
}
