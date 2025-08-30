import React from 'react';
import Header from './Header';
import CartSidebar from '../common/CartSidebar';
import { ToastContainer } from '../ui/Toast';

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className={`flex-1 ${className || ''}`}>
                {children}
            </main>

            {/* Carrito lateral */}
            <CartSidebar />

            {/* Sistema de notificaciones */}
            <ToastContainer />
        </div>
    );
};

export default Layout;