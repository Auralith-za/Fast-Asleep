import React from 'react';

export default function Hero({ onNavigate }) {
    return (
        <div className="relative bg-gray-50">
            <div className="relative h-[450px] md:h-[600px] flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/family_bed_hero.png"
                        alt="Happy family in bed"
                        className="w-full h-full object-cover object-[center_40%] md:object-[center_45%]"
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                {/* Content */}
                <div className="container-custom relative z-10 flex flex-col items-center justify-center h-full text-center w-full">
                    <div className="w-full animate-fade-in-up text-white px-2 flex flex-col items-center">
                        <p className="text-[10px] md:text-lg uppercase tracking-[0.2em] md:tracking-[0.4em] font-black text-[#cca86e] mb-3 md:mb-4 drop-shadow-md whitespace-nowrap">
                            WELCOME TO FAST ASLEEP
                        </p>
                        
                        <h1 className="font-light leading-[1] mb-3 md:mb-5 flex justify-center w-full drop-shadow-lg px-2">
                            <span className="font-script font-normal lowercase text-white text-[34px] sm:text-4xl md:text-6xl lg:text-7xl block mb-2 leading-tight">
                                wake up to a better version of you.
                            </span>
                        </h1>

                        <p className="text-sm md:text-lg text-white/95 mb-6 md:mb-10 font-medium max-w-xl mx-auto tracking-wide drop-shadow-md">
                            Because when you sleep better, everything in your world feels better.
                        </p>
                        
                        <div className="flex justify-center">
                            <button 
                                onClick={() => onNavigate && onNavigate('beds-and-bases')}
                                className="border-2 border-white bg-transparent hover:bg-white text-white hover:text-navy font-bold py-3 px-8 md:py-4 md:px-10 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-none shadow-sm"
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
