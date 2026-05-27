import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SleepCollection({ onProductClick, products }) {
    const [scrollIndex, setScrollIndex] = useState(0);

    // Filter to only include pillows and specified toppers, excluding flash sales, wedges, and mother's day specials
    const collectionItems = Array.isArray(products) 
        ? products.filter(p => {
            const name = p.name.toLowerCase();
            if (name.includes('flash sale') || name.includes('wedge') || name.includes('mother\'s day') || name.includes('mothers day')) {
                return false;
            }
            const isPillow = p.categories?.includes('bed-pillows') || 
                             p.categories?.includes('travel-pillows') || 
                             p.categories?.includes('pillows') || 
                             name.includes('pillow');
            const isAllowedTopper = name.includes('memory foam topper') || 
                                    name.includes('dual topper') || 
                                    name.includes('gel memory foam topper') ||
                                    (name.includes('topper') && !name.includes('tri-fold') && !name.includes('mattress'));
            return isPillow || isAllowedTopper;
        }) 
        : [];

    const handleNext = () => {
        if (scrollIndex < collectionItems.length - 3) {
            setScrollIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (scrollIndex > 0) {
            setScrollIndex(prev => prev - 1);
        }
    };

    return (
        <section className="bg-white py-24 overflow-hidden border-b border-gray-150">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Left Column: Heading and Slider Controls */}
                    <div className="lg:col-span-3 flex flex-col justify-between py-6">
                        <div>
                            <span className="text-gray-400 font-bold uppercase tracking-[0.25em] text-[10px] block mb-2">
                                UPGRADE YOUR SLEEP
                            </span>
                            <h2 className="font-script text-[#97BFBF] lowercase text-5xl md:text-6xl font-normal leading-[1.05] mb-6">
                                pillows & toppers
                            </h2>
                            <div className="w-16 h-0.5 bg-[#97BFBF] mb-8"></div>
                        </div>

                        {/* Slider controls */}
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={handlePrev}
                                disabled={scrollIndex === 0}
                                className={`w-12 h-12 flex items-center justify-center border ${scrollIndex === 0 ? 'border-gray-250 text-gray-300' : 'border-navy text-navy hover:bg-navy hover:text-white'} transition-all bg-white`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div className="w-24 h-[2px] bg-gray-200 relative">
                                <div 
                                    className="absolute top-0 h-full bg-[#97BFBF] transition-all duration-300"
                                    style={{ 
                                        width: `${collectionItems.length > 0 ? (3 / collectionItems.length) * 100 : 0}%`,
                                        left: `${collectionItems.length > 0 ? (scrollIndex / collectionItems.length) * 100 : 0}%`
                                    }}
                                ></div>
                            </div>
                            <button 
                                onClick={handleNext}
                                disabled={scrollIndex >= collectionItems.length - 3}
                                className={`w-12 h-12 flex items-center justify-center border ${scrollIndex >= collectionItems.length - 3 ? 'border-gray-250 text-gray-300' : 'border-navy text-navy hover:bg-navy hover:text-white'} transition-all bg-white`}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Sliding Product Collection Cards with overflow-hidden to fix overlap */}
                    <div className="lg:col-span-9 overflow-hidden">
                        <div 
                            className="flex gap-6 transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${scrollIndex * (100 / 3)}%)` }}
                        >
                            {collectionItems.map((product) => (
                                <div 
                                    key={product.id} 
                                    className="w-[calc(100%-12px)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 bg-white border border-gray-150 p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-300 cursor-pointer group"
                                    onClick={() => onProductClick(product.id)}
                                >
                                    <div className="aspect-square w-full mb-6 overflow-hidden bg-white flex items-center justify-center">
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-navy text-[13px] uppercase tracking-wider mb-2 text-center group-hover:text-[#97BFBF] transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-400 text-xs text-center font-semibold">
                                            {product.priceRange}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
