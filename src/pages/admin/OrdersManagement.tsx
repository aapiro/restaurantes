import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { 
    Search, 
    Filter, 
    Eye, 
    RefreshCw,
    Calendar,
    DollarSign,
    User,
    Store,
    Clock
} from 'lucide-react';
import { adminOrders } from '../../services/admin';
import { AdminOrderFilters, Order, OrderStatus, AdminPermission } from '../../types';
import { ROUTES } from '../../constants';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import ProtectedRoute from '../../components/admin/common/ProtectedRoute';
import { useAdminStore } from '../../store/adminStore';

const OrdersManagement: React.FC = () => {
    const [filters, setFilters] = useState<AdminOrderFilters>({});
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const queryClient = useQueryClient();
    const { hasPermission } = useAdminStore();

    const { data, isLoading, error } = useQuery({
        queryKey: ['admin-orders', filters, page],
        queryFn: () => adminOrders.getAll(filters, page, 20),
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: number; status: string }) =>
            adminOrders.updateStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
        },
    });

    const cancelOrderMutation = useMutation({
        mutationFn: ({ id, reason }: { id: number; reason?: string }) =>
            adminOrders.cancel(id, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
        },
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setFilters({ ...filters, search: searchTerm });
        setPage(1);
    };

    const handleStatusChange = async (orderId: number, newStatus: OrderStatus) => {
        if (window.confirm(`¿Cambiar el estado del pedido a "${getStatusLabel(newStatus)}"?`)) {
            try {
                await updateStatusMutation.mutateAsync({ id: orderId, status: newStatus });
            } catch (error) {
                console.error('Error updating order status:', error);
            }
        }
    };

    const handleCancelOrder = async (orderId: number) => {
        const reason = window.prompt('Motivo de cancelación (opcional):');
        if (reason !== null) { // User didn't cancel the prompt
            try {
                await cancelOrderMutation.mutateAsync({ id: orderId, reason });
            } catch (error) {
                console.error('Error canceling order:', error);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
                <Card className="p-6">
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </Card>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-red-600 mb-4">Error al cargar los pedidos</div>
                <Button onClick={() => window.location.reload()}>
                    Reintentar
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestión de Pedidos</h1>
                    <p className="text-gray-600">
                        {data?.pagination.total || 0} pedidos registrados
                    </p>
                </div>
                <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['admin-orders'] })}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Actualizar
                </Button>
            </div>

            {/* Filters */}
            <Card className="p-6">
                <form onSubmit={handleSearch} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                type="text"
                                placeholder="Buscar pedidos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        
                        <select
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={filters.status || ''}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value as OrderStatus })}
                        >
                            <option value="">Todos los estados</option>
                            {Object.values(OrderStatus).map(status => (
                                <option key={status} value={status}>
                                    {getStatusLabel(status)}
                                </option>
                            ))}
                        </select>

                        <Input
                            type="date"
                            placeholder="Fecha desde"
                            value={filters.dateFrom || ''}
                            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                        />

                        <Input
                            type="date"
                            placeholder="Fecha hasta"
                            value={filters.dateTo || ''}
                            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                        />
                    </div>
                    
                    <div className="flex justify-end">
                        <Button type="submit">
                            <Filter className="w-4 h-4 mr-2" />
                            Filtrar
                        </Button>
                    </div>
                </form>
            </Card>

            {/* Orders Table */}
            <Card className="overflow-hidden">
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data?.data.map((order) => (
                                <OrderRow
                                    key={order.id}
                                    order={order}
                                    onStatusChange={handleStatusChange}
                                    onCancel={handleCancelOrder}
                                    canManageStatus={hasPermission(AdminPermission.MANAGE_ORDER_STATUS)}
                                    canCancel={hasPermission(AdminPermission.CANCEL_ORDERS)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Pagination */}
            {data && data.pagination.totalPages > 1 && (
                <div className="flex justify-center space-x-2">
                    <Button
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Anterior
                    </Button>
                    <span className="flex items-center px-4 py-2 text-sm text-gray-700">
                        Página {page} de {data.pagination.totalPages}
                    </span>
                    <Button
                        variant="outline"
                        disabled={page === data.pagination.totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Siguiente
                    </Button>
                </div>
            )}
        </div>
    );
};

// Order Row Component
interface OrderRowProps {
    order: Order;
    onStatusChange: (orderId: number, status: OrderStatus) => void;
    onCancel: (orderId: number) => void;
    canManageStatus: boolean;
    canCancel: boolean;
}

const OrderRow: React.FC<OrderRowProps> = ({
    order,
    onStatusChange,
    onCancel,
    canManageStatus,
    canCancel,
}) => {
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div>
                        <div className="text-sm font-medium text-gray-900">
                            #{order.id}
                        </div>
                        <div className="text-sm text-gray-500">
                            {order.items.length} productos
                        </div>
                    </div>
                </div>
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                        </div>
                    </div>
                    <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                            {order.user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                            {order.user.email}
                        </div>
                    </div>
                </div>
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <Store className="h-4 w-4 text-gray-400 mr-2" />
                    <div className="text-sm text-gray-900">
                        {order.restaurant.name}
                    </div>
                </div>
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap">
                {canManageStatus && order.status !== OrderStatus.DELIVERED && order.status !== OrderStatus.CANCELLED ? (
                    <select
                        value={order.status}
                        onChange={(e) => onStatusChange(order.id, e.target.value as OrderStatus)}
                        className={`text-xs font-semibold rounded-full px-2 py-1 ${getStatusBadgeColor(order.status)}`}
                    >
                        {Object.values(OrderStatus).map(status => (
                            <option key={status} value={status}>
                                {getStatusLabel(status)}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                    </span>
                )}
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm font-medium text-gray-900">
                        €{order.total.toFixed(2)}
                    </span>
                </div>
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <div>
                        <div>{new Date(order.createdAt).toLocaleDateString('es-ES')}</div>
                        <div className="text-xs text-gray-400">
                            {new Date(order.createdAt).toLocaleTimeString('es-ES', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>
                </div>
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                    <Link to={ROUTES.ADMIN.ORDER_DETAIL(order.id)}>
                        <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                        </Button>
                    </Link>
                    {canCancel && order.status !== OrderStatus.DELIVERED && order.status !== OrderStatus.CANCELLED && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onCancel(order.id)}
                            className="text-red-600 hover:text-red-700 hover:border-red-300"
                        >
                            Cancelar
                        </Button>
                    )}
                </div>
            </td>
        </tr>
    );
};

// Helper functions
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

export default OrdersManagement;