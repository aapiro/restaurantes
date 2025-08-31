import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminStore } from '../../../store/adminStore';
import { AdminPermission, AdminRole } from '../../../types';
import { ROUTES } from '../../../constants';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredPermission?: AdminPermission;
    requiredPermissions?: AdminPermission[];
    requiredRole?: AdminRole;
    requireAll?: boolean; // Si es true, requiere TODOS los permisos. Si es false, requiere AL MENOS UNO
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requiredPermission,
    requiredPermissions,
    requiredRole,
    requireAll = false,
}) => {
    const { isAuthenticated, admin, hasPermission, hasRole, hasAllPermissions, hasAnyPermission } = useAdminStore();

    // TEMPORAL: Bypass para demostración - comentado para permitir acceso
    // Si no está autenticado, redirigir al login
    // if (!isAuthenticated || !admin) {
    //     return <Navigate to={ROUTES.ADMIN.LOGIN} replace />;
    // }

    // Si el admin no está activo, redirigir al login
    // if (!admin.isActive) {
    //     return <Navigate to={ROUTES.ADMIN.LOGIN} replace />;
    // }

    // TEMPORAL: Bypass para demostración - comentado para permitir acceso
    // Verificar rol específico
    if (requiredRole && admin && !hasRole(requiredRole)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                        <svg
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Acceso Denegado</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        No tienes el rol necesario para acceder a esta sección.
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                        Rol requerido: {requiredRole.replace('_', ' ').toLowerCase()}
                    </p>
                </div>
            </div>
        );
    }

    // TEMPORAL: Bypass para demostración - comentado para permitir acceso
    // Verificar permiso único
    if (requiredPermission && admin && !hasPermission(requiredPermission)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                        <svg
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Acceso Denegado</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        No tienes permisos para acceder a esta sección.
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                        Permiso requerido: {requiredPermission.replace('_', ' ').toLowerCase()}
                    </p>
                </div>
            </div>
        );
    }

    // TEMPORAL: Bypass para demostración - comentado para permitir acceso
    // Verificar múltiples permisos
    if (requiredPermissions && requiredPermissions.length > 0 && admin) {
        const hasAccess = requireAll 
            ? hasAllPermissions(requiredPermissions)
            : hasAnyPermission(requiredPermissions);

        if (!hasAccess) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                            <svg
                                className="h-6 w-6 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Acceso Denegado</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            No tienes los permisos necesarios para acceder a esta sección.
                        </p>
                        <div className="mt-2 text-xs text-gray-400">
                            <p>Permisos requeridos:</p>
                            <ul className="mt-1 space-y-1">
                                {requiredPermissions.map(permission => (
                                    <li key={permission}>
                                        • {permission.replace('_', ' ').toLowerCase()}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-1">
                                {requireAll ? 'Se requieren TODOS los permisos' : 'Se requiere AL MENOS UNO'}
                            </p>
                        </div>
                    </div>
                </div>
            );
        }
    }

    // Si pasa todas las verificaciones, renderizar el contenido
    return <>{children}</>;
};

export default ProtectedRoute;