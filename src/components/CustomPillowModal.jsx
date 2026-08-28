import React, { useState } from 'react';
import { X, CheckCircle2, Sliders, Send, Sparkles, Ruler, Info } from 'lucide-react';

/**
 * Dynamic Pillow Graphic Preview Component
 */
function DynamicPillowPreview({ width, length, thickness, border, filling }) {
    // Parse numerical values with fallbacks
    const parseNum = (val, defaultVal) => {
        if (!val) return defaultVal;
        const match = String(val).match(/\d+/);
        return match ? parseInt(match[0], 10) : defaultVal;
    };

    const widthNum = parseNum(width, 45);
    const lengthNum = parseNum(length, 70);
    const thicknessNum = parseNum(thickness, 15);

    // Compute dynamic SVG container scale
    // Base standard pillow: 45cm W x 70cm L x 15cm T
    const isBodyPillow = lengthNum >= 120 || String(length).toLowerCase().includes('body');
    
    // Scaled width (horizontal span) & height (vertical depth)
    const containerWidth = isBodyPillow ? 310 : Math.min(Math.max(160 + (widthNum - 40) * 3, 150), 300);
    const containerHeight = Math.min(Math.max(100 + (lengthNum - 60) * 1.5, 90), 180);
    
    // Puffiness / thickness bulging scale (10cm = flat, 18cm = super plump)
    const puffScale = Math.min(Math.max(thicknessNum / 15, 0.7), 1.4);
    const cornerRadius = 24 * puffScale;

    // Dynamic filling color themes & patterns with 2-line title wrapping
    const getFillingTheme = () => {
        const fill = filling.toLowerCase();
        if (fill.includes('charcoal')) {
            return {
                baseColor: '#27272a',
                pillowFill: 'url(#charcoalGrad)',
                accentColor: '#a1a1aa',
                line1: 'ACTIVATED CHARCOAL',
                line2: 'FOAM',
                subtext: 'Purifying & Odor Control',
                borderStroke: '#52525b',
                textColor: '#ffffff',
                subtextColor: 'rgba(255,255,255,0.85)',
                patternId: null
            };
        }
        if (fill.includes('hydro') || fill.includes('gel')) {
            return {
                baseColor: '#0284c7',
                pillowFill: 'url(#gelGrad)',
                accentColor: '#38bdf8',
                line1: 'HYDRO-COOL GEL',
                line2: 'MATRIX',
                subtext: 'Cool-Touch Heat Dissipation',
                borderStroke: '#0284c7',
                textColor: '#ffffff',
                subtextColor: 'rgba(255,255,255,0.9)',
                patternId: 'gelGridPattern'
            };
        }
        if (fill.includes('latex')) {
            return {
                baseColor: '#fef3c7',
                pillowFill: 'url(#latexGrad)',
                accentColor: '#d97706',
                line1: '100% NATURAL',
                line2: 'LATEX',
                subtext: 'Ventilated Natural Bounce',
                borderStroke: '#d97706',
                textColor: '#0a1530',
                subtextColor: '#475569',
                patternId: 'latexPincorePattern'
            };
        }
        if (fill.includes('cbd')) {
            return {
                baseColor: '#059669',
                pillowFill: 'url(#cbdGrad)',
                accentColor: '#34d399',
                line1: 'CBD MICRO-INFUSION',
                line2: 'FOAM',
                subtext: 'Soothing Botanical Calming',
                borderStroke: '#059669',
                textColor: '#ffffff',
                subtextColor: 'rgba(255,255,255,0.9)',
                patternId: null
            };
        }
        if (fill.includes('ball') || fill.includes('microfibre')) {
            return {
                baseColor: '#ffffff',
                pillowFill: 'url(#ballFibreGrad)',
                accentColor: '#94a3b8',
                line1: 'VIRGIN BALL FIBRE',
                line2: 'CLUSTERS',
                subtext: 'Plush Down-Alternative Loft',
                borderStroke: '#cbd5e1',
                textColor: '#0a1530',
                subtextColor: '#475569',
                patternId: 'ballFibrePattern'
            };
        }
        // Default / Normal Memory Foam / Solid Core -> Crisp Pure White Pillow
        return {
            baseColor: '#ffffff',
            pillowFill: 'url(#normalWhiteGrad)',
            accentColor: '#94a3b8',
            line1: fill.includes('chip') || fill.includes('shredded') ? 'SHREDDED MEMORY' : 'MEMORY FOAM',
            line2: fill.includes('chip') || fill.includes('shredded') ? 'CHIPS' : 'CORE',
            subtext: fill.includes('chip') ? '100% Adjustable Loft' : 'Ergonomic Posture Support',
            borderStroke: '#94a3b8',
            textColor: '#0a1530',
            subtextColor: '#475569',
            patternId: null
        };
    };

    const theme = getFillingTheme();

    // Border finish styling stroke
    const getBorderStrokeProps = () => {
        if (border.includes('Piping')) {
            return { stroke: '#d97706', strokeWidth: 3, strokeDasharray: 'none' };
        }
        if (border.includes('Mesh')) {
            return { stroke: '#0284c7', strokeWidth: 4, strokeDasharray: '4 2' };
        }
        if (border.includes('Quilted')) {
            return { stroke: '#0a1530', strokeWidth: 3, strokeDasharray: '6 3' };
        }
        // Standard Seam
        return { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: 'none' };
    };

    const borderProps = getBorderStrokeProps();

    // Responsive SVG font size calculation
    const titleFontSize = Math.min(Math.max(containerWidth / 26, 8), 10.5);
    const subtextFontSize = Math.min(Math.max(containerWidth / 33, 7), 8.5);

    return (
        <div className="bg-gradient-to-b from-[#0a1530] to-[#122246] p-6 rounded-xl text-white shadow-xl border border-gray-700 relative overflow-hidden flex flex-col justify-between min-h-[390px]">
            {/* Top Info Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 z-10">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#97BFBF]">
                        LIVE PILLOW VISUALIZER
                    </span>
                </div>
                <span className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded text-gold font-bold">
                    {widthNum}cm W × {lengthNum}cm L × {thicknessNum}cm T
                </span>
            </div>

            {/* Middle Live Graphic Visualization Canvas */}
            <div className="py-6 flex flex-col items-center justify-center relative z-10 my-auto">
                
                {/* Dynamic Realistic 3D Pillow SVG Canvas */}
                <div 
                    className="relative transition-all duration-500 ease-out flex items-center justify-center filter drop-shadow-2xl"
                    style={{ 
                        width: `${containerWidth}px`, 
                        height: `${containerHeight}px` 
                    }}
                >
                    <svg
                        width={containerWidth}
                        height={containerHeight}
                        viewBox={`0 0 ${containerWidth} ${containerHeight}`}
                        className="w-full h-full overflow-visible transition-all duration-500"
                    >
                        <defs>
                            {/* Normal Pure White Pillow Gradient */}
                            <linearGradient id="normalWhiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="50%" stopColor="#f8fafc" />
                                <stop offset="100%" stopColor="#e2e8f0" />
                            </linearGradient>

                            {/* Charcoal Gradient */}
                            <linearGradient id="charcoalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3f3f46" />
                                <stop offset="50%" stopColor="#27272a" />
                                <stop offset="100%" stopColor="#18181b" />
                            </linearGradient>

                            {/* Gel Blue Gradient */}
                            <linearGradient id="gelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#38bdf8" />
                                <stop offset="60%" stopColor="#0284c7" />
                                <stop offset="100%" stopColor="#0369a1" />
                            </linearGradient>

                            {/* Natural Latex Cream Gradient */}
                            <linearGradient id="latexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="50%" stopColor="#fef3c7" />
                                <stop offset="100%" stopColor="#fde68a" />
                            </linearGradient>

                            {/* CBD Green Gradient */}
                            <linearGradient id="cbdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#34d399" />
                                <stop offset="60%" stopColor="#059669" />
                                <stop offset="100%" stopColor="#047857" />
                            </linearGradient>

                            {/* Ball Fibre White Gradient */}
                            <linearGradient id="ballFibreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="60%" stopColor="#f8fafc" />
                                <stop offset="100%" stopColor="#e2e8f0" />
                            </linearGradient>

                            {/* Patterns for Textures */}
                            {/* Ball Fibre Cloud Clusters Pattern */}
                            <pattern id="ballFibrePattern" width="16" height="16" patternUnits="userSpaceOnUse">
                                <circle cx="8" cy="8" r="3" fill="#cbd5e1" fillOpacity="0.4" />
                                <circle cx="4" cy="4" r="2" fill="#94a3b8" fillOpacity="0.25" />
                                <circle cx="12" cy="12" r="2.5" fill="#94a3b8" fillOpacity="0.25" />
                            </pattern>

                            {/* Natural Latex Pincore Perforations Pattern */}
                            <pattern id="latexPincorePattern" width="12" height="12" patternUnits="userSpaceOnUse">
                                <circle cx="6" cy="6" r="1.8" fill="#d97706" fillOpacity="0.3" />
                            </pattern>

                            {/* Cooling Gel Grid Pattern */}
                            <pattern id="gelGridPattern" width="14" height="14" patternUnits="userSpaceOnUse">
                                <path d="M 14 0 L 0 0 0 14" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
                            </pattern>

                            {/* Radial Top Light Sheen */}
                            <radialGradient id="pillowSheen" cx="50%" cy="30%" r="60%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </radialGradient>

                            {/* Drop Shadow filter */}
                            <filter id="pillowShadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.45" />
                            </filter>
                        </defs>

                        {/* Outer Pillow Cushion Shell (Soft Curved Bulge Shape) */}
                        <rect
                            x="6"
                            y="6"
                            width={containerWidth - 12}
                            height={containerHeight - 12}
                            rx={cornerRadius}
                            ry={cornerRadius}
                            fill={theme.pillowFill}
                            stroke={theme.borderStroke}
                            strokeWidth="2"
                            filter="url(#pillowShadow)"
                            className="transition-all duration-500"
                        />

                        {/* Material Texture Pattern Overlay (if available) */}
                        {theme.patternId && (
                            <rect
                                x="6"
                                y="6"
                                width={containerWidth - 12}
                                height={containerHeight - 12}
                                rx={cornerRadius}
                                ry={cornerRadius}
                                fill={`url(#${theme.patternId})`}
                                className="pointer-events-none transition-all duration-500"
                            />
                        )}

                        {/* Top-Down Radial Lighting Sheen for 3D Volume */}
                        <rect
                            x="6"
                            y="6"
                            width={containerWidth - 12}
                            height={containerHeight - 12}
                            rx={cornerRadius}
                            ry={cornerRadius}
                            fill="url(#pillowSheen)"
                            className="pointer-events-none"
                        />

                        {/* Border Finish Trim Overlay */}
                        <rect
                            x="11"
                            y="11"
                            width={containerWidth - 22}
                            height={containerHeight - 22}
                            rx={Math.max(cornerRadius - 4, 8)}
                            ry={Math.max(cornerRadius - 4, 8)}
                            fill="none"
                            stroke={borderProps.stroke}
                            strokeWidth={borderProps.strokeWidth}
                            strokeDasharray={borderProps.strokeDasharray}
                            className="transition-all duration-500 opacity-90"
                        />

                        {/* Central Pressure Depression / Ergonomic Contour Oval */}
                        <ellipse
                            cx={containerWidth / 2}
                            cy={containerHeight / 2}
                            rx={containerWidth * 0.32}
                            ry={containerHeight * 0.28}
                            fill="white"
                            fillOpacity="0.08"
                            stroke="white"
                            strokeOpacity="0.18"
                            strokeWidth="1"
                        />

                        {/* Text Label Inside Pillow - Line 1 */}
                        <text
                            x={containerWidth / 2}
                            y={containerHeight / 2 - 10}
                            textAnchor="middle"
                            fill={theme.textColor}
                            fontSize={titleFontSize}
                            fontWeight="800"
                            letterSpacing="0.08em"
                            className="uppercase font-sans drop-shadow-sm"
                        >
                            {theme.line1}
                        </text>

                        {/* Text Label Inside Pillow - Line 2 */}
                        <text
                            x={containerWidth / 2}
                            y={containerHeight / 2 + 4}
                            textAnchor="middle"
                            fill={theme.textColor}
                            fontSize={titleFontSize}
                            fontWeight="800"
                            letterSpacing="0.08em"
                            className="uppercase font-sans drop-shadow-sm"
                        >
                            {theme.line2}
                        </text>

                        {/* Subtext Label */}
                        <text
                            x={containerWidth / 2}
                            y={containerHeight / 2 + 18}
                            textAnchor="middle"
                            fill={theme.subtextColor}
                            fontSize={subtextFontSize}
                            fontWeight="500"
                            className="font-sans"
                        >
                            {theme.subtext}
                        </text>

                        {/* Thickness Loft Badge (Top Right Corner of Canvas, Outside Text Bounds) */}
                        <g transform={`translate(${containerWidth - 44}, 12)`}>
                            <rect x="0" y="0" width="34" height="17" rx="4" fill="#0a1530" fillOpacity="0.85" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                            <text x="17" y="11.5" textAnchor="middle" fill="#97BFBF" fontSize="8" fontWeight="bold">
                                {thicknessNum}cm
                            </text>
                        </g>
                    </svg>

                </div>

                {/* Dimension Label */}
                <div className="mt-6 flex items-center gap-3 text-[11px] text-gray-300 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                    <Ruler className="w-3.5 h-3.5 text-gold" />
                    <span>Dimensions: <strong className="text-white">{widthNum}cm W × {lengthNum}cm L × {thicknessNum}cm T</strong></span>
                </div>
            </div>

            {/* Bottom Live Summary Badge */}
            <div className="bg-black/40 backdrop-blur-md p-3 rounded-lg border border-white/10 text-xs flex items-center justify-between z-10 mt-2">
                <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-bold">Selected Filling</span>
                    <span className="font-bold text-white text-[11px]">{filling}</span>
                </div>
                <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider text-gold block font-bold">Border Type</span>
                    <span className="font-bold text-[#97BFBF] text-[11px]">{border}</span>
                </div>
            </div>
        </div>
    );
}

export default function CustomPillowModal({ isOpen, onClose }) {
    const [submitted, setSubmitted] = useState(false);

    const [form, setForm] = useState({
        width: '45cm',
        customWidth: '',
        length: '70cm',
        customLength: '',
        thickness: '15cm',
        customThickness: '',
        border: 'Piping Edge',
        filling: 'Shredded Memory Foam Chips',
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

    const widthOptions = ['40cm', '45cm', '50cm', '60cm', 'Custom'];
    const lengthOptions = ['60cm', '70cm', '80cm', '90cm', '75cm', '150cm', 'Custom'];
    const thicknessOptions = ['10cm', '12cm', '15cm', '18cm', 'Custom'];
    const borderOptions = [
        { name: 'Piping Edge', desc: 'Classic clean piped seam around border' },
        { name: 'Quilted Border', desc: 'Plush quilted side paneling for extra structure' },
        { name: 'Mesh Airflow Border', desc: '3D breathable mesh ventilation strip' },
        { name: 'Standard Seam', desc: 'Slim double-stitched tailored edge' }
    ];
    const fillingOptions = [
        { name: 'Ball Fibre / Microfibre', desc: 'Soft cloud-like plushness, allergen free' },
        { name: 'Shredded Memory Foam Chips', desc: 'Adjustable, responsive loft & contouring support' },
        { name: 'Activated Charcoal Memory Foam', desc: 'Purifying & odor-absorbing temperature control' },
        { name: 'Hydro-Cool Gel & Memory Foam', desc: 'Cool-touch heat dissipation for hot sleepers' },
        { name: 'Natural Latex / Granulated Latex', desc: 'Resilient, hypoallergenic natural bounce' },
        { name: 'Infused CBD Memory Foam', desc: 'Soothing, calming relaxation sleep aid' },
        { name: 'Solid Memory Foam Core', desc: 'Ergonomic fixed contour neck support' }
    ];

    const currentWidth = form.width === 'Custom' ? (form.customWidth || 'Custom') : form.width;
    const currentLength = form.length === 'Custom' ? (form.customLength || 'Custom') : form.length;
    const currentThickness = form.thickness === 'Custom' ? (form.customThickness || 'Custom') : form.thickness;

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
                        <Sliders className="w-6 h-6 text-gold" />
                        <span className="text-xs uppercase tracking-[0.25em] text-[#97BFBF] font-bold">Fast Asleep Custom Lab</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide">
                        Custom Pillow Builder
                    </h2>
                    <p className="text-gray-300 text-xs md:text-sm mt-1 font-light max-w-2xl">
                        Adjust width, height, thickness, border finish, and filling. Watch the live graphic visualizer update in real-time.
                    </p>
                </div>

                {!submitted ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-grow">
                        
                        {/* LEFT COLUMN: Live Graphic Visualizer (Sticky Desktop) */}
                        <div className="lg:col-span-5 p-6 bg-gray-50 border-r border-gray-200 space-y-6">
                            <div className="sticky top-0 space-y-6">
                                <h3 className="text-xs font-extrabold text-[#0a1530] uppercase tracking-wider flex items-center gap-2">
                                    <Info className="w-4 h-4 text-gold" /> Live Dynamic Preview
                                </h3>

                                <DynamicPillowPreview
                                    width={currentWidth}
                                    length={currentLength}
                                    thickness={currentThickness}
                                    border={form.border}
                                    filling={form.filling}
                                />

                                <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-xs text-blue-900 leading-relaxed">
                                    <p className="font-bold mb-1 uppercase tracking-wide text-[#0a1530]">⚡ Custom Handcrafted Quality</p>
                                    All Fast Asleep custom pillows are individually filled and stitched to your exact specifications at our South African facility.
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Configuration Form Options */}
                        <form onSubmit={handleSubmit} className="lg:col-span-7 p-6 md:p-8 space-y-8">
                            
                            {/* 1. Width */}
                            <div>
                                <label className="block text-xs font-bold text-[#0a1530] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Ruler className="w-4 h-4 text-gold" /> 1. Select Pillow Width
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {widthOptions.map(w => (
                                        <button
                                            type="button"
                                            key={w}
                                            onClick={() => setForm({ ...form, width: w })}
                                            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase transition-all border ${
                                                form.width === w
                                                    ? 'bg-[#0a1530] text-white border-[#0a1530] shadow'
                                                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#0a1530]'
                                            }`}
                                        >
                                            {w}
                                        </button>
                                    ))}
                                </div>
                                {form.width === 'Custom' && (
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            placeholder="Enter custom width in cm (e.g. 55 cm)"
                                            value={form.customWidth}
                                            onChange={(e) => setForm({ ...form, customWidth: e.target.value })}
                                            className="w-full max-w-xs p-2.5 text-xs border border-gray-300 rounded-lg focus:border-[#0a1530] outline-none"
                                            required
                                        />
                                    </div>
                                )}
                            </div>

                            {/* 2. Height / Length */}
                            <div>
                                <label className="block text-xs font-bold text-[#0a1530] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Ruler className="w-4 h-4 text-gold" /> 2. Select Pillow Height / Length
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {lengthOptions.map(l => (
                                        <button
                                            type="button"
                                            key={l}
                                            onClick={() => setForm({ ...form, length: l })}
                                            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase transition-all border ${
                                                form.length === l
                                                    ? 'bg-[#0a1530] text-white border-[#0a1530] shadow'
                                                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#0a1530]'
                                            }`}
                                        >
                                            {l}
                                        </button>
                                    ))}
                                </div>
                                {form.length === 'Custom' && (
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            placeholder="Enter custom length in cm (e.g. 85 cm)"
                                            value={form.customLength}
                                            onChange={(e) => setForm({ ...form, customLength: e.target.value })}
                                            className="w-full max-w-xs p-2.5 text-xs border border-gray-300 rounded-lg focus:border-[#0a1530] outline-none"
                                            required
                                        />
                                    </div>
                                )}
                            </div>

                            {/* 3. Thickness */}
                            <div>
                                <label className="block text-xs font-bold text-[#0a1530] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Ruler className="w-4 h-4 text-gold" /> 3. Select Thickness / Depth
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {thicknessOptions.map(t => (
                                        <button
                                            type="button"
                                            key={t}
                                            onClick={() => setForm({ ...form, thickness: t })}
                                            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase transition-all border ${
                                                form.thickness === t
                                                    ? 'bg-[#0a1530] text-white border-[#0a1530] shadow'
                                                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#0a1530]'
                                            }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                                {form.thickness === 'Custom' && (
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            placeholder="Enter custom thickness in cm (e.g. 14 cm)"
                                            value={form.customThickness}
                                            onChange={(e) => setForm({ ...form, customThickness: e.target.value })}
                                            className="w-full max-w-xs p-2.5 text-xs border border-gray-300 rounded-lg focus:border-[#0a1530] outline-none"
                                            required
                                        />
                                    </div>
                                )}
                            </div>

                            {/* 4. Border Finish */}
                            <div>
                                <label className="block text-xs font-bold text-[#0a1530] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-gold" /> 4. Select Border & Edge Finish
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {borderOptions.map(b => (
                                        <div
                                            key={b.name}
                                            onClick={() => setForm({ ...form, border: b.name })}
                                            className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                                                form.border === b.name
                                                    ? 'bg-[#0a1530]/5 border-[#0a1530] ring-1 ring-[#0a1530]'
                                                    : 'bg-white border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-[#0a1530] uppercase">{b.name}</span>
                                                {form.border === b.name && <CheckCircle2 className="w-4 h-4 text-[#0a1530]" />}
                                            </div>
                                            <p className="text-[11px] text-gray-500 mt-1">{b.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 5. Filling Material */}
                            <div>
                                <label className="block text-xs font-bold text-[#0a1530] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-gold" /> 5. Select Filling Type / Material
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {fillingOptions.map(f => (
                                        <div
                                            key={f.name}
                                            onClick={() => setForm({ ...form, filling: f.name })}
                                            className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                                                form.filling === f.name
                                                    ? 'bg-[#0a1530]/5 border-[#0a1530] ring-1 ring-[#0a1530]'
                                                    : 'bg-white border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-[#0a1530] uppercase">{f.name}</span>
                                                {form.filling === f.name && <CheckCircle2 className="w-4 h-4 text-[#0a1530]" />}
                                            </div>
                                            <p className="text-[11px] text-gray-500 mt-1">{f.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Details */}
                            <div className="pt-6 border-t border-gray-200 space-y-4">
                                <h3 className="text-sm font-extrabold text-[#0a1530] uppercase tracking-wider">
                                    Your Contact Details to Receive Quote & Delivery Info
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-600 mb-1">Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Sarah Jenkins"
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
                                            placeholder="sarah@example.com"
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
                                            placeholder="082 123 4567"
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            className="w-full p-2.5 text-xs border border-gray-300 rounded-lg focus:border-[#0a1530] outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Delivery City & Special Instructions (Optional)</label>
                                    <textarea
                                        rows="2"
                                        placeholder="Any specific density, zip preferences or delivery notes..."
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
                                    <Send className="w-4 h-4 text-gold" /> Submit Custom Pillow Request
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
                            Custom Pillow Request Submitted!
                        </h3>
                        <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                            Thank you <span className="font-bold text-[#0a1530]">{form.name}</span>. We have received your specifications for a custom <span className="font-bold text-[#0a1530]">{currentWidth} x {currentLength}</span> pillow in <span className="font-bold text-[#0a1530]">{form.filling}</span> with <span className="font-bold text-[#0a1530]">{form.border}</span>.
                        </p>
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg max-w-lg mx-auto text-left text-xs text-gray-600 space-y-1">
                            <div><span className="font-bold">Contact:</span> {form.email} | {form.phone}</div>
                            <div><span className="font-bold">Thickness:</span> {currentThickness}</div>
                            <div><span className="font-bold">Status:</span> Pending custom quote review</div>
                        </div>
                        <p className="text-xs text-gray-400">
                            Our master craftsman team will contact you within 24 hours with your quote and lead time.
                        </p>
                        <button
                            onClick={handleReset}
                            className="px-8 py-3 bg-[#0a1530] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#122246] transition-colors mx-auto"
                        >
                            Close Builder
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
