import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, Globe, Flame, ArrowUpRight, ShieldCheck, Zap, RefreshCw, CheckCircle2, Bookmark, Share2 } from 'lucide-react';
import { Article } from '../types.js';

interface HeroSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ articles, onSelectArticle }) => {
  const [now, setNow] = useState(Date.now());

  // Update time every 30 seconds for live 1-hour window calculation
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  if (articles.length === 0) return null;

  const ONE_HOUR_MS = 60 * 60 * 1000;

  // 1. Check for fresh articles published within the last 1 hour (60 minutes)
  const freshArticles = articles
    .filter(a => {
      const publishedTime = new Date(a.publishedAt).getTime();
      const age = now - publishedTime;
      return age >= 0 && age < ONE_HOUR_MS;
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const hasFreshStoryUnder1Hour = freshArticles.length > 0;

  // 2. Lead story selection
  let mainStory: Article;
  let isFreshLead = false;

  if (hasFreshStoryUnder1Hour) {
    mainStory = freshArticles[0];
    isFreshLead = true;
  } else {
    const trendingPool = [...articles].sort((a, b) => {
      const scoreA = (b.opportunityScore || 80) + (b.viewCount || 0) * 0.1;
      const scoreB = (a.opportunityScore || 80) + (a.viewCount || 0) * 0.1;
      return scoreB - scoreA;
    });

    const hourlyIndex = Math.floor(now / ONE_HOUR_MS) % Math.max(1, Math.min(trendingPool.length, 10));
    mainStory = trendingPool[hourlyIndex] || articles[0];
  }

  // Side stories: next 3 top stories excluding mainStory
  const sideStories = articles.filter(a => a.id !== mainStory.id).slice(0, 3);

  const formatTimeAgo = (isoString: string) => {
    const diffMin = Math.max(1, Math.round((now - new Date(isoString).getTime()) / 60000));
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.round(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getMinutesRemainingInHour = (isoString: string) => {
    const ageMs = now - new Date(isoString).getTime();
    const remainingMs = ONE_HOUR_MS - ageMs;
    const remainingMin = Math.max(1, Math.round(remainingMs / 60000));
    return remainingMin;
  };

  return (
    <section className="mb-12">
      {/* Editorial Section Header */}
      <div className="flex items-center justify-between border-b-2 border-neutral-900 dark:border-neutral-700 pb-3 mb-6">
        <div className="flex items-center space-x-3">
          <span className="w-3.5 h-3.5 bg-amber-500 rounded-sm"></span>
          <h2 className="text-xl sm:text-2xl font-black font-serif uppercase tracking-tight text-neutral-900 dark:text-white">
            Lead Global Stories
          </h2>
          {isFreshLead ? (
            <span className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Zap className="w-3.5 h-3.5 text-emerald-500 animate-bounce" />
              <span>1-Hour Priority Lead Slot</span>
            </span>
          ) : (
            <span className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md text-xs font-mono font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <RefreshCw className="w-3 h-3 text-amber-500 animate-spin" />
              <span>Hourly Dynamic Rotation</span>
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-neutral-500">
          <span className="hidden md:inline">Bureau Wire:</span>
          <span className="font-semibold text-neutral-700 dark:text-neutral-300">worldplus.world</span>
        </div>
      </div>

      {/* Broadsheet 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Large Featured Lead Story (7 cols) */}
        <div 
          onClick={() => onSelectArticle(mainStory)}
          className="lg:col-span-7 group cursor-pointer bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
        >
          {/* Main Image Container */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
            <img
              src={mainStory.featuredImage}
              alt={mainStory.featuredImageAlt || mainStory.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent"></div>

            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-500 text-neutral-950 font-bold uppercase text-xs tracking-wider rounded-lg shadow-md font-sans">
                {mainStory.categoryName}
              </span>
              
              {isFreshLead ? (
                <span className="px-3 py-1 bg-red-600 text-white font-bold uppercase text-xs tracking-wider rounded-lg shadow-md flex items-center space-x-1.5 animate-pulse">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Fresh Lead ({getMinutesRemainingInHour(mainStory.publishedAt)}m in Slot)</span>
                </span>
              ) : (
                <span className="px-3 py-1 bg-neutral-900/90 text-amber-400 border border-amber-400/40 font-bold uppercase text-xs tracking-wider rounded-lg shadow-md flex items-center space-x-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Trending Leader</span>
                </span>
              )}

              {mainStory.isBreaking && !isFreshLead && (
                <span className="px-2.5 py-1 bg-red-600 text-white font-bold uppercase text-xs tracking-wider rounded-lg shadow-md animate-pulse">
                  Breaking
                </span>
              )}
            </div>

            {/* Dateline overlay on image footer */}
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <div className="flex items-center space-x-3 text-xs text-neutral-300 font-mono">
                <span className="flex items-center space-x-1">
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold">{mainStory.countryName}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{formatTimeAgo(mainStory.publishedAt)}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Fact-Checked</span>
                </span>
              </div>
            </div>
          </div>

          {/* Lead Text Content */}
          <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-neutral-900 dark:text-white leading-tight mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {mainStory.title}
              </h1>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed line-clamp-3 mb-4 font-sans">
                {mainStory.shortSummary}
              </p>

              {/* Key Takeaways summary pill box */}
              {mainStory.keyTakeaways && mainStory.keyTakeaways.length > 0 && (
                <div className="mb-4 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold mb-1.5 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Editorial Core Findings</span>
                  </div>
                  <ul className="space-y-1 text-xs text-neutral-700 dark:text-neutral-300">
                    {mainStory.keyTakeaways.slice(0, 2).map((takeaway, tIdx) => (
                      <li key={tIdx} className="flex items-start space-x-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span className="line-clamp-1">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">WorldPlus International Wire</span>
                <span>•</span>
                <span className="font-mono">{mainStory.seo?.readingTimeMinutes || 4} min read</span>
              </div>

              <div className="flex items-center space-x-1 text-amber-600 dark:text-amber-400 font-bold font-mono group-hover:translate-x-1 transition-transform">
                <span>Read Full Coverage</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Side Lead Stories Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 pb-2 flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>Fast Developing Wire</span>
            </span>
            <span className="font-mono text-[11px]">Latest Dispatches</span>
          </div>

          <div className="space-y-3.5">
            {sideStories.map((story) => (
              <div
                key={story.id}
                onClick={() => onSelectArticle(story)}
                className="group cursor-pointer bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 hover:border-amber-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-2.5"
              >
                <div className="flex items-start justify-between space-x-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-2 text-[11px] font-mono">
                      <span className="font-bold text-amber-600 dark:text-amber-400 uppercase">
                        {story.categoryName || 'General'}
                      </span>
                      <span className="text-neutral-400">•</span>
                      <span className="text-neutral-500">{story.countryName || 'Global'}</span>
                    </div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-neutral-900 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                      {story.title}
                    </h3>
                  </div>

                  <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-neutral-800 shadow-sm">
                    <img
                      src={story.featuredImage}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
                  <span className="flex items-center space-x-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{formatTimeAgo(story.publishedAt)}</span>
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-amber-600 dark:text-amber-400 font-mono font-medium">
                      {story.opportunityScore || 90} Score
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-amber-500 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Bureau Verification Trust Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 text-white flex items-center justify-between shadow-sm">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Editorial Standard</span>
              <p className="text-xs text-neutral-300 font-medium">100% Primary Source Corroborated</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

