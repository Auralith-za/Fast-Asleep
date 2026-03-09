import React from 'react';
import { ShoppingCart, Scissors, Truck, ShieldCheck, MessageCircle, Star } from 'lucide-react'; // Using Lucide icons as placeholders

export default function TrustBuilders() {
    const features = [
        {
            icon: <Scissors className="w-8 h-8 text-gold" />,
            title: "Custom Sizes & Shapes",
            description: "Made to order"
        },
        {
            icon: <Truck className="w-8 h-8 text-gold" />,
            title: "Free SA Delivery",
            description: "Nationwide shipping"
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-gold" />,
            title: "5–10 Year Warranty",
            description: "Guaranteed quality"
        },
        {
            icon: <Star className="w-8 h-8 text-gold" />,
            title: "Trusted by 10,000+",
            description: "Happy customers"
        },
        {
            icon: <MessageCircle className="w-8 h-8 text-gold" />,
            title: "Instant Support",
            description: "Chat on WhatsApp"
        }
    ];

    return (
        <section className="bg-gray-50 border-b border-gray-100 py-8">
            <div className="container-custom">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className="mb-3 p-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
                                {feature.icon}
                            </div>
                            <h3 className="font-bold text-navy text-sm uppercase tracking-wide mb-1">
                                {feature.title}
                            </h3>
                            <p className="text-xs text-gray-500 font-medium">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
