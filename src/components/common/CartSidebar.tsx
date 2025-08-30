import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import { useCartStore } from '../../store';
import { ROUTES, ORDER_CONFIG } from '../../constants';

const CartSidebar: React.FC = () => {
    const {
        items,
        isOpen,
        closeCart,
        updateQuantity,
        removeItem, // Cambiar de removeFromCart a removeItem
        getSubtotal,
        getDeliveryFee,
        getTax,
        getTotal,
        getItemCount,
        clearCart
    } = useCartStore();

    const subtotal = getSubtotal();
    const deliveryFee = getDeliveryFee();
    const tax = getTax();
    const total = getTotal();
    const itemCount = getItemCount();
    const meetsMinimum = subtotal >= ORDER_CONFIG.MINIMUM_ORDER_AMOUNT;

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-50 transition-opacity"
                onClick={closeCart}
            />

            {/* Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5" />
                            Tu Carrito ({itemCount})
                        </h2>
                        <button
                            onClick={closeCart}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Contenido del carrito */}
                    {items.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-center p-8">
                            <div>
                                <div className="text-6xl mb-4">🛒</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Tu carrito está vacío
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Agrega algunos productos deliciosos
                                </p>
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        closeCart();
                                        // Navegar a restaurantes si estamos en home
                                        window.location.href = ROUTES.RESTAURANTS;
                                    }}
                                >
                                    Explorar Restaurantes
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Lista de items */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {/* Info del restaurante */}
                                {items.length > 0 && (
                                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mb-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium text-primary-800">
                                                    {items[0].dish.restaurant?.name || 'Restaurante'}
                                                </div>
                                                <div className="text-sm text-primary-600">
                                                    Delivery ${deliveryFee.toFixed(2)} • {items[0].dish.restaurant?.deliveryTime || '25-35 min'}
                                                </div>
                                            </div>
                                            <button
                                                onClick={clearCart}
                                                className="text-primary-600 hover:text-primary-800 p-1"
                                                title="Limpiar carrito"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Items del carrito */}
                                {items.map((item) => (
                                    <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
                                        <div className="flex gap-3">
                                            <img
                                                src={item.dish.image}
                                                alt={item.dish.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 mb-1">
                                                    {item.dish.name}
                                                </h4>
                                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                                    {item.dish.description}
                                                </p>

                                                {item.specialInstructions && (
                                                    <p className="text-xs text-gray-500 mb-2 italic">
                                                        "{item.specialInstructions}"
                                                    </p>
                                                )}

                                                <div className="flex items-center justify-between">
                                                    {/* Controles de cantidad */}
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-8 h-8 rounded-full border-2 border-primary-500 flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-colors"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-8 h-8 rounded-full border-2 border-primary-500 flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-colors"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>

                                                    {/* Precio */}
                                                    <div className="text-right">
                                                        <div className="font-bold text-primary-500">
                                                            ${item.totalPrice.toFixed(2)}
                                                        </div>
                                                        <button
                                                            onClick={() => removeItem(item.id)} // Usar removeItem
                                                            className="text-xs text-red-500 hover:text-red-700 underline"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Resumen y checkout */}
                            <div className="border-t bg-white p-4 space-y-4">
                                {/* Advertencia de pedido mínimo */}
                                {!meetsMinimum && (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                        <div className="text-yellow-800 text-sm">
                                            <strong>Pedido mínimo:</strong> ${ORDER_CONFIG.MINIMUM_ORDER_AMOUNT.toFixed(2)}
                                        </div>
                                        <div className="text-yellow-600 text-xs">
                                            Te faltan ${(ORDER_CONFIG.MINIMUM_ORDER_AMOUNT - subtotal).toFixed(2)} para realizar el pedido
                                        </div>
                                    </div>
                                )}

                                {/* Delivery gratis */}
                                {subtotal < ORDER_CONFIG.FREE_DELIVERY_THRESHOLD && subtotal > 0 && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                        <div className="text-green-800 text-sm">
                                            <strong>¡Delivery gratis!</strong> en pedidos de ${ORDER_CONFIG.FREE_DELIVERY_THRESHOLD}+
                                        </div>
                                        <div className="text-green-600 text-xs">
                                            Agrega ${(ORDER_CONFIG.FREE_DELIVERY_THRESHOLD - subtotal).toFixed(2)} más
                                        </div>
                                    </div>
                                )}

                                {/* Resumen de precios */}
                                <div className="space-y-2 text-sm">
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

                                {/* Botones de acción */}
                                <div className="space-y-3">
                                    <Link to={ROUTES.CHECKOUT} onClick={closeCart}>
                                        <Button
                                            variant="primary"
                                            fullWidth
                                            size="lg"
                                            disabled={!meetsMinimum}
                                        >
                                            {meetsMinimum ? 'Continuar al Checkout' : `Mínimo $${ORDER_CONFIG.MINIMUM_ORDER_AMOUNT}`}
                                        </Button>
                                    </Link>

                                    <Button
                                        variant="outline"
                                        fullWidth
                                        onClick={() => {
                                            closeCart();
                                            if (items.length > 0) {
                                                const restaurantId = items[0].restaurantId;
                                                window.location.href = ROUTES.RESTAURANT_DETAIL(restaurantId);
                                            }
                                        }}
                                    >
                                        Agregar más productos
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartSidebar;