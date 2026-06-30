import React from 'react';
import { Truck, MapPinned, Layers, Factory, ShieldCheck, ChevronDown, Check, Star, Moon } from 'lucide-react';

export default function TrustBuilders() {
    const features = [
        {
            icon: (
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] group-hover:border-[#cca86e] transition-colors duration-500">
                    <div className="absolute inset-2 border border-gray-100 rounded-full"></div>
                    <MapPinned className="w-10 h-10 md:w-14 md:h-14 text-navy relative z-10" strokeWidth={1} />
                    <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#cca86e] flex items-center justify-center border-4 border-white shadow-sm">
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={3} />
                    </div>
                </div>
            ),
            title: "Made In South Africa",
            subtitle: "Locally manufactured"
        },
        {
            icon: (
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] group-hover:border-[#cca86e] transition-colors duration-500">
                    <div className="absolute inset-2 border border-gray-100 rounded-full"></div>
                    <Layers className="w-10 h-10 md:w-14 md:h-14 text-navy relative z-10" strokeWidth={1} />
                    <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#cca86e] flex items-center justify-center border-4 border-white shadow-sm">
                        <Star className="w-4 h-4 md:w-4 md:h-4 text-white fill-white" strokeWidth={2} />
                    </div>
                </div>
            ),
            title: "Fully Customisable",
            subtitle: "Tailor your comfort layer"
        },
        {
            icon: (
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] group-hover:border-[#cca86e] transition-colors duration-500">
                    <div className="absolute inset-2 border border-gray-100 rounded-full"></div>
                    <Factory className="w-10 h-10 md:w-14 md:h-14 text-navy relative z-10" strokeWidth={1} />
                    <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#cca86e] flex items-center justify-center border-4 border-white shadow-sm">
                        <span className="text-white font-extrabold text-[10px] md:text-xs">R</span>
                    </div>
                </div>
            ),
            title: "Factory Direct Pricing",
            subtitle: "Direct from our factory"
        },
        {
            icon: (
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] group-hover:border-[#cca86e] transition-colors duration-500">
                    <div className="absolute inset-2 border border-gray-100 rounded-full"></div>
                    <Truck className="w-10 h-10 md:w-14 md:h-14 text-navy relative z-10" strokeWidth={1} />
                    <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#cca86e] flex items-center justify-center border-4 border-white shadow-sm">
                        <span className="text-white font-black text-xs md:text-sm">24</span>
                    </div>
                </div>
            ),
            title: "Fast Nationwide Delivery",
            subtitle: "Delivered to your door"
        },
        {
            icon: (
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] group-hover:border-[#cca86e] transition-colors duration-500">
                    <div className="absolute inset-2 border border-gray-100 rounded-full"></div>
                    <ShieldCheck className="w-10 h-10 md:w-14 md:h-14 text-navy relative z-10" strokeWidth={1} />
                    <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#cca86e] flex items-center justify-center border-4 border-white shadow-sm">
                        <span className="text-white font-black text-[9px] md:text-[10px] leading-tight text-center">20+<br/>YRS</span>
                    </div>
                </div>
            ),
            title: "Trusted For Over 20 Years",
            subtitle: "Decades of experience"
        },
        {
            icon: (
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] group-hover:border-[#cca86e] transition-colors duration-500">
                    <div className="absolute inset-2 border border-gray-100 rounded-full"></div>
                    <Moon className="w-10 h-10 md:w-14 md:h-14 text-navy relative z-10" strokeWidth={1} />
                    <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#cca86e] flex items-center justify-center border-4 border-white shadow-sm">
                        <span className="text-white font-black text-[9px] md:text-[10px] leading-tight text-center">100</span>
                    </div>
                </div>
            ),
            title: "100-Night Trial",
            subtitle: "Risk-free sleep"
        }
    ];

    return (
        <section className="bg-[#faf8f4] py-20 border-b border-gray-200">
            <div className="container-custom">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-16 sm:gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center group cursor-pointer"
                        >
                            <div className="mb-6 md:mb-8 transition-transform duration-500 group-hover:-translate-y-2">
                                {feature.icon}
                            </div>
                            <h3 className="font-extrabold text-navy text-sm md:text-base mb-2 max-w-[200px] leading-snug">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 text-xs md:text-sm">
                                {feature.subtitle}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
