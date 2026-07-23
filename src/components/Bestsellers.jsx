import React from 'react';

export default function Bestsellers({ onProductClick }) {
    const specials = [
        {
            id: "christmas-in-july-baby-play-gym",
            name: "Christmas in July",
            image: "/xmas-in-july/FF15F48A-8C8A-4449-8718-DF044419356F.png",
            price: null,
            cta: "Shop Baby Play Gym"
        },
        {
            id: "christmas-in-july-play-couch",
            name: "Christmas in July",
            image: "/xmas-in-july/3FDF3FC0-2536-4444-849B-5909F28411D5.png",
            price: null,
            cta: "Shop Play Couch"
        }
    ];

    return (
        <section className="bg-gray-50 py-16 md:py-24 border-b border-gray-150 overflow-hidden">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <span className="text-navy font-bold uppercase tracking-widest text-[11px] block mb-2">
                        LIMITED TIME UPGRADES
                    </span>
                    <h2 className="font-script text-navy lowercase text-5xl md:text-6xl font-normal leading-tight mb-4">
                        better sleep shouldn't wait
                    </h2>
                    <div className="w-12 h-0.5 bg-[#cca86e] mx-auto"></div>
                </div>

                {/* Cards Layout - Carousel on Mobile, Grid on Desktop */}
                <div className="mx-auto max-w-4xl">
                    <div className="flex overflow-x-auto md:grid md:grid-cols-2 snap-x snap-mandatory scrollbar-hide md:border md:border-gray-200 bg-white pb-4 md:pb-0 px-4 md:px-0 -mx-4 md:mx-0">
                        {specials.map((special, index) => (
                            <div 
                                key={special.id}
                                className={`flex-shrink-0 w-[85vw] md:w-auto flex flex-col justify-between group cursor-pointer snap-center bg-white border border-gray-200 md:border-0 ${index !== specials.length - 1 ? 'md:border-r md:border-gray-200' : ''} mr-4 md:mr-0 last:mr-4 md:last:mr-0`}
                                onClick={() => onProductClick(special.id)}
                            >
                                {/* Artwork Image */}
                                <div className="aspect-[3/4] w-full overflow-hidden relative bg-[#2a2620]">
                                    <img 
                                        src={special.image} 
                                        alt={special.name} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Info & CTA */}
                                <div className="p-6 text-center border-t border-gray-100 flex flex-col flex-grow">
                                    <h3 className="font-extrabold text-navy text-[11px] md:text-[12px] uppercase tracking-wider mb-2 group-hover:text-[#cca86e] transition-colors">
                                        {special.name}
                                    </h3>
                                    {special.price && (
                                        <p className="text-[#cca86e] font-bold text-sm mb-4">
                                            {special.price}
                                        </p>
                                    )}
                                    <div className="mt-auto pt-4">
                                        <button className="text-navy font-bold uppercase tracking-widest text-[10px] group-hover:text-[#cca86e] transition-colors pb-1 border-b border-navy group-hover:border-[#cca86e]">
                                            {special.cta}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
