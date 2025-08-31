import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { adminDishCategories } from '../../services/admin';
import { DishCategory, PaginatedResponse } from '../../types';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const CategoriesManagement: React.FC = () => {
    const [categories, setCategories] = useState<PaginatedResponse<DishCategory>>({
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
    const [currentPage, setCurrentPage] = useState(1);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const filters = {
                ...(searchTerm && { search: searchTerm }),
            };
            
            const response = await adminDishCategories.getAll(filters, currentPage, 20);
            setCategories(response);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [searchTerm, currentPage]);

    const handleToggleStatus = async (categoryId: number, currentStatus: boolean) => {
        try {
            await adminDishCategories.toggleStatus(categoryId);
            fetchCategories(); // Refresh the list
        } catch (error) {
            console.error('Error toggling category status:', error);
        }
    };

    const handleDelete = async (categoryId: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
            try {
                await adminDishCategories.delete(categoryId);
                fetchCategories(); // Refresh the list
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };

    const getStatusBadge = (isActive: boolean) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
        }`}>
            {isActive ? 'Activa' : 'Inactiva'}
        </span>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestión de Categorías</h1>
                    <p className="text-gray-600">Administra las categorías de platos</p>
                </div>
                <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Nueva Categoría
                </Button>
            </div>

            {/* Filters */}
            <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Buscar categorías
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                type="text"
                                placeholder="Nombre de la categoría..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                </div>
            </Card>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <Card key={index} className="p-6 animate-pulse">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                                </div>
                            </div>
                        </Card>
                    ))
                ) : categories.data.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <div className="text-gray-500">
                            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">No se encontraron categorías</p>
                            <p className="text-sm">Intenta ajustar los filtros de búsqueda</p>
                        </div>
                    </div>
                ) : (
                    categories.data.map((category) => (
                        <Card key={category.id} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <div className="w-8 h-8 bg-orange-300 rounded"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            Orden: {category.displayOrder}
                                        </p>
                                    </div>
                                </div>
                                {getStatusBadge(category.isActive)}
                            </div>

                            <p className="text-sm text-gray-600 mb-4">
                                Slug: {category.slug}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="text-xs text-gray-500">
                                    ID: {category.id}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleToggleStatus(category.id, category.isActive)}
                                        className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                                        title={category.isActive ? 'Desactivar' : 'Activar'}
                                    >
                                        {category.isActive ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                    <button
                                        className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition-colors"
                                        title="Editar"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Eliminar"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Pagination */}
            {categories.pagination.totalPages > 1 && (
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <Button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                variant="outline"
                            >
                                Anterior
                            </Button>
                            <Button
                                onClick={() => setCurrentPage(Math.min(categories.pagination.totalPages, currentPage + 1))}
                                disabled={currentPage === categories.pagination.totalPages}
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
                                        {(currentPage - 1) * categories.pagination.limit + 1}
                                    </span>{' '}
                                    a{' '}
                                    <span className="font-medium">
                                        {Math.min(currentPage * categories.pagination.limit, categories.pagination.total)}
                                    </span>{' '}
                                    de{' '}
                                    <span className="font-medium">{categories.pagination.total}</span> categorías
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    {Array.from({ length: categories.pagination.totalPages }, (_, i) => i + 1).map((page) => (
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
                </Card>
            )}
        </div>
    );
};

export default CategoriesManagement;