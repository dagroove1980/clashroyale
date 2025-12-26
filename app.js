// Clash Royale API Configuration
const API_BASE_URL = 'https://api.clashroyale.com/v1';

// Note: API key is handled server-side via proxy (server.js)
// No client-side API key needed for security

// Cache for all cards (changes infrequently)
let allCardsCache = null;

// Level conversion offsets by rarity
const LEVEL_OFFSETS = {
    'Common': 0,
    'Rare': 2,
    'Epic': (apiLevel) => apiLevel < 10 ? 5 : 5, // Epic: API level 5 = display level 10 (5+5), level 10+ = display level (10+5=15, capped at max)
    'Legendary': 8,
    'Champion': 10
};

// Maximum levels by rarity
// All cards can potentially reach level 16
const MAX_LEVELS = {
    'Common': 16,
    'Rare': 16,
    'Epic': 16,
    'Legendary': 16,
    'Champion': 16
};

// Rarity border colors
const RARITY_COLORS = {
    'Common': 'rare-common',
    'Rare': 'rare-rare',
    'Epic': 'rare-epic',
    'Legendary': 'rare-legendary',
    'Champion': 'rare-champion'
};

// Hero card names (cards that can have hero variants)
const HERO_CARDS = ['Archer Queen', 'Golden Knight', 'Skeleton King', 'Mighty Miner'];

/**
 * Convert API level to display level based on rarity
 */
function convertLevel(apiLevel, rarity) {
    // Handle undefined, null, or invalid values
    if (apiLevel === undefined || apiLevel === null || apiLevel === '') {
        console.warn('Missing level for rarity:', rarity);
        return 0;
    }
    
    // Convert to number if it's a string
    const levelNum = parseInt(apiLevel, 10);
    if (isNaN(levelNum) || levelNum <= 0) {
        console.warn('Invalid level:', apiLevel, 'for rarity:', rarity);
        return 0;
    }
    
    // Normalize rarity to match our keys (capitalize first letter)
    const normalizedRarity = rarity ? rarity.charAt(0).toUpperCase() + rarity.slice(1).toLowerCase() : 'Common';
    
    let displayLevel;
    const offset = LEVEL_OFFSETS[normalizedRarity];
    
    if (offset === undefined) {
        console.warn('Unknown rarity:', rarity, 'using Common offset');
        displayLevel = levelNum; // Default to Common (no offset)
    } else if (typeof offset === 'function') {
        // Epic cards have variable offset
        displayLevel = levelNum + offset(levelNum);
    } else {
        displayLevel = levelNum + offset;
    }
    
    // Cap at maximum level for rarity
    // Updated: Legendary cards can go up to level 14, so we use a higher cap
    const maxLevel = MAX_LEVELS[normalizedRarity] || 16;
    // Allow levels up to the max, but don't cap too aggressively
    return Math.min(displayLevel, maxLevel);
}

/**
 * Check if card can be evolved (has evolution available)
 */
function canEvolve(card) {
    return card.maxEvolutionLevel && card.maxEvolutionLevel > 0;
}

/**
 * Check if user owns the evolved variation
 */
function hasEvolved(card) {
    // Check if user has evolved the card
    // evolutionLevel > 0 means they own the evolved variant
    // If evolutionLevel is missing or 0, they don't own it
    if (!card) return false;
    return card.evolutionLevel !== undefined && card.evolutionLevel !== null && card.evolutionLevel > 0;
}

/**
 * Check if card is a hero variant
 * Note: Hero detection may need adjustment based on actual API response
 * The API might have a specific field indicating hero variants
 */
function isHero(card) {
    // Hero cards are typically identified by name or properties
    // Check if it's in the hero cards list
    // You may need to adjust this based on actual API response structure
    // Some APIs have a 'hero' or 'isHero' field
    if (card.isHero || card.hero) {
        return true;
    }
    return HERO_CARDS.includes(card.name);
}

/**
 * Check if card is a champion
 */
function isChampion(card) {
    return card.rarity === 'Champion';
}

/**
 * Get card image URL
 */
function getCardImageUrl(cardData, playerCard) {
    // Only show evolution image if user owns the evolved variation
    if (canEvolve(playerCard) && hasEvolved(playerCard) && cardData.iconUrls?.evolutionMedium) {
        return cardData.iconUrls.evolutionMedium;
    }
    return cardData.iconUrls?.medium || '';
}

/**
 * Get rarity border color (hex)
 */
function getBorderColor(rarity) {
    const colorMap = {
        'rare-common': '#9CA3AF',      // Gray
        'rare-rare': '#F97316',        // Orange
        'rare-epic': '#A855F7',        // Purple
        'rare-legendary': '#EAB308',   // Yellow/Gold
        'rare-champion': '#EF4444'     // Red
    };
    return colorMap[rarity] || '#9CA3AF';
}

/**
 * Get rarity gems to display
 */
function getRarityGems(cardData, playerCard) {
    const gems = [];
    
    // Removed purple evolved gem - it's part of the card artwork, not a UI element
    
    if (isHero(playerCard)) {
        gems.push({ type: 'hero', color: 'gold', owned: true });
    }
    
    if (isChampion(playerCard)) {
        gems.push({ type: 'champion', color: 'orange', owned: true });
    }
    
    return gems;
}

/**
 * Fetch data from Clash Royale API
 * Uses local proxy server when running locally
 */
async function fetchWithAuth(url) {
    // Check if we're running locally (localhost or 127.0.0.1)
    const isLocal = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1' ||
                   window.location.hostname === '';
    
    // Use local proxy if running locally, otherwise try direct (will need CORS proxy)
    const proxyUrl = isLocal ? '/api' : '';
    
    const finalUrl = proxyUrl ? `${proxyUrl}${url.replace('https://api.clashroyale.com/v1', '')}` : url;
    
    try {
        const response = await fetch(finalUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage;
            
            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.message || errorData.reason || 'Unknown error';
            } catch (e) {
                errorMessage = errorText || `HTTP ${response.status}`;
            }
            
            if (response.status === 404) {
                throw new Error('Player tag not found. Please check the tag and try again.');
            } else if (response.status === 403) {
                throw new Error('403 Forbidden: Your IP address may not be whitelisted in Supercell Developer Portal. Check the server console for your outgoing IP address and add it to your API key whitelist.');
            } else if (response.status === 503) {
                throw new Error('Clash Royale API is temporarily unavailable. Please try again later.');
            }
            throw new Error(`API Error: ${response.status} - ${errorMessage}`);
        }
        
        return await response.json();
    } catch (error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('CORS') || error.message.includes('NetworkError')) {
            if (isLocal) {
                throw new Error('Cannot connect to local server. Make sure server.js is running on port 3000.');
            } else {
                throw new Error('CORS error: Please use a proxy server. Run "node server.js" for local development.');
            }
        }
        console.error('Fetch error:', error);
        throw error;
    }
}

/**
 * Fetch all available cards
 */
async function fetchAllCards() {
    if (allCardsCache) {
        return allCardsCache;
    }
    
    try {
        const data = await fetchWithAuth(`${API_BASE_URL}/cards`);
        allCardsCache = data;
        return data;
    } catch (error) {
        console.error('Error fetching all cards:', error);
        throw error;
    }
}

/**
 * Fetch player data
 */
async function fetchPlayerData(playerTag) {
    // Remove # and encode for URL
    const encodedTag = encodeURIComponent(playerTag);
    try {
        const data = await fetchWithAuth(`${API_BASE_URL}/players/${encodedTag}`);
        return data;
    } catch (error) {
        console.error('Error fetching player data:', error);
        throw error;
    }
}

/**
 * Match player cards with all cards data
 */
function matchCardsWithData(playerCards, allCardsData) {
    const cardMap = new Map();
    allCardsData.items.forEach(card => {
        cardMap.set(card.name, card);
    });
    
    return playerCards.map(playerCard => {
        const cardData = cardMap.get(playerCard.name);
        
        // Debug: log first card to see structure
        if (playerCards.indexOf(playerCard) === 0) {
            console.log('Sample player card:', playerCard);
            console.log('Matched card data:', cardData);
        }
        
        // Ensure we have rarity - prefer from cardData if playerCard doesn't have it
        const rarity = playerCard.rarity || (cardData ? cardData.rarity : 'Common');
        
        return {
            ...playerCard,
            rarity: rarity, // Ensure rarity is set
            cardData: cardData || null
        };
    });
}

/**
 * Render a single card
 */
function renderCard(card) {
    const { cardData, level, maxEvolutionLevel, elixirCost, rarity, name } = card;
    
    if (!cardData) {
        console.warn(`Card data not found for: ${name}`);
        return '';
    }
    
    // Get rarity from cardData if not in player card, and normalize case
    const cardRarity = rarity || cardData.rarity || 'Common';
    const normalizedRarity = cardRarity ? cardRarity.charAt(0).toUpperCase() + cardRarity.slice(1).toLowerCase() : 'Common';
    
    // Ensure level is a number (handle undefined/null)
    const cardLevel = level !== undefined && level !== null ? level : 0;
    
    const displayLevel = convertLevel(cardLevel, normalizedRarity);
    
    // Debug: log first card to verify conversion
    if (cardLevel > 0 && displayLevel === 0) {
        console.warn(`Level conversion issue for ${name}: API level ${cardLevel}, rarity ${normalizedRarity}, result ${displayLevel}`);
    }
    const borderColorKey = RARITY_COLORS[rarity] || 'rare-common';
    const borderColorHex = getBorderColor(borderColorKey);
    const imageUrl = getCardImageUrl(cardData, card);
    const gems = getRarityGems(cardData, card);
    
    // Check if card can evolve but user doesn't own the evolved variant
    const canEvolveCard = canEvolve(card);
    const ownsEvolvedCard = hasEvolved(card);
    const canEvolveButNotOwned = canEvolveCard && !ownsEvolvedCard;
    
    // Debug: log Zap card specifically
    if (name === 'Zap') {
        console.log('Zap card debug:', {
            maxEvolutionLevel: card.maxEvolutionLevel,
            evolutionLevel: card.evolutionLevel,
            canEvolve: canEvolveCard,
            hasEvolved: ownsEvolvedCard,
            canEvolveButNotOwned: canEvolveButNotOwned
        });
    }
    
    // Determine if card is boosted (has upgrade available)
    const isBoosted = false; // This would need additional logic
    
    // Render rarity gems (purple for evolved, gold for hero, orange for champion)
    const gemsHtml = gems.map((gem, index) => {
        const gemColors = {
            'purple': '#A855F7',
            'gold': '#EAB308',
            'orange': '#F97316'
        };
        const gemIcons = {
            'evolved': 'auto_awesome',
            'hero': 'stars',
            'champion': 'workspace_premium'
        };
        // Position gems: first at top-right, second (if both) slightly left
        const position = index === 0 ? 'top-1 right-1' : 'top-1 right-8';
        let gemColorHex = gemColors[gem.color] || '#A855F7';
        
        // If evolved gem is not owned, grey it
        if (gem.type === 'evolved' && !gem.owned) {
            gemColorHex = '#6B7280'; // Grey color
            return `
                <div class="absolute ${position} rounded-full p-0.5 border border-white/50 z-20 opacity-50" style="background-color: ${gemColorHex};">
                    <span class="material-icons-round text-white/70 text-[10px] block">${gemIcons[gem.type]}</span>
                </div>
            `;
        }
        
        // Also grey hero/champion gems if card can evolve but evolved variant not owned
        if ((gem.type === 'hero' || gem.type === 'champion') && canEvolveButNotOwned) {
            gemColorHex = '#6B7280'; // Grey color
            return `
                <div class="absolute ${position} rounded-full p-0.5 border border-white/50 z-20 opacity-50" style="background-color: ${gemColorHex};">
                    <span class="material-icons-round text-white/70 text-[10px] block">${gemIcons[gem.type]}</span>
                </div>
            `;
        }
        
        return `
            <div class="absolute ${position} rounded-full p-0.5 border border-white z-20" style="background-color: ${gemColorHex};">
                <span class="material-icons-round text-white text-[10px] block">${gemIcons[gem.type]}</span>
            </div>
        `;
    }).join('');
    
    return `
        <div class="group relative flex flex-col items-center">
            <div class="relative w-full aspect-[4/5] rounded-lg border-2 bg-slate-800 overflow-hidden shadow-md" style="border-color: ${borderColorHex};">
                <!-- Elixir Cost Badge -->
                <div class="absolute top-1 left-1 z-20 w-6 h-6 rounded-full bg-accent border-2 border-white dark:border-slate-900 flex items-center justify-center shadow-md">
                    <span class="text-white font-display text-xs">${elixirCost || cardData.elixirCost || cardData.elixir || 0}</span>
                </div>
                
                <!-- Rarity Gems -->
                ${gemsHtml}
                
                <!-- Card Image -->
                <img 
                    alt="${name}" 
                    class="w-full h-full object-cover" 
                    src="${imageUrl}"
                    onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Crect fill=\'%23333\' width=\'100\' height=\'100\'/%3E%3Ctext fill=\'%23999\' x=\'50\' y=\'50\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3E${encodeURIComponent(name)}%3C/text%3E%3C/svg%3E'"
                />
                
                <!-- Card Shine Effect -->
                <div class="absolute inset-0 bg-card-shine opacity-30"></div>
                
                <!-- Level Ribbon -->
                <div class="absolute bottom-0 w-full py-0.5 text-center border-t border-white/20" style="background-color: rgba(255, 160, 0, 0.7);">
                    <span class="text-white font-display text-[10px]">Level ${displayLevel || 0}</span>
                </div>
                
                <!-- Boosted Indicator (if applicable) -->
                ${isBoosted ? `
                    <div class="absolute top-1 right-1 bg-accent/90 rounded-full p-0.5 border border-white">
                        <span class="material-icons-round text-white text-[10px] block">arrow_upward</span>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

/**
 * Render all cards
 */
function renderCards(cards) {
    const container = document.getElementById('cardContainer');
    
    if (!cards || cards.length === 0) {
        container.innerHTML = `
            <div class="text-center text-slate-500 dark:text-slate-400 py-12">
                <span class="material-icons-round text-4xl mb-2">inventory_2</span>
                <p class="text-sm">No cards found</p>
            </div>
        `;
        return;
    }
    
    // Sort cards by display level (highest first), then by name
    const sortedCards = [...cards].sort((a, b) => {
        // Get rarity for normalization
        const rarityA = a.rarity || (a.cardData ? a.cardData.rarity : 'Common');
        const rarityB = b.rarity || (b.cardData ? b.cardData.rarity : 'Common');
        const normalizedRarityA = rarityA ? rarityA.charAt(0).toUpperCase() + rarityA.slice(1).toLowerCase() : 'Common';
        const normalizedRarityB = rarityB ? rarityB.charAt(0).toUpperCase() + rarityB.slice(1).toLowerCase() : 'Common';
        
        // Calculate display levels
        const levelA = a.level !== undefined && a.level !== null ? a.level : 0;
        const levelB = b.level !== undefined && b.level !== null ? b.level : 0;
        const displayLevelA = convertLevel(levelA, normalizedRarityA);
        const displayLevelB = convertLevel(levelB, normalizedRarityB);
        
        // Sort by level (descending), then by name (ascending)
        if (displayLevelA !== displayLevelB) {
            return displayLevelB - displayLevelA;
        }
        return (a.name || '').localeCompare(b.name || '');
    });
    
    // Group cards by boosted status (for now, just show all)
    const boostedCards = sortedCards.filter(card => false); // Would need logic to determine boosted
    const foundCards = sortedCards;
    
    let html = '';
    
    if (boostedCards.length > 0) {
        html += `
            <section>
                <div class="flex items-center justify-center mb-3">
                    <span class="text-accent font-display text-lg tracking-wider drop-shadow-md">Boosted</span>
                    <span class="material-icons-round text-accent ml-1 text-sm animate-pulse">bolt</span>
                </div>
                <div class="grid grid-cols-4 gap-2 sm:gap-3">
                    ${boostedCards.map(renderCard).join('')}
                </div>
            </section>
        `;
    }
    
    html += `
        <section>
            <div class="flex items-center justify-center mb-3">
                <span class="text-slate-700 dark:text-slate-300 font-display text-lg tracking-wider">Found</span>
            </div>
            <div class="grid grid-cols-4 gap-2 sm:gap-3">
                ${foundCards.map(renderCard).join('')}
            </div>
        </section>
    `;
    
    container.innerHTML = html;
}

/**
 * Update stats display
 */
function updateStats(foundCount, totalCount) {
    const foundCountEl = document.getElementById('foundCount');
    const totalCountEl = document.getElementById('totalCount');
    const statsDisplayEl = document.getElementById('statsDisplay');
    if (foundCountEl) foundCountEl.textContent = foundCount;
    if (totalCountEl) totalCountEl.textContent = totalCount;
    if (statsDisplayEl) statsDisplayEl.classList.remove('hidden');
}

/**
 * Show loading state
 */
function showLoading() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorDisplay = document.getElementById('errorDisplay');
    const cardContainer = document.getElementById('cardContainer');
    
    if (loadingIndicator) loadingIndicator.classList.remove('hidden');
    if (errorDisplay) errorDisplay.classList.add('hidden');
    if (cardContainer) cardContainer.innerHTML = '';
}

/**
 * Hide loading state
 */
function hideLoading() {
    document.getElementById('loadingIndicator').classList.add('hidden');
}

/**
 * Show error message
 */
function showError(message) {
    const errorMessageEl = document.getElementById('errorMessage');
    const errorDisplayEl = document.getElementById('errorDisplay');
    if (errorMessageEl) errorMessageEl.textContent = message;
    if (errorDisplayEl) errorDisplayEl.classList.remove('hidden');
    hideLoading();
}

/**
 * Hide error message
 */
function hideError() {
    document.getElementById('errorDisplay').classList.add('hidden');
}

/**
 * Load and display collection
 */
async function loadCollection(playerTag) {
    if (!playerTag || !playerTag.trim()) {
        showError('Please enter a valid player tag');
        return;
    }
    
    // Validate tag format
    if (!playerTag.startsWith('#')) {
        playerTag = '#' + playerTag;
    }
    
    showLoading();
    hideError();
    
    try {
        // Fetch all cards and player data in parallel
        const [allCardsData, playerData] = await Promise.all([
            fetchAllCards(),
            fetchPlayerData(playerTag)
        ]);
        
        // Match player cards with card data
        const matchedCards = matchCardsWithData(playerData.cards || [], allCardsData);
        
        // Update stats
        const totalCards = allCardsData.items?.length || 0;
        const foundCards = matchedCards.length;
        updateStats(foundCards, totalCards);
        
        // Render cards
        renderCards(matchedCards);
        
        hideLoading();
    } catch (error) {
        console.error('Error loading collection:', error);
        showError(`Failed to load collection: ${error.message}`);
    }
}

/**
 * Initialize event listeners
 */
function init() {
    // Only initialize if we're on the collection page (not war-decks page)
    if (window.location.pathname.includes('war-decks') || window.location.href.includes('war-decks')) {
        return; // Let war-decks.js handle initialization
    }
    
    const fetchButton = document.getElementById('fetchButton');
    const playerTagInput = document.getElementById('playerTagInput');
    
    if (!fetchButton || !playerTagInput) {
        return; // Elements not found, probably wrong page
    }
    
    fetchButton.addEventListener('click', () => {
        const playerTag = playerTagInput.value.trim();
        loadCollection(playerTag);
    });
    
    playerTagInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const playerTag = playerTagInput.value.trim();
            loadCollection(playerTag);
        }
    });
    
    // Load default collection on page load
    // Uncomment to auto-load on page load:
    // loadCollection('#YQQQYL0R');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

