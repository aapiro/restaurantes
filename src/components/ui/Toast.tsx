import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { clsx } from 'clsx';
import { Notification } from '../../types';
import { useNotificationStore } from '../../store';

interface ToastProps {
    notification: Notification;
}

const Toast: React.FC<ToastProps> = ({ notification }) => {
    const { removeNotification } = useNotificationStore();

    useEffect(() => {
        if (notification.duration && notification.duration > 0) {
            const timer = setTimeout(() => {
                removeNotification(notification.id);
            }, notification.duration);

            return () => clearTimeout(timer);
        }
    }, [notification.id, notification.duration, removeNotification]);

    const typeConfig = {
        success: {
            icon: CheckCircle,
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            textColor: 'text-green-800',
            iconColor: 'text-green-400',
        },
        error: {
            icon: AlertCircle,
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            textColor: 'text-red-800',
            iconColor: 'text-red-400',
        },
        warning: {
            icon: AlertTriangle,
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200',
            textColor: 'text-yellow-800',
            iconColor: 'text-yellow-400',
        },
        info: {
            icon: Info,
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            textColor: 'text-blue-800',
            iconColor: 'text-blue-400',
        },
    };

    const config = typeConfig[notification.type];
    const Icon = config.icon;

    return (
        <div
            className={clsx(
                'max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
                config.bgColor,
                config.borderColor,
                'border animate-slide-up'
            )}
        >
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <Icon className={clsx('h-6 w-6', config.iconColor)} />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className={clsx('text-sm font-medium', config.textColor)}>
                            {notification.title}
                        </p>
                        <p className={clsx('mt-1 text-sm', config.textColor, 'opacity-90')}>
                            {notification.message}
                        </p>
                        {notification.action && (
                            <div className="mt-3">
                                <button
                                    onClick={notification.action.onClick}
                                    className={clsx(
                                        'text-sm font-medium underline hover:no-underline',
                                        config.textColor
                                    )}
                                >
                                    {notification.action.label}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <button
                            onClick={() => removeNotification(notification.id)}
                            className={clsx(
                                'rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2',
                                config.textColor,
                                'opacity-70 hover:opacity-100'
                            )}
                        >
                            <span className="sr-only">Cerrar</span>
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Container de notificaciones
const ToastContainer: React.FC = () => {
    const { notifications } = useNotificationStore();

    if (notifications.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 space-y-4">
            {notifications.map((notification) => (
                <Toast key={notification.id} notification={notification} />
            ))}
        </div>
    );
};

export default Toast;
export { ToastContainer };