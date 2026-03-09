import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        // Load config from local storage if available
        const savedCart = localStorage.getItem('fastAsleepCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('fastAsleepCart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1, variant = 'Standard') => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(
                item => item.id === product.id && item.variant === variant
            );

            if (existingItemIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            } else {
                return [...prevCart, { ...product, quantity, variant }];
            }
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id, variant) => {
        setCart(prevCart => prevCart.filter(item => !(item.id === id && item.variant === variant)));
    };

    const updateQuantity = (id, variant, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id, variant);
            return;
        }
        setCart(prevCart => prevCart.map(item =>
            (item.id === id && item.variant === variant) ? { ...item, quantity: newQuantity } : item
        ));
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((total, item) => {
        // Parse price logic (assuming price range string for now, but in real app would use actual price)
        // For this clone, we'll extract the first number from the price string "R9,995.00..."
        const priceString = item.priceRange ? item.priceRange.split('–')[0].replace(/[^0-9.]/g, '') : '0';
        const price = parseFloat(priceString);
        return total + (price * item.quantity);
    }, 0);

    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        cartCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
