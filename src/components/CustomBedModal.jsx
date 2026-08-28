import React, { useState } from 'react';
import { X, CheckCircle2, BedDouble, Send, Sparkles, ShieldCheck, Info, Palette } from 'lucide-react';

/**
 * Dynamic Bed & Mattress Graphic Preview Component
 */
function DynamicBedPreview({ size, foamType, firmness, colour, accessories }) {
    // Map colour to hex
    const colourMap = {
        'Charcoal Gray': '#374151',
        'Linen Cream': '#d97706',
        'Midnight Navy': '#0A1530',
        'Slate Silver': '#9CA3AF',
        'Warm Taupe': '#8B7E74',
        'Soft White': '#e2e8f0'
    };

    const bedColor = colourMap[colour] || '#374151';
    const hasPillows = accessories.toLowerCase().includes('pillow');

    // Dynamic width & height calculations based on selected bed size
    const sizeLower = String(size).toLowerCase();
    
    let scaleWidthPx = 270; // Default Queen width
    let pillowCount = 2;
    let extraLengthHeight = 0;

    if (sizeLower.includes('single')) {
        scaleWidthPx = 180;
        pillowCount = 1;
    } else if (sizeLower.includes('three quarter') || sizeLower.includes('3/4') || sizeLower.includes('107')) {
        scaleWidthPx = 210;
        pillowCount = 1;
    } else if (sizeLower.includes('double')) {
        scaleWidthPx = 240;
        pillowCount = 2;
    } else if (sizeLower.includes('queen')) {
        scaleWidthPx = 270;
        pillowCount = 2;
    } else if (sizeLower.includes('super king')) {
        scaleWidthPx = 330;
        pillowCount = 2;
    } else if (sizeLower.includes('king')) {
        scaleWidthPx = 305;
        pillowCount = 2;
    } else if (sizeLower.includes('extra length')) {
        scaleWidthPx = 270;
        extraLengthHeight = 16;
        pillowCount = 2;
    } else {
        // Custom
        const match = sizeLower.match(/(\d+)\s*x\s*(\d+)/);
        if (match) {
            const w = parseInt(match[2], 10) || 150;
            scaleWidthPx = Math.min(Math.max((w / 150) * 270, 170), 330);
        }
    }

    // Dynamic foam layer color styling
    const getFoamTheme = () => {
        const foam = foamType.toLowerCase();
        if (foam.includes('latex')) {
            return { bg: 'bg-amber-100', text: 'text-amber-900', label: 'Natural Latex Layer' };
        }
        if (foam.includes('gel')) {
            return { bg: 'bg-sky-100', text: 'text-sky-900', label: 'Cooling Gel Foam' };
        }
        if (foam.includes('hybrid')) {
            return { bg: 'bg-emerald-100', text: 'text-emerald-900', label: 'Dual Layer Hybrid' };
        }
        // Default Memory Foam
        return { bg: 'bg-blue-100', text: 'text-blue-900', label: 'High-End Memory Foam' };
    };

    const foamTheme = getFoamTheme();

    return (
        <div className="bg-gradient-to-b from-[#0a1530] to-[#122246] p-6 rounded-xl text-white shadow-xl border border-gray-700 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
            {/* Top Info Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 z-10">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#97BFBF]">
                        LIVE BED STUDIO VISUALIZER
                    </span>
                </div>
                <span className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded text-gold font-bold">
                    {size.split(' ')[0]}
                </span>
            </div>

            {/* Middle Live Graphic Visualization Canvas */}
            <div className="py-4 md:py-6 flex flex-col items-center justify-center relative z-10 my-auto w-full">
                
                {/* 3D Bed Graphic Profile - Dynamically Scaled */}
                <div 
                    className="relative transition-all duration-500 ease-out flex flex-col items-center filter drop-shadow-2xl mx-auto max-w-full overflow-hidden"
                    style={{ width: `${scaleWidthPx}px` }}
                >
                    {/* Headboard */}
                    <div 
                        className="w-full rounded-t-xl transition-all duration-500 border-2 border-white/20 shadow-md flex items-center justify-center relative overflow-hidden"
                        style={{ 
                            backgroundColor: bedColor, 
                            height: `${60 + extraLengthHeight / 2}px` 
                        }}
                    >
                        <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-white/90 drop-shadow">
                            {colour} Headboard
                        </span>
                    </div>

                    {/* Pillows on Bed (if selected) */}
                    {hasPillows && (
                        <div className="w-[90%] flex justify-around -mt-4 mb-1 z-20 transition-all duration-500">
                            {pillowCount === 1 ? (
                                <div className="w-24 h-6 bg-white rounded-lg border border-gray-300 shadow-md flex items-center justify-center text-[8px] font-bold text-[#0a1530]">
                                    Pillow (Single)
                                </div>
                            ) : (
                                <>
                                    <div className="w-20 h-6 bg-white rounded-lg border border-gray-300 shadow-md flex items-center justify-center text-[8px] font-bold text-[#0a1530]">
                                        Pillow 1
                                    </div>
                                    <div className="w-20 h-6 bg-white rounded-lg border border-gray-300 shadow-md flex items-center justify-center text-[8px] font-bold text-[#0a1530]">
                                        Pillow 2
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* Mattress Top Layer */}
                    <div 
                        className="w-full bg-white rounded-t-lg border-2 border-white shadow-xl flex flex-col justify-between p-2 relative z-10 transition-all duration-500"
                        style={{ height: `${64 + extraLengthHeight}px` }}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black uppercase tracking-wider text-[#0a1530]">
                                {size.split(' ')[0]} Mattress
                            </span>
                            <span className="text-[8px] bg-gold/20 text-[#0a1530] font-bold px-1.5 py-0.5 rounded">
                                {firmness.split(' ')[0]}
                            </span>
                        </div>
                        <div className={`w-full py-1 ${foamTheme.bg} rounded text-center transition-all duration-300`}>
                            <span className={`text-[9px] font-bold ${foamTheme.text} uppercase tracking-tight block truncate px-1`}>
                                {foamTheme.label}
                            </span>
                        </div>
                    </div>

                    {/* Bed Base */}
                    <div 
                        className="w-full h-10 rounded-b-lg transition-all duration-500 border-2 border-white/10 shadow-lg flex items-center justify-center text-[9px] font-bold uppercase tracking-wider text-white"
                        style={{ backgroundColor: bedColor }}
                    >
                        Upholstered Base Frame
                    </div>
                </div>

                {/* Foam Layer Info Badge */}
                <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                    <span>Firmness: <strong className="text-white">{firmness}</strong></span>
                </div>
            </div>

            {/* Bottom Live Summary Badge */}
            <div className="bg-black/40 backdrop-blur-md p-3 rounded-lg border border-white/10 text-xs flex items-center justify-between z-10">
                <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-bold">Base Colour</span>
                    <span className="font-bold text-white text-[11px]">{colour}</span>
                </div>
                <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider text-gold block font-bold">Accessories</span>
                    <span className="font-bold text-[#97BFBF] text-[11px]">{hasPillows ? `${pillowCount} Pillow(s) Included` : 'Bed Only'}</span>
                </div>
            </div>
        </div>
    );
}

export default function CustomBedModal({ isOpen, onClose }) {
    const [submitted, setSubmitted] = useState(false);

    const [form, setForm] = useState({
        size: 'Queen (188 x 152 cm)',
        customSize: '',
        foamType: 'High-End Memory Foam Top + High Density Core',
        firmness: 'Medium-Firm (Optimal Support)',
        colour: 'Charcoal Gray',
        accessories: 'Add 2x Memory Foam Pillows (+R950)',
        name: '',
        email: '',
        phone: '',
        notes: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleReset = () => {
        setSubmitted(false);
        onClose();
    };

    const sizeOptions = [
        'Single (188 x 91 cm)',
        'Three Quarter (188 x 107 cm)',
        'Double (188 x 137 cm)',
        'Queen (188 x 152 cm)',
        'King (188 x 183 cm)',
        'Super King (200 x 200 cm)',
        'Extra Length (+12cm)',
        'Custom'
    ];

    const foamOptions = [
        {
            category: 'High-End Luxury Tier',
            name: 'High-End Memory Foam Top + High Density Core',
            desc: 'Ultra-plush pressure relief cradling body weight with zero movement transfer'
        },
        {
            category: 'High-End Luxury Tier',
            name: 'High-End Natural Latex Top + Orthopaedic Core',
            desc: 'Natural eco-friendly latex bounce with heavy-duty spinal posture support'
        },
        {
            category: 'Middle Comfort Tier',
            name: 'Middle Gel Foam Top + Pocket Spring Core',
            desc: 'Cooling gel layer over independent pocket springs for active airflow'
        },
        {
            category: 'Middle Comfort Tier',
            name: 'Middle Comfort Foam + Heavy-Duty Bronnel Springs',
            desc: 'Durable everyday comfort engineered for heavy structural loads'
        },
        {
            category: 'Hybrid Masterpiece',
            name: 'Dual Layer Hybrid (Natural Latex + Memory Foam)',
            desc: 'Combines memory foam pressure relief with responsive latex bounce'
        }
    ];

    const firmnessOptions = [
        { name: 'Soft', desc: 'Plush cradling feel for side sleepers' },
        { name: 'Medium-Soft', desc: 'Balanced gentle cushioning' },
        { name: 'Medium-Firm (Optimal Support)', desc: 'Recommended for back & mixed sleepers' },
        { name: 'Firm', desc: 'Deep posture alignment & spinal stability' },
        { name: 'Extra Firm', desc: 'Rigid orthopaedic support for heavy duty needs' }
    ];

    const colourOptions = [
        { name: 'Charcoal Gray', hex: '#374151' },
        { name: 'Linen Cream', hex: '#d97706' },
        { name: 'Midnight Navy', hex: '#0A1530' },
        { name: 'Slate Silver', hex: '#9CA3AF' },
        { name: 'Warm Taupe', hex: '#8B7E74' },
        { name: 'Soft White', hex: '#e2e8f0' }
    ];

    const accessoryOptions = [
        { name: 'No Accessories (Bed Only)', desc: 'Just the custom mattress / base set' },
        { name: 'Add 2x Memory Foam Pillows (+R950)', desc: '2x Ergonomic memory foam bed pillows' },
        { name: 'Add 2x Dual Pillows (+R1,200)', desc: '2x Dual side Memory & Latex pillows' },
        { name: 'Add 2x Hydro-Cool Gel Pillows (+R1,400)', desc: '2x Hydro-cool gel temperature regulating pillows' },
        { name: 'Add Waterproof Mattress Protector (+R450)', desc: 'Bamboo waterproof fitted mattress protector' }
    ];

    const currentSize = form.size === 'Custom' ? (form.customSize || 'Custom') : form.size;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-navy/80 backdrop-blur-md overflow-y-auto animate-fade-in">
            <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4 border border-gray-200 flex flex-col max-h-[92vh]">
                
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-gray-100 hover:bg-navy hover:text-white transition-colors flex items-center justify-center text-gray-600 shadow-md"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="bg-[#0a1530] text-white p-6 md:p-8 border-b border-gold/30 flex-shrink-0">
                    <div className="flex items-center gap-3 mb-1">
                        <BedDouble className="w-6 h-6 text-gold" />
                        <span className="text-xs uppercase tracking-[0.25em] text-[#97BFBF] font-bold">Fast Asleep Custom Bed Studio</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide">
                        Custom Bed & Mattress Builder
                    </h2>
                    <p className="text-gray-300 text-xs md:text-sm mt-1 font-light max-w-2xl">
                        Select size, foam composition (high-end or middle), firmness, fabric colour, and accessories while reviewing the live preview.
                    </p>
                </div>

                {!submitted ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-grow">
                        
                        {/* LEFT COLUMN: Live Graphic Visualizer (Sticky Desktop) */}
                        <div className="lg:col-span-5 p-6 bg-gray-50 border-r border-gray-200 space-y-6">
                            <div className="sticky top-0 space-y-6">
                                <h3 className="text-xs font-extrabold text-[#0a1530] uppercase tracking-wider flex items-center gap-2">
                                    <Info className="w-4 h-4 text-gold" /> Live Bed Studio Visualizer
                                </h3>

                                <DynamicBedPreview
                                    size={currentSize}
                                    foamType={form.foamType}
                                    firmness={form.firmness}
                                    colour={form.colour}
                                    accessories={form.accessories}
                                />

                                <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-xs text-blue-900 leading-relaxed">
                                    <p className="font-bold mb-1 uppercase tracking-wide text-[#0a1530]">🛡️ 15 Year Master Warranty</p>
                                    Each custom bed set is built with heavy-duty timber frame construction and high-density foam layers.
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Configuration Form Options */}
                        <form onSubmit={handleSubmit} className="lg:col-span-7 p-6 md:p-8 space-y-8">
                            
                            {/* 1. Size & Dimensions */}
                            <div>
                                <label className="block text-xs font-bold text-[#0a1530] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <BedDouble className="w-4 h-4 text-gold" /> 1. Select Bed / Mattress Size
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {sizeOptions.map(s => (
                                        <button
                                            type="button"
                                            key={s}
                                            onClick={() => setForm({ ...form, size: s })}
                                            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase transition-all border ${
                                                form.size === s
                                                    ? 'bg-[#0a1530] text-white border-[#0a1530] shadow'
                                                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#0a1530]'
                                            }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                                {form.size === 'Custom' && (
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            placeholder="Enter custom dimensions in cm (e.g. 210 x 160 cm)"
                                            value={form.customSize}
                                            onChange={(e) => setForm({ ...form, customSize: e.target.value })}
                                            className="w-full max-w-xs p-2.5 text-xs border border-gray-300 rounded-lg focus:border-[#0a1530] outline-none"
                                            required
                                        />
                                    </div>
                                )}
                            </div>

                            {/* 2. Foam Composition (High-End & Middle Options) */}
                            <div>
                                <label className="block text-xs font-bold text-[#0a1530] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-gold" /> 2. Select Foam Tier & Core Composition
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {foamOptions.map(f => (
                                        <div
                                            key={f.name}
                                            onClick={() => setForm({ ...form, foamType: f.name })}
                                            className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                                                form.foamType === f.name
                                                    ? 'bg-[#0a1530]/5 border-[#0a1530] ring-1 ring-[#0a1530]'
                                                    : 'bg-white border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[10px] font-bold text-gold uppercase tracking-wider">{f.category}</span>
                                                {form.foamType === f.name && <CheckCircle2 className="w-4 h-4 text-[#0a1530]" />}
                                            </div>
                                            <h4 className="text-xs font-bold text-[#0a1530] uppercase">{f.name}</h4>
                                            <p className="text-[11px] text-gray-500 mt-1">{f.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 3. Firmness Level */}
                            <div>
                                <label className="block text-xs font-bold text-[#0a1530] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-gold" /> 3. Select Firmness Level
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {firmnessOptions.map(firm => (
                                        <div
                                            key={firm.name}
                                            onClick={() => setForm({ ...form, firmness: firm.name })}
                                            className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                                form.firmness === firm.name
                                                    ? 'bg-[#0a1530]/5 border-[#0a1530] ring-1 ring-[#0a1530]'
                                                    : 'bg-white border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-[#0a1530] uppercase">{firm.name}</span>
                                                {form.firmness === firm.name && <CheckCircle2 className="w-4 h-4 text-[#0a1530]" />}
                                            </div>
                                            <p className="text-[10px] text-gray-500 mt-1">{firm.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 4. Fabric & Base Colour */}
                            <div>
                                <label className="block text-xs font-bold text-[#0a1530] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Palette className="w-4 h-4 text-gold" /> 4. Select Base Upholstery Colour
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                                    {colourOptions.map(c => (
                                        <div
                                            key={c.name}
                                            onClick={() => setForm({ ...form, colour: c.name })}
                                            className={`p-3 rounded-lg border flex flex-col items-center text-center cursor-pointer transition-all ${
                                                form.colour === c.name
                                                    ? 'border-[#0a1530] ring-2 ring-[#0a1530] bg-gray-50'
                                                    : 'border-gray-200 hover:border-gray-300 bg-white'
                                            }`}
                                        >
                                            <div
                                                className="w-8 h-8 rounded-full border border-gray-300 shadow-sm mb-2"
                                                style={{ backgroundColor: c.hex }}
                                            ></div>
                                            <span className="text-[11px] font-bold text-[#0a1530] uppercase leading-tight">{c.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 5. Add Pillows or Accessories */}
                            <div>
                                <label className="block text-xs font-bold text-[#0a1530] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-gold" /> 5. Add Pillows or Accessories?
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {accessoryOptions.map(acc => (
                                        <div
                                            key={acc.name}
                                            onClick={() => setForm({ ...form, accessories: acc.name })}
                                            className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                                                form.accessories === acc.name
                                                    ? 'bg-[#0a1530]/5 border-[#0a1530] ring-1 ring-[#0a1530]'
                                                    : 'bg-white border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-[#0a1530] uppercase">{acc.name}</span>
                                                {form.accessories === acc.name && <CheckCircle2 className="w-4 h-4 text-[#0a1530]" />}
                                            </div>
                                            <p className="text-[11px] text-gray-500 mt-1">{acc.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Details */}
                            <div className="pt-6 border-t border-gray-200 space-y-4">
                                <h3 className="text-sm font-extrabold text-[#0a1530] uppercase tracking-wider">
                                    Your Contact Details to Receive Custom Bed Quote & Delivery Info
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-600 mb-1">Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. David Miller"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            className="w-full p-2.5 text-xs border border-gray-300 rounded-lg focus:border-[#0a1530] outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-600 mb-1">Email Address *</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="david@example.com"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            className="w-full p-2.5 text-xs border border-gray-300 rounded-lg focus:border-[#0a1530] outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-600 mb-1">Phone Number *</label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="083 987 6543"
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            className="w-full p-2.5 text-xs border border-gray-300 rounded-lg focus:border-[#0a1530] outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Delivery City & Special Custom Notes (Optional)</label>
                                    <textarea
                                        rows="2"
                                        placeholder="Any specific height, frame, headboard bracket, or delivery requirements..."
                                        value={form.notes}
                                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                        className="w-full p-2.5 text-xs border border-gray-300 rounded-lg focus:border-[#0a1530] outline-none"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[#0a1530] hover:bg-[#122246] text-white font-extrabold uppercase tracking-widest text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <Send className="w-4 h-4 text-gold" /> Submit Custom Bed Request
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    /* Confirmation Screen */
                    <div className="p-8 md:p-12 text-center space-y-6 flex-grow flex flex-col justify-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0a1530] uppercase tracking-wide">
                            Custom Bed Request Submitted!
                        </h3>
                        <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                            Thank you <span className="font-bold text-[#0a1530]">{form.name}</span>. Your custom request for a <span className="font-bold text-[#0a1530]">{currentSize}</span> bed in <span className="font-bold text-[#0a1530]">{form.colour}</span> with <span className="font-bold text-[#0a1530]">{form.foamType}</span> ({form.firmness}) has been received.
                        </p>
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg max-w-lg mx-auto text-left text-xs text-gray-600 space-y-1">
                            <div><span className="font-bold">Contact:</span> {form.email} | {form.phone}</div>
                            <div><span className="font-bold">Accessories:</span> {form.accessories}</div>
                            <div><span className="font-bold">Status:</span> Pending custom bed design quote</div>
                        </div>
                        <p className="text-xs text-gray-400">
                            Our bed design specialist will contact you within 24 hours with your design estimate and delivery details.
                        </p>
                        <button
                            onClick={handleReset}
                            className="px-8 py-3 bg-[#0a1530] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#122246] transition-colors mx-auto"
                        >
                            Close Studio
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
