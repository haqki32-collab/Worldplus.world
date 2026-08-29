import React, { useState, useEffect } from 'react';
import { Radio, ChevronRight, ChevronLeft, Zap, Flame, ShieldAlert } from 'lucide-react';
import { Article } from '../types.js';

interface BreakingTickerProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({ articles, onSelectArticle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const breakingList = articles.filter(a => a.isBreaking || (a.opportunityScore && a.opportunityScore >= 90));
  const items = breakingList.length > 0 ? breakingList : articles.slice(0, 6);

  useEffect(() => {
    if (items.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [items.length, isPaused]);

  if (items.length === 0) return null;

  const currentItem = items[currentIndex % items.length] || items[0];
  if (!currentItem) return null;

  const categoryLabel = (currentItem.categoryName || 'World News').toUpperCase();

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
  };

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-neutral-900 border-b border-neutral-800 text-neutral-200 px-4 py-2 text-xs shadow-inner"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3 overflow-hidden flex-1 mr-4">
          {/* Pulsing Live Breaking Badge */}
          <div className="flex items-center space-x-1.5 px-2.5 py-0.5 bg-red-600 text-white font-bold uppercase tracking-wider rounded-md text-[10px] shrink-0 shadow-sm animate-pulse">
            <Radio className="w-3 h-3" />
            <span>Live Breaking</span>
          </div>

          <span className="text-amber-400 font-mono text-[11px] font-semibold hidden sm:inline shrink-0">
            [{categoryLabel}]
          </span>

          {/* Active story button */}
          <button
            onClick={() => onSelectArticle(currentItem)}
            className="text-left font-medium text-neutral-100 hover:text-amber-400 truncate transition-colors text-xs flex items-center space-x-1.5 group"
          >
            <span className="truncate group-hover:underline">{currentItem.title}</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Controls & Opportunity Score */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="hidden md:flex items-center space-x-2 text-[11px] text-amber-400 font-mono">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Opportunity {currentItem.opportunityScore || 92}/100</span>
          </div>

          {/* Mini Pagination Counter & Controls */}
          <div className="flex items-center space-x-1 bg-neutral-950 border border-neutral-800 rounded-lg p-0.5 text-neutral-400">
            <button
              onClick={handlePrev}
              className="p-1 hover:text-white hover:bg-neutral-800 rounded transition-colors"
              aria-label="Previous alert"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <span className="font-mono text-[10px] px-1 text-neutral-400">
              {currentIndex + 1}/{items.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1 hover:text-white hover:bg-neutral-800 rounded transition-colors"
              aria-label="Next alert"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
