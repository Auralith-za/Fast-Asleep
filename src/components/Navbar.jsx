import React from 'react';
import { ShoppingCart, Search, Menu, Phone, Mail, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onNavigate, onHome }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const { setIsCartOpen, cartCount } = useCart();

    const handleNavClick = (category) => {
        onNavigate(category);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Announcement Bar */}
            <div className="bg-gold text-white text-[11px] md:text-xs py-2 text-center uppercase tracking-[0.15em] font-bold">
                Free Delivery Nationwide
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
                <div className="container-custom h-[88px] flex items-center justify-between">

                    {/* Mobile Menu Icon */}
                    <button
                        className="md:hidden text-navy p-2"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Logo */}
                    <div className="text-2xl md:text-3xl font-bold tracking-tight text-navy uppercase flex-grow md:flex-grow-0 text-center md:text-left cursor-pointer" onClick={onHome}>
                        Fast Asleep
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-10 text-[13px] font-semibold uppercase tracking-[0.1em] text-navy">
                        <button onClick={() => onNavigate('mattresses')} className="hover:text-gold transition-colors duration-200">Mattresses</button>
                        <button onClick={() => onNavigate('pillows')} className="hover:text-gold transition-colors duration-200">Pillows</button>
                        <button onClick={() => onNavigate('toppers')} className="hover:text-gold transition-colors duration-200">Toppers</button>
                        <button onClick={() => onNavigate('configurator')} className="text-gold font-bold border border-gold px-3 py-1 hover:bg-gold hover:text-white transition-all duration-200 uppercase tracking-wider">Build Your Own</button>
                        <button onClick={() => onNavigate('contact')} className="hover:text-gold transition-colors duration-200">Contact</button>
                    </nav>

                    {/* Icons */}
                    <div className="flex items-center space-x-6 text-navy">
                        <Search className="w-5 h-5 cursor-pointer hover:text-gold transition-colors hidden md:block" />
                        <div
                            className="relative cursor-pointer hover:text-gold transition-colors"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] bg-navy/90 backdrop-blur-sm md:hidden">
                    <div className="flex flex-col h-full text-white p-6">
                        <div className="flex justify-end mb-8">
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <X className="w-8 h-8" />
                            </button>
                        </div>
                        <nav className="flex flex-col space-y-6 text-xl font-semibold uppercase tracking-widest text-center">
                            <button className="hover:text-gold" onClick={() => handleNavClick('mattresses')}>Mattresses</button>
                            <button className="hover:text-gold" onClick={() => handleNavClick('pillows')}>Pillows</button>
                            <button className="hover:text-gold" onClick={() => handleNavClick('toppers')}>Toppers</button>
                            <button className="text-gold font-bold" onClick={() => handleNavClick('configurator')}>Build Your Own</button>
                            <button className="hover:text-gold" onClick={() => handleNavClick('contact')}>Contact</button>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
