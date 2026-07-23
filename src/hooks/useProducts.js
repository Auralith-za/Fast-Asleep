import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/woocommerce';
import { products as staticProducts } from '../data/products';

function applyDiscountToPriceRange(priceStr) {
    if (!priceStr) return priceStr;
    const priceRegex = /R\s?[\d\s,.]+/g;
    return priceStr.replace(priceRegex, (match) => {
        let clean = match.replace(/R/gi, '').replace(/\s/g, '');
        if (clean.includes(',') && clean.includes('.')) {
            if (clean.indexOf(',') < clean.indexOf('.')) {
                clean = clean.replace(/,/g, '');
            } else {
                clean = clean.replace(/\./g, '').replace(/,/g, '.');
            }
        } else if (clean.includes(',')) {
            const parts = clean.split(',');
            if (parts[parts.length - 1].length <= 2) {
                clean = parts.slice(0, -1).join('') + '.' + parts[parts.length - 1];
            } else {
                clean = clean.replace(/,/g, '');
            }
        } else if (clean.includes('.')) {
            const parts = clean.split('.');
            if (parts[parts.length - 1].length === 3 && parts.length === 2) {
                clean = clean.replace(/\./g, '');
            }
        }
        const priceVal = parseFloat(clean);
        if (isNaN(priceVal)) return match;
        const discounted = priceVal * 0.8;
        return `R${discounted.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    });
}

const processProductsList = (list) => {
    // Add Christmas in July Products
    let updatedList = [...list];
    
    const hasPlayGym = list.some(p => p.id === 'christmas-in-july-baby-play-gym');
    if (!hasPlayGym) {
        updatedList.push({
            id: 'christmas-in-july-baby-play-gym',
            name: 'Baby Play Gym',
            priceRange: 'R4,999.00',
            originalPriceRange: 'R5,999.00',
            image: '/xmas-in-july/FF15F48A-8C8A-4449-8718-DF044419356F.png',
            description: 'A world of fun and development designed for little explorers. Play, learn & grow!',
            slug: 'christmas-in-july-baby-play-gym',
            category: 'baby',
            categories: ['baby', 'play'],
            features: ['Developmental Play', 'Safe & Soft', 'Comfortable & Durable', 'Modular & Versatile', 'Easy to Clean'],
            isChristmasInJulySale: true
        });
    }

    const hasPlayCouch = list.some(p => p.id === 'christmas-in-july-play-couch');
    if (!hasPlayCouch) {
        updatedList.push({
            id: 'christmas-in-july-play-couch',
            name: 'Play Couch',
            priceRange: 'R4,699.00',
            originalPriceRange: 'R5,899.00',
            image: '/xmas-in-july/3FDF3FC0-2536-4444-849B-5909F28411D5.png',
            description: 'Give the gift of imagination, play & comfort - all year round! Build forts, slides, tunnels & more.',
            slug: 'christmas-in-july-play-couch',
            category: 'kids',
            categories: ['kids', 'play'],
            features: ['Endless Play', 'Safe & Soft', 'Durable & Stylish', 'Easy to Clean', 'Supports Growth'],
            isChristmasInJulySale: true
        });
    }

    // Process bakkie mattress special image
    return updatedList.map(p => {
        if (p.id === '4698') {
            return {
                ...p,
                image: '/assets/bakkie-mattress.png'
            };
        }
        return p;
    });
};

export function useProducts() {
    const [products, setProducts] = useState(() => processProductsList(staticProducts));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const liveData = await fetchProducts();
                if (liveData && liveData.length > 0) {
                    setProducts(processProductsList(liveData));
                } else {
                    console.log('No live products found, using static data.');
                }
            } catch (err) {
                console.error('Failed to load products:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    return { products, loading, error };
}
