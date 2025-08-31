import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG, CACHE_KEYS, ERROR_MESSAGES } from '../constants';
import { ApiResponse } from '../types';

// ============= AXIOS INSTANCE =============

class ApiService {
    private api: AxiosInstance;
    private isRefreshing = false;
    private failedQueue: Array<{
        resolve: (value?: any) => void;
        reject: (reason?: any) => void;
    }> = [];

    constructor() {
        this.api = axios.create({
            baseURL: API_CONFIG.BASE_URL,
            timeout: API_CONFIG.TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor - Agregar token de autenticación
        this.api.interceptors.request.use(
            (config) => {
                const token = this.getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor - Manejo de errores y refresh token
        this.api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    if (this.isRefreshing) {
                        // Si ya se está refrescando el token, poner en cola
                        return new Promise((resolve, reject) => {
                            this.failedQueue.push({ resolve, reject });
                        }).then(() => {
                            return this.api(originalRequest);
                        });
                    }

                    originalRequest._retry = true;
                    this.isRefreshing = true;

                    try {
                        const newToken = await this.refreshToken();
                        if (newToken) {
                            // Procesar cola de requests pendientes
                            this.failedQueue.forEach(({ resolve }) => resolve());
                            this.failedQueue = [];

                            originalRequest.headers.Authorization = `Bearer ${newToken}`;
                            return this.api(originalRequest);
                        }
                    } catch (refreshError) {
                        // Refresh falló, limpiar cola y redirigir a login
                        this.failedQueue.forEach(({ reject }) => reject(refreshError));
                        this.failedQueue = [];
                        this.clearAuth();
                        window.location.href = '/login';
                        return Promise.reject(refreshError);
                    } finally {
                        this.isRefreshing = false;
                    }
                }

                return Promise.reject(this.handleError(error));
            }
        );
    }

    // ============= TOKEN MANAGEMENT =============

    private getToken(): string | null {
        return localStorage.getItem(CACHE_KEYS.TOKEN);
    }

    private getRefreshToken(): string | null {
        return localStorage.getItem(CACHE_KEYS.REFRESH_TOKEN);
    }

    private setTokens(token: string, refreshToken: string): void {
        localStorage.setItem(CACHE_KEYS.TOKEN, token);
        localStorage.setItem(CACHE_KEYS.REFRESH_TOKEN, refreshToken);
    }

    private clearAuth(): void {
        localStorage.removeItem(CACHE_KEYS.TOKEN);
        localStorage.removeItem(CACHE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(CACHE_KEYS.USER);
    }

    private async refreshToken(): Promise<string | null> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        try {
            const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/refresh`, {
                refreshToken,
            });

            const { token, refreshToken: newRefreshToken } = response.data.data;
            this.setTokens(token, newRefreshToken);
            return token;
        } catch (error) {
            this.clearAuth();
            throw error;
        }
    }

    // ============= ERROR HANDLING =============

    private handleError(error: any): Error {
        if (!error.response) {
            // Error de red
            return new Error(ERROR_MESSAGES.NETWORK_ERROR);
        }

        const { status, data } = error.response;

        switch (status) {
            case 400:
                return new Error(data.message || ERROR_MESSAGES.VALIDATION_ERROR);
            case 401:
                return new Error(ERROR_MESSAGES.UNAUTHORIZED);
            case 403:
                return new Error(ERROR_MESSAGES.FORBIDDEN);
            case 404:
                return new Error(ERROR_MESSAGES.NOT_FOUND);
            case 500:
            default:
                return new Error(ERROR_MESSAGES.SERVER_ERROR);
        }
    }

    // ============= HTTP METHODS =============

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response: AxiosResponse<ApiResponse<T>> = await this.api.get(url, config);
        return response.data;
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response: AxiosResponse<ApiResponse<T>> = await this.api.post(url, data, config);
        return response.data;
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response: AxiosResponse<ApiResponse<T>> = await this.api.put(url, data, config);
        return response.data;
    }

    async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response: AxiosResponse<ApiResponse<T>> = await this.api.patch(url, data, config);
        return response.data;
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response: AxiosResponse<ApiResponse<T>> = await this.api.delete(url, config);
        return response.data;
    }

    // ============= UPLOAD FILES =============

    async uploadFile(url: string, file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<any>> {
        const formData = new FormData();
        formData.append('file', file);

        const response: AxiosResponse<ApiResponse<any>> = await this.api.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (onProgress && progressEvent.total) {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress(progress);
                }
            },
        });

        return response.data;
    }

    // ============= TOKEN UTILITIES =============

    setAuthToken(token: string): void {
        this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    removeAuthToken(): void {
        delete this.api.defaults.headers.common['Authorization'];
    }
}

// Crear instancia única del servicio API
export const apiService = new ApiService();

// Exportar métodos para uso directo
export const api = {
    get: <T>(url: string, config?: AxiosRequestConfig) => apiService.get<T>(url, config),
    post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => apiService.post<T>(url, data, config),
    put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => apiService.put<T>(url, data, config),
    patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) => apiService.patch<T>(url, data, config),
    delete: <T>(url: string, config?: AxiosRequestConfig) => apiService.delete<T>(url, config),
    uploadFile: (url: string, file: File, onProgress?: (progress: number) => void) =>
        apiService.uploadFile(url, file, onProgress),
    setAuthToken: (token: string) => apiService.setAuthToken(token),
    removeAuthToken: () => apiService.removeAuthToken(),
};