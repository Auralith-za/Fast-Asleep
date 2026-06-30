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
        <section className="relative py-8 md:py-16 overflow-hidden bg-gray-50 flex flex-col justify-center min-h-[500px]">
            {/* Desktop Background Split */}
            <div className="hidden lg:block absolute inset-y-0 left-[35%] right-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop" 
                    alt="Bright white luxury bedroom styling" 
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="container-custom relative z-10 w-full max-w-[100vw] overflow-hidden lg:overflow-visible">
                <div className="flex flex-col lg:flex-row items-center w-full max-w-[100vw]">
                    
                    {/* Left Column: Copy & Button */}
                    <div className="w-full lg:w-[35%] flex flex-col items-center lg:items-start justify-center text-center lg:text-left pt-4 pb-6 lg:py-0 px-4 lg:px-0 lg:pr-8 z-20 min-w-0">
                        <span className="text-gray-500 font-bold uppercase text-[10px] md:text-[11px] mb-2 block tracking-widest">
                            Save whilst you sleep with our
                        </span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-navy uppercase tracking-widest mb-6 lg:mb-10 leading-tight">
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

                    {/* Right Column: Image (Mobile) & Scrolling Cards */}
                    <div className="w-full lg:w-[65%] relative flex flex-col min-w-0">
                        
                        {/* Mobile Image (Only visible on small screens) */}
                        <div className="block lg:hidden w-full h-[250px] relative z-0 mb-4">
                            <img 
                                src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop" 
                                alt="White luxury bedroom styling" 
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Cards Container */}
                        <div className="z-20 flex flex-row gap-4 overflow-x-auto pb-6 px-1 mt-[-60px] lg:mt-0 relative hide-scrollbar w-full max-w-full snap-x snap-mandatory lg:-ml-10">
                            {bundles.map((bundle, idx) => {
                                const activeImage = (bundle.product && bundle.product.image) ? bundle.product.image : bundle.fallbackImage;
                                return (
                                    <div 
                                        key={idx}
                                        onClick={() => handleBundleClick(bundle.product)}
                                        className="bg-white p-3 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group min-w-[200px] md:min-w-[220px] max-w-[220px] flex-shrink-0 snap-center flex flex-col"
                                    >
                                        <div className="w-full aspect-square mb-3 overflow-hidden bg-gray-50">
                                            <img 
                                                src={activeImage} 
                                                alt={bundle.title} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-3 mt-auto">
                                            <h4 className="font-extrabold text-navy text-[10px] tracking-wider uppercase leading-snug w-2/3 pr-1">
                                                {bundle.title.replace(' BUNDLE', '\nBUNDLE')}
                                            </h4>
                                            <div className="w-px h-6 bg-gray-200"></div>
                                            <div className="flex flex-col items-center justify-center w-1/3">
                                                <span className="text-gray-500 font-bold text-[8px] uppercase">Save</span>
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
                        <div className="lg:hidden mt-4 pb-2 flex justify-center w-full">
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
