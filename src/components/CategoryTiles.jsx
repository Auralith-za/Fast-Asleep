import React from 'react';

export default function CategoryTiles({ onNavigate }) {
    const categories = [
        {
            id: 'babies',
            title: "KIDS RANGE",
            subtitle: "Fun, safe & colorful foam beds",
            image: "https://cloudsplash.co.za/wp/wp-content/uploads/2026/02/Screenshot-2026-02-17-at-21.11.39.png",
            gridClass: "md:col-span-2 md:row-span-2",
            aspectClass: "aspect-[16/10] md:aspect-auto h-full",
            actionText: "SHOP RANGE"
        },
        {
            id: 'bed-pillows',
            title: "PILLOWS",
            subtitle: "Anatomical neck support",
            image: "https://wp.fastasleep.co.za/wp-content/uploads/2021/11/4.png",
            gridClass: "md:col-span-1",
            aspectClass: "aspect-[16/10]",
            actionText: "VIEW"
        },
        {
            id: 'beds-and-bases',
            title: "BEDS & BASE",
            subtitle: "Complete sleep systems",
            image: "/assets/beds-and-bases.png",
            gridClass: "md:col-span-1",
            aspectClass: "aspect-[16/10]",
            actionText: "VIEW RANGE"
        },
        {
            id: 'k9-range',
            title: "PET RANGE",
            subtitle: "Durable comfort for furry friends",
            image: "https://cloudsplash.co.za/wp/wp-content/uploads/2026/02/Screenshot-2026-02-17-at-21.13.22.png",
            gridClass: "md:col-span-1",
            aspectClass: "aspect-[16/10]",
            actionText: "VIEW"
        },
        {
            id: 'medical',
            title: "MEDICAL SOLUTIONS",
            subtitle: "Pressure relief care",
            image: "https://cloudsplash.co.za/wp/wp-content/uploads/2026/02/Screenshot-2026-02-17-at-21.15.43.png",
            gridClass: "md:col-span-1",
            aspectClass: "aspect-[16/10]",
            actionText: "VIEW"
        },
        {
            id: 'caravan',
            title: "CARAVAN & BAKKIE",
            subtitle: "Comfort on the road",
            image: "https://cloudsplash.co.za/wp/wp-content/uploads/2026/02/Screenshot-2026-02-17-at-21.14.51.png",
            gridClass: "md:col-span-1",
            aspectClass: "aspect-[16/10]",
            actionText: "VIEW"
        },
        {
            id: 'paedic-and-travel',
            title: "PAEDIC SUPPORTS",
            subtitle: "Orthopaedic wellness",
            image: "https://wp.fastasleep.co.za/wp-content/uploads/2021/11/6.png",
            gridClass: "md:col-span-1",
            aspectClass: "aspect-[16/10]",
            actionText: "VIEW"
        },
        {
            id: 'custom',
            title: "CUSTOM FOAM CUTS",
            subtitle: "Any size, any shape",
            image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800",
            gridClass: "md:col-span-2",
            aspectClass: "aspect-[16/10] md:aspect-[32/10]",
            actionText: "VIEW"
        }
    ];

    return (
        <section className="bg-white py-20">
            <div className="container-custom">
                <h2 className="text-3xl font-black text-[#1a2b4b] text-center uppercase tracking-[0.2em] mb-16">
                    SHOP BY CATEGORY
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <div 
                            key={cat.id} 
                            className={`relative group overflow-hidden rounded-sm cursor-pointer ${cat.gridClass} ${cat.aspectClass}`}
                            onClick={() => onNavigate(cat.id)}
                        >
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
                            <img 
                                src={cat.image} 
                                alt={cat.title} 
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute bottom-8 left-8 z-20 text-white">
                                <h3 className="text-2xl font-black tracking-wider mb-1 uppercase">{cat.title}</h3>
                                <p className="text-sm font-medium opacity-90 mb-4">{cat.subtitle}</p>
                                <button className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-[#98c1c2] group-hover:text-white transition-colors">
                                    {cat.actionText} <span className="text-lg">→</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
