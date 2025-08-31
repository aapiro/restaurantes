import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';
import { AdminLoginForm } from '../../types';
import { ROUTES } from '../../constants';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

type LoginFormData = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

const schema: yup.ObjectSchema<LoginFormData> = yup.object({
    email: yup
        .string()
        .email('Ingresa un email válido')
        .required('El email es requerido'),
    password: yup
        .string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es requerida'),
    rememberMe: yup.boolean().optional(),
});

const AdminLogin: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { login, isAuthenticated, isLoading, error, clearError } = useAdminStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: yupResolver(schema),
    });

    // Clear error when component mounts
    useEffect(() => {
        clearError();
    }, [clearError]);

    // Redirect if already authenticated
    if (isAuthenticated) {
        return <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />;
    }

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data.email, data.password, data.rememberMe);
        } catch (error) {
            // Error is handled by the store
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
                        <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Panel de Administración
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Inicia sesión para acceder al sistema
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Email"
                                    className="pl-10"
                                    {...register('email')}
                                    error={errors.email?.message}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Contraseña
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    placeholder="Contraseña"
                                    className="pl-10 pr-10"
                                    {...register('password')}
                                    error={errors.password?.message}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Remember me */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="rememberMe"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                {...register('rememberMe')}
                            />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                                Recordarme
                            </label>
                        </div>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="text-sm text-red-700">{error}</div>
                        </div>
                    )}

                    {/* Submit button */}
                    <div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Iniciando sesión...
                                </div>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </Button>
                    </div>

                    {/* Back to main site */}
                    <div className="text-center">
                        <Link
                            to={ROUTES.HOME}
                            className="text-sm text-blue-600 hover:text-blue-500"
                        >
                            ← Volver al sitio principal
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;