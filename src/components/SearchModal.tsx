import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Globe, Clock, ArrowRight, Flame } from 'lucide-react';
import { Article } from '../types.js';

interface SearchModalProps {
  articles: Article[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  articles,
  onClose,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filtered = query.trim() === ''
    ? articles.slice(0, 5)
    : articles.filter(a => {
        const q = query.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.shortSummary.toLowerCase().includes(q) ||
          a.categoryName.toLowerCase().includes(q) ||
          a.countryName.toLowerCase().includes(q) ||
          a.seo.relatedKeywords.some(k => k.toLowerCase().includes(q))
        );
      });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-neutral-950/80 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl text-white flex flex-col max-h-[75vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-800 space-x-3 bg-neutral-950">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search all global articles, trends, countries, topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-neutral-500 outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-neutral-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-neutral-800 text-[10px] font-mono text-neutral-400 border border-neutral-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto divide-y divide-neutral-800/60">
          <div className="px-3 py-1.5 text-[11px] font-mono uppercase text-neutral-400 flex items-center justify-between">
            <span>{query ? `Search Results (${filtered.length})` : 'Recent Trending Coverage'}</span>
            <span className="text-[10px]">worldplus.world</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-400">
              No matching articles found for "{query}". Try searching by category, country, or keyword.
            </div>
          ) : (
            filtered.map((art) => (
              <button
                key={art.id}
                onClick={() => {
                  onSelectArticle(art);
                  onClose();
                }}
                className="w-full flex items-start space-x-3 p-3 rounded-xl hover:bg-neutral-800/70 transition-colors text-left group"
              >
                <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-neutral-800">
                  <img
                    src={art.featuredImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center space-x-2 text-[10px] font-mono">
                    <span className="text-amber-400 font-bold uppercase">{art.categoryName}</span>
                    <span className="text-neutral-500">•</span>
                    <span className="text-neutral-400">{art.countryName}</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-white group-hover:text-amber-400 transition-colors truncate">
                    {art.title}
                  </h4>
                  <p className="text-xs text-neutral-400 line-clamp-1">
                    {art.shortSummary}
                  </p>
                </div>

                <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0 self-center" />
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>Search index updated live</span>
          <span>Domain: worldplus.world</span>
        </div>
      </div>
    </div>
  );
};
