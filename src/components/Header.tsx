import React, { useState, useEffect } from 'react';
import { 
  Globe, Search, Sparkles, TrendingUp, Cpu, Building2, Trophy, 
  Film, Shield, Menu, X, ChevronDown, Radio, ExternalLink, Moon, Sun, SlidersHorizontal
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentDateStr, setCurrentDateStr] = useState('');

  useEffect(() => {
    const d = new Date();
    setCurrentDateStr(d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }));
  }, []);

  const activeCountry = countries.find(c => c.code === selectedCountry) || countries[0];

  const primaryNavItems = [
    { label: 'Home', slug: 'home', icon: null },
    { label: 'Latest', slug: 'latest', icon: Radio },
    { label: 'Trending', slug: 'trending', icon: TrendingUp },
    { label: 'World', slug: 'news', icon: Globe },
    { label: 'Technology', slug: 'technology', icon: Cpu },
    { label: 'Business', slug: 'business', icon: Building2 },
    { label: 'Sports', slug: 'sports', icon: Trophy },
    { label: 'Entertainment', slug: 'entertainment', icon: Film },
    { label: 'AI & Frontier', slug: 'technology', icon: Sparkles }
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
              Live Trend Engine Active
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

      {/* Primary Category Navigation Bar */}
      <nav className="border-t border-neutral-800/70 hidden md:block overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex items-center space-x-1 py-1">
          {primaryNavItems.map((item, idx) => {
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
                className={`flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-md transition-colors uppercase tracking-wider whitespace-nowrap ${
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
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-900 border-t border-neutral-800 px-4 py-4 space-y-3">
          <div className="text-xs font-semibold uppercase text-neutral-400 tracking-wider">Categories</div>
          <div className="grid grid-cols-2 gap-1.5">
            {primaryNavItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (item.slug === 'home') {
                    onNavigateHome();
                  } else {
                    onSelectCategory(item.slug);
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 px-3 py-2 rounded bg-neutral-800 text-neutral-200 text-xs font-medium text-left"
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span>Edition: {activeCountry?.name || 'Worldwide'}</span>
            <span className="text-emerald-400">● Live Grid</span>
          </div>
        </div>
      )}
    </header>
  );
};
