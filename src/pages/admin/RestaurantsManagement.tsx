import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { 
    Plus, 
    Search, 
    Filter, 
    Edit, 
    Trash2, 
    Eye, 
    ToggleLeft, 
    ToggleRight,
    Star,
    MapPin,
    Clock
} from 'lucide-react';
import { adminRestaurants } from '../../services/admin';
import { AdminRestaurantFilters, Restaurant, AdminPermission } from '../../types';
import { ROUTES } from '../../constants';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import ProtectedRoute from '../../components/admin/common/ProtectedRoute';
import { useAdminStore } from '../../store/adminStore';

const RestaurantsManagement: React.FC = () => {
    const [filters, setFilters] = useState<AdminRestaurantFilters>({});
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const queryClient = useQueryClient();
    const { hasPermission } = useAdminStore();

    const { data, isLoading, error } = useQuery({
        queryKey: ['admin-restaurants', filters, page],
        queryFn: () => adminRestaurants.getAll(filters, page, 20),
    });

    const toggleStatusMutation = useMutation({
        mutationFn: adminRestaurants.toggleStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-restaurants'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: adminRestaurants.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-restaurants'] });
        },
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setFilters({ ...filters, search: searchTerm });
        setPage(1);
    };

    const handleToggleStatus = async (id: number) => {
        if (window.confirm('¿Estás seguro de cambiar el estado de este restaurante?')) {
            try {
                await toggleStatusMutation.mutateAsync(id);
            } catch (error) {
                console.error('Error toggling restaurant status:', error);
            }
        }
    };

    const handleDelete = async (id: number, name: string) => {
        if (window.confirm(`¿Estás seguro de eliminar el restaurante "${name}"? Esta acción no se puede deshacer.`)) {
            try {
                await deleteMutation.mutateAsync(id);
            } catch (error) {
                console.error('Error deleting restaurant:', error);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i} className="p-6">
                            <div className="animate-pulse space-y-4">
                                <div className="h-32 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
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
                <div className="text-red-600 mb-4">Error al cargar los restaurantes</div>
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
                    <h1 className="text-2xl font-bold text-gray-900">Gestión de Restaurantes</h1>
                    <p className="text-gray-600">
                        {data?.pagination.total || 0} restaurantes registrados
                    </p>
                </div>
                <ProtectedRoute requiredPermission={AdminPermission.CREATE_RESTAURANTS}>
                    <Link to={ROUTES.ADMIN.RESTAURANT_CREATE}>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Nuevo Restaurante
                        </Button>
                    </Link>
                </ProtectedRoute>
            </div>

            {/* Filters */}
            <Card className="p-6">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                type="text"
                                placeholder="Buscar restaurantes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <select
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={filters.status || ''}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value as any })}
                        >
                            <option value="">Todos los estados</option>
                            <option value="active">Activos</option>
                            <option value="inactive">Inactivos</option>
                        </select>
                        <select
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={filters.sortBy || ''}
                            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                        >
                            <option value="">Ordenar por</option>
                            <option value="name">Nombre</option>
                            <option value="createdAt">Fecha de registro</option>
                            <option value="rating">Calificación</option>
                        </select>
                        <Button type="submit">
                            <Filter className="w-4 h-4" />
                        </Button>
                    </div>
                </form>
            </Card>

            {/* Restaurants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.data.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        onToggleStatus={handleToggleStatus}
                        onDelete={handleDelete}
                        canEdit={hasPermission(AdminPermission.EDIT_RESTAURANTS)}
                        canDelete={hasPermission(AdminPermission.DELETE_RESTAURANTS)}
                        canToggleStatus={hasPermission(AdminPermission.MANAGE_RESTAURANT_STATUS)}
                    />
                ))}
            </div>

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

// Restaurant Card Component
interface RestaurantCardProps {
    restaurant: Restaurant;
    onToggleStatus: (id: number) => void;
    onDelete: (id: number, name: string) => void;
    canEdit: boolean;
    canDelete: boolean;
    canToggleStatus: boolean;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
    restaurant,
    onToggleStatus,
    onDelete,
    canEdit,
    canDelete,
    canToggleStatus,
}) => {
    return (
        <Card className="overflow-hidden">
            {/* Image */}
            <div className="h-48 bg-gray-200 relative">
                {restaurant.coverImage ? (
                    <img
                        src={restaurant.coverImage}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-gray-500">
                                    {restaurant.name.charAt(0)}
                                </span>
                            </div>
                            <p className="text-sm">Sin imagen</p>
                        </div>
                    </div>
                )}
                
                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        restaurant.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}>
                        {restaurant.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {restaurant.name}
                    </h3>
                    <div className="flex items-center space-x-1 ml-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">
                            {restaurant.rating.toFixed(1)}
                        </span>
                    </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {restaurant.description}
                </p>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="truncate">{restaurant.address}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{restaurant.deliveryTime}</span>
                        <span className="mx-2">•</span>
                        <span>€{restaurant.deliveryFee.toFixed(2)}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                        <Link to={ROUTES.ADMIN.RESTAURANT_DETAIL(restaurant.id)}>
                            <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                            </Button>
                        </Link>
                        {canEdit && (
                            <Link to={ROUTES.ADMIN.RESTAURANT_EDIT(restaurant.id)}>
                                <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4" />
                                </Button>
                            </Link>
                        )}
                        {canDelete && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onDelete(restaurant.id, restaurant.name)}
                                className="text-red-600 hover:text-red-700 hover:border-red-300"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                    
                    {canToggleStatus && (
                        <button
                            onClick={() => onToggleStatus(restaurant.id)}
                            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800"
                        >
                            {restaurant.isActive ? (
                                <ToggleRight className="w-5 h-5 text-green-600" />
                            ) : (
                                <ToggleLeft className="w-5 h-5 text-gray-400" />
                            )}
                        </button>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default RestaurantsManagement;