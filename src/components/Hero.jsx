import React from 'react';

export default function Hero({ onNavigate }) {
    return (
        <div className="relative bg-gray-50">
            <div className="relative h-[450px] md:h-[580px] flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/family_bed_hero.png"
                        alt="Happy family laughing in a comfortable bed"
                        className="w-full h-full object-cover object-[center_10%] md:object-[center_20%]"
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>

                {/* Content */}
                <div className="container-custom relative z-10 flex flex-col items-center justify-center h-full text-center w-full">
                    <div className="max-w-3xl animate-fade-in-up text-white">
                        <p className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-white/90 mb-4">
                            WELCOME TO FAST ASLEEP
                        </p>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.2] mb-6">
                            <span className="font-script font-normal lowercase text-white text-[2.2rem] sm:text-5xl md:text-7xl lg:text-[6rem] xl:text-[7rem] block mb-2 whitespace-nowrap">wake up to a better version of you.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/95 mb-10 font-medium max-w-xl mx-auto tracking-wide">
                            Because when you sleep better, everything in your world feels better.
                        </p>
                        
                        <div className="flex justify-center">
                            <button 
                                onClick={() => onNavigate && onNavigate('beds-and-bases')}
                                className="bg-[#97BFBF] hover:bg-[#7fa8a8] text-navy font-bold py-4 px-8 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-none"
                            >
                                Shop The Range
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
