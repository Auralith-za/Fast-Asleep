import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Reviews() {
    const [activeIndex, setActiveIndex] = useState(0);

    const reviews = [
        {
            id: 1,
            author: "MITRA R",
            date: "09 NOV 2025",
            rating: 5,
            text: "This mattress is life changing! I can't believe I haven't been sleeping on a Fast Asleep all this time! It is unbelievably great quality, they live up to every hype!"
        },
        {
            id: 2,
            author: "GUMZA S",
            date: "29 DEC 2025",
            rating: 5,
            text: "Me and my partner fell in love with the mattress on the very first day, the soft setting is amazing and gives unmatched support."
        },
        {
            id: 3,
            author: "ZELDA M",
            date: "24 NOV 2025",
            rating: 5,
            text: "Best mattress ever... All my beds are now Fast Asleep 😊😊 thank you sooo much for the incredible customer service!"
        },
        {
            id: 4,
            author: "BRADLEY F",
            date: "12 JAN 2026",
            rating: 5,
            text: "Excellence all around. From customer service to the quality of the mattress, you guys have set a new benchmark."
        },
        {
            id: 5,
            author: "TARYN E",
            date: "23 FEB 2026",
            rating: 5,
            text: "Had I known that my lower back and hip flexor pain would have been alleviated by a Fast Asleep mattress, I would have invested in one a long time ago. Best purchase I have made in a long time."
        }
    ];

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % (reviews.length - 2));
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + (reviews.length - 2)) % (reviews.length - 2));
    };

    return (
        <section className="bg-gray-50 py-20 border-t border-b border-gray-150">
            <div className="container-custom">
                {/* Headers */}
                <div className="text-center mb-8">
                    <span className="text-navy font-bold uppercase tracking-widest text-[11px] block mb-2">
                        Real People.
                    </span>
                    <h2 className="font-script text-navy text-5xl md:text-6xl font-normal leading-tight">
                        Real Sleep Transformations.
                    </h2>
                </div>

                {/* Platform Reviews Stats Bar - Google Only */}
                <div className="flex justify-center mb-14">
                    <div className="bg-[#f0f0f0] border border-gray-200/60 py-2.5 px-6 text-center shadow-sm">
                        <span className="text-xs text-gray-500 font-medium">4.8 based on <span className="font-bold">199</span> reviews on <span className="font-bold text-red-500">G</span><span className="font-bold text-yellow-500">o</span><span className="font-bold text-green-500">o</span><span className="font-bold text-blue-500">g</span><span className="font-bold text-green-500">l</span><span className="font-bold text-red-500">e</span></span>
                    </div>
                </div>

                {/* Reviews Bubbles Slider */}
                <div className="relative max-w-6xl mx-auto px-4 lg:px-0 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
                        {reviews.slice(activeIndex, activeIndex + 3).map((review) => (
                            <div key={review.id} className="flex flex-col">
                                {/* Bubble element */}
                                <div className="relative bg-white p-8 md:p-10 shadow-sm flex flex-col justify-center min-h-[220px]">
                                    {/* Star Rating */}
                                    <div className="flex text-amber-400 justify-center mb-6">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 fill-current mx-0.5" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 text-[11px] md:text-xs leading-relaxed text-center font-medium">
                                        "{review.text}"
                                    </p>
                                    {/* Caret pointing down-left */}
                                    <div className="absolute -bottom-3 left-10 w-6 h-6 bg-white rotate-45 transform"></div>
                                </div>

                                {/* Author details below the bubble */}
                                <div className="mt-8 pl-10 text-left">
                                    <h4 className="text-navy font-extrabold text-[10px] uppercase tracking-wider mb-1">
                                        {review.author}
                                    </h4>
                                    <span className="text-gray-400 text-[9px] font-bold uppercase">
                                        {review.date}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Slider Navigation */}
                    <div className="flex justify-center items-center gap-6 mt-14">
                        <button 
                            onClick={handlePrev}
                            className="flex items-center justify-center text-navy hover:scale-110 transition-transform"
                        >
                            <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
                        </button>
                        <div className="w-32 h-[2px] bg-white relative rounded-full overflow-hidden">
                            <div 
                                className="absolute top-0 h-full bg-[#cca86e] transition-all duration-300"
                                style={{ 
                                    width: `${100 / (reviews.length - 2)}%`, 
                                    left: `${(activeIndex * 100) / (reviews.length - 2)}%` 
                                }}
                            ></div>
                        </div>
                        <button 
                            onClick={handleNext}
                            className="flex items-center justify-center text-navy hover:scale-110 transition-transform"
                        >
                            <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
                        </button>
                    </div>
                </div>

                {/* Read more button */}
                <div className="flex justify-center mt-14">
                    <button className="bg-transparent border border-[#cca86e] text-[#cca86e] font-extrabold uppercase tracking-widest text-[10px] py-3.5 px-8 hover:bg-[#cca86e] hover:text-white transition-all duration-300">
                        Read More Reviews
                    </button>
                </div>
            </div>
        </section>
    );
}
