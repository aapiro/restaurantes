import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Tiempo que los datos se consideran "frescos" (5 minutos)
            staleTime: 5 * 60 * 1000,
            // Tiempo que los datos se mantienen en cache (10 minutos) - gcTime en v4+
            gcTime: 10 * 60 * 1000,
            // Reintentar una vez en caso de error
            retry: 1,
            // No refetch automáticamente cuando la ventana gana foco
            refetchOnWindowFocus: false,
            // Refetch cuando se reconecta a internet
            refetchOnReconnect: true,
        },
        mutations: {
            // Reintentar mutaciones fallidas una vez
            retry: 1,
        },
    },
});

// Query Keys para consistencia
export const QUERY_KEYS = {
    // Restaurants
    RESTAURANTS: ['restaurants'] as const,
    RESTAURANT: (id: number) => ['restaurants', id] as const,
    RESTAURANT_DISHES: (id: number) => ['restaurants', id, 'dishes'] as const,
    RESTAURANT_CATEGORIES: ['restaurants', 'categories'] as const,

    // Dishes
    DISHES: ['dishes'] as const,
    DISH: (id: number) => ['dishes', id] as const,
    DISH_CATEGORIES: (restaurantId: number) => ['restaurants', restaurantId, 'dish-categories'] as const,

    // Orders
    ORDERS: ['orders'] as const,
    ORDER: (id: number) => ['orders', id] as const,
    ORDER_TRACKING: (id: number) => ['orders', id, 'tracking'] as const,

    // User
    USER_PROFILE: ['user', 'profile'] as const,
    USER_ADDRESSES: ['user', 'addresses'] as const,

    // Cart
    CART: ['cart'] as const,

    // Search
    SEARCH_RESTAURANTS: (query: string, filters?: any) => ['search', 'restaurants', query, filters] as const,
    SEARCH_DISHES: (query: string, filters?: any) => ['search', 'dishes', query, filters] as const,
} as const;