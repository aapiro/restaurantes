// ============= ENTITIES =============

export interface Restaurant {
    id: number;
    name: string;
    description: string;
    logo: string;
    coverImage: string;
    address: string;
    phone: string;
    email: string;
    rating: number;
    reviewCount: number;
    deliveryTime: string;
    deliveryFee: number;
    minimumOrder: number;
    isActive: boolean;
    isOpen: boolean;
    category: RestaurantCategory;
    createdAt: string;
    updatedAt: string;
}

export interface RestaurantCategory {
    id: number;
    name: string;
    slug: string;
    icon: string;
}

export interface Dish {
    id: number;
    restaurantId: number;
    categoryId: number;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    images?: string[];
    isAvailable: boolean;
    isPopular: boolean;
    preparationTime: number;
    ingredients: string[];
    allergens: string[];
    nutritionalInfo?: NutritionalInfo;
    category: DishCategory;
    restaurant?: Restaurant;
    createdAt: string;
    updatedAt: string;
}

export interface DishCategory {
    id: number;
    restaurantId: number;
    name: string;
    slug: string;
    displayOrder: number;
    isActive: boolean;
}

export interface NutritionalInfo {
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
    fiber?: number;
    sodium?: number;
}

export interface User {
    id: number;
    email: string;
    name: string;
    phone: string;
    avatar?: string;
    addresses: Address[];
    defaultAddressId?: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Address {
    id: number;
    userId: number;
    title: string; // Casa, Trabajo, etc.
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    instructions?: string;
    isDefault: boolean;
}

export interface Order {
    id: number;
    userId: number;
    restaurantId: number;
    status: OrderStatus;
    items: OrderItem[];
    subtotal: number;
    deliveryFee: number;
    tax: number;
    discount: number;
    total: number;
    deliveryAddress: Address;
    estimatedDeliveryTime: string;
    actualDeliveryTime?: string;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    notes?: string;
    restaurant: Restaurant;
    user: User;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    id: number;
    orderId: number;
    dishId: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    specialInstructions?: string;
    dish: Dish;
}

// ============= ENUMS =============

export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    PREPARING = 'PREPARING',
    READY = 'READY',
    OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export enum PaymentMethod {
    CREDIT_CARD = 'CREDIT_CARD',
    DEBIT_CARD = 'DEBIT_CARD',
    CASH = 'CASH',
    DIGITAL_WALLET = 'DIGITAL_WALLET'
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED'
}

// ============= CART =============

export interface CartItem {
    id: string; // UUID temporal para el cart
    dishId: number;
    dish: Dish;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    specialInstructions?: string;
    restaurantId: number;
}

export interface Cart {
    items: CartItem[];
    restaurantId: number | null;
    restaurant: Restaurant | null;
    subtotal: number;
    deliveryFee: number;
    tax: number;
    total: number;
    itemCount: number;
}

// ============= API RESPONSES =============

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    errors?: string[];
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export interface LoginResponse {
    user: User;
    token: string;
    refreshToken: string;
    expiresIn: number;
}

export interface RegisterResponse {
    user: User;
    token: string;
    refreshToken: string;
    expiresIn: number;
}

// ============= FORM DATA =============

export interface LoginForm {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterForm {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
}

export interface CheckoutForm {
    deliveryAddress: Address;
    paymentMethod: PaymentMethod;
    notes?: string;
}

export interface AddressForm {
    title: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    instructions?: string;
    isDefault: boolean;
}

// ============= FILTERS & SEARCH =============

export interface RestaurantFilters {
    category?: string;
    rating?: number;
    deliveryTime?: number;
    deliveryFee?: number;
    minimumOrder?: number;
    search?: string;
    isOpen?: boolean;
}

export interface DishFilters {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    isPopular?: boolean;
    isAvailable?: boolean;
    search?: string;
}

export interface SearchParams {
    query: string;
    filters?: RestaurantFilters | DishFilters;
    sortBy?: 'name' | 'rating' | 'deliveryTime' | 'price';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

// ============= UI STATES =============

export interface LoadingState {
    isLoading: boolean;
    error?: string | null;
}

export interface PaginationState {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
}

// ============= NOTIFICATION =============

export interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}