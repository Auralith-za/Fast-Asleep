import React from 'react';

const images = [
    "https://wp.fastasleep.co.za/wp-content/uploads/2021/11/6FBF97A9-637E-4553-AC6C-C57E7A3B20D2.png",
    "https://wp.fastasleep.co.za/wp-content/uploads/2021/11/54A96A54-2BCB-4C10-A9FE-8DB67B668425.png",
    "https://wp.fastasleep.co.za/wp-content/uploads/2021/11/C9A005F1-32F8-40F9-9095-0C7D85D84A86.png",
    "https://wp.fastasleep.co.za/wp-content/uploads/2021/11/FCA4D6E3-7775-4E41-8BAE-CF773EC1C4FF.png"
];

export default function FeaturedTiles({ onNavigate }) {
    const handleImageClick = () => {
        // Assume these link to the overall shop as well, or you can route them later
        onNavigate('shop');
    };

    return (
        <section className="bg-gray-50 py-12 md:py-16">
            <div className="container-custom">
                {/* 4 Items next to each other on desktop, 2 on tablet/mobile */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {images.map((src, idx) => (
                        <div 
                            key={idx} 
                            className="cursor-pointer group flex flex-col items-center overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow relative aspect-[4/5]" 
                            onClick={handleImageClick}
                        >
                            <img 
                                src={src} 
                                alt={`Feature ${idx + 1}`} 
                                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
