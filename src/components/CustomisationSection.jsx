import React from 'react';

export default function CustomisationSection({ onNavigate, onOpenCustomBed }) {
    return (
        <div 
            className="relative min-h-[500px] bg-cover bg-center py-20 px-6 text-white flex items-center justify-center"
            style={{ backgroundImage: `linear-gradient(rgba(10, 21, 48, 0.75), rgba(10, 21, 48, 0.75)), url('/assets/ideal-bases-bg.png')` }}
        >
            <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-1 text-center lg:text-left space-y-6">
                    <div className="w-12 h-[2px] bg-[#97BFBF] mx-auto lg:mx-0"></div>
                    <h3 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wide">
                        Custom Designed Mattresses
                    </h3>
                    <p className="text-white/80 text-lg font-light mb-4">
                        Choose feel, size, colour and accessories to match your lifestyle.
                    </p>
                    <button 
                        onClick={() => onOpenCustomBed ? onOpenCustomBed() : (onNavigate && onNavigate('contact'))}
                        className="inline-block bg-[#97BFBF] hover:bg-[#7fa8a8] text-navy font-bold uppercase tracking-wider text-[10px] px-6 py-3.5 transition-colors duration-300 w-full shadow-md"
                    >
                        BUILD A CUSTOM BED / GET DESIGN QUOTE
                    </button>
                </div>

                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 text-navy">
                    {/* Step 1: Choose Feel */}
                    <div className="bg-white p-4 lg:p-6 flex flex-col items-center justify-between min-h-[260px] text-center shadow-lg relative pt-8 rounded-sm">
                        <div className="absolute -top-4 w-8 h-8 rounded-full bg-[#0a1530] text-white flex items-center justify-center font-bold text-xs border-2 border-white">
                            1
                        </div>
                        <h4 className="font-bold text-[10px] lg:text-xs uppercase tracking-widest text-[#0a1530] mb-3">CHOOSE YOUR FEEL</h4>
                        <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden mb-3 border border-gray-100 mx-auto">
                            <img src="/assets/comfort-medium.png" alt="Feel" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[10px] lg:text-[11px] text-gray-500 font-semibold leading-relaxed">Select from plush, medium or firm comfort levels.</span>
                    </div>

                    {/* Step 2: Choose Size */}
                    <div className="bg-white p-4 lg:p-6 flex flex-col items-center justify-between min-h-[260px] text-center shadow-lg relative pt-8 rounded-sm">
                        <div className="absolute -top-4 w-8 h-8 rounded-full bg-[#0a1530] text-white flex items-center justify-center font-bold text-xs border-2 border-white">
                            2
                        </div>
                        <h4 className="font-bold text-[10px] lg:text-xs uppercase tracking-widest text-[#0a1530] mb-3">CHOOSE YOUR SIZE</h4>
                        <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden mb-3 border border-gray-100 mx-auto">
                            <img src="/assets/detail-bed-slats.png" alt="Size" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[10px] lg:text-[11px] text-gray-500 font-semibold leading-relaxed">Tailor your mattress fit from Single to King.</span>
                    </div>

                    {/* Step 3: Choose Colour */}
                    <div className="bg-white p-4 lg:p-6 flex flex-col items-center justify-between min-h-[260px] text-center shadow-lg relative pt-8 rounded-sm">
                        <div className="absolute -top-4 w-8 h-8 rounded-full bg-[#0a1530] text-white flex items-center justify-center font-bold text-xs border-2 border-white">
                            3
                        </div>
                        <h4 className="font-bold text-[10px] lg:text-xs uppercase tracking-widest text-[#0a1530] mb-3">CHOOSE COLOUR</h4>
                        <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden mb-3 border border-gray-100 mx-auto">
                            <img src="/assets/comfort-soft.png" alt="Colour" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[10px] lg:text-[11px] text-gray-500 font-semibold leading-relaxed">Match your base design and neutral shades.</span>
                    </div>

                    {/* Step 4: Choose Accessories */}
                    <div className="bg-white p-4 lg:p-6 flex flex-col items-center justify-between min-h-[260px] text-center shadow-lg relative pt-8 rounded-sm">
                        <div className="absolute -top-4 w-8 h-8 rounded-full bg-[#0a1530] text-white flex items-center justify-center font-bold text-xs border-2 border-white">
                            4
                        </div>
                        <h4 className="font-bold text-[10px] lg:text-xs uppercase tracking-widest text-[#0a1530] mb-3">ADD ACCESSORIES</h4>
                        <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden mb-3 border border-gray-100 mx-auto">
                            <img src="/assets/trial-bg.png" alt="Accessories" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[10px] lg:text-[11px] text-gray-500 font-semibold leading-relaxed">Complete your sleep system with pillows and protectors.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
