import React, { useState } from 'react';
import { Globe, ArrowRight, Flame, Clock } from 'lucide-react';
import { Country, Article } from '../types.js';

interface TrendingByCountryProps {
  countries: Country[];
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onSelectCountryPage: (countryCode: string) => void;
}

export const TrendingByCountry: React.FC<TrendingByCountryProps> = ({
  countries,
  articles,
  onSelectArticle,
  onSelectCountryPage
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState('PK');

  const enabledCountries = countries.filter(c => c.isEnabled && c.code !== 'GLOBAL');
  const activeCountry = countries.find(c => c.code === selectedCountryCode) || enabledCountries[0];

  const countryArticles = articles.filter(a => a.countryCode === selectedCountryCode || a.countryCode === 'GLOBAL');
  const leadArticle = countryArticles[0];
  const secondaryArticles = countryArticles.slice(1, 4);

  return (
    <section className="mb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-neutral-900 dark:border-neutral-700 pb-3 mb-6 gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
          <h2 className="text-xl sm:text-2xl font-black font-serif uppercase tracking-tight text-neutral-900 dark:text-white">
            Trending by Country &amp; Region
          </h2>
        </div>

        <button
          onClick={() => onSelectCountryPage(selectedCountryCode)}
          className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
        >
          <span>View {activeCountry?.name} Bureau</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Country selection pill tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        {enabledCountries.map(country => (
          <button
            key={country.code}
            onClick={() => setSelectedCountryCode(country.code)}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap border ${
              selectedCountryCode === country.code
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-md'
                : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
            }`}
          >
            <span className="text-base">{country.flagEmoji}</span>
            <span>{country.name}</span>
          </button>
        ))}
      </div>

      {/* Country News Grid */}
      {countryArticles.length === 0 ? (
        <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-8 text-center text-neutral-500 text-sm">
          No published articles currently logged for {activeCountry?.name}.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {countryArticles.slice(0, 3).map(article => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group cursor-pointer bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-neutral-900/90 text-white text-[10px] font-mono px-2 py-0.5 rounded border border-neutral-700">
                    {article.categoryName}
                  </div>
                  <div className="absolute top-3 right-3 bg-amber-500 text-neutral-950 text-[10px] font-bold font-mono px-2 py-0.5 rounded">
                    {article.opportunityScore} Score
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-neutral-400 mb-2">
                    <span className="text-neutral-700 dark:text-neutral-300 font-semibold">{article.countryName}</span>
                    <span>•</span>
                    <span>{article.seo.readingTimeMinutes} min read</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                    {article.shortSummary}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
                <span className="text-neutral-400 font-mono text-[11px]">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
                <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
