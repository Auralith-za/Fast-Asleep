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
                isSale: found.isFathersDaySale,
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
        <div className="space-y-16 py-16 bg-[#fcfbf9] border-b border-gray-150">
            {/* Section 1: South Africa's Most Loved Sleep Products */}
            <div className="container-custom">
                <div className="text-center mb-10">
                    <h3 className="font-serif italic text-2xl md:text-3xl text-navy">
                        South Africa's Most Loved Sleep Products
                    </h3>
                    <div className="w-16 h-[1px] bg-gray-300 mx-auto mt-4"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {lovedProducts.map((p, idx) => (
                        <div 
                            key={idx}
                            onClick={() => onProductClick && onProductClick(p.id)}
                            className="bg-white border border-gray-150 p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-300 cursor-pointer group rounded-sm"
                        >
                            <div className="aspect-[4/3] w-full mb-6 overflow-hidden bg-gray-50 flex items-center justify-center rounded-sm">
                                <img 
                                    src={p.image} 
                                    alt={p.name}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-350"
                                />
                            </div>
                            <div className="text-center">
                                <h4 className="font-bold text-navy text-[13px] uppercase tracking-wider mb-2 group-hover:text-[#97BFBF] transition-colors leading-tight">
                                    {p.name}
                                </h4>
                                <div className="flex justify-center text-amber-400 gap-0.5 mb-2">
                                    {[...Array(p.rating)].map((_, i) => (
                                        <span key={i} className="text-xs">★</span>
                                    ))}
                                </div>
                                {p.isSale && p.originalPrice ? (
                                    <div className="flex flex-col items-center gap-0.5">
                                        <span className="text-[9px] text-rose-500 font-extrabold uppercase tracking-wider bg-rose-50 px-1.5 py-0.5 rounded">Fathers Day Sale</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400 line-through">{p.originalPrice}</span>
                                            <span className="text-sm font-bold text-navy">{p.price}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <span className="text-gray-500 text-xs font-bold">{p.price}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <button 
                        onClick={() => onNavigate && onNavigate('shop')}
                        className="bg-navy hover:bg-[#97BFBF] text-white font-bold uppercase tracking-wider text-xs px-8 py-3.5 transition-colors duration-300 rounded-sm"
                    >
                        Shop Specials ▾
                    </button>
                </div>
            </div>

            {/* Section 2: Limited Time Sleep Upgrades Banner */}
            <div className="container-custom">
                <div className="max-w-6xl mx-auto bg-[#faf8f4] border border-gray-200 overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 items-center rounded-sm">
                    <div className="p-8 md:p-12 md:col-span-7 text-center md:text-left space-y-6">
                        <h4 className="font-serif italic text-2xl md:text-3xl text-navy">
                            Limited Time Sleep Upgrades
                        </h4>
                        <p className="text-gray-600 text-sm md:text-base font-medium">
                            Save 20% on Select Mattresses & Pillows • Fathers Day Sale Active
                        </p>
                        <button 
                            onClick={() => onNavigate && onNavigate('shop')}
                            className="bg-navy hover:bg-[#97BFBF] text-white font-bold uppercase tracking-wider text-xs px-8 py-3.5 transition-colors duration-300 rounded-sm"
                        >
                            Shop Specials ▾
                        </button>
                    </div>

                    <div className="md:col-span-5 h-64 md:h-full min-h-[220px] bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600')` }}>
                    </div>
                </div>
            </div>
        </div>
    );
}
