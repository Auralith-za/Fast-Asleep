import React from 'react';
import { Flame } from 'lucide-react';

export default function Bestsellers({ onProductClick, products }) {
    // Select the first 4 products from the 'Beds and Bases' category from WooCommerce
    const bestsellerItems = Array.isArray(products) 
        ? products.filter(p => p.categories && p.categories.includes('beds-and-bases')).slice(0, 4) 
        : [];

    return (
        <section className="bg-white py-20">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-black text-[#1a2b4b] uppercase tracking-wider flex items-center gap-3 mb-2">
                            <Flame className="w-8 h-8 text-[#98c1c2]" /> MOST POPULAR
                        </h2>
                        <p className="text-gray-500 font-medium">Sleep solutions loved by thousands of South Africans.</p>
                    </div>
                    <a href="#" className="text-[#1a2b4b] font-bold text-sm tracking-widest border-b-2 border-[#1a2b4b] pb-1 uppercase mt-4 md:mt-0">
                        View All Products
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {bestsellerItems.map((product) => (
                        <div key={product.id} className="group cursor-pointer" onClick={() => onProductClick(product.id)}>
                            <div className="relative aspect-square mb-8 flex items-center justify-center bg-[#fdfdfd] rounded-sm overflow-hidden">
                                {product.tag && (
                                    <div className={`absolute top-0 left-0 z-10 px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase ${product.tag === 'BESTSELLER' ? 'bg-[#98c1c2]' : 'bg-[#1a2b4b]'}`}>
                                        ★ {product.tag}
                                    </div>
                                )}
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            
                            <div className="text-center px-4">
                                <h3 className="font-black text-[#1a2b4b] text-lg mb-4 tracking-wider">{product.name}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                                    {product.description}
                                </p>
                                <p className="text-[#98c1c2] font-bold text-lg">
                                    {product.priceRange}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
