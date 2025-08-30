import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import { ROUTES } from './constants';

// Páginas temporales simplificadas
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-gray-600">Esta página será desarrollada próximamente</p>
            <a href={ROUTES.HOME} className="text-primary-500 hover:text-primary-600 underline mt-4 inline-block">
                Volver al inicio
            </a>
        </div>
    </div>
);

function App() {
    return (
        <div className="App">
            <Routes>
                {/* Rutas principales */}
                <Route path={ROUTES.HOME} element={<HomePage />} />
                <Route path={ROUTES.RESTAURANTS} element={<RestaurantsPage />} />
                <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />

                {/* Páginas temporales */}
                <Route path={ROUTES.LOGIN} element={<PlaceholderPage title="Iniciar Sesión" />} />
                <Route path={ROUTES.REGISTER} element={<PlaceholderPage title="Registrarse" />} />
                <Route path={ROUTES.CART} element={<PlaceholderPage title="Carrito" />} />
                <Route path={ROUTES.CHECKOUT} element={<PlaceholderPage title="Checkout" />} />
                <Route path={ROUTES.ORDERS} element={<PlaceholderPage title="Mis Pedidos" />} />
                <Route path={ROUTES.PROFILE} element={<PlaceholderPage title="Mi Perfil" />} />
                <Route path={ROUTES.SEARCH} element={<PlaceholderPage title="Búsqueda" />} />

                {/* 404 */}
                <Route path="*" element={<PlaceholderPage title="Página no encontrada" />} />
            </Routes>
        </div>
    );
}

export default App;