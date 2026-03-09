import React, { useState } from 'react';
import { MapPin, ShieldCheck, Activity, UserX, Truck, Star, Plus, Minus } from 'lucide-react';

export default function ValuesSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleIndex = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const features = [
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "100% South African",
            description: "Locally manufactured in SA using premium materials."
        },
        {
            icon: <ShieldCheck className="w-6 h-6" />,
            title: "Built to Last",
            description: "Engineered with high-density foam and premium materials to ensure durability for years to come."
        },
        {
            icon: <Activity className="w-6 h-6" />,
            title: "Spinal Care",
            description: "Designed to support optimal spinal alignment for a healthy sleep."
        },
        {
            icon: <UserX className="w-6 h-6" />,
            title: "No Middle Man",
            description: "Factory direct prices, cutting out retail markups."
        },
        {
            icon: <Truck className="w-6 h-6" />,
            title: "Free Delivery",
            description: "We deliver nationwide at no extra cost to you."
        },
        {
            icon: <Star className="w-6 h-6" />,
            title: "Excellent Service",
            description: "Rated 4.8/5 by over 10,000 happy sleepers."
        }
    ];

    return (
        <section className="bg-navy py-16 text-white">
            <div className="container-custom">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 uppercase tracking-widest">
                    What Sets Us Apart
                </h2>
                <div className="w-16 h-0.5 bg-gold mx-auto mb-16"></div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-start">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            {/* Icon Circle */}
                            <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center mb-6 transition-all duration-300 group-hover:border-gold group-hover:text-gold">
                                {feature.icon}
                            </div>

                            {/* Title */}
                            <h3 className="font-bold text-xs md:text-sm uppercase tracking-wider mb-4 h-8 flex items-center justify-center">
                                {feature.title}
                            </h3>

                            {/* Toggle Button */}
                            <button
                                onClick={() => toggleIndex(index)}
                                className={`w-6 h-6 rounded-full border border-white/40 flex items-center justify-center text-xs transition-colors hover:border-gold hover:text-gold mb-4 focus:outline-none 
                                ${openIndex === index ? 'bg-transparent text-gold border-gold' : ''}`}
                            >
                                {openIndex === index ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                            </button>

                            {/* Expandable Content */}
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <p className="text-[10px] md:text-xs text-gray-300 leading-relaxed max-w-[150px] mx-auto">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
