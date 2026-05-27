import React from 'react';

export default function ProductCard({ product, onClick }) {
    return (
        <div
            className="group relative bg-white flex flex-col h-full border border-transparent hover:border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={onClick}
        >

            {/* Image Container */}
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-[300px] w-full object-cover object-center group-hover:opacity-100 transition-opacity duration-300"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800'; // Fallback
                    }}
                />
                {/* Overlay Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                    <button className="btn-primary py-2 px-6 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Details
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow text-center">
                <h3 className="text-lg font-bold text-navy uppercase tracking-wide mb-2">
                    {product.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
                    {product.description}
                </p>

                {product.isFathersDaySale && product.originalPriceRange ? (
                    <div className="flex flex-col items-center justify-center gap-1">
                        <span className="text-[10px] text-rose-500 font-extrabold uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded">Fathers Day Sale - 20% OFF</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400 line-through font-medium">{product.originalPriceRange}</span>
                            <span className="text-lg font-bold text-[#97BFBF]">{product.priceRange}</span>
                        </div>
                    </div>
                ) : (
                    <p className="text-lg font-bold text-[#97BFBF]">
                        {product.priceRange}
                    </p>
                )}
            </div>
        </div>
    );
}
