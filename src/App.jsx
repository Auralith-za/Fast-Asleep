import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PromoCarousel from './components/PromoCarousel';
import TrustBuilders from './components/TrustBuilders';
import CategoryTiles from './components/CategoryTiles';
import Bestsellers from './components/Bestsellers';
import FeaturedTiles from './components/FeaturedTiles';
import Promotions from './components/Promotions';
import Reviews from './components/Reviews';
import WhyChooseUs from './components/WhyChooseUs';
import ValuesSection from './components/ValuesSection';
import BlogTeasers from './components/BlogTeasers';
import WhatsAppButton from './components/WhatsAppButton';
import SleepBundles from './components/SleepBundles';
import SleepCollection from './components/SleepCollection';
import CustomisationSection from './components/CustomisationSection';
import NewsletterSection from './components/NewsletterSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductDetail from './components/ProductDetail';
import CategoryPage from './components/CategoryPage';
import ContactPage from './components/ContactPage';
import Configurator from './components/Configurator';
import FAQ from './components/FAQ';
import { CartProvider } from './context/CartContext';
import LovedProductsAndUpgrades from './components/LovedProductsAndUpgrades';

import { useProducts } from './hooks/useProducts';
import DebugInfo from './components/DebugInfo';

function App() {
    const [currentView, setCurrentView] = useState('home');
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);
    const { products, loading } = useProducts();

    const navigateToProduct = (productId) => {
        if (productId === '4698' || productId === 'father-day-bakkie-mattress') {
            navigateToCategory('contact');
            return;
        }
        if (productId === 'fathers-day-sale-redirect' || productId === '4696') {
            navigateToCategory('shop');
            return;
        }
        setSelectedProductId(productId);
        setCurrentView('product');
        window.scrollTo(0, 0);
    };

    const navigateToCategory = (category) => {
        if (category === 'contact' || category === 'caravan' || category === 'custom' || category === 'medical') {
            setCurrentView('contact');
        } else if (category === 'configurator') {
            setCurrentView('configurator');
        } else {
            setCurrentCategory(category);
            setCurrentView('category');
        }
        window.scrollTo(0, 0);
    };

    const navigateToHome = () => {
        setCurrentView('home');
        window.scrollTo(0, 0);
    };

    return (
        <CartProvider>
            <div className="min-h-screen bg-white font-sans text-navy">
                <Navbar onNavigate={navigateToCategory} onHome={navigateToHome} />

                {currentView === 'home' && (
                    <>
                        {/* 1. Hero Banner */}
                        <Hero onNavigate={navigateToCategory} />
                        
                        {/* 2. Quick Trust Builders */}
                        <TrustBuilders />

                        {/* Fast Asleep Sleep Bundles */}
                        <SleepBundles onNavigate={navigateToCategory} onProductClick={navigateToProduct} products={products} />

                        {/* Father's Day Specials */}
                        <Bestsellers onProductClick={navigateToProduct} />

                        {/* Customisation Section */}
                        <CustomisationSection onNavigate={navigateToCategory} />

                        {/* Bestsellers/Sleep Collection Carousel */}
                        <SleepCollection onProductClick={navigateToProduct} products={products} />

                        {/* 3. Shop by Category */}
                        <CategoryTiles onNavigate={navigateToCategory} />

                        {/* South Africa's Most Loved & Upgrades */}
                        <LovedProductsAndUpgrades onProductClick={navigateToProduct} onNavigate={navigateToCategory} products={products} />

                        {/* 5. Customer Reviews */}
                        <Reviews />

                        {/* 6. Special Promotions */}
                        <Promotions onProductClick={navigateToProduct} />

                        <FAQ />
                        <ValuesSection />

                        {/* 8. Instant Communication (WhatsApp) */}
                        <WhatsAppButton />

                        {/* 9. Content / Educational Section */}
                        <BlogTeasers />
                        
                        <ContactSection />
                    </>
                )}

                {currentView === 'category' && (
                    <CategoryPage category={currentCategory} onProductClick={navigateToProduct} products={products} />
                )}

                {currentView === 'product' && (
                    <ProductDetail productId={selectedProductId} onBack={navigateToHome} products={products} onNavigate={navigateToCategory} />
                )}

                {currentView === 'contact' && (
                    <ContactPage />
                )}

                {currentView === 'configurator' && (
                    <Configurator />
                )}

                {/* 10. Footer (Full Info) */}
                <Footer />
                <CartDrawer />
            </div>
        </CartProvider>
    );
}

export default App;
