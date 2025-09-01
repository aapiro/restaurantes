// Layout components
export { default as AdminLayout } from './layout/AdminLayout';
export { default as AdminSidebar } from './layout/AdminSidebar';
export { default as AdminHeader } from './layout/AdminHeader';

// Common components
export { default as ProtectedRoute } from './common/ProtectedRoute';

// Admin pages
export { default as AdminLogin } from '../../pages/admin/AdminLogin';
export { default as AdminDashboard } from '../../pages/admin/AdminDashboard';
export { default as RestaurantsManagement } from '../../pages/admin/RestaurantsManagement';
export { default as OrdersManagement } from '../../pages/admin/OrdersManagement';
export { default as UsersManagement } from '../../pages/admin/UsersManagement';
export { default as ReportsPage } from '../../pages/admin/ReportsPage';

// Services
export * from '../../services/admin';

// Store
export { useAdminStore } from '../../store/adminStore';