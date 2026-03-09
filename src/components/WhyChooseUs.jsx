import React from 'react';
import { BadgeCheck, Heart, MapPin, Scissors } from 'lucide-react';

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
            <div className="container-custom text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Why South Africa Chooses Fast Asleep</h2>
                <div className="w-20 h-1 bg-gold mx-auto mb-16"></div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-7 h-7 text-navy" />
                        </div>
                        <h3 className="text-lg font-bold text-navy mb-3">Locally Manufactured</h3>
                        <p className="text-gray-600 text-sm">Proudly South African. Factory direct to your door means better prices.</p>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Scissors className="w-7 h-7 text-navy" />
                        </div>
                        <h3 className="text-lg font-bold text-navy mb-3">Fully Customisable</h3>
                        <p className="text-gray-600 text-sm">If you can dream it, we can cut it. Any size, any shape, any density.</p>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BadgeCheck className="w-7 h-7 text-navy" />
                        </div>
                        <h3 className="text-lg font-bold text-navy mb-3">Trusted Nationwide</h3>
                        <p className="text-gray-600 text-sm">Over 10,000 happy sleepers across the country.</p>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-7 h-7 text-navy" />
                        </div>
                        <h3 className="text-lg font-bold text-navy mb-3">Sleep Healthy</h3>
                        <p className="text-gray-600 text-sm">Hypoallergenic materials ideal for medical and home use.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
