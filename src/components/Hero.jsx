import React from 'react';
import { ArrowRight, Scissors } from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative bg-gray-50">

            {/* Running Special Banner */}
            <div className="bg-navy text-white text-center py-2 px-4 text-sm font-medium tracking-wide">
                Spring Special: <span className="text-gold font-bold">10% OFF</span> All Kids’ Mattresses – Limited Time!
            </div>

            <div className="relative h-[600px] md:h-[700px] flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://cloudsplash.co.za/wp/wp-content/uploads/2026/02/Screenshot-2026-02-17-at-21.10.25.png" // Placeholder: Family/Bedroom vibe
                        alt="Family sleeping comfortably"
                        className="w-full h-full object-cover opacity-90"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="container-custom relative z-10 flex flex-col items-center justify-center text-center h-full">
                    <div className="max-w-4xl animate-fade-in-up">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-navy leading-tight mb-2">
                            South African sleep specialists
                        </h1>

                        <p className="font-script text-4xl md:text-6xl text-navy mb-12">
                            Designed for all types of sleepers
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button className="bg-navy text-white py-4 px-10 text-sm font-bold uppercase tracking-widest hover:bg-navy-dark transition-all flex items-center justify-center gap-2 shadow-lg">
                                Shop Mattress <ArrowRight className="w-4 h-4" />
                            </button>
                            <button className="bg-white border-2 border-navy text-navy font-bold py-4 px-10 uppercase tracking-widest text-sm hover:bg-gray-50 transition-all flex items-center justify-center">
                                How It Works
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
