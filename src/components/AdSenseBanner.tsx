import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface AdSenseBannerProps {
  slotType: 'header-leaderboard' | 'in-article' | 'sidebar' | 'footer-multiplex';
  publisherId?: string;
  adSlotId?: string;
  className?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  slotType,
  publisherId = 'ca-pub-3940256099942544', // Demo Google test publisher ID
  adSlotId = '1234567890',
  className = ''
}) => {
  const getSlotDimensions = () => {
    switch (slotType) {
      case 'header-leaderboard':
        return { height: 'h-[90px]', label: 'Top Leaderboard Ad (728x90 / Responsive)' };
      case 'in-article':
        return { height: 'h-[250px]', label: 'In-Article Native Ad (Responsive 336x280 / 728x90)' };
      case 'sidebar':
        return { height: 'h-[600px]', label: 'Sidebar Sticky Half-Page Ad (300x600)' };
      case 'footer-multiplex':
        return { height: 'h-[160px]', label: 'Recommended Content & Sponsored Units' };
    }
  };

  const { height, label } = getSlotDimensions();

  return (
    <div className={`my-6 flex flex-col items-center justify-center ${className}`}>
      {/* Strict AdSense Compliance Label: Always clearly identify advertisement */}
      <div className="w-full flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-neutral-400 dark:text-neutral-500 mb-1 px-1">
        <span className="flex items-center space-x-1">
          <Info className="w-3 h-3 text-neutral-400" />
          <span>Advertisement / Sponsored</span>
        </span>
        <span className="text-[9px] text-neutral-400">Google AdSense Compliant</span>
      </div>

      {/* Ad Container Box with strict non-interfering borders */}
      <div
        className={`w-full ${height} bg-neutral-100 dark:bg-neutral-900 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-lg flex flex-col items-center justify-center p-4 text-center text-xs text-neutral-500 dark:text-neutral-400 relative overflow-hidden transition-all hover:border-neutral-400 dark:hover:border-neutral-700`}
      >
        {/* Background Subtle Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <span className="font-serif font-black text-4xl text-neutral-900 dark:text-white">WorldPlus</span>
        </div>

        <div className="relative z-10 max-w-sm space-y-1.5">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-[10px] font-mono font-medium text-neutral-600 dark:text-neutral-300">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>AdSense Slot Active</span>
          </div>
          <p className="font-semibold text-neutral-700 dark:text-neutral-200 text-xs">
            {label}
          </p>
          <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
            Slot ID: {adSlotId} • Pub: {publisherId}
          </p>
        </div>
      </div>
    </div>
  );
};
