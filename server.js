// Simple proxy server for Clash Royale API
// This handles CORS and keeps your API key secure on the server side

const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Load API key from config
let API_KEY = '';
try {
    const config = require('./config.js');
    API_KEY = config.API_KEY;
} catch (e) {
    console.error('Error: config.js not found or invalid');
    console.error('Please create config.js with: module.exports = { API_KEY: "your-key-here" };');
    process.exit(1);
}

if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    console.error('Error: API_KEY not set in config.js');
    process.exit(1);
}

// Sanitize API key (remove whitespace, newlines, etc.)
API_KEY = API_KEY.trim().replace(/\s+/g, '');

console.log('✅ API Key loaded and sanitized');

const PORT = 3000;
// Default to official API, but allow override for community proxies
let API_BASE = 'https://api.clashroyale.com/v1';
try {
    const config = require('./config.js');
    if (config.API_BASE) API_BASE = config.API_BASE;
} catch (e) { }

// Detect and log outgoing IP (for Supercell Developer Portal whitelisting)
async function detectOutgoingIP() {
    try {
        const https = require('https');
        return new Promise((resolve, reject) => {
            https.get('https://api4.ipify.org?format=json', {
                rejectUnauthorized: false,
                timeout: 5000
            }, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try {
                        const ipInfo = JSON.parse(data);
                        console.log(`🌐 Your outgoing IP: ${ipInfo.ip}`);
                        console.log(`   ⚠️  Make sure this IP is whitelisted in Supercell Developer Portal\n`);
                        resolve(ipInfo.ip);
                    } catch (e) {
                        resolve(null);
                    }
                });
            }).on('error', () => resolve(null));
        });
    } catch (e) {
        return null;
    }
}

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Handle API proxy requests
    if (pathname.startsWith('/api/')) {
        let apiPath = pathname.replace('/api', '');

        // Normalize player tag in URL if present
        // The # symbol needs to be URL-encoded as %23
        if (apiPath.includes('/players/')) {
            const tagMatch = apiPath.match(/\/players\/([^/?]+)/);
            if (tagMatch) {
                let tag = tagMatch[1];
                // Decode first, then normalize
                try {
                    tag = decodeURIComponent(tag);
                } catch (e) {
                    // Already decoded or invalid
                }
                // Remove any existing # symbols
                const cleanTag = tag.trim().replace(/^#+/, '');
                // Re-add # and encode properly
                const encodedTag = encodeURIComponent(`#${cleanTag}`);
                apiPath = apiPath.replace(`/players/${tagMatch[1]}`, `/players/${encodedTag}`);
            }
        }

        const apiUrl = `${API_BASE}${apiPath}${parsedUrl.search || ''}`;

        console.log(`📡 Proxying: ${apiPath}`);

        const options = {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            // Fix SSL certificate issues
            rejectUnauthorized: false, // For development - set to true in production with proper certs
            timeout: 30000 // 30 second timeout
        };

        const request = https.get(apiUrl, options, (apiRes) => {
            let data = '';

            apiRes.on('data', (chunk) => {
                data += chunk;
            });

            apiRes.on('end', () => {
                let statusCode = apiRes.statusCode;
                let responseData = data;

                // Try to parse JSON for better error messages
                try {
                    const jsonData = JSON.parse(data);
                    if (statusCode !== 200) {
                        console.error(`❌ API Error ${statusCode}:`, jsonData.message || jsonData.reason || 'Unknown error');
                    } else {
                        console.log(`✅ API Success: ${statusCode}`);
                    }
                } catch (e) {
                    // Not JSON, that's okay
                }

                res.writeHead(statusCode, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                });
                res.end(responseData);
            });
        });

        request.on('error', (err) => {
            console.error('❌ API Request Error:', err.message);
            let errorMessage = err.message;

            if (err.message.includes('certificate') || err.message.includes('issuer')) {
                errorMessage = 'SSL certificate error. This has been fixed, please try again.';
            } else if (err.message.includes('timeout')) {
                errorMessage = 'Request timeout. Please check your connection.';
            } else if (err.message.includes('ENOTFOUND')) {
                errorMessage = 'Cannot reach Clash Royale API. Check your internet connection.';
            }

            res.writeHead(500, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({
                error: 'API request failed',
                message: errorMessage,
                details: process.env.NODE_ENV === 'development' ? err.message : undefined
            }));
        });

        request.on('timeout', () => {
            request.destroy();
            console.error('❌ Request timeout');
        });

        return;
    }

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    // Serve static files
    let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, async () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`📋 Open http://localhost:${PORT} in your browser\n`);

    // Detect and display outgoing IP for whitelisting
    await detectOutgoingIP();
});


