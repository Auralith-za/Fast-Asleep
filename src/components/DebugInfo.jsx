import React, { useState, useEffect } from 'react';

const WC_URL = 'https://fastasleep.co.za';
const WC_KEY = 'ck_f3acf5c6ea42f9eb6ce106c79ad3c5d40671e1db';
const WC_SECRET = 'cs_d7b869f131e09ad8cd05979cf9393a9e5c5f63cf';

export default function DebugInfo() {
    const [debugData, setDebugData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const testFetch = async () => {
            try {
                const auth = btoa(`${WC_KEY}:${WC_SECRET}`);
                const response = await fetch(`${WC_URL}/wp-json/wc/v3/products?per_page=10`, {
                    headers: {
                        'Authorization': `Basic ${auth}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Status: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setDebugData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        testFetch();
    }, []);

    if (!loading && !error && !debugData) return null;

    return (
        <div className="bg-gray-900 text-green-400 p-4 font-mono text-xs overflow-auto max-h-[500px] border-b-4 border-red-500 z-[9999] relative">
            <h3 className="font-bold text-white mb-2">WooCommerce Debugger (Check Images)</h3>
            {loading && <div>Loading products...</div>}
            {error && <div className="text-red-400 font-bold">ERROR: {error}</div>}
            {debugData && (
                <div className="space-y-4">
                    <div className="font-bold text-white border-b pb-2">Found {debugData.length} products</div>
                    {debugData.map(p => (
                        <div key={p.id} className="border-b border-gray-700 pb-2">
                            <div className="text-white font-bold">{p.name} <span className="text-gray-500">({p.id})</span></div>
                            <div>Cat: {p.categories.map(c => c.name).join(', ')}</div>
                            <div>
                                Img: {p.images.length > 0 ? (
                                    <a href={p.images[0].src} target="_blank" rel="noreferrer" className="underline text-blue-400">
                                        {p.images[0].src}
                                    </a>
                                ) : <span className="text-red-500">NO IMAGES</span>}
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 pt-4 border-t border-gray-600">
                        <h4 className="font-bold text-white">First Item Raw:</h4>
                        <pre>{JSON.stringify(debugData[0], null, 2)}</pre>
                    </div>
                </div>
            )}
        </div>
    );
}
