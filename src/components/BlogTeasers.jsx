import React, { useState } from 'react';
import { ArrowRight, X, Clock, User, BookOpen } from 'lucide-react';

export default function BlogTeasers() {
    const [selectedPostIndex, setSelectedPostIndex] = useState(null);

    const posts = [
        {
            title: "How to Choose the Right Mattress for Back Pain",
            excerpt: "Waking up sore? Discover why memory foam might be your solution.",
            image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1200&auto=format&fit=crop",
            readTime: "5 min read",
            author: "Sleep Specialist",
            content: (
                <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">
                    <p className="font-semibold text-lg text-navy">
                        Waking up with back pain is a sign that your mattress isn't supporting your body's natural alignment. Here is how to find the perfect fit.
                    </p>
                    <h4 className="text-xl font-bold text-navy uppercase tracking-wider mt-6">1. Understanding Spinal Alignment</h4>
                    <p>
                        Your spine has a natural S-curve that must be maintained while you sleep. If a mattress is too soft, your hips sag, placing strain on your lower back. If it's too firm, your shoulders and hips are pushed up, misaligning your spine. A medium-firm comfort level is generally the most effective range for lower back support.
                    </p>
                    <h4 className="text-xl font-bold text-navy uppercase tracking-wider mt-6">2. Memory Foam vs. Pocket Coils</h4>
                    <p>
                        Memory foam responds to body heat and pressure, contouring perfectly to your pressure points and easing joint strain. Pocket coils offer targeted push-back support, keeping your spine lifted. A hybrid design combining both provides the contouring comfort of foam alongside the structural support of coils.
                    </p>
                    <h4 className="text-xl font-bold text-navy uppercase tracking-wider mt-6">3. Aligning with Your Sleep Position</h4>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Side Sleepers:</strong> Require a slightly softer mattress to cushion shoulders and hips.</li>
                        <li><strong>Back Sleepers:</strong> Benefit from a balanced medium-firm surface that supports the lower back.</li>
                        <li><strong>Stomach Sleepers:</strong> Need a firmer surface to prevent the hips from sinking, which arches the spine unnaturally.</li>
                    </ul>
                </div>
            )
        },
        {
            title: "Foam vs Spring: What’s Best for You?",
            excerpt: "We break down the pros and cons of different mattress technologies.",
            image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1200&auto=format&fit=crop",
            readTime: "6 min read",
            author: "Product Design Team",
            content: (
                <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">
                    <p className="font-semibold text-lg text-navy">
                        Choosing between foam and spring mattress technologies depends entirely on your sleep preferences, partner movement, and body temperature.
                    </p>
                    <h4 className="text-xl font-bold text-navy uppercase tracking-wider mt-6">1. Motion Isolation (Partner Disturbances)</h4>
                    <p>
                        Memory foam and latex absorb energy rather than transferring it. If your partner tosses and turns, foam mattresses prevent the movement from traveling across the bed. Classic spring systems (like Bonnel coils) transfer motion easily, though pocket coils mitigate this significantly.
                    </p>
                    <h4 className="text-xl font-bold text-navy uppercase tracking-wider mt-6">2. Temperature Regulation</h4>
                    <p>
                        Spring systems are mostly hollow, allowing excellent airflow that keeps the mattress cool. Foam mattresses naturally tend to retain body heat. However, modern foam mattresses incorporate gel-infused memory foam or open-cell latex layers to draw heat away and maintain a cool sleeping environment.
                    </p>
                    <h4 className="text-xl font-bold text-navy uppercase tracking-wider mt-6">3. Dynamic Feel and Bounce</h4>
                    <p>
                        Spring mattresses offer a traditional, buoyant "on top of the bed" feeling with quick responsiveness. Foam mattresses offer a contouring, hugging "in the bed" feel, distributing body weight evenly across pressure points.
                    </p>
                </div>
            )
        },
        {
            title: "Travel in Comfort: Caravan Mattresses Explained",
            excerpt: "Don't compromise on sleep while exploring the country.",
            image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=1200&auto=format&fit=crop",
            readTime: "4 min read",
            author: "Adventures Editor",
            content: (
                <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">
                    <p className="font-semibold text-lg text-navy">
                        Exploring South Africa's wilderness doesn't mean you have to wake up sore. Custom caravan and bakkie mattresses are key to sleeping soundly on the road.
                    </p>
                    <h4 className="text-xl font-bold text-navy uppercase tracking-wider mt-6">1. Custom Shapes and Dimensions</h4>
                    <p>
                        Caravan sleep quarters, rooftop tents, and bakkie beds rarely conform to standard single, double, or queen sizes. They often require angled corners, custom cut-outs, or segmented folding pieces. Choosing a provider that hand-cuts custom foam templates guarantees a perfect edge-to-edge fit.
                    </p>
                    <h4 className="text-xl font-bold text-navy uppercase tracking-wider mt-6">2. Durable and Outdoor-Ready Materials</h4>
                    <p>
                        Road trips bring dust, moisture, and wear. Travel mattresses need water-resistant cover options like premium heavy-duty canvas, coupled with removable, machine-washable designs. Underneath, a high-density support core ensures comfort over rough terrain.
                    </p>
                    <h4 className="text-xl font-bold text-navy uppercase tracking-wider mt-6">3. Portability and Compact Storage</h4>
                    <p>
                        Space is premium inside any utility vehicle. A tri-fold design allows caravan or bakkie mattresses to pack away cleanly during the day, doubling as seating cushions, and unfolding into a luxurious sleep setup at night.
                    </p>
                </div>
            )
        }
    ];

    const activePost = selectedPostIndex !== null ? posts[selectedPostIndex] : null;

    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                <h2 className="text-3xl font-bold text-navy uppercase tracking-widest mb-12 text-center">Sleep Tips & Advice</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <div 
                            key={index} 
                            className="group cursor-pointer flex flex-col justify-between"
                            onClick={() => setSelectedPostIndex(index)}
                        >
                            <div>
                                <div className="overflow-hidden rounded-md mb-4 bg-gray-100 aspect-video relative">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-[#97BFBF] transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {post.excerpt}
                                </p>
                            </div>
                            <button className="text-[#97BFBF] hover:text-navy font-bold uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all mt-2">
                                Read More <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Blog Modal overlay */}
            {activePost && (
                <div className="fixed inset-0 bg-navy/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
                        {/* Sticky Top Nav */}
                        <div className="p-6 border-b border-gray-150 flex items-center justify-between bg-white z-10">
                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                <BookOpen className="w-4 h-4 text-[#97BFBF]" />
                                <span>Article Insights</span>
                            </div>
                            <button 
                                onClick={() => setSelectedPostIndex(null)}
                                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="overflow-y-auto p-6 md:p-12 space-y-8 flex-grow">
                            {/* Header details */}
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-4xl font-extrabold text-navy leading-tight">
                                    {activePost.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                                    <span className="flex items-center gap-2"><User className="w-4 h-4 text-[#97BFBF]" /> By {activePost.author}</span>
                                    <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#97BFBF]" /> {activePost.readTime}</span>
                                </div>
                            </div>

                            {/* Main banner image */}
                            <div className="w-full aspect-[21/9] rounded-xl overflow-hidden bg-gray-100">
                                <img 
                                    src={activePost.image} 
                                    alt={activePost.title} 
                                    className="w-full h-full object-cover" 
                                />
                            </div>

                            {/* Core text content */}
                            <div className="border-t border-gray-100 pt-8">
                                {activePost.content}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-150 bg-gray-50 flex justify-end">
                            <button 
                                onClick={() => setSelectedPostIndex(null)}
                                className="bg-navy hover:bg-[#97BFBF] text-white text-xs uppercase tracking-widest font-bold px-8 py-3.5 transition-colors"
                            >
                                Done Reading
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
