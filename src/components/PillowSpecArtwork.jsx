import React from 'react';
import { Cloud, Activity, Wind, Moon, RefreshCw, UserCheck, ShieldCheck, Zap, Sparkles, Droplets } from 'lucide-react';

/**
 * Spec Artwork Data per Pillow Product
 * Matches the artwork format of the Dual Pillow spec image (media_1787896836201.jpg).
 */
const SPEC_DATA = {
    'dual-pillow': {
        artworkImage: '/assets/dual-pillow-spec.jpg',
        title: 'DUAL PILLOW.',
        subtitle: 'TWO PREMIUM FILLINGS.',
        tagline: 'ONE PILLOW. FLIP IT. CHOOSE YOUR COMFORT.',
        description: 'Memory foam on top for contouring comfort. Latex foam on the bottom for natural support.',
        badge: 'FLIP FOR YOUR PERFECT NIGHT',
        bannerTitle: 'TWO SIDES. TWO FEELS.',
        topFeature: {
            title: 'TOP HALF – MEMORY FOAM',
            desc: 'Contours to your head and neck, relieves pressure and adds plush comfort.',
            label: 'PLUSH MEMORY',
            insetBg: 'bg-blue-100/60 text-blue-600',
            insetText: 'Plush Contour'
        },
        bottomFeature: {
            title: 'BOTTOM HALF – LATEX FOAM',
            desc: 'Responsive and supportive, promotes airflow and keeps you cool.',
            label: 'VENTILATED LATEX',
            insetBg: 'bg-amber-100/60 text-amber-700',
            insetText: 'Natural Support'
        },
        bottomIcons: [
            {
                icon: RefreshCw,
                title: 'FLIP TO SWITCH YOUR COMFORT',
                desc: 'One pillow, two feels. Your choice.'
            },
            {
                icon: UserCheck,
                title: 'IDEAL FOR ALL SLEEP POSITIONS',
                desc: "Whether you sleep on your back, side or front – we've got you covered."
            },
            {
                icon: Wind,
                title: 'BREATHABLE & COOL',
                desc: 'Latex foam allows air to flow freely for a cooler, fresher sleep all night.'
            },
            {
                icon: ShieldCheck,
                title: 'PREMIUM QUALITY THAT LASTS',
                desc: 'Made with high-quality materials for durability and long-lasting comfort.'
            }
        ]
    },

    'activated-charcoal-foam-pillow': {
        artworkImage: '/assets/charcoal-pillow-spec.jpg',
        title: 'ACTIVATED CHARCOAL FOAM PILLOW.',
        subtitle: 'PURIFYING & COOLING TECH.',
        tagline: 'ONE PILLOW. DUAL ACTION. HYGIENIC REST.',
        description: 'Activated charcoal micro-infusion absorbs moisture and neutralizes odors while memory foam cradles your neck.',
        badge: 'CHARCOAL PURIFIED & FRESH',
        bannerTitle: 'PURIFYING COMFORT. ADVANCED AIRFLOW.',
        topFeature: {
            title: 'TOP LAYER – CHARCOAL MEMORY FOAM',
            desc: 'Infused with activated charcoal micro-particles to regulate temperature and neutralize odors naturally.',
            label: 'CHARCOAL INFUSED',
            insetBg: 'bg-gray-200 text-gray-800',
            insetText: 'Odor Control'
        },
        bottomFeature: {
            title: 'CORE LAYER – ERGONOMIC BASE',
            desc: 'High-density pressure-relieving core wrapped in a breathable, washable bamboo knitted cover.',
            label: 'ERGONOMIC CORE',
            insetBg: 'bg-teal-100/70 text-teal-800',
            insetText: 'Spine Support'
        },
        bottomIcons: [
            {
                icon: Sparkles,
                title: 'ODOR & MOISTURE CONTROL',
                desc: 'Natural charcoal active filtering keeps your pillow fresh night after night.'
            },
            {
                icon: UserCheck,
                title: 'SPINAL & NECK ALIGNMENT',
                desc: 'Ergonomic pressure-relieving memory foam cradles head and neck perfectly.'
            },
            {
                icon: Wind,
                title: 'BREATHABLE BAMBOO COVER',
                desc: 'Open-cell structure and airflow mesh ensure a cool, sweat-free sleep environment.'
            },
            {
                icon: ShieldCheck,
                title: 'HYPOALLERGENIC QUALITY',
                desc: 'Resists dust mites and allergens with durable long-lasting foam resilience.'
            }
        ]
    },

    'hydro-cool-gel-pillow': {
        artworkImage: '/assets/hydro-cool-pillow-spec.jpg',
        title: 'HYDRO-COOL GEL PILLOW.',
        subtitle: 'ADVANCED COOLING GEL SURFACE.',
        tagline: 'ONE PILLOW. COOL TOUCH. REFRESHING REST.',
        description: 'Advanced hydro-cooling gel layer stays cool to the touch, pulling heat away from your head while cradling your neck.',
        badge: 'INSTANT COOLING GEL',
        bannerTitle: 'COOLING GEL SURFACE. MEMORY FOAM CORE.',
        topFeature: {
            title: 'TOP LAYER – HYDRO-COOLING GEL',
            desc: 'Cool-touch gel matrix continuously dissipates excess body heat for hot sleepers.',
            label: 'HYDRO GEL TECH',
            insetBg: 'bg-sky-100 text-sky-700',
            insetText: 'Active Cooling'
        },
        bottomFeature: {
            title: 'CORE LAYER – MEMORY FOAM',
            desc: 'Adapts precisely to your sleeping posture, easing neck tension and pressure points.',
            label: 'MEMORY CORE',
            insetBg: 'bg-indigo-100 text-indigo-700',
            insetText: 'Pressure Relief'
        },
        bottomIcons: [
            {
                icon: Droplets,
                title: 'ACTIVE HEAT DISSIPATION',
                desc: 'Thermal regulating gel matrix pulls heat away for uninterrupted sleep.'
            },
            {
                icon: UserCheck,
                title: 'ALL SLEEP POSITIONS',
                desc: 'Ideal for back, side, and front sleepers requiring firm neck support.'
            },
            {
                icon: Wind,
                title: 'BREATHABLE & AIRFLOW MESH',
                desc: 'Cool-to-touch zip cover allows continuous air exchange.'
            },
            {
                icon: ShieldCheck,
                title: 'THERAPEUTIC GRADE',
                desc: 'Helps prevent morning neck stiffness with high-resilience memory foam.'
            }
        ]
    },

    'combo-pillow': {
        artworkImage: '/assets/combo-pillow-spec.jpg',
        title: 'COMBO PILLOW.',
        subtitle: 'VERSATILE HYBRID SUPPORT.',
        tagline: 'ONE PILLOW. ADJUSTABLE COMFORT. DUAL FEEL.',
        description: 'Combines supportive memory foam with plush fiber layers for custom height and firmness adjustments.',
        badge: 'HYBRID CUSTOM COMFORT',
        bannerTitle: 'BALANCED FEEL. TAILORED LOFT.',
        topFeature: {
            title: 'TOP LAYER – PLUSH CLOUD FIBER',
            desc: 'Soft, cloud-like cushioning that cradles your head for instant gentle pressure relief.',
            label: 'CLOUD PLUSH',
            insetBg: 'bg-slate-100 text-slate-700',
            insetText: 'Plush Comfort'
        },
        bottomFeature: {
            title: 'CORE LAYER – SUPPORTIVE FOAM',
            desc: 'Resilient foam interior provides optimal spinal support and natural neck alignment.',
            label: 'SUPPORT CORE',
            insetBg: 'bg-emerald-100 text-emerald-800',
            insetText: 'Neck Support'
        },
        bottomIcons: [
            {
                icon: RefreshCw,
                title: 'ADJUSTABLE HEIGHT & FEEL',
                desc: 'Tailor the interior layer to match your ideal sleeping angle and posture.'
            },
            {
                icon: UserCheck,
                title: 'SUPPORTS NECK & SHOULDERS',
                desc: 'Prevents head sagging and maintains healthy neck spinal posture.'
            },
            {
                icon: Wind,
                title: 'CONTINUOUS AIRFLOW CIRCULATION',
                desc: 'Breathable channels keep air moving freely throughout the night.'
            },
            {
                icon: ShieldCheck,
                title: 'LONG LASTING RESILIENCE',
                desc: 'High durability premium components engineered to retain shape for years.'
            }
        ]
    },

    'infused-cbd-foam-pillow': {
        title: 'INFUSED CBD FOAM PILLOW.',
        subtitle: 'SOOTHING CALMING INFUSION.',
        tagline: 'ONE PILLOW. NATURAL RELAXATION. DEEP REST.',
        description: 'Micro-encapsulated CBD infusion releases subtle soothing qualities through movement during sleep for deeper relaxation.',
        badge: 'CALMING CBD INFUSION',
        bannerTitle: 'RELAXATION & RECOVERY. CONTOURING COMFORT.',
        topFeature: {
            title: 'TOP LAYER – CBD INFUSED MEMORY FOAM',
            desc: 'Micro-encapsulated formula promotes deeper muscle relaxation and a calm sleep state.',
            label: 'CBD INFUSION',
            insetBg: 'bg-emerald-100 text-emerald-800',
            insetText: 'Natural Calm'
        },
        bottomFeature: {
            title: 'CORE LAYER – ERGONOMIC MEMORY CORE',
            desc: 'Gently molds to neck curves for effortless spinal alignment and pressure-free support.',
            label: 'MEMORY CORE',
            insetBg: 'bg-blue-100 text-blue-800',
            insetText: 'Spine Support'
        },
        bottomIcons: [
            {
                icon: Sparkles,
                title: 'PROMOTES DEEP RELAXATION',
                desc: 'Helps calm the mind and body for effortless sleep onset.'
            },
            {
                icon: UserCheck,
                title: 'ERGONOMIC SPINAL ALIGNMENT',
                desc: 'Maintains neutral spine position whether sleeping on side or back.'
            },
            {
                icon: Wind,
                title: 'SILKY BREATHABLE COVER',
                desc: 'Ultra-soft skin-friendly fabric enhances thermal regulation.'
            },
            {
                icon: ShieldCheck,
                title: 'DURABLE MICRO-CAPSULES',
                desc: 'Slow-release technology engineered for long-lasting soothing benefits.'
            }
        ]
    },

    'classic-travel-pillow': {
        title: 'CLASSIC TRAVEL PILLOW.',
        subtitle: 'PORTABLE ERGONOMIC SUPPORT.',
        tagline: 'ONE PILLOW. TRAVEL READY. COMPACT CRADLE.',
        description: 'Compact memory foam engineering designed to support your neck during travel or on-the-go rest.',
        badge: 'TRAVEL READY & COMPACT',
        bannerTitle: 'ON-THE-GO COMFORT. 360° NECK CRADLE.',
        topFeature: {
            title: 'CONTOUR CORE – MEMORY FOAM',
            desc: 'Lightweight, easy to pack, and snaps back to original shape instantly upon unpacking.',
            label: 'COMPACT MEMORY',
            insetBg: 'bg-cyan-100 text-cyan-800',
            insetText: 'Easy Pack'
        },
        bottomFeature: {
            title: 'OUTER COVER – WASHABLE VELOUR',
            desc: 'Ultra-soft zip cover provides plush skin feel and easy cleaning during long journeys.',
            label: 'VELOUR COVER',
            insetBg: 'bg-purple-100 text-purple-800',
            insetText: 'Soft Velvet'
        },
        bottomIcons: [
            {
                icon: RefreshCw,
                title: 'LIGHTWEIGHT & PORTABLE',
                desc: 'Easily rolls or squishes into travel bags without losing shape.'
            },
            {
                icon: UserCheck,
                title: '360° NECK SUPPORT CRADLE',
                desc: 'Prevents neck strain while resting upright in planes, cars, or office.'
            },
            {
                icon: Wind,
                title: 'COOLING AIRFLOW VELOUR',
                desc: 'Breathable fabric prevents heat buildup on warm transit days.'
            },
            {
                icon: ShieldCheck,
                title: 'HIGH REBOUND RESILIENCE',
                desc: 'Premium molded memory foam never flattens under travel pressure.'
            }
        ]
    },

    'ball-fibre-pillow': {
        title: 'BALL FIBRE PILLOW.',
        subtitle: '100% VIRGIN BALL FIBRE CLUSTERS.',
        tagline: 'CLOUD-LIKE PLUSHNESS. HYPOALLERGENIC REST.',
        description: 'Filled with premium virgin ball fibre clusters that mimic natural down, providing soft, fluffy loft, allergen-free comfort, and effortless re-fluffing.',
        badge: '100% BALL FIBRE FILL',
        bannerTitle: 'PLUSH CLUSTER FILLING. WASHABLE PERCALE COVER.',
        topFeature: {
            title: 'FILLING – VIRGIN BALL FIBRE CLUSTERS',
            desc: 'Down-alternative cluster fill that resists clumping and adapts gently to head and neck posture.',
            label: 'BALL FIBRE',
            insetBg: 'bg-slate-100 text-slate-800',
            insetText: 'Cloud Loft'
        },
        bottomFeature: {
            title: 'OUTER COVER – BREATHABLE PERCALE COTTON',
            desc: 'Crisp 100% percale cotton shell for maximum airflow, skin-friendly feel, and easy washing.',
            label: 'PERCALE COTTON',
            insetBg: 'bg-blue-50 text-blue-700',
            insetText: 'Pure Cotton'
        },
        bottomIcons: [
            {
                icon: Cloud,
                title: 'CLOUD-LIKE PLUSH COMFORT',
                desc: 'Soft down-alternative cluster loft cradles your head gently.'
            },
            {
                icon: ShieldCheck,
                title: 'HYPOALLERGENIC & NON-ALLERGENIC',
                desc: 'Resists dust mites and allergens, ideal for sensitive sleepers.'
            },
            {
                icon: RefreshCw,
                title: 'EASY RE-FLUFFING & WASHABLE',
                desc: 'Clusters snap back to plush shape easily after fluffing or washing.'
            },
            {
                icon: Wind,
                title: 'NATURALLY BREATHABLE',
                desc: '100% percale cotton cover ensures a cool, sweat-free night of sleep.'
            }
        ]
    },

    'natural-latex-pillow': {
        title: 'NATURAL LATEX PILLOW.',
        subtitle: '100% VENTILATED NATURAL LATEX.',
        tagline: 'NATURAL BOUNCE. HYPOALLERGENIC SUPPORT.',
        description: 'Harvested from organic rubber tree sap with pinhole open-cell ventilation for buoyant, breathable neck and posture support.',
        badge: '100% NATURAL LATEX',
        bannerTitle: 'RESPONSIVE BOUNCE. PINCORE VENTILATION.',
        topFeature: {
            title: 'CORE – VENTILATED NATURAL LATEX',
            desc: 'Pin-core ventilation holes allow continuous air circulation while buoyant latex cradles neck alignment.',
            label: 'NATURAL LATEX',
            insetBg: 'bg-amber-100 text-amber-800',
            insetText: 'Natural Bounce'
        },
        bottomFeature: {
            title: 'COVER – ORGANIC BAMBOO SHELL',
            desc: 'Ultra-soft, moisture-wicking organic bamboo fabric enhances thermal cooling.',
            label: 'BAMBOO COVER',
            insetBg: 'bg-emerald-100 text-emerald-800',
            insetText: 'Cool Touch'
        },
        bottomIcons: [
            {
                icon: Activity,
                title: 'INSTANT RESPONSIVE SUPPORT',
                desc: 'Bounces back immediately without sinking or trapping heat.'
            },
            {
                icon: ShieldCheck,
                title: 'NATURALLY ANTIMICROBIAL',
                desc: 'Inherently resists mold, mildew, and dust mites for pure sleep.'
            },
            {
                icon: Wind,
                title: 'PINCORE AIRFLOW VENTILATION',
                desc: 'Engineered air channels keep the pillow cool all night.'
            },
            {
                icon: UserCheck,
                title: 'SPINAL POSTURE ALIGNMENT',
                desc: 'Optimal support for side and back sleepers to reduce neck stiffness.'
            }
        ]
    }
};

/**
 * Fallback spec properties tailored dynamically to the pillow material
 */
const getFallbackSpec = (product) => {
    const nameUpper = (product.name || 'PILLOW').toUpperCase();
    const nameLower = (product.name || '').toLowerCase();

    // 1. Ball Fibre / Microfibre Pillow
    if (nameLower.includes('ball') || nameLower.includes('fibre') || nameLower.includes('fiber') || nameLower.includes('microfibre') || nameLower.includes('lounger')) {
        return {
            title: `${nameUpper}.`,
            subtitle: '100% VIRGIN BALL FIBRE FILLING.',
            tagline: 'CLOUD-LIKE PLUSHNESS. ALLERGEN-FREE REST.',
            description: `Filled with premium virgin ball fibre clusters that mimic natural down, providing soft, fluffy loft, allergen-free comfort, and effortless re-fluffing.`,
            badge: '100% BALL FIBRE FILL',
            bannerTitle: 'PLUSH CLUSTER FILLING. WASHABLE COTTON COVER.',
            topFeature: {
                title: 'FILLING – VIRGIN BALL FIBRE CLUSTERS',
                desc: 'Down-alternative cluster fill that resists clumping and adapts gently to head and neck posture.',
                label: 'BALL FIBRE',
                insetBg: 'bg-slate-100 text-slate-800',
                insetText: 'Cloud Loft'
            },
            bottomFeature: {
                title: 'OUTER COVER – BREATHABLE PERCALE COTTON',
                desc: 'Crisp 100% percale cotton shell for maximum airflow, skin-friendly feel, and easy washing.',
                label: 'PERCALE COTTON',
                insetBg: 'bg-blue-50 text-blue-700',
                insetText: 'Pure Cotton'
            },
            bottomIcons: [
                {
                    icon: Cloud,
                    title: 'CLOUD-LIKE PLUSH COMFORT',
                    desc: 'Soft down-alternative cluster loft cradles your head gently.'
                },
                {
                    icon: ShieldCheck,
                    title: 'HYPOALLERGENIC & NON-ALLERGENIC',
                    desc: 'Resists dust mites and allergens, ideal for sensitive sleepers.'
                },
                {
                    icon: RefreshCw,
                    title: 'EASY RE-FLUFFING & WASHABLE',
                    desc: 'Clusters snap back to plush shape easily after fluffing or washing.'
                },
                {
                    icon: Wind,
                    title: 'NATURALLY BREATHABLE',
                    desc: '100% percale cotton cover ensures a cool, sweat-free night of sleep.'
                }
            ]
        };
    }

    // 2. Natural Latex Pillow
    if (nameLower.includes('latex')) {
        return {
            title: `${nameUpper}.`,
            subtitle: '100% VENTILATED NATURAL LATEX.',
            tagline: 'NATURAL BOUNCE. HYPOALLERGENIC SUPPORT.',
            description: `Harvested from organic rubber tree sap with pinhole open-cell ventilation for buoyant, breathable neck and posture support.`,
            badge: '100% NATURAL LATEX',
            bannerTitle: 'RESPONSIVE BOUNCE. PINCORE VENTILATION.',
            topFeature: {
                title: 'CORE – VENTILATED NATURAL LATEX',
                desc: 'Pin-core ventilation holes allow continuous air circulation while buoyant latex cradles neck alignment.',
                label: 'NATURAL LATEX',
                insetBg: 'bg-amber-100 text-amber-800',
                insetText: 'Natural Bounce'
            },
            bottomFeature: {
                title: 'COVER – ORGANIC BAMBOO SHELL',
                desc: 'Ultra-soft, moisture-wicking organic bamboo fabric enhances thermal cooling.',
                label: 'BAMBOO COVER',
                insetBg: 'bg-emerald-100 text-emerald-800',
                insetText: 'Cool Touch'
            },
            bottomIcons: [
                {
                    icon: Activity,
                    title: 'INSTANT RESPONSIVE SUPPORT',
                    desc: 'Bounces back immediately without sinking or trapping heat.'
                },
                {
                    icon: ShieldCheck,
                    title: 'NATURALLY ANTIMICROBIAL',
                    desc: 'Inherently resists mold, mildew, and dust mites for pure sleep.'
                },
                {
                    icon: Wind,
                    title: 'PINCORE AIRFLOW VENTILATION',
                    desc: 'Engineered air channels keep the pillow cool all night.'
                },
                {
                    icon: UserCheck,
                    title: 'SPINAL POSTURE ALIGNMENT',
                    desc: 'Optimal support for side and back sleepers to reduce neck stiffness.'
                }
            ]
        };
    }

    // 3. Memory Chip / Shredded Memory Foam Pillow
    if (nameLower.includes('chip') || nameLower.includes('shredded') || nameLower.includes('custom')) {
        return {
            title: `${nameUpper}.`,
            subtitle: '100% ADJUSTABLE MEMORY FOAM CHIPS.',
            tagline: 'CUSTOMIZABLE THICKNESS. TAILORED LOFT.',
            description: `Unzip to add or remove responsive memory foam chips to achieve your exact custom height, firmness, and spinal posture.`,
            badge: '100% ADJUSTABLE CHIPS',
            bannerTitle: 'CUSTOM THICKNESS. RESPONSIVE SUPPORT.',
            topFeature: {
                title: 'FILLING – SHREDDED MEMORY CHIPS',
                desc: 'Removable memory foam chips adapt to side, back, and stomach sleepers.',
                label: 'MEMORY CHIPS',
                insetBg: 'bg-blue-100 text-blue-800',
                insetText: 'Adjust Loft'
            },
            bottomFeature: {
                title: 'COVER – DUAL ZIPPERED PROTECTION',
                desc: 'Breathable dual-layer zip cover allows easy filling customization.',
                label: 'DUAL ZIPPER',
                insetBg: 'bg-gray-100 text-gray-800',
                insetText: 'Easy Zip'
            },
            bottomIcons: [
                {
                    icon: RefreshCw,
                    title: '100% ADJUSTABLE FILLING',
                    desc: 'Add or remove filling until you reach your ideal thickness.'
                },
                {
                    icon: UserCheck,
                    title: 'TAILORED SPINAL ALIGNMENT',
                    desc: 'Custom loft keeps head and neck in perfect neutral posture.'
                },
                {
                    icon: Wind,
                    title: 'BREATHABLE AIRFLOW CHIPS',
                    desc: 'Shredded foam channels allow air to circulate freely.'
                },
                {
                    icon: ShieldCheck,
                    title: 'DURABLE MEMORY RESILIENCE',
                    desc: 'High-density foam chips maintain rebound night after night.'
                }
            ]
        };
    }

    // Default: General Ergonomic Support Pillow
    return {
        title: `${nameUpper}.`,
        subtitle: 'PREMIUM ERGONOMIC COMFORT.',
        tagline: 'ONE PILLOW. OPTIMAL NECK & SPINE SUPPORT.',
        description: `Designed with high-density pressure-relieving support for healthy neck posture and breathable all-night rest.`,
        badge: 'PREMIUM ERGONOMIC SPEC',
        bannerTitle: 'ERGONOMIC SUPPORT. BREATHABLE REST.',
        topFeature: {
            title: 'TOP LAYER – CONTOURING COMFORT',
            desc: 'Adapts to your natural head and neck posture to relieve pressure points.',
            label: 'PLUSH COMFORT',
            insetBg: 'bg-blue-100 text-blue-800',
            insetText: 'Pressure Relief'
        },
        bottomFeature: {
            title: 'CORE LAYER – SUPPORTIVE POSTURE CORE',
            desc: 'High-density resilient core maintains proper spinal alignment all night long.',
            label: 'SUPPORT CORE',
            insetBg: 'bg-amber-100 text-amber-800',
            insetText: 'Spine Alignment'
        },
        bottomIcons: [
            {
                icon: Cloud,
                title: 'PERSONALISED COMFORT',
                desc: 'Adapts smoothly to your head shape and sleeping position.'
            },
            {
                icon: Activity,
                title: 'SUPPORTS NECK & SPINE',
                desc: 'Ergonomically engineered for healthy neck posture.'
            },
            {
                icon: Wind,
                title: 'NATURALLY BREATHABLE',
                desc: 'Promotes continuous airflow for a cool, refreshing sleep.'
            },
            {
                icon: ShieldCheck,
                title: 'PREMIUM QUALITY THAT LASTS',
                desc: 'Made with high-density materials for long-lasting durability.'
            }
        ]
    };
};

export default function PillowSpecArtwork({ product }) {
    if (!product) return null;

    const slug = (product.slug || product.id || '').toLowerCase();
    const name = (product.name || '').toLowerCase();

    // Match product to SPEC_DATA key or fallback
    let specKey = Object.keys(SPEC_DATA).find(k => slug.includes(k) || name.includes(k.replace(/-/g, ' ')));
    
    if (!specKey && name.includes('dual')) specKey = 'dual-pillow';
    if (!specKey && (name.includes('charcoal') || name.includes('activated'))) specKey = 'activated-charcoal-foam-pillow';
    if (!specKey && (name.includes('hydro') || name.includes('cool gel'))) specKey = 'hydro-cool-gel-pillow';
    if (!specKey && name.includes('combo')) specKey = 'combo-pillow';
    if (!specKey && name.includes('cbd')) specKey = 'infused-cbd-foam-pillow';
    if (!specKey && name.includes('travel')) specKey = 'classic-travel-pillow';

    const spec = specKey ? SPEC_DATA[specKey] : getFallbackSpec(product);
    const productImage = product.image || 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1000';

    return (
        <section className="my-12 w-full bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
            {/* Top Artwork Graphic / Interactive Card Layout */}
            <div className="p-6 md:p-10 lg:p-12">

                {/* Header Grid: Left Text & 4 Icons | Right Product Photo with Circular Callout Badge */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
                    
                    {/* Left: Titles, Tagline, Paragraph & 4 Circle Badges */}
                    <div className="lg:col-span-7 space-y-6">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-[#0a1530] tracking-tight uppercase leading-none mb-1">
                                {spec.title}
                            </h2>
                            <h3 className="text-xl md:text-2xl font-light text-[#0a1530] uppercase tracking-wider">
                                {spec.subtitle}
                            </h3>
                            <div className="w-full h-[1.5px] bg-[#0a1530]/20 my-3"></div>
                        </div>

                        <div>
                            <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#0a1530] uppercase block">
                                {spec.tagline}
                            </span>
                            <div className="w-full h-[1.5px] bg-[#0a1530]/20 my-3"></div>
                        </div>

                        <p className="text-sm md:text-base text-gray-600 font-normal leading-relaxed max-w-xl">
                            {spec.description}
                        </p>

                        {/* 4 Feature Circles */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-150">
                            <div className="flex flex-col items-center text-center space-y-2">
                                <div className="w-12 h-12 rounded-full border border-[#0a1530] flex items-center justify-center text-[#0a1530] bg-white shadow-sm">
                                    <Cloud className="w-6 h-6 stroke-[1.5]" />
                                </div>
                                <span className="text-[10px] font-bold text-[#0a1530] uppercase tracking-wider leading-tight">
                                    PERSONALISED<br />COMFORT
                                </span>
                            </div>

                            <div className="flex flex-col items-center text-center space-y-2">
                                <div className="w-12 h-12 rounded-full border border-[#0a1530] flex items-center justify-center text-[#0a1530] bg-white shadow-sm">
                                    <Activity className="w-6 h-6 stroke-[1.5]" />
                                </div>
                                <span className="text-[10px] font-bold text-[#0a1530] uppercase tracking-wider leading-tight">
                                    SUPPORTS<br />NECK & SPINE
                                </span>
                            </div>

                            <div className="flex flex-col items-center text-center space-y-2">
                                <div className="w-12 h-12 rounded-full border border-[#0a1530] flex items-center justify-center text-[#0a1530] bg-white shadow-sm">
                                    <Wind className="w-6 h-6 stroke-[1.5]" />
                                </div>
                                <span className="text-[10px] font-bold text-[#0a1530] uppercase tracking-wider leading-tight">
                                    NATURALLY<br />BREATHABLE
                                </span>
                            </div>

                            <div className="flex flex-col items-center text-center space-y-2">
                                <div className="w-12 h-12 rounded-full border border-[#0a1530] flex items-center justify-center text-[#0a1530] bg-white shadow-sm">
                                    <Moon className="w-6 h-6 stroke-[1.5]" />
                                </div>
                                <span className="text-[10px] font-bold text-[#0a1530] uppercase tracking-wider leading-tight">
                                    BETTER SLEEP<br />EVERY NIGHT
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Photo & Callout Circle Badge */}
                    <div className="lg:col-span-5 relative flex justify-center items-center">
                        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-gray-50 border border-gray-200">
                            <img
                                src={productImage}
                                alt={product.name}
                                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Circular Dark Navy Badge */}
                        <div className="absolute -top-4 -right-2 md:top-2 md:right-2 w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#0a1530] text-white p-3 flex flex-col items-center justify-center text-center shadow-xl border-2 border-white z-10">
                            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider leading-tight">
                                {spec.badge}
                            </span>
                            <div className="mt-1 text-gold text-xs">★ ★ ★ ★ ★</div>
                        </div>
                    </div>
                </div>

                {/* Middle Solid Navy Bar */}
                <div className="w-full bg-[#0a1530] text-white py-3 px-6 text-center shadow-inner my-6 rounded-sm">
                    <h4 className="text-sm md:text-base font-extrabold uppercase tracking-[0.25em]">
                        {spec.bannerTitle}
                    </h4>
                </div>

                {/* Middle Dual / Layer Spec Section */}
                <div className="bg-[#f8fafc] border border-gray-200/80 rounded-lg p-6 md:p-8 my-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        
                        {/* Left Feature Detail */}
                        <div className="lg:col-span-4 space-y-3">
                            <h5 className="text-sm md:text-base font-extrabold text-[#0a1530] uppercase tracking-wider">
                                {spec.topFeature.title}
                            </h5>
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light">
                                {spec.topFeature.desc}
                            </p>
                            <div className="pt-2 flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs shadow-inner ${spec.topFeature.insetBg}`}>
                                    {spec.topFeature.insetText.split(' ')[0]}
                                </div>
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    {spec.topFeature.label}
                                </span>
                            </div>
                        </div>

                        {/* Center Spec Diagram / Product Cutaway */}
                        <div className="lg:col-span-4 flex flex-col items-center justify-center relative py-4">
                            <div className="w-full max-w-[280px] bg-white p-4 rounded-xl border border-gray-200 shadow-md space-y-2 relative">
                                {/* Top Layer visual */}
                                <div className="w-full h-12 bg-sky-100 rounded-t-lg border-b border-dashed border-sky-300 flex items-center justify-center">
                                    <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider">
                                        {spec.topFeature.label}
                                    </span>
                                </div>
                                {/* Bottom Layer visual */}
                                <div className="w-full h-12 bg-amber-50 rounded-b-lg border-t border-dashed border-amber-200 flex items-center justify-center">
                                    <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                                        {spec.bottomFeature.label}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Feature Detail */}
                        <div className="lg:col-span-4 space-y-3 lg:text-right">
                            <h5 className="text-sm md:text-base font-extrabold text-[#0a1530] uppercase tracking-wider">
                                {spec.bottomFeature.title}
                            </h5>
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light">
                                {spec.bottomFeature.desc}
                            </p>
                            <div className="pt-2 flex items-center gap-3 lg:justify-end">
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    {spec.bottomFeature.label}
                                </span>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs shadow-inner ${spec.bottomFeature.insetBg}`}>
                                    {spec.bottomFeature.insetText.split(' ')[0]}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom 4 Feature Columns Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-gray-200">
                    {spec.bottomIcons.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                            <div key={idx} className="flex gap-4 items-start pr-4 border-r last:border-r-0 border-gray-200">
                                <div className="w-10 h-10 rounded-full border border-[#0a1530] flex-shrink-0 flex items-center justify-center text-[#0a1530]">
                                    <IconComponent className="w-5 h-5 stroke-[1.5]" />
                                </div>
                                <div>
                                    <h6 className="text-xs font-bold text-[#0a1530] uppercase tracking-wider leading-snug">
                                        {item.title}
                                    </h6>
                                    <p className="text-[11px] text-gray-500 leading-relaxed mt-1">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
