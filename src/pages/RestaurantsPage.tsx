import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Star, Clock, MapPin } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, {CardContent} from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { ROUTES } from '../constants';

// Mock data expandido
const mockRestaurants = [
    {
        id: 1,
        name: "La Parrilla Dorada",
        description: "Especialidad en carnes a la parrilla y platos tradicionales",
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=250&fit=crop",
        rating: 4.8,
        reviewCount: 234,
        deliveryTime: "25-35 min",
        deliveryFee: 2.50,
        category: "parrilla",
        isOpen: true,
        minimumOrder: 15.00
    },
    {
        id: 2,
        name: "Pizza Express",
        description: "Pizzas artesanales con ingredientes frescos",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=250&fit=crop",
        rating: 4.5,
        reviewCount: 189,
        deliveryTime: "20-30 min",
        deliveryFee: 1.99,
        category: "pizza",
        isOpen: true,
        minimumOrder: 12.00
    },
    {
        id: 3,
        name: "Sushi Zen",
        description: "Sushi fresco y cocina japonesa auténtica",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=250&fit=crop",
        rating: 4.9,
        reviewCount: 156,
        deliveryTime: "30-45 min",
        deliveryFee: 3.50,
        category: "japonesa",
        isOpen: false,
        minimumOrder: 20.00
    },
    {
        id: 4,
        name: "Burger Palace",
        description: "Hamburguesas gourmet y comida rápida premium",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=250&fit=crop",
        rating: 4.3,
        reviewCount: 298,
        deliveryTime: "15-25 min",
        deliveryFee: 2.00,
        category: "hamburguesas",
        isOpen: true,
        minimumOrder: 10.00
    },
    {
        id: 5,
        name: "Pasta & Co",
        description: "Pasta fresca italiana y platos mediterráneos",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=250&fit=crop",
        rating: 4.6,
        reviewCount: 167,
        deliveryTime: "20-30 min",
        deliveryFee: 2.25,
        category: "italiana",
        isOpen: true,
        minimumOrder: 14.00
    },
    {
        id: 6,
        name: "Taco Fiesta",
        description: "Auténtica comida mexicana con sabores únicos",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop",
        rating: 4.4,
        reviewCount: 203,
        deliveryTime: "25-35 min",
        deliveryFee: 2.75,
        category: "mexicana",
        isOpen: true,
        minimumOrder: 13.00
    }
];

const categories = [
    { name: "Todos", value: "", count: mockRestaurants.length },
    { name: "Pizza", value: "pizza", count: 1 },
    { name: "Hamburguesas", value: "hamburguesas", count: 1 },
    { name: "Italiana", value: "italiana", count: 1 },
    { name: "Japonesa", value: "japonesa", count: 1 },
    { name: "Mexicana", value: "mexicana", count: 1 },
    { name: "Parrilla", value: "parrilla", count: 1 }
];

const RestaurantsPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [sortBy, setSortBy] = useState('rating');
    const [showFilters, setShowFilters] = useState(false);

    // Filtrar restaurantes
    const filteredRestaurants = mockRestaurants.filter(restaurant => {
        const matchesSearch = !searchQuery ||
            restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            restaurant.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = !selectedCategory || restaurant.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Ordenar restaurantes
    const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
        switch (sortBy) {
            case 'rating':
                return b.rating - a.rating;
            case 'deliveryTime':
                return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
            case 'deliveryFee':
                return a.deliveryFee - b.deliveryFee;
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        if (category) {
            setSearchParams({ category });
        } else {
            setSearchParams({});
        }
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header de página */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Restaurantes en Madrid
                    </h1>
                    <p className="text-gray-600">
                        {filteredRestaurants.length} restaurantes disponibles
                    </p>
                </div>

                {/* Filtros y búsqueda */}
                <div className="mb-8 space-y-4">
                    {/* Barra de búsqueda y filtros */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                type="text"
                                placeholder="Buscar restaurantes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                fullWidth
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="rating">Mejor valorados</option>
                                <option value="deliveryTime">Más rápidos</option>
                                <option value="deliveryFee">Menor costo de envío</option>
                                <option value="name">Nombre A-Z</option>
                            </select>
                            <Button
                                variant="outline"
                                icon={<Filter className="w-4 h-4" />}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                Filtros
                            </Button>
                        </div>
                    </div>

                    {/* Categorías */}
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                        {categories.map((category) => (
                            <button
                                key={category.value}
                                onClick={() => handleCategoryChange(category.value)}
                                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    selectedCategory === category.value
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                {category.name} ({category.count})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid de restaurantes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedRestaurants.map((restaurant) => (
                        <Link key={restaurant.id} to={ROUTES.RESTAURANT_DETAIL(restaurant.id)}>
                            <Card hover clickable className="h-full">
                                <div className="aspect-video relative overflow-hidden">
                                    <img
                                        src={restaurant.image}
                                        alt={restaurant.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {!restaurant.isOpen && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-900">
                        Cerrado
                      </span>
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium capitalize">
                                        {restaurant.category}
                                    </div>
                                </div>

                                <CardContent className="p-4">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {restaurant.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                        {restaurant.description}
                                    </p>

                                    <div className="flex items-center justify-between text-sm mb-3">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="font-medium">{restaurant.rating}</span>
                                                <span className="text-gray-500">({restaurant.reviewCount})</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-600">
                                                <Clock className="w-4 h-4" />
                                                <span>{restaurant.deliveryTime}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <div className="space-y-1">
                                            <div className="text-green-600 font-medium">
                                                Delivery ${restaurant.deliveryFee}
                                            </div>
                                            <div className="text-gray-500">
                                                Mínimo ${restaurant.minimumOrder}
                                            </div>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant={restaurant.isOpen ? "primary" : "secondary"}
                                            disabled={!restaurant.isOpen}
                                        >
                                            {restaurant.isOpen ? "Ver Menú" : "Cerrado"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Estado vacío */}
                {filteredRestaurants.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            No encontramos restaurantes
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Intenta ajustar tus filtros o búsqueda
                        </p>
                        <Button
                            variant="primary"
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('');
                                setSearchParams({});
                            }}
                        >
                            Limpiar filtros
                        </Button>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default RestaurantsPage;