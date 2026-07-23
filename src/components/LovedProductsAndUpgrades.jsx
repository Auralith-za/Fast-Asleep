import React from 'react';

export default function LovedProductsAndUpgrades({ onProductClick, onNavigate, products }) {
    // Dynamic lookup of the 6 requested products: ORTHO ECLIPSE, The Mechanical Motion bed, Orthopaedic Memory Mattress Topper, Hydro-cool Gel Pillow, Dual Pillow, Combo Pillow
    const targetKeys = [
        { name: "ORTHO ECLIPSE", match: "ortho eclipse" },
        { name: "The Mechanical Motion bed", match: "mechanical motion bed" },
        { name: "Orthopaedic Memory Mattress Topper", match: "orthopaedic memory mattress topper" },
        { name: "Hydro-cool Gel Pillow", match: "hydro-cool gel pillow" },
        { name: "Dual Pillow", match: "dual pillow" },
        { name: "Combo Pillow", match: "combo pillow" }
    ];

    // Find live product objects matching targets
    const lovedProducts = targetKeys.map(target => {
        const found = Array.isArray(products) ? products.find(p => p.name.toLowerCase().includes(target.match)) : null;
        if (found) {
            return {
                id: found.id,
                name: found.name,
                image: found.image,
                price: found.priceRange,
                originalPrice: found.originalPriceRange,
                isSale: found.isChristmasInJulySale,
                rating: 5
            };
        }
        
        // Static fallbacks in case live load hasn't occurred yet
        let fallbackImage = "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1000";
        let fallbackPrice = "R950.00";
        
        if (target.match.includes("ortho eclipse")) {
            fallbackImage = "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1000";
            fallbackPrice = "R5,650.00 – R13,770.00";
        } else if (target.match.includes("mechanical motion")) {
            fallbackImage = "/assets/ideal-bases-bg.png";
            fallbackPrice = "Contact for Price";
        } else if (target.match.includes("topper")) {
            fallbackImage = "/assets/promos/topper-bundle.png";
            fallbackPrice = "R860.00";
        } else if (target.match.includes("hydro-cool")) {
            fallbackImage = "/assets/categories/pillow.png";
            fallbackPrice = "R770.00";
        } else if (target.match.includes("dual")) {
            fallbackImage = "/assets/categories/pillow.png";
            fallbackPrice = "R646.00";
        } else if (target.match.includes("combo")) {
            fallbackImage = "/assets/categories/pillow.png";
            fallbackPrice = "R550.00";
        }

        return {
            id: target.match.includes("ortho eclipse") ? "ortho-eclipse" : (target.match.includes("topper") ? "memory-foam-topper" : "combo-pillow"),
            name: target.name,
            image: fallbackImage,
            price: fallbackPrice,
            rating: 5,
            isSale: false
        };
    });

    return (
        <section className="bg-white py-16 md:py-24 border-b border-gray-150 overflow-hidden">
            <div className="w-full px-4 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-10 items-stretch">
                    
                    {/* Left side: Heading, Subtitle, Lifestyle Image */}
                    <div className="w-full lg:w-[35%] flex flex-col justify-center relative rounded-sm overflow-hidden min-h-[300px] p-8 md:p-12 z-10 group">
                        {/* Background Lifestyle Image */}
                        <div className="absolute inset-0 z-0">
                            <img 
                                src="/bundle_bedroom.png" 
                                alt="Lifestyle Bedroom" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-navy/80 mix-blend-multiply"></div>
                        </div>

                        {/* Content over image */}
                        <div className="relative z-10 text-white flex flex-col justify-center h-full">
                            <h3 className="font-extrabold text-2xl md:text-3xl lg:text-4xl uppercase tracking-widest leading-tight mb-3">
                                South Africa's Most Loved Sleep Products
                            </h3>
                            <p className="font-script text-[#cca86e] text-4xl md:text-5xl lowercase mb-8">
                                trial tested and loved
                            </p>
                            
                            <div className="mt-auto">
                                <div className="flex items-center text-amber-400 gap-1 mb-2 text-xl md:text-2xl">
                                    ★★★★★
                                </div>
                                <p className="text-white/90 font-bold text-sm uppercase tracking-wider">
                                    Trusted by thousands of South Africans
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right side: One-line compact Carousel */}
                    <div className="w-full lg:w-[65%] flex items-center">
                        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4 px-4 lg:px-0 -mx-4 lg:mx-0 w-full">
                            {lovedProducts.map((p, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => onProductClick && onProductClick(p.id)}
                                    className="bg-white border border-gray-150 p-4 flex flex-col justify-between hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 cursor-pointer group min-w-[200px] md:min-w-[240px] max-w-[240px] flex-shrink-0 snap-center"
                                >
                                    <div className="aspect-square w-full mb-4 overflow-hidden bg-gray-50 flex items-center justify-center">
                                        <img 
                                            src={p.image} 
                                            alt={p.name}
                                            className="w-[90%] h-[90%] object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                                        />
                                    </div>
                                    <div className="text-left flex flex-col flex-grow">
                                        <h4 className="font-extrabold text-navy text-[11px] md:text-xs uppercase tracking-wider mb-2 group-hover:text-[#cca86e] transition-colors leading-snug">
                                            {p.name}
                                        </h4>
                                        
                                        {/* Bigger Rating with Review Text */}
                                        <div className="flex items-center gap-1.5 mb-3">
                                            <div className="flex text-amber-400 text-sm md:text-base">
                                                ★★★★★
                                            </div>
                                            <span className="text-gray-400 text-[10px] font-bold">(120+ Reviews)</span>
                                        </div>

                                        <div className="mt-auto pt-2 border-t border-gray-100 flex items-end justify-between">
                                            {p.isSale && p.originalPrice ? (
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-gray-400 line-through mb-0.5">{p.originalPrice}</span>
                                                    <span className="text-xs font-bold text-navy">{p.price}</span>
                                                </div>
                                            ) : (
                                                <span className="text-xs font-bold text-navy">{p.price}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Section 2: Limited Time Sleep Upgrades Banner */}
            <div className="w-full mt-12 md:mt-16 bg-[#faf8f4] border-t border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 items-stretch h-auto md:h-[300px]">
                    <div className="p-8 md:p-16 flex flex-col justify-center text-center md:text-left space-y-4">
                        <h4 className="font-serif italic text-2xl md:text-4xl text-navy">
                            Limited Time Sleep Upgrades
                        </h4>
                        <p className="text-gray-600 text-sm md:text-base font-medium">
                            Don't miss out on our Christmas in July specials
                        </p>
                        <div>
                            <button 
                                onClick={() => onNavigate && onNavigate('shop')}
                                className="bg-navy hover:bg-[#97BFBF] text-white font-bold uppercase tracking-wider text-[11px] px-6 py-3 transition-colors duration-300 rounded-sm inline-block mt-2"
                            >
                                Shop Specials ▾
                            </button>
                        </div>
                    </div>

                    <div className="h-48 md:h-full bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1400&auto=format&fit=crop')` }}>
                    </div>
                </div>
            </div>
        </section>
    );
}
