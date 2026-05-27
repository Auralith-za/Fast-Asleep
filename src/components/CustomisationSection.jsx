import React from 'react';

export default function CustomisationSection() {
    const steps = [
        {
            image: "/assets/ideal-bases-bg.png",
            title: "1. Choose a Bed Base",
            desc: "Storage or standard"
        },
        {
            image: "/assets/detail-bed-slats.png",
            title: "2. Choose Your Size",
            desc: "Match your mattress size"
        },
        {
            image: "/assets/comfort-medium.png",
            title: "3. Choose Colour",
            desc: "Select your fabric color"
        },
        {
            image: "/assets/trial-bg.png",
            title: "4. We Craft It",
            desc: "Delivered to perfection"
        }
    ];

    return (
        <section className="py-24 bg-[#0a1530] text-white relative overflow-hidden">
            <div className="container-custom relative z-10 text-center">
                
                {/* Header Section */}
                <div className="mb-16 flex flex-col items-center">
                    {/* Highlighted Heading Block */}
                    <div className="relative inline-block px-8 py-4 bg-[#1a2b4b]/60 border border-white/10 backdrop-blur-sm mb-4">
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide uppercase leading-tight">
                            Can't Find The Perfect Fit? We'll Make It.
                        </h2>
                    </div>
                    
                    <p className="text-xl text-[#97BFBF] font-script font-normal lowercase tracking-wider">
                        custom comfort in 4 easy steps
                    </p>
                </div>

                {/* Steps Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative max-w-6xl mx-auto">
                    {/* Horizontal connecting line for desktop */}
                    <div className="hidden md:block absolute top-[72px] left-[12%] right-[12%] h-[1px] bg-white/15 z-0"></div>
                    
                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 flex flex-col items-center">
                            {/* Circular Image Container with light outline */}
                            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-[#0a1530] border border-white/20 flex items-center justify-center mb-6 shadow-xl relative hover:border-[#97BFBF] transition-all duration-300 overflow-hidden">
                                <img 
                                    src={step.image} 
                                    alt={step.title}
                                    className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                            
                            <h3 className="text-lg font-bold uppercase tracking-wider mb-2 text-white/95">
                                {step.title}
                            </h3>
                            
                            <p className="text-white/60 text-xs md:text-[13px] leading-relaxed max-w-[200px]">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
