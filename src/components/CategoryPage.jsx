import React from 'react';
import ProductCard from './ProductCard';
// import { products } from '../data/products';

export default function CategoryPage({ category, onProductClick, products }) {
    // Filter products by category, but if 'shop', show all
    const categoryProducts = category === 'shop' || category === 'all' 
        ? products 
        : products.filter(product => product.categories?.includes(category) || product.category === category);

    // Format category title strictly based on exact WooCommerce mapping
    const categoryTitles = {
        'shop': 'All Products',
        'babies': 'Hushhh',
        'bed-pillows': 'Pillows',
        'beds-and-bases': 'Beds & Bases',
        'k9-range': 'Scratchy Tails',
        'mattress-toppers': 'Mattress Toppers',
        'paedic-and-travel': 'Pedic & Travel',
        'travel-pillows': 'Travel Pillows'
    };

    const title = categoryTitles[category] || 
        (category ? category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ') : '');

    return (
        <section className="bg-white py-20 min-h-[60vh]">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-navy uppercase tracking-widest mb-4">{title}</h1>
                    <div className="w-16 h-1 bg-gold mx-auto mb-6"></div>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Explore our premium collection of {category} designed for your perfect sleep.
                    </p>
                </div>

                {categoryProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
                        {categoryProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={() => onProductClick(product.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-lg">
                        <p className="text-xl text-gray-500">Coming Soon</p>
                        <p className="text-sm text-gray-400 mt-2">We are currently updating our {category} collection.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
