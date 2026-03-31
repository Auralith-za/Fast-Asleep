import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/woocommerce';

export default function CheckoutModal({ isOpen, onClose }) {
    const { cart, cartTotal, clearCart } = useCart();
    
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address_1: '',
        city: '',
        state: '',
        postcode: '',
        country: 'ZA', // Default to South Africa
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Prepare the order payload
            const orderData = {
                payment_method: 'bacs', // A placeholder, actual payment is handled on WooCommerce Order Pay page
                payment_method_title: 'Direct Bank Transfer',
                set_paid: false,
                status: 'pending',
                billing: {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    address_1: formData.address_1,
                    city: formData.city,
                    state: formData.state,
                    postcode: formData.postcode,
                    country: formData.country,
                    email: formData.email,
                    phone: formData.phone
                },
                shipping: {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    address_1: formData.address_1,
                    city: formData.city,
                    state: formData.state,
                    postcode: formData.postcode,
                    country: formData.country,
                },
                line_items: cart.map(item => ({
                    product_id: parseInt(item.id),
                    quantity: item.quantity,
                    // Note: If you have variants, you must also pass variant_id here if WooCommerce uses it
                }))
            };

            const createdOrder = await createOrder(orderData);
            
            if (createdOrder && createdOrder.id && createdOrder.order_key) {
                // Clear the local cart
                clearCart();
                
                // Redirect user to the WooCommerce payment page seamlessly!
                const wcUrl = import.meta.env.VITE_WC_URL;
                window.location.href = `${wcUrl}/checkout/order-pay/${createdOrder.id}/?pay_for_order=true&key=${createdOrder.order_key}`;
            } else {
                setError('Failed to create order on WooCommerce. Please try again.');
            }

        } catch (err) {
            console.error("Checkout Error:", err);
            setError(err.message || 'An error occurred during checkout.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[150] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                <div 
                    className="fixed inset-0 bg-navy/60 backdrop-blur-sm transition-opacity" 
                    onClick={!isSubmitting ? onClose : undefined}
                />
                
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-center mb-5 border-b pb-4">
                            <h3 className="text-xl font-bold leading-6 text-navy">Checkout</h3>
                            <button
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="text-gray-400 hover:text-navy transition-colors disabled:opacity-50"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {error && (
                            <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input required type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold sm:text-sm p-2 border" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input required type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold sm:text-sm p-2 border" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold sm:text-sm p-2 border" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold sm:text-sm p-2 border" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Street Address</label>
                                    <input required type="text" name="address_1" value={formData.address_1} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold sm:text-sm p-2 border" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    <input required type="text" name="city" value={formData.city} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold sm:text-sm p-2 border" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">State / Province</label>
                                    <input required type="text" name="state" value={formData.state} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold sm:text-sm p-2 border" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                                    <input required type="text" name="postcode" value={formData.postcode} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold sm:text-sm p-2 border" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Country</label>
                                    <input required type="text" name="country" value="ZA" disabled className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-gold focus:ring-gold sm:text-sm p-2 border text-gray-500" />
                                    <p className="text-xs text-gray-500 mt-1">Currently restricted to South Africa</p>
                                </div>
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                                <div className="text-lg font-bold text-navy">
                                    Total: R{cartTotal.toLocaleString()}
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary flex justify-center items-center py-2 px-6 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        'Proceed to Payment'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
