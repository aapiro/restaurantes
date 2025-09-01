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

// ============= ADMIN SYSTEM =============

export interface Admin {
    id: number;
    email: string;
    name: string;
    avatar?: string;
    role: AdminRole;
    permissions: AdminPermission[];
    isActive: boolean;
    lastLogin?: string;
    createdAt: string;
    updatedAt: string;
}

export enum AdminRole {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    MODERATOR = 'MODERATOR'
}

export enum AdminPermission {
    // Restaurantes
    VIEW_RESTAURANTS = 'VIEW_RESTAURANTS',
    CREATE_RESTAURANTS = 'CREATE_RESTAURANTS',
    EDIT_RESTAURANTS = 'EDIT_RESTAURANTS',
    DELETE_RESTAURANTS = 'DELETE_RESTAURANTS',
    MANAGE_RESTAURANT_STATUS = 'MANAGE_RESTAURANT_STATUS',
    
    // Platos
    VIEW_DISHES = 'VIEW_DISHES',
    CREATE_DISHES = 'CREATE_DISHES',
    EDIT_DISHES = 'EDIT_DISHES',
    DELETE_DISHES = 'DELETE_DISHES',
    MANAGE_DISH_AVAILABILITY = 'MANAGE_DISH_AVAILABILITY',
    
    // Pedidos
    VIEW_ORDERS = 'VIEW_ORDERS',
    MANAGE_ORDER_STATUS = 'MANAGE_ORDER_STATUS',
    CANCEL_ORDERS = 'CANCEL_ORDERS',
    REFUND_ORDERS = 'REFUND_ORDERS',
    
    // Usuarios
    VIEW_USERS = 'VIEW_USERS',
    EDIT_USERS = 'EDIT_USERS',
    DEACTIVATE_USERS = 'DEACTIVATE_USERS',
    DELETE_USERS = 'DELETE_USERS',
    
    // Categorías
    VIEW_CATEGORIES = 'VIEW_CATEGORIES',
    CREATE_CATEGORIES = 'CREATE_CATEGORIES',
    EDIT_CATEGORIES = 'EDIT_CATEGORIES',
    DELETE_CATEGORIES = 'DELETE_CATEGORIES',
    
    // Reportes
    VIEW_ANALYTICS = 'VIEW_ANALYTICS',
    EXPORT_REPORTS = 'EXPORT_REPORTS',
    
    // Sistema
    MANAGE_ADMINS = 'MANAGE_ADMINS',
    SYSTEM_SETTINGS = 'SYSTEM_SETTINGS'
}

export interface AdminLoginForm {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface AdminLoginResponse {
    admin: Admin;
    token: string;
    refreshToken: string;
    expiresIn: number;
}

// ============= ADMIN DASHBOARD =============

export interface DashboardStats {
    totalRestaurants: number;
    activeRestaurants: number;
    totalOrders: number;
    todayOrders: number;
    totalUsers: number;
    activeUsers: number;
    totalRevenue: number;
    todayRevenue: number;
    averageOrderValue: number;
    popularRestaurants: PopularRestaurant[];
    recentOrders: Order[];
    ordersByStatus: OrderStatusCount[];
    revenueByMonth: RevenueByMonth[];
}

export interface PopularRestaurant {
    restaurant: Restaurant;
    orderCount: number;
    revenue: number;
}

export interface OrderStatusCount {
    status: OrderStatus;
    count: number;
    percentage: number;
}

export interface RevenueByMonth {
    month: string;
    revenue: number;
    orderCount: number;
}

// ============= ADMIN FILTERS =============

export interface AdminRestaurantFilters {
    search?: string;
    category?: string;
    status?: 'active' | 'inactive';
    isOpen?: boolean;
    city?: string;
    sortBy?: 'name' | 'createdAt' | 'rating' | 'orderCount';
    sortOrder?: 'asc' | 'desc';
}

export interface AdminOrderFilters {
    search?: string;
    status?: OrderStatus;
    restaurantId?: number;
    userId?: number;
    dateFrom?: string;
    dateTo?: string;
    minAmount?: number;
    maxAmount?: number;
    paymentMethod?: PaymentMethod;
    sortBy?: 'createdAt' | 'total' | 'status';
    sortOrder?: 'asc' | 'desc';
}

export interface AdminUserFilters {
    search?: string;
    status?: 'active' | 'inactive';
    registeredFrom?: string;
    registeredTo?: string;
    hasOrders?: boolean;
    sortBy?: 'name' | 'createdAt' | 'lastOrder';
    sortOrder?: 'asc' | 'desc';
}

// ============= ADMIN FORMS =============

export interface RestaurantForm {
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    categoryId: number;
    deliveryTime: string;
    deliveryFee: number;
    minimumOrder: number;
    isActive: boolean;
    logo?: File;
    coverImage?: File;
}

export interface DishForm {
    restaurantId: number;
    categoryId: number;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    preparationTime: number;
    ingredients: string[];
    allergens: string[];
    isAvailable: boolean;
    isPopular: boolean;
    image?: File;
    images?: File[];
}

export interface CategoryForm {
    name: string;
    slug: string;
    icon: string;
    restaurantId?: number; // Para categorías de platos
}

// ============= ADMIN REPORTS =============

export interface SalesReport {
    period: 'day' | 'week' | 'month' | 'year';
    startDate: string;
    endDate: string;
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    topRestaurants: PopularRestaurant[];
    topDishes: PopularDish[];
    revenueByDay: DailyRevenue[];
}

export interface PopularDish {
    dish: Dish;
    orderCount: number;
    revenue: number;
}

export interface DailyRevenue {
    date: string;
    revenue: number;
    orderCount: number;
}

export interface UserReport {
    totalUsers: number;
    newUsersThisMonth: number;
    activeUsers: number;
    usersByMonth: UsersByMonth[];
    topCustomers: TopCustomer[];
}

export interface UsersByMonth {
    month: string;
    newUsers: number;
    totalUsers: number;
}

export interface TopCustomer {
    user: User;
    totalOrders: number;
    totalSpent: number;
    lastOrderDate: string;
}