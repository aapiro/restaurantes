import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { adminDishes } from '../../services/admin';
import { Dish, PaginatedResponse } from '../../types';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const DishesManagement: React.FC = () => {
    const [dishes, setDishes] = useState<PaginatedResponse<Dish>>({
        data: [],
        pagination: {
            page: 1,
            limit: 20,
            total: 0,
            totalPages: 0,
            hasNext: false,
            hasPrev: false
        }
    });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRestaurant, setSelectedRestaurant] = useState<number | undefined>();
    const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
    const [currentPage, setCurrentPage] = useState(1);

    const fetchDishes = async () => {
        try {
            setLoading(true);
            const filters = {
                ...(searchTerm && { search: searchTerm }),
                ...(selectedRestaurant && { restaurantId: selectedRestaurant }),
                ...(selectedCategory && { categoryId: selectedCategory }),
            };
            
            const response = await adminDishes.getAll(filters, currentPage, 20);
            setDishes(response);
        } catch (error) {
            console.error('Error fetching dishes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDishes();
    }, [searchTerm, selectedRestaurant, selectedCategory, currentPage]);

    const handleToggleStatus = async (dishId: number, currentStatus: boolean) => {
        try {
            await adminDishes.toggleAvailability(dishId);
            fetchDishes(); // Refresh the list
        } catch (error) {
            console.error('Error toggling dish status:', error);
        }
    };

    const handleDelete = async (dishId: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este plato?')) {
            try {
                await adminDishes.delete(dishId);
                fetchDishes(); // Refresh the list
            } catch (error) {
                console.error('Error deleting dish:', error);
            }
        }
    };

    const getStatusBadge = (isActive: boolean) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
        }`}>
            {isActive ? 'Activo' : 'Inactivo'}
        </span>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestión de Platos</h1>
                    <p className="text-gray-600">Administra los platos de todos los restaurantes</p>
                </div>
                <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Nuevo Plato
                </Button>
            </div>

            {/* Filters */}
            <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Buscar platos
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                type="text"
                                placeholder="Nombre del plato..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Restaurante
                        </label>
                        <select
                            value={selectedRestaurant || ''}
                            onChange={(e) => setSelectedRestaurant(e.target.value ? Number(e.target.value) : undefined)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="">Todos los restaurantes</option>
                            {/* TODO: Load restaurants from API */}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Categoría
                        </label>
                        <select
                            value={selectedCategory || ''}
                            onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : undefined)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="">Todas las categorías</option>
                            {/* TODO: Load categories from API */}
                        </select>
                    </div>
                </div>
            </Card>

            {/* Dishes Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Plato
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Restaurante
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Categoría
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Precio
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                        Cargando platos...
                                    </td>
                                </tr>
                            ) : dishes.data.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                        No se encontraron platos
                                    </td>
                                </tr>
                            ) : (
                                dishes.data.map((dish) => (
                                    <tr key={dish.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12">
                                                    <img
                                                        className="h-12 w-12 rounded-lg object-cover"
                                                        src={dish.image || '/placeholder-dish.jpg'}
                                                        alt={dish.name}
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {dish.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 truncate max-w-xs">
                                                        {dish.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {dish.restaurant?.name || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {dish.category?.name || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ${dish.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(dish.isAvailable)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleToggleStatus(dish.id, dish.isAvailable)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title={dish.isAvailable ? 'Desactivar' : 'Activar'}
                                                >
                                                    {dish.isAvailable ? (
                                                        <EyeOff className="w-4 h-4" />
                                                    ) : (
                                                        <Eye className="w-4 h-4" />
                                                    )}
                                                </button>
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    title="Editar"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(dish.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {dishes.pagination.totalPages > 1 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <Button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                variant="outline"
                            >
                                Anterior
                            </Button>
                            <Button
                                onClick={() => setCurrentPage(Math.min(dishes.pagination.totalPages, currentPage + 1))}
                                disabled={currentPage === dishes.pagination.totalPages}
                                variant="outline"
                            >
                                Siguiente
                            </Button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Mostrando{' '}
                                    <span className="font-medium">
                                        {(currentPage - 1) * dishes.pagination.limit + 1}
                                    </span>{' '}
                                    a{' '}
                                    <span className="font-medium">
                                        {Math.min(currentPage * dishes.pagination.limit, dishes.pagination.total)}
                                    </span>{' '}
                                    de{' '}
                                    <span className="font-medium">{dishes.pagination.total}</span> platos
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    {Array.from({ length: dishes.pagination.totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                page === currentPage
                                                    ? 'z-10 bg-orange-50 border-orange-500 text-orange-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default DishesManagement;