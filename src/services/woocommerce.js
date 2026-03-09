import { products as staticProducts } from '../data/products';

// Configuration
const WC_URL = import.meta.env.VITE_WC_URL;
const WC_KEY = import.meta.env.VITE_WC_KEY;
const WC_SECRET = import.meta.env.VITE_WC_SECRET;

/**
 * Helper to fetch with a timeout
 */
async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 8000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id);

    return response;
}

/**
 * Fetch products from WooCommerce
 * Returns static data if credentials are missing or fetch fails.
 */
export const fetchProducts = async () => {
    // If no credentials, return static data (safeguard)
    if (!WC_KEY || !WC_SECRET) {
        console.warn('WooCommerce credentials missing. Using static data.');
        return staticProducts;
    }

    try {
        const auth = btoa(`${WC_KEY}:${WC_SECRET}`);
        const response = await fetchWithTimeout(`${WC_URL}/wp-json/wc/v3/products?per_page=100&status=publish`, {
            headers: {
                'Authorization': `Basic ${auth}`
            },
            timeout: 10000 // 10s timeout
        });

        if (!response.ok) {
            const text = await response.text();
            console.error(`WooCommerce API Error: ${response.status} ${response.statusText}`, text);
            // Fallback to static if API fails (e.g. 401, 500)
            return staticProducts;
        }

        const data = await response.json();

        // Critical: Check if data is actually an array
        if (!Array.isArray(data)) {
            console.error('WooCommerce response is not an array:', data);
            return staticProducts;
        }

        // DEBUG: Log the first product to see its structure, especially images
        if (data.length > 0) {
            console.log('WooCommerce Debug - First Product:', data[0]);
            console.log('WooCommerce Debug - First Product Images:', data[0].images);
        }

        const mappedProducts = mapWooProducts(data);

        // If no products found, fallback to static
        if (mappedProducts.length === 0) {
            console.warn('WooCommerce returned 0 products. Using static data.');
            return staticProducts;
        }

        return mappedProducts;

    } catch (error) {
        console.error('WooCommerce Fetch Error (CORS/Network/Timeout):', error);
        // This ensures the app still works even if the API is blocked
        return staticProducts;
    }
};

/**
 * Decode HTML entities explicitly
 */
const decodeHtml = (html) => {
    try {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    } catch (e) {
        return html;
    }
};

/**
 * Map WooCommerce product shape to our internal application shape.
 */
const mapWooProducts = (wooProducts) => {
    return wooProducts.map(p => {
        // Map Category - Bucket logic to match App routing
        const wcCategory = p.categories.length > 0 ? p.categories[0].slug.toLowerCase() : 'uncategorized';
        const wcName = p.categories.length > 0 ? p.categories[0].name.toLowerCase() : '';

        let appCategory = wcCategory; // Default to raw slug

        // Bucket common categories to match Navbar/App routing
        if (wcCategory.includes('mattress') || wcName.includes('mattress')) appCategory = 'mattresses';
        if (wcCategory.includes('pillow') || wcName.includes('pillow')) appCategory = 'pillows';
        if (wcCategory.includes('topper') || wcName.includes('topper')) appCategory = 'toppers';

        // Map Image (Robust check for various API versions)
        let image = 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1000';

        if (Array.isArray(p.images) && p.images.length > 0) {
            const imgObj = p.images[0];
            // Try standard keys
            image = imgObj.src || imgObj.url || imgObj.source_url || image;

            // DEBUG: Log image keys for the first product to help diagnose
            if (p === wooProducts[0]) {
                console.log('WooCommerce Debug - First Image Keys:', Object.keys(imgObj));
                console.log('WooCommerce Debug - Selected Image URL:', image);
            }
        } else if (p.image && p.image.src) {
            // Handle flattened structure some plugins might return
            image = p.image.src;
        }

        // Map Price (Handle HTML strip and entity decode)
        // Map Price (Handle HTML strip and entity decode)
        let priceDisplay = '';

        if (p.price_html) {
            // 1. Remove hidden screen reader text which often causes "through" and redundant prices
            let cleanHtml = p.price_html.replace(/<span[^>]*class=["']screen-reader-text["'][^>]*>.*?<\/span>/gi, '');

            // 2. Decode HTML entities
            priceDisplay = decodeHtml(cleanHtml);

            // 3. Clean up whitespace and known character mess
            priceDisplay = priceDisplay.replace(/\s+/g, ' ').replace(/&nbsp;/g, ' ').trim();

            // 4. Extract only the price parts (e.g. "R1,234.00 – R5,678.00")
            // This handles cases where logic might still have extra text
            const priceRegex = /R\s?[\d\s,.]+/g;
            const foundPrices = priceDisplay.match(priceRegex);

            if (foundPrices && foundPrices.length >= 2) {
                // It's a range
                const min = foundPrices[0].trim();
                const max = foundPrices[findLastPriceIndex(foundPrices)].trim();
                priceDisplay = `From ${min} to ${max}`;
            } else if (foundPrices && foundPrices.length === 1) {
                priceDisplay = foundPrices[0].trim();
            }
        }

        // Helper to find the last unique price in a messy match array
        function findLastPriceIndex(prices) {
            // Often if it's messy, we get [R100, R200, R100, R200]
            // We want the match that is different from the first one if possible
            for (let i = prices.length - 1; i > 0; i--) {
                if (prices[i].trim() !== prices[0].trim()) return i;
            }
            return 0;
        }

        // Fallback to p.price if priceDisplay is still empty or just "R"
        if (!priceDisplay || priceDisplay === 'R' || priceDisplay === 'R ') {
            if (p.price) {
                priceDisplay = `R${parseFloat(p.price).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
            } else {
                priceDisplay = 'Contact for Price';
            }
        }

        return {
            id: String(p.id),
            name: p.name,
            category: appCategory,
            priceRange: priceDisplay,
            image: image,
            description: p.short_description ? decodeHtml(p.short_description) : 'Premium comfort.',
            slug: p.slug,
            features: ['Premium Quality', 'Locally Made', 'Warranty']
        };
    });
};
