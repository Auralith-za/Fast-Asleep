import md5 from 'crypto-js/md5';

export const generatePayfastForm = (orderId, cartTotal, customerDetails) => {
    // These keys are matched directly from the provided Fast Asleep screenshot
    const merchant_id = '13431158';
    const merchant_key = 'l428fj6xj0pik';
    const passphrase = 'Neilleedhampass23445f'; 

    // PayFast CloudFront WAF heavily blocks "http://localhost" from being passed in form URLs.
    // We MUST use a valid production HTTPS URI for the return and cancel targets to prevent 403 errors during local testing!
    const baseUrl = window.location.hostname.includes('localhost') 
        ? 'https://fastasleepsa.netlify.app' 
        : window.location.origin;

    const wcBaseUrl = import.meta.env.VITE_WC_URL || 'https://wp.fastasleep.co.za';

    const data = {
        merchant_id,
        merchant_key,
        return_url: `${baseUrl}/?payment=success`,
        cancel_url: `${baseUrl}/?payment=cancelled`,
        notify_url: `${wcBaseUrl}/?wc-api=WC_Gateway_PayFast`,
        
        name_first: customerDetails.first_name || '',
        name_last: customerDetails.last_name || '',
        email_address: customerDetails.email || '',
        
        m_payment_id: String(orderId),
        amount: parseFloat(cartTotal).toFixed(2),
        item_name: `Fast Asleep Order #${orderId}`
    };

    // Clean data (Remove empty/null/undefined params exactly as PayFast expects)
    const cleanData = {};
    for (const key in data) {
        if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
            cleanData[key] = typeof data[key] === 'string' ? data[key].trim() : data[key];
        }
    }

    // DO NOT SORT keys alphabetically. PayFast Form Integration strictly states:
    // "Variables must be appended to the signature string in the EXACT same order they are appended in the HTML form."
    const keys = Object.keys(cleanData);
    
    let signatureString = '';
    const finalParams = [];
    
    for (const key of keys) {
        // Standard payload mapping (using basic node-level URI encoding)
        let val = String(cleanData[key]).trim();
        let encodedVal = encodeURIComponent(val).replace(/%20/g, '+');
            
        signatureString += `${key}=${encodedVal}&`;
        
        // Push to array to preserve exact same mapping for HTML DOM
        finalParams.push({ name: key, value: val });
    }

    // Append Passphrase securely 
    signatureString += `passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, '+')}`;

    // Generate MD5 Hash natively
    const signature = md5(signatureString).toString();
    
    // Append the signature hash as the absolute final parameter
    finalParams.push({ name: 'signature', value: signature });

    return finalParams;
};
