import React, { useState, useEffect } from 'react';

export default function Promotions({ onProductClick }) {
    const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 35, seconds: 12 });

    useEffect(() => {
        const timer = setInterval(() => {
            // Simple countdown simulation logic
            setTimeLeft(prev => {
                let { days, hours, minutes, seconds } = prev;
                if (seconds > 0) seconds--;
                else {
                    seconds = 59;
                    if (minutes > 0) minutes--;
                    else {
                        minutes = 59;
                        if (hours > 0) hours--;
                        else {
                            hours = 23;
                            if (days > 0) days--;
                        }
                    }
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="bg-gold py-12 text-navy overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="container-custom relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left: Offer Text */}
                <div className="text-center md:text-left">
                    <span className="inline-block py-1 px-3 bg-white text-navy font-bold text-xs uppercase tracking-widest rounded mb-4 shadow-sm">Limited Time Offer</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-navy">
                        Buy 1 Kids Mattress, <br />
                        <span className="text-white drop-shadow-sm">Get a Pillow FREE!</span>
                    </h2>
                    <p className="text-navy/80 text-lg mb-8 font-medium">
                        Upgrade your little one's sleep and get a complimentary memory foam pillow on us.
                    </p>
                    <button 
                        onClick={() => onProductClick("4687")}
                        className="bg-navy text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-navy-dark transition-colors shadow-lg"
                    >
                        Claim Offer
                    </button>
                </div>

                {/* Right: Countdown & Visual */}
                <div className="flex flex-col items-center">
                    <div className="grid grid-cols-4 gap-4 text-center mb-8">
                        {Object.entries(timeLeft).map(([unit, value]) => (
                            <div key={unit} className="flex flex-col">
                                <div className="bg-navy/10 backdrop-blur-sm rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border border-navy/10 shadow-inner">
                                    <span className="text-2xl md:text-3xl font-bold text-navy">{value.toString().padStart(2, '0')}</span>
                                </div>
                                <span className="text-xs uppercase tracking-widest mt-2 text-navy/70 font-semibold">{unit}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm font-bold text-navy/60 uppercase tracking-widest">
                        Offer ends soon
                    </p>
                </div>
            </div>
        </section>
    );
}
