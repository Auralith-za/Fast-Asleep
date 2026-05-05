import React from 'react';
import { BadgeCheck, Heart, MapPin, Scissors } from 'lucide-react';

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-white border-b border-gray-100">
            <div className="container-custom text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">WHERE WE LEAD THE WAY</h2>
                <p className="text-gray-500 mb-12">WHY THOUSANDS TRUST FAST ASLEEP</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
                    {["Precision Crafted Locally", "Premium Materials", "Built to last", "Personalised Support", "No middle man", "Service beyond sale"].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-6 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="min-w-[24px] h-6 flex items-center justify-center bg-navy text-white rounded-full">
                                ✓
                            </div>
                            <span className="font-bold text-navy text-lg">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
