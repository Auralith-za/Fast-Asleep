import 'dotenv/config';
import fetch from 'node-fetch';

const WC_URL = process.env.VITE_WC_URL;
const WC_KEY = process.env.VITE_WC_KEY;
const WC_SECRET = process.env.VITE_WC_SECRET;

async function test() {
    const auth = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');
    
    const res = await fetch(`${WC_URL}/wp-json/wc/v3/products?search=comfy&per_page=10`, {
        headers: { 'Authorization': `Basic ${auth}` }
    });
    const products = await res.json();
    const comfyKing = products.find(p => p.name.toLowerCase().includes('comfy king'));
    
    const varRes = await fetch(`${WC_URL}/wp-json/wc/v3/products/${comfyKing.id}/variations?per_page=100`, {
        headers: { 'Authorization': `Basic ${auth}` }
    });
    const variations = await varRes.json();
    
    const sanitizeStr = (str) => {
        if (!str) return '';
        return String(str).trim().toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ');
    };
    
    // Simulate all possible combinations of attributes
    const sizeOptions = comfyKing.attributes.find(a => a.name === 'Size').options;
    const lengthOptions = comfyKing.attributes.find(a => a.name === 'Length').options;
    const colourOptions = comfyKing.attributes.find(a => a.name === 'Colour')?.options || [''];
    
    let fails = 0;
    
    for (const size of sizeOptions) {
        for (const length of lengthOptions) {
            for (const colour of colourOptions) {
                const selectedVariants = { Size: size, Length: length };
                if (colour) selectedVariants.Colour = colour;
                
                const match = variations.find(v => {
                    if (!v.attributes || v.attributes.length === 0) return false;

                    return v.attributes.every(attr => {
                        if (!attr.option || attr.option === '') return true;

                        const cleanAttrName = sanitizeStr(attr.name);
                        const matchedKey = Object.keys(selectedVariants).find(
                            k => sanitizeStr(k) === cleanAttrName
                        );
                        if (!matchedKey) return true; 
                        return sanitizeStr(selectedVariants[matchedKey]) === sanitizeStr(attr.option);
                    });
                });
                
                if (!match) {
                    fails++;
                    console.log(`NO MATCH FOR:`, selectedVariants);
                }
            }
        }
    }
    
    console.log(`Total fails: ${fails}`);
}

test();
