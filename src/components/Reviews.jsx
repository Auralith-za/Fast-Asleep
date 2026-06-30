import React from 'react';
import { Star } from 'lucide-react';

export default function Reviews() {
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
            text: "Had I known that my lower back and hip flexor pain would have been alleviated by a Fast Asleep mattress, I would have invested in one a long time ago."
        }
    ];

    return (
        <section className="bg-gray-50 py-12 border-t border-b border-gray-150">
            <div className="container-custom">
                {/* Headers */}
                <div className="text-center mb-6">
                    <span className="text-navy font-bold uppercase tracking-widest text-[11px] block mb-2">
                        Real People.
                    </span>
                    <h2 className="font-script text-navy text-4xl md:text-5xl font-normal leading-tight">
                        Real Sleep Transformations.
                    </h2>
                </div>

                {/* Platform Reviews Stats Bar - Google Only */}
                <div className="flex justify-center mb-10">
                    <div className="bg-[#f0f0f0] border border-gray-200/60 py-2.5 px-6 text-center shadow-sm">
                        <span className="text-xs text-gray-500 font-medium">4.8 based on <span className="font-bold">199</span> reviews on <span className="font-bold text-red-500">G</span><span className="font-bold text-yellow-500">o</span><span className="font-bold text-green-500">o</span><span className="font-bold text-blue-500">g</span><span className="font-bold text-green-500">l</span><span className="font-bold text-red-500">e</span></span>
                    </div>
                </div>

                {/* Reviews Bubbles Grid */}
                <div className="relative max-w-[1400px] mx-auto px-4 lg:px-0 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                        {reviews.map((review) => (
                            <div key={review.id} className="flex flex-col">
                                {/* Bubble element */}
                                <div className="relative bg-white p-5 md:p-6 shadow-sm flex flex-col justify-start min-h-[160px] border border-gray-100 rounded-sm">
                                    {/* Star Rating */}
                                    <div className="flex text-amber-400 justify-center mb-3">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-current mx-0.5" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 text-[10px] leading-relaxed text-center font-medium line-clamp-6">
                                        "{review.text}"
                                    </p>
                                    {/* Caret pointing down-left */}
                                    <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-b border-l border-gray-100 rotate-[-45deg] transform"></div>
                                </div>

                                {/* Author details below the bubble */}
                                <div className="mt-4 pl-6 text-left">
                                    <h4 className="text-navy font-extrabold text-[9px] uppercase tracking-wider mb-1">
                                        {review.author}
                                    </h4>
                                    <span className="text-gray-400 text-[8px] font-bold uppercase">
                                        {review.date}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Read more button */}
                <div className="flex justify-center mt-8">
                    <button className="bg-transparent border border-[#cca86e] text-[#cca86e] font-extrabold uppercase tracking-widest text-[9px] py-3 px-6 hover:bg-[#cca86e] hover:text-white transition-all duration-300">
                        Read More Reviews
                    </button>
                </div>
            </div>
        </section>
    );
}
