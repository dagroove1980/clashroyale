# Quick Start Guide

## 🚀 Test Locally in 3 Steps

### Step 1: Add Your API Key
Edit `config.js` and replace `YOUR_API_KEY_HERE` with your actual Clash Royale API key.

```javascript
module.exports = {
    API_KEY: 'your-actual-api-key-here'
};
```

Get your API key from: https://developer.clashroyale.com/

### Step 2: Start the Server
```bash
node server.js
```

You should see:
```
🚀 Server running at http://localhost:3000
📋 Open http://localhost:3000 in your browser
```

### Step 3: Open in Browser
Open http://localhost:3000 and test with player tag `#YQQQYL0R`

## ✅ That's It!

The server automatically:
- ✅ Handles CORS issues
- ✅ Keeps your API key secure (server-side only)
- ✅ Serves your HTML/CSS/JS files
- ✅ Proxies API requests

## 🐛 Troubleshooting

**"Cannot connect to local server"**
- Make sure `node server.js` is running
- Check the terminal for any error messages

**"API key invalid"**
- Double-check your API key in `config.js`
- Make sure there are no extra quotes or spaces
- Verify your key is active at https://developer.clashroyale.com/

**Port 3000 already in use?**
- Edit `server.js` and change `const PORT = 3000;` to another port
- Or stop whatever is using port 3000

## 📝 Next Steps

- Try different player tags
- Check the browser console (F12) for any errors
- See SETUP.md for more detailed information


