import React from 'react';
import { MousePointerClick, Maximize, Scissors, Moon } from 'lucide-react';

export default function CustomisationSection() {
    const steps = [
        {
            icon: <MousePointerClick className="w-8 h-8 text-gold" />,
            title: "1. Pick It",
            desc: "Start with what you need."
        },
        {
            icon: <Maximize className="w-8 h-8 text-gold" />,
            title: "2. Size It",
            desc: "Exact size, exact shape."
        },
        {
            icon: <Scissors className="w-8 h-8 text-gold" />,
            title: "3. Shape It",
            desc: "Your feel. Your support."
        },
        {
            icon: <Moon className="w-8 h-8 text-gold" />,
            title: "4. Sleep On It",
            desc: "Crafted. Delivered. Perfect."
        }
    ];

    return (
        <section className="py-24 bg-navy text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=1200')] opacity-10 object-cover bg-center mix-blend-overlay"></div>
            
            <div className="container-custom relative z-10 text-center">
                <div className="mb-16">
                    <span className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                        💎 Your Powerful Differentiator
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Can't Find The Perfect Fit? We'll Make It.</h2>
                    <p className="text-xl text-gray-300 font-script mb-8">custom comfort in 4 easy steps</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative">
                    {/* Connection line for desktop */}
                    <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-white/20 -translate-y-1/2 z-0"></div>
                    
                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-navy border border-white/20 flex items-center justify-center mb-6 shadow-xl relative">
                                <div className="absolute inset-0 rounded-full bg-gold opacity-0 hover:opacity-20 transition-opacity"></div>
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                            <p className="text-gray-400 text-sm max-w-[200px]">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
