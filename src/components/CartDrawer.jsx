import React, { Fragment } from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
    const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">

                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-navy/50 backdrop-blur-sm transition-opacity"
                    onClick={() => setIsCartOpen(false)}
                />

                {/* Drawer Panel */}
                <div className="fixed inset-y-0 right-0 max-w-full flex">
                    <div className="w-screen max-w-md bg-white shadow-xl flex flex-col h-full animate-in slide-in-from-right duration-300">

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                            <h2 className="text-lg font-bold text-navy uppercase tracking-widest flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 mb-1" /> Your Cart
                            </h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-gray-400 hover:text-navy transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <ShoppingBag className="w-16 h-16 text-gray-200" />
                                    <p className="text-gray-500 font-medium">Your cart is empty.</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="btn-primary mt-4"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                <ul className="divide-y divide-gray-100">
                                    {cart.map((item) => (
                                        <li key={`${item.id}-${item.variant}`} className="py-6 flex">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-navy">
                                                        <div>
                                                            <h3>
                                                                <a href="#">{item.name}</a>
                                                            </h3>
                                                            {item.isFathersDaySale && !item.noFathersDay20Percent && (
                                                                <span className="text-[9px] text-rose-500 font-extrabold uppercase tracking-wider bg-rose-50 px-1.5 py-0.5 rounded block w-max mt-1">Fathers Day Sale</span>
                                                            )}
                                                        </div>
                                                        <p className="ml-4 font-bold">
                                                            {item.exactPrice 
                                                                ? `R${parseFloat(item.exactPrice).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`
                                                                : item.priceRange.replace(/From\s*/i, '').split(/to|–|-/i)[0].trim()
                                                            }
                                                        </p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">Variant: {item.variant}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div className="flex items-center border border-gray-200">
                                                        <button
                                                            className="px-3 py-1 hover:bg-gray-50 text-gray-600"
                                                            onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                                                        >-</button>
                                                        <span className="px-3 py-1 font-medium text-navy">{item.quantity}</span>
                                                        <button
                                                            className="px-3 py-1 hover:bg-gray-50 text-gray-600"
                                                            onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                                                        >+</button>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => removeFromCart(item.id, item.variant)}
                                                        className="font-medium text-red-500 hover:text-red-700 flex items-center gap-1 text-xs uppercase tracking-wide"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Footer / Checkout */}
                        {cart.length > 0 && (
                            <div className="border-t border-gray-100 px-6 py-6 bg-gray-50">
                                <div className="flex justify-between text-base font-bold text-navy mb-4 uppercase tracking-wide">
                                    <p>Subtotal</p>
                                    <p>R{cartTotal.toLocaleString()}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <button
                                        onClick={() => setIsCheckoutOpen(true)}
                                        className="btn-primary w-full flex items-center justify-center"
                                    >
                                        Checkout
                                    </button>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or{' '}
                                        <button
                                            type="button"
                                            className="font-medium text-gold hover:text-gold-light"
                                            onClick={() => setIsCartOpen(false)}
                                        >
                                            Continue Shopping
                                            <span aria-hidden="true"> &rarr;</span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <CheckoutModal 
                isOpen={isCheckoutOpen} 
                onClose={() => setIsCheckoutOpen(false)} 
            />
        </div>
    );
}
