import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, User, Menu } from 'lucide-react';
import { ROUTES } from '../../../constants';
import { useAdminStore } from '../../../store/adminStore';

interface AdminHeaderProps {
    onToggleSidebar?: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar }) => {
    const { admin } = useAdminStore();

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-4">
                {/* Left side */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    {/* Search */}
                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg">
                        <Bell className="h-6 w-6" />
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                    </button>

                    {/* User menu */}
                    <div className="relative">
                        <Link
                            to={ROUTES.ADMIN.PROFILE}
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            {admin?.avatar ? (
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src={admin.avatar}
                                    alt={admin.name}
                                />
                            ) : (
                                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                                    <span className="text-sm font-medium text-white">
                                        {admin?.name.charAt(0).toUpperCase() || 'A'}
                                    </span>
                                </div>
                            )}
                            <div className="hidden md:block">
                                <div className="text-sm font-medium text-gray-900">
                                    {admin?.name || 'Admin'}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {admin?.role.replace('_', ' ').toLowerCase() || 'admin'}
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;