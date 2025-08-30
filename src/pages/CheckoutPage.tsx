import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Clock, CheckCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useCartStore, useNotificationStore } from '../store';
import { ROUTES, ORDER_CONFIG, SUCCESS_MESSAGES } from '../constants';
import { PaymentMethod } from '../types';

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const cartStore = useCartStore();
    const { addNotification } = useNotificationStore();

    const [deliveryAddress, setDeliveryAddress] = useState({
        street: '',
        city: 'Madrid',
        zipCode: '',
        instructions: ''
    });

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CREDIT_CARD);
    const [isProcessing, setIsProcessing] = useState(false);

    const { items, getSubtotal, getDeliveryFee, getTax, getTotal, getItemCount } = cartStore;

    // Redirigir si el carrito está vacío
    if (items.length === 0) {
        return (
            <Layout>
                <div className="max-w-2xl mx-auto px-4 py-12 text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Tu carrito está vacío
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Agrega algunos productos antes de continuar con el checkout
                    </p>
                    <Link to={ROUTES.RESTAURANTS}>
                        <Button variant="primary">Explorar Restaurantes</Button>
                    </Link>
                </div>
            </Layout>
        );
    }

    const subtotal = getSubtotal();
    const deliveryFee = getDeliveryFee();
    const tax = getTax();
    const total = getTotal();
    const meetsMinimum = subtotal >= ORDER_CONFIG.MINIMUM_ORDER_AMOUNT;

    const handleSubmitOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!meetsMinimum) {
            addNotification({
                type: 'error',
                title: 'Pedido mínimo no alcanzado',
                message: `El pedido mínimo es de $${ORDER_CONFIG.MINIMUM_ORDER_AMOUNT}`,
                duration: 5000,
            });
            return;
        }

        if (!deliveryAddress.street || !deliveryAddress.zipCode) {
            addNotification({
                type: 'error',
                title: 'Dirección incompleta',
                message: 'Por favor completa todos los campos de la dirección',
                duration: 4000,
            });
            return;
        }

        setIsProcessing(true);

        try {
            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simular creación de orden
            const orderId = Math.floor(Math.random() * 10000);

            // Limpiar carrito
            cartStore.clearCart();

            // Notificación de éxito
            addNotification({
                type: 'success',
                title: SUCCESS_MESSAGES.ORDER_PLACED,
                message: `Tu pedido #${orderId} ha sido confirmado`,
                duration: 6000,
                action: {
                    label: 'Ver pedido',
                    onClick: () => navigate(`/orders/${orderId}`)
                }
            });

            // Redirigir a página de confirmación
            navigate(`/orders/${orderId}`);

        } catch (error) {
            addNotification({
                type: 'error',
                title: 'Error al procesar pedido',
                message: 'Hubo un problema al procesar tu pedido. Intenta nuevamente.',
                duration: 5000,
            });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <Link
                    to={ROUTES.RESTAURANTS}
                    className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Continuar comprando
                </Link>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                <form onSubmit={handleSubmitOrder}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Información de entrega y pago */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Dirección de entrega */}
                            <Card padding="lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <MapPin className="w-5 h-5 text-primary-500" />
                                    <h2 className="text-xl font-bold text-gray-900">Dirección de Entrega</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <Input
                                            label="Dirección completa"
                                            placeholder="Calle, número, piso, puerta..."
                                            value={deliveryAddress.street}
                                            onChange={(e) => setDeliveryAddress(prev => ({ ...prev, street: e.target.value }))}
                                            required
                                            fullWidth
                                        />
                                    </div>
                                    <Input
                                        label="Ciudad"
                                        value={deliveryAddress.city}
                                        onChange={(e) => setDeliveryAddress(prev => ({ ...prev, city: e.target.value }))}
                                        required
                                        fullWidth
                                    />
                                    <Input
                                        label="Código Postal"
                                        placeholder="28001"
                                        value={deliveryAddress.zipCode}
                                        onChange={(e) => setDeliveryAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                                        required
                                        fullWidth
                                    />
                                    <div className="md:col-span-2">
                                        <Input
                                            label="Instrucciones de entrega (opcional)"
                                            placeholder="Ej: Tocar el timbre, 2º piso izquierda..."
                                            value={deliveryAddress.instructions}
                                            onChange={(e) => setDeliveryAddress(prev => ({ ...prev, instructions: e.target.value }))}
                                            fullWidth
                                        />
                                    </div>
                                </div>
                            </Card>

                            {/* Método de pago */}
                            <Card padding="lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <CreditCard className="w-5 h-5 text-primary-500" />
                                    <h2 className="text-xl font-bold text-gray-900">Método de Pago</h2>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        { id: PaymentMethod.CREDIT_CARD, label: 'Tarjeta de Crédito', icon: '💳' },
                                        { id: PaymentMethod.DEBIT_CARD, label: 'Tarjeta de Débito', icon: '💳' },
                                        { id: PaymentMethod.CASH, label: 'Efectivo', icon: '💵' },
                                        { id: PaymentMethod.DIGITAL_WALLET, label: 'Pago Digital', icon: '📱' }
                                    ].map((method) => (
                                        <label
                                            key={method.id}
                                            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                                                paymentMethod === method.id
                                                    ? 'border-primary-500 bg-primary-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={method.id}
                                                checked={paymentMethod === method.id}
                                                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                                className="sr-only"
                                            />
                                            <span className="text-2xl">{method.icon}</span>
                                            <span className="font-medium text-gray-900">{method.label}</span>
                                            {paymentMethod === method.id && (
                                                <CheckCircle className="w-5 h-5 text-primary-500 ml-auto" />
                                            )}
                                        </label>
                                    ))}
                                </div>
                            </Card>

                            {/* Tiempo estimado */}
                            <Card padding="lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="w-5 h-5 text-primary-500" />
                                    <h3 className="font-bold text-gray-900">Tiempo Estimado de Entrega</h3>
                                </div>
                                <p className="text-gray-600">
                                    Tu pedido llegará en aproximadamente <strong>25-35 minutos</strong>
                                </p>
                            </Card>
                        </div>

                        {/* Resumen del pedido */}
                        <div className="lg:col-span-1">
                            <Card padding="lg" className="sticky top-24">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen del Pedido</h2>

                                {/* Items del carrito */}
                                <div className="space-y-3 mb-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-3">
                                            <img
                                                src={item.dish.image}
                                                alt={item.dish.name}
                                                className="w-12 h-12 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 text-sm">
                                                    {item.dish.name}
                                                </h4>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600">x{item.quantity}</span>
                                                    <span className="font-medium">${item.totalPrice.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Totales */}
                                <div className="space-y-2 text-sm border-t pt-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Delivery</span>
                                        <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                      {deliveryFee === 0 ? 'Gratis' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Impuestos</span>
                                        <span className="font-medium">${tax.toFixed(2)}</span>
                                    </div>
                                    <hr />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-primary-500">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Advertencia de pedido mínimo */}
                                {!meetsMinimum && (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                                        <div className="text-yellow-800 text-sm">
                                            <strong>Pedido mínimo:</strong> ${ORDER_CONFIG.MINIMUM_ORDER_AMOUNT.toFixed(2)}
                                        </div>
                                        <div className="text-yellow-600 text-xs">
                                            Te faltan ${(ORDER_CONFIG.MINIMUM_ORDER_AMOUNT - subtotal).toFixed(2)}
                                        </div>
                                    </div>
                                )}

                                {/* Botón de confirmar pedido */}
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    fullWidth
                                    isLoading={isProcessing}
                                    disabled={!meetsMinimum || isProcessing}
                                    className="mt-6"
                                >
                                    {isProcessing
                                        ? 'Procesando Pedido...'
                                        : meetsMinimum
                                            ? `Confirmar Pedido - $${total.toFixed(2)}`
                                            : `Mínimo $${ORDER_CONFIG.MINIMUM_ORDER_AMOUNT}`
                                    }
                                </Button>

                                <p className="text-xs text-gray-500 text-center mt-3">
                                    Al confirmar tu pedido aceptas nuestros términos y condiciones
                                </p>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default CheckoutPage;