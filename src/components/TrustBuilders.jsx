import React from 'react';
import { Scissors, Truck, ShieldCheck, Star, MessageCircle } from 'lucide-react';

export default function TrustBuilders() {
    const features = [
        {
            icon: <Scissors className="w-6 h-6 text-[#98c1c2]" />,
            title: "CUSTOM SIZES & SHAPES",
            subtitle: "Made to order"
        },
        {
            icon: <Truck className="w-6 h-6 text-[#98c1c2]" />,
            title: "FREE SA DELIVERY",
            subtitle: "Nationwide shipping"
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-[#98c1c2]" />,
            title: "5–10 YEAR WARRANTY",
            subtitle: "Guaranteed quality"
        },
        {
            icon: <Star className="w-6 h-6 text-[#98c1c2]" />,
            title: "TRUSTED BY 10,000+",
            subtitle: "Happy customers"
        },
        {
            icon: <MessageCircle className="w-6 h-6 text-[#98c1c2]" />,
            title: "INSTANT SUPPORT",
            subtitle: "Chat on WhatsApp"
        }
    ];

    return (
        <section className="bg-[#f8f9fa] py-12 border-b border-gray-100">
            <div className="container-custom">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center group cursor-pointer"
                        >
                            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 border border-gray-50 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="font-black text-[#1a2b4b] text-[10px] md:text-[11px] uppercase tracking-wider mb-1">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 text-[10px] md:text-xs">
                                {feature.subtitle}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
