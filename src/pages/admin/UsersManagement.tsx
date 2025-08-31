import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { 
    Search, 
    Filter, 
    Eye, 
    Edit,
    Trash2,
    ToggleLeft, 
    ToggleRight,
    User,
    Mail,
    Phone,
    Calendar,
    ShoppingBag
} from 'lucide-react';
import { adminUsers } from '../../services/admin';
import { AdminUserFilters, User as UserType, AdminPermission } from '../../types';
import { ROUTES } from '../../constants';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import ProtectedRoute from '../../components/admin/common/ProtectedRoute';
import { useAdminStore } from '../../store/adminStore';

const UsersManagement: React.FC = () => {
    const [filters, setFilters] = useState<AdminUserFilters>({});
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const queryClient = useQueryClient();
    const { hasPermission } = useAdminStore();

    const { data, isLoading, error } = useQuery({
        queryKey: ['admin-users', filters, page],
        queryFn: () => adminUsers.getAll(filters, page, 20),
    });

    const toggleStatusMutation = useMutation({
        mutationFn: adminUsers.toggleStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-users'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: adminUsers.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-users'] });
        },
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setFilters({ ...filters, search: searchTerm });
        setPage(1);
    };

    const handleToggleStatus = async (id: number, name: string) => {
        if (window.confirm(`¿Estás seguro de cambiar el estado del usuario "${name}"?`)) {
            try {
                await toggleStatusMutation.mutateAsync(id);
            } catch (error) {
                console.error('Error toggling user status:', error);
            }
        }
    };

    const handleDelete = async (id: number, name: string) => {
        if (window.confirm(`¿Estás seguro de eliminar el usuario "${name}"? Esta acción no se puede deshacer.`)) {
            try {
                await deleteMutation.mutateAsync(id);
            } catch (error) {
                console.error('Error deleting user:', error);
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
                <div className="text-red-600 mb-4">Error al cargar los usuarios</div>
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
                    <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
                    <p className="text-gray-600">
                        {data?.pagination.total || 0} usuarios registrados
                    </p>
                </div>
            </div>

            {/* Filters */}
            <Card className="p-6">
                <form onSubmit={handleSearch} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                type="text"
                                placeholder="Buscar usuarios..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        
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
                            value={filters.hasOrders?.toString() || ''}
                            onChange={(e) => setFilters({ 
                                ...filters, 
                                hasOrders: e.target.value === '' ? undefined : e.target.value === 'true'
                            })}
                        >
                            <option value="">Todos</option>
                            <option value="true">Con pedidos</option>
                            <option value="false">Sin pedidos</option>
                        </select>

                        <select
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={filters.sortBy || ''}
                            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                        >
                            <option value="">Ordenar por</option>
                            <option value="name">Nombre</option>
                            <option value="createdAt">Fecha de registro</option>
                            <option value="lastOrder">Último pedido</option>
                        </select>
                    </div>
                    
                    <div className="flex justify-end">
                        <Button type="submit">
                            <Filter className="w-4 h-4 mr-2" />
                            Filtrar
                        </Button>
                    </div>
                </form>
            </Card>

            {/* Users Table */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Usuario
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contacto
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Registro
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Direcciones
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data?.data.map((user) => (
                                <UserRow
                                    key={user.id}
                                    user={user}
                                    onToggleStatus={handleToggleStatus}
                                    onDelete={handleDelete}
                                    canEdit={hasPermission(AdminPermission.EDIT_USERS)}
                                    canDelete={hasPermission(AdminPermission.DELETE_USERS)}
                                    canToggleStatus={hasPermission(AdminPermission.DEACTIVATE_USERS)}
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

// User Row Component
interface UserRowProps {
    user: UserType;
    onToggleStatus: (id: number, name: string) => void;
    onDelete: (id: number, name: string) => void;
    canEdit: boolean;
    canDelete: boolean;
    canToggleStatus: boolean;
}

const UserRow: React.FC<UserRowProps> = ({
    user,
    onToggleStatus,
    onDelete,
    canEdit,
    canDelete,
    canToggleStatus,
}) => {
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        {user.avatar ? (
                            <img
                                className="h-10 w-10 rounded-full"
                                src={user.avatar}
                                alt={user.name}
                            />
                        ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <User className="h-5 w-5 text-blue-600" />
                            </div>
                        )}
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                            ID: {user.id}
                        </div>
                    </div>
                </div>
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-900">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        {user.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        {user.phone}
                    </div>
                </div>
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}>
                        {user.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                    {canToggleStatus && (
                        <button
                            onClick={() => onToggleStatus(user.id, user.name)}
                            className="ml-2 text-gray-400 hover:text-gray-600"
                        >
                            {user.isActive ? (
                                <ToggleRight className="w-5 h-5 text-green-600" />
                            ) : (
                                <ToggleLeft className="w-5 h-5" />
                            )}
                        </button>
                    )}
                </div>
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <div>
                        <div>{new Date(user.createdAt).toLocaleDateString('es-ES')}</div>
                        <div className="text-xs text-gray-400">
                            {new Date(user.createdAt).toLocaleTimeString('es-ES', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>
                </div>
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                    <ShoppingBag className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{user.addresses.length} direcciones</span>
                </div>
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                    <Link to={ROUTES.ADMIN.USER_DETAIL(user.id)}>
                        <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                        </Button>
                    </Link>
                    {canEdit && (
                        <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                        </Button>
                    )}
                    {canDelete && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDelete(user.id, user.name)}
                            className="text-red-600 hover:text-red-700 hover:border-red-300"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default UsersManagement;