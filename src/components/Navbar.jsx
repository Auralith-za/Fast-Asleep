import React from 'react';
import { ShoppingCart, Search, Menu, X, ChevronDown, Instagram, Facebook, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onNavigate, onHome }) {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [isMobileShopOpen, setIsMobileShopOpen] = React.useState(false);
    const { setIsCartOpen, cartCount } = useCart();

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 60);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            {/* Header */}
            <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
                isScrolled ? 'shadow-md py-1' : 'shadow-sm'
            } border-b border-gray-100`}>
                
                {/* Full Header Layout (Not Scrolled) */}
                <div className={`container-custom flex items-center justify-between transition-all duration-300 ${
                    isScrolled ? 'py-1' : 'py-4'
                }`}>
                    
                    {/* Left: Social Media Icons / Small Logo when Scrolled */}
                    {isScrolled ? (
                        <div className="cursor-pointer transition-all duration-300" onClick={onHome}>
                            <img 
                                src="https://wp.fastasleep.co.za/wp-content/uploads/2021/11/fast_asleep_logo_updated.pdf.png" 
                                alt="Fast Asleep Logo" 
                                className="h-14 md:h-16 w-auto object-contain"
                            />
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center space-x-5 text-navy">
                            <a href="https://www.instagram.com/fastasleepsa/" target="_blank" rel="noreferrer" className="hover:text-[#97BFBF] transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="https://www.facebook.com/fastasleepsa" target="_blank" rel="noreferrer" className="hover:text-[#97BFBF] transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-navy/40">|</span>
                            <a href="https://www.tiktok.com/@fastasleepza" target="_blank" rel="noreferrer" className="hover:text-[#97BFBF] transition-colors text-[10px] font-bold uppercase tracking-wider">
                                TikTok
                            </a>
                        </div>
                    )}

                    {/* Left: Mobile Menu Icon */}
                    <button
                        className="md:hidden text-navy p-2"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Center: Brand Logo / Navigation Links when Scrolled */}
                    {isScrolled ? (
                        <nav className="hidden md:flex items-center space-x-8 text-[10px] font-bold uppercase tracking-[0.15em] text-navy">
                            <button onClick={onHome} className="hover:text-[#97BFBF] transition-colors duration-200">Home</button>
                            <button onClick={() => onNavigate('beds-and-bases')} className="hover:text-[#97BFBF] transition-colors duration-200">Beds & Mattresses</button>
                            <button onClick={() => onNavigate('mattress-toppers')} className="hover:text-[#97BFBF] transition-colors duration-200">Toppers</button>
                            <button onClick={() => onNavigate('paedic-and-travel')} className="hover:text-[#97BFBF] transition-colors duration-200">Paedic Supports</button>
                            <button onClick={() => onNavigate('bed-pillows')} className="hover:text-[#97BFBF] transition-colors duration-200">Pillows</button>
                            <button onClick={() => onNavigate('babies')} className="hover:text-[#97BFBF] transition-colors duration-200">Babies</button>
                            <button onClick={() => onNavigate('k9-range')} className="hover:text-[#97BFBF] transition-colors duration-200">Scratchy Tails</button>
                            <button onClick={() => onNavigate('contact')} className="hover:text-[#97BFBF] transition-colors duration-200">Contact</button>
                        </nav>
                    ) : (
                        <div className="cursor-pointer flex justify-center flex-grow md:flex-grow-0 transition-all duration-300" onClick={onHome}>
                            <img 
                                src="https://wp.fastasleep.co.za/wp-content/uploads/2021/11/fast_asleep_logo_updated.pdf.png" 
                                alt="Fast Asleep Logo" 
                                className="h-28 md:h-36 w-auto object-contain"
                            />
                        </div>
                    )}

                    {/* Right: Actions */}
                    <div className="flex items-center space-x-6 text-navy">
                        <Search className="w-5 h-5 cursor-pointer hover:text-[#97BFBF] transition-colors hidden md:block" />
                        <User className="w-5 h-5 cursor-pointer hover:text-[#97BFBF] transition-colors hidden md:block" />
                        <div
                            className="relative cursor-pointer hover:text-[#97BFBF] transition-colors"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#97BFBF] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Navigation Links (Only visible when NOT scrolled) */}
                {!isScrolled && (
                    <div className="border-t border-gray-50 hidden md:block bg-white transition-all duration-300">
                        <div className="container-custom py-3.5 flex justify-center">
                            <nav className="flex items-center space-x-10 text-[11px] font-bold uppercase tracking-[0.18em] text-navy">
                                <button onClick={onHome} className="hover:text-[#97BFBF] transition-colors duration-200">Home</button>
                                <button onClick={() => onNavigate('beds-and-bases')} className="hover:text-[#97BFBF] transition-colors duration-200">Beds & Mattresses</button>
                                <button onClick={() => onNavigate('mattress-toppers')} className="hover:text-[#97BFBF] transition-colors duration-200">Toppers</button>
                                <button onClick={() => onNavigate('paedic-and-travel')} className="hover:text-[#97BFBF] transition-colors duration-200">Paedic Supports</button>
                                <button onClick={() => onNavigate('bed-pillows')} className="hover:text-[#97BFBF] transition-colors duration-200">Pillows</button>
                                <button onClick={() => onNavigate('babies')} className="hover:text-[#97BFBF] transition-colors duration-200">Babies</button>
                                <button onClick={() => onNavigate('k9-range')} className="hover:text-[#97BFBF] transition-colors duration-200">Scratchy Tails</button>
                                <button onClick={() => onNavigate('contact')} className="hover:text-[#97BFBF] transition-colors duration-200">Contact</button>
                            </nav>
                        </div>
                    </div>
                )}
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
                                        <button className="hover:text-gold" onClick={() => handleNavClick('k9-range')}>Scratchy Tails</button>
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
