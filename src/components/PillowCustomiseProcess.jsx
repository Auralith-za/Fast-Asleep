import React from 'react';

/**
 * Custom SVG Icons matching the artwork in media_1787896997343.png
 */

// Step 1: Unzip Icon
function UnzipIcon({ className = "w-7 h-7 text-white" }) {
    return (
        <svg viewBox="0 0 64 64" fill="none" className={className} stroke="currentColor" strokeWidth="2">
            {/* Pillow outline */}
            <path d="M12 24 C12 18, 52 18, 52 24 C54 32, 54 32, 52 40 C52 46, 12 46, 12 40 C10 32, 10 32, 12 24 Z" stroke="#ffffff" strokeWidth="2.5" fill="none" />
            {/* Zipper teeth / seam across middle */}
            <path d="M14 32 H50" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 2" />
            {/* Zipper pull tab */}
            <rect x="28" y="28" width="8" height="8" rx="2" fill="#ffffff" />
            <circle cx="32" cy="38" r="2.5" stroke="#ffffff" strokeWidth="2" fill="none" />
            {/* Small chip dots inside */}
            <circle cx="20" cy="28" r="1.5" fill="#97BFBF" />
            <circle cx="25" cy="36" r="1.5" fill="#97BFBF" />
            <circle cx="42" cy="27" r="1.5" fill="#97BFBF" />
        </svg>
    );
}

// Step 2: Too Thick Icon (Arrows pointing away)
function TooThickIcon({ className = "w-7 h-7 text-white" }) {
    return (
        <svg viewBox="0 0 64 64" fill="none" className={className} stroke="currentColor" strokeWidth="2">
            {/* Pillow outline */}
            <path d="M14 26 C14 20, 50 20, 50 26 C52 32, 52 32, 50 38 C50 44, 14 44, 14 38 C12 32, 12 32, 14 26 Z" stroke="#ffffff" strokeWidth="2.5" fill="none" />
            {/* Chips inside */}
            <circle cx="24" cy="30" r="1.5" fill="#ffffff" />
            <circle cx="32" cy="32" r="1.5" fill="#ffffff" />
            <circle cx="40" cy="30" r="1.5" fill="#ffffff" />
            <circle cx="28" cy="35" r="1.5" fill="#ffffff" />
            {/* Arrow UP */}
            <path d="M32 18 V10 M28 14 L32 10 L36 14" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Arrow DOWN */}
            <path d="M32 46 V54 M28 50 L32 54 L36 50" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// Step 3: Too Thin Icon (Arrows pointing inward)
function TooThinIcon({ className = "w-7 h-7 text-white" }) {
    return (
        <svg viewBox="0 0 64 64" fill="none" className={className} stroke="currentColor" strokeWidth="2">
            {/* Flatter pillow outline */}
            <path d="M14 28 C14 24, 50 24, 50 28 C52 32, 52 32, 50 36 C50 40, 14 40, 14 36 C12 32, 12 32, 14 28 Z" stroke="#ffffff" strokeWidth="2.5" fill="none" />
            {/* Chips inside */}
            <circle cx="26" cy="32" r="1.5" fill="#ffffff" />
            <circle cx="38" cy="32" r="1.5" fill="#ffffff" />
            {/* Arrow DOWN pointing into pillow top */}
            <path d="M32 10 V18 M28 14 L32 18 L36 14" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Arrow UP pointing into pillow bottom */}
            <path d="M32 54 V46 M28 50 L32 46 L36 50" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// Step 4: Get Cozy Icon (Z z z symbols)
function GetCozyIcon({ className = "w-7 h-7 text-white" }) {
    return (
        <svg viewBox="0 0 64 64" fill="none" className={className} stroke="currentColor" strokeWidth="2">
            {/* Plump Pillow outline */}
            <path d="M12 26 C12 18, 52 18, 52 26 C54 32, 54 32, 52 40 C52 48, 12 48, 12 40 C10 32, 10 32, 12 26 Z" stroke="#ffffff" strokeWidth="2.5" fill="none" />
            {/* Z Z Z float text */}
            <path d="M22 14 H28 L22 20 H28" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M32 10 H36 L32 14 H36" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M40 7 H43 L40 10 H43" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function PillowCustomiseProcess({ productName = "Your Pillow", customImage }) {
    const displayImage = customImage || "/assets/memory-chip-customise.png";

    return (
        <section className="my-16 w-full bg-white py-12 px-4 md:px-8 border-t border-b border-gray-150">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-[#0a1530] mb-2">
                        CUSTOMISE THE THICKNESS OF YOUR PILLOW
                    </h3>
                    <div className="w-16 h-[2px] bg-[#97BFBF] mx-auto mb-4"></div>
                    <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
                        Easily adjust the memory foam chip filling of {productName} to achieve your ideal height, firmness, and spinal posture.
                    </p>
                </div>

                {/* 2-Column Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    
                    {/* Left: 4 Step Process */}
                    <div className="lg:col-span-6 space-y-8">
                        
                        {/* Step 1 */}
                        <div className="flex gap-5 items-start">
                            <div className="w-14 h-14 rounded-full bg-[#0a1530] flex-shrink-0 flex items-center justify-center shadow-md border border-[#0a1530]">
                                <UnzipIcon />
                            </div>
                            <div className="pt-1">
                                <h4 className="text-base font-extrabold text-[#0a1530] uppercase tracking-wider mb-1">
                                    1. UNZIP
                                </h4>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light">
                                    Open both the outer and inner zip covers of your pillow to access the memory foam chips.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-5 items-start">
                            <div className="w-14 h-14 rounded-full bg-[#0a1530] flex-shrink-0 flex items-center justify-center shadow-md border border-[#0a1530]">
                                <TooThickIcon />
                            </div>
                            <div className="pt-1">
                                <h4 className="text-base font-extrabold text-[#0a1530] uppercase tracking-wider mb-1">
                                    2. TOO THICK?
                                </h4>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light">
                                    Remove some of the memory foam chips into your storage bag until you reach your desired pillow thickness and loft.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-5 items-start">
                            <div className="w-14 h-14 rounded-full bg-[#0a1530] flex-shrink-0 flex items-center justify-center shadow-md border border-[#0a1530]">
                                <TooThinIcon />
                            </div>
                            <div className="pt-1">
                                <h4 className="text-base font-extrabold text-[#0a1530] uppercase tracking-wider mb-1">
                                    3. TOO THIN?
                                </h4>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light">
                                    Top up your pillow by adding saved memory foam chips or ordering additional filling refills from the Accessories tab.
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex gap-5 items-start">
                            <div className="w-14 h-14 rounded-full bg-[#0a1530] flex-shrink-0 flex items-center justify-center shadow-md border border-[#0a1530]">
                                <GetCozyIcon />
                            </div>
                            <div className="pt-1">
                                <h4 className="text-base font-extrabold text-[#0a1530] uppercase tracking-wider mb-1">
                                    4. GET COZY
                                </h4>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light">
                                    Zip up both covers securely, fluff up your pillow, and enjoy your most comfortable custom night of sleep.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Right: High-Res Photo Asset */}
                    <div className="lg:col-span-6">
                        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gray-50 group">
                            <img
                                src={displayImage}
                                alt="Unzipping pillow to customize memory foam chip thickness"
                                className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-500"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1000';
                                }}
                            />
                            {/* Subtle Overlay Badge */}
                            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 border border-gray-200 shadow-sm rounded-lg">
                                <span className="text-xs font-bold text-[#0a1530] uppercase tracking-wider block">
                                    100% ADJUSTABLE FILLING
                                </span>
                                <span className="text-[10px] text-gray-500">
                                    Shredded Memory Foam & Fiber Chips
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
