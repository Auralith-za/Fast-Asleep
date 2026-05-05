import React from 'react';
import { Star } from 'lucide-react';

export default function Reviews() {
    const reviews = [
        {
            id: 1,
            name: "Sarah J.",
            rating: 5,
            text: "Finally a mattress that my husband and I can agree on. The split comfort feature is a lifesaver!",
            date: "2 WEEKS AGO"
        },
        {
            id: 2,
            name: "Michael B.",
            rating: 5,
            text: "Best sleep I've had in years. I started with Firm but switched the layers to Medium-Firm and it's perfect.",
            date: "1 MONTH AGO"
        },
        {
            id: 3,
            name: "Thandiwe M.",
            rating: 5,
            text: "Delivery was super fast and the box was easy to handle. Highly recommend Fast Asleep.",
            date: "3 DAYS AGO"
        }
    ];

    return (
        <section className="bg-white py-24">
            <div className="container-custom">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1a2b4b] mb-2">
                        South Africa is Sleeping Better
                    </h2>
                    <p className="text-2xl md:text-3xl text-[#1a2b4b] opacity-80 italic mb-8" style={{ fontFamily: "'Dancing Script', cursive" }}>
                        Real reviews from real sleepers
                    </p>

                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="flex text-[#98c1c2]">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 fill-current" />
                            ))}
                        </div>
                        <p className="text-sm text-navy font-bold">
                            4.9/5 <span className="font-normal text-gray-500">(Based on 2,000+ reviews)</span>
                        </p>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-[#f8f9fa] p-10 flex flex-col h-full rounded-sm">
                            <div className="flex text-[#98c1c2] mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            
                            <h3 className="font-bold text-navy text-lg mb-4">{review.name}</h3>
                            
                            <p className="text-gray-600 text-base leading-relaxed mb-8 flex-grow italic">
                                "{review.text}"
                            </p>
                            
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                                {review.date}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <a href="#" className="inline-block text-navy font-bold uppercase tracking-widest text-sm border-b-2 border-navy pb-1 hover:text-gold hover:border-gold transition-colors">
                        Read All Reviews
                    </a>
                </div>
            </div>
        </section>
    );
}
