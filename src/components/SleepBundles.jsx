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
        <section className="relative py-4 md:py-6 overflow-hidden bg-gray-50 lg:bg-transparent">
            {/* Split Background for Desktop */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-[35%] bg-gray-50"></div>
            <div className="hidden lg:block absolute inset-y-0 right-0 w-[65%] bg-navy"></div>

            <div className="container-custom relative z-10">
                <div className="flex flex-col lg:flex-row items-center">
                    
                    {/* Left Column: Copy & Button */}
                    <div className="w-full lg:w-[35%] flex flex-col justify-center pt-6 lg:pt-0 pr-0 lg:pr-12 z-20">
                        <span className="text-gray-600 font-bold uppercase text-[11px] md:text-xs mb-2 block tracking-wider">
                            Save whilst you sleep with our
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-navy uppercase tracking-widest mb-8 lg:mb-12 leading-tight">
                            FAST ASLEEP BUNDLES
                        </h2>

                        <div className="hidden lg:block">
                            <button 
                                onClick={() => onNavigate('beds-and-bases')}
                                className="bg-[#cca86e] text-white hover:bg-[#b5925a] transition-all duration-300 uppercase tracking-widest font-extrabold text-[11px] py-4 px-8 shadow-sm whitespace-nowrap"
                            >
                                Shop Bundles
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Lifestyle Image & Overlapping Cards */}
                    <div className="w-full lg:w-[65%] relative mt-8 lg:mt-0 flex items-center">
                        {/* Lifestyle Image inside Navy background (navy padding acts as border) */}
                        <div className="relative w-full h-[350px] md:h-[550px] lg:h-[650px] p-2 md:p-4 lg:p-[20px] z-0">
                            <div className="w-full h-full relative overflow-hidden bg-white">
                                <img 
                                    src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop" 
                                    alt="White luxury bed styling" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Cards Container - Overlapping the left side and image */}
                        <div className="lg:absolute lg:top-1/2 lg:-left-32 lg:-translate-y-1/2 z-20 flex flex-row gap-4 overflow-x-auto lg:overflow-visible pb-6 lg:pb-0 px-4 lg:px-0 mt-[-80px] lg:mt-0 relative scrollbar-hide w-full max-w-full">
                            {bundles.map((bundle, idx) => {
                                const activeImage = (bundle.product && bundle.product.image) ? bundle.product.image : bundle.fallbackImage;
                                return (
                                    <div 
                                        key={idx}
                                        onClick={() => handleBundleClick(bundle.product)}
                                        className="bg-white p-3 md:p-4 rounded-none shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer group min-w-[200px] md:min-w-[220px] max-w-[220px] flex-shrink-0"
                                    >
                                        <div className="w-full aspect-square mb-4 overflow-hidden bg-gray-100">
                                            <img 
                                                src={activeImage} 
                                                alt={bundle.title} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-3">
                                            <h4 className="font-extrabold text-navy text-[10px] md:text-[11px] tracking-wider uppercase leading-snug w-2/3 pr-2">
                                                {bundle.title.replace(' BUNDLE', '\nBUNDLE')}
                                            </h4>
                                            <div className="w-px h-6 bg-gray-300"></div>
                                            <div className="flex flex-col items-center justify-center w-1/3">
                                                <span className="text-navy font-bold text-[8px] uppercase">Save</span>
                                                <span className="text-navy font-extrabold text-[10px] md:text-[11px] uppercase tracking-wider whitespace-nowrap">
                                                    {bundle.save.replace('Save ', '')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Mobile Button */}
                        <div className="lg:hidden mt-6 px-4 pb-8 flex justify-center">
                            <button 
                                onClick={() => onNavigate('beds-and-bases')}
                                className="bg-[#cca86e] text-white hover:bg-[#b5925a] transition-all duration-300 uppercase tracking-widest font-extrabold text-[11px] py-4 px-8 shadow-sm w-full"
                            >
                                Shop Bundles
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
