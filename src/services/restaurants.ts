import { api } from './api';
import { API_ENDPOINTS } from '../constants';
import { Restaurant, Dish, RestaurantFilters, PaginatedResponse } from '../types';

export const restaurantsService = {
    // ============= RESTAURANTS =============

    async getRestaurants(filters?: RestaurantFilters, page = 1, limit = 12): Promise<PaginatedResponse<Restaurant>> {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...(filters?.search && { search: filters.search }),
            ...(filters?.category && { category: filters.category }),
            ...(filters?.rating && { minRating: filters.rating.toString() }),
            ...(filters?.deliveryTime && { maxDeliveryTime: filters.deliveryTime.toString() }),
            ...(filters?.deliveryFee && { maxDeliveryFee: filters.deliveryFee.toString() }),
            ...(filters?.minimumOrder && { maxMinimumOrder: filters.minimumOrder.toString() }),
            ...(filters?.isOpen !== undefined && { isOpen: filters.isOpen.toString() }),
        });

        const response = await api.get<PaginatedResponse<Restaurant>>(
            `${API_ENDPOINTS.RESTAURANTS.LIST}?${params}`
        );
        return response.data;
    },

    async getRestaurant(id: number): Promise<Restaurant> {
        const response = await api.get<Restaurant>(API_ENDPOINTS.RESTAURANTS.DETAIL(id));
        return response.data;
    },

    async getRestaurantDishes(id: number): Promise<Dish[]> {
        const response = await api.get<Dish[]>(API_ENDPOINTS.RESTAURANTS.DISHES(id));
        return response.data;
    },

    async searchRestaurants(query: string, filters?: RestaurantFilters): Promise<Restaurant[]> {
        const params = new URLSearchParams({
            q: query,
            ...(filters?.category && { category: filters.category }),
            ...(filters?.rating && { minRating: filters.rating.toString() }),
            ...(filters?.isOpen !== undefined && { isOpen: filters.isOpen.toString() }),
        });

        const response = await api.get<Restaurant[]>(
            `${API_ENDPOINTS.RESTAURANTS.SEARCH}?${params}`
        );
        return response.data;
    },

    // ============= DISHES =============

    async getDish(id: number): Promise<Dish> {
        const response = await api.get<Dish>(API_ENDPOINTS.DISHES.DETAIL(id));
        return response.data;
    },

    async getDishCategories(restaurantId: number) {
        const response = await api.get(API_ENDPOINTS.DISHES.CATEGORIES(restaurantId));
        return response.data;
    },

    async searchDishes(query: string): Promise<Dish[]> {
        const params = new URLSearchParams({ q: query });
        const response = await api.get<Dish[]>(`${API_ENDPOINTS.DISHES.SEARCH}?${params}`);
        return response.data;
    },
};

// ============= REACT QUERY HOOKS =============

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryClient';

export const useRestaurants = (
    filters?: RestaurantFilters,
    page = 1,
    limit = 12
): UseQueryResult<PaginatedResponse<Restaurant>, Error> => {
    return useQuery({
        queryKey: [...QUERY_KEYS.RESTAURANTS, filters, page, limit],
        queryFn: () => restaurantsService.getRestaurants(filters, page, limit),
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
};

export const useRestaurant = (id: number): UseQueryResult<Restaurant, Error> => {
    return useQuery({
        queryKey: QUERY_KEYS.RESTAURANT(id),
        queryFn: () => restaurantsService.getRestaurant(id),
        enabled: !!id && id > 0,
        staleTime: 5 * 60 * 1000,
    });
};

export const useRestaurantDishes = (restaurantId: number): UseQueryResult<Dish[], Error> => {
    return useQuery({
        queryKey: QUERY_KEYS.RESTAURANT_DISHES(restaurantId),
        queryFn: () => restaurantsService.getRestaurantDishes(restaurantId),
        enabled: !!restaurantId && restaurantId > 0,
        staleTime: 2 * 60 * 1000, // 2 minutos para platos
    });
};

export const useDish = (id: number): UseQueryResult<Dish, Error> => {
    return useQuery({
        queryKey: QUERY_KEYS.DISH(id),
        queryFn: () => restaurantsService.getDish(id),
        enabled: !!id && id > 0,
        staleTime: 5 * 60 * 1000,
    });
};

export const useSearchRestaurants = (
    query: string,
    filters?: RestaurantFilters
): UseQueryResult<Restaurant[], Error> => {
    return useQuery({
        queryKey: QUERY_KEYS.SEARCH_RESTAURANTS(query, filters),
        queryFn: () => restaurantsService.searchRestaurants(query, filters),
        enabled: !!query && query.trim().length > 0,
        staleTime: 2 * 60 * 1000,
    });
};