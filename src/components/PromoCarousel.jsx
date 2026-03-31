import React from 'react';

const images = [
    "https://fastasleep.co.za/wp-content/uploads/2021/11/0A85685E-20D9-4FA8-902C-EDD98778400C.png",
    "https://fastasleep.co.za/wp-content/uploads/2021/11/1FE97949-61D7-4891-91F7-989D3FFDA69B.png",
    "https://fastasleep.co.za/wp-content/uploads/2021/11/4FDDE4A6-C228-4DC0-9BCC-7B6DC8E9A351.png"
];

export default function PromoCarousel({ onNavigate }) {
    const handleImageClick = () => {
        // "will go to overall shop"
        onNavigate('shop');
    };

    return (
        <div className="bg-white py-12 md:py-16">
            <div className="container-custom">
                {/* 3 Items next to each other on desktop, 1 on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {images.map((src, idx) => (
                        <div 
                            key={idx} 
                            className="cursor-pointer group flex flex-col items-center overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow" 
                            onClick={handleImageClick}
                        >
                            <img 
                                src={src} 
                                alt={`Promotion ${idx + 1}`} 
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
