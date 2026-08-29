import React from 'react';
import { Flame, TrendingUp, Globe, Sparkles, ArrowRight } from 'lucide-react';
import { TrendItem, Article } from '../types.js';

interface TrendingNowSectionProps {
  trends: TrendItem[];
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onGenerateFromTrend: (trend: TrendItem) => void;
}

export const TrendingNowSection: React.FC<TrendingNowSectionProps> = ({
  trends,
  articles,
  onSelectArticle,
  onGenerateFromTrend
}) => {
  const topTrends = trends.slice(0, 6);

  const findMatchingArticle = (trend: TrendItem) => {
    return articles.find(a => 
      a.title.toLowerCase().includes(trend.topic.toLowerCase()) ||
      trend.topic.toLowerCase().includes(a.title.toLowerCase()) ||
      (a.categoryId === trend.categoryId && a.countryCode === trend.countryCode)
    );
  };

  return (
    <section className="mb-12 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-neutral-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg border border-orange-500/30">
            <Flame className="w-5 h-5 fill-orange-500 text-orange-400 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-serif uppercase tracking-tight flex items-center space-x-2">
              <span>Trending Now</span>
              <span className="text-xs font-mono font-normal text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                LIVE VELOCITY
              </span>
            </h2>
            <p className="text-xs text-neutral-400">High-velocity global topics detected across 20+ monitored countries</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Dynamic Real-Time Ingestion</span>
        </div>
      </div>

      {/* Grid of Trend Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topTrends.map((trend, idx) => {
          const matchArticle = findMatchingArticle(trend);

          return (
            <div
              key={trend.id || idx}
              className="bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700/60 hover:border-amber-500/50 rounded-xl p-5 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                {/* Meta row */}
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <div className="flex items-center space-x-2 font-mono">
                    <span className="text-neutral-400 flex items-center space-x-1">
                      <Globe className="w-3 h-3 text-neutral-500" />
                      <span>{trend.countryName}</span>
                    </span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-amber-400 font-semibold uppercase">{trend.categoryName}</span>
                  </div>

                  <div className="flex items-center space-x-1 text-emerald-400 font-mono text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    <TrendingUp className="w-3 h-3" />
                    <span>+{trend.trendGrowth}%</span>
                  </div>
                </div>

                {/* Topic Name / Headline */}
                <h3 className="font-serif font-bold text-base text-white group-hover:text-amber-300 transition-colors leading-snug mb-2">
                  {trend.sampleHeadline || trend.topic}
                </h3>

                {/* Keywords Chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {trend.relatedKeywords?.slice(0, 3).map((kw, kIdx) => (
                    <span
                      key={kIdx}
                      className="px-2 py-0.5 rounded bg-neutral-900/90 text-[10px] text-neutral-300 font-mono border border-neutral-700/50"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action bar */}
              <div className="pt-3 border-t border-neutral-700/50 flex items-center justify-between text-xs">
                <span className="text-neutral-400 font-mono text-[11px]">
                  Global Wire Dispatch
                </span>

                {matchArticle ? (
                  <button
                    onClick={() => onSelectArticle(matchArticle)}
                    className="flex items-center space-x-1 text-amber-400 hover:text-amber-300 font-bold font-mono transition-colors"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={() => onGenerateFromTrend(trend)}
                    className="flex items-center space-x-1 text-amber-400 hover:text-amber-300 font-bold font-mono transition-colors"
                  >
                    <span>Read Report</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
