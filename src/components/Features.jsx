import React from 'react';
import { Cloud, Activity, Wind, CheckCircle } from 'lucide-react';
import { features } from '../data/products';

const iconMap = {
    Cloud: Cloud,
    Activity: Activity,
    Wind: Wind,
    CheckCircle: CheckCircle
};

export default function Features() {
    return (
        <section className="bg-lightGrey py-24">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {features.map((feature, index) => {
                        const IconComponent = iconMap[feature.icon];
                        return (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm text-gold">
                                    {IconComponent && <IconComponent className="w-8 h-8" strokeWidth={1.5} />}
                                </div>
                                <h3 className="text-lg font-bold text-navy uppercase mb-3 tracking-wide">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
