import React, { useState } from 'react';
import { X, Loader2, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/woocommerce';
import { generatePayfastForm } from '../utils/payfast';

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
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('bacs');

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
                payment_method: paymentMethod, 
                payment_method_title: paymentMethod === 'bacs' ? 'Direct Bank Transfer' : 'PayFast',
                set_paid: false,
                status: paymentMethod === 'bacs' ? 'on-hold' : 'pending',
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
                line_items: cart.map(item => {
                    const lineItem = {
                        product_id: parseInt(item.id),
                        quantity: item.quantity,
                    };

                    // Pass the variation_id so WooCommerce knows which variant was selected
                    if (item.variationId) {
                        lineItem.variation_id = parseInt(item.variationId);
                    }

                    // Pass the exact price the customer saw (subtotal/total per line, before/after tax)
                    // This prevents WooCommerce from using a stale or different price from its database
                    if (item.exactPrice) {
                        const lineTotal = (parseFloat(item.exactPrice) * item.quantity).toFixed(2);
                        lineItem.subtotal = lineTotal;
                        lineItem.total = lineTotal;
                    }

                    // Pass variation attributes as meta_data so the order reflects the chosen options
                    if (item.variationAttributes && item.variationAttributes.length > 0) {
                        lineItem.meta_data = item.variationAttributes.map(attr => ({
                            key: attr.name,
                            value: attr.option
                        }));
                    }

                    return lineItem;
                })
            };

            const createdOrder = await createOrder(orderData);
            
            if (createdOrder && createdOrder.id) {
                // Clear the local cart
                clearCart();
                
                if (paymentMethod === 'payfast') {
                    // Generate Payfast payload securely
                    const payfastData = generatePayfastForm(createdOrder.id, cartTotal, formData);
                    
                    // Create dynamic form and bounce to Payfast
                    const form = document.createElement('form');
                    form.method = 'POST';
                    form.action = 'https://www.payfast.co.za/eng/process';
                    
                    payfastData.forEach(param => {
                        const hiddenField = document.createElement('input');
                        hiddenField.type = 'hidden';
                        hiddenField.name = param.name;
                        hiddenField.value = param.value;
                        form.appendChild(hiddenField);
                    });
                    
                    document.body.appendChild(form);
                    form.submit();
                } else {
                    // Show native success for Bank Transfer
                    setOrderId(createdOrder.id);
                    setIsSuccess(true);
                }
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

                        {isSuccess ? (
                            <div className="py-10 text-center flex flex-col items-center">
                                <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
                                <h4 className="text-2xl font-bold text-navy mb-2">Order Successfully Placed!</h4>
                                <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                                    Thank you for your order! Your Order Number is <strong>#{orderId}</strong>.
                                </p>
                                <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 w-full text-left mb-8 text-sm text-gray-700">
                                    <h5 className="font-bold text-navy uppercase tracking-wide mb-3">Make Payment To:</h5>
                                    <div className="bg-white p-4 border border-gray-200 rounded mb-4 font-mono text-base">
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="font-bold">Bank Name:</div><div className="col-span-2">Nedbank</div>
                                            <div className="font-bold">Account Name:</div><div className="col-span-2">DMFS</div>
                                            <div className="font-bold">Account No:</div><div className="col-span-2">1136063110</div>
                                            <div className="font-bold text-navy mt-2">Reference:</div><div className="col-span-2 mt-2 font-bold text-navy">Order #{orderId}</div>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 font-medium">Please note: Your order will not be shipped until the funds have cleared.</p>
                                </div>
                                <button 
                                    onClick={() => { setIsSuccess(false); onClose(); }} 
                                    className="btn-primary"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
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
                            
                            {/* Payment Methods */}
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <h4 className="text-lg font-bold text-navy mb-4">Payment Method</h4>
                                <div className="space-y-4 text-left">
                                    <label className={`flex flex-col border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'bacs' ? 'border-gold bg-gold/5' : 'border-gray-200'}`}>
                                        <div className="flex items-center gap-3">
                                            <input type="radio" name="payment_method" value="bacs" checked={paymentMethod === 'bacs'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-gold focus:ring-gold" />
                                            <span className="font-bold text-navy uppercase tracking-wide">Direct Bank Transfer</span>
                                        </div>
                                        {paymentMethod === 'bacs' && (
                                            <p className="mt-3 text-sm text-gray-600 pl-7 leading-relaxed">
                                                Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                            </p>
                                        )}
                                    </label>

                                    <label className={`flex flex-col border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'payfast' ? 'border-gold bg-gold/5' : 'border-gray-200'}`}>
                                        <div className="flex items-center gap-3">
                                            <input type="radio" name="payment_method" value="payfast" checked={paymentMethod === 'payfast'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-gold focus:ring-gold" />
                                            <span className="font-bold text-navy uppercase tracking-wide">
                                                PayFast 
                                            </span>
                                        </div>
                                        {paymentMethod === 'payfast' && (
                                            <p className="mt-3 text-sm text-gray-600 pl-7 leading-relaxed">
                                                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                                            </p>
                                        )}
                                    </label>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div className="text-lg font-bold text-navy">
                                    Total: R{cartTotal.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary flex justify-center items-center py-3 px-8 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        paymentMethod === 'payfast' ? 'Pay via PayFast' : 'Place Order'
                                    )}
                                </button>
                            </div>
                        </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
