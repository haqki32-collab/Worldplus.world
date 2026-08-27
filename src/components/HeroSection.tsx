import React from 'react';
import { Sparkles, Clock, Globe, Flame, ArrowUpRight, ShieldCheck, BookOpen } from 'lucide-react';
import { Article } from '../types.js';

interface HeroSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ articles, onSelectArticle }) => {
  if (articles.length === 0) return null;

  const mainStory = articles.find(a => a.isFeatured) || articles[0];
  const sideStories = articles.filter(a => a.id !== mainStory.id).slice(0, 3);

  const formatTimeAgo = (isoString: string) => {
    const diffMin = Math.round((Date.now() - new Date(isoString).getTime()) / 60000);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.round(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b-2 border-neutral-900 dark:border-neutral-700 pb-2.5 mb-6">
        <div className="flex items-center space-x-2.5">
          <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
          <h2 className="text-xl sm:text-2xl font-black font-serif uppercase tracking-tight text-neutral-900 dark:text-white">
            Trending Worldwide
          </h2>
        </div>
        <span className="text-xs font-mono text-neutral-500 uppercase">
          AI Verified Editorial • worldplus.world
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Large Featured Lead Story (8 cols) */}
        <div 
          onClick={() => onSelectArticle(mainStory)}
          className="lg:col-span-8 group cursor-pointer bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
        >
          {/* Image Container */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
            <img
              src={mainStory.featuredImage}
              alt={mainStory.featuredImageAlt || mainStory.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>

            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-amber-500 text-neutral-950 font-bold uppercase text-xs tracking-wider rounded-md shadow-md">
                {mainStory.categoryName}
              </span>
              {mainStory.isBreaking && (
                <span className="px-2.5 py-1 bg-red-600 text-white font-bold uppercase text-xs tracking-wider rounded-md shadow-md animate-pulse">
                  Breaking
                </span>
              )}
            </div>

            {/* Opportunity score badge */}
            <div className="absolute top-4 right-4 bg-neutral-900/90 backdrop-blur text-amber-400 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-mono font-semibold flex items-center space-x-1.5 shadow-lg">
              <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
              <span>Score: {mainStory.opportunityScore}/100</span>
            </div>

            {/* Title & summary overlay on mobile or baseline */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center space-x-3 text-xs text-neutral-300 mb-2 font-mono">
                <span className="flex items-center space-x-1">
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span>{mainStory.countryName}</span>
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
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-neutral-900 dark:text-white leading-tight mb-4 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              {mainStory.title}
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed line-clamp-3 mb-6">
              {mainStory.shortSummary}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">WorldPlus International Wire</span>
                <span>•</span>
                <span>{mainStory.seo.readingTimeMinutes} min read</span>
                <span>•</span>
                <span>{mainStory.seo.wordCount} words</span>
              </div>

              <div className="flex items-center space-x-1 text-amber-600 dark:text-amber-400 font-bold group-hover:translate-x-1 transition-transform">
                <span>Read Full Article</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Side Lead Stories Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 pb-1.5 flex items-center justify-between">
            <span>Key Developing Stories</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>

          {sideStories.map((story) => (
            <div
              key={story.id}
              onClick={() => onSelectArticle(story)}
              className="group cursor-pointer bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 hover:border-amber-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between space-x-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center space-x-2 text-[11px] font-mono">
                    <span className="font-bold text-amber-600 dark:text-amber-400 uppercase">
                      {story.categoryName}
                    </span>
                    <span className="text-neutral-400">•</span>
                    <span className="text-neutral-500">{story.countryName}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                    {story.title}
                  </h3>
                </div>

                <div className="w-20 h-20 shrink-0 rounded-md overflow-hidden bg-neutral-800">
                  <img
                    src={story.featuredImage}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimeAgo(story.publishedAt)}</span>
                </span>
                <span className="text-amber-500 font-mono font-medium">
                  {story.opportunityScore} Score
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
