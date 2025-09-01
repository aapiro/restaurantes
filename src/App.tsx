import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderDetailPage from './pages/OrderDetailPage';

// Admin imports
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import RestaurantsManagement from './pages/admin/RestaurantsManagement';
import OrdersManagement from './pages/admin/OrdersManagement';
import UsersManagement from './pages/admin/UsersManagement';
import ReportsPage from './pages/admin/ReportsPage';
import DishesManagement from './pages/admin/DishesManagement';
import CategoriesManagement from './pages/admin/CategoriesManagement';
import AdminLayout from './components/admin/layout/AdminLayout';
import ProtectedRoute from './components/admin/common/ProtectedRoute';

import { ROUTES } from './constants';
import { AdminPermission } from './types';

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
                {/* Rutas principales funcionando */}
                <Route path={ROUTES.HOME} element={<HomePage />} />
                <Route path={ROUTES.RESTAURANTS} element={<RestaurantsPage />} />
                <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
                <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
                <Route path="/orders/:id" element={<OrderDetailPage />} />

                {/* Páginas temporales */}
                <Route path={ROUTES.LOGIN} element={<PlaceholderPage title="Iniciar Sesión" />} />
                <Route path={ROUTES.REGISTER} element={<PlaceholderPage title="Registrarse" />} />
                <Route path={ROUTES.CART} element={<PlaceholderPage title="Carrito" />} />
                <Route path={ROUTES.ORDERS} element={<PlaceholderPage title="Mis Pedidos" />} />
                <Route path={ROUTES.PROFILE} element={<PlaceholderPage title="Mi Perfil" />} />
                <Route path={ROUTES.SEARCH} element={<PlaceholderPage title="Búsqueda" />} />

                {/* Admin Routes */}
                <Route path={ROUTES.ADMIN.LOGIN} element={<AdminLogin />} />
                
                {/* Protected Admin Routes */}
                <Route path="/admin/*" element={
                    <AdminLayout>
                        <Routes>
                            <Route path="" element={<AdminDashboard />} />
                            
                            <Route path="restaurants" element={
                                <ProtectedRoute requiredPermission={AdminPermission.VIEW_RESTAURANTS}>
                                    <RestaurantsManagement />
                                </ProtectedRoute>
                            } />
                            
                            <Route path="orders" element={
                                <ProtectedRoute requiredPermission={AdminPermission.VIEW_ORDERS}>
                                    <OrdersManagement />
                                </ProtectedRoute>
                            } />
                            
                            <Route path="users" element={
                                <ProtectedRoute requiredPermission={AdminPermission.VIEW_USERS}>
                                    <UsersManagement />
                                </ProtectedRoute>
                            } />
                            
                            <Route path="reports" element={
                                <ProtectedRoute requiredPermission={AdminPermission.VIEW_ANALYTICS}>
                                    <ReportsPage />
                                </ProtectedRoute>
                            } />
                            
                            <Route path="dishes" element={
                                <ProtectedRoute requiredPermission={AdminPermission.VIEW_DISHES}>
                                    <DishesManagement />
                                </ProtectedRoute>
                            } />
                            
                            <Route path="categories" element={
                                <ProtectedRoute requiredPermission={AdminPermission.VIEW_CATEGORIES}>
                                    <CategoriesManagement />
                                </ProtectedRoute>
                            } />
                            
                            <Route path="settings" element={
                                <ProtectedRoute requiredPermission={AdminPermission.SYSTEM_SETTINGS}>
                                    <PlaceholderPage title="Configuración del Sistema" />
                                </ProtectedRoute>
                            } />
                            
                            <Route path="profile" element={<PlaceholderPage title="Perfil de Administrador" />} />
                            
                            {/* Admin 404 */}
                            <Route path="*" element={<PlaceholderPage title="Página de administración no encontrada" />} />
                        </Routes>
                    </AdminLayout>
                } />

                {/* 404 */}
                <Route path="*" element={<PlaceholderPage title="Página no encontrada" />} />
            </Routes>
        </div>
    );
}

export default App;