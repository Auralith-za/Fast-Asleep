import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function BlogTeasers() {
    const posts = [
        {
            title: "How to Choose the Right Mattress for Back Pain",
            excerpt: "Waking up sore? Discover why memory foam might be your solution.",
            image: "https://cloudsplash.co.za/wp/wp-content/uploads/2026/02/Screenshot-2026-02-17-at-21.21.28.png",
            link: "#"
        },
        {
            title: "Foam vs Spring: What’s Best for You?",
            excerpt: "We break down the pros and cons of different mattress technologies.",
            image: "https://cloudsplash.co.za/wp/wp-content/uploads/2026/02/Screenshot-2026-02-17-at-21.19.00.png",
            link: "#"
        },
        {
            title: "Travel in Comfort: Caravan Mattresses Explained",
            excerpt: "Don't compromise on sleep while exploring the country.",
            image: "https://cloudsplash.co.za/wp/wp-content/uploads/2026/02/Screenshot-2026-02-17-at-21.20.22.png",
            link: "#"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                <h2 className="text-3xl font-bold text-navy uppercase tracking-widest mb-12 text-center">Sleep Tips & Advice</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="overflow-hidden rounded-md mb-4 bg-gray-100 aspect-w-16 aspect-h-9">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors leading-tight">
                                {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {post.excerpt}
                            </p>
                            <button className="text-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                                Read More <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
