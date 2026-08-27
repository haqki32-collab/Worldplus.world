import React from 'react';
import { ArrowLeft, Globe, Flame, Clock, ShieldCheck } from 'lucide-react';
import { Country, Article } from '../types.js';

interface CountryPageProps {
  country: Country;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onBack: () => void;
}

export const CountryPage: React.FC<CountryPageProps> = ({
  country,
  articles,
  onSelectArticle,
  onBack
}) => {
  const countryArticles = articles.filter(
    a => a.countryCode.toUpperCase() === country.code.toUpperCase() || a.countryCode === 'GLOBAL'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-amber-500 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Global Overview</span>
      </button>

      {/* Country Bureau Banner */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white rounded-2xl p-6 sm:p-10 border border-neutral-800 mb-8 shadow-xl">
        <div className="flex items-start space-x-5">
          <span className="text-5xl sm:text-6xl">{country.flagEmoji}</span>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs uppercase tracking-wider">
              <span>National &amp; Regional Bureau</span>
              <span>•</span>
              <span>{country.region}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight">{country.name} Edition</h1>
            <p className="text-neutral-300 text-sm sm:text-base max-w-2xl">
              Real-time trend monitoring, economic insights, and breaking verified developments across {country.name} and the broader {country.region} region.
            </p>
          </div>
        </div>
      </div>

      {/* Country Articles Grid */}
      {countryArticles.length === 0 ? (
        <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-12 text-center text-neutral-500">
          <p>No active stories currently filed under {country.name}.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countryArticles.map(article => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group cursor-pointer bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-neutral-950">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-neutral-400">
                    <span className="text-amber-500 font-bold uppercase">{article.categoryName || 'General'}</span>
                    <span>•</span>
                    <span>{article.seo?.readingTimeMinutes || 4} min read</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-white leading-snug group-hover:text-amber-500 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {article.shortSummary}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Recent'}</span>
                <span className="text-amber-500">{article.opportunityScore || 90} Score</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
