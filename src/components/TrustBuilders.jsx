import React from 'react';
import { Truck, ShieldCheck, ChevronDown, RefreshCw, Award } from 'lucide-react';

export default function TrustBuilders() {
    const features = [
        {
            icon: <RefreshCw className="w-10 h-10 text-navy" />,
            title: "South Africa's First & Only Modular Mattress",
            subtitle: "Tailor your comfort layer"
        },
        {
            icon: <Truck className="w-10 h-10 text-navy" />,
            title: "Free & Fast Delivery",
            subtitle: "Delivered straight to your door"
        },
        {
            icon: <ShieldCheck className="w-10 h-10 text-navy" />,
            title: "100-Night Risk-Free Trial",
            subtitle: "Try it in your own bedroom"
        },
        {
            icon: <Award className="w-10 h-10 text-navy" />,
            title: "25-Year Service Warranty",
            subtitle: "Built to support you for decades"
        }
    ];

    return (
        <section className="bg-white py-14 border-b border-gray-150">
            <div className="container-custom">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center group cursor-pointer"
                        >
                            <div className="w-20 h-20 rounded-full bg-lightGrey flex items-center justify-center mb-5 border border-gray-200/50 group-hover:scale-105 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="font-extrabold text-navy text-[15px] uppercase tracking-wide mb-2 max-w-[220px] leading-snug">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 text-xs mb-3">
                                {feature.subtitle}
                            </p>
                            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-navy transition-colors" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
