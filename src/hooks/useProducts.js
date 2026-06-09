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
    // 1. Add Camping Mattress if not already present
    const hasCamping = list.some(p => p.id === 'father-day-camping-mattress' || p.id === '4700');
    let updatedList = [...list];
    if (!hasCamping) {
        updatedList.push({
            id: 'father-day-camping-mattress',
            name: 'Roll Up Memory Foam Camping Mattress',
            priceRange: 'R1,499.00',
            originalPriceRange: 'R1,999.00',
            image: '/fathers-day/68600FBE-5935-41C3-8C42-A36C02ACCA05.PNG',
            description: 'Premium memory foam for deep, restful sleep. Tri-fold design, easy to fold, carry & store. Removable, washable cover. Perfect for camping, road trips, guests & sleepovers.',
            slug: 'father-day-camping-mattress',
            category: 'paedic-and-travel',
            categories: ['paedic-and-travel', 'mattress-toppers', 'mattresses'],
            features: ['Ultra Comfort', 'Tri-Fold Design', 'Durable & Easy Care', 'Supportive & Pressure Relieving', 'Roll Up & Go'],
            isFathersDaySale: true,
            noFathersDay20Percent: true
        });
    }

    // 2. Map and apply 20% discount to all eligible products
    return updatedList.map(p => {
        const category = (p.category || '').toLowerCase();
        const categories = (p.categories || []).map(c => c.toLowerCase());
        const isTopper = category.includes('topper') || categories.some(c => c.includes('topper')) || p.name.toLowerCase().includes('topper');
        const isBaby = category.includes('babies') || category.includes('kids') || categories.some(c => c.includes('babies') || c.includes('kids')) || p.name.toLowerCase().includes('baby') || p.name.toLowerCase().includes('cot') || p.name.toLowerCase().includes('changing mat') || p.name.toLowerCase().includes('bumper') || p.name.toLowerCase().includes('snooz buddy') || p.name.toLowerCase().includes('kids');
        const isPaedicSupport = category.includes('paedic') || categories.some(c => c.includes('paedic')) || p.name.toLowerCase().includes('paedic') || p.name.toLowerCase().includes('wedge') || p.name.toLowerCase().includes('elevation') || p.name.toLowerCase().includes('support') || p.name.toLowerCase().includes('lounger') || p.name.toLowerCase().includes('cushion') || p.name.toLowerCase().includes('roll');
        const isK9 = category.includes('k9') || categories.some(c => c.includes('k9') || c.includes('pet')) || p.name.toLowerCase().includes('dog') || p.name.toLowerCase().includes('pet') || p.name.toLowerCase().includes('k9');
        
        const isMattress = (category.includes('mattress') || categories.some(c => c.includes('mattress')) || p.name.toLowerCase().includes('pc') || p.name.toLowerCase().includes('cool') || p.name.toLowerCase().includes('eclipse') || p.name.toLowerCase().includes('plush') || p.name.toLowerCase().includes('bronnel')) && !isTopper && !isBaby && !isK9 && !isPaedicSupport;
        const isBase = category.includes('base') || category.includes('bed') || categories.some(c => c.includes('base')) || categories.some(c => c.includes('bed')) || p.name.toLowerCase().includes('base') || p.name.toLowerCase().includes('frame');

        const isEligibleCategory = isMattress || isBase;

        const isExcluded = !isEligibleCategory || p.id === '4698' || p.id === 'father-day-bakkie-mattress' || p.id === 'father-day-camping-mattress' || p.id === '4700' || p.noFathersDay20Percent;
        
        // Update Bakkie special image
        if (p.id === '4698') {
            p.image = '/assets/bakkie-mattress.png';
            p.noFathersDay20Percent = true;
        }

        if (isExcluded) {
            return {
                ...p,
                isFathersDaySale: false,
                noFathersDay20Percent: true
            };
        }

        const original = p.originalPriceRange || p.priceRange;
        const discounted = applyDiscountToPriceRange(original);
        return {
            ...p,
            originalPriceRange: original,
            priceRange: discounted,
            isFathersDaySale: true
        };
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
