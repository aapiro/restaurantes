import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
    BarChart3, 
    TrendingUp, 
    Download, 
    Calendar,
    DollarSign,
    Users,
    ShoppingBag,
    Store
} from 'lucide-react';
import { adminReports } from '../../services/admin';
import { SalesReport, UserReport, AdminPermission } from '../../types';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ProtectedRoute from '../../components/admin/common/ProtectedRoute';

const ReportsPage: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'year'>('month');
    const [activeTab, setActiveTab] = useState<'sales' | 'users'>('sales');

    const { data: salesReport, isLoading: salesLoading } = useQuery({
        queryKey: ['admin-sales-report', selectedPeriod],
        queryFn: () => adminReports.getSalesReport(selectedPeriod),
        enabled: activeTab === 'sales',
    });

    const { data: usersReport, isLoading: usersLoading } = useQuery({
        queryKey: ['admin-users-report'],
        queryFn: adminReports.getUsersReport,
        enabled: activeTab === 'users',
    });

    const handleExportReport = async (type: 'sales' | 'users', format: 'csv' | 'excel' | 'pdf') => {
        try {
            const blob = await adminReports.exportReport(type, format);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${type}-report-${new Date().toISOString().split('T')[0]}.${format}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error exporting report:', error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reportes y Analytics</h1>
                    <p className="text-gray-600">Análisis detallado de la plataforma</p>
                </div>
                <ProtectedRoute requiredPermission={AdminPermission.EXPORT_REPORTS}>
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => handleExportReport(activeTab, 'csv')}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            CSV
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleExportReport(activeTab, 'excel')}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Excel
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleExportReport(activeTab, 'pdf')}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            PDF
                        </Button>
                    </div>
                </ProtectedRoute>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('sales')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'sales'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        <BarChart3 className="w-4 h-4 inline mr-2" />
                        Reportes de Ventas
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'users'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        <Users className="w-4 h-4 inline mr-2" />
                        Reportes de Usuarios
                    </button>
                </nav>
            </div>

            {/* Sales Report */}
            {activeTab === 'sales' && (
                <div className="space-y-6">
                    {/* Period Selector */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Período de Análisis</h3>
                            <div className="flex space-x-2">
                                {(['day', 'week', 'month', 'year'] as const).map((period) => (
                                    <button
                                        key={period}
                                        onClick={() => setSelectedPeriod(period)}
                                        className={`px-3 py-2 text-sm font-medium rounded-lg ${
                                            selectedPeriod === period
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {period === 'day' && 'Día'}
                                        {period === 'week' && 'Semana'}
                                        {period === 'month' && 'Mes'}
                                        {period === 'year' && 'Año'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {salesLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <Card key={i} className="p-6">
                                    <div className="animate-pulse space-y-4">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : salesReport ? (
                        <>
                            {/* Sales Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatsCard
                                    title="Ingresos Totales"
                                    value={`€${salesReport.totalRevenue.toFixed(2)}`}
                                    icon={DollarSign}
                                    color="green"
                                />
                                <StatsCard
                                    title="Pedidos Totales"
                                    value={salesReport.totalOrders.toString()}
                                    icon={ShoppingBag}
                                    color="blue"
                                />
                                <StatsCard
                                    title="Valor Promedio"
                                    value={`€${salesReport.averageOrderValue.toFixed(2)}`}
                                    icon={TrendingUp}
                                    color="purple"
                                />
                                <StatsCard
                                    title="Período"
                                    value={`${new Date(salesReport.startDate).toLocaleDateString()} - ${new Date(salesReport.endDate).toLocaleDateString()}`}
                                    icon={Calendar}
                                    color="yellow"
                                />
                            </div>

                            {/* Top Restaurants */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Restaurantes Top
                                    </h3>
                                    <div className="space-y-4">
                                        {salesReport.topRestaurants.slice(0, 5).map((item, index) => (
                                            <div key={item.restaurant.id} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                            <span className="text-sm font-medium text-blue-600">
                                                                {index + 1}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {item.restaurant.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {item.orderCount} pedidos
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    €{item.revenue.toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>

                                {/* Top Dishes */}
                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Platos Más Vendidos
                                    </h3>
                                    <div className="space-y-4">
                                        {salesReport.topDishes.slice(0, 5).map((item, index) => (
                                            <div key={item.dish.id} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                            <span className="text-sm font-medium text-green-600">
                                                                {index + 1}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {item.dish.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {item.orderCount} pedidos
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    €{item.revenue.toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>

                            {/* Revenue Chart */}
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Ingresos por Día
                                </h3>
                                <div className="h-64 flex items-end space-x-2">
                                    {salesReport.revenueByDay.map((day, index) => {
                                        const maxRevenue = Math.max(...salesReport.revenueByDay.map(d => d.revenue));
                                        const height = (day.revenue / maxRevenue) * 100;
                                        
                                        return (
                                            <div key={index} className="flex-1 flex flex-col items-center">
                                                <div
                                                    className="w-full bg-blue-500 rounded-t"
                                                    style={{ height: `${height}%` }}
                                                    title={`€${day.revenue.toFixed(2)}`}
                                                ></div>
                                                <div className="text-xs text-gray-500 mt-2 transform -rotate-45">
                                                    {new Date(day.date).toLocaleDateString('es-ES', {
                                                        day: '2-digit',
                                                        month: '2-digit'
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-500">No hay datos disponibles para el período seleccionado</div>
                        </div>
                    )}
                </div>
            )}

            {/* Users Report */}
            {activeTab === 'users' && (
                <div className="space-y-6">
                    {usersLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <Card key={i} className="p-6">
                                    <div className="animate-pulse space-y-4">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : usersReport ? (
                        <>
                            {/* User Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatsCard
                                    title="Usuarios Totales"
                                    value={usersReport.totalUsers.toString()}
                                    icon={Users}
                                    color="blue"
                                />
                                <StatsCard
                                    title="Usuarios Activos"
                                    value={usersReport.activeUsers.toString()}
                                    icon={Users}
                                    color="green"
                                />
                                <StatsCard
                                    title="Nuevos Este Mes"
                                    value={usersReport.newUsersThisMonth.toString()}
                                    icon={TrendingUp}
                                    color="purple"
                                />
                                <StatsCard
                                    title="Tasa de Crecimiento"
                                    value={`${((usersReport.newUsersThisMonth / usersReport.totalUsers) * 100).toFixed(1)}%`}
                                    icon={BarChart3}
                                    color="yellow"
                                />
                            </div>

                            {/* Top Customers */}
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Mejores Clientes
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Cliente
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Pedidos
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Total Gastado
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Último Pedido
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {usersReport.topCustomers.slice(0, 10).map((customer) => (
                                                <tr key={customer.user.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {customer.user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {customer.user.email}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {customer.totalOrders}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        €{customer.totalSpent.toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(customer.lastOrderDate).toLocaleDateString('es-ES')}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-500">No hay datos de usuarios disponibles</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Stats Card Component
interface StatsCardProps {
    title: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    color: 'blue' | 'green' | 'purple' | 'yellow';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color }) => {
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
                </div>
            </div>
        </Card>
    );
};

export default ReportsPage;