import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, User, Address, Notification } from '../types';
import { CACHE_KEYS, ORDER_CONFIG } from '../constants';

// ============= AUTH STORE =============

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

interface AuthActions {
    login: (user: User, token: string) => void;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set, get) => ({
            // Estado inicial
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,

            // Acciones
            login: (user, token) => {
                set({
                    user,
                    token,
                    isAuthenticated: true,
                    isLoading: false,
                });
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
                // Limpiar otros stores relacionados
                useCartStore.getState().clearCart();
            },

            updateUser: (userData) => {
                const currentUser = get().user;
                if (currentUser) {
                    set({
                        user: { ...currentUser, ...userData },
                    });
                }
            },

            setLoading: (loading) => {
                set({ isLoading: loading });
            },
        }),
        {
            name: CACHE_KEYS.USER,
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

// ============= CART STORE =============

interface CartState {
    items: CartItem[];
    restaurantId: number | null;
    isOpen: boolean;
}

interface CartActions {
    addItem: (item: Omit<CartItem, 'id' | 'totalPrice'>) => void;
    removeItem: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    getSubtotal: () => number;
    getItemCount: () => number;
    getDeliveryFee: () => number;
    getTax: () => number;
    getTotal: () => number;
    canAddItem: (restaurantId: number) => boolean;
}

export const useCartStore = create<CartState & CartActions>()(
    persist(
        (set, get) => ({
            // Estado inicial
            items: [],
            restaurantId: null,
            isOpen: false,

            // Acciones
            addItem: (newItem) => {
                const state = get();

                // Verificar si se puede agregar el item
                if (!state.canAddItem(newItem.restaurantId)) {
                    throw new Error('No puedes agregar productos de diferentes restaurantes');
                }

                const existingItemIndex = state.items.findIndex(
                    item => item.dishId === newItem.dishId
                );

                if (existingItemIndex >= 0) {
                    // Actualizar cantidad si el item ya existe
                    const updatedItems = [...state.items];
                    const existingItem = updatedItems[existingItemIndex];
                    updatedItems[existingItemIndex] = {
                        ...existingItem,
                        quantity: existingItem.quantity + newItem.quantity,
                        totalPrice: (existingItem.quantity + newItem.quantity) * existingItem.unitPrice,
                    };

                    set({
                        items: updatedItems,
                    });
                } else {
                    // Agregar nuevo item
                    const cartItem: CartItem = {
                        ...newItem,
                        id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                        totalPrice: newItem.quantity * newItem.unitPrice,
                    };

                    set({
                        items: [...state.items, cartItem],
                        restaurantId: newItem.restaurantId,
                    });
                }
            },

            removeItem: (itemId) => {
                const state = get();
                const updatedItems = state.items.filter(item => item.id !== itemId);

                set({
                    items: updatedItems,
                    restaurantId: updatedItems.length > 0 ? state.restaurantId : null,
                });
            },

            updateQuantity: (itemId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(itemId);
                    return;
                }

                const state = get();
                const updatedItems = state.items.map(item =>
                    item.id === itemId
                        ? {
                            ...item,
                            quantity,
                            totalPrice: quantity * item.unitPrice,
                        }
                        : item
                );

                set({ items: updatedItems });
            },

            clearCart: () => {
                set({
                    items: [],
                    restaurantId: null,
                    isOpen: false,
                });
            },

            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),

            // Cálculos
            getSubtotal: () => {
                const { items } = get();
                return items.reduce((total, item) => total + item.totalPrice, 0);
            },

            getItemCount: () => {
                const { items } = get();
                return items.reduce((count, item) => count + item.quantity, 0);
            },

            getDeliveryFee: () => {
                const subtotal = get().getSubtotal();
                return subtotal >= ORDER_CONFIG.FREE_DELIVERY_THRESHOLD
                    ? 0
                    : ORDER_CONFIG.DEFAULT_DELIVERY_FEE;
            },

            getTax: () => {
                const subtotal = get().getSubtotal();
                return subtotal * ORDER_CONFIG.TAX_RATE;
            },

            getTotal: () => {
                const state = get();
                return state.getSubtotal() + state.getDeliveryFee() + state.getTax();
            },

            canAddItem: (restaurantId) => {
                const { items, restaurantId: currentRestaurantId } = get();
                return items.length === 0 || currentRestaurantId === restaurantId;
            },
        }),
        {
            name: CACHE_KEYS.CART,
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                items: state.items,
                restaurantId: state.restaurantId,
            }),
        }
    )
);

// ============= NOTIFICATION STORE =============

interface NotificationState {
    notifications: Notification[];
}

interface NotificationActions {
    addNotification: (notification: Omit<Notification, 'id'>) => void;
    removeNotification: (id: string) => void;
    clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState & NotificationActions>((set, get) => ({
    notifications: [],

    addNotification: (notification) => {
        const id = `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newNotification: Notification = {
            ...notification,
            id,
        };

        set((state) => ({
            notifications: [...state.notifications, newNotification],
        }));

        // Auto-remove después del tiempo especificado
        if (notification.duration !== 0) {
            setTimeout(() => {
                get().removeNotification(id);
            }, notification.duration || 5000);
        }
    },

    removeNotification: (id) => {
        set((state) => ({
            notifications: state.notifications.filter(n => n.id !== id),
        }));
    },

    clearNotifications: () => {
        set({ notifications: [] });
    },
}));

// ============= UI STORE =============

interface UIState {
    isMobileMenuOpen: boolean;
    isCartOpen: boolean;
    selectedAddress: Address | null;
    searchQuery: string;
    activeFilters: Record<string, any>;
}

interface UIActions {
    toggleMobileMenu: () => void;
    setMobileMenuOpen: (open: boolean) => void;
    toggleCart: () => void;
    setCartOpen: (open: boolean) => void;
    setSelectedAddress: (address: Address | null) => void;
    setSearchQuery: (query: string) => void;
    setActiveFilters: (filters: Record<string, any>) => void;
    clearFilters: () => void;
}

export const useUIStore = create<UIState & UIActions>((set) => ({
    // Estado inicial
    isMobileMenuOpen: false,
    isCartOpen: false,
    selectedAddress: null,
    searchQuery: '',
    activeFilters: {},

    // Acciones
    toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

    toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
    setCartOpen: (open) => set({ isCartOpen: open }),

    setSelectedAddress: (address) => set({ selectedAddress: address }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setActiveFilters: (filters) => set({ activeFilters: filters }),
    clearFilters: () => set({ activeFilters: {} }),
}));