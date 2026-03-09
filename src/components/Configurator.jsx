import React, { useState, useEffect } from 'react';
import { Ruler, Layers, ShieldCheck, ShoppingCart, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Configurator() {
    const { addToCart } = useCart();
    const [step, setStep] = useState(1);
    const [price, setPrice] = useState(0);

    // Configuration State
    const [config, setConfig] = useState({
        type: 'mattress', // mattress | pillow
        size: 'single',   // single, queen, custom, etc.
        length: 188,      // cm
        width: 91,        // cm
        depth: 20,        // cm
        core: 'high-density', // high-density, orthopaedic
        topLayer: 'memory-foam', // none, memory-foam, latex, gel
        cover: 'bamboo' // bamboo, waterproof, cotton
    });

    // Material Rates (Simulated)
    const RATES = {
        foamBase: 0.15, // Price per cm3 (Mattress)
        pillowBase: 0.10, // Price per cm3 (Pillow)
        memoryFoam: 0.25,
        latex: 0.30,
        coverBamboo: 500,
        coverWaterproof: 350,
        pillowCover: 150 // Cheaper cover for pillows
    };

    // Standard Sizes
    const MATTRESS_SIZES = {
        single: { l: 188, w: 91 },
        three_quarter: { l: 188, w: 107 },
        double: { l: 188, w: 137 },
        queen: { l: 188, w: 152 },
        king: { l: 188, w: 183 },
        custom: { l: 0, w: 0 }
    };

    const PILLOW_SIZES = {
        standard: { l: 70, w: 45 },
        king: { l: 90, w: 50 },
        continental: { l: 75, w: 75 },
        body: { l: 150, w: 50 },
        custom: { l: 0, w: 0 }
    };

    // Helper to get current size map
    const currentSizes = config.type === 'mattress' ? MATTRESS_SIZES : PILLOW_SIZES;

    // Update dims when size preset changes
    useEffect(() => {
        if (config.size !== 'custom') {
            const dims = currentSizes[config.size] || { l: 0, w: 0 };
            setConfig(prev => ({
                ...prev,
                length: dims.l,
                width: dims.w,
                depth: prev.type === 'pillow' && prev.size !== 'custom' ? 15 : prev.depth // Default pillow depth
            }));
        }
    }, [config.size, config.type]);

    // Handle Type Change
    const handleTypeChange = (newType) => {
        setConfig({
            type: newType,
            size: newType === 'mattress' ? 'single' : 'standard',
            length: newType === 'mattress' ? 188 : 70,
            width: newType === 'mattress' ? 91 : 45,
            depth: newType === 'mattress' ? 20 : 15,
            core: 'high-density',
            topLayer: 'memory-foam',
            cover: 'bamboo'
        });
        setStep(1);
    };

    // Calculate Price
    useEffect(() => {
        const volume = config.length * config.width * config.depth; // cm3
        let estimated = 0;

        if (config.type === 'mattress') {
            // MATTRESS PRICING
            estimated += volume * (config.core === 'orthopaedic' ? RATES.foamBase * 1.2 : RATES.foamBase);
            if (config.topLayer !== 'none') {
                const layerVol = config.length * config.width * 5;
                const rate = config.topLayer === 'latex' ? RATES.latex : RATES.memoryFoam;
                estimated += layerVol * rate;
            }
            estimated += config.cover === 'bamboo' ? RATES.coverBamboo : RATES.coverWaterproof;
        } else {
            // PILLOW PRICING
            estimated += volume * RATES.pillowBase;
            // Top layer is just an add-on factor for pillows
            if (config.topLayer !== 'none') {
                estimated += (volume * 0.2); // 20% Markup for special fills
            }
            estimated += RATES.pillowCover;
        }

        setPrice(Math.round(estimated));
    }, [config]);

    const handleAddToCart = () => {
        const item = {
            id: `custom-${Date.now()}`,
            name: `Custom ${config.type === 'mattress' ? 'Mattress' : 'Pillow'}`,
            price: price,
            description: `${config.length}x${config.width}x${config.depth}cm | ${config.core} | ${config.topLayer}`,
            image: config.type === 'mattress'
                ? "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=300"
                : "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&q=80&w=300"
        };
        addToCart(item);
    };

    const nextStep = () => setStep(p => p + 1);
    const prevStep = () => setStep(p => p - 1);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom">
                <h1 className="text-3xl md:text-4xl font-bold text-navy text-center mb-4 uppercase tracking-widest">
                    Build Your Own <span className="text-gold">Comfort</span>
                </h1>

                {/* Type Selector */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1 rounded-full shadow-sm border border-gray-200 inline-flex">
                        <button
                            onClick={() => handleTypeChange('mattress')}
                            className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition-all ${config.type === 'mattress' ? 'bg-navy text-white shadow' : 'text-gray-500 hover:text-navy'}`}
                        >
                            Mattress
                        </button>
                        <button
                            onClick={() => handleTypeChange('pillow')}
                            className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition-all ${config.type === 'pillow' ? 'bg-navy text-white shadow' : 'text-gray-500 hover:text-navy'}`}
                        >
                            Pillow
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* LEFT: Configuration Steps */}
                    <div className="w-full lg:w-2/3 bg-white rounded-sm shadow-sm p-6 md:p-8">

                        {/* Step Indicators */}
                        <div className="flex justify-between mb-8 border-b border-gray-100 pb-4">
                            {['Dimensions', 'Support', 'Comfort', 'Cover'].map((label, idx) => (
                                <div key={idx} className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wide ${step === idx + 1 ? 'text-gold' : 'text-gray-300'}`}>
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${step === idx + 1 ? 'border-gold bg-gold text-white' : 'border-gray-200'}`}>
                                        {idx + 1}
                                    </span>
                                    <span className="hidden md:inline">{label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Step 1: Dimensions */}
                        {step === 1 && (
                            <div className="animate-fade-in-up">
                                <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                                    <Ruler className="text-gold" /> Choose Dimensions ({config.type})
                                </h2>

                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Standard Size</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {Object.keys(currentSizes).map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setConfig({ ...config, size })}
                                                className={`py-3 px-4 border rounded-sm text-sm font-medium uppercase tracking-wide transition-all
                                            ${config.size === size
                                                        ? 'border-gold bg-gold/10 text-navy'
                                                        : 'border-gray-200 hover:border-gold/50 text-gray-500'}`}
                                            >
                                                {size.replace('_', ' ')}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {config.size === 'custom' && (
                                    <div className="grid grid-cols-3 gap-4 mb-6 bg-gray-50 p-4 rounded border border-dashed border-gray-300">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">Length (cm)</label>
                                            <input
                                                type="number"
                                                value={config.length}
                                                onChange={(e) => setConfig({ ...config, length: Number(e.target.value) })}
                                                className="w-full p-2 border border-gray-300 rounded focus:border-gold outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">Width (cm)</label>
                                            <input
                                                type="number"
                                                value={config.width}
                                                onChange={(e) => setConfig({ ...config, width: Number(e.target.value) })}
                                                className="w-full p-2 border border-gray-300 rounded focus:border-gold outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">Depth (cm)</label>
                                            <input
                                                type="number"
                                                value={config.depth}
                                                onChange={(e) => setConfig({ ...config, depth: Number(e.target.value) })}
                                                className="w-full p-2 border border-gray-300 rounded focus:border-gold outline-none"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Non-custom depth selector */}
                                {config.size !== 'custom' && (
                                    <div className="mb-6">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Total Depth (Thickness)</label>
                                        <div className="flex gap-4">
                                            {config.type === 'mattress'
                                                ? [15, 20, 25, 30].map(d => (
                                                    <button
                                                        key={d}
                                                        onClick={() => setConfig({ ...config, depth: d })}
                                                        className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all
                                                ${config.depth === d ? 'border-gold bg-navy text-white' : 'border-gray-200 text-gray-500 hover:border-gold'}`}
                                                    >
                                                        {d}cm
                                                    </button>
                                                ))
                                                : [10, 12, 15].map(d => (
                                                    <button
                                                        key={d}
                                                        onClick={() => setConfig({ ...config, depth: d })}
                                                        className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all
                                                ${config.depth === d ? 'border-gold bg-navy text-white' : 'border-gray-200 text-gray-500 hover:border-gold'}`}
                                                    >
                                                        {d}cm
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end">
                                    <button onClick={nextStep} className="btn-primary flex items-center gap-2">
                                        Next Step <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Core Support */}
                        {step === 2 && (
                            <div className="animate-fade-in-up">
                                <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                                    <Layers className="text-gold" /> Select {config.type === 'mattress' ? 'Core Support' : 'Fill Type'}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    <div
                                        onClick={() => setConfig({ ...config, core: 'high-density' })}
                                        className={`p-6 border-2 rounded-sm cursor-pointer transition-all ${config.core === 'high-density' ? 'border-navy bg-navy/5' : 'border-gray-200 hover:border-gold'}`}
                                    >
                                        <h3 className="font-bold text-navy mb-2">{config.type === 'mattress' ? 'High Density Foam' : 'Solid Foam Core'}</h3>
                                        <p className="text-sm text-gray-600">
                                            {config.type === 'mattress'
                                                ? 'Firm, reliable support suitable for everyday use. Best for back sleepers.'
                                                : 'A solid foam block for firm neck support.'}
                                        </p>
                                    </div>
                                    <div
                                        onClick={() => setConfig({ ...config, core: 'orthopaedic' })}
                                        className={`p-6 border-2 rounded-sm cursor-pointer transition-all ${config.core === 'orthopaedic' ? 'border-navy bg-navy/5' : 'border-gray-200 hover:border-gold'}`}
                                    >
                                        <h3 className="font-bold text-navy mb-2">{config.type === 'mattress' ? 'Orthopaedic Bonded' : 'Chip Foam Mix'}</h3>
                                        <p className="text-sm text-gray-600">
                                            {config.type === 'mattress'
                                                ? 'Extra firm support for maximum spinal alignment.'
                                                : 'A mixture of foam chips for a softer, more mouldable feel.'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <button onClick={prevStep} className="text-gray-500 font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:text-navy">
                                        <ArrowLeft className="w-4 h-4" /> Back
                                    </button>
                                    <button onClick={nextStep} className="btn-primary flex items-center gap-2">
                                        Next Step <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Top Layer */}
                        {step === 3 && (
                            <div className="animate-fade-in-up">
                                <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                                    <Sparkles className="text-gold" /> Choose {config.type === 'mattress' ? 'Comfort Layer' : 'Enhancement'}
                                </h2>

                                <div className="space-y-4 mb-8">
                                    {['none', 'memory-foam', 'latex', 'gel'].map(layer => (
                                        <div
                                            key={layer}
                                            onClick={() => setConfig({ ...config, topLayer: layer })}
                                            className={`p-4 border-2 rounded-sm cursor-pointer flex items-center justify-between transition-all 
                                        ${config.topLayer === layer ? 'border-navy bg-navy/5' : 'border-gray-200 hover:border-gold'}`}
                                        >
                                            <div>
                                                <h3 className="font-bold text-navy capitalize">{layer.replace('-', ' ')}</h3>
                                                {config.type === 'pillow' && layer !== 'none' && (
                                                    <p className="text-xs text-gray-500">Adds a layer of premium {layer.replace('-', ' ')}.</p>
                                                )}
                                            </div>
                                            {config.topLayer === layer && <Check className="text-gold w-6 h-6" />}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between">
                                    <button onClick={prevStep} className="text-gray-500 font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:text-navy">
                                        <ArrowLeft className="w-4 h-4" /> Back
                                    </button>
                                    <button onClick={nextStep} className="btn-primary flex items-center gap-2">
                                        Next Step <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Cover */}
                        {step === 4 && (
                            <div className="animate-fade-in-up">
                                <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                                    <ShieldCheck className="text-gold" /> Select Cover
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    <div
                                        onClick={() => setConfig({ ...config, cover: 'bamboo' })}
                                        className={`p-6 border-2 rounded-sm cursor-pointer transition-all ${config.cover === 'bamboo' ? 'border-navy bg-navy/5' : 'border-gray-200 hover:border-gold'}`}
                                    >
                                        <h3 className="font-bold text-navy mb-2">Bamboo Fabric</h3>
                                        <p className="text-sm text-gray-600">Breathable, hypoallergenic, and soft to the touch. Naturally regulates temperature.</p>
                                    </div>
                                    <div
                                        onClick={() => setConfig({ ...config, cover: 'waterproof' })}
                                        className={`p-6 border-2 rounded-sm cursor-pointer transition-all ${config.cover === 'waterproof' ? 'border-navy bg-navy/5' : 'border-gray-200 hover:border-gold'}`}
                                    >
                                        <h3 className="font-bold text-navy mb-2">Waterproof Terry</h3>
                                        <p className="text-sm text-gray-600">Protects against spills and accidents. Ideal for kids, pets, or medical use.</p>
                                    </div>
                                </div>

                                <div className="flex justify-start">
                                    <button onClick={prevStep} className="text-gray-500 font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:text-navy">
                                        <ArrowLeft className="w-4 h-4" /> Back
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* RIGHT: Summary & Price */}
                    <div className="w-full lg:w-1/3 bg-white rounded-sm shadow-lg p-6 sticky top-24 border-t-4 border-gold">
                        <h3 className="text-lg font-bold text-navy uppercase tracking-widest mb-6">Your Design</h3>

                        <div className="space-y-4 mb-8 text-sm">
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500">Type</span>
                                <span className="font-bold text-navy capitalize">{config.type}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500">Size</span>
                                <span className="font-bold text-navy capitalize">{config.size.replace('_', ' ')}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500">Dimensions</span>
                                <span className="font-bold text-navy">{config.length} x {config.width} x {config.depth} cm</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500">{config.type === 'mattress' ? 'Core' : 'Fill'}</span>
                                <span className="font-bold text-navy capitalize">{config.core.replace('-', ' ')}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500">{config.type === 'mattress' ? 'Comfort Layer' : 'Enhancement'}</span>
                                <span className="font-bold text-navy capitalize">{config.topLayer.replace('-', ' ')}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500">Cover</span>
                                <span className="font-bold text-navy capitalize">{config.cover}</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded mb-6 text-center">
                            <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Estimated Price</span>
                            <span className="text-3xl font-bold text-navy">R {price.toLocaleString()}</span>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="w-full btn-primary py-4 text-base shadow-xl flex items-center justify-center gap-2 hover:-translate-y-1 transition-transform"
                        >
                            <ShoppingCart className="w-5 h-5" /> Add to Cart
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-4">
                            Production time: 3-5 working days.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

// Helper icon
function Sparkles({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
    )
}
