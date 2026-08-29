import React from 'react';
import { ShieldCheck, Info, ExternalLink, Sparkles, Briefcase, Calculator, TrendingUp, Search } from 'lucide-react';

interface AdSenseBannerProps {
  slotType: 'header-leaderboard' | 'in-article' | 'sidebar' | 'footer-multiplex';
  publisherId?: string;
  adSlotId?: string;
  className?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  slotType,
  publisherId = 'ca-pub-3940256099942544',
  adSlotId = '1234567890',
  className = ''
}) => {
  const openRizqdaan = () => {
    window.open('https://rizqdaan.com', '_blank', 'noopener,noreferrer');
  };

  if (slotType === 'header-leaderboard') {
    return (
      <div className={`my-4 sm:my-6 w-full ${className}`}>
        {/* Compliance Header */}
        <div className="w-full flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-neutral-400 dark:text-neutral-500 mb-1 px-1">
          <span className="flex items-center space-x-1">
            <Info className="w-3 h-3 text-amber-500" />
            <span>Featured Partner / Sponsored</span>
          </span>
          <span className="text-[9px] text-neutral-400">Google AdSense Placement Slot</span>
        </div>

        {/* 728x90 style Leaderboard promoting Rizqdaan.com */}
        <div 
          onClick={openRizqdaan}
          className="group cursor-pointer w-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-amber-950/80 border border-amber-500/30 hover:border-amber-400 rounded-xl p-3 sm:p-4 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform"></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-neutral-950 shadow-md font-serif text-lg">
                RZ
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-black text-base sm:text-lg tracking-tight font-serif group-hover:text-amber-400 transition-colors">
                    Rizqdaan.com
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                    Official Portal
                  </span>
                </div>
                <p className="text-neutral-300 text-xs sm:text-sm line-clamp-1">
                  Explore Free AI Business Tools, Career Listings & Verified Growth Resources
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 self-end sm:self-center">
              <div className="hidden md:flex flex-col text-right text-[11px] text-neutral-400 font-mono">
                <span>Free Daily Tools</span>
                <span className="text-emerald-400 font-bold">100% Free Access</span>
              </div>
              <button className="px-4 py-2 bg-amber-500 group-hover:bg-amber-400 text-neutral-950 font-black rounded-lg text-xs tracking-wide uppercase flex items-center space-x-1.5 shadow-lg transition-transform group-hover:scale-105">
                <span>Explore Tools</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slotType === 'in-article') {
    return (
      <div className={`my-8 w-full ${className}`}>
        {/* Compliance Header */}
        <div className="w-full flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-neutral-400 dark:text-neutral-500 mb-1 px-1">
          <span className="flex items-center space-x-1">
            <Info className="w-3 h-3 text-amber-500" />
            <span>Recommended Growth Resource / Ad</span>
          </span>
          <span className="text-[9px] text-neutral-400">AdSlot #{adSlotId}</span>
        </div>

        {/* Native In-Article 336x280 / Responsive Card promoting Rizqdaan */}
        <div 
          onClick={openRizqdaan}
          className="group cursor-pointer w-full bg-neutral-900 border-2 border-dashed border-amber-500/40 hover:border-amber-400 rounded-2xl p-6 sm:p-7 shadow-lg transition-all relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-neutral-800">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center font-black text-neutral-950 font-serif text-xl">
                RZ
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">
                  Featured Platform Spotlight
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-black text-white group-hover:text-amber-400 transition-colors">
                  Rizqdaan.com — Business &amp; Tools Portal
                </h3>
              </div>
            </div>

            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-mono font-bold">
              ★ Free Tools &amp; Listings
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
            <div className="p-3 bg-neutral-800/80 rounded-xl border border-neutral-700 space-y-1">
              <div className="flex items-center space-x-1.5 text-amber-400 font-bold text-xs">
                <Calculator className="w-3.5 h-3.5" />
                <span>Online Utilities</span>
              </div>
              <p className="text-[11px] text-neutral-400">Smart calculators, converters & automated calculators</p>
            </div>

            <div className="p-3 bg-neutral-800/80 rounded-xl border border-neutral-700 space-y-1">
              <div className="flex items-center space-x-1.5 text-blue-400 font-bold text-xs">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Career Listings</span>
              </div>
              <p className="text-[11px] text-neutral-400">Verified openings, freelance projects & listings</p>
            </div>

            <div className="p-3 bg-neutral-800/80 rounded-xl border border-neutral-700 space-y-1">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-xs">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Business Insights</span>
              </div>
              <p className="text-[11px] text-neutral-400">Growth guides & entrepreneurship directory</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="text-xs text-neutral-400 font-mono">
              Visit <strong>rizqdaan.com</strong> for instant free access
            </span>
            <button className="px-5 py-2.5 bg-amber-500 group-hover:bg-amber-400 text-neutral-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg transition-transform group-hover:scale-105">
              <span>Open Rizqdaan Portal</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (slotType === 'sidebar') {
    return (
      <div className={`my-6 w-full ${className}`}>
        {/* Compliance Header */}
        <div className="w-full flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-neutral-400 dark:text-neutral-500 mb-1 px-1">
          <span className="flex items-center space-x-1">
            <Info className="w-3 h-3 text-amber-500" />
            <span>Sponsored Spotlight</span>
          </span>
          <span className="text-[9px] text-neutral-400">AdSlot #{adSlotId}</span>
        </div>

        {/* 300x600 style Sidebar Tall Card */}
        <div 
          onClick={openRizqdaan}
          className="group cursor-pointer w-full bg-gradient-to-b from-neutral-900 via-neutral-900 to-amber-950/60 border border-amber-500/30 hover:border-amber-400 rounded-2xl p-6 shadow-xl transition-all duration-300 space-y-5 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center font-black text-neutral-950 font-serif text-xl shadow-lg">
              RZ
            </div>
            <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full text-[10px] font-mono font-bold">
              Partner Hub
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-serif font-black text-white group-hover:text-amber-400 transition-colors">
              Rizqdaan.com
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Your comprehensive hub for smart online tools, career directory listings, and business empowerment resources.
            </p>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-neutral-800 text-xs">
            <div className="flex items-center space-x-2 text-neutral-300">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Free online tool suites</span>
            </div>
            <div className="flex items-center space-x-2 text-neutral-300">
              <Search className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Verified directory listings</span>
            </div>
            <div className="flex items-center space-x-2 text-neutral-300">
              <Briefcase className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct career opportunities</span>
            </div>
          </div>

          <div className="pt-3">
            <button className="w-full py-3 bg-amber-500 group-hover:bg-amber-400 text-neutral-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-transform group-hover:scale-[1.02]">
              <span>Visit Rizqdaan.com</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // footer-multiplex
  return (
    <div className={`my-8 w-full ${className}`}>
      {/* Compliance Header */}
      <div className="w-full flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-neutral-400 dark:text-neutral-500 mb-2 px-1">
        <span className="flex items-center space-x-1">
          <Info className="w-3 h-3 text-amber-500" />
          <span>Recommended Content &amp; Tools by Rizqdaan</span>
        </span>
        <span className="text-[9px] text-neutral-400">Sponsored Network</span>
      </div>

      {/* Multiplex 4-grid Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Free Business Calculators', desc: 'Financial, profit & growth estimation tools', tag: 'Tool Suite', icon: Calculator },
          { title: 'Verified Job Listings', desc: 'Find remote & regional professional openings', tag: 'Listings', icon: Briefcase },
          { title: 'Directory & Business Hub', desc: 'Submit and browse verified business profiles', tag: 'Directory', icon: Search },
          { title: 'Productivity & AI Utilities', desc: 'Speed up daily work with smart free tools', tag: 'Productivity', icon: Sparkles },
        ].map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              onClick={openRizqdaan}
              className="group cursor-pointer bg-neutral-900 border border-neutral-800 hover:border-amber-400/60 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {item.tag}
                  </span>
                  <IconComp className="w-4 h-4 text-amber-400" />
                </div>
                <h4 className="font-serif font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-snug">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 mt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-amber-400">
                <span>rizqdaan.com</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

