import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/woocommerce';
import { products as staticProducts } from '../data/products';

export function useProducts() {
    const [products, setProducts] = useState(staticProducts);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const liveData = await fetchProducts();
                if (liveData && liveData.length > 0) {
                    setProducts(liveData);
                } else {
                    console.log('No live products found, using static data.');
                }
            } catch (err) {
                console.error('Failed to load products:', err);
                setError(err);
                // Fallback is already set to staticProducts
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    return { products, loading, error };
}
