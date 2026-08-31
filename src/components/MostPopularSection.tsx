import React from 'react';
import { Eye, TrendingUp, Flame } from 'lucide-react';
import { Article } from '../types.js';

interface MostPopularSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const MostPopularSection: React.FC<MostPopularSectionProps> = ({ articles, onSelectArticle }) => {
  const sortedArticles = [...articles].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0)).slice(0, 5);

  if (sortedArticles.length === 0) return null;

  return (
    <section className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 mb-12 shadow-sm">
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-5">
        <div className="flex items-center space-x-2.5">
          <TrendingUp className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-black font-serif uppercase tracking-tight text-neutral-900 dark:text-white">
            Most Read Worldwide
          </h2>
        </div>
        <span className="text-xs font-mono text-neutral-400">Live Reader Count</span>
      </div>

      <div className="space-y-4">
        {sortedArticles.map((article, idx) => (
          <div
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="group cursor-pointer flex items-start space-x-4 pb-4 border-b border-neutral-200/60 dark:border-neutral-800/60 last:border-0 last:pb-0"
          >
            {/* Rank index */}
            <span className="text-3xl font-black font-serif text-neutral-300 dark:text-neutral-700 group-hover:text-amber-500 transition-colors w-7 shrink-0 text-center">
              0{idx + 1}
            </span>

            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2 text-[10px] font-mono">
                <span className="text-amber-600 dark:text-amber-400 font-bold uppercase">{article.categoryName || 'General'}</span>
                <span className="text-neutral-400">•</span>
                <span className="text-neutral-500">{article.countryName || 'Global'}</span>
              </div>

              <h3 className="font-serif font-bold text-sm text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
                {article.title}
              </h3>

              <div className="flex items-center space-x-3 text-[10px] text-neutral-400 font-mono pt-1">
                <span className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>{(article.viewCount || 0).toLocaleString()} views</span>
                </span>
                <span>•</span>
                <span className="text-amber-500 font-medium">
                  {article.opportunityScore || 90} Score
                </span>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="w-16 h-16 shrink-0 rounded-md overflow-hidden bg-neutral-800 hidden sm:block">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
