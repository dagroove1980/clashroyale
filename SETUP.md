# Local Development Setup

## Quick Start

### 1. Install Node.js
Make sure you have Node.js installed (version 12 or higher).
Check by running:
```bash
node --version
```

### 2. Get Your API Key
1. Visit https://developer.clashroyale.com/
2. Sign in with your Supercell account
3. Create a new API key
4. Copy your API key

### 3. Configure API Key
Edit `config.js` and replace `YOUR_API_KEY_HERE` with your actual API key:
```javascript
module.exports = {
    API_KEY: 'your-actual-api-key-here'
};
```

### 4. Start the Server
```bash
node server.js
```

You should see:
```
🚀 Server running at http://localhost:3000
📋 Open http://localhost:3000 in your browser
```

### 5. Open in Browser
Open http://localhost:3000 in your web browser.

### 6. Test It
- Enter a player tag (default: `#YQQQYL0R`)
- Click "Load"
- Your collection should appear!

## Troubleshooting

### "Cannot connect to local server"
- Make sure `server.js` is running
- Check that port 3000 is not already in use
- Try a different port by editing `PORT` in `server.js`

### "API key invalid or expired"
- Check your API key in `config.js`
- Make sure there are no extra spaces or quotes
- Verify your API key is active at https://developer.clashroyale.com/

### "Player tag not found"
- Make sure the tag includes the `#` symbol
- Verify the player tag exists in Clash Royale
- Try the default test tag: `#YQQQYL0R`

### Port Already in Use
If port 3000 is busy, change it in `server.js`:
```javascript
const PORT = 3001; // or any other available port
```

## Alternative: Simple HTTP Server (No Proxy)

If you don't want to use the Node.js proxy, you can use a simple HTTP server, but you'll need to handle CORS differently:

### Python (Simple Server)
```bash
python -m http.server 8000
```
Then open http://localhost:8000

**Note:** You'll need to use a CORS browser extension or modify browser settings for this to work with the API.

### PHP
```bash
php -S localhost:8000
```

## Development Tips

- The server automatically reloads when you restart it
- Check the browser console (F12) for any errors
- API responses are logged in the server terminal
- Card data is cached after first load for better performance


