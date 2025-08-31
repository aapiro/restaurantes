import { api } from './api';
import { API_ENDPOINTS } from '../constants';
import {
    Admin,
    AdminLoginForm,
    AdminLoginResponse,
    DashboardStats,
    AdminRestaurantFilters,
    AdminOrderFilters,
    AdminUserFilters,
    Restaurant,
    Order,
    User,
    RestaurantForm,
    DishForm,
    CategoryForm,
    SalesReport,
    UserReport,
    PaginatedResponse,
    ApiResponse,
    Dish,
    RestaurantCategory,
    DishCategory
} from '../types';

// ============= AUTHENTICATION =============

export const adminAuth = {
    login: async (credentials: AdminLoginForm): Promise<AdminLoginResponse> => {
        const response = await api.post<AdminLoginResponse>(
            API_ENDPOINTS.ADMIN.LOGIN,
            credentials
        );
        return response.data;
    },

    logout: async (): Promise<void> => {
        await api.post(API_ENDPOINTS.ADMIN.LOGOUT);
    },

    refreshToken: async (): Promise<AdminLoginResponse> => {
        const response = await api.post<AdminLoginResponse>(
            API_ENDPOINTS.ADMIN.REFRESH
        );
        return response.data;
    },

    getProfile: async (): Promise<Admin> => {
        const response = await api.get<ApiResponse<Admin>>(
            API_ENDPOINTS.ADMIN.PROFILE
        );
        return response.data.data;
    },

    updateProfile: async (data: Partial<Admin>): Promise<Admin> => {
        const response = await api.put<ApiResponse<Admin>>(
            API_ENDPOINTS.ADMIN.PROFILE,
            data
        );
        return response.data.data;
    },
};

// ============= DASHBOARD =============

export const adminDashboard = {
    getStats: async (): Promise<DashboardStats> => {
        const response = await api.get<ApiResponse<DashboardStats>>(
            API_ENDPOINTS.ADMIN.STATS
        );
        return response.data.data;
    },
};

// ============= RESTAURANTS MANAGEMENT =============

export const adminRestaurants = {
    getAll: async (
        filters?: AdminRestaurantFilters,
        page = 1,
        limit = 20
    ): Promise<PaginatedResponse<Restaurant>> => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    params.append(key, value.toString());
                }
            });
        }

        const response = await api.get<PaginatedResponse<Restaurant>>(
            `${API_ENDPOINTS.ADMIN.RESTAURANTS}?${params}`
        );
        return response.data;
    },

    getById: async (id: number): Promise<Restaurant> => {
        const response = await api.get<ApiResponse<Restaurant>>(
            API_ENDPOINTS.ADMIN.RESTAURANT_DETAIL(id)
        );
        return response.data.data;
    },

    create: async (data: RestaurantForm): Promise<Restaurant> => {
        const formData = new FormData();
        
        Object.entries(data).forEach(([key, value]) => {
            if (value instanceof File) {
                formData.append(key, value);
            } else if (value !== undefined && value !== null) {
                formData.append(key, value.toString());
            }
        });

        const response = await api.post<ApiResponse<Restaurant>>(
            API_ENDPOINTS.ADMIN.RESTAURANT_CREATE,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data.data;
    },

    update: async (id: number, data: Partial<RestaurantForm>): Promise<Restaurant> => {
        const formData = new FormData();
        
        Object.entries(data).forEach(([key, value]) => {
            if (value instanceof File) {
                formData.append(key, value);
            } else if (value !== undefined && value !== null) {
                formData.append(key, value.toString());
            }
        });

        const response = await api.put<ApiResponse<Restaurant>>(
            API_ENDPOINTS.ADMIN.RESTAURANT_UPDATE(id),
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(API_ENDPOINTS.ADMIN.RESTAURANT_DELETE(id));
    },

    toggleStatus: async (id: number): Promise<Restaurant> => {
        const response = await api.patch<ApiResponse<Restaurant>>(
            API_ENDPOINTS.ADMIN.RESTAURANT_TOGGLE_STATUS(id)
        );
        return response.data.data;
    },
};

// ============= DISHES MANAGEMENT =============

export const adminDishes = {
    getAll: async (
        filters?: { restaurantId?: number; search?: string; categoryId?: number },
        page = 1,
        limit = 20
    ): Promise<PaginatedResponse<Dish>> => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    params.append(key, value.toString());
                }
            });
        }

        const response = await api.get<PaginatedResponse<Dish>>(
            `${API_ENDPOINTS.ADMIN.DISHES}?${params}`
        );
        return response.data;
    },

    getById: async (id: number): Promise<Dish> => {
        const response = await api.get<ApiResponse<Dish>>(
            API_ENDPOINTS.ADMIN.DISH_DETAIL(id)
        );
        return response.data.data;
    },

    create: async (data: DishForm): Promise<Dish> => {
        const formData = new FormData();
        
        Object.entries(data).forEach(([key, value]) => {
            if (value instanceof File) {
                formData.append(key, value);
            } else if (Array.isArray(value)) {
                if ((value as any[]).every(item => item instanceof File)) {
                    (value as File[]).forEach(file => formData.append(`${key}[]`, file));
                } else {
                    formData.append(key, JSON.stringify(value));
                }
            } else if (value !== undefined && value !== null) {
                formData.append(key, value.toString());
            }
        });

        const response = await api.post<ApiResponse<Dish>>(
            API_ENDPOINTS.ADMIN.DISH_CREATE,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data.data;
    },

    update: async (id: number, data: Partial<DishForm>): Promise<Dish> => {
        const formData = new FormData();
        
        Object.entries(data).forEach(([key, value]) => {
            if (value instanceof File) {
                formData.append(key, value);
            } else if (Array.isArray(value)) {
                if ((value as any[]).every(item => item instanceof File)) {
                    (value as File[]).forEach(file => formData.append(`${key}[]`, file));
                } else {
                    formData.append(key, JSON.stringify(value));
                }
            } else if (value !== undefined && value !== null) {
                formData.append(key, value.toString());
            }
        });

        const response = await api.put<ApiResponse<Dish>>(
            API_ENDPOINTS.ADMIN.DISH_UPDATE(id),
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(API_ENDPOINTS.ADMIN.DISH_DELETE(id));
    },

    toggleAvailability: async (id: number): Promise<Dish> => {
        const response = await api.patch<ApiResponse<Dish>>(
            API_ENDPOINTS.ADMIN.DISH_TOGGLE_AVAILABILITY(id)
        );
        return response.data.data;
    },
};

// ============= DISH CATEGORIES MANAGEMENT =============

export const adminDishCategories = {
    getAll: async (
        filters?: { search?: string },
        page = 1,
        limit = 20
    ): Promise<PaginatedResponse<DishCategory>> => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    params.append(key, value.toString());
                }
            });
        }

        const response = await api.get<PaginatedResponse<DishCategory>>(
            `${API_ENDPOINTS.ADMIN.CATEGORIES}?${params}`
        );
        return response.data;
    },

    getById: async (id: number): Promise<DishCategory> => {
        const response = await api.get<ApiResponse<DishCategory>>(
            API_ENDPOINTS.ADMIN.CATEGORY_DETAIL(id)
        );
        return response.data.data;
    },

    create: async (data: CategoryForm): Promise<DishCategory> => {
        const response = await api.post<ApiResponse<DishCategory>>(
            API_ENDPOINTS.ADMIN.CATEGORY_CREATE,
            data
        );
        return response.data.data;
    },

    update: async (id: number, data: Partial<CategoryForm>): Promise<DishCategory> => {
        const response = await api.put<ApiResponse<DishCategory>>(
            API_ENDPOINTS.ADMIN.CATEGORY_UPDATE(id),
            data
        );
        return response.data.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(API_ENDPOINTS.ADMIN.CATEGORY_DELETE(id));
    },

    toggleStatus: async (id: number): Promise<DishCategory> => {
        const response = await api.patch<ApiResponse<DishCategory>>(
            API_ENDPOINTS.ADMIN.CATEGORY_TOGGLE_STATUS(id)
        );
        return response.data.data;
    },
};

// ============= ORDERS MANAGEMENT =============

export const adminOrders = {
    getAll: async (
        filters?: AdminOrderFilters,
        page = 1,
        limit = 20
    ): Promise<PaginatedResponse<Order>> => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    params.append(key, value.toString());
                }
            });
        }

        const response = await api.get<PaginatedResponse<Order>>(
            `${API_ENDPOINTS.ADMIN.ORDERS}?${params}`
        );
        return response.data;
    },

    getById: async (id: number): Promise<Order> => {
        const response = await api.get<ApiResponse<Order>>(
            API_ENDPOINTS.ADMIN.ORDER_DETAIL(id)
        );
        return response.data.data;
    },

    updateStatus: async (id: number, status: string): Promise<Order> => {
        const response = await api.patch<ApiResponse<Order>>(
            API_ENDPOINTS.ADMIN.ORDER_UPDATE_STATUS(id),
            { status }
        );
        return response.data.data;
    },

    cancel: async (id: number, reason?: string): Promise<Order> => {
        const response = await api.patch<ApiResponse<Order>>(
            API_ENDPOINTS.ADMIN.ORDER_CANCEL(id),
            { reason }
        );
        return response.data.data;
    },

    refund: async (id: number, amount?: number, reason?: string): Promise<Order> => {
        const response = await api.patch<ApiResponse<Order>>(
            API_ENDPOINTS.ADMIN.ORDER_REFUND(id),
            { amount, reason }
        );
        return response.data.data;
    },
};

// ============= USERS MANAGEMENT =============

export const adminUsers = {
    getAll: async (
        filters?: AdminUserFilters,
        page = 1,
        limit = 20
    ): Promise<PaginatedResponse<User>> => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    params.append(key, value.toString());
                }
            });
        }

        const response = await api.get<PaginatedResponse<User>>(
            `${API_ENDPOINTS.ADMIN.USERS}?${params}`
        );
        return response.data;
    },

    getById: async (id: number): Promise<User> => {
        const response = await api.get<ApiResponse<User>>(
            API_ENDPOINTS.ADMIN.USER_DETAIL(id)
        );
        return response.data.data;
    },

    update: async (id: number, data: Partial<User>): Promise<User> => {
        const response = await api.put<ApiResponse<User>>(
            API_ENDPOINTS.ADMIN.USER_UPDATE(id),
            data
        );
        return response.data.data;
    },

    toggleStatus: async (id: number): Promise<User> => {
        const response = await api.patch<ApiResponse<User>>(
            API_ENDPOINTS.ADMIN.USER_TOGGLE_STATUS(id)
        );
        return response.data.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(API_ENDPOINTS.ADMIN.USER_DELETE(id));
    },
};

// ============= CATEGORIES MANAGEMENT =============

export const adminCategories = {
    getRestaurantCategories: async (): Promise<RestaurantCategory[]> => {
        const response = await api.get<ApiResponse<RestaurantCategory[]>>(
            API_ENDPOINTS.ADMIN.CATEGORIES
        );
        return response.data.data;
    },

    getDishCategories: async (restaurantId?: number): Promise<DishCategory[]> => {
        const params = restaurantId ? `?restaurantId=${restaurantId}` : '';
        const response = await api.get<ApiResponse<DishCategory[]>>(
            `${API_ENDPOINTS.ADMIN.CATEGORIES}${params}`
        );
        return response.data.data;
    },

    create: async (data: CategoryForm): Promise<RestaurantCategory | DishCategory> => {
        const response = await api.post<ApiResponse<RestaurantCategory | DishCategory>>(
            API_ENDPOINTS.ADMIN.CATEGORY_CREATE,
            data
        );
        return response.data.data;
    },

    update: async (
        id: number,
        data: Partial<CategoryForm>
    ): Promise<RestaurantCategory | DishCategory> => {
        const response = await api.put<ApiResponse<RestaurantCategory | DishCategory>>(
            API_ENDPOINTS.ADMIN.CATEGORY_UPDATE(id),
            data
        );
        return response.data.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(API_ENDPOINTS.ADMIN.CATEGORY_DELETE(id));
    },
};

// ============= REPORTS =============

export const adminReports = {
    getSalesReport: async (
        period: 'day' | 'week' | 'month' | 'year',
        startDate?: string,
        endDate?: string
    ): Promise<SalesReport> => {
        const params = new URLSearchParams();
        params.append('period', period);
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        const response = await api.get<ApiResponse<SalesReport>>(
            `${API_ENDPOINTS.ADMIN.SALES_REPORT}?${params}`
        );
        return response.data.data;
    },

    getUsersReport: async (): Promise<UserReport> => {
        const response = await api.get<ApiResponse<UserReport>>(
            API_ENDPOINTS.ADMIN.USERS_REPORT
        );
        return response.data.data;
    },

    exportReport: async (
        type: 'sales' | 'users',
        format: 'csv' | 'excel' | 'pdf',
        filters?: any
    ): Promise<Blob> => {
        const params = new URLSearchParams();
        params.append('type', type);
        params.append('format', format);
        
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    params.append(key, value.toString());
                }
            });
        }

        const response = await api.get(
            `${API_ENDPOINTS.ADMIN.EXPORT_REPORT}?${params}`,
            {
                responseType: 'blob',
            }
        );
        return response.data as Blob;
    },
};