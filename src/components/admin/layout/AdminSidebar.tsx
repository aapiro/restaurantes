import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Store, 
    UtensilsCrossed, 
    ShoppingBag, 
    Users, 
    Tags, 
    BarChart3, 
    Settings, 
    LogOut,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { ROUTES } from '../../../constants';
import { useAdminStore } from '../../../store/adminStore';
import { AdminPermission } from '../../../types';

interface SidebarItem {
    label: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    permission?: AdminPermission;
    children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
    {
        label: 'Dashboard',
        path: ROUTES.ADMIN.DASHBOARD,
        icon: LayoutDashboard,
    },
    {
        label: 'Restaurantes',
        path: ROUTES.ADMIN.RESTAURANTS,
        icon: Store,
        permission: AdminPermission.VIEW_RESTAURANTS,
    },
    {
        label: 'Platos',
        path: ROUTES.ADMIN.DISHES,
        icon: UtensilsCrossed,
        permission: AdminPermission.VIEW_DISHES,
    },
    {
        label: 'Pedidos',
        path: ROUTES.ADMIN.ORDERS,
        icon: ShoppingBag,
        permission: AdminPermission.VIEW_ORDERS,
    },
    {
        label: 'Usuarios',
        path: ROUTES.ADMIN.USERS,
        icon: Users,
        permission: AdminPermission.VIEW_USERS,
    },
    {
        label: 'Categorías',
        path: ROUTES.ADMIN.CATEGORIES,
        icon: Tags,
        permission: AdminPermission.VIEW_CATEGORIES,
    },
    {
        label: 'Reportes',
        path: ROUTES.ADMIN.REPORTS,
        icon: BarChart3,
        permission: AdminPermission.VIEW_ANALYTICS,
    },
    {
        label: 'Sistema',
        path: ROUTES.ADMIN.SETTINGS,
        icon: Settings,
        permission: AdminPermission.SYSTEM_SETTINGS,
    },
];

interface AdminSidebarProps {
    isCollapsed: boolean;
    onToggleCollapse: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
    const location = useLocation();
    const { hasPermission, logout, admin } = useAdminStore();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const isActiveRoute = (path: string) => {
        if (path === ROUTES.ADMIN.DASHBOARD) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    // TEMPORAL: Mostrar todos los elementos para demostración
    const filteredItems = sidebarItems; // .filter(item => !item.permission || hasPermission(item.permission));

    return (
        <div className={`bg-gray-900 text-white transition-all duration-300 ${
            isCollapsed ? 'w-16' : 'w-64'
        } min-h-screen flex flex-col`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div>
                            <h1 className="text-xl font-bold">Admin Panel</h1>
                            <p className="text-sm text-gray-400">DeliveryApp</p>
                        </div>
                    )}
                    <button
                        onClick={onToggleCollapse}
                        className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        {isCollapsed ? (
                            <ChevronRight className="w-5 h-5" />
                        ) : (
                            <ChevronLeft className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {filteredItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = isActiveRoute(item.path);

                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                    {!isCollapsed && (
                                        <span className="ml-3">{item.label}</span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User Info & Logout */}
            <div className="p-4 border-t border-gray-700">
                {!isCollapsed && admin && (
                    <div className="mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium">
                                    {admin.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                    {admin.name}
                                </p>
                                <p className="text-xs text-gray-400 truncate">
                                    {admin.role.replace('_', ' ').toLowerCase()}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleLogout}
                    className={`flex items-center w-full px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors ${
                        isCollapsed ? 'justify-center' : ''
                    }`}
                    title={isCollapsed ? 'Cerrar Sesión' : undefined}
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="ml-3">Cerrar Sesión</span>}
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;