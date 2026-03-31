import React from 'react';
import { ShoppingCart, Search, Menu, Phone, Mail, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onNavigate, onHome }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [isMobileShopOpen, setIsMobileShopOpen] = React.useState(false);
    const { setIsCartOpen, cartCount } = useCart();

    const handleNavClick = (category) => {
        onNavigate(category);
        setIsMobileMenuOpen(false);
    };

    const handleHomeClick = () => {
        onHome();
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
                <div className="container-custom py-2 md:py-4 flex items-center justify-between">

                    {/* Mobile Menu Icon */}
                    <button
                        className="md:hidden text-navy p-2"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Logo */}
                    <div className="flex-grow md:flex-grow-0 text-center md:text-left cursor-pointer flex justify-center md:justify-start" onClick={onHome}>
                        <img 
                            src="https://fastasleep.co.za/wp-content/uploads/2021/11/fast_asleep_logo_updated.pdf.png" 
                            alt="Fast Asleep Logo" 
                            className="h-16 md:h-28 w-auto object-contain"
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-10 text-[13px] font-semibold uppercase tracking-[0.1em] text-navy">
                        <button onClick={onHome} className="hover:text-gold transition-colors duration-200">Home</button>
                        <div className="relative group py-4">
                            <button className="hover:text-gold transition-colors duration-200 flex items-center gap-1">
                                Shop <ChevronDown className="w-4 h-4" />
                            </button>
                            <div className="absolute top-[100%] left-0 bg-white shadow-xl border border-gray-100 rounded-lg py-3 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col items-start px-2">
                                <button onClick={() => onNavigate('shop')} className="w-full text-left font-bold px-4 py-2 text-navy hover:text-gold hover:bg-gray-50 rounded-md transition-colors">All Products</button>
                                <div className="h-px bg-gray-100 w-full my-1"></div>
                                <button onClick={() => onNavigate('babies')} className="w-full text-left px-4 py-2 text-navy hover:text-gold hover:bg-gray-50 rounded-md transition-colors">Hushhh</button>
                                <button onClick={() => onNavigate('bed-pillows')} className="w-full text-left px-4 py-2 text-navy hover:text-gold hover:bg-gray-50 rounded-md transition-colors">Pillows</button>
                                <button onClick={() => onNavigate('beds-and-bases')} className="w-full text-left px-4 py-2 text-navy hover:text-gold hover:bg-gray-50 rounded-md transition-colors">Beds & Bases</button>
                                <button onClick={() => onNavigate('k9-range')} className="w-full text-left px-4 py-2 text-navy hover:text-gold hover:bg-gray-50 rounded-md transition-colors">Scrappy Tails</button>
                                <button onClick={() => onNavigate('mattress-toppers')} className="w-full text-left px-4 py-2 text-navy hover:text-gold hover:bg-gray-50 rounded-md transition-colors">Toppers</button>
                                <button onClick={() => onNavigate('paedic-and-travel')} className="w-full text-left px-4 py-2 text-navy hover:text-gold hover:bg-gray-50 rounded-md transition-colors">Pedic & Travel</button>
                                <button onClick={() => onNavigate('travel-pillows')} className="w-full text-left px-4 py-2 text-navy hover:text-gold hover:bg-gray-50 rounded-md transition-colors">Travel Pillows</button>
                            </div>
                        </div>
                        <button onClick={() => alert('Coming Soon!')} className="text-gold font-bold border border-gold px-3 py-1 hover:bg-gold hover:text-white transition-all duration-200 uppercase tracking-wider">Build Your Own</button>
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
                            <button className="hover:text-gold" onClick={handleHomeClick}>Home</button>
                            <div className="flex flex-col items-center w-full">
                                <button 
                                    className="hover:text-gold flex items-center justify-center gap-2 mb-4" 
                                    onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
                                >
                                    Shop <ChevronDown className={`w-5 h-5 transition-transform ${isMobileShopOpen ? 'rotate-180' : ''}`} />
                                </button>
                                
                                {isMobileShopOpen && (
                                    <div className="flex flex-col space-y-4 text-base bg-white/10 w-full py-4 rounded-lg mb-4">
                                        <button className="hover:text-gold font-bold" onClick={() => handleNavClick('shop')}>All Products</button>
                                        <button className="hover:text-gold" onClick={() => handleNavClick('babies')}>Hushhh</button>
                                        <button className="hover:text-gold" onClick={() => handleNavClick('bed-pillows')}>Pillows</button>
                                        <button className="hover:text-gold" onClick={() => handleNavClick('beds-and-bases')}>Beds & Bases</button>
                                        <button className="hover:text-gold" onClick={() => handleNavClick('k9-range')}>Scrappy Tails</button>
                                        <button className="hover:text-gold" onClick={() => handleNavClick('mattress-toppers')}>Toppers</button>
                                        <button className="hover:text-gold" onClick={() => handleNavClick('paedic-and-travel')}>Pedic & Travel</button>
                                        <button className="hover:text-gold" onClick={() => handleNavClick('travel-pillows')}>Travel Pillows</button>
                                    </div>
                                )}
                            </div>
                            <button className="text-gold font-bold" onClick={() => { alert('Coming Soon!'); setIsMobileMenuOpen(false); }}>Build Your Own</button>
                            <button className="hover:text-gold" onClick={() => handleNavClick('contact')}>Contact</button>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
