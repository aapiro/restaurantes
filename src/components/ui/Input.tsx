import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            helperText,
            leftIcon,
            rightIcon,
            fullWidth = false,
            className,
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

        const inputClasses = clsx(
            'block w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0',
            {
                'border-red-300 focus:border-red-500 focus:ring-red-200': error,
                'border-gray-300 focus:border-primary-500 focus:ring-primary-200': !error,
                'pl-10': leftIcon,
                'pr-10': rightIcon,
                'w-full': fullWidth,
            },
            className
        );

        return (
            <div className={clsx('relative', fullWidth && 'w-full')}>
        {label && (
            <label
                htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
                >
                {label}
                </label>
        )}

        <div className="relative">
            {leftIcon && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {leftIcon}
                    </div>
            )}

        <input
            ref={ref}
        id={inputId}
        className={inputClasses}
        {...props}
        />

        {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {rightIcon}
                </div>
        )}
        </div>

        {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
        )}

        {helperText && !error && (
            <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
        </div>
    );
    }
);

Input.displayName = 'Input';

export default Input;