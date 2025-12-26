// War Deck Recommendation System
// This file handles deck recommendations for clan wars

// Popular meta decks (will be replaced with API data later)
const POPULAR_DECKS = [
    {
        id: 1,
        name: "Mega Knight Control",
        cards: ["Mega Knight", "Witch", "Zap", "Fireball", "Valkyrie", "Electro Wizard", "Elite Barbarians", "Rage"],
        winRate: 0.58,
        usageRate: 0.12,
        avgTrophies: 5500
    },
    {
        id: 2,
        name: "Golem Beatdown",
        cards: ["Golem", "Night Witch", "Baby Dragon", "Tornado", "Lightning", "Mega Minion", "Lumberjack", "Elixir Collector"],
        winRate: 0.55,
        usageRate: 0.08,
        avgTrophies: 5200
    },
    {
        id: 3,
        name: "Hog Rider Cycle",
        cards: ["Hog Rider", "Musketeer", "Cannon", "Fireball", "Zap", "Ice Spirit", "Skeletons", "Goblins"],
        winRate: 0.52,
        usageRate: 0.15,
        avgTrophies: 4800
    },
    {
        id: 4,
        name: "X-Bow Siege",
        cards: ["X-Bow", "Tesla", "Archers", "Ice Golem", "Fireball", "Log", "Skeletons", "Ice Spirit"],
        winRate: 0.54,
        usageRate: 0.06,
        avgTrophies: 5100
    },
    {
        id: 5,
        name: "Lava Hound Balloon",
        cards: ["Lava Hound", "Balloon", "Mega Minion", "Tombstone", "Arrows", "Fireball", "Minions", "Skeleton Dragons"],
        winRate: 0.56,
        usageRate: 0.09,
        avgTrophies: 5300
    },
    {
        id: 6,
        name: "Royal Giant",
        cards: ["Royal Giant", "Furnace", "Mega Minion", "Fireball", "Zap", "Goblin Gang", "Minions", "Electro Wizard"],
        winRate: 0.53,
        usageRate: 0.11,
        avgTrophies: 5000
    },
    {
        id: 7,
        name: "Graveyard Control",
        cards: ["Graveyard", "Poison", "Knight", "Archers", "Tombstone", "Tornado", "Baby Dragon", "Ice Golem"],
        winRate: 0.57,
        usageRate: 0.07,
        avgTrophies: 5400
    },
    {
        id: 8,
        name: "Miner Poison",
        cards: ["Miner", "Poison", "Knight", "Archers", "Goblin Gang", "Inferno Tower", "Log", "Ice Spirit"],
        winRate: 0.55,
        usageRate: 0.10,
        avgTrophies: 5100
    },
    {
        id: 9,
        name: "P.E.K.K.A Bridge Spam",
        cards: ["P.E.K.K.A", "Bandit", "Royal Ghost", "Magic Archer", "Poison", "Zap", "Battle Ram", "Dark Prince"],
        winRate: 0.56,
        usageRate: 0.13,
        avgTrophies: 5400
    },
    {
        id: 10,
        name: "Giant Double Prince",
        cards: ["Giant", "Prince", "Dark Prince", "Musketeer", "Electro Wizard", "Poison", "Zap", "Goblin Gang"],
        winRate: 0.54,
        usageRate: 0.09,
        avgTrophies: 5100
    },
    {
        id: 11,
        name: "Sparky Golem",
        cards: ["Golem", "Sparky", "Wizard", "Tornado", "Goblin Gang", "Skeleton Army", "Zap", "Minions"],
        winRate: 0.53,
        usageRate: 0.07,
        avgTrophies: 5000
    },
    {
        id: 12,
        name: "Mortar Cycle",
        cards: ["Mortar", "Musketeer", "Archers", "Knight", "Arrows", "Skeletons", "Ice Spirit", "The Log"],
        winRate: 0.55,
        usageRate: 0.08,
        avgTrophies: 5200
    },
    {
        id: 13,
        name: "Three Musketeers",
        cards: ["Three Musketeers", "Battle Ram", "Ice Golem", "Miner", "Bats", "Zap", "Ice Spirit", "Goblin Gang"],
        winRate: 0.57,
        usageRate: 0.11,
        avgTrophies: 5300
    },
    {
        id: 14,
        name: "LavaLoon",
        cards: ["Lava Hound", "Balloon", "Mega Minion", "Skeleton Dragons", "Tombstone", "Arrows", "Fireball", "Minions"],
        winRate: 0.56,
        usageRate: 0.10,
        avgTrophies: 5300
    },
    {
        id: 15,
        name: "Goblin Giant Sparky",
        cards: ["Goblin Giant", "Sparky", "Mega Minion", "Bats", "Goblin Gang", "Zap", "Poison", "Tornado"],
        winRate: 0.54,
        usageRate: 0.06,
        avgTrophies: 5100
    },
    {
        id: 16,
        name: "Elixir Golem Beatdown",
        cards: ["Elixir Golem", "Battle Healer", "Electro Dragon", "Tornado", "Lightning", "Barbarian Barrel", "Fireball", "Minions"],
        winRate: 0.55,
        usageRate: 0.08,
        avgTrophies: 5200
    },
    {
        id: 17,
        name: "Royal Hogs",
        cards: ["Royal Hogs", "Flying Machine", "Musketeer", "Ice Golem", "Fireball", "Zap", "Bats", "Goblin Gang"],
        winRate: 0.56,
        usageRate: 0.09,
        avgTrophies: 5200
    },
    {
        id: 18,
        name: "Goblin Barrel Bait",
        cards: ["Goblin Barrel", "Princess", "Knight", "Goblin Gang", "Inferno Tower", "Rocket", "The Log", "Ice Spirit"],
        winRate: 0.57,
        usageRate: 0.12,
        avgTrophies: 5400
    },
    {
        id: 19,
        name: "Wall Breakers",
        cards: ["Wall Breakers", "Miner", "Skeleton King", "Bats", "Goblin Gang", "Poison", "The Log", "Ice Spirit"],
        winRate: 0.58,
        usageRate: 0.10,
        avgTrophies: 5500
    },
    {
        id: 20,
        name: "Giant Skeleton",
        cards: ["Giant Skeleton", "Sparky", "Wizard", "Tornado", "Goblin Gang", "Zap", "Fireball", "Minions"],
        winRate: 0.54,
        usageRate: 0.07,
        avgTrophies: 5100
    },
    {
        id: 21,
        name: "Ram Rider",
        cards: ["Ram Rider", "Royal Ghost", "Mega Minion", "Flying Machine", "Fireball", "Zap", "Bats", "Goblin Gang"],
        winRate: 0.56,
        usageRate: 0.09,
        avgTrophies: 5300
    },
    {
        id: 22,
        name: "Electro Giant",
        cards: ["Electro Giant", "Sparky", "Tornado", "Lightning", "Goblin Gang", "Zap", "Fireball", "Minions"],
        winRate: 0.55,
        usageRate: 0.08,
        avgTrophies: 5200
    },
    {
        id: 23,
        name: "Mega Knight Miner",
        cards: ["Mega Knight", "Miner", "Bats", "Goblin Gang", "Inferno Tower", "Poison", "The Log", "Ice Spirit"],
        winRate: 0.57,
        usageRate: 0.11,
        avgTrophies: 5400
    },
    {
        id: 24,
        name: "Skeleton Barrel",
        cards: ["Skeleton Barrel", "Giant", "Mega Minion", "Bats", "Goblin Gang", "Poison", "Zap", "Tornado"],
        winRate: 0.55,
        usageRate: 0.08,
        avgTrophies: 5200
    },
    {
        id: 25,
        name: "Goblin Drill",
        cards: ["Goblin Drill", "Miner", "Skeleton Dragons", "Bats", "Goblin Gang", "Poison", "The Log", "Ice Spirit"],
        winRate: 0.56,
        usageRate: 0.09,
        avgTrophies: 5300
    },
    {
        id: 26,
        name: "Royal Recruits",
        cards: ["Royal Recruits", "Battle Ram", "Mega Minion", "Flying Machine", "Fireball", "Zap", "Bats", "Goblin Gang"],
        winRate: 0.54,
        usageRate: 0.07,
        avgTrophies: 5100
    },
    {
        id: 27,
        name: "X-Bow 2.9",
        cards: ["X-Bow", "Tesla", "Archers", "Ice Golem", "Fireball", "The Log", "Skeletons", "Ice Spirit"],
        winRate: 0.55,
        usageRate: 0.08,
        avgTrophies: 5200
    },
    {
        id: 28,
        name: "Ice Bow",
        cards: ["X-Bow", "Ice Wizard", "Tornado", "Knight", "Archers", "Ice Spirit", "The Log", "Rocket"],
        winRate: 0.56,
        usageRate: 0.09,
        avgTrophies: 5300
    },
    {
        id: 29,
        name: "LumberLoon",
        cards: ["Lumberjack", "Balloon", "Mega Minion", "Skeleton Dragons", "Tombstone", "Arrows", "Fireball", "Minions"],
        winRate: 0.55,
        usageRate: 0.08,
        avgTrophies: 5200
    },
    {
        id: 30,
        name: "Giant Graveyard",
        cards: ["Giant", "Graveyard", "Poison", "Knight", "Archers", "Tombstone", "Tornado", "Baby Dragon"],
        winRate: 0.57,
        usageRate: 0.10,
        avgTrophies: 5400
    },
    {
        id: 31,
        name: "Evo Dart Goblin Bait",
        cards: ["Dart Goblin", "Goblin Barrel", "Princess", "Knight", "Tesla", "The Log", "Ice Spirit", "Rocket"],
        winRate: 0.59,
        usageRate: 0.11,
        avgTrophies: 5600
    },
    {
        id: 32,
        name: "Royal Hogs Recruits",
        cards: ["Royal Hogs", "Royal Recruits", "Barbarians", "Flying Machine", "Zappies", "Fireball", "The Log", "Goblin Cage"],
        winRate: 0.58,
        usageRate: 0.09,
        avgTrophies: 5500
    },
    {
        id: 33,
        name: "Splash Yard Control",
        cards: ["Graveyard", "Poison", "Baby Dragon", "Ice Wizard", "Tornado", "Knight", "Tombstone", "Barbarian Barrel"],
        winRate: 0.57,
        usageRate: 0.08,
        avgTrophies: 5400
    },
    {
        id: 34,
        name: "LumberLoon Freeze",
        cards: ["Lumberjack", "Balloon", "Freeze", "Tornado", "Baby Dragon", "Electro Dragon", "Bowler", "Inferno Dragon"],
        winRate: 0.56,
        usageRate: 0.07,
        avgTrophies: 5300
    },
    {
        id: 35,
        name: "RG Fish Hunter",
        cards: ["Royal Giant", "Fisherman", "Hunter", "Electro Spirit", "The Log", "Fireball", "Royal Ghost", "Mega Minion"],
        winRate: 0.55,
        usageRate: 0.08,
        avgTrophies: 5200
    },
    {
        id: 36,
        name: "Classic 2.6 Hog",
        cards: ["Hog Rider", "Musketeer", "Ice Spirit", "Skeletons", "Ice Golem", "Cannon", "Fireball", "The Log"],
        winRate: 0.51,
        usageRate: 0.18,
        avgTrophies: 5000
    },
    {
        id: 37,
        name: "Pekka Ram Spam",
        cards: ["P.E.K.K.A", "Battle Ram", "Bandit", "Royal Ghost", "Electro Wizard", "Magic Archer", "Zap", "Poison"],
        winRate: 0.56,
        usageRate: 0.12,
        avgTrophies: 5400
    },
    {
        id: 38,
        name: "Electro Giant Beatdown",
        cards: ["Electro Giant", "Lightning", "Tornado", "Golden Knight", "Cannon Cart", "Baby Dragon", "Barbarian Barrel", "Ice Wizard"],
        winRate: 0.54,
        usageRate: 0.06,
        avgTrophies: 5200
    },
    {
        id: 39,
        name: "Ram Rider Control",
        cards: ["Ram Rider", "Mega Knight", "Bandit", "Electro Wizard", "Barbarian Barrel", "Poison", "Giant Snowball", "Royal Ghost"],
        winRate: 0.55,
        usageRate: 0.07,
        avgTrophies: 5300
    },
    {
        id: 40,
        name: "Miner Wall Breakers",
        cards: ["Miner", "Wall Breakers", "Bomb Tower", "Knight", "Archers", "The Log", "Fireball", "Spear Goblins"],
        winRate: 0.57,
        usageRate: 0.09,
        avgTrophies: 5400
    },
    {
        id: 41,
        name: "Giant Double Prince Classic",
        cards: ["Giant", "Prince", "Dark Prince", "Mega Minion", "Electro Wizard", "Fireball", "Zap", "Minions"],
        winRate: 0.54,
        usageRate: 0.08,
        avgTrophies: 5100
    },
    {
        id: 42,
        name: "Mega Knight Bridge Spam",
        cards: ["Mega Knight", "Ram Rider", "Bandit", "Royal Ghost", "Electro Wizard", "Giant Snowball", "Lightning", "Inferno Dragon"],
        winRate: 0.56,
        usageRate: 0.10,
        avgTrophies: 5400
    },
    {
        id: 43,
        name: "Royal Recruits Bait",
        cards: ["Royal Recruits", "Goblin Gang", "Dart Goblin", "Skeleton Barrel", "Wall Breakers", "Arrows", "Miner", "Fire Spirit"],
        winRate: 0.55,
        usageRate: 0.07,
        avgTrophies: 5200
    },
    {
        id: 44,
        name: "Goblin Drill Poison",
        cards: ["Goblin Drill", "Poison", "Inferno Tower", "Knight", "Valkyrie", "The Log", "Tesla", "Fire Spirit"],
        winRate: 0.56,
        usageRate: 0.08,
        avgTrophies: 5300
    },
    {
        id: 45,
        name: "Sparky Giant Rage",
        cards: ["Giant", "Sparky", "Rage", "Mini P.E.K.K.A", "Mega Minion", "Electro Wizard", "Zap", "Dark Prince"],
        winRate: 0.53,
        usageRate: 0.05,
        avgTrophies: 5100
    },
    {
        id: 46,
        name: "Golem NW Lightning",
        cards: ["Golem", "Night Witch", "Lightning", "Baby Dragon", "Mega Minion", "Tornado", "Lumberjack", "Barbarian Barrel"],
        winRate: 0.55,
        usageRate: 0.07,
        avgTrophies: 5200
    },
    {
        id: 47,
        name: "LavaLoon Classic",
        cards: ["Lava Hound", "Balloon", "Mega Minion", "Minions", "Tombstone", "Fireball", "Zap", "Guards"],
        winRate: 0.56,
        usageRate: 0.08,
        avgTrophies: 5300
    },
    {
        id: 48,
        name: "Graveyard Poison Knight",
        cards: ["Graveyard", "Poison", "Knight", "Baby Dragon", "Ice Wizard", "Tornado", "Tombstone", "Barbarian Barrel"],
        winRate: 0.57,
        usageRate: 0.09,
        avgTrophies: 5400
    },
    {
        id: 49,
        name: "Hog Earthquake",
        cards: ["Hog Rider", "Valkyrie", "Musketeer", "Tesla", "Earthquake", "The Log", "Ice Spirit", "Skeletons"],
        winRate: 0.54,
        usageRate: 0.13,
        avgTrophies: 5200
    },
    {
        id: 50,
        name: "Balloon Cycle",
        cards: ["Balloon", "Miner", "Ice Golem", "Musketeer", "Tesla", "The Log", "Fireball", "Skeletons"],
        winRate: 0.53,
        usageRate: 0.06,
        avgTrophies: 5100
    },
    {
        id: 51,
        name: "Mega Knight Zap Bait",
        cards: ["Mega Knight", "Skeleton Barrel", "Goblin Gang", "Spear Goblins", "Inferno Dragon", "Bats", "Miner", "Giant Snowball"],
        winRate: 0.55,
        usageRate: 0.09,
        avgTrophies: 5300
    },
    {
        id: 52,
        name: "E-Giant Golden Knight",
        cards: ["Electro Giant", "Golden Knight", "Lightning", "Tornado", "Cannon", "Ice Spirit", "The Log", "Baby Dragon"],
        winRate: 0.56,
        usageRate: 0.07,
        avgTrophies: 5400
    },
    {
        id: 53,
        name: "Royal Giant Fisherman",
        cards: ["Royal Giant", "Fisherman", "Hunter", "Electro Spirit", "The Log", "Fireball", "Mega Minion", "Skeletons"],
        winRate: 0.55,
        usageRate: 0.08,
        avgTrophies: 5200
    },
    {
        id: 54,
        name: "Giant Skeleton Hunter",
        cards: ["Giant Skeleton", "Hunter", "Fisherman", "Royal Ghost", "The Log", "Fireball", "Electro Spirit", "Royal Giant"],
        winRate: 0.54,
        usageRate: 0.05,
        avgTrophies: 5200
    },
    {
        id: 55,
        name: "Three Musketeers Pump",
        cards: ["Three Musketeers", "Elixir Collector", "Battle Ram", "Ice Golem", "Barbarians", "Zap", "Minions", "Royal Ghost"],
        winRate: 0.52,
        usageRate: 0.04,
        avgTrophies: 5300
    },
    {
        id: 56,
        name: "Lava Hound Double Dragons",
        cards: ["Lava Hound", "Inferno Dragon", "Skeleton Dragons", "Miner", "Fireball", "Zap", "Barbarians", "Mega Minion"],
        winRate: 0.57,
        usageRate: 0.06,
        avgTrophies: 5500
    },
    {
        id: 57,
        name: "Sparky Goblin Giant Rage",
        cards: ["Goblin Giant", "Sparky", "Rage", "Mini P.E.K.K.A", "Electro Wizard", "Dark Prince", "Mega Minion", "Zap"],
        winRate: 0.54,
        usageRate: 0.05,
        avgTrophies: 5200
    },
    {
        id: 58,
        name: "X-Bow 3.0",
        cards: ["X-Bow", "Tesla", "Knight", "Archers", "The Log", "Fireball", "Skeletons", "Ice Spirit"],
        winRate: 0.52,
        usageRate: 0.08,
        avgTrophies: 5300
    },
    {
        id: 59,
        name: "Mortar Skeleton King",
        cards: ["Mortar", "Skeleton King", "Miner", "Musketeer", "Valkyrie", "The Log", "Fireball", "Minions"],
        winRate: 0.55,
        usageRate: 0.06,
        avgTrophies: 5400
    },
    {
        id: 60,
        name: "Goblin Drill Cycle",
        cards: ["Goblin Drill", "Bomber", "Wall Breakers", "Fire Spirit", "The Log", "Tesla", "Valkyrie", "Skeletons"],
        winRate: 0.54,
        usageRate: 0.07,
        avgTrophies: 5300
    },
    // NEW BATCH - Specifically designed to avoid Zap/Fireball/Log overlap issues
    {
        id: 61,
        name: "LavaLoon Arrows",
        cards: ["Lava Hound", "Balloon", "Mega Minion", "Minions", "Guards", "Arrows", "Lightning", "Tombstone"],
        winRate: 0.56,
        usageRate: 0.04,
        avgTrophies: 5400
    },
    {
        id: 62,
        name: "Recruits Hogs Arrows",
        cards: ["Royal Recruits", "Royal Hogs", "Flying Machine", "Zappies", "Goblin Cage", "Arrows", "Royal Delivery", "Fire Spirit"],
        winRate: 0.55,
        usageRate: 0.03,
        avgTrophies: 5300
    },
    {
        id: 63,
        name: "Log Bait Princess Rocket",
        cards: ["Princess", "Goblin Gang", "Goblin Barrel", "Knight", "Ice Spirit", "The Log", "Inferno Tower", "Rocket"],
        winRate: 0.53,
        usageRate: 0.12,
        avgTrophies: 5200
    },
    {
        id: 64,
        name: "Clone Golem",
        cards: ["Golem", "Night Witch", "Baby Dragon", "Lumberjack", "Clone", "Tornado", "Skeleton Army", "Arrows"], // Uses Arrows instead of Zap
        winRate: 0.52,
        usageRate: 0.02,
        avgTrophies: 5000
    },
    {
        id: 65,
        name: "Egolem Healer",
        cards: ["Elixir Golem", "Battle Healer", "Electro Dragon", "Tornado", "Barbarian Barrel", "Baby Dragon", "Hut of Barbarians", "Arrows"],
        winRate: 0.54,
        usageRate: 0.03,
        avgTrophies: 5100
    },
    {
        id: 66,
        name: "Pekka BS Poison",
        cards: ["P.E.K.K.A", "Battle Ram", "Bandit", "Royal Ghost", "Magic Archer", "Electro Wizard", "Poison", "Zap"], // Might conflict but good to have
        winRate: 0.51,
        usageRate: 0.15,
        avgTrophies: 5300
    },
    {
        id: 67,
        name: "Hog Exe Nado",
        cards: ["Hog Rider", "Executioner", "Tornado", "Valkyrie", "The Log", "Rocket", "Ice Spirit", "Goblins"],
        winRate: 0.52,
        usageRate: 0.06,
        avgTrophies: 5200
    },
    {
        id: 68,
        name: "Miner Wall Breakers MA",
        cards: ["Miner", "Wall Breakers", "Magic Archer", "Tornado", "Bomb Tower", "Spear Goblins", "Knight", "Arrows"],
        winRate: 0.55,
        usageRate: 0.04,
        avgTrophies: 5400
    },
    {
        id: 69,
        name: "Royal Giant Mother Witch",
        cards: ["Royal Giant", "Mother Witch", "Fisherman", "Mega Minion", "Dark Prince", "Fireball", "The Log", "Electro Spirit"],
        winRate: 0.54,
        usageRate: 0.05,
        avgTrophies: 5300
    },
    {
        id: 70,
        name: "Giant Sparky Arrows",
        cards: ["Giant", "Sparky", "Mini P.E.K.K.A", "Minion Horde", "Arrows", "Giant Snowball", "Bats", "Skeleton Army"],
        winRate: 0.51,
        usageRate: 0.03,
        avgTrophies: 5000
    },
    {
        id: 71,
        name: "Valkyrie Hog EQ",
        cards: ["Hog Rider", "Valkyrie", "Earthquake", "Tesla", "Firecracker", "The Log", "Skeletons", "Ice Spirit"],
        winRate: 0.53,
        usageRate: 0.08,
        avgTrophies: 5200
    },
    {
        id: 72,
        name: "Splashyard Knight BabyD",
        cards: ["Graveyard", "Baby Dragon", "Knight", "Ice Wizard", "Poison", "Tornado", "Tombstone", "Barbarian Barrel"],
        winRate: 0.56,
        usageRate: 0.10,
        avgTrophies: 5400
    },
    {
        id: 73,
        name: "Bridge Spam Royal Ghost",
        cards: ["Battle Ram", "Royal Ghost", "Bandit", "P.E.K.K.A", "Poison", "Zap", "Electro Wizard", "Magic Archer"],
        winRate: 0.52,
        usageRate: 0.11,
        avgTrophies: 5300
    },
    {
        id: 74,
        name: "Double Barrel Bait",
        cards: ["Goblin Barrel", "Skeleton Barrel", "Dart Goblin", "Princess", "Goblin Gang", "Prince", "The Log", "Rocket"],
        winRate: 0.50,
        usageRate: 0.05,
        avgTrophies: 5100
    },
    {
        id: 75,
        name: "Miner Loons",
        cards: ["Balloon", "Miner", "Inferno Tower", "Ice Golem", "Zap", "Fireball", "Skeleton Dragons", "Barbarian Barrel"],
        winRate: 0.52,
        usageRate: 0.03,
        avgTrophies: 5200
    },
    {
        id: 76,
        name: "Royal Hogs EQ",
        cards: ["Royal Hogs", "Earthquake", "Royal Delivery", "Hunter", "Fisherman", "Heal Spirit", "Skeletons", "The Log"],
        winRate: 0.55,
        usageRate: 0.04,
        avgTrophies: 5300
    },
    {
        id: 77,
        name: "Mortar Miner Poison",
        cards: ["Mortar", "Miner", "Poison", "The Log", "Prince", "Spear Goblins", "Bats", "Rascals"],
        winRate: 0.54,
        usageRate: 0.02,
        avgTrophies: 5200
    },
    {
        id: 78,
        name: "Giant Skeleton Balloon",
        cards: ["Giant Skeleton", "Balloon", "Tornado", "Tesla", "Musketeer", "Ice Spirit", "Skeletons", "Arrows"], // Arrows variant
        winRate: 0.51,
        usageRate: 0.01,
        avgTrophies: 5000
    },
    {
        id: 79,
        name: "Mega Knight Miner Zap Bait",
        cards: ["Mega Knight", "Miner", "Zap", "Goblin Gang", "Spear Goblins", "Bats", "Skeleton Barrel", "Inferno Dragon"],
        winRate: 0.54,
        usageRate: 0.06,
        avgTrophies: 5300
    },
    {
        id: 80,
        name: "Three M Royal Hogs",
        cards: ["Three Musketeers", "Royal Hogs", "Hunter", "Ice Golem", "Bandit", "Barbarian Barrel", "Heal Spirit", "Royal Ghost"],
        winRate: 0.53,
        usageRate: 0.02,
        avgTrophies: 5200
    }
];

/**
 * Score a deck based on user's card levels
 * Returns a score from 0-100, higher is better
 */
function scoreDeck(deck, userCards) {
    const userCardMap = new Map();
    userCards.forEach(card => {
        const normalizedName = normalizeCardName(card.name);
        const normalizedRarity = card.rarity ? card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1).toLowerCase() : 'Common';
        const displayLevel = convertLevel(card.level, normalizedRarity);
        userCardMap.set(normalizedName, {
            level: displayLevel,
            maxLevel: MAX_LEVELS[normalizedRarity] || 16,
            rarity: normalizedRarity
        });
    });

    let totalScore = 0;
    let cardsFound = 0;
    let levelSum = 0;

    deck.cards.forEach(cardName => {
        const normalizedName = normalizeCardName(cardName);
        const userCard = userCardMap.get(normalizedName);
        if (userCard) {
            cardsFound++;
            // Score based on level relative to max level
            const levelRatio = userCard.level / userCard.maxLevel;
            levelSum += levelRatio;
        }
    });

    // Calculate average level ratio
    const avgLevelRatio = cardsFound > 0 ? levelSum / cardsFound : 0;

    // Score components:
    // 40% - Card availability (do they have all cards?)
    // 40% - Average level ratio
    // 20% - Deck win rate
    const availabilityScore = (cardsFound / deck.cards.length) * 40;
    const levelScore = avgLevelRatio * 40;
    const winRateScore = deck.winRate * 20;

    totalScore = availabilityScore + levelScore + winRateScore;

    return {
        score: totalScore,
        cardsFound,
        totalCards: deck.cards.length,
        avgLevelRatio,
        availabilityScore,
        levelScore,
        winRateScore
    };
}

/**
 * Normalize card names for consistent matching
 */
function normalizeCardName(name) {
    if (!name) return "";
    let normalized = name.trim();
    const lower = normalized.toLowerCase();

    // Normalization mappings
    if (lower === 'log') return 'The Log';
    if (lower === 'the log') return 'The Log';
    if (lower === 'walkyrie') return 'Valkyrie';
    if (lower === 'ghost') return 'Royal Ghost';
    if (lower === 'esperito de fuego') return 'Fire Spirit';

    return normalized;
}

/**
 * Check if two decks share any cards
 */
function hasDuplicateCards(deck1, deck2) {
    const cards1 = new Set(deck1.cards.map(normalizeCardName));
    return deck2.cards.some(card => cards1.has(normalizeCardName(card)));
}

/**
 * Find the best 4 decks with no duplicate cards
 * Uses a backtracking approach to ensure no duplicates
 */
/**
 * Find the best 4 decks with no duplicate cards
 * The first deck is FIXED to the user's current battle deck
 */
function findBestDecks(userCards, allDecks, currentBattleDeck = null) {
    console.log(`\n=== DECK SELECTION ANALYSIS ===`);
    console.log(`Total meta decks available: ${allDecks.length}`);

    // 1. Process Fixed First Deck (Current Battle Deck)
    let fixedDeck = null;
    if (currentBattleDeck && currentBattleDeck.length > 0) {
        fixedDeck = {
            id: 'current-battle-deck',
            name: "Current Battle Deck",
            cards: currentBattleDeck.map(c => c.name),
            winRate: 0.50, // Default for current deck
            usageRate: 0.01,
            avgTrophies: 0,
            isFixed: true
        };
        console.log(`✓ Fixed Deck 1: [${fixedDeck.cards.join(', ')}]`);
    }

    // Score all decks
    const scoredDecks = allDecks.map(deck => ({
        ...deck,
        scoring: scoreDeck(deck, userCards)
    }));

    // Calculate average level for each deck
    const userCardMap = window.userCardMap || new Map();
    scoredDecks.forEach(deck => {
        let totalLevel = 0;
        let cardsWithLevels = 0;

        deck.cards.forEach(cardName => {
            const normalizedName = normalizeCardName(cardName);
            const userCard = userCardMap.get(normalizedName);
            if (userCard && userCard.level) {
                totalLevel += userCard.level;
                cardsWithLevels++;
            }
        });

        deck.avgLevel = cardsWithLevels > 0 ? totalLevel / cardsWithLevels : 0;
    });

    // Handle fixed deck scoring and level
    if (fixedDeck) {
        fixedDeck.scoring = scoreDeck(fixedDeck, userCards);
        let totalLevel = 0;
        let cardsWithLevels = 0;
        fixedDeck.cards.forEach(cardName => {
            const normalizedName = normalizeCardName(cardName);
            const userCard = userCardMap.get(normalizedName);
            if (userCard && userCard.level) {
                totalLevel += userCard.level;
                cardsWithLevels++;
            }
        });
        fixedDeck.avgLevel = cardsWithLevels > 0 ? totalLevel / cardsWithLevels : 0;
    }

    // Filter out meta decks that conflict with the fixed deck
    let poolForSearch = scoredDecks;
    if (fixedDeck) {
        const fixedNormalizedCards = new Set(fixedDeck.cards.map(normalizeCardName));
        poolForSearch = scoredDecks.filter(deck => {
            return !deck.cards.some(card => fixedNormalizedCards.has(normalizeCardName(card)));
        });
        console.log(`Available meta decks after removing conflicts with Deck 1: ${poolForSearch.length}`);
    }

    // Sort pool by average level (highest first), then by score
    poolForSearch.sort((a, b) => {
        if (b.avgLevel !== a.avgLevel) {
            return b.avgLevel - a.avgLevel;
        }
        return b.scoring.score - a.scoring.score;
    });

    // Find additional decks
    const targetCount = fixedDeck ? 3 : 4;
    console.log(`\nSearching for ${targetCount} additional decks with no duplicates using backtracking...`);
    const additionalDecks = findBestCombination(poolForSearch, targetCount);

    let finalDecks = [];
    if (fixedDeck) {
        finalDecks.push(fixedDeck);
    }
    finalDecks = finalDecks.concat(additionalDecks);

    if (finalDecks.length >= (fixedDeck ? 4 : 4)) {
        console.log(`\n✓ Found ${finalDecks.length} decks: ${finalDecks.map(d => d.name).join(', ')}`);
        window.lastRecommendedDecks = finalDecks;
        return finalDecks;
    }

    // Fallback if backtracking fails to find enough disjoint decks
    console.log(`\n✗ Could only find ${finalDecks.length} disjoint decks`);
    return finalDecks;
}

/**
 * Validate that no cards are duplicated across decks
 */
function validateNoDuplicates(decks) {
    const cardCounts = new Map();
    const duplicates = [];

    decks.forEach((deck, deckIndex) => {
        deck.cards.forEach(card => {
            const count = cardCounts.get(card) || 0;
            cardCounts.set(card, count + 1);
            if (count > 0) {
                duplicates.push({ card, deckIndex });
            }
        });
    });

    return {
        valid: duplicates.length === 0,
        duplicates: duplicates,
        cardCounts: cardCounts
    };
}

/**
 * Fix duplicates by replacing decks that have duplicates
 */
function fixDuplicates(currentDecks, allScoredDecks) {
    const validation = validateNoDuplicates(currentDecks);
    if (validation.valid) {
        return currentDecks;
    }

    // Find which cards are duplicated
    const duplicateCards = new Set();
    validation.cardCounts.forEach((count, card) => {
        if (count > 1) {
            duplicateCards.add(card);
        }
    });

    // Try to replace decks that have duplicates
    const fixedDecks = [...currentDecks];
    const usedCards = new Set();

    // Build used cards set from non-duplicate decks
    fixedDecks.forEach(deck => {
        const hasDup = deck.cards.some(card => duplicateCards.has(card));
        if (!hasDup) {
            deck.cards.forEach(card => usedCards.add(card));
        }
    });

    // Replace decks with duplicates
    for (let i = 0; i < fixedDecks.length; i++) {
        const deck = fixedDecks[i];
        const hasDup = deck.cards.some(card => duplicateCards.has(card));

        if (hasDup) {
            // Try to find a replacement with no duplicates
            let foundReplacement = false;
            for (const candidate of allScoredDecks) {
                if (fixedDecks.includes(candidate)) continue;

                const candidateHasDup = candidate.cards.some(card => usedCards.has(card));
                if (!candidateHasDup) {
                    fixedDecks[i] = candidate;
                    candidate.cards.forEach(card => usedCards.add(card));
                    foundReplacement = true;
                    break;
                }
            }

            // If no perfect replacement found, try one with minimal duplicates
            if (!foundReplacement) {
                let bestCandidate = null;
                let minDuplicates = Infinity;

                for (const candidate of allScoredDecks) {
                    if (fixedDecks.includes(candidate)) continue;

                    const duplicateCount = candidate.cards.filter(card => usedCards.has(card)).length;
                    if (duplicateCount < minDuplicates) {
                        minDuplicates = duplicateCount;
                        bestCandidate = candidate;
                    }
                }

                if (bestCandidate) {
                    fixedDecks[i] = bestCandidate;
                    bestCandidate.cards.forEach(card => usedCards.add(card));
                }
            }
        }
    }

    // Ensure we still have 4 decks
    return fixedDecks.length === 4 ? fixedDecks : currentDecks;
}

/**
 * Find the best combination of decks with no duplicate cards
 * Uses backtracking to explore all valid combinations
 */
function findBestCombination(scoredDecks, targetCount) {
    let bestCombination = [];
    let bestScore = -1;
    let bestAvgLevel = -1;
    let combinationsTried = 0;
    let validCombinationsFound = 0;
    const MAX_COMBINATIONS = 100000;

    // Normalize and pre-calculate cards for all decks
    const decksWithNormalizedCards = scoredDecks.map(deck => ({
        ...deck,
        normalizedCardsSet: new Set(deck.cards.map(normalizeCardName))
    }));

    // Pre-calculate conflict matrix for faster checking
    const conflictMatrix = new Array(decksWithNormalizedCards.length);
    for (let i = 0; i < decksWithNormalizedCards.length; i++) {
        conflictMatrix[i] = new Array(decksWithNormalizedCards.length).fill(false);
        for (let j = 0; j < i; j++) {
            const hasConflict = [...decksWithNormalizedCards[i].normalizedCardsSet].some(card =>
                decksWithNormalizedCards[j].normalizedCardsSet.has(card)
            );
            conflictMatrix[i][j] = hasConflict;
            conflictMatrix[j][i] = hasConflict;
        }
    }

    // Heuristic: Pre-calculate max possible remaining score for pruning
    const maxPossibleScores = new Array(decksWithNormalizedCards.length + 1).fill(0);
    for (let i = decksWithNormalizedCards.length - 1; i >= 0; i--) {
        maxPossibleScores[i] = Math.max(maxPossibleScores[i + 1], decksWithNormalizedCards[i].scoring.score);
    }

    function backtrack(currentIdxs, startIndex) {
        combinationsTried++;
        if (combinationsTried > MAX_COMBINATIONS) return;

        if (currentIdxs.length === targetCount) {
            validCombinationsFound++;
            const currentDecks = currentIdxs.map(idx => decksWithNormalizedCards[idx]);
            const totalScore = currentDecks.reduce((sum, deck) => sum + deck.scoring.score, 0);
            const avgLevel = currentDecks.reduce((sum, deck) => sum + (deck.avgLevel || 0), 0) / targetCount;

            // Priority: Maxitize Average Level, then Total Score
            if (bestCombination.length === 0 ||
                avgLevel > bestAvgLevel ||
                (Math.abs(avgLevel - bestAvgLevel) < 0.01 && totalScore > bestScore)) {
                bestScore = totalScore;
                bestAvgLevel = avgLevel;
                bestCombination = [...currentDecks];
            }
            return;
        }

        const remainingNeeded = targetCount - currentIdxs.length;
        if (startIndex + remainingNeeded > decksWithNormalizedCards.length) return;

        // Pruning: If even adding the highest scoring decks remaining can't beat bestScore
        // This is only applicable if we are optimizing for score and have the same avgLevel
        // For avgLevel optimization, it's harder to prune without tracking max levels

        for (let i = startIndex; i < decksWithNormalizedCards.length; i++) {
            // Check conflicts with already selected decks using matrix
            let hasConflict = false;
            for (const selectedIdx of currentIdxs) {
                if (conflictMatrix[i][selectedIdx]) {
                    hasConflict = true;
                    break;
                }
            }

            if (!hasConflict) {
                currentIdxs.push(i);
                backtrack(currentIdxs, i + 1);
                currentIdxs.pop();

                // If we found a perfect set (all max level) we could potentially stop
                // But usually we want to find the best possible
                if (bestAvgLevel >= 15 && validCombinationsFound > 50) return;
            }
        }
    }

    console.log(`Starting backtracking with ${decksWithNormalizedCards.length} decks, looking for ${targetCount} decks...`);
    backtrack([], 0);

    console.log(`Backtracking tried ${combinationsTried} combinations, found ${validCombinationsFound} valid ${targetCount}-deck combinations`);
    return bestCombination;
}

/**
 * Generate a "How to Play" guide based on the deck's composition and archetype
 */
function getDeckGuide(deck) {
    const cards = new Set(deck.cards.map(normalizeCardName));
    const name = deck.name.toLowerCase();

    // Archetype detection and guide generation
    let archetype = "Control";
    let strategy = "Balanced";
    let combos = [];
    let tip = "";

    if (name.includes("beatdown") || cards.has("Golem") || cards.has("Lava Hound") || cards.has("Giant") || cards.has("Electro Giant")) {
        archetype = "Beatdown";
        strategy = "Aggressive Pushes";
        combos = ["Tank + Support in the back", "Sacrifice tower health for Elixir advantage", "Build a massive 3-crown push in Double Elixir"];
        tip = "Don't overcommit on defense. Value your heavy hitters.";
    } else if (name.includes("cycle") || cards.has("Hog Rider") || cards.has("Miner") || cards.has("Wall Breakers") || cards.has("Goblin Drill")) {
        archetype = "Cycle";
        strategy = "Fast Pressure";
        combos = ["Quick win-condition placements", "Defend with cheap cards + buildings", "Out-rotate your opponent's counters"];
        tip = "Keep your cycle moving and don't let them build big pushes.";
    } else if (name.includes("bait") || cards.has("Goblin Barrel") || cards.has("Skeleton Barrel")) {
        archetype = "Bait";
        strategy = "Spell Exhaustion";
        combos = ["Princess/Swarm to bait Log/Arrows", "Punish with Goblin Barrel", "Chip damage with Rocket/Fireball"];
        tip = "Track their spell cycle carefully. Punish every mistake.";
    } else if (name.includes("siege") || cards.has("X-Bow") || cards.has("Mortar")) {
        archetype = "Siege";
        strategy = "Defensive Offense";
        combos = ["Place Siege building + Protect it", "Predictive spells for counters", "Spell cycle if necessary"];
        tip = "If your building is locked on, prioritize protection over everything.";
    } else if (name.includes("bridge spam") || cards.has("Battle Ram") || cards.has("Ram Rider") || cards.has("Bandit") || cards.has("Royal Ghost")) {
        archetype = "Bridge Spam";
        strategy = "Punishment & Speed";
        combos = ["Punish low elixir with fast units", "Dual lane pressure", "Convert defense to offense quickly"];
        tip = "Keep them on their toes. Constant pressure is your best friend.";
    } else if (name.includes("graveyard") || cards.has("Graveyard")) {
        archetype = "Graveyard Control";
        strategy = "Defensive Counter-Push";
        combos = ["Tank (Giant/Knight) + Graveyard", "Poison to clear defenders", "Strict defense until a counter-push arises"];
        tip = "Placement timing is everything. Wait for the tower to lock on your tank.";
    } else {
        // Fallback for unique or unknown decks
        if (deck.isFixed) {
            archetype = "Signature Deck";
            strategy = "Custom Masterpiece";
            combos = ["You created this legend!", "Maximum surprise factor", "Proven in your own battles"];
            tip = "This is a rare deck, but it's your battledeck, you should know how to use it! 😉";
        } else {
            archetype = "Hybrid / Unknown";
            strategy = "Adaptable Control";
            combos = ["Play safe until you see their win-con", "Patience is your best weapon", "Counter-push with defensive remnants"];
            tip = "This is a unique combination. Stay flexible and adapt to their tempo.";
        }
    }

    return `
        <div class="space-y-3">
            <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span class="text-xs font-bold uppercase tracking-widest text-primary">Archetype</span>
                <span class="text-xs font-extrabold text-slate-800 dark:text-white px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">${archetype}</span>
            </div>
            <div>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Primary Strategy</p>
                <p class="text-sm font-bold text-slate-700 dark:text-slate-200">${strategy}</p>
            </div>
            <div>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-2">Key Tactics</p>
                <ul class="list-disc list-inside space-y-1">
                    ${combos.map(c => `<li class="text-xs text-slate-600 dark:text-slate-400">${c}</li>`).join('')}
                </ul>
            </div>
            <div class="bg-accent/10 border-l-4 border-accent p-3 rounded-r-lg">
                <p class="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Pro Tip</p>
                <p class="text-xs italic text-slate-700 dark:text-slate-200">"${tip}"</p>
            </div>
        </div>
    `;
}

/**
 * Show the guide modal
 */
function showGuide(deckId) {
    const deck = POPULAR_DECKS.find(d => d.id == deckId) ||
        (window.lastRecommendedDecks && window.lastRecommendedDecks.find(d => d.id == deckId));

    if (!deck) return;

    const modal = document.getElementById('guideModal');
    const title = document.getElementById('guideTitle');
    const content = document.getElementById('guideContent');

    title.textContent = `How to Play: ${deck.name}`;
    content.innerHTML = getDeckGuide(deck);

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.replace('opacity-0', 'opacity-100');
        modal.querySelector('div').classList.replace('scale-95', 'scale-100');
    }, 10);
}

/**
 * Close the guide modal
 */
function closeGuide() {
    const modal = document.getElementById('guideModal');
    modal.classList.replace('opacity-100', 'opacity-0');
    modal.querySelector('div').classList.replace('scale-100', 'scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

/**
 * Copy deck to Clash Royale
 */
function copyDeck(deckId, event) {
    const deck = POPULAR_DECKS.find(d => d.id == deckId) ||
        (window.lastRecommendedDecks && window.lastRecommendedDecks.find(d => d.id == deckId));

    if (!deck) return;

    if (!window.allCardsIdMap) {
        alert("Card data not fully loaded. Please refresh and try again.");
        return;
    }

    const cardIds = deck.cards.map(cardName => {
        const normalized = normalizeCardName(cardName);
        return window.allCardsIdMap.get(normalized);
    }).filter(id => id !== undefined);

    if (cardIds.length < 8) {
        console.warn("Could not find IDs for all cards in deck:", deck.name);
    }

    const deckLink = `https://link.clashroyale.com/deck/en?deck=${cardIds.join(';')}`;

    // Create a temporary indicator
    const btn = event.currentTarget;
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<span class="material-icons-round text-[14px]">check</span><span class="text-[9px] font-bold uppercase tracking-tighter">Opening...</span>';
    btn.classList.add('bg-green-100', 'text-green-600', 'border-green-200');

    setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.classList.remove('bg-green-100', 'text-green-600', 'border-green-200');
    }, 2000);

    window.open(deckLink, '_blank');
}

/**
 * Render a single deck card
 */
function renderDeck(deck, index) {
    const scoring = deck.scoring;
    const scorePercent = Math.round(scoring.score);
    const cardsHtml = deck.cards.map(cardName => {
        // Find card data
        let userCard = window.userCardMap?.get(cardName);
        // Try alternative name if card not found (e.g., "Log" vs "The Log")
        if (!userCard && cardName === 'Log') {
            userCard = window.userCardMap?.get('The Log');
        }
        if (!userCard && cardName === 'The Log') {
            userCard = window.userCardMap?.get('Log');
        }

        let level = 0;
        if (userCard) {
            level = userCard.level !== undefined && userCard.level !== null ? userCard.level : 0;
        }
        const rarity = userCard ? userCard.rarity : 'Common';
        const cardData = userCard?.cardData;
        const elixirCost = cardData?.elixirCost || cardData?.elixir || 0;

        // Check if user owns evolved variant and use evolution image if available
        let imageUrl = cardData?.iconUrls?.medium || '';
        if (cardData && userCard) {
            // Check if card can evolve (has maxEvolutionLevel > 0)
            const canEvolve = (userCard.maxEvolutionLevel || cardData.maxEvolutionLevel || 0) > 0;
            // Check if user owns evolved variant (has evolutionLevel > 0)
            const hasEvolved = (userCard.evolutionLevel || 0) > 0;

            if (canEvolve && hasEvolved && cardData.iconUrls?.evolutionMedium) {
                imageUrl = cardData.iconUrls.evolutionMedium;
            }
        }

        // Determine border color based on rarity
        const rarityColors = {
            'Common': '#9CA3AF',
            'Rare': '#F97316',
            'Epic': '#A855F7',
            'Legendary': '#EAB308',
            'Champion': '#EF4444'
        };
        const borderColor = rarityColors[rarity] || '#9CA3AF';

        return `
            <div class="relative w-14 h-18 rounded-md border-2 bg-slate-800 overflow-hidden shadow-sm" style="border-color: ${borderColor};">
                ${imageUrl ? `
                    <img 
                        alt="${cardName}" 
                        class="w-full h-full object-cover" 
                        src="${imageUrl}"
                        onerror="this.style.display='none'"
                    />
                ` : `
                    <div class="w-full h-full flex items-center justify-center bg-slate-700">
                        <span class="text-white text-[7px] text-center px-1">${cardName}</span>
                    </div>
                `}
                <div class="absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-accent border border-white flex items-center justify-center shadow-sm">
                    <span class="text-white text-[7px] font-bold">${elixirCost}</span>
                </div>
                <div class="absolute bottom-0 w-full bg-primary/80 py-0.5 text-center">
                    <span class="text-white text-[7px] font-bold">Lv ${level || 0}</span>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="bg-surface-light dark:bg-surface-dark rounded-lg border border-primary/20 p-3 shadow-md hover:border-primary/40 transition-colors">
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2 overflow-hidden">
                    <h3 class="font-display text-base text-slate-900 dark:text-white truncate">Deck ${index + 1}: ${deck.name}</h3>
                    ${deck.isFixed ? `<span class="px-1.5 py-0.5 rounded text-[8px] bg-accent/20 text-accent font-bold border border-accent/20 uppercase tracking-tighter whitespace-nowrap">Current Deck</span>` : ''}
                </div>
                <div class="flex items-center gap-1.5 ml-2 flex-shrink-0">
                    <button 
                        onclick="showGuide('${deck.id || 0}')" 
                        class="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all active:scale-95 group shadow-sm"
                        title="How to Play"
                    >
                        <span class="material-icons-round text-[14px]">menu_book</span>
                        <span class="text-[9px] font-bold uppercase tracking-tighter">Guide</span>
                    </button>
                    <button 
                        onclick="copyDeck('${deck.id || 0}', event)" 
                        class="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all active:scale-95 group shadow-sm"
                        title="Copy to Clash Royale"
                    >
                        <span class="material-icons-round text-[14px]">content_copy</span>
                        <span class="text-[9px] font-bold uppercase tracking-tighter">Copy</span>
                    </button>
                    <div class="text-right">
                        <span class="text-xs font-bold text-primary">${(deck.winRate * 100).toFixed(1)}%</span>
                        <span class="text-[10px] text-slate-500 ml-0.5">Win</span>
                    </div>
                    <div class="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
                    <div class="text-right">
                        <span class="text-xs font-bold text-slate-700 dark:text-slate-300">${scorePercent}</span>
                        <span class="text-[10px] text-slate-500 ml-0.5">Score</span>
                    </div>
                </div>
            </div>
            
            <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2 text-[10px] text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                <div class="flex items-center">
                    <span class="opacity-70">Avg Level:</span>
                    <span class="font-bold ml-1 text-slate-700 dark:text-slate-200">${deck.avgLevel ? deck.avgLevel.toFixed(1) : 'N/A'}</span>
                </div>
                <div class="flex items-center">
                    <span class="opacity-70">Usage:</span>
                    <span class="font-bold ml-1 text-slate-700 dark:text-slate-200">${(deck.usageRate * 100).toFixed(1)}%</span>
                </div>
                <div class="flex items-center">
                    <span class="opacity-70">Trophies:</span>
                    <span class="font-bold ml-1 text-slate-700 dark:text-slate-200">${deck.avgTrophies}</span>
                </div>
                <div class="flex items-center ml-auto">
                    <span class="opacity-70">Cards:</span>
                    <span class="font-bold ml-1 text-slate-700 dark:text-slate-200">${scoring.cardsFound}/${scoring.totalCards}</span>
                </div>
            </div>
            
            <div class="grid grid-cols-8 gap-1.5">
                ${cardsHtml}
            </div>
        </div>
    `;
}

/**
 * Render all recommended decks
 */
function renderDecks(decks) {
    const container = document.getElementById('decksContainer');

    if (!container) {
        console.error('decksContainer element not found');
        return;
    }

    if (decks.length === 0) {
        container.innerHTML = `
            <div class="text-center text-slate-500 dark:text-slate-400 py-12">
                <span class="material-icons-round text-4xl mb-2">error_outline</span>
                <p class="text-sm">No suitable decks found. Try a different player tag.</p>
            </div>
        `;
        return;
    }

    // Ensure we render exactly 4 decks (pad with empty if needed)
    const decksToRender = decks.slice(0, 4);
    while (decksToRender.length < 4) {
        decksToRender.push(null); // Placeholder for missing decks
    }

    container.innerHTML = `
        <div class="space-y-4">
            ${decksToRender.map((deck, index) => {
        if (!deck) {
            return `
                        <div class="bg-surface-light dark:bg-surface-dark rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 p-4 text-center">
                            <p class="text-sm text-slate-400">Deck ${index + 1} not available</p>
                        </div>
                    `;
        }
        return renderDeck(deck, index);
    }).join('')}
        </div>
    `;
}

/**
 * Show loading state
 */
function showLoading() {
    document.getElementById('loadingIndicator').classList.remove('hidden');
    document.getElementById('errorDisplay').classList.add('hidden');
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
    const errorDisplay = document.getElementById('errorDisplay');
    const errorMessage = document.getElementById('errorMessage');
    if (errorDisplay && errorMessage) {
        errorMessage.textContent = message;
        errorDisplay.classList.remove('hidden');
    } else {
        console.error('Error:', message);
    }
    hideLoading();
}

/**
 * Hide error message
 */
function hideError() {
    document.getElementById('errorDisplay').classList.add('hidden');
}

/**
 * Load war deck recommendations
 */
async function loadWarDecks(playerTag) {
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
        // Fetch player data and all cards
        const [allCardsData, playerData] = await Promise.all([
            fetchAllCards(),
            fetchPlayerData(playerTag)
        ]);

        // Match player cards with card data and normalize levels
        const matchedCards = matchCardsWithData(playerData.cards || [], allCardsData);

        // Create a map for quick lookup (by card name)
        window.userCardMap = new Map();
        window.allCardsIdMap = new Map();

        // Populate allCardsIdMap first from allCardsData
        allCardsData.items.forEach(card => {
            const normalizedName = normalizeCardName(card.name);
            window.allCardsIdMap.set(normalizedName, card.id);
        });

        matchedCards.forEach(card => {
            const normalizedName = normalizeCardName(card.name);
            const normalizedRarity = card.rarity ? card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1).toLowerCase() : 'Common';
            const displayLevel = convertLevel(card.level, normalizedRarity);
            window.userCardMap.set(normalizedName, {
                level: displayLevel,
                maxLevel: MAX_LEVELS[normalizedRarity] || 16,
                rarity: normalizedRarity,
                cardData: card.cardData,
                apiLevel: card.level,
                // Store evolution info from the original player card data
                evolutionLevel: card.evolutionLevel,
                maxEvolutionLevel: card.maxEvolutionLevel || card.cardData?.maxEvolutionLevel
            });
        });

        // Also create a map by ID for better matching
        window.userCardMapById = new Map();
        matchedCards.forEach(card => {
            if (card.id) {
                window.userCardMapById.set(card.id, card);
            }
        });

        // Find best decks
        let bestDecks = findBestDecks(matchedCards, POPULAR_DECKS, playerData.currentDeck);

        // Render decks (will pad to 4 if needed)
        renderDecks(bestDecks);

        hideLoading();
    } catch (error) {
        console.error('Error loading war decks:', error);
        console.error('Error stack:', error.stack);
        showError(`Failed to load war decks: ${error.message}${error.stack ? ' (Check console for details)' : ''}`);
    }
}

/**
 * Initialize event listeners
 */
function initWarDecks() {
    const fetchButton = document.getElementById('fetchButton');
    const playerTagInput = document.getElementById('playerTagInput');

    const handleFetch = () => {
        const playerTag = playerTagInput.value.trim();
        loadWarDecks(playerTag);
    };

    fetchButton.addEventListener('click', handleFetch);
    playerTagInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleFetch();
        }
    });

    // Guide Modal Listeners
    const closeModal = document.getElementById('closeModal');
    const guideGotIt = document.getElementById('guideGotIt');
    const guideModal = document.getElementById('guideModal');

    if (closeModal) closeModal.addEventListener('click', closeGuide);
    if (guideGotIt) guideGotIt.addEventListener('click', closeGuide);

    // Close modal on backdrop click
    if (guideModal) {
        guideModal.addEventListener('click', (e) => {
            if (e.target === guideModal) closeGuide();
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWarDecks);
} else {
    initWarDecks();
}

