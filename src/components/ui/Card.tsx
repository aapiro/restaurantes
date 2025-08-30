import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'bordered' | 'elevated' | 'flat';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    hover?: boolean;
    clickable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            children,
            variant = 'default',
            padding = 'md',
            hover = false,
            clickable = false,
            className,
            ...props
        },
        ref
    ) => {
        const baseClasses = 'bg-white rounded-xl overflow-hidden transition-all duration-300';

        const variantClasses = {
            default: 'shadow-md border border-gray-100',
            bordered: 'border-2 border-gray-200',
            elevated: 'shadow-lg border border-gray-50',
            flat: 'border border-gray-100',
        };

        const paddingClasses = {
            none: '',
            sm: 'p-3',
            md: 'p-4',
            lg: 'p-6',
            xl: 'p-8',
        };

        const interactiveClasses = {
            hover: hover && 'hover:shadow-lg hover:-translate-y-1',
            clickable: clickable && 'cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        };

        return (
            <div
                ref={ref}
                className={clsx(
                    baseClasses,
                    variantClasses[variant],
                    paddingClasses[padding],
                    interactiveClasses.hover,
                    interactiveClasses.clickable,
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

// Subcomponentes para mejor organización
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, className, ...props }, ref) => (
        <div
            ref={ref}
            className={clsx('flex flex-col space-y-1.5', className)}
            {...props}
        >
            {children}
        </div>
    )
);

CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ children, className, ...props }, ref) => (
        <h3
            ref={ref}
            className={clsx('text-lg font-semibold leading-none tracking-tight text-gray-900', className)}
            {...props}
        >
            {children}
        </h3>
    )
);

CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ children, className, ...props }, ref) => (
        <p
            ref={ref}
            className={clsx('text-sm text-gray-600', className)}
            {...props}
        >
            {children}
        </p>
    )
);

CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, className, ...props }, ref) => (
        <div
            ref={ref}
            className={clsx('pt-0', className)}
            {...props}
        >
            {children}
        </div>
    )
);

CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, className, ...props }, ref) => (
        <div
            ref={ref}
            className={clsx('flex items-center pt-4', className)}
            {...props}
        >
            {children}
        </div>
    )
);

CardFooter.displayName = 'CardFooter';

export { Card as default, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };