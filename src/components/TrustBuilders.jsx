import React from 'react';
import { Truck, MapPin, Sliders, Tag, Award, ChevronDown } from 'lucide-react';

export default function TrustBuilders() {
    const features = [
        {
            icon: <MapPin className="w-8 h-8 md:w-10 md:h-10 text-navy" strokeWidth={1} />,
            title: "Made in South Africa",
            subtitle: "Locally manufactured"
        },
        {
            icon: <Sliders className="w-8 h-8 md:w-10 md:h-10 text-navy" strokeWidth={1} />,
            title: "Fully Customisable",
            subtitle: "Tailor your comfort layer"
        },
        {
            icon: <Tag className="w-8 h-8 md:w-10 md:h-10 text-navy" strokeWidth={1} />,
            title: "Factory Direct Pricing",
            subtitle: "Direct from our factory"
        },
        {
            icon: <Truck className="w-8 h-8 md:w-10 md:h-10 text-navy" strokeWidth={1} />,
            title: "Fast Nationwide Delivery",
            subtitle: "Delivered to your door"
        },
        {
            icon: <Award className="w-8 h-8 md:w-10 md:h-10 text-navy" strokeWidth={1} />,
            title: "Trusted For Over 20 Years",
            subtitle: "Decades of experience"
        }
    ];

    return (
        <section className="bg-white py-14 border-b border-gray-150">
            <div className="container-custom">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center group cursor-pointer"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-lightGrey flex items-center justify-center mb-4 md:mb-5 border border-gray-200/50 group-hover:scale-105 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="font-extrabold text-navy text-[13px] md:text-[15px] uppercase tracking-wide mb-2 max-w-[220px] leading-snug">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 text-[10px] md:text-xs mb-3 hidden sm:block">
                                {feature.subtitle}
                            </p>
                            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-navy transition-colors mt-auto" strokeWidth={1} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
