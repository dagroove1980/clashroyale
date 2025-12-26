const https = require('https');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Get the path from the URL, stripping /api
    // Vercel rewrites will send /api/players/... to this function
    let apiPath = req.url.replace(/^\/api/, '');

    // Normalize player tag (# -> %23) if present, similar to server.js
    if (apiPath.includes('/players/')) {
        const tagMatch = apiPath.match(/\/players\/([^/?]+)/);
        if (tagMatch) {
            let tag = tagMatch[1];
            try {
                tag = decodeURIComponent(tag);
            } catch (e) { }
            const cleanTag = tag.trim().replace(/^#+/, '');
            const encodedTag = encodeURIComponent(`#${cleanTag}`);
            apiPath = apiPath.replace(`/players/${tagMatch[1]}`, `/players/${encodedTag}`);
        }
    }

    const API_KEY = process.env.CLASH_ROYALE_API_KEY;
    const API_BASE = 'https://api.clashroyale.com/v1';

    if (!API_KEY) {
        return res.status(500).json({
            error: 'API_KEY not configured',
            message: 'Please set CLASH_ROYALE_API_KEY in Vercel environment variables.'
        });
    }

    const apiUrl = `${API_BASE}${apiPath}`;

    return new Promise((resolve) => {
        const options = {
            headers: {
                'Authorization': `Bearer ${API_KEY.trim()}`,
                'Content-Type': 'application/json'
            },
            rejectUnauthorized: false
        };

        const request = https.get(apiUrl, options, (apiRes) => {
            let data = '';
            apiRes.on('data', (chunk) => data += chunk);
            apiRes.on('end', () => {
                res.status(apiRes.statusCode);
                res.setHeader('Content-Type', 'application/json');
                res.send(data);
                resolve();
            });
        });

        request.on('error', (err) => {
            res.status(500).json({ error: 'Proxy Request Failed', message: err.message });
            resolve();
        });

        request.setTimeout(10000, () => {
            request.destroy();
            res.status(504).json({ error: 'Proxy Timeout' });
            resolve();
        });
    });
};
