import React from 'react';
import ProductCard from './ProductCard';
import { Sparkles, ShieldCheck } from 'lucide-react';

/**
 * Category Hero Configuration (Banners, Background Images & Intros)
 */
const CATEGORY_HEROES = {
    'bed-pillows': {
        title: 'BED PILLOWS & ERGONOMIC COMFORT',
        subtitle: 'PREMIUM MEMORY FOAM, LATEX & HYDRO-COOL GEL',
        desc: 'Discover your perfect sleep alignment with our range of luxury memory foam, natural latex, and temperature-regulating hydro-cool gel pillows engineered for shoulder, neck, and spinal cradling.',
        bgImage: '/assets/pillow-hero-bg.webp',
        badge: '100% Ergonomic Support'
    },
    'pillows': {
        title: 'BED PILLOWS & ERGONOMIC COMFORT',
        subtitle: 'PREMIUM MEMORY FOAM, LATEX & HYDRO-COOL GEL',
        desc: 'Discover your perfect sleep alignment with our range of luxury memory foam, natural latex, and temperature-regulating hydro-cool gel pillows engineered for shoulder, neck, and spinal cradling.',
        bgImage: '/assets/pillow-hero-bg.webp',
        badge: '100% Ergonomic Support'
    },
    'travel-pillows': {
        title: 'TRAVEL PILLOWS & ON-THE-GO COMFORT',
        subtitle: 'PORTABLE 360° NECK SUPPORT CRADLES',
        desc: 'Take luxury sleep wherever your travels lead. Compact, high-rebound memory foam travel pillows designed to eliminate neck strain on flights, road trips, or office breaks.',
        bgImage: '/assets/pillow-hero-bg.webp',
        badge: 'Compact & Travel Ready'
    },
    'beds-and-bases': {
        title: 'BESPOKE BEDS & MATTRESSES',
        subtitle: 'ENGINEERED FOR DEEP REST & ZERO MOTION TRANSFER',
        desc: 'Handcrafted South African mattresses and bed bases designed with high-density support cores, orthopaedic spinal alignment, and luxury plush memory foam tops.',
        bgImage: '/assets/ideal-bases-bg.png',
        badge: '100 Night Risk-Free Trial'
    },
    'mattress-toppers': {
        title: 'LUXURY MATTRESS TOPPERS',
        subtitle: 'REVITALIZE YOUR MATTRESS WITH PLUSH MEMORY FOAM',
        desc: 'Transform any mattress into a cloud of pressure-relieving comfort with our high-density orthopaedic memory foam and natural latex toppers.',
        bgImage: 'https://images.unsplash.com/photo-1505691938895-1758d7bab016?q=80&w=1600&auto=format&fit=crop',
        badge: 'Instant Mattress Upgrade'
    },
    'paedic-and-travel': {
        title: 'PEDIC & THERAPEUTIC SUPPORTS',
        subtitle: 'THERAPEUTIC ELEVATION & SPINAL ALIGNMENT',
        desc: 'Specialized therapeutic support wedges, leg elevation cushions, and posture alignment pillows designed to relieve joint strain and ease recovery.',
        bgImage: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&q=80&w=1600',
        badge: 'Therapeutic Grade'
    },
    'babies': {
        title: 'HUSHHH BABY COLLECTION',
        subtitle: 'GENTLE, HYPOALLERGENIC & SAFE NURSERY SLEEP',
        desc: 'Designed for precious rest. Breathable nursery mattresses, cot wedges, and support pads crafted with non-toxic, hypoallergenic materials for your little one.',
        bgImage: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1600',
        badge: 'Certified Safe & Gentle'
    },
    'k9-range': {
        title: 'SCRATCHY TAILS K9 BEDDING',
        subtitle: 'ORTHOPAEDIC COMFORT FOR YOUR BELOVED PETS',
        desc: 'Give your four-legged family members the orthopaedic joint support they deserve with durable, washable memory foam pet beds.',
        bgImage: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=1600',
        badge: 'Orthopaedic Pet Care'
    },
    'shop': {
        title: 'THE FAST ASLEEP COLLECTION',
        subtitle: 'BETTER SLEEP. EVERY NIGHT.',
        desc: "Explore South Africa's finest collection of mattresses, bed bases, toppers, and ergonomic pillows engineered for ultimate sleep wellness.",
        bgImage: '/assets/hero-family.png',
        badge: 'Free Delivery Nationwide'
    }
};

export default function CategoryPage({ category, onProductClick, products }) {
    // Filter products by category, but if 'shop' or 'all', show all
    const categoryProducts = category === 'shop' || category === 'all' || !category
        ? products 
        : products.filter(product => {
            const cat = (product.category || '').toLowerCase();
            const cats = (product.categories || []).map(c => c.toLowerCase());
            const catQuery = (category || '').toLowerCase();
            return cat === catQuery || cats.includes(catQuery) || product.name.toLowerCase().includes(catQuery.replace(/-/g, ' '));
        });

    const categoryKey = (category || 'shop').toLowerCase();
    const heroInfo = CATEGORY_HEROES[categoryKey] || CATEGORY_HEROES['shop'];

    return (
        <section className="bg-white pb-20 min-h-[60vh]">
            
            {/* Category Hero Banner */}
            <div 
                className="relative bg-cover bg-center py-20 px-6 text-white min-h-[360px] md:min-h-[420px] flex items-center justify-center border-b border-gray-200 shadow-inner"
                style={{ 
                    backgroundImage: `linear-gradient(rgba(10, 21, 48, 0.25), rgba(10, 21, 48, 0.30)), url('${heroInfo.bgImage}')` 
                }}
            >
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wide leading-tight text-white drop-shadow-lg">
                        {heroInfo.title}
                    </h1>

                    <div className="w-16 h-[2px] bg-gold mx-auto"></div>

                    <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white/90 drop-shadow">
                        {heroInfo.subtitle}
                    </h2>

                    <p className="text-white text-sm md:text-base max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-sm">
                        {heroInfo.desc}
                    </p>
                </div>
            </div>

            {/* Specialty 3 Pillow Collection Banners (EXPERIENCE CBD, CHARCOAL, GEL) */}
            {(categoryKey.includes('pillow') || categoryKey === 'shop') && (
                <div className="bg-white py-12 border-b border-gray-200">
                    <div className="container-custom">
                        <div className="text-center mb-8">
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#97BFBF] block mb-1">Specialty Formulations</span>
                            <h3 className="text-2xl font-extrabold text-[#0a1530] uppercase tracking-wider">Explore Pillow Collections</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                            
                            {/* Banner 1: EXPERIENCE CHARCOAL */}
                            <div 
                                onClick={() => {
                                    const charcoalProd = products.find(p => p.name.toLowerCase().includes('charcoal') || p.slug.includes('charcoal'));
                                    if (charcoalProd) onProductClick(charcoalProd.id);
                                }}
                                className="group relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5 aspect-[4/3] bg-zinc-900 flex flex-col justify-end"
                            >
                                <img 
                                    src="/assets/experience-charcoal-banner.jpg" 
                                    alt="Experience Charcoal Foam Pillow" 
                                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                                />
                                <div className="absolute bottom-0 inset-x-0 h-[34%] bg-gradient-to-t from-[#0a1530] via-[#0a1530] to-transparent pointer-events-none"></div>
                                <div className="relative z-10 p-5 text-white flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#97BFBF] block mb-0.5">
                                            Purifying & Odor Control
                                        </span>
                                        <h4 className="text-lg font-black uppercase tracking-wider text-white drop-shadow">
                                            Activated Charcoal
                                        </h4>
                                    </div>
                                    <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#0a1530] transition-colors shadow flex-shrink-0 ml-2">
                                        &rarr;
                                    </span>
                                </div>
                            </div>

                            {/* Banner 2: EXPERIENCE CBD */}
                            <div 
                                onClick={() => {
                                    const cbdProd = products.find(p => p.name.toLowerCase().includes('cbd') || p.slug.includes('cbd'));
                                    if (cbdProd) onProductClick(cbdProd.id);
                                }}
                                className="group relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5 aspect-[4/3] bg-emerald-950 flex flex-col justify-end"
                            >
                                <img 
                                    src="/assets/experience-cbd-banner.jpg" 
                                    alt="Experience CBD Foam Pillow" 
                                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                                />
                                <div className="absolute bottom-0 inset-x-0 h-[34%] bg-gradient-to-t from-[#0a1530] via-[#0a1530] to-transparent pointer-events-none"></div>
                                <div className="relative z-10 p-5 text-white flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 block mb-0.5">
                                            Soothing Calming Rest
                                        </span>
                                        <h4 className="text-lg font-black uppercase tracking-wider text-white drop-shadow">
                                            Infused CBD Foam
                                        </h4>
                                    </div>
                                    <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#0a1530] transition-colors shadow flex-shrink-0 ml-2">
                                        &rarr;
                                    </span>
                                </div>
                            </div>

                            {/* Banner 3: EXPERIENCE GEL */}
                            <div 
                                onClick={() => {
                                    const gelProd = products.find(p => p.name.toLowerCase().includes('hydro') || p.name.toLowerCase().includes('gel') || p.slug.includes('cool'));
                                    if (gelProd) onProductClick(gelProd.id);
                                }}
                                className="group relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5 aspect-[4/3] bg-sky-950 flex flex-col justify-end"
                            >
                                <img 
                                    src="/assets/experience-gel-banner.jpg" 
                                    alt="Experience Hydro-Cool Gel Pillow" 
                                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                                />
                                <div className="absolute bottom-0 inset-x-0 h-[34%] bg-gradient-to-t from-[#0a1530] via-[#0a1530] to-transparent pointer-events-none"></div>
                                <div className="relative z-10 p-5 text-white flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-300 block mb-0.5">
                                            Cool-Touch Thermal Tech
                                        </span>
                                        <h4 className="text-lg font-black uppercase tracking-wider text-white drop-shadow">
                                            Hydro-Cool Gel
                                        </h4>
                                    </div>
                                    <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#0a1530] transition-colors shadow flex-shrink-0 ml-2">
                                        &rarr;
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* Products Grid */}
            <div className="container-custom mt-12">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-150">
                    <span className="text-xs font-bold text-[#0a1530] uppercase tracking-wider">
                        Showing {categoryProducts.length} {categoryProducts.length === 1 ? 'Product' : 'Products'}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <ShieldCheck className="w-4 h-4 text-gold" />
                        <span>Free Nationwide Delivery Available</span>
                    </div>
                </div>

                {categoryProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
                        {categoryProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={() => onProductClick(product.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-lg">
                        <p className="text-xl text-gray-500 font-bold uppercase tracking-wider">Coming Soon</p>
                        <p className="text-sm text-gray-400 mt-2">We are currently updating our collection for this category.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
