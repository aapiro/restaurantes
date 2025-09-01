import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { useAdminStore } from '../../../store/adminStore';
import { ROUTES } from '../../../constants';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const { isAuthenticated, isLoading, admin } = useAdminStore();
    const location = useLocation();

    // TEMPORAL: Bypass para demostración - comentado para permitir acceso
    // Check if user is authenticated and active
    // useEffect(() => {
    //     if (!isLoading && (!isAuthenticated || !admin?.isActive)) {
    //         // Redirect to admin login
    //         return;
    //     }
    // }, [isAuthenticated, isLoading, admin]);

    // Close mobile sidebar when route changes
    useEffect(() => {
        setMobileSidebarOpen(false);
    }, [location.pathname]);

    // Handle responsive sidebar
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // TEMPORAL: Bypass para demostración - comentado para permitir acceso
    // if (!isAuthenticated || !admin?.isActive) {
    //     return <Navigate to={ROUTES.ADMIN.LOGIN} replace />;
    // }

    const toggleSidebar = () => {
        if (window.innerWidth >= 1024) {
            setSidebarCollapsed(!sidebarCollapsed);
        } else {
            setMobileSidebarOpen(!mobileSidebarOpen);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <AdminSidebar 
                    isCollapsed={sidebarCollapsed} 
                    onToggleCollapse={toggleSidebar}
                />
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileSidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={() => setMobileSidebarOpen(false)}
                    />
                    <div className="fixed inset-y-0 left-0 z-50">
                        <AdminSidebar 
                            isCollapsed={false} 
                            onToggleCollapse={() => setMobileSidebarOpen(false)}
                        />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <AdminHeader onToggleSidebar={toggleSidebar} />
                
                <main className="flex-1 overflow-auto">
                    <div className="p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;