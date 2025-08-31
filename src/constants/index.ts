// ============= API CONFIGURATION =============

export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
} as const;

export const API_ENDPOINTS = {
    // Auth
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        REFRESH: '/auth/refresh',
        LOGOUT: '/auth/logout',
        PROFILE: '/auth/profile',
    },

    // Restaurants
    RESTAURANTS: {
        LIST: '/restaurants',
        DETAIL: (id: number) => `/restaurants/${id}`,
        DISHES: (id: number) => `/restaurants/${id}/dishes`,
        CATEGORIES: '/restaurants/categories',
        SEARCH: '/restaurants/search',
    },

    // Dishes
    DISHES: {
        LIST: '/dishes',
        DETAIL: (id: number) => `/dishes/${id}`,
        CATEGORIES: (restaurantId: number) => `/restaurants/${restaurantId}/dish-categories`,
        SEARCH: '/dishes/search',
    },

    // Orders
    ORDERS: {
        LIST: '/orders',
        CREATE: '/orders',
        DETAIL: (id: number) => `/orders/${id}`,
        CANCEL: (id: number) => `/orders/${id}/cancel`,
        TRACK: (id: number) => `/orders/${id}/track`,
    },

    // Cart
    CART: {
        GET: '/cart',
        ADD: '/cart/add',
        UPDATE: '/cart/update',
        REMOVE: '/cart/remove',
        CLEAR: '/cart/clear',
    },

    // Users
    USERS: {
        ADDRESSES: '/users/addresses',
        ADD_ADDRESS: '/users/addresses',
        UPDATE_ADDRESS: (id: number) => `/users/addresses/${id}`,
        DELETE_ADDRESS: (id: number) => `/users/addresses/${id}`,
        SET_DEFAULT_ADDRESS: (id: number) => `/users/addresses/${id}/default`,
    },

    // Payments
    PAYMENTS: {
        METHODS: '/payments/methods',
        PROCESS: '/payments/process',
        WEBHOOK: '/payments/webhook',
    },

    // Admin
    ADMIN: {
        LOGIN: '/admin/auth/login',
        LOGOUT: '/admin/auth/logout',
        REFRESH: '/admin/auth/refresh',
        PROFILE: '/admin/auth/profile',
        
        // Dashboard
        DASHBOARD: '/admin/dashboard',
        STATS: '/admin/dashboard/stats',
        
        // Restaurants Management
        RESTAURANTS: '/admin/restaurants',
        RESTAURANT_DETAIL: (id: number) => `/admin/restaurants/${id}`,
        RESTAURANT_CREATE: '/admin/restaurants',
        RESTAURANT_UPDATE: (id: number) => `/admin/restaurants/${id}`,
        RESTAURANT_DELETE: (id: number) => `/admin/restaurants/${id}`,
        RESTAURANT_TOGGLE_STATUS: (id: number) => `/admin/restaurants/${id}/toggle-status`,
        
        // Dishes Management
        DISHES: '/admin/dishes',
        DISH_DETAIL: (id: number) => `/admin/dishes/${id}`,
        DISH_CREATE: '/admin/dishes',
        DISH_UPDATE: (id: number) => `/admin/dishes/${id}`,
        DISH_DELETE: (id: number) => `/admin/dishes/${id}`,
        DISH_TOGGLE_AVAILABILITY: (id: number) => `/admin/dishes/${id}/toggle-availability`,

        // Categories Management
        CATEGORIES: '/admin/categories',
        CATEGORY_DETAIL: (id: number) => `/admin/categories/${id}`,
        CATEGORY_CREATE: '/admin/categories',
        CATEGORY_UPDATE: (id: number) => `/admin/categories/${id}`,
        CATEGORY_DELETE: (id: number) => `/admin/categories/${id}`,
        CATEGORY_TOGGLE_STATUS: (id: number) => `/admin/categories/${id}/toggle-status`,
        
        // Orders Management
        ORDERS: '/admin/orders',
        ORDER_DETAIL: (id: number) => `/admin/orders/${id}`,
        ORDER_UPDATE_STATUS: (id: number) => `/admin/orders/${id}/status`,
        ORDER_CANCEL: (id: number) => `/admin/orders/${id}/cancel`,
        ORDER_REFUND: (id: number) => `/admin/orders/${id}/refund`,
        
        // Users Management
        USERS: '/admin/users',
        USER_DETAIL: (id: number) => `/admin/users/${id}`,
        USER_UPDATE: (id: number) => `/admin/users/${id}`,
        USER_TOGGLE_STATUS: (id: number) => `/admin/users/${id}/toggle-status`,
        USER_DELETE: (id: number) => `/admin/users/${id}`,
        
        // Reports
        REPORTS: '/admin/reports',
        SALES_REPORT: '/admin/reports/sales',
        USERS_REPORT: '/admin/reports/users',
        EXPORT_REPORT: '/admin/reports/export',
        
        // System
        ADMINS: '/admin/system/admins',
        SETTINGS: '/admin/system/settings',
    },
} as const;

// ============= APP CONFIGURATION =============

export const APP_CONFIG = {
    NAME: 'DeliveryApp',
    VERSION: '1.0.0',
    DESCRIPTION: 'Plataforma de delivery multi-restaurantes',
    CONTACT_EMAIL: 'soporte@deliveryapp.com',
    CONTACT_PHONE: '+34 947 123 456',
} as const;

export const CACHE_KEYS = {
    USER: 'delivery_user',
    TOKEN: 'delivery_token',
    REFRESH_TOKEN: 'delivery_refresh_token',
    CART: 'delivery_cart',
    RECENT_SEARCHES: 'delivery_recent_searches',
    FAVORITE_RESTAURANTS: 'delivery_favorites',
    SELECTED_ADDRESS: 'delivery_selected_address',
} as const;

// ============= UI CONSTANTS =============

export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 12,
    RESTAURANTS_PER_PAGE: 12,
    DISHES_PER_PAGE: 20,
    ORDERS_PER_PAGE: 10,
} as const;

export const DEBOUNCE_DELAY = {
    SEARCH: 300,
    API_CALLS: 500,
    AUTO_SAVE: 1000,
} as const;

export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
} as const;

// ============= BUSINESS LOGIC CONSTANTS =============

export const ORDER_CONFIG = {
    MINIMUM_ORDER_AMOUNT: 10.00,
    DEFAULT_DELIVERY_FEE: 2.99,
    FREE_DELIVERY_THRESHOLD: 25.00,
    TAX_RATE: 0.08, // 8%
    MAX_ITEMS_PER_DISH: 20,
    ESTIMATED_PREP_TIME: 25, // minutos
} as const;

export const DELIVERY_ZONES = {
    MADRID: {
        name: 'Madrid',
        coordinates: { lat: 40.4168, lng: -3.7038 },
        radius: 15, // km
        deliveryFee: 2.99,
    },
    BARCELONA: {
        name: 'Barcelona',
        coordinates: { lat: 41.3851, lng: 2.1734 },
        radius: 12, // km
        deliveryFee: 3.50,
    },
    // Agregar más zonas según necesidad
} as const;

export const RESTAURANT_STATUS = {
    OPEN: 'open',
    CLOSED: 'closed',
    BUSY: 'busy',
    TEMPORARILY_CLOSED: 'temporarily_closed',
} as const;

// ============= VALIDATION RULES =============

export const VALIDATION_RULES = {
    PASSWORD: {
        MIN_LENGTH: 8,
        MAX_LENGTH: 128,
        REQUIRE_UPPERCASE: true,
        REQUIRE_LOWERCASE: true,
        REQUIRE_NUMBER: true,
        REQUIRE_SPECIAL_CHAR: false,
    },

    PHONE: {
        MIN_LENGTH: 9,
        MAX_LENGTH: 15,
        PATTERN: /^(\+34)?[6-9]\d{8}$/,
    },

    EMAIL: {
        PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    NAME: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 100,
    },

    ADDRESS: {
        MIN_LENGTH: 10,
        MAX_LENGTH: 200,
    },
} as const;

// ============= NOTIFICATION SETTINGS =============

export const NOTIFICATION_CONFIG = {
    DEFAULT_DURATION: 5000, // 5 segundos
    ERROR_DURATION: 8000,   // 8 segundos
    SUCCESS_DURATION: 4000, // 4 segundos
    MAX_NOTIFICATIONS: 3,
} as const;

// ============= FILE UPLOAD =============

export const FILE_UPLOAD = {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    MAX_FILES: 5,
} as const;

// ============= ROUTES =============

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    RESTAURANTS: '/restaurants',
    RESTAURANT_DETAIL: (id: number) => `/restaurants/${id}`,
    DISH_DETAIL: (id: number) => `/dish/${id}`,
    CART: '/cart',
    CHECKOUT: '/checkout',
    ORDERS: '/orders',
    ORDER_DETAIL: (id: number) => `/orders/${id}`,
    PROFILE: '/profile',
    ADDRESSES: '/profile/addresses',
    SEARCH: '/search',
    HELP: '/help',
    TERMS: '/terms',
    PRIVACY: '/privacy',

    // Admin Routes
    ADMIN: {
        LOGIN: '/admin/login',
        DASHBOARD: '/admin',
        
        // Restaurants
        RESTAURANTS: '/admin/restaurants',
        RESTAURANT_DETAIL: (id: number) => `/admin/restaurants/${id}`,
        RESTAURANT_CREATE: '/admin/restaurants/create',
        RESTAURANT_EDIT: (id: number) => `/admin/restaurants/${id}/edit`,
        
        // Dishes
        DISHES: '/admin/dishes',
        DISH_DETAIL: (id: number) => `/admin/dishes/${id}`,
        DISH_CREATE: '/admin/dishes/create',
        DISH_EDIT: (id: number) => `/admin/dishes/${id}/edit`,

        // Categories
        CATEGORIES: '/admin/categories',
        CATEGORY_DETAIL: (id: number) => `/admin/categories/${id}`,
        CATEGORY_CREATE: '/admin/categories/create',
        CATEGORY_EDIT: (id: number) => `/admin/categories/${id}/edit`,
        
        // Orders
        ORDERS: '/admin/orders',
        ORDER_DETAIL: (id: number) => `/admin/orders/${id}`,
        
        // Users
        USERS: '/admin/users',
        USER_DETAIL: (id: number) => `/admin/users/${id}`,
        
        // Reports
        REPORTS: '/admin/reports',
        SALES_REPORT: '/admin/reports/sales',
        USERS_REPORT: '/admin/reports/users',
        
        // System
        ADMINS: '/admin/system/admins',
        SETTINGS: '/admin/system/settings',
        PROFILE: '/admin/profile',
    },
} as const;

// ============= ERROR MESSAGES =============

export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Error de conexión. Verifica tu internet e intenta nuevamente.',
    UNAUTHORIZED: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
    FORBIDDEN: 'No tienes permisos para realizar esta acción.',
    NOT_FOUND: 'El recurso solicitado no fue encontrado.',
    SERVER_ERROR: 'Error del servidor. Intenta nuevamente en unos minutos.',
    VALIDATION_ERROR: 'Por favor, verifica los datos ingresados.',
    CART_EMPTY: 'Tu carrito está vacío.',
    RESTAURANT_CLOSED: 'Este restaurante está cerrado en este momento.',
    DISH_UNAVAILABLE: 'Este plato no está disponible actualmente.',
    MINIMUM_ORDER: 'No has alcanzado el pedido mínimo requerido.',
    PAYMENT_FAILED: 'El pago no pudo ser procesado. Intenta con otro método.',
} as const;

// ============= SUCCESS MESSAGES =============

export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: '¡Bienvenido de vuelta!',
    REGISTER_SUCCESS: '¡Cuenta creada exitosamente!',
    ORDER_PLACED: '¡Pedido realizado con éxito!',
    ITEM_ADDED_TO_CART: 'Producto agregado al carrito',
    ADDRESS_SAVED: 'Dirección guardada correctamente',
    PROFILE_UPDATED: 'Perfil actualizado exitosamente',
    PASSWORD_CHANGED: 'Contraseña cambiada correctamente',
} as const;

// ============= FEATURE FLAGS =============

export const FEATURES = {
    ENABLE_REVIEWS: true,
    ENABLE_LOYALTY_PROGRAM: false,
    ENABLE_REAL_TIME_TRACKING: true,
    ENABLE_MULTI_PAYMENT: true,
    ENABLE_SCHEDULED_ORDERS: false,
    ENABLE_GROUP_ORDERS: false,
    ENABLE_CHAT_SUPPORT: true,
} as const;

// ============= ANIMATION DURATIONS =============

export const ANIMATIONS = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
    EXTRA_SLOW: 1000,
} as const;