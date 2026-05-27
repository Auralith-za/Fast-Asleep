import React from 'react';

export default function Bestsellers({ onProductClick }) {
    const specials = [
        {
            id: "fathers-day-sale-redirect",
            name: "20% fathers day sale",
            image: "/fathers-day/05485534-4615-416C-8761-20DD20F14C66.PNG",
            price: null,
            cta: "Shop Special Now"
        },
        {
            id: "father-day-camping-mattress",
            name: "Fathers day Special",
            image: "/fathers-day/68600FBE-5935-41C3-8C42-A36C02ACCA05.PNG",
            price: null,
            cta: "Shop Special Deal"
        },
        {
            id: "4698",
            name: "Father's Day Comfort Special",
            image: "/assets/bakkie-mattress.png",
            price: null,
            cta: "Get a Quote"
        }
    ];

    return (
        <section className="bg-[#fcfbf9] py-20 border-b border-gray-150">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-14">
                    <span className="text-gray-400 font-bold uppercase tracking-[0.25em] text-[10px] block mb-2">
                        FATHER'S DAY
                    </span>
                    <h2 className="font-script text-[#97BFBF] lowercase text-6xl md:text-7xl font-normal leading-[1.05] mb-4">
                        current specials
                    </h2>
                    <div className="w-24 h-0.5 bg-[#97BFBF] mx-auto"></div>
                </div>

                {/* Cards Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {specials.map((special) => (
                        <div 
                            key={special.id}
                            className="bg-white border border-gray-150 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 group cursor-pointer"
                            onClick={() => onProductClick(special.id)}
                        >
                            {/* Artwork Image - aspect-ratio and object-contain to prevent cutoff */}
                            <div className="aspect-[3/4] w-full overflow-hidden bg-white border-b border-gray-100 relative">
                                {special.id === '4698' ? (
                                    <img 
                                        src={special.image} 
                                        alt={special.name} 
                                        className="w-full h-full object-cover object-top scale-[1.22] origin-top"
                                    />
                                ) : (
                                    <img 
                                        src={special.image} 
                                        alt={special.name} 
                                        className="w-full h-full object-contain"
                                    />
                                )}
                            </div>

                            {/* Info & CTA */}
                            <div className="p-6 text-center">
                                <h3 className="font-extrabold text-navy text-sm uppercase tracking-wider mb-2 group-hover:text-[#97BFBF] transition-colors">
                                    {special.name}
                                </h3>
                                {special.price && (
                                    <p className="text-[#97BFBF] font-bold text-sm mb-4">
                                        {special.price}
                                    </p>
                                )}
                                <button className="w-full bg-navy text-white font-bold uppercase tracking-[0.18em] text-[10px] py-3.5 hover:bg-[#97BFBF] transition-colors mt-auto">
                                    {special.cta}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
