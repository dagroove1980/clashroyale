# Clash Royale Collection Page

A beautiful, mobile-first collection page for displaying your Clash Royale card collection with accurate level conversion, rarity indicators, and card variations.

## Features

- ✅ Fetch and display player card collection
- ✅ Accurate level conversion based on card rarity
- ✅ Elixir cost display (top-left badge)
- ✅ Level ribbon display (bottom banner)
- ✅ Rarity gem indicators:
  - 🟣 Purple gem for evolved cards
  - 🟡 Gold gem for hero cards
  - 🟠 Orange gem for champion cards
  - Multiple gems for cards with both evolved and hero variants
- ✅ Dark mode support
- ✅ Responsive mobile-first design
- ✅ Error handling and loading states

## Quick Start (Local Testing)

### 1. Get Your API Key
1. Visit [Clash Royale API Developer Portal](https://developer.clashroyale.com/)
2. Sign in and create a new API key

### 2. Configure API Key
Edit `config.js` and add your API key:
```javascript
module.exports = {
    API_KEY: 'your-api-key-here'
};
```

### 3. Start the Server
```bash
node server.js
```

### 4. Open in Browser
Navigate to http://localhost:3000

**That's it!** The server handles CORS and keeps your API key secure.

For detailed setup instructions, see [SETUP.md](SETUP.md)

## Setup (Detailed)

### Option 1: Local Development with Proxy Server (Recommended)

The included `server.js` handles CORS and API key security:

1. Install Node.js (version 12+)
2. Add your API key to `config.js`
3. Run `node server.js`
4. Open http://localhost:3000

### Option 2: Simple HTTP Server (Requires CORS Handling)

If you prefer not to use the proxy server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

**Note:** You'll need to handle CORS separately (browser extension or proxy service)

## Usage

1. Enter your Clash Royale player tag (e.g., `#YQQQYL0R`)
2. Click "Load" or press Enter
3. View your collection with all cards displayed

## Level Conversion System

The app automatically converts API levels to display levels based on card rarity:

- **Common**: No offset (API Level = Display Level)
- **Rare**: +2 offset
- **Epic**: +6 offset (if API Level < 10), +5 offset (if API Level >= 10)
- **Legendary**: +8 offset
- **Champion**: +10 offset

Levels are capped at the maximum level for each rarity.

## Card Variations

The app detects and displays:
- **Evolved Cards**: Purple gem indicator
- **Hero Cards**: Gold gem indicator
- **Champion Cards**: Orange gem indicator
- **Multiple Variants**: Cards with both evolved and hero variants show two gems

## API Endpoints Used

- `GET /players/{playerTag}` - Fetch player data and card collection
- `GET /cards` - Fetch all available cards (cached)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### "API key not configured" error
- Make sure `config.js` exists and contains your API key
- Check that `config.js` is loaded before `app.js` in `index.html`

### CORS errors
- Set up a backend proxy server
- Or use a CORS proxy service for development

### "Player tag not found" error
- Verify the player tag is correct (include the `#` symbol)
- Check that the player tag exists in Clash Royale

### Cards not displaying
- Check browser console for errors
- Verify API key is valid and has proper permissions
- Ensure network requests are not blocked

## License

This project is for personal/educational use. Clash Royale is a trademark of Supercell.

