import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CategoryTiles({ onNavigate }) {
    const categories = [
        {
            title: "Kids Range",
            subtitle: "Fun, safe & colorful foam beds",
            image: "https://cloudsplash.co.za/wp/wp-content/uploads/2026/02/Screenshot-2026-02-17-at-21.11.39.png", // Kids bedroom
            action: () => onNavigate('babies'), 
            colSpan: "md:col-span-2"
        },
        {
            title: "Pet Range",
            subtitle: "Durable comfort for furry friends",
            image: "https://cloudsplash.co.za/wp/wp-content/uploads/2026/02/Screenshot-2026-02-17-at-21.13.22.png", // Dog sleeping
            action: () => onNavigate('k9-range'),
            colSpan: "md:col-span-1"
        },
        {
            title: "Medical Solutions",
            subtitle: "Pressure relief & orthopaedic care",
            image: "https://cloudsplash.co.za/wp/wp-content/uploads/2026/02/Screenshot-2026-02-17-at-21.15.43.png", // Clean medical/white
            action: () => onNavigate('paedic-and-travel'),
            colSpan: "md:col-span-1"
        },
        {
            title: "Caravan & Bakkie",
            subtitle: "Comfort on the road",
            image: "https://cloudsplash.co.za/wp/wp-content/uploads/2026/02/Screenshot-2026-02-17-at-21.14.51.png", // Camping/Van
            action: () => onNavigate('contact'),
            colSpan: "md:col-span-1"
        },
        {
            title: "Custom Foam Cuts",
            subtitle: "Any size, any shape, made to order",
            image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800", // Abstract foam/shapes
            action: () => onNavigate('contact'),
            colSpan: "md:col-span-1"
        }
    ];

    return (
        <section className="bg-white py-12">
            <div className="container-custom">
                <h2 className="text-3xl font-bold text-navy uppercase tracking-widest mb-10 text-center">Shop by Category</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {/* First item - Main Featured (Kids) */}
                    <div
                        className="relative group overflow-hidden rounded-sm cursor-pointer md:col-span-2 md:row-span-1"
                        onClick={categories[0].action}
                    >
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
                        <img
                            src={categories[0].image}
                            alt={categories[0].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute bottom-6 left-6 z-20 text-white">
                            <h3 className="text-2xl font-bold uppercase tracking-wide mb-1">{categories[0].title}</h3>
                            <p className="text-white/90 text-sm mb-4">{categories[0].subtitle}</p>
                            <button className="flex items-center gap-2 text-gold font-bold uppercase text-xs tracking-widest hover:text-white transition-colors">
                                Shop Range <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Other items */}
                    {categories.slice(1).map((cat, index) => (
                        <div
                            key={index}
                            className={`relative group overflow-hidden rounded-sm cursor-pointer ${cat.colSpan || ''}`}
                            onClick={cat.action}
                        >
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute bottom-6 left-6 z-20 text-white">
                                <h3 className="text-xl font-bold uppercase tracking-wide mb-1">{cat.title}</h3>
                                <p className="text-white/90 text-sm mb-3 hidden lg:block">{cat.subtitle}</p>
                                <button className="flex items-center gap-2 text-gold font-bold uppercase text-xs tracking-widest hover:text-white transition-colors">
                                    View <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
