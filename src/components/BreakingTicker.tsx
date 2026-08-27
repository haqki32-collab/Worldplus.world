import React, { useState, useEffect } from 'react';
import { Radio, ChevronRight, Zap, Flame } from 'lucide-react';
import { Article } from '../types.js';

interface BreakingTickerProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({ articles, onSelectArticle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const breakingList = articles.filter(a => a.isBreaking || a.opportunityScore >= 90);
  const items = breakingList.length > 0 ? breakingList : articles.slice(0, 5);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="bg-amber-950/40 border-b border-amber-900/40 text-amber-200 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3 overflow-hidden">
          {/* Badge */}
          <div className="flex items-center space-x-1.5 px-2 py-0.5 bg-red-600 text-white font-bold uppercase tracking-wider rounded text-[10px] shrink-0 animate-pulse">
            <Radio className="w-3 h-3" />
            <span>Breaking</span>
          </div>

          <span className="text-amber-500 font-mono text-[10px] hidden sm:inline shrink-0">
            [{currentItem.categoryName.toUpperCase()}]
          </span>

          {/* Active story text */}
          <button
            onClick={() => onSelectArticle(currentItem)}
            className="text-left font-medium text-amber-100 hover:text-white truncate transition-colors text-xs flex items-center space-x-1"
          >
            <span className="truncate">{currentItem.title}</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-amber-400" />
          </button>
        </div>

        {/* Opportunity / Trending tag */}
        <div className="hidden md:flex items-center space-x-2 shrink-0 text-[11px] text-amber-400/90 font-mono pl-4">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span>Opportunity: {currentItem.opportunityScore}/100</span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-400">Published on worldplus.world</span>
        </div>
      </div>
    </div>
  );
};
