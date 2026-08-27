import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  textToRead: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ title, textToRead }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isSupported, setIsSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleTogglePlay = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        window.speechSynthesis.cancel();
        const cleanText = `${title}. ${textToRead.slice(0, 1500)}`;
        const utter = new SpeechSynthesisUtterance(cleanText);
        utter.rate = playbackRate;
        utter.pitch = 1.0;
        
        utter.onend = () => {
          setIsPlaying(false);
          setProgress(100);
        };

        utter.onerror = () => {
          setIsPlaying(false);
        };

        utteranceRef.current = utter;
        window.speechSynthesis.speak(utter);
        setIsPlaying(true);
      }
    }
  };

  const handleReset = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setProgress(0);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (isPlaying) {
      handleReset();
      setTimeout(handleTogglePlay, 100);
    }
  };

  return (
    <div className="bg-neutral-900 text-white rounded-xl p-4 sm:p-5 border border-neutral-800 shadow-md my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-500 text-neutral-950 rounded-lg">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                Listen to this Article
              </span>
              <span className="text-[10px] bg-neutral-800 text-neutral-300 px-1.5 py-0.2 rounded font-mono border border-neutral-700">
                AI Voice Reader
              </span>
            </div>
            <p className="text-xs text-neutral-400 truncate max-w-md">
              Synthesized narration powered by WorldPlus Audio Engine
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleTogglePlay}
            className="flex items-center space-x-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-lg transition-colors text-xs"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Play Audio</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
            title="Restart"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Speed Buttons */}
          <div className="flex items-center space-x-1 bg-neutral-800 p-1 rounded-lg text-[10px] font-mono">
            {[1, 1.25, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className={`px-2 py-1 rounded ${
                  playbackRate === speed ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
