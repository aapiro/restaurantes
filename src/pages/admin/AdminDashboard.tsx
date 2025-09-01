import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
    Store, 
    Users, 
    ShoppingBag, 
    DollarSign, 
    TrendingUp, 
    TrendingDown,
    Clock,
    Star
} from 'lucide-react';
import { adminDashboard } from '../../services/admin';
import { DashboardStats, OrderStatus } from '../../types';
import Card from '../../components/ui/Card';

const AdminDashboard: React.FC = () => {
    const { data: stats, isLoading, error } = useQuery({
        queryKey: ['admin-dashboard-stats'],
        queryFn: adminDashboard.getStats,
        refetchInterval: 30000, // Refetch every 30 seconds
    });

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i} className="p-6">
                            <div className="animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-red-600 mb-4">Error al cargar las estadísticas</div>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Resumen general de la plataforma</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Restaurantes"
                    value={stats?.totalRestaurants || 0}
                    subtitle={`${stats?.activeRestaurants || 0} activos`}
                    icon={Store}
                    color="blue"
                />
                <StatsCard
                    title="Usuarios"
                    value={stats?.totalUsers || 0}
                    subtitle={`${stats?.activeUsers || 0} activos`}
                    icon={Users}
                    color="green"
                />
                <StatsCard
                    title="Pedidos Hoy"
                    value={stats?.todayOrders || 0}
                    subtitle={`${stats?.totalOrders || 0} total`}
                    icon={ShoppingBag}
                    color="purple"
                />
                <StatsCard
                    title="Ingresos Hoy"
                    value={`€${stats?.todayRevenue?.toFixed(2) || '0.00'}`}
                    subtitle={`€${stats?.totalRevenue?.toFixed(2) || '0.00'} total`}
                    icon={DollarSign}
                    color="yellow"
                />
            </div>

            {/* Charts and Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Order Status Chart */}
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Estado de Pedidos
                    </h3>
                    <div className="space-y-3">
                        {stats?.ordersByStatus?.map((item) => (
                            <div key={item.status} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></div>
                                    <span className="text-sm text-gray-600">
                                        {getStatusLabel(item.status)}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium">{item.count}</span>
                                    <span className="text-xs text-gray-500">
                                        ({item.percentage.toFixed(1)}%)
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Popular Restaurants */}
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Restaurantes Populares
                    </h3>
                    <div className="space-y-4">
                        {stats?.popularRestaurants?.slice(0, 5).map((item, index) => (
                            <div key={item.restaurant.id} className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-medium text-blue-600">
                                            {index + 1}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {item.restaurant.name}
                                    </p>
                                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                                        <span>{item.orderCount} pedidos</span>
                                        <span>•</span>
                                        <span>€{item.revenue.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-sm text-gray-600">
                                        {item.restaurant.rating.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Recent Orders */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Pedidos Recientes
                </h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Pedido
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cliente
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Restaurante
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fecha
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {stats?.recentOrders?.slice(0, 10).map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        #{order.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.user.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.restaurant.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}>
                                            {getStatusLabel(order.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        €{order.total.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString('es-ES', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

// Stats Card Component
interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ComponentType<{ className?: string }>;
    color: 'blue' | 'green' | 'purple' | 'yellow';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle, icon: Icon, color }) => {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        purple: 'bg-purple-100 text-purple-600',
        yellow: 'bg-yellow-100 text-yellow-600',
    };

    return (
        <Card className="p-6">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-semibold text-gray-900">{value}</p>
                    <p className="text-sm text-gray-500">{subtitle}</p>
                </div>
            </div>
        </Card>
    );
};

// Helper functions
const getStatusColor = (status: OrderStatus): string => {
    const colors = {
        [OrderStatus.PENDING]: 'bg-yellow-400',
        [OrderStatus.CONFIRMED]: 'bg-blue-400',
        [OrderStatus.PREPARING]: 'bg-orange-400',
        [OrderStatus.READY]: 'bg-purple-400',
        [OrderStatus.OUT_FOR_DELIVERY]: 'bg-indigo-400',
        [OrderStatus.DELIVERED]: 'bg-green-400',
        [OrderStatus.CANCELLED]: 'bg-red-400',
    };
    return colors[status] || 'bg-gray-400';
};

const getStatusBadgeColor = (status: OrderStatus): string => {
    const colors = {
        [OrderStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
        [OrderStatus.CONFIRMED]: 'bg-blue-100 text-blue-800',
        [OrderStatus.PREPARING]: 'bg-orange-100 text-orange-800',
        [OrderStatus.READY]: 'bg-purple-100 text-purple-800',
        [OrderStatus.OUT_FOR_DELIVERY]: 'bg-indigo-100 text-indigo-800',
        [OrderStatus.DELIVERED]: 'bg-green-100 text-green-800',
        [OrderStatus.CANCELLED]: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};

const getStatusLabel = (status: OrderStatus): string => {
    const labels = {
        [OrderStatus.PENDING]: 'Pendiente',
        [OrderStatus.CONFIRMED]: 'Confirmado',
        [OrderStatus.PREPARING]: 'Preparando',
        [OrderStatus.READY]: 'Listo',
        [OrderStatus.OUT_FOR_DELIVERY]: 'En camino',
        [OrderStatus.DELIVERED]: 'Entregado',
        [OrderStatus.CANCELLED]: 'Cancelado',
    };
    return labels[status] || status;
};

export default AdminDashboard;