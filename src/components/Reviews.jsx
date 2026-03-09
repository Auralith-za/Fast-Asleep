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
        <section className="bg-white py-20 border-t border-gray-100">
            <div className="container-custom">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-navy mb-2">South Africa is Sleeping Better</h2>
                    <p className="font-script text-2xl md:text-3xl text-navy/80 mb-6">Real reviews from real sleepers</p>

                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="flex text-gold">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-current" />
                            ))}
                        </div>
                        <p className="text-sm text-gray-600 font-medium">
                            <span className="font-bold text-navy">4.9/5</span> (Based on 2,000+ reviews)
                        </p>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-[#F9FAFB] p-8 rounded-sm hover:shadow-sm transition-shadow">
                            <div className="flex mb-4 text-gold">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <h3 className="font-bold text-navy text-sm mb-3">{review.name}</h3>
                            <p className="text-gray-600 text-sm italic mb-6 leading-relaxed">"{review.text}"</p>
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{review.date}</div>
                        </div>
                    ))}
                </div>

                {/* Read All Link */}
                <div className="text-center">
                    <a href="#" className="inline-block text-navy font-bold border-b-2 border-navy pb-0.5 hover:text-gold hover:border-gold transition-colors text-sm uppercase tracking-wider">
                        Read all reviews
                    </a>
                </div>
            </div>
        </section>
    );
}
