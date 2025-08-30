import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    isLoading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            icon,
            iconPosition = 'left',
            fullWidth = false,
            disabled,
            className,
            ...props
        },
        ref
    ) => {
        const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

        const variantClasses = {
            primary: 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500 shadow-sm hover:shadow-md',
            secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500',
            outline: 'border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500',
            ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
            danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 shadow-sm hover:shadow-md',
        };

        const sizeClasses = {
            sm: 'px-3 py-1.5 text-sm gap-1.5',
            md: 'px-4 py-2 text-sm gap-2',
            lg: 'px-6 py-3 text-base gap-2',
            xl: 'px-8 py-4 text-lg gap-3',
        };

        const iconSizeClasses = {
            sm: 'w-4 h-4',
            md: 'w-4 h-4',
            lg: 'w-5 h-5',
            xl: 'w-6 h-6',
        };

        return (
            <button
                ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
                baseClasses,
                variantClasses[variant],
            sizeClasses[size],
            fullWidth && 'w-full',
            className
    )}
        {...props}
    >
        {isLoading && (
            <div className={clsx('animate-spin rounded-full border-2 border-current border-r-transparent', iconSizeClasses[size])} />
        )}

        {!isLoading && icon && iconPosition === 'left' && (
            <span className={iconSizeClasses[size]}>{icon}</span>
        )}

        {children}

        {!isLoading && icon && iconPosition === 'right' && (
            <span className={iconSizeClasses[size]}>{icon}</span>
        )}
        </button>
    );
    }
);

Button.displayName = 'Button';

export default Button;