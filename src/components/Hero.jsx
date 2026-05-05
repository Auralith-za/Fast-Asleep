import React from 'react';
import { ArrowRight, Scissors } from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative bg-gray-50">

            {/* Running Special Banner */}
            <div className="bg-navy text-white text-center py-2 px-4 text-sm font-medium tracking-wide">
                Mother's Day Special: <span className="text-gold font-bold">Up to 20% OFF</span> Base Sets & Ultimate Combos – Limited Time!
            </div>

            <div className="relative h-[650px] md:h-[800px] flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/hero-family.png"
                        alt="Family laughing on a comfortable bed"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay gradient - more subtle to keep image visible */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="container-custom relative z-10 flex flex-col items-start justify-center h-full text-left">
                    <div className="max-w-3xl animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#1a2b4b] leading-[0.9] mb-8">
                            Wake Up To A <br />
                            <span className="font-script font-normal lowercase text-[#98c1c2] text-6xl md:text-8xl lg:text-9xl block mt-2">Better Version</span> 
                            Of You.
                        </h1>

                        <p className="text-xl md:text-2xl text-[#1a2b4b] mb-12 font-medium max-w-xl">
                            Because when you <span className="font-script text-[#98c1c2] text-3xl lowercase">sleep better</span>, everything in your world feels better.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-[#1a2b4b] text-white py-5 px-10 text-xs font-black uppercase tracking-[0.2em] hover:bg-[#98c1c2] transition-all shadow-2xl rounded-sm">
                                Find Your Perfect Mattress
                            </button>
                            <button className="bg-white/80 backdrop-blur-md border-2 border-[#1a2b4b] text-[#1a2b4b] font-black py-5 px-10 uppercase tracking-[0.2em] text-xs hover:bg-[#1a2b4b] hover:text-white transition-all rounded-sm">
                                Explore Sleep Solutions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
