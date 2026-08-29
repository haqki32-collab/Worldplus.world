import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, Search, Sparkles, TrendingUp, Cpu, Building2, Trophy, 
  Film, Menu, X, ChevronDown, Radio, HeartPulse, Gamepad2, 
  Car, Plane, ShoppingBag, GraduationCap, Home, Utensils,
  Landmark, Share2, Leaf, Scale, Users, BookOpen, Camera,
  PawPrint, FileText, ChevronRight, Layers
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
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [currentDateStr, setCurrentDateStr] = useState('');
  const megaMenuRef = useRef<HTMLDivElement>(null);

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
    { label: 'Latest Wire', slug: 'latest', icon: Radio },
    { label: 'Trending', slug: 'trending', icon: TrendingUp },
    { label: 'World News', slug: 'news', icon: Globe },
    { label: 'Technology', slug: 'technology', icon: Cpu },
    { label: 'Business', slug: 'business-industrial', icon: Building2 },
    { label: 'Finance', slug: 'finance', icon: TrendingUp },
    { label: 'Sports', slug: 'sports', icon: Trophy },
    { label: 'Entertainment', slug: 'entertainment', icon: Film },
    { label: 'Health', slug: 'health', icon: HeartPulse },
    { label: 'Science', slug: 'science', icon: Sparkles }
  ];

  return (
    <header className="sticky top-0 z-40 bg-neutral-900 text-white border-b border-neutral-800 shadow-md">
      {/* Top Utility Bar */}
      <div className="bg-neutral-950 px-4 py-1.5 border-b border-neutral-800/80 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="font-mono text-neutral-300 tracking-wide">{currentDateStr}</span>
            <span className="hidden sm:inline-block text-neutral-600">|</span>
            <span className="hidden sm:flex items-center text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1.5"></span>
              24/7 Global Dispatch Active
            </span>
            <span className="hidden md:inline-block text-neutral-600">|</span>
            <span className="hidden md:inline-block text-neutral-400 font-mono">
              Domain: <strong className="text-neutral-200">worldplus.world</strong>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Country Selector Dropdown */}
            <div className="relative">
              <button
                id="country-selector-btn"
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors border border-neutral-700/60"
              >
                <span className="text-sm">{activeCountry?.flagEmoji || '🌐'}</span>
                <span className="font-medium hidden sm:inline">{activeCountry?.name || 'Worldwide'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {isCountryDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-64 max-h-80 overflow-y-auto bg-neutral-900 border border-neutral-700 rounded-lg shadow-2xl z-50 p-1 divide-y divide-neutral-800">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    Select Edition / Region
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
                          selectedCountry === country.code ? 'bg-neutral-800/90 text-amber-400 font-semibold' : 'text-neutral-200'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-base">{country.flagEmoji}</span>
                          <span>{country.name}</span>
                        </div>
                        <span className="text-[10px] text-neutral-500">{country.region}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand & Search Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onNavigateHome}>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 via-amber-600 to-red-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Globe className="w-6 h-6 text-neutral-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-black tracking-tight text-white font-serif">World<span className="text-amber-400">Plus</span></span>
              <span className="text-[10px] font-mono uppercase bg-neutral-800 text-amber-400 px-1.5 py-0.5 rounded border border-neutral-700">world</span>
            </div>
            <p className="text-[11px] text-neutral-400 tracking-wide font-sans">Global Intelligence &amp; Verified Trends</p>
          </div>
        </div>

        {/* Global Search Bar (Trigger) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <button
            id="search-trigger-btn"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 bg-neutral-800/80 hover:bg-neutral-800 text-neutral-400 rounded-lg border border-neutral-700/80 transition-all text-xs group"
          >
            <div className="flex items-center space-x-2.5">
              <Search className="w-4 h-4 text-neutral-400 group-hover:text-amber-400 transition-colors" />
              <span>Search global articles, topics, countries...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded bg-neutral-900 text-[10px] font-mono text-neutral-400 border border-neutral-700">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Mobile controls & Search icon */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-lg bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Primary Category Navigation Bar with All 25 Google Trends Mega Menu */}
      <nav className="border-t border-neutral-800/70 hidden md:block relative">
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
                  className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors uppercase tracking-wider whitespace-nowrap ${
                    isActive
                      ? 'text-amber-400 bg-neutral-800/90 border-b-2 border-amber-400'
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
          <div className="relative ml-2" ref={megaMenuRef}>
            <button
              onClick={() => setIsAllCategoriesOpen(!isAllCategoriesOpen)}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap border ${
                isAllCategoriesOpen
                  ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-lg shadow-amber-500/20'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-amber-400 border-neutral-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All 25 Categories ({categories.length})</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isAllCategoriesOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Comprehensive 25 Google Trends Mega Dropdown */}
            {isAllCategoriesOpen && (
              <div className="absolute right-0 top-full mt-2 w-[780px] bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl z-50 p-5 grid grid-cols-12 gap-5 divide-x divide-neutral-800 text-xs">
                {/* Categories List (Left 5 Cols) */}
                <div className="col-span-5 max-h-[460px] overflow-y-auto pr-2 space-y-1 divide-y divide-neutral-800/50">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 pb-1.5 px-2 flex items-center justify-between">
                    <span>Google Trends Categories</span>
                    <span className="text-amber-400 font-bold">25 Sections</span>
                  </div>
                  <div className="pt-1.5 space-y-1">
                    {categories.map((cat) => {
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
                                Cadence: {activeCat.publishingFrequency || '10m'} Wire
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              onSelectCategory(activeCat.slug);
                              setIsAllCategoriesOpen(false);
                            }}
                            className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-[11px] transition-colors"
                          >
                            Explore All
                          </button>
                        </div>

                        <p className="text-neutral-400 text-[11px] leading-relaxed">
                          {activeCat.description}
                        </p>

                        {activeCat.subcategories && activeCat.subcategories.length > 0 && (
                          <div className="space-y-2">
                            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                              Subcategories ({activeCat.subcategories.length})
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
                                  <span className="font-medium text-[11px] truncate">{sub.name}</span>
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
          <div className="flex items-center justify-between text-xs font-semibold uppercase text-neutral-400 tracking-wider">
            <span>All 25 Trend Categories</span>
            <span className="text-amber-400">{categories.length} Total</span>
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
