import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function SleepBundles({ onNavigate, onProductClick, products }) {
    // Helper to find WooCommerce product by name keyword
    const getProductByName = (keyword) => {
        if (!Array.isArray(products) || products.length === 0) return null;
        return products.find(p => p.name.toLowerCase().includes(keyword.toLowerCase())) || null;
    };

    // Dynamically resolve the specific beds requested
    const resolvedHybrid = getProductByName('hybrid-pc');
    const resolvedHydraCool = getProductByName('hydra-cool') || getProductByName('hydra');
    const resolvedBZen = getProductByName('b-zen') || getProductByName('b zen') || getProductByName('bronnel');
    const resolvedLatex = getProductByName('latex-plush') || getProductByName('latex') || getProductByName('plush');
    const resolvedComfyKing = getProductByName('comfy-king') || getProductByName('comfy') || getProductByName('king');

    const bundles = [
        {
            title: "HYBRID-PC SLEEP BUNDLE",
            save: "Save R1,500",
            desc: "Featuring the premium HYBRID-PC Mattress, bed frame, and memory foam pillows.",
            product: resolvedHybrid,
            fallbackImage: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600"
        },
        {
            title: "HYDRA COOL INTENSE BUNDLE",
            save: "Save R2,500",
            desc: "Designed with the cooling HYDRA-COOL Mattress, base, and bedding accessories.",
            product: resolvedHydraCool,
            fallbackImage: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=600"
        },
        {
            title: "B-ZEN COMFORT BUNDLE",
            save: "Save R500",
            desc: "Affordable luxury featuring the B ZEN BRONNEL Mattress and cotton sheets.",
            product: resolvedBZen,
            fallbackImage: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=600"
        },
        {
            title: "LATEX PLUSH SPECIAL BUNDLE",
            save: "Save R3,000",
            desc: "Natural comfort latex plush mattress with headboard and base set.",
            product: resolvedLatex,
            fallbackImage: "https://images.unsplash.com/photo-1505693416388-b0346efee539?auto=format&fit=crop&q=80&w=600"
        }
    ];

    const handleBundleClick = (product) => {
        if (product && product.id) {
            onProductClick(product.id);
        } else {
            onNavigate('shop');
        }
    };

    return (
        <section className="bg-lightGrey py-20 overflow-hidden">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column: Bundles & Copy */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <span className="text-gray-400 font-bold uppercase tracking-[0.25em] text-[11px] mb-3 block">
                            Save whilst you sleep with our
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-navy uppercase tracking-wide mb-10 leading-tight">
                            FAST ASLEEP BUNDLES
                        </h2>

                        <div className="space-y-6 mb-10">
                            {bundles.map((bundle, idx) => {
                                const activeImage = (bundle.product && bundle.product.image) ? bundle.product.image : bundle.fallbackImage;
                                return (
                                    <div 
                                        key={idx}
                                        onClick={() => handleBundleClick(bundle.product)}
                                        className="bg-white p-5 rounded-none border border-gray-150 flex items-center gap-5 hover:shadow-md transition-all duration-300 cursor-pointer group"
                                    >
                                        <img 
                                            src={activeImage} 
                                            alt={bundle.title} 
                                            className="w-20 h-20 object-cover border border-gray-100 flex-shrink-0"
                                        />
                                        <div className="flex-grow">
                                            <div className="flex items-baseline justify-between mb-1">
                                                <h4 className="font-bold text-navy text-[13px] md:text-[14px] tracking-wide uppercase">
                                                    {bundle.title}
                                                </h4>
                                                <span className="text-[#97BFBF] font-bold text-xs uppercase tracking-wider flex-shrink-0">
                                                    {bundle.save}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 text-xs leading-relaxed max-w-sm">
                                                {bundle.desc}
                                            </p>
                                            {bundle.product && (
                                                <p className="text-[10px] text-gray-400 font-semibold mt-1">
                                                    Linked product: {bundle.product.name}
                                                </p>
                                            )}
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#97BFBF] group-hover:translate-x-1 transition-all flex-shrink-0" />
                                    </div>
                                );
                            })}
                        </div>

                        <button 
                            onClick={() => onNavigate('beds-and-bases')}
                            className="bg-[#97BFBF] text-white hover:bg-[#80a5a5] transition-all duration-300 uppercase tracking-[0.2em] font-extrabold text-xs py-5 px-10 text-center w-full sm:w-auto shadow-md self-start"
                        >
                            Shop All Beds & Bases
                        </button>
                    </div>

                    {/* Right Column: Premium Styled Lifestyle Image */}
                    <div className="lg:col-span-7 relative h-[500px] md:h-[650px] w-full overflow-hidden border-[15px] border-white shadow-xl bg-navy">
                        <img 
                            src="/bundle_bedroom.png" 
                            alt="Luxury bed styling" 
                            className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-10 left-10 text-white z-10 max-w-md">
                            <span className="font-script text-[#97BFBF] text-4xl block mb-2 lowercase">rest easy</span>
                            <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">The Ultimate Sleep Experience</h3>
                            <p className="text-white/80 text-sm leading-relaxed">
                                Handcrafted bed structures, cooling modular mattresses, and premium bamboo covers combined to elevate your bedtime.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
