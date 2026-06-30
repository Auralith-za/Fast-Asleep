import React, { useState, useEffect } from 'react';
// import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Star, Truck, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { fetchProductVariations } from '../services/woocommerce';
import CustomisationSection from './CustomisationSection';

export default function ProductDetail({ productId, onBack, products, onNavigate }) {
    const product = products.find(p => p.id === productId);
    const { addToCart } = useCart();
    const [selectedVariants, setSelectedVariants] = useState({});
    const [variationsData, setVariationsData] = useState([]);
    const [displayedPrice, setDisplayedPrice] = useState(product ? product.priceRange : '');
    const [exactPrice, setExactPrice] = useState(null);
    const [variationId, setVariationId] = useState(null);
    const [variationAttributes, setVariationAttributes] = useState([]);
    const [isLoadingVars, setIsLoadingVars] = useState(false);
    const [activeTab, setActiveTab] = useState('features');

    // 1. Setup Defaults
    React.useEffect(() => {
        if (product && product.attributes) {
            setDisplayedPrice(product.priceRange);
            setExactPrice(null);
            setVariationId(null);
            setVariationAttributes([]);
            const defaults = {};
            product.attributes.forEach(attr => {
                if (attr.options && attr.options.length > 0) {
                    defaults[attr.name] = attr.options[0];
                }
            });
            setSelectedVariants(defaults);
        }
    }, [product]);

    // 2. Load API Variations for this specific product
    React.useEffect(() => {
        if (!product || !product.attributes || product.attributes.length === 0) return;
        
        let isMounted = true;
        const loadVars = async () => {
            setIsLoadingVars(true);
            const data = await fetchProductVariations(product.id);
            if (isMounted && data && data.length > 0) {
                setVariationsData(data);
            }
            if (isMounted) setIsLoadingVars(false);
        };
        loadVars();
        return () => { isMounted = false; };
    }, [product]);

    // 3. Match user selection against API variations to grab live price
    React.useEffect(() => {
        if (variationsData.length === 0 || !product) return;

        const sanitizeStr = (str) => {
            if (!str) return '';
            try {
                const doc = new DOMParser().parseFromString(str, 'text/html');
                let text = (doc.body.textContent || '').trim().toLowerCase();
                // Replace dashes and underscores with spaces to match slugs to labels
                return text.replace(/[-_]/g, ' ').replace(/\s+/g, ' ');
            } catch (e) {
                return String(str).trim().toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ');
            }
        };

        // Count how many attributes the product/user has selected
        const userAttrCount = Object.keys(selectedVariants).length;

        // Try to find an exact match across all user-selected attributes
        const match = variationsData.find(v => {
            if (!v.attributes || v.attributes.length === 0) return false;

            // Each variation attribute must match the user's selection
            return v.attributes.every(attr => {
                // If the variation option is empty, it means "Any" in WooCommerce, so it matches whatever the user selected.
                if (!attr.option || attr.option === '') return true;

                const cleanAttrName = sanitizeStr(attr.name);
                const matchedKey = Object.keys(selectedVariants).find(
                    k => sanitizeStr(k) === cleanAttrName
                );
                if (!matchedKey) return true; // If we don't have this attribute selected yet, assume it might match
                return sanitizeStr(selectedVariants[matchedKey]) === sanitizeStr(attr.option);
            });
        });

        // Resolve the best price from the variation (sale_price takes priority, fallback to regular_price)
        const resolvePrice = (v) => {
            const sale = parseFloat(v.sale_price);
            const regular = parseFloat(v.regular_price);
            const base = parseFloat(v.price);
            if (!isNaN(sale) && sale > 0) return sale;
            if (!isNaN(base) && base > 0) return base;
            if (!isNaN(regular) && regular > 0) return regular;
            return null;
        };

        if (match) {
            const priceVal = resolvePrice(match);
            if (priceVal !== null) {
                // Store the variation id and attributes for order creation
                setVariationId(match.id || null);
                setVariationAttributes(match.attributes || []);

                if (product.isFathersDaySale && !product.noFathersDay20Percent) {
                    const discountedPrice = priceVal * 0.8;
                    setDisplayedPrice(
                        <div className="flex flex-col items-center sm:items-start gap-1">
                            <span className="text-xs text-rose-500 font-extrabold uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded inline-block">Fathers Day Sale - 20% OFF</span>
                            <div className="flex items-center gap-3">
                                <span className="text-lg text-gray-400 line-through font-medium">R{priceVal.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                                <span className="text-3xl font-extrabold text-[#0a1530]">R{discountedPrice.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                    );
                    setExactPrice(discountedPrice.toFixed(2));
                } else {
                    setDisplayedPrice(`R${priceVal.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`);
                    setExactPrice(priceVal.toFixed(2));
                }
                return;
            }
        }

        // No match found — fall back to product price range
        setVariationId(null);
        setVariationAttributes([]);
        if (product.isFathersDaySale && product.originalPriceRange) {
            setDisplayedPrice(
                <div className="flex flex-col items-center sm:items-start gap-1">
                    <span className="text-xs text-rose-500 font-extrabold uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded inline-block">Fathers Day Sale - 20% OFF</span>
                    <div className="flex items-center gap-3">
                        <span className="text-lg text-gray-400 line-through font-medium">{product.originalPriceRange}</span>
                        <span className="text-3xl font-extrabold text-[#0a1530]">{product.priceRange}</span>
                    </div>
                </div>
            );
        } else {
            setDisplayedPrice(product.priceRange);
        }
        setExactPrice(null);
    }, [selectedVariants, variationsData, product]);

    if (!product) return <div>Product not found</div>;

    const handleAddToCart = () => {
        const variantString = product.attributes && product.attributes.length > 0
            ? Object.entries(selectedVariants).map(([k, v]) => `${k}: ${v}`).join(', ')
            : 'Standard';

        const cartItemToPass = { ...product };

        // Store the exact price so the cart total and checkout are correct
        if (exactPrice) {
            cartItemToPass.exactPrice = exactPrice;
        }

        // Store the variant label for display in the cart drawer
        cartItemToPass.variantLabel = variantString;

        // Pass variation_id and its attributes so the WooCommerce order is created correctly
        if (variationId) {
            cartItemToPass.variationId = variationId;
            cartItemToPass.variationAttributes = variationAttributes;
        }

        addToCart(cartItemToPass, 1, variantString);
    };

    return (
        <div className="bg-white pt-6 pb-0">
            <div className="container-custom">
                {/* Breadcrumb / Back */}
                <button
                    onClick={onBack}
                    className="text-sm text-gray-500 hover:text-navy mb-8 flex items-center gap-2 uppercase tracking-wide font-medium"
                >
                    &larr; Back to Information
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left: Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100 rounded-none">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover object-center"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800';
                                }}
                            />
                        </div>

                        {/* Only show gallery thumbnails if not a Fathers Day product */}
                        {!product.isFathersDaySale && (
                            <div className="grid grid-cols-4 gap-4">
                                {/* Placeholder thumbnails */}
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100 cursor-pointer opacity-70 hover:opacity-100">
                                        <img
                                            src={product.image}
                                            alt={`Thumbnail ${i}`}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800';
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col">
                        <h1 className="text-3xl md:text-4xl font-bold text-navy uppercase tracking-wide mb-2">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex text-gold">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500 font-medium">12 Reviews</span>
                        </div>

                        <p className="text-2xl font-bold text-navy mb-8 flex items-center gap-3 min-h-[2.5rem]">
                            {isLoadingVars ? (
                                <span className="flex items-center gap-2 text-gray-400 text-base font-medium">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Loading prices...
                                </span>
                            ) : (
                                displayedPrice
                            )}
                        </p>

                        <div className="prose prose-sm text-gray-600 mb-8 leading-relaxed">
                            <p>{product.description}</p>
                        </div>

                        {/* Dynamic Variants */}
                        {product.attributes && product.attributes.length > 0 && (
                            <div className="mb-8 space-y-6">
                                {product.attributes.map(attr => (
                                    <div key={attr.id || attr.name}>
                                        <label className="block text-sm font-bold text-navy uppercase tracking-wide mb-3">
                                            {attr.name}
                                        </label>
                                        <div className="flex flex-wrap gap-3">
                                            {attr.options.map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => setSelectedVariants(prev => ({ ...prev, [attr.name]: option }))}
                                                    className={`px-4 py-3 border text-sm font-medium transition-all ${selectedVariants[attr.name] === option
                                                        ? 'border-navy bg-navy text-white'
                                                        : 'border-gray-200 text-gray-600 hover:border-navy'
                                                        }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            disabled={isLoadingVars}
                            className="btn-primary w-full py-4 text-base mb-6 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoadingVars ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Loading prices...</>
                            ) : 'Add to Cart'}
                        </button>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 bg-gray-50 p-6">
                            <div className="flex items-center gap-3">
                                <Truck className="w-5 h-5 text-gold" />
                                <span>Free Delivery Nationwide</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-gold" />
                                <span>100 Night Trial</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-gold" />
                                <span>2 Year Guarantee</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-gold" />
                                <span>15 Year Warranty</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Custom Category Specific Visuals */}
            {(() => {
                const category = (product.category || '').toLowerCase();
                const categories = (product.categories || []).map(c => c.toLowerCase());
                
                const isPillow = category.includes('pillow') || categories.some(c => c.includes('pillow')) || product.name.toLowerCase().includes('pillow');
                const isBase = category.includes('base') || category.includes('bed') || categories.some(c => c.includes('base')) || categories.some(c => c.includes('bed')) || product.name.toLowerCase().includes('base') || product.name.toLowerCase().includes('frame');
                const isTopper = category.includes('topper') || categories.some(c => c.includes('topper')) || product.name.toLowerCase().includes('topper');
                const isBaby = category.includes('babies') || category.includes('kids') || categories.some(c => c.includes('babies') || c.includes('kids')) || product.name.toLowerCase().includes('baby') || product.name.toLowerCase().includes('cot') || product.name.toLowerCase().includes('changing mat') || product.name.toLowerCase().includes('bumper') || product.name.toLowerCase().includes('snooz buddy') || product.name.toLowerCase().includes('kids');
                const isPaedicSupport = category.includes('paedic') || categories.some(c => c.includes('paedic')) || product.name.toLowerCase().includes('paedic') || product.name.toLowerCase().includes('wedge') || product.name.toLowerCase().includes('elevation') || product.name.toLowerCase().includes('support') || product.name.toLowerCase().includes('lounger') || product.name.toLowerCase().includes('cushion') || product.name.toLowerCase().includes('roll');
                const isK9 = category.includes('k9') || categories.some(c => c.includes('k9') || c.includes('pet')) || product.name.toLowerCase().includes('dog') || product.name.toLowerCase().includes('pet') || product.name.toLowerCase().includes('k9');
                const isMattress = (category.includes('mattress') || categories.some(c => c.includes('mattress')) || product.name.toLowerCase().includes('pc') || product.name.toLowerCase().includes('cool') || product.name.toLowerCase().includes('eclipse') || product.name.toLowerCase().includes('plush') || product.name.toLowerCase().includes('bronnel')) && !isTopper && !isBaby && !isK9 && !isPaedicSupport;

                if (isMattress) {
                    return (
                        <div className="mt-24 space-y-24 border-t border-gray-100 pt-16 pb-0">
                            {/* Consolidated Custom Designed Mattresses Section */}
                            <CustomisationSection onNavigate={onNavigate} />

                            {/* 3. 100 Night Trial (Crisp White Background) */}
                            <div className="relative min-h-[500px] bg-white py-20 px-6 text-navy flex items-center justify-center border-b border-gray-150">
                                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    <div className="space-y-6 text-center lg:text-left">
                                        <span className="text-xs uppercase tracking-[0.25em] text-[#97BFBF] font-bold block">Peaceful Sleep</span>
                                        <h3 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide leading-tight text-[#0a1530]">
                                            100 Night Risk-Free Trial
                                        </h3>
                                        <p className="text-gray-600 text-base md:text-lg max-w-lg leading-relaxed font-light mx-auto lg:mx-0">
                                            Experience better sleep on {product.name} with complete peace of mind. If it's not your perfect fit, we'll collect it and refund you in full.
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 border border-gray-255 p-8 md:p-10 space-y-8">
                                        {/* Point 1 */}
                                        <div className="flex gap-6 items-start">
                                            <div className="flex flex-col items-center">
                                                <div className="w-5 h-5 rounded-full bg-[#97BFBF] border-4 border-white flex items-center justify-center shadow"></div>
                                                <div className="w-[2px] h-12 bg-gray-200"></div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm uppercase tracking-wider text-[#0a1530]">Night 1 | Initial sleeping</h4>
                                                <p className="text-xs text-gray-500 mt-1">Place your mattress in your bedroom and enjoy your first night of deep rest.</p>
                                            </div>
                                        </div>

                                        {/* Point 2 */}
                                        <div className="flex gap-6 items-start">
                                            <div className="flex flex-col items-center">
                                                <div className="w-5 h-5 rounded-full bg-white border-4 border-[#97BFBF] flex items-center justify-center shadow"></div>
                                                <div className="w-[2px] h-12 bg-gray-200"></div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm uppercase tracking-wider text-[#0a1530]">Night 30 | First Checkpoint</h4>
                                                <p className="text-xs text-gray-500 mt-1">Sleep on one firmness setting for 30 nights to let your body adjust.</p>
                                            </div>
                                        </div>

                                        {/* Point 3 */}
                                        <div className="flex gap-6 items-start">
                                            <div className="flex flex-col items-center">
                                                <div className="w-5 h-5 rounded-full bg-white border-4 border-[#97BFBF] flex items-center justify-center shadow"></div>
                                                <div className="w-[2px] h-12 bg-gray-200"></div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm uppercase tracking-wider text-[#0a1530]">Night 60 | Second Checkpoint</h4>
                                                <p className="text-xs text-gray-500 mt-1">Not loving it yet? Flip to a different firmness and try another 30 nights.</p>
                                            </div>
                                        </div>

                                        {/* Point 4 */}
                                        <div className="flex gap-6 items-start">
                                            <div className="flex flex-col items-center">
                                                <div className="w-5 h-5 rounded-full bg-white border-4 border-[#97BFBF] flex items-center justify-center shadow"></div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm uppercase tracking-wider text-[#0a1530]">Night 60 - 100 | Return Option</h4>
                                                <p className="text-xs text-gray-500 mt-1">Still not satisfied after 60 nights? We'll collect your mattress for free and refund you in full.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }

                if (isPillow) {
                    return (
                        <div className="mt-24 space-y-24 border-t border-gray-100 pt-16 pb-0">
                            {/* Comfort / Loft Level Selector */}
                            <div className="text-center">
                                <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-[#0a1530] mb-2 px-4">
                                    CHOOSE YOUR COMFORT loft & height FOR {product.name}
                                </h3>
                                <div className="w-16 h-[2px] bg-[#97BFBF] mx-auto mb-6"></div>
                                <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base mb-12 px-4">
                                    Adjust the interior foam configurations of {product.name} to achieve your personal optimal height and comfort alignment.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                                    {/* Low Profile */}
                                    <div className="bg-white border border-gray-100 shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                                        <div className="w-full aspect-[4/3] bg-gray-55 mb-6 flex items-center justify-center border border-gray-100 relative">
                                            <svg className="w-32 h-20 text-[#97BFBF]" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M10 35 C10 25, 90 25, 90 35 C90 42, 10 42, 10 35 Z" fill="#97BFBF" fillOpacity="0.05" />
                                                <path d="M10 35 C30 32, 70 32, 90 35" strokeDasharray="3 3" />
                                            </svg>
                                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1 border border-gray-200">
                                                <span className="text-xs font-bold text-[#0a1530] uppercase tracking-wider">LOW</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">Configuration 1</span>
                                        <h4 className="font-bold text-lg text-[#0a1530] mb-4">Low Loft profile</h4>
                                        <div className="w-full border-t border-gray-100 pt-4 space-y-3">
                                            <div>
                                                <span className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">Feel</span>
                                                <span className="text-sm font-medium text-gray-700">Soft | Flat | Cradling</span>
                                            </div>
                                            <div>
                                                <span className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">Best for</span>
                                                <span className="text-sm font-medium text-gray-700">Stomach / Back Sleepers</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Medium Profile */}
                                    <div className="bg-white border border-gray-100 shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                                        <div className="w-full aspect-[4/3] bg-gray-55 mb-6 flex items-center justify-center border border-gray-100 relative">
                                            <svg className="w-32 h-20 text-[#97BFBF]" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M10 30 C10 18, 90 18, 90 30 C90 42, 10 42, 10 30 Z" fill="#97BFBF" fillOpacity="0.1" />
                                                <path d="M10 30 C30 25, 70 25, 90 30" strokeDasharray="3 3" />
                                                <path d="M10 35 C30 31, 70 31, 90 35" strokeDasharray="3 3" />
                                            </svg>
                                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1 border border-gray-200">
                                                <span className="text-xs font-bold text-[#0a1530] uppercase tracking-wider">MEDIUM</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">Configuration 2</span>
                                        <h4 className="font-bold text-lg text-[#0a1530] mb-4">Medium Loft profile</h4>
                                        <div className="w-full border-t border-gray-100 pt-4 space-y-3">
                                            <div>
                                                <span className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">Feel</span>
                                                <span className="text-sm font-medium text-gray-700">Balanced | Cradling | Dynamic</span>
                                            </div>
                                            <div>
                                                <span className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">Best for</span>
                                                <span className="text-sm font-medium text-gray-700">Back / Mixed Sleepers</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* High Profile */}
                                    <div className="bg-white border border-gray-100 shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                                        <div className="w-full aspect-[4/3] bg-gray-55 mb-6 flex items-center justify-center border border-gray-100 relative">
                                            <svg className="w-32 h-20 text-[#97BFBF]" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M10 25 C10 12, 90 12, 90 25 C90 42, 10 42, 10 25 Z" fill="#97BFBF" fillOpacity="0.15" />
                                                <path d="M10 25 C30 18, 70 18, 90 25" strokeDasharray="3 3" />
                                                <path d="M10 31 C30 24, 70 24, 90 31" strokeDasharray="3 3" />
                                                <path d="M10 37 C30 31, 70 31, 90 37" strokeDasharray="3 3" />
                                            </svg>
                                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1 border border-gray-200">
                                                <span className="text-xs font-bold text-[#0a1530] uppercase tracking-wider">HIGH</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">Configuration 3</span>
                                        <h4 className="font-bold text-lg text-[#0a1530] mb-4">High Loft profile</h4>
                                        <div className="w-full border-t border-gray-100 pt-4 space-y-3">
                                            <div>
                                                <span className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">Feel</span>
                                                <span className="text-sm font-medium text-gray-700">Firm | Plump | High loft</span>
                                            </div>
                                            <div>
                                                <span className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">Best for</span>
                                                <span className="text-sm font-medium text-gray-700">Side sleepers</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pillow Trial details (Crisp White Background) */}
                            <div className="relative min-h-[480px] bg-white py-20 px-6 text-navy flex items-center justify-center border-t border-b border-gray-150">
                                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    <div className="space-y-6 text-center lg:text-left">
                                        <span className="text-xs uppercase tracking-[0.25em] text-[#97BFBF] font-bold block">Comfort Guarantee</span>
                                        <h3 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide leading-tight text-[#0a1530]">
                                            30 Night Pillow Trial
                                        </h3>
                                        <p className="text-gray-600 text-base md:text-lg max-w-lg leading-relaxed font-light mx-auto lg:mx-0">
                                            Try it in your own bed. Sleep on your new adjustable {product.name} for 30 nights. If it's not the ideal contour or neck alignment, we'll collect it and refund you.
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 border border-gray-200 p-8 md:p-10 space-y-8">
                                        <div className="flex gap-6 items-start">
                                            <div className="flex flex-col items-center">
                                                <div className="w-5 h-5 rounded-full bg-[#97BFBF] border-4 border-white flex items-center justify-center shadow"></div>
                                                <div className="w-[2px] h-12 bg-gray-200"></div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm uppercase tracking-wider text-[#0a1530]">Night 1 | Unbox & Setup</h4>
                                                <p className="text-xs text-gray-500 mt-1">Let the pillow fully expand for a few hours before sleeping on it.</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-6 items-start">
                                            <div className="flex flex-col items-center">
                                                <div className="w-5 h-5 rounded-full bg-white border-4 border-[#97BFBF] flex items-center justify-center shadow"></div>
                                                <div className="w-[2px] h-12 bg-gray-200"></div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm uppercase tracking-wider text-[#0a1530]">Night 7 | Customize the layers</h4>
                                                <p className="text-xs text-gray-500 mt-1">Zip open and remove or add layers to fine tune the loft to your spinal posture.</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-6 items-start">
                                            <div className="flex flex-col items-center">
                                                <div className="w-5 h-5 rounded-full bg-white border-4 border-[#97BFBF] flex items-center justify-center shadow"></div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm uppercase tracking-wider text-[#0a1530]">Night 30 | Return Option</h4>
                                                <p className="text-xs text-gray-500 mt-1">Still not fully comfortable? We'll exchange or collect and issue a full refund.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }

                if (isBase) {
                    return (
                        <div className="mt-24 space-y-24 border-t border-gray-100 pt-16 pb-0">
                            {/* Bed specs */}
                            <div className="text-center">
                                <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-[#0a1530] mb-2 px-4">
                                    UNCOMPROMISED BED SUPPORT FOR {product.name}
                                </h3>
                                <div className="w-16 h-[2px] bg-[#97BFBF] mx-auto mb-6"></div>
                                <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base mb-12 px-4">
                                    Handcrafted South African base features designed to maximize mattress life and spine support.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                                    {/* Feature 1 */}
                                    <div className="bg-white border border-gray-100 shadow-lg p-6 flex flex-col items-center text-center">
                                        <div className="w-16 h-16 rounded-full bg-[#0a1530]/5 flex items-center justify-center mb-6 text-[#97BFBF]">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                        <h4 className="font-bold text-lg text-[#0a1530] mb-2">TIMBER FRAME</h4>
                                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                                            Constructed using double reinforced premium grade pine wood to withstand heavy structural loads without creaking.
                                        </p>
                                    </div>

                                    {/* Feature 2 */}
                                    <div className="bg-white border border-gray-100 shadow-lg p-6 flex flex-col items-center text-center">
                                        <div className="w-16 h-16 rounded-full bg-[#0a1530]/5 flex items-center justify-center mb-6 text-[#97BFBF]">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                            </svg>
                                        </div>
                                        <h4 className="font-bold text-lg text-[#0a1530] mb-2">SLATTED DECK</h4>
                                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                                            Flat wooden slats precisely spaced to provide clean bottom support while maintaining full airflow beneath.
                                        </p>
                                    </div>

                                    {/* Feature 3 */}
                                    <div className="bg-white border border-gray-100 shadow-lg p-6 flex flex-col items-center text-center">
                                        <div className="w-16 h-16 rounded-full bg-[#0a1530]/5 flex items-center justify-center mb-6 text-[#97BFBF]">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </div>
                                        <h4 className="font-bold text-lg text-[#0a1530] mb-2">SOLID OAK LEGS</h4>
                                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                                            Elegant handcrafted solid oak feet designed to ground your bed frame with maximum stability and modern Scandinavian styling.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Bed Trial (Crisp White Background) */}
                            <div className="relative min-h-[480px] bg-white py-20 px-6 text-navy flex items-center justify-center border-t border-b border-gray-150">
                                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    <div className="space-y-6 text-center lg:text-left">
                                        <span className="text-xs uppercase tracking-[0.25em] text-[#97BFBF] font-bold block">Quality Assurance</span>
                                        <h3 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide leading-tight text-[#0a1530]">
                                            5-Year Frame Warranty
                                        </h3>
                                        <p className="text-gray-600 text-base md:text-lg max-w-lg leading-relaxed font-light mx-auto lg:mx-0">
                                            We design {product.name} frames to last. Enjoy a structural warranty for five full years. In case of any manufacture or frame defects, we will repair or replace it.
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 border border-gray-200 p-8 md:p-10 space-y-8">
                                        <div className="flex gap-6 items-start">
                                            <div className="flex flex-col items-center">
                                                <div className="w-5 h-5 rounded-full bg-[#97BFBF] border-4 border-white flex items-center justify-center shadow"></div>
                                                <div className="w-[2px] h-12 bg-gray-200"></div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm uppercase tracking-wider text-[#0a1530]">Year 1 | Full Guarantee</h4>
                                                <p className="text-xs text-gray-500 mt-1">100% frame component replacement for any unexpected structural defects.</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-6 items-start">
                                            <div className="flex flex-col items-center">
                                                <div className="w-5 h-5 rounded-full bg-white border-4 border-[#97BFBF] flex items-center justify-center shadow"></div>
                                                <div className="w-[2px] h-12 bg-gray-200"></div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm uppercase tracking-wider text-[#0a1530]">Year 2 - 5 | Repair Support</h4>
                                                <p className="text-xs text-gray-500 mt-1">Full parts restoration and repairs support across South Africa.</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-6 items-start">
                                            <div className="flex flex-col items-center">
                                                <div className="w-5 h-5 rounded-full bg-white border-4 border-[#97BFBF] flex items-center justify-center shadow"></div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm uppercase tracking-wider text-[#0a1530]">30-Day Return Guarantee</h4>
                                                <p className="text-xs text-gray-500 mt-1">Not perfectly matching your bedroom aesthetic? Return undamaged components within 30 days.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }

                if (isTopper) {
                    return (
                        <div className="mt-24 space-y-24 border-t border-gray-100 pt-16 pb-0">
                            {/* Topper: Change your current mattress feel */}
                            <div className="text-center">
                                <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-[#0a1530] mb-2 px-4">
                                    CHANGE YOUR CURRENT MATTRESS FEEL
                                </h3>
                                <div className="w-16 h-[2px] bg-[#97BFBF] mx-auto mb-6"></div>
                                <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base mb-12 px-4">
                                    Revitalize your bed and transform your sleep without the cost of buying a brand new mattress.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 text-navy">
                                    {/* Soft Topper */}
                                    <div className="bg-white border border-gray-100 shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                                        <div className="w-full aspect-[4/3] bg-gray-100 mb-6 overflow-hidden relative">
                                            <img src="/assets/comfort-soft.png" alt="Soft Topper" className="w-full h-full object-cover" />
                                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1 border border-gray-200">
                                                <span className="text-xs font-bold text-[#0a1530] uppercase tracking-wider">PLUSH</span>
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-lg text-[#0a1530] mb-4">Memory Foam Comfort</h4>
                                        <div className="w-full border-t border-gray-100 pt-4 space-y-3">
                                            <div>
                                                <span className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">Feel</span>
                                                <span className="text-sm font-medium text-gray-700">Plush | Enveloping | Pressure relieving</span>
                                            </div>
                                            <div>
                                                <span className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">Best for</span>
                                                <span className="text-sm font-medium text-gray-700">Hard mattresses needing softness</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Medium Topper */}
                                    <div className="bg-white border border-gray-100 shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                                        <div className="w-full aspect-[4/3] bg-gray-100 mb-6 overflow-hidden relative">
                                            <img src="/assets/comfort-medium.png" alt="Medium Topper" className="w-full h-full object-cover" />
                                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1 border border-gray-200">
                                                <span className="text-xs font-bold text-[#0a1530] uppercase tracking-wider">BALANCED</span>
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-lg text-[#0a1530] mb-4">Latex feel support</h4>
                                        <div className="w-full border-t border-gray-100 pt-4 space-y-3">
                                            <div>
                                                <span className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">Feel</span>
                                                <span className="text-sm font-medium text-gray-700">Springy | Responsive | Medium support</span>
                                            </div>
                                            <div>
                                                <span className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">Best for</span>
                                                <span className="text-sm font-medium text-gray-700">Restoring support & bounce</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Firm Topper */}
                                    <div className="bg-white border border-gray-100 shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                                        <div className="w-full aspect-[4/3] bg-gray-100 mb-6 overflow-hidden relative">
                                            <img src="/assets/comfort-firm.png" alt="Firm Topper" className="w-full h-full object-cover" />
                                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1 border border-gray-200">
                                                <span className="text-xs font-bold text-[#0a1530] uppercase tracking-wider">SUPPORTIVE</span>
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-lg text-[#0a1530] mb-4">High-Density support</h4>
                                        <div className="w-full border-t border-gray-100 pt-4 space-y-3">
                                            <div>
                                                <span className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">Feel</span>
                                                <span className="text-sm font-medium text-gray-700">Solid | Orthopaedic | Stable</span>
                                            </div>
                                            <div>
                                                <span className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">Best for</span>
                                                <span className="text-sm font-medium text-gray-700">Adding firm support to soft beds</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 100 Night Topper Trial (Crisp White Background) */}
                            <div className="relative min-h-[480px] bg-white py-20 px-6 text-navy flex items-center justify-center border-t border-b border-gray-150">
                                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    <div className="space-y-6 text-center lg:text-left">
                                        <span className="text-xs uppercase tracking-[0.25em] text-[#97BFBF] font-bold block">Comfort Trial</span>
                                        <h3 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide leading-tight text-[#0a1530]">
                                            100 Night Topper Trial
                                        </h3>
                                        <p className="text-gray-600 text-base md:text-lg max-w-lg leading-relaxed font-light mx-auto lg:mx-0">
                                            Upgrade your sleep environment risk free. Sleep on your new {product.name} for up to 100 nights. If it's not the sleep upgrade you wanted, we will pick it up and refund you.
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 border border-gray-200 p-8 md:p-10 space-y-8">
                                        <div className="flex gap-6 items-start">
                                            <div className="flex flex-col items-center">
                                                <div className="w-5 h-5 rounded-full bg-[#97BFBF] border-4 border-white flex items-center justify-center shadow"></div>
                                                <div className="w-[2px] h-12 bg-gray-200"></div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm uppercase tracking-wider text-[#0a1530]">Night 1 | Initial sleeping</h4>
                                                <p className="text-xs text-gray-500 mt-1">Place the topper on your mattress and feel the instant pressure relief.</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-6 items-start">
                                            <div className="flex flex-col items-center">
                                                <div className="w-5 h-5 rounded-full bg-white border-4 border-[#97BFBF] flex items-center justify-center shadow"></div>
                                                <div className="w-[2px] h-12 bg-gray-200"></div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm uppercase tracking-wider text-[#0a1530]">Night 30 | Checkpoint</h4>
                                                <p className="text-xs text-gray-500 mt-1">Allow your body's muscles and spine posture to fully adjust to the new alignment feel.</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-6 items-start">
                                            <div className="flex flex-col items-center">
                                                <div className="w-5 h-5 rounded-full bg-white border-4 border-[#97BFBF] flex items-center justify-center shadow"></div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm uppercase tracking-wider text-[#0a1530]">Night 100 | Return Option</h4>
                                                <p className="text-xs text-gray-500 mt-1">Not perfectly what you expected? Reach out and we will organize collection and refund you in full.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }

                if (isBaby) {
                    return (
                        <div className="mt-24 space-y-24 border-t border-gray-100 pt-16 pb-0">
                            {/* Baby features */}
                            <div className="text-center">
                                <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-[#0a1530] mb-2 px-4">
                                    PREMIUM BABY COT MATTRESS FEATURES
                                </h3>
                                <div className="w-16 h-[2px] bg-[#97BFBF] mx-auto mb-6"></div>
                                <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base mb-12 px-4">
                                    Give your little one the safest, healthiest start in life with deep, orthopaedic rest.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 text-navy">
                                    {/* Feature 1 */}
                                    <div className="bg-white border border-gray-100 shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                                        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border border-gray-100">
                                            <img src="/assets/baby-mattress.png" alt="Spinal Alignment" className="w-full h-full object-cover" />
                                        </div>
                                        <h4 className="font-bold text-lg text-[#0a1530] mb-4">Healthy Spinal Support</h4>
                                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                                            Engineered with a firm, flat orthopaedic support core to ensure correct skeletal alignment for your growing child.
                                        </p>
                                    </div>

                                    {/* Feature 2 */}
                                    <div className="bg-white border border-gray-100 shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                                        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border border-gray-100">
                                            <img src="https://images.unsplash.com/photo-1522771753062-5a31a5052472?auto=format&fit=crop&q=80&w=300" alt="Safe Materials" className="w-full h-full object-cover" />
                                        </div>
                                        <h4 className="font-bold text-lg text-[#0a1530] mb-4">Safe & Hypoallergenic</h4>
                                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                                            Crafted with premium certified toxin-free materials. Completely breathable to protect your baby through every nap.
                                        </p>
                                    </div>

                                    {/* Feature 3 */}
                                    <div className="bg-white border border-gray-100 shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                                        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border border-gray-100">
                                            <img src="/assets/topper-bundle.png" alt="Easy Care" className="w-full h-full object-cover" />
                                        </div>
                                        <h4 className="font-bold text-lg text-[#0a1530] mb-4">Waterproof & Washable</h4>
                                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                                            Features a fully removable cover with a waterproof backing for quick, hygienic cleanup of unexpected baby spills.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Baby warranty */}
                            <div className="relative min-h-[400px] bg-white py-20 px-6 text-navy flex items-center justify-center border-t border-b border-gray-150">
                                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    <div className="space-y-6 text-center lg:text-left">
                                        <span className="text-xs uppercase tracking-[0.25em] text-[#97BFBF] font-bold block">Certified Safety</span>
                                        <h3 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide leading-tight text-[#0a1530]">
                                            2 Year Baby Care Warranty
                                        </h3>
                                        <p className="text-gray-600 text-base md:text-lg max-w-lg leading-relaxed font-light mx-auto lg:mx-0">
                                            Sleep soundly knowing that our cot mattresses are built to strict pediatric standards. We back every cot mattress with a complete 2-year warranty cover.
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 border border-gray-200 p-8 md:p-10 space-y-6">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#97BFBF]"></div>
                                            <span className="font-bold text-xs uppercase tracking-wider text-[#0a1530]">100% Breathable Core</span>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#97BFBF]"></div>
                                            <span className="font-bold text-xs uppercase tracking-wider text-[#0a1530]">Pediatric Orthopaedic Certified</span>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#97BFBF]"></div>
                                            <span className="font-bold text-xs uppercase tracking-wider text-[#0a1530]">Anti-dust mite protection</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }

                if (isPaedicSupport) {
                    return (
                        <div className="mt-24 space-y-24 border-t border-gray-100 pt-16 pb-0">
                            {/* Paedic support features */}
                            <div className="text-center">
                                <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-[#0a1530] mb-2 px-4">
                                    PAEDIC SUPPORTS TO CHANGE YOUR LIFESTYLE
                                </h3>
                                <div className="w-16 h-[2px] bg-[#97BFBF] mx-auto mb-6"></div>
                                <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base mb-12 px-4">
                                    Ergonomic orthopaedic wedges and rolls designed to improve posture, relieve pressure, and heal joints.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 text-navy">
                                    {/* Feature 1 */}
                                    <div className="bg-white border border-gray-100 shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                                        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border border-gray-100">
                                            <img src="/assets/backrest-pillow.png" alt="Posture" className="w-full h-full object-cover" />
                                        </div>
                                        <h4 className="font-bold text-lg text-[#0a1530] mb-4">Relieve Pressure & Pain</h4>
                                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                                            Relieve pressure on neck, shoulders, and lower back joints. Highly effective for rehabilitation and muscle pain relief.
                                        </p>
                                    </div>

                                    {/* Feature 2 */}
                                    <div className="bg-white border border-gray-100 shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                                        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border border-gray-100">
                                            <img src="/assets/body-pillow.png" alt="Ergonomic support" className="w-full h-full object-cover" />
                                        </div>
                                        <h4 className="font-bold text-lg text-[#0a1530] mb-4">Align Spine Posture</h4>
                                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                                            Designed to support optimal body alignment while sitting in bed, reading, sleeping, or recovering from surgery.
                                        </p>
                                    </div>

                                    {/* Feature 3 */}
                                    <div className="bg-white border border-gray-100 shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                                        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border border-gray-100">
                                            <img src="/assets/bakkie-mattress.png" alt="Travel comfort" className="w-full h-full object-cover" />
                                        </div>
                                        <h4 className="font-bold text-lg text-[#0a1530] mb-4">Travel & Lifestyle Support</h4>
                                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                                            Premium custom supports tailored for long road journeys, caravanning, and backbeds to ensure comfort on every adventure.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Paedic warranty */}
                            <div className="relative min-h-[400px] bg-white py-20 px-6 text-navy flex items-center justify-center border-t border-b border-gray-150">
                                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    <div className="space-y-6 text-center lg:text-left">
                                        <span className="text-xs uppercase tracking-[0.25em] text-[#97BFBF] font-bold block">Posture Guarantee</span>
                                        <h3 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide leading-tight text-[#0a1530]">
                                            1 Year Lifestyle Support Guarantee
                                        </h3>
                                        <p className="text-gray-600 text-base md:text-lg max-w-lg leading-relaxed font-light mx-auto lg:mx-0">
                                            Improve your daily comfort, or return it. We guarantee our premium high-density support wedges to retain structural shape and therapeutic alignment for a full year.
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 border border-gray-200 p-8 md:p-10 space-y-6">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#97BFBF]"></div>
                                            <span className="font-bold text-xs uppercase tracking-wider text-[#0a1530]">Medical Grade Foam density</span>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#97BFBF]"></div>
                                            <span className="font-bold text-xs uppercase tracking-wider text-[#0a1530]">Ergonomic alignment design</span>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#97BFBF]"></div>
                                            <span className="font-bold text-xs uppercase tracking-wider text-[#0a1530]">Removable, washable outer cover</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }

                if (isK9) {
                    return (
                        <div className="mt-24 space-y-24 border-t border-gray-100 pt-16 pb-0">
                            {/* K9 Features */}
                            <div className="text-center">
                                <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-[#0a1530] mb-2 px-4">
                                    SCRATCHY TAILS PREMIUM PET COMFORT FEATURES
                                </h3>
                                <div className="w-16 h-[2px] bg-[#97BFBF] mx-auto mb-6"></div>
                                <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base mb-12 px-4">
                                    Designed with orthopaedic memory foam to protect your dog's joints and provide ultimate sleeping comfort.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 text-navy">
                                    {/* Feature 1 */}
                                    <div className="bg-white border border-gray-100 shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                                        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border border-gray-100">
                                            <img src="/assets/comfort-medium.png" alt="Joint & Bone Support" className="w-full h-full object-cover" />
                                        </div>
                                        <h4 className="font-bold text-lg text-[#0a1530] mb-4">Joint & Bone Support</h4>
                                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                                            High-density orthopaedic foam helps prevent joint issues, cushions hips and elbows, and supports aging pets.
                                        </p>
                                    </div>

                                    {/* Feature 2 */}
                                    <div className="bg-white border border-gray-100 shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                                        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border border-gray-100">
                                            <img src="/assets/trial-bg.png" alt="Heavy Duty Cover" className="w-full h-full object-cover" />
                                        </div>
                                        <h4 className="font-bold text-lg text-[#0a1530] mb-4">Scratch-Resistant Cover</h4>
                                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                                            Made with heavy-duty upholstery fabric designed to withstand scratching. Fully removable and machine-washable.
                                        </p>
                                    </div>

                                    {/* Feature 3 */}
                                    <div className="bg-white border border-gray-100 shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                                        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border border-gray-100">
                                            <img src="/assets/detail-bed-slats.png" alt="Water Resistant" className="w-full h-full object-cover" />
                                        </div>
                                        <h4 className="font-bold text-lg text-[#0a1530] mb-4">Waterproof Inner Liner</h4>
                                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                                            Includes a protective waterproof inner lining to shield the premium memory foam core from any pet accidents.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Pet bed warranty */}
                            <div className="relative min-h-[400px] bg-white py-20 px-6 text-navy flex items-center justify-center border-t border-b border-gray-150">
                                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    <div className="space-y-6 text-center lg:text-left">
                                        <span className="text-xs uppercase tracking-[0.25em] text-[#97BFBF] font-bold block">Pet Approved Quality</span>
                                        <h3 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide leading-tight text-[#0a1530]">
                                            1 Year Chew & Shape Guarantee
                                        </h3>
                                        <p className="text-gray-600 text-base md:text-lg max-w-lg leading-relaxed font-light mx-auto lg:mx-0">
                                            Our dog beds are made with the same premium craftsmanship as our human mattresses. We guarantee the structural foam core will not sag or flatten for a full year.
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 border border-gray-200 p-8 md:p-10 space-y-6">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#97BFBF]"></div>
                                            <span className="font-bold text-xs uppercase tracking-wider text-[#0a1530]">Orthopaedic support core</span>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#97BFBF]"></div>
                                            <span className="font-bold text-xs uppercase tracking-wider text-[#0a1530]">Removable washable zipper covers</span>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#97BFBF]"></div>
                                            <span className="font-bold text-xs uppercase tracking-wider text-[#0a1530]">Water-resistant protection barrier</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }

                return null;
            })()}
        </div>
    );
}
