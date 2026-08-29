import React, { useState } from 'react';
import { Cpu, Building2, Trophy, Film, Sparkles, Clock, Globe, ArrowRight, ShieldCheck } from 'lucide-react';
import { Article, Category } from '../types.js';

interface CategorySectionsProps {
  categories: Category[];
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (categorySlug: string) => void;
}

export const CategorySections: React.FC<CategorySectionsProps> = ({
  categories,
  articles,
  onSelectArticle,
  onSelectCategory
}) => {
  const [activeTab, setActiveTab] = useState<string>('technology');

  const mainCategoryIds = [
    'technology', 'business-industrial', 'finance', 'sports', 'entertainment', 
    'science', 'health', 'games', 'autos', 'travel', 'food-drink', 'real-estate'
  ];
  const displayCategories = categories.filter(c => mainCategoryIds.includes(c.slug || c.id)).slice(0, 8);
  const fallbackDisplay = displayCategories.length > 0 ? displayCategories : categories.slice(0, 8);

  const currentCategory = categories.find(c => c.id === activeTab || c.slug === activeTab) || categories[0];
  const categoryArticles = articles.filter(a => a.categoryId === currentCategory?.id || a.categoryId === currentCategory?.slug);
  const leadArticle = categoryArticles[0];
  const secondaryArticles = categoryArticles.slice(1, 4);

  return (
    <section className="mb-12">
      {/* Category Section Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-neutral-900 dark:border-neutral-700 pb-3 mb-6 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
          <h2 className="text-xl sm:text-2xl font-black font-serif uppercase tracking-tight text-neutral-900 dark:text-white">
            Category Intelligence
          </h2>
        </div>

        {/* Category switcher tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1">
          {fallbackDisplay.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.slug || cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                (activeTab === cat.id || activeTab === cat.slug)
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content Layout for Active Category */}
      {categoryArticles.length === 0 ? (
        <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-8 text-center">
          <p className="text-sm text-neutral-500">No published articles currently in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Story in Category (7 cols) */}
          {leadArticle && (
            <div
              onClick={() => onSelectArticle(leadArticle)}
              className="lg:col-span-7 group cursor-pointer bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                <img
                  src={leadArticle.featuredImage}
                  alt={leadArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="bg-amber-500 text-neutral-950 font-bold px-2.5 py-0.5 rounded uppercase text-[10px] tracking-wider">
                    {leadArticle.subcategoryName || leadArticle.categoryName || currentCategory.name}
                  </span>
                  <span className="font-mono text-neutral-300">{leadArticle.countryName || 'Global'}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-neutral-900 dark:text-white leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-3">
                  {leadArticle.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed line-clamp-3 mb-4">
                  {leadArticle.shortSummary}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500">
                  <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Fact Checked</span>
                  </span>
                  <span className="font-mono">{leadArticle.seo?.readingTimeMinutes || 4} min read</span>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Stories in Category (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {secondaryArticles.map(article => (
                <div
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="group cursor-pointer bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 hover:border-amber-500/50 transition-all flex items-start space-x-4"
                >
                  <div className="w-24 h-20 shrink-0 rounded-md overflow-hidden bg-neutral-800">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-neutral-400">
                      <span className="text-amber-600 dark:text-amber-400 uppercase font-bold">
                        {article.subcategoryName || article.categoryName || currentCategory.name}
                      </span>
                      <span>•</span>
                      <span>{article.countryName || 'Global'}</span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-neutral-900 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {/* View Full Category Link */}
            <button
              onClick={() => onSelectCategory(currentCategory.slug)}
              className="w-full py-3 px-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-800 dark:text-neutral-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
            >
              <span>Explore All {currentCategory.name} Coverage</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
