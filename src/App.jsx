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
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductDetail from './components/ProductDetail';
import CategoryPage from './components/CategoryPage';
import ContactPage from './components/ContactPage';
import Configurator from './components/Configurator';
import { CartProvider } from './context/CartContext';

import { useProducts } from './hooks/useProducts';
import DebugInfo from './components/DebugInfo';

function App() {
    const [currentView, setCurrentView] = useState('home');
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);
    const { products, loading } = useProducts();

    const navigateToProduct = (productId) => {
        setSelectedProductId(productId);
        setCurrentView('product');
        window.scrollTo(0, 0);
    };

    const navigateToCategory = (category) => {
        if (category === 'contact') {
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

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-navy font-bold">Loading Store...</div>;
    }

    return (
        <CartProvider>
            <div className="min-h-screen bg-white font-sans text-navy">
                <Navbar onNavigate={navigateToCategory} onHome={navigateToHome} />

                {currentView === 'home' && (
                    <>
                        {/* 1. Hero Banner */}
                        <Hero />
                        
                        {/* 1.5 Promo Carousel */}
                        <PromoCarousel onNavigate={navigateToCategory} />

                        {/* 2. Quick Trust Builders */}
                        <TrustBuilders />

                        {/* 3. Shop by Category */}
                        <CategoryTiles onNavigate={navigateToCategory} />

                        {/* What Sets Us Apart */}
                        <ValuesSection />

                        {/* Feature Tiles - 4 Promo Images */}
                        <FeaturedTiles onNavigate={navigateToCategory} />

                        {/* 4. Most Popular / Bestsellers */}
                        <Bestsellers onProductClick={navigateToProduct} products={products} />

                        {/* 5. Customer Reviews */}
                        <Reviews />

                        {/* 6. Special Promotions */}
                        <Promotions />

                        {/* 7. Why Choose Fast Asleep */}


                        {/* 8. Instant Communication (WhatsApp) */}
                        <WhatsAppButton />

                        {/* 9. Content / Educational Section */}
                        <BlogTeasers />
                    </>
                )}

                {currentView === 'category' && (
                    <CategoryPage category={currentCategory} onProductClick={navigateToProduct} products={products} />
                )}

                {currentView === 'product' && (
                    <ProductDetail productId={selectedProductId} onBack={navigateToHome} products={products} />
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
