const https = require('https');

const url = 'https://fastasleep.co.za/wp-json/wc/v3/products?per_page=10&status=publish';
const auth = 'Basic ' + Buffer.from('ck_f3acf5c6ea42f9eb6ce106c79ad3c5d40671e1db:cs_d7b869f131e09ad8cd05979cf9393a9e5c5f63cf').toString('base64');

const options = {
    headers: {
        'Authorization': auth,
        'User-Agent': 'Node/TestScript'
    }
};

https.get(url, options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });

    res.on('end', () => {
        try {
            const products = JSON.parse(data);
            console.log(`Fetched ${products.length} products.`);
            products.forEach(p => {
                console.log(`\nProduct: ${p.name} (ID: ${p.id})`);
                console.log(`Images Count: ${p.images.length}`);
                if (p.images.length > 0) {
                    console.log(`First Image SRC: ${p.images[0].src}`);
                } else {
                    console.log('NO IMAGES FOUND');
                }
            });
        } catch (e) {
            console.error('Error parsing JSON:', e);
            console.log('Raw Data Preview:', data.substring(0, 200));
        }
    });

}).on('error', (e) => {
    console.error(e);
});
