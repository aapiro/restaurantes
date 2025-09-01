import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, CheckCircle, Truck, ChefHat } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ROUTES } from '../constants';
import { OrderStatus } from '../types';

// Mock order data
const mockOrder = {
    id: 12345,
    status: OrderStatus.PREPARING,
    restaurant: {
        id: 1,
        name: "La Parrilla Dorada",
        phone: "+34 915 123 456",
        address: "Calle Mayor 123, Madrid"
    },
    items: [
        {
            id: 1,
            name: "Parrillada Especial",
            quantity: 1,
            unitPrice: 24.50,
            totalPrice: 24.50,
            image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=100&h=100&fit=crop"
        },
        {
            id: 2,
            name: "Lomo Saltado",
            quantity: 2,
            unitPrice: 18.90,
            totalPrice: 37.80,
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=100&h=100&fit=crop"
        }
    ],
    subtotal: 62.30,
    deliveryFee: 2.50,
    tax: 4.98,
    total: 69.78,
    deliveryAddress: {
        street: "Calle Alcalá 456, 3º B",
        city: "Madrid",
        zipCode: "28014",
        instructions: "Tocar el timbre dos veces"
    },
    estimatedDeliveryTime: "19:30",
    createdAt: "2024-01-15T18:45:00",
    paymentMethod: "Tarjeta de Crédito"
};

const statusConfig = {
    [OrderStatus.PENDING]: {
        icon: Clock,
        title: 'Pedido Recibido',
        description: 'Hemos recibido tu pedido y lo estamos procesando',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200'
    },
    [OrderStatus.CONFIRMED]: {
        icon: CheckCircle,
        title: 'Pedido Confirmado',
        description: 'El restaurante ha confirmado tu pedido',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
    },
    [OrderStatus.PREPARING]: {
        icon: ChefHat,
        title: 'Preparando tu Pedido',
        description: 'El chef está preparando tu deliciosa comida',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200'
    },
    [OrderStatus.READY]: {
        icon: CheckCircle,
        title: 'Pedido Listo',
        description: 'Tu pedido está listo para ser entregado',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
    },
    [OrderStatus.OUT_FOR_DELIVERY]: {
        icon: Truck,
        title: 'En Camino',
        description: 'Tu pedido está en camino a tu dirección',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200'
    },
    [OrderStatus.DELIVERED]: {
        icon: CheckCircle,
        title: 'Entregado',
        description: '¡Tu pedido ha sido entregado! ¡Disfrútalo!',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
    },
    [OrderStatus.CANCELLED]: {
        icon: Clock,
        title: 'Pedido Cancelado',
        description: 'Tu pedido ha sido cancelado',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
    }
};

const OrderDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // En producción, aquí harías la llamada a la API
    const order = mockOrder;
    const currentStatus = statusConfig[order.status];
    const StatusIcon = currentStatus.icon;

    const formatTime = (timeString: string) => {
        return new Date(timeString).toLocaleString('es-ES', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <Link
                    to={ROUTES.ORDERS}
                    className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Mis pedidos
                </Link>

                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Pedido #{order.id}
                    </h1>
                    <p className="text-gray-600">
                        Realizado el {formatTime(order.createdAt)}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Estado del pedido y detalles */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Estado actual */}
                        <Card padding="lg" className={`${currentStatus.bgColor} ${currentStatus.borderColor} border-2`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full ${currentStatus.bgColor} flex items-center justify-center`}>
                                    <StatusIcon className={`w-6 h-6 ${currentStatus.color}`} />
                                </div>
                                <div>
                                    <h2 className={`text-xl font-bold ${currentStatus.color}`}>
                                        {currentStatus.title}
                                    </h2>
                                    <p className={`${currentStatus.color} opacity-80`}>
                                        {currentStatus.description}
                                    </p>
                                    {order.status === OrderStatus.OUT_FOR_DELIVERY && (
                                        <p className="text-sm mt-2 font-medium">
                                            Llegada estimada: {order.estimatedDeliveryTime}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Card>

                        {/* Timeline del pedido */}
                        <Card padding="lg">
                            <h3 className="font-bold text-gray-900 mb-4">Estado del Pedido</h3>
                            <div className="space-y-4">
                                {[
                                    { status: OrderStatus.PENDING, time: '18:45', active: true },
                                    { status: OrderStatus.CONFIRMED, time: '18:47', active: true },
                                    { status: OrderStatus.PREPARING, time: '18:50', active: order.status === OrderStatus.PREPARING },
                                    { status: OrderStatus.READY, time: '19:15', active: false },
                                    { status: OrderStatus.OUT_FOR_DELIVERY, time: '19:20', active: false },
                                    { status: OrderStatus.DELIVERED, time: '19:30', active: false }
                                ].map((step, index) => {
                                    const config = statusConfig[step.status];
                                    const StepIcon = config.icon;

                                    return (
                                        <div key={step.status} className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                step.active
                                                    ? `${config.bgColor} ${config.borderColor} border-2`
                                                    : 'bg-gray-100 border-2 border-gray-200'
                                            }`}>
                                                <StepIcon className={`w-4 h-4 ${step.active ? config.color : 'text-gray-400'}`} />
                                            </div>
                                            <div className="flex-1">
                                                <div className={`font-medium ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>
                                                    {config.title}
                                                </div>
                                                <div className="text-sm text-gray-500">{step.time}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>

                        {/* Información del restaurante */}
                        <Card padding="lg">
                            <h3 className="font-bold text-gray-900 mb-4">Restaurante</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                                    <span className="text-primary-600 font-bold">🍴</span>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">{order.restaurant.name}</h4>
                                    <p className="text-gray-600 text-sm">{order.restaurant.address}</p>
                                    <p className="text-gray-600 text-sm">{order.restaurant.phone}</p>
                                </div>
                            </div>
                        </Card>

                        {/* Dirección de entrega */}
                        <Card padding="lg">
                            <div className="flex items-center gap-2 mb-3">
                                <MapPin className="w-5 h-5 text-primary-500" />
                                <h3 className="font-bold text-gray-900">Dirección de Entrega</h3>
                            </div>
                            <div className="text-gray-700">
                                <p>{order.deliveryAddress.street}</p>
                                <p>{order.deliveryAddress.city}, {order.deliveryAddress.zipCode}</p>
                                {order.deliveryAddress.instructions && (
                                    <p className="text-sm text-gray-600 mt-2 italic">
                                        "{order.deliveryAddress.instructions}"
                                    </p>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Resumen y acciones */}
                    <div className="lg:col-span-1">
                        <Card padding="lg" className="sticky top-24">
                            <h3 className="font-bold text-gray-900 mb-4">Resumen</h3>

                            {/* Items */}
                            <div className="space-y-3 mb-6">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-12 h-12 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">x{item.quantity}</span>
                                                <span className="font-medium">${item.totalPrice.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Totales */}
                            <div className="space-y-2 text-sm border-t pt-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Delivery</span>
                                    <span className="font-medium">${order.deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Impuestos</span>
                                    <span className="font-medium">${order.tax.toFixed(2)}</span>
                                </div>
                                <hr />
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span className="text-primary-500">${order.total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Método de pago */}
                            <div className="text-sm text-gray-600 mb-6">
                                <strong>Pago:</strong> {order.paymentMethod}
                            </div>

                            {/* Acciones */}
                            <div className="space-y-3">
                                {order.status !== OrderStatus.DELIVERED && order.status !== OrderStatus.CANCELLED && (
                                    <Button
                                        variant="outline"
                                        fullWidth
                                        onClick={() => {
                                            // Implementar cancelación
                                            alert('Funcionalidad de cancelación pendiente');
                                        }}
                                    >
                                        Cancelar Pedido
                                    </Button>
                                )}

                                <Link to={ROUTES.RESTAURANTS}>
                                    <Button variant="primary" fullWidth>
                                        Hacer Nuevo Pedido
                                    </Button>
                                </Link>

                                <Button
                                    variant="ghost"
                                    fullWidth
                                    onClick={() => {
                                        // Implementar soporte
                                        alert('Funcionalidad de soporte pendiente');
                                    }}
                                >
                                    Contactar Soporte
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OrderDetailPage;