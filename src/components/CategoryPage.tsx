import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Flame, Clock, Globe, ShieldCheck } from 'lucide-react';
import { Category, Article } from '../types.js';

interface CategoryPageProps {
  category: Category;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onBack: () => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  articles,
  onSelectArticle,
  onBack
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');

  const categoryArticles = articles.filter(a => a.categoryId === category.id);
  const filteredArticles = selectedSubcategory === 'all'
    ? categoryArticles
    : categoryArticles.filter(a => a.subcategoryId === selectedSubcategory);

  const leadStory = filteredArticles[0];
  const remainingStories = filteredArticles.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-amber-500 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Global Overview</span>
      </button>

      {/* Category Hero Banner */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white rounded-2xl p-6 sm:p-10 border border-neutral-800 mb-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Category Desk • worldplus.world</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight">{category.name}</h1>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            {category.description}
          </p>

          {/* Publishing Interval Badge */}
          <div className="pt-2 flex items-center space-x-4 text-xs font-mono text-neutral-400">
            <span>Global Coverage: <strong className="text-amber-400">24/7 Verified Wire</strong></span>
            <span>•</span>
            <span>Archived Reports: <strong className="text-white">{categoryArticles.length} Stories</strong></span>
          </div>
        </div>

        {/* Subcategory filter pills */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-6 mt-6 border-t border-neutral-800">
            <button
              onClick={() => setSelectedSubcategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                selectedSubcategory === 'all'
                  ? 'bg-amber-500 text-neutral-950'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              All {category.name}
            </button>
            {category.subcategories.map(sub => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubcategory(sub.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  selectedSubcategory === sub.id
                    ? 'bg-amber-500 text-neutral-950'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content list */}
      {filteredArticles.length === 0 ? (
        <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-12 text-center text-neutral-500">
          <p>No articles found for this selection.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Lead story */}
          {leadStory && (
            <div
              onClick={() => onSelectArticle(leadStory)}
              className="group cursor-pointer bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-neutral-950">
                <img
                  src={leadStory.featuredImage}
                  alt={leadStory.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400 mb-3">
                    <span className="text-amber-500 font-bold uppercase">{leadStory.subcategoryName || leadStory.categoryName || category.name}</span>
                    <span>•</span>
                    <span>{leadStory.countryName || 'Global'}</span>
                  </div>

                  <h2 className="font-serif font-black text-2xl sm:text-3xl text-neutral-900 dark:text-white leading-tight group-hover:text-amber-500 transition-colors mb-4">
                    {leadStory.title}
                  </h2>

                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed line-clamp-4 mb-4">
                    {leadStory.shortSummary}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>{leadStory.seo?.readingTimeMinutes || 4} min read</span>
                  <span className="text-amber-500 font-bold">WorldPlus Wire</span>
                </div>
              </div>
            </div>
          )}

          {/* Grid of remaining stories */}
          {remainingStories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingStories.map(art => (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="group cursor-pointer bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden bg-neutral-950">
                      <img
                        src={art.featuredImage}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-5 space-y-2">
                      <div className="flex items-center space-x-2 text-[10px] font-mono text-neutral-400">
                        <span className="text-amber-500 font-bold uppercase">{art.subcategoryName || art.categoryName || category.name}</span>
                        <span>•</span>
                        <span>{art.countryName || 'Global'}</span>
                      </div>
                      <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-white leading-snug group-hover:text-amber-500 transition-colors line-clamp-2">
                        {art.title}
                      </h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                        {art.shortSummary}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>{art.publishedAt ? new Date(art.publishedAt).toLocaleDateString() : 'Recent'}</span>
                    <span className="text-amber-500 font-medium">{art.seo?.readingTimeMinutes || 4} min read</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
