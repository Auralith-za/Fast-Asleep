import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

export default function ProductGrid({ onProductClick }) {
    return (
        <section className="bg-white py-20">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-navy uppercase tracking-widest mb-4">Our Collection</h2>
                    <div className="w-16 h-1 bg-gold mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onClick={() => onProductClick(product.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
