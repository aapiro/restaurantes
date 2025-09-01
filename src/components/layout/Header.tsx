import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, MapPin, User, Menu, Search } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuthStore } from '../../store';
import { useCartStore } from '../../store';
import { ROUTES, APP_CONFIG } from '../../constants';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuthStore();
    const cartStore = useCartStore();
    const { getItemCount, getTotal } = cartStore;
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleCartClick = () => {
        if (getItemCount() > 0) {
            cartStore.openCart();
        }
    };

    const handleLogout = () => {
        logout();
        navigate(ROUTES.HOME);
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo y ubicación */}
                    <div className="flex items-center gap-6">
                        <Link to={ROUTES.HOME} className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">🚚</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">
                {APP_CONFIG.NAME}
              </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">Madrid, España</span>
                            <button className="text-xs text-primary-500 hover:text-primary-600 underline">
                                Cambiar
                            </button>
                        </div>
                    </div>

                    {/* Buscador central */}
                    <div className="hidden md:block flex-1 max-w-lg mx-8">
                        <form onSubmit={handleSearch}>
                            <Input
                                type="text"
                                placeholder="Buscar restaurantes o platos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                leftIcon={<Search className="w-4 h-4" />}
                                fullWidth
                            />
                        </form>
                    </div>

                    {/* Acciones del usuario */}
                    <div className="flex items-center gap-4">
                        {/* Carrito */}
                        <button
                            onClick={handleCartClick}
                            className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {getItemCount() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
                            )}
                        </button>

                        {/* Usuario autenticado */}
                        {isAuthenticated && user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                    <User className="w-5 h-5 text-gray-600" />
                                    <span className="hidden md:block text-sm text-gray-700">
                    {user.name}
                  </span>
                                </button>

                                {/* Dropdown menú */}
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <div className="py-2">
                                        <Link
                                            to={ROUTES.PROFILE}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            Mi Perfil
                                        </Link>
                                        <Link
                                            to={ROUTES.ORDERS}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            Mis Pedidos
                                        </Link>
                                        <Link
                                            to={ROUTES.ADDRESSES}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            Direcciones
                                        </Link>
                                        <hr className="my-2" />
                                        <Link
                                            to={ROUTES.ADMIN.LOGIN}
                                            className="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 transition-colors"
                                        >
                                            Panel Admin
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Usuario no autenticado */
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => navigate(ROUTES.LOGIN)}
                                >
                                    Iniciar Sesión
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => navigate(ROUTES.REGISTER)}
                                >
                                    Registrarse
                                </Button>
                            </div>
                        )}

                        {/* Menú mobile */}
                        <button className="md:hidden p-2 text-gray-600 hover:text-gray-900">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Buscador mobile */}
                <div className="md:hidden pb-4">
                    <form onSubmit={handleSearch}>
                        <Input
                            type="text"
                            placeholder="Buscar restaurantes o platos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            leftIcon={<Search className="w-4 h-4" />}
                            fullWidth
                        />
                    </form>
                </div>
            </div>

            {/* Mini carrito flotante */}
            {getItemCount() > 0 && (
                <div className="fixed bottom-4 right-4 z-40">
                    <button
                        onClick={handleCartClick}
                        className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 transition-all duration-300 hover:scale-105"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span className="font-medium">
              {getItemCount()} items • ${getTotal().toFixed(2)}
            </span>
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;