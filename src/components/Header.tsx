import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, Search, Sparkles, TrendingUp, Cpu, Building2, Trophy, 
  Film, Menu, X, ChevronDown, Radio, HeartPulse, Gamepad2, 
  Car, Plane, ShoppingBag, GraduationCap, Home, Utensils,
  Landmark, Share2, Leaf, Scale, Users, BookOpen, Camera,
  PawPrint, FileText, ChevronRight, Layers, ArrowUpRight, ArrowDownRight,
  Sun, Moon, ShieldCheck
} from 'lucide-react';
import { Category, Country } from '../types.js';

interface HeaderProps {
  categories: Category[];
  countries: Country[];
  selectedCategory: string;
  selectedCountry: string;
  onSelectCategory: (categorySlug: string) => void;
  onSelectCountry: (countryCode: string) => void;
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  onNavigateHome: () => void;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({
  categories,
  countries,
  selectedCategory,
  selectedCountry,
  onSelectCategory,
  onSelectCountry,
  onOpenSearch,
  onOpenAdmin,
  onNavigateHome,
  currentView
}) => {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categoryFilterQuery, setCategoryFilterQuery] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [currentDateStr, setCurrentDateStr] = useState('');
  const megaMenuRef = useRef<HTMLDivElement>(null);

  // Live market pulse snapshot items
  const marketPulse = [
    { symbol: 'S&P 500', value: '5,648.40', change: '+0.42%', up: true },
    { symbol: 'NASDAQ', value: '17,713.62', change: '+0.88%', up: true },
    { symbol: 'BRENT', value: '$81.35', change: '-0.65%', up: false },
    { symbol: 'GOLD', value: '$2,512.40', change: '+0.31%', up: true },
    { symbol: 'BTC/USD', value: '$63,940', change: '+1.95%', up: true }
  ];

  useEffect(() => {
    const d = new Date();
    setCurrentDateStr(d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setIsAllCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeCountry = countries.find(c => c.code === selectedCountry) || countries[0];

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'news': return Globe;
      case 'technology': return Cpu;
      case 'business-industrial': return Building2;
      case 'finance': return TrendingUp;
      case 'sports': return Trophy;
      case 'entertainment': return Film;
      case 'health': return HeartPulse;
      case 'science': return Sparkles;
      case 'games': return Gamepad2;
      case 'autos': return Car;
      case 'travel': return Plane;
      case 'shopping-ecommerce': return ShoppingBag;
      case 'education-jobs': return GraduationCap;
      case 'home-garden': return Home;
      case 'food-drink': return Utensils;
      case 'real-estate': return Landmark;
      case 'internet-web-services': return Share2;
      case 'environment-climate': return Leaf;
      case 'law-government': return Scale;
      case 'people-society': return Users;
      case 'books-literature': return BookOpen;
      case 'hobbies-leisure': return Camera;
      case 'pets-animals': return PawPrint;
      case 'reference-general': return FileText;
      default: return Layers;
    }
  };

  const topBarNavItems = [
    { label: 'Home', slug: 'home', icon: null },
    { label: 'World News', slug: 'news', icon: Globe },
    { label: 'Technology', slug: 'technology', icon: Cpu },
    { label: 'Business', slug: 'business-industrial', icon: Building2 },
    { label: 'Finance & Markets', slug: 'finance', icon: TrendingUp },
    { label: 'Sports', slug: 'sports', icon: Trophy },
    { label: 'Entertainment', slug: 'entertainment', icon: Film },
    { label: 'Science & Space', slug: 'science', icon: Sparkles },
    { label: 'Health & Medicine', slug: 'health', icon: HeartPulse },
    { label: 'Environment', slug: 'environment-climate', icon: Leaf }
  ];

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(categoryFilterQuery.toLowerCase()) ||
    c.description?.toLowerCase().includes(categoryFilterQuery.toLowerCase()) ||
    c.subcategories?.some(s => s.name.toLowerCase().includes(categoryFilterQuery.toLowerCase()))
  );

  return (
    <header className="sticky top-0 z-40 bg-neutral-900 text-white border-b border-neutral-800 shadow-md">
      {/* Top Utility & Financial Pulse Bar */}
      <div className="bg-neutral-950 px-4 py-1.5 border-b border-neutral-800/80 text-[11px] text-neutral-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="font-mono text-neutral-300 font-medium tracking-tight">{currentDateStr}</span>
            <span className="hidden sm:inline-block text-neutral-700">|</span>
            <span className="hidden sm:flex items-center text-emerald-400 font-medium font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1.5"></span>
              24/7 Global Editorial Wire Active
            </span>
          </div>

          {/* Live Market Pulse Mini-Ticker */}
          <div className="hidden lg:flex items-center space-x-4 font-mono text-[10px] text-neutral-400">
            <span className="text-neutral-500 uppercase tracking-wider font-semibold">Markets:</span>
            {marketPulse.map((m, idx) => (
              <div key={idx} className="flex items-center space-x-1">
                <span className="text-neutral-300 font-bold">{m.symbol}</span>
                <span className="text-neutral-400">{m.value}</span>
                <span className={`flex items-center ${m.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {m.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {m.change}
                </span>
              </div>
            ))}
          </div>

          {/* Region / Edition Selector Dropdown */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                id="country-selector-btn"
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-200 transition-colors border border-neutral-700/60 font-sans"
              >
                <span className="text-sm">{activeCountry?.flagEmoji || '🌐'}</span>
                <span className="font-medium text-xs hidden sm:inline">{activeCountry?.name || 'Worldwide'}</span>
                <span className="text-[10px] text-neutral-400 uppercase font-mono hidden md:inline">Edition</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {isCountryDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-64 max-h-80 overflow-y-auto bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl z-50 p-1 divide-y divide-neutral-800">
                  <div className="px-3 py-1.5 text-[10px] font-semibold font-mono text-neutral-400 uppercase tracking-wider">
                    Select Regional Edition
                  </div>
                  <div className="py-1">
                    {countries.filter(c => c.isEnabled).map(country => (
                      <button
                        key={country.code}
                        onClick={() => {
                          onSelectCountry(country.code);
                          setIsCountryDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded hover:bg-neutral-800 transition-colors ${
                          selectedCountry === country.code ? 'bg-neutral-800 text-amber-400 font-semibold' : 'text-neutral-200'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-base">{country.flagEmoji}</span>
                          <span>{country.name}</span>
                        </div>
                        <span className="text-[10px] text-neutral-500 font-mono">{country.region}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand & Search Masthead */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-3.5 cursor-pointer select-none" onClick={onNavigateHome}>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/40">
            <Globe className="w-6 h-6 text-neutral-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-serif">World<span className="text-amber-400">Plus</span></span>
              <span className="text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30">
                worldplus.world
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 tracking-wide font-sans hidden sm:block">
              Independent Global News • Verified Trends • International Intelligence
            </p>
          </div>
        </div>

        {/* Global Search Trigger Bar */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <button
            id="search-trigger-btn"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-4 py-2 bg-neutral-800/80 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 rounded-xl border border-neutral-700/80 hover:border-amber-500/40 transition-all text-xs group shadow-inner"
          >
            <div className="flex items-center space-x-2.5">
              <Search className="w-4 h-4 text-neutral-400 group-hover:text-amber-400 transition-colors" />
              <span>Search verified articles, international topics, bureaus...</span>
            </div>
            <kbd className="px-2 py-0.5 rounded-md bg-neutral-900 text-[10px] font-mono text-neutral-400 border border-neutral-700 group-hover:border-neutral-600">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Quick action buttons, Admin Panel button & Mobile menu */}
        <div className="flex items-center space-x-2.5">
          {/* Direct Admin Panel Trigger Button */}
          <button
            id="admin-panel-header-btn"
            onClick={onOpenAdmin}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-all shadow-md hover:shadow-amber-500/20"
            title="Open Editorial Desk & Admin Control Panel"
          >
            <ShieldCheck className="w-4 h-4 text-neutral-950" />
            <span className="font-mono tracking-tight">Admin Desk</span>
          </button>

          <button
            onClick={onOpenSearch}
            className="p-2 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 md:hidden"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Primary Category Navigation Bar with 25 Google Trends Mega Menu */}
      <nav className="border-t border-neutral-800/80 hidden md:block relative bg-neutral-950/60">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-1">
          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-0.5">
            {topBarNavItems.map((item, idx) => {
              const Icon = item.icon;
              const isHome = item.slug === 'home' && currentView === 'home' && selectedCategory === 'all';
              const isActive = isHome || (currentView === 'category' && selectedCategory === item.slug);

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (item.slug === 'home') {
                      onNavigateHome();
                    } else {
                      onSelectCategory(item.slug);
                    }
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all uppercase tracking-wider whitespace-nowrap ${
                    isActive
                      ? 'text-amber-400 bg-neutral-800/90 shadow-sm border-b-2 border-amber-400'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-neutral-400" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* All 25 Google Trends Mega Dropdown Trigger */}
          <div className="relative ml-3 shrink-0" ref={megaMenuRef}>
            <button
              onClick={() => setIsAllCategoriesOpen(!isAllCategoriesOpen)}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap border ${
                isAllCategoriesOpen
                  ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-lg shadow-amber-500/20'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-amber-400 border-neutral-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All 25 Desks</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isAllCategoriesOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Comprehensive 25 Google Trends Mega Dropdown */}
            {isAllCategoriesOpen && (
              <div className="absolute right-0 top-full mt-2 w-[820px] bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl z-50 p-5 grid grid-cols-12 gap-5 divide-x divide-neutral-800 text-xs animate-in fade-in zoom-in-95 duration-150">
                {/* Categories List (Left 5 Cols) */}
                <div className="col-span-5 max-h-[460px] overflow-y-auto pr-2 space-y-2">
                  <div className="sticky top-0 bg-neutral-900 pb-2 z-10 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                      <span>Global Desks</span>
                      <span className="text-amber-400 font-bold">{categories.length} Sections</span>
                    </div>
                    {/* Instant Search Filter */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-2" />
                      <input
                        type="text"
                        value={categoryFilterQuery}
                        onChange={(e) => setCategoryFilterQuery(e.target.value)}
                        placeholder="Filter desks or subcategories..."
                        className="w-full pl-8 pr-3 py-1.5 bg-neutral-950 border border-neutral-700 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    {filteredCategories.map((cat) => {
                      const CatIcon = getCategoryIcon(cat.slug);
                      const isHovered = hoveredCategory?.id === cat.id || (!hoveredCategory && cat.slug === 'news');
                      return (
                        <button
                          key={cat.id}
                          onMouseEnter={() => setHoveredCategory(cat)}
                          onClick={() => {
                            onSelectCategory(cat.slug);
                            setIsAllCategoriesOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                            isHovered
                              ? 'bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30'
                              : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 truncate">
                            <CatIcon className="w-4 h-4 text-neutral-400 shrink-0" />
                            <span className="truncate">{cat.name}</span>
                          </div>
                          <ChevronRight className="w-3 h-3 text-neutral-500 shrink-0" />
                        </button>
                      );
                    })}
                    {filteredCategories.length === 0 && (
                      <p className="text-neutral-500 text-xs text-center py-4">No matching desks found.</p>
                    )}
                  </div>
                </div>

                {/* Subcategories & Description Preview (Right 7 Cols) */}
                <div className="col-span-7 pl-5 max-h-[460px] overflow-y-auto space-y-4">
                  {(() => {
                    const activeCat = hoveredCategory || categories[0] || null;
                    if (!activeCat) return null;
                    const ActiveIcon = getCategoryIcon(activeCat.slug);

                    return (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                              <ActiveIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="font-serif font-bold text-sm text-white">{activeCat.name}</h4>
                              <span className="text-[10px] font-mono text-neutral-400">
                                Publishing Cadence: {activeCat.publishingFrequency || '10m'} Wire
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              onSelectCategory(activeCat.slug);
                              setIsAllCategoriesOpen(false);
                            }}
                            className="px-3.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors"
                          >
                            Explore Desk
                          </button>
                        </div>

                        <p className="text-neutral-300 text-xs leading-relaxed">
                          {activeCat.description}
                        </p>

                        {activeCat.subcategories && activeCat.subcategories.length > 0 && (
                          <div className="space-y-2">
                            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                              Sub-Sections &amp; Coverage Areas ({activeCat.subcategories.length})
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {activeCat.subcategories.map(sub => (
                                <button
                                  key={sub.id}
                                  onClick={() => {
                                    onSelectCategory(activeCat.slug);
                                    setIsAllCategoriesOpen(false);
                                  }}
                                  className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-white text-left transition-colors group flex items-center justify-between"
                                >
                                  <span className="font-medium text-xs truncate">{sub.name}</span>
                                  <ChevronRight className="w-3 h-3 text-neutral-600 group-hover:text-amber-400 shrink-0" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu with All Categories */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-900 border-t border-neutral-800 px-4 py-4 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Admin Panel Quick Access in Mobile Drawer */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenAdmin();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center space-x-2 font-mono shadow-md"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Open Admin / Editorial Desk</span>
          </button>

          <div className="flex items-center justify-between text-xs font-semibold uppercase text-neutral-400 tracking-wider">
            <span>All 25 Editorial Desks</span>
            <span className="text-amber-400 font-mono">{categories.length} Total</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {categories.map((item) => {
              const CatIcon = getCategoryIcon(item.slug);
              return (
                <div key={item.id} className="p-2.5 rounded-lg bg-neutral-800/80 border border-neutral-700/60 space-y-1.5">
                  <button
                    onClick={() => {
                      onSelectCategory(item.slug);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between text-left text-xs font-bold text-white hover:text-amber-400"
                  >
                    <div className="flex items-center space-x-2">
                      <CatIcon className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                  </button>
                  {item.subcategories && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.subcategories.slice(0, 3).map(sub => (
                        <span key={sub.id} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400">
                          {sub.name}
                        </span>
                      ))}
                      {item.subcategories.length > 3 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 text-amber-400">
                          +{item.subcategories.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span>Edition: {activeCountry?.name || 'Worldwide'}</span>
            <span className="text-emerald-400">● Live 24/7 Grid</span>
          </div>
        </div>
      )}
    </header>
  );
};
