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
        <section className="bg-[#F6F6F6] py-20 border-t border-b border-gray-200/50">
            <div className="container-custom">
                {/* Headers */}
                <div className="text-center mb-10">
                    <span className="text-gray-400 font-bold uppercase tracking-[0.25em] text-[10px] block mb-2">
                        READ UP ON
                    </span>
                    <h2 className="font-script text-[#c5a059] lowercase text-6xl md:text-7xl font-normal mb-3">
                        Our Reviews
                    </h2>
                    <p className="text-navy font-bold text-lg md:text-xl tracking-wide">
                        10 000+ happy Sleepers
                    </p>
                </div>

                {/* Platform Reviews Stats Bar */}
                <div className="max-w-4xl mx-auto bg-white border border-gray-200/80 p-5 grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200 mb-14 shadow-sm">
                    <div className="py-2 md:py-0 flex flex-col justify-center items-center">
                        <span className="text-xs text-gray-500 font-medium">4.7 based on 35 reviews on <span className="font-bold text-blue-500">hellopeter</span></span>
                    </div>
                    <div className="py-2 md:py-0 flex flex-col justify-center items-center">
                        <span className="text-xs text-gray-500 font-medium">4.8 based on 197 reviews on <span className="font-bold text-red-500">G</span><span className="font-bold text-yellow-500">o</span><span className="font-bold text-green-500">o</span><span className="font-bold text-blue-500">g</span><span className="font-bold text-green-500">l</span><span className="font-bold text-red-500">e</span></span>
                    </div>
                    <div className="py-2 md:py-0 flex flex-col justify-center items-center">
                        <span className="text-xs text-gray-500 font-medium">4.5 based on 103 reviews on <span className="font-bold text-blue-800">facebook</span></span>
                    </div>
                </div>

                {/* Reviews Bubbles Slider */}
                <div className="relative max-w-6xl mx-auto px-4 md:px-12 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {reviews.slice(activeIndex, activeIndex + 3).map((review) => (
                            <div key={review.id} className="flex flex-col items-center">
                                {/* Bubble element */}
                                <div className="relative bg-white border border-gray-150 p-8 shadow-sm flex flex-col min-h-[220px] justify-between">
                                    {/* Star Rating */}
                                    <div className="flex text-[#c5a059] justify-center mb-5">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 text-xs md:text-[13px] leading-relaxed text-center italic mb-4">
                                        "{review.text}"
                                    </p>
                                    {/* Caret pointing down */}
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-b border-r border-gray-150 rotate-45"></div>
                                </div>

                                {/* Author details below the bubble */}
                                <div className="mt-8 text-center">
                                    <h4 className="text-navy font-bold text-xs uppercase tracking-wider mb-1">
                                        {review.author}
                                    </h4>
                                    <span className="text-gray-400 text-[10px]">
                                        {review.date}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Slider Navigation */}
                    <div className="flex justify-center items-center gap-6 mt-12">
                        <button 
                            onClick={handlePrev}
                            className="w-10 h-10 border border-gray-300 rounded-none flex items-center justify-center text-gray-600 hover:border-navy hover:text-navy transition-all bg-white"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="w-32 h-1 bg-gray-200 relative">
                            <div 
                                className="absolute top-0 h-full bg-[#c5a059] transition-all duration-300"
                                style={{ 
                                    width: `${100 / (reviews.length - 2)}%`, 
                                    left: `${(activeIndex * 100) / (reviews.length - 2)}%` 
                                }}
                            ></div>
                        </div>
                        <button 
                            onClick={handleNext}
                            className="w-10 h-10 border border-gray-300 rounded-none flex items-center justify-center text-gray-600 hover:border-navy hover:text-navy transition-all bg-white"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Read more button */}
                <div className="flex justify-center mt-12">
                    <button className="bg-transparent border border-[#c5a059] text-[#c5a059] font-bold uppercase tracking-[0.2em] text-xs py-4 px-8 hover:bg-[#c5a059] hover:text-white transition-all duration-300">
                        Read More Reviews
                    </button>
                </div>
            </div>
        </section>
    );
}
