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
        <section className="bg-gray-50 py-20 md:py-32 overflow-hidden">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* Left Column: Heading and Slider Controls */}
                    <div className="lg:col-span-3 flex flex-col justify-center">
                        <div>
                            <span className="text-navy font-bold uppercase tracking-widest text-[11px] block mb-1">
                                DIVE INTO OUR
                            </span>
                            <h2 className="font-script text-navy text-5xl md:text-6xl font-normal leading-tight mb-4">
                                Sleep Collection
                            </h2>
                            <div className="w-12 h-0.5 bg-[#cca86e] mb-10"></div>
                        </div>

                        {/* Slider controls */}
                        <div className="flex items-center gap-4 w-full max-w-[200px]">
                            <button 
                                onClick={handlePrev}
                                disabled={scrollIndex === 0}
                                className={`flex items-center justify-center transition-all ${scrollIndex === 0 ? 'text-gray-300' : 'text-navy hover:scale-110'}`}
                            >
                                <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
                            </button>
                            
                            <div className="flex-grow h-[2px] bg-white relative rounded-full overflow-hidden">
                                <div 
                                    className="absolute top-0 h-full bg-[#cca86e] transition-all duration-300"
                                    style={{ 
                                        width: `${collectionItems.length > 0 ? (3 / collectionItems.length) * 100 : 0}%`,
                                        left: `${collectionItems.length > 0 ? (scrollIndex / collectionItems.length) * 100 : 0}%`
                                    }}
                                ></div>
                            </div>

                            <button 
                                onClick={handleNext}
                                disabled={scrollIndex >= collectionItems.length - 3}
                                className={`flex items-center justify-center transition-all ${scrollIndex >= collectionItems.length - 3 ? 'text-gray-300' : 'text-navy hover:scale-110'}`}
                            >
                                <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Sliding Product Collection Cards */}
                    <div className="lg:col-span-9 overflow-hidden mt-10 lg:mt-0">
                        <div 
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${scrollIndex * (100 / 3)}%)` }}
                        >
                            {collectionItems.map((product, idx) => (
                                <div 
                                    key={product.id} 
                                    className={`w-[calc(100%)] sm:w-[50%] lg:w-[33.333%] flex-shrink-0 bg-white border-y border-r border-gray-200 ${idx === 0 ? 'border-l' : ''} p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group`}
                                    onClick={() => onProductClick(product.id)}
                                >
                                    <div className="aspect-square w-full mb-8 overflow-hidden bg-white flex items-center justify-center">
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="mt-auto">
                                        <h3 className="font-extrabold text-navy text-[10px] md:text-[11px] uppercase tracking-wider mb-2 group-hover:text-[#cca86e] transition-colors leading-relaxed">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-400 text-xs font-semibold">
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
