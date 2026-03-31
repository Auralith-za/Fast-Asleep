import React, { useState } from 'react';
// import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Star, Truck, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { fetchProductVariations } from '../services/woocommerce';

export default function ProductDetail({ productId, onBack, products }) {
    const product = products.find(p => p.id === productId);
    const { addToCart } = useCart();
    const [selectedVariants, setSelectedVariants] = useState({});
    const [variationsData, setVariationsData] = useState([]);
    const [displayedPrice, setDisplayedPrice] = useState(product ? product.priceRange : '');
    const [exactPrice, setExactPrice] = useState(null);
    const [isLoadingVars, setIsLoadingVars] = useState(false);

    // 1. Setup Defaults
    React.useEffect(() => {
        if (product && product.attributes) {
            setDisplayedPrice(product.priceRange);
            setExactPrice(null);
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
            const doc = new DOMParser().parseFromString(str || "", 'text/html');
            return (doc.body.textContent || "").trim().toLowerCase();
        };

        const match = variationsData.find(v => {
            if (!v.attributes || v.attributes.length === 0) return false;
            
            return v.attributes.every(attr => {
                // Find matching user selection key gracefully
                const cleanAttrName = sanitizeStr(attr.name);
                const matchedKey = Object.keys(selectedVariants).find(k => sanitizeStr(k) === cleanAttrName);
                
                if (!matchedKey) return false;
                return sanitizeStr(selectedVariants[matchedKey]) === sanitizeStr(attr.option);
            });
        });

        if (match && match.price) {
            setDisplayedPrice(`R${parseFloat(match.price).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`);
            setExactPrice(match.price); // Store raw decimal to pass directly to cart engine
        } else {
            setDisplayedPrice(product.priceRange);
            setExactPrice(null);
        }
    }, [selectedVariants, variationsData, product]);

    if (!product) return <div>Product not found</div>;

    const handleAddToCart = () => {
        const variantString = product.attributes && product.attributes.length > 0
            ? Object.entries(selectedVariants).map(([k, v]) => `${k}: ${v}`).join(', ')
            : 'Standard';
            
        const cartItemToPass = { ...product };
        if (exactPrice) {
             cartItemToPass.exactPrice = exactPrice;
        }
        
        addToCart(cartItemToPass, 1, variantString);
    };

    return (
        <div className="bg-white pt-6 pb-20">
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

                        <p className="text-2xl font-medium text-navy mb-8 flex items-center gap-3 transition-opacity duration-300">
                            {displayedPrice}
                            {isLoadingVars && <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />}
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
                            className="btn-primary w-full py-4 text-base mb-6"
                        >
                            Add to Cart
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

                {/* Deep Dive Tabs / Info */}
                <div className="mt-20 border-t border-gray-100 pt-16">
                    <h3 className="text-2xl font-bold text-navy uppercase tracking-widest mb-8 text-center">Product Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            {product.features.map((feature, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-gold text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-1">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy text-lg mb-2">{feature}</h4>
                                        <p className="text-gray-600 leading-relaxed">
                                            Engineered for superior comfort and durability. This layer ensures that you get the best sleep possible by adapting to your body's unique contours.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-100 h-full min-h-[400px]">
                            <img
                                src="https://images.unsplash.com/photo-1505691938895-1758d7bab016?q=80&w=2070&auto=format&fit=crop"
                                className="w-full h-full object-cover"
                                alt="Feature Detail"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
