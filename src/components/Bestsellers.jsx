import React from 'react';
// import { products } from '../data/products';
import ProductCard from './ProductCard';
import { Star, Flame, Sparkles } from 'lucide-react';

export default function Bestsellers({ onProductClick, products }) {
    // Logic to simulate "Bestsellers" - taking first 4 products for now
    const bestsellers = products.slice(0, 4);

    return (
        <section className="bg-white py-20 pb-10">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-navy uppercase tracking-widest mb-2 flex items-center gap-3">
                            <Flame className="text-gold w-8 h-8" /> Most Popular
                        </h2>
                        <p className="text-gray-500">Sleep solutions loved by thousands of South Africans.</p>
                    </div>
                    <button className="text-navy font-bold underline hover:text-gold transition-colors uppercase text-sm tracking-widest">
                        View All Products
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {bestsellers.map((product, index) => (
                        <div key={product.id} className="relative">
                            {/* Badge Overlay */}
                            {index === 0 && (
                                <div className="absolute top-2 left-2 z-10 bg-gold text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm shadow-sm flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-current" /> Bestseller
                                </div>
                            )}
                            {index === 1 && (
                                <div className="absolute top-2 left-2 z-10 bg-navy text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm shadow-sm flex items-center gap-1">
                                    <Sparkles className="w-3 h-3 fill-current" /> New Arrival
                                </div>
                            )}

                            <ProductCard
                                product={product}
                                onClick={() => onProductClick(product.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
