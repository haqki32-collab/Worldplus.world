import React from 'react';
import { Globe, Shield, Sparkles, Rss, ArrowUp, ExternalLink, FileText, CheckCircle2, AlertCircle, Mail } from 'lucide-react';
import { Category, Country } from '../types.js';

interface FooterProps {
  categories: Category[];
  countries: Country[];
  onSelectCategory: (categorySlug: string) => void;
  onSelectCountry: (countryCode: string) => void;
  onOpenPolicy: (policyType: 'privacy' | 'terms' | 'editorial' | 'dmca' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({
  categories,
  countries,
  onSelectCategory,
  onSelectCountry,
  onOpenPolicy
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 via-amber-600 to-red-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Globe className="w-5 h-5 text-neutral-950 stroke-[2.5]" />
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl font-black tracking-tight text-white font-serif">World<span className="text-amber-400">Plus</span></span>
                <span className="text-[10px] font-mono uppercase bg-neutral-900 text-amber-400 px-1.5 py-0.5 rounded border border-neutral-800">world</span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              WorldPlus (<strong className="text-neutral-200">worldplus.world</strong>) is an independent international news and geopolitical intelligence publication. Our editorial bureau continuously verifies breaking developments, corroborates primary sources, and delivers deep-dive analytical journalism.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2 py-1 rounded bg-neutral-900 text-emerald-400 border border-neutral-800 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>24/7 Global Newsroom</span>
              </span>
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-neutral-800 flex items-center space-x-1"
              >
                <Rss className="w-3 h-3" />
                <span>RSS 2.0 Wire</span>
              </a>
            </div>
          </div>

          {/* Categories Col */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-white">
              Global Desks
            </h3>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 7).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.slug)}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Regional Bureaus Col */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-white">
              Regional Bureaus
            </h3>
            <ul className="space-y-2 text-xs">
              {countries.filter(c => c.isEnabled && c.code !== 'GLOBAL').slice(0, 7).map((country) => (
                <li key={country.code}>
                  <button
                    onClick={() => onSelectCountry(country.code)}
                    className="hover:text-amber-400 transition-colors flex items-center space-x-1.5"
                  >
                    <span>{country.flagEmoji}</span>
                    <span>{country.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* AdSense & Legal Compliance Col */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-white">
              Policies &amp; Verification
            </h3>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-amber-400 transition-colors flex items-center space-x-1.5"
                >
                  <Shield className="w-3 h-3 text-neutral-500" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-amber-400 transition-colors flex items-center space-x-1.5"
                >
                  <FileText className="w-3 h-3 text-neutral-500" />
                  <span>Terms of Service</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('editorial')}
                  className="hover:text-amber-400 transition-colors flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-3 h-3 text-neutral-500" />
                  <span>Editorial Standards</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('dmca')}
                  className="hover:text-amber-400 transition-colors flex items-center space-x-1.5"
                >
                  <AlertCircle className="w-3 h-3 text-neutral-500" />
                  <span>DMCA &amp; Non-Copyright</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('contact')}
                  className="hover:text-amber-400 transition-colors flex items-center space-x-1.5"
                >
                  <Mail className="w-3 h-3 text-neutral-500" />
                  <span>Contact Editorial Board</span>
                </button>
              </li>
              <li className="pt-1.5 font-mono text-[11px]">
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 flex items-center space-x-1">
                  <span>/sitemap.xml</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} WorldPlus (<strong className="text-neutral-300">worldplus.world</strong>). All editorial rights reserved.
          </div>

          <div className="flex items-center space-x-4">
            <span>Canonical Domain: <strong className="text-neutral-300">worldplus.world</strong></span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 transition-colors flex items-center space-x-1"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
