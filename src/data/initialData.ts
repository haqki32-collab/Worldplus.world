import { Article, Category, Country, TrendItem } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'news',
    name: 'News & World Affairs',
    slug: 'news',
    description: 'Breaking global headlines, geopolitics, international diplomacy, regional affairs, and investigative reporting.',
    iconName: 'Globe',
    subcategories: [
      { id: 'world-news', name: 'World News & Geopolitics', slug: 'world-news' },
      { id: 'south-asia-regional', name: 'South Asia & Regional Bureau', slug: 'south-asia-regional' },
      { id: 'breaking-news', name: 'Live Breaking Wire & Dispatches', slug: 'breaking-news' },
      { id: 'politics-diplomacy', name: 'Diplomacy, Governance & Elections', slug: 'politics-diplomacy' },
      { id: 'defense-security', name: 'Defense, Security & Strategic Affairs', slug: 'defense-security' },
      { id: 'economy-trade', name: 'Global Economy & Trade Policies', slug: 'economy-trade' },
      { id: 'climate-disasters', name: 'Climate Crises & Emergencies', slug: 'climate-disasters' },
      { id: 'investigations', name: 'Special Investigative Reports', slug: 'investigations' }
    ],
    publishingFrequency: '5m',
    isAutomated: false,
    articleCount: 0,
    order: 1
  },
  {
    id: 'business-industrial',
    name: 'Business & Industrial',
    slug: 'business-industrial',
    description: 'Global commerce, enterprise strategy, manufacturing, supply chains, and industrial innovation.',
    iconName: 'Building2',
    subcategories: [
      { id: 'advertising-marketing', name: 'Advertising & Marketing', slug: 'advertising-marketing' },
      { id: 'agriculture-forestry', name: 'Agriculture & Forestry', slug: 'agriculture-forestry' },
      { id: 'banking-finance-ind', name: 'Commercial Banking & Finance', slug: 'banking-finance-ind' },
      { id: 'construction-maintenance', name: 'Construction & Civil Engineering', slug: 'construction-maintenance' },
      { id: 'energy-utilities', name: 'Energy & Utilities', slug: 'energy-utilities' },
      { id: 'manufacturing', name: 'Manufacturing & Heavy Machinery', slug: 'manufacturing' },
      { id: 'transportation-logistics', name: 'Transportation & Logistics', slug: 'transportation-logistics' },
      { id: 'hospitality-industry', name: 'Hospitality & Food Service', slug: 'hospitality-industry' }
    ],
    publishingFrequency: '10m',
    isAutomated: false,
    articleCount: 0,
    order: 2
  },
  {
    id: 'technology',
    name: 'Computers & Electronics',
    slug: 'technology',
    description: 'Next-gen computing, frontier AI models, consumer hardware, software ecosystems, and cyber intelligence.',
    iconName: 'Cpu',
    subcategories: [
      { id: 'ai-frontier', name: 'Artificial Intelligence & Agents', slug: 'artificial-intelligence' },
      { id: 'computer-hardware', name: 'Computer Hardware & Processors', slug: 'computer-hardware' },
      { id: 'computer-software', name: 'Computer Software & Cloud Apps', slug: 'computer-software' },
      { id: 'consumer-electronics', name: 'Smartphones & Consumer Electronics', slug: 'consumer-electronics' },
      { id: 'cybersecurity', name: 'Cybersecurity & Data Privacy', slug: 'cybersecurity' },
      { id: 'telecom-5g', name: 'Networking & 5G Telecommunications', slug: 'telecom-5g' },
      { id: 'developer-tools', name: 'Programming & Developer Tools', slug: 'developer-tools' }
    ],
    publishingFrequency: '10m',
    isAutomated: false,
    articleCount: 0,
    order: 3
  },
  {
    id: 'finance',
    name: 'Finance & Markets',
    slug: 'finance',
    description: 'Equities, central bank policy, cryptocurrencies, sovereign debt, digital assets, and wealth management.',
    iconName: 'TrendingUp',
    subcategories: [
      { id: 'investing-stocks', name: 'Investing & Stock Markets', slug: 'investing-stocks' },
      { id: 'cryptocurrency', name: 'Cryptocurrencies & Blockchain', slug: 'cryptocurrency' },
      { id: 'banking', name: 'Banking & Mobile Wallets', slug: 'banking' },
      { id: 'credit-lending', name: 'Credit, Lending & Mortgages', slug: 'credit-lending' },
      { id: 'insurance', name: 'Insurance & Risk Management', slug: 'insurance' },
      { id: 'personal-finance', name: 'Personal Finance & Wealth', slug: 'personal-finance' },
      { id: 'accounting-tax', name: 'Accounting & Auditing', slug: 'accounting-tax' }
    ],
    publishingFrequency: '10m',
    isAutomated: false,
    articleCount: 0,
    order: 4
  },
  {
    id: 'sports',
    name: 'Sports',
    slug: 'sports',
    description: 'ICC Cricket, Premier League Football, NBA Basketball, Formula 1, Tennis Grand Slams, and Combat Sports.',
    iconName: 'Trophy',
    subcategories: [
      { id: 'cricket', name: 'Cricket (ICC, IPL, PSL, T20)', slug: 'cricket' },
      { id: 'football', name: 'Football / Soccer (FIFA, UCL, EPL)', slug: 'football' },
      { id: 'combat-sports', name: 'Combat Sports (UFC, Boxing, WWE)', slug: 'combat-sports' },
      { id: 'motorsports', name: 'Motorsports (Formula 1, MotoGP)', slug: 'motorsports' },
      { id: 'basketball', name: 'Basketball (NBA, EuroLeague)', slug: 'basketball' },
      { id: 'tennis', name: 'Tennis (Wimbledon, Grand Slams)', slug: 'tennis' },
      { id: 'athletics', name: 'Athletics & Olympics', slug: 'athletics' }
    ],
    publishingFrequency: '10m',
    isAutomated: false,
    articleCount: 0,
    order: 5
  },
  {
    id: 'entertainment',
    name: 'Entertainment & Arts',
    slug: 'entertainment',
    description: 'Box office cinema, streaming releases, global music charts, pop culture phenomena, and celebrity spotlights.',
    iconName: 'Film',
    subcategories: [
      { id: 'movies-cinema', name: 'Movies & Cinema', slug: 'movies-cinema' },
      { id: 'tv-streaming', name: 'Television & Streaming', slug: 'tv-streaming' },
      { id: 'music-audio', name: 'Music & Audio Charts', slug: 'music-audio' },
      { id: 'celebrities', name: 'Celebrities & Pop Culture', slug: 'celebrities' },
      { id: 'visual-arts', name: 'Visual Arts & Literature', slug: 'visual-arts' }
    ],
    publishingFrequency: '10m',
    isAutomated: false,
    articleCount: 0,
    order: 6
  },
  {
    id: 'health',
    name: 'Health & Medical',
    slug: 'health',
    description: 'Medical breakthroughs, preventative cardiology, immunology, fitness training, nutrition science, and mental health.',
    iconName: 'HeartPulse',
    subcategories: [
      { id: 'medical-research', name: 'Medical Research & Clinical Trials', slug: 'medical-research' },
      { id: 'health-conditions', name: 'Health Conditions & Diseases', slug: 'health-conditions' },
      { id: 'fitness-weight-loss', name: 'Fitness & Weight Loss', slug: 'fitness-weight-loss' },
      { id: 'nutrition-diets', name: 'Nutrition & Diets', slug: 'nutrition-diets' },
      { id: 'mental-health', name: 'Mental Health & Psychology', slug: 'mental-health' },
      { id: 'pharmacy-medications', name: 'Pharmacy & Medications', slug: 'pharmacy-medications' },
      { id: 'aging-longevity', name: 'Aging & Longevity Science', slug: 'aging-longevity' }
    ],
    publishingFrequency: '10m',
    isAutomated: false,
    articleCount: 0,
    order: 7
  },
  {
    id: 'science',
    name: 'Science & Space',
    slug: 'science',
    description: 'Astrophysics, space exploration, quantum physics, biological genetics, and climate geology.',
    iconName: 'Sparkles',
    subcategories: [
      { id: 'astronomy-space', name: 'Astronomy & Space Exploration', slug: 'astronomy-space' },
      { id: 'physics-quantum', name: 'Physics & Quantum Energy', slug: 'physics-quantum' },
      { id: 'biological-sciences', name: 'Biological Sciences & Genetics', slug: 'biological-sciences' },
      { id: 'earth-sciences', name: 'Earth Sciences & Geology', slug: 'earth-sciences' },
      { id: 'chemistry-materials', name: 'Chemistry & Nanotechnology', slug: 'chemistry-materials' }
    ],
    publishingFrequency: '10m',
    isAutomated: false,
    articleCount: 0,
    order: 8
  },
  {
    id: 'games',
    name: 'Games & Esports',
    slug: 'games',
    description: 'Next-gen game launches, PlayStation & Xbox titles, PC gaming hardware, mobile titles, and esports.',
    iconName: 'Gamepad2',
    subcategories: [
      { id: 'console-games', name: 'Console Games (PS5, Xbox, Switch)', slug: 'console-games' },
      { id: 'pc-gaming', name: 'PC Gaming & Steam', slug: 'pc-gaming' },
      { id: 'mobile-gaming', name: 'Mobile Gaming', slug: 'mobile-gaming' },
      { id: 'esports-tournaments', name: 'Esports & Competitive Leagues', slug: 'esports-tournaments' },
      { id: 'game-development', name: 'Game Reviews & Walkthroughs', slug: 'game-development' }
    ],
    publishingFrequency: '20m',
    isAutomated: false,
    articleCount: 0,
    order: 9
  },
  {
    id: 'autos',
    name: 'Autos & Vehicles',
    slug: 'autos',
    description: 'Electric vehicles (EVs), autonomous driving systems, luxury supercars, hybrid tech, and motorcycle engineering.',
    iconName: 'Car',
    subcategories: [
      { id: 'electric-vehicles', name: 'Electric Vehicles (EVs & Charging)', slug: 'electric-vehicles' },
      { id: 'cars-suvs', name: 'Cars, SUVs & Hybrids', slug: 'cars-suvs' },
      { id: 'motorcycles-scooters', name: 'Motorcycles & Superbikes', slug: 'motorcycles-scooters' },
      { id: 'commercial-vehicles', name: 'Commercial Vehicles & Trucks', slug: 'commercial-vehicles' },
      { id: 'vehicle-maintenance', name: 'Vehicle Maintenance & Tuning', slug: 'vehicle-maintenance' }
    ],
    publishingFrequency: '20m',
    isAutomated: false,
    articleCount: 0,
    order: 10
  },
  {
    id: 'travel',
    name: 'Travel & Tourism',
    slug: 'travel',
    description: 'International airline news, luxury hotel resorts, top tourist destinations, cruise lines, and visa regulations.',
    iconName: 'Plane',
    subcategories: [
      { id: 'air-travel', name: 'Air Travel & Airlines', slug: 'air-travel' },
      { id: 'hotels-accommodations', name: 'Hotels & Luxury Resorts', slug: 'hotels-accommodations' },
      { id: 'tourist-destinations', name: 'Tourist Destinations & Guides', slug: 'tourist-destinations' },
      { id: 'cruises-roadtrips', name: 'Cruises & Road Trips', slug: 'cruises-roadtrips' },
      { id: 'visas-passports', name: 'Travel Visas & Immigration', slug: 'visas-passports' }
    ],
    publishingFrequency: '30m',
    isAutomated: false,
    articleCount: 0,
    order: 11
  },
  {
    id: 'shopping-ecommerce',
    name: 'Shopping & E-Commerce',
    slug: 'shopping-ecommerce',
    description: 'Global retail trends, apparel & streetwear fashion, consumer electronics sales, and deals.',
    iconName: 'ShoppingBag',
    subcategories: [
      { id: 'apparel-fashion', name: 'Apparel, Footwear & Streetwear', slug: 'apparel-fashion' },
      { id: 'consumer-deals', name: 'Electronics Deals & Sales', slug: 'consumer-deals' },
      { id: 'home-appliances-shop', name: 'Home & Kitchen Appliances', slug: 'home-appliances-shop' },
      { id: 'discounts-coupons', name: 'Coupons & Price Comparisons', slug: 'discounts-coupons' }
    ],
    publishingFrequency: '30m',
    isAutomated: false,
    articleCount: 0,
    order: 12
  }
];

export const INITIAL_COUNTRIES: Country[] = [
  { code: 'GLOBAL', name: 'Worldwide', region: 'Worldwide', flagEmoji: '🌐', isEnabled: true, priorityScore: 100, trendingTopicsCount: 0, articleCount: 0 },
  { code: 'US', name: 'United States', region: 'North America', flagEmoji: '🇺🇸', isEnabled: true, priorityScore: 98, trendingTopicsCount: 0, articleCount: 0 },
  { code: 'GB', name: 'United Kingdom', region: 'Europe', flagEmoji: '🇬🇧', isEnabled: true, priorityScore: 92, trendingTopicsCount: 0, articleCount: 0 },
  { code: 'PK', name: 'Pakistan', region: 'Asia', flagEmoji: '🇵🇰', isEnabled: true, priorityScore: 94, trendingTopicsCount: 0, articleCount: 0 },
  { code: 'IN', name: 'India', region: 'Asia', flagEmoji: '🇮🇳', isEnabled: true, priorityScore: 95, trendingTopicsCount: 0, articleCount: 0 },
  { code: 'AE', name: 'United Arab Emirates', region: 'Middle East', flagEmoji: '🇦🇪', isEnabled: true, priorityScore: 89, trendingTopicsCount: 0, articleCount: 0 },
  { code: 'SA', name: 'Saudi Arabia', region: 'Middle East', flagEmoji: '🇸🇦', isEnabled: true, priorityScore: 86, trendingTopicsCount: 0, articleCount: 0 },
  { code: 'CA', name: 'Canada', region: 'North America', flagEmoji: '🇨🇦', isEnabled: true, priorityScore: 88, trendingTopicsCount: 0, articleCount: 0 },
  { code: 'AU', name: 'Australia', region: 'Oceania', flagEmoji: '🇦🇺', isEnabled: true, priorityScore: 87, trendingTopicsCount: 0, articleCount: 0 },
  { code: 'DE', name: 'Germany', region: 'Europe', flagEmoji: '🇩🇪', isEnabled: true, priorityScore: 90, trendingTopicsCount: 0, articleCount: 0 },
  { code: 'FR', name: 'France', region: 'Europe', flagEmoji: '🇫🇷', isEnabled: true, priorityScore: 88, trendingTopicsCount: 0, articleCount: 0 },
  { code: 'JP', name: 'Japan', region: 'Asia', flagEmoji: '🇯🇵', isEnabled: true, priorityScore: 91, trendingTopicsCount: 0, articleCount: 0 },
  { code: 'CN', name: 'China', region: 'Asia', flagEmoji: '🇨🇳', isEnabled: true, priorityScore: 93, trendingTopicsCount: 0, articleCount: 0 }
];

export const INITIAL_TRENDS: TrendItem[] = [];

export const INITIAL_ARTICLES: Article[] = [];
