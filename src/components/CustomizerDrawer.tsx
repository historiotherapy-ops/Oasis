import React from 'react';
import { Chapter1Screen, Chapter2Config, Chapter3Config } from '../types';
import {
  DEFAULT_CHAPTER_1_SCREENS,
  DEFAULT_CHAPTER_2_CONFIG,
  DEFAULT_CHAPTER_3_CONFIG,
} from '../data/defaultTemplates';
import { X, RotateCcw, Sliders, Layers, Tv, FileText, Image as ImageIcon } from 'lucide-react';

interface CustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  screens: Chapter1Screen[];
  onUpdateScreens: (screens: Chapter1Screen[]) => void;
  ch2Config: Chapter2Config;
  onUpdateCh2Config: (config: Chapter2Config) => void;
  ch3Config: Chapter3Config;
  onUpdateCh3Config: (config: Chapter3Config) => void;
}

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({
  isOpen,
  onClose,
  screens,
  onUpdateScreens,
  ch2Config,
  onUpdateCh2Config,
  ch3Config,
  onUpdateCh3Config,
}) => {
  if (!isOpen) return null;

  const handleResetDefaults = () => {
    onUpdateScreens(DEFAULT_CHAPTER_1_SCREENS);
    onUpdateCh2Config(DEFAULT_CHAPTER_2_CONFIG);
    onUpdateCh3Config(DEFAULT_CHAPTER_3_CONFIG);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col">
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-black">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-white" />
          <h3 className="font-display text-sm uppercase tracking-wider text-white">
            Stage Visual Customizer
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white px-2 py-1 rounded hover:bg-zinc-900 cursor-pointer"
            title="Reset to default tour template"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded hover:bg-zinc-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Drawer Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
        
        {/* CHAPTER 1 CONTROLS */}
        <div className="space-y-3 border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-2 font-display text-zinc-200 text-xs uppercase tracking-wider">
            <Tv className="w-3.5 h-3.5 text-zinc-400" />
            <span>Chapter 1: Multi-Screen Frames</span>
          </div>

          <div className="space-y-3">
            {screens.map((screen, idx) => (
              <div key={screen.id} className="p-3 bg-zinc-900/70 border border-zinc-800 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-zinc-400 text-[10px]">Frame 0{idx + 1}</span>
                  <input
                    type="text"
                    value={screen.badgeText}
                    onChange={(e) =>
                      onUpdateScreens(
                        screens.map((s) =>
                          s.id === screen.id ? { ...s, badgeText: e.target.value } : s
                        )
                      )
                    }
                    className="bg-black border border-zinc-700 px-2 py-0.5 text-white font-display text-[11px] uppercase rounded w-32 focus:border-white focus:outline-none"
                    placeholder="BADGE TEXT"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={screen.videoUrl}
                    onChange={(e) =>
                      onUpdateScreens(
                        screens.map((s) =>
                          s.id === screen.id ? { ...s, videoUrl: e.target.value } : s
                        )
                      )
                    }
                    className="flex-1 bg-black border border-zinc-700 px-2 py-1 text-zinc-300 font-mono text-[10px] rounded focus:border-white focus:outline-none truncate"
                    placeholder="Image / Video URL"
                  />
                  <select
                    value={screen.mediaType}
                    onChange={(e) =>
                      onUpdateScreens(
                        screens.map((s) =>
                          s.id === screen.id
                            ? { ...s, mediaType: e.target.value as 'video' | 'image' }
                            : s
                        )
                      )
                    }
                    className="bg-black border border-zinc-700 text-zinc-300 font-mono text-[10px] px-1.5 py-1 rounded"
                  >
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                  </select>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-zinc-400 font-mono">Contrast: {screen.contrast}%</span>
                  <input
                    type="range"
                    min="100"
                    max="220"
                    value={screen.contrast}
                    onChange={(e) =>
                      onUpdateScreens(
                        screens.map((s) =>
                          s.id === screen.id ? { ...s, contrast: parseInt(e.target.value) } : s
                        )
                      )
                    }
                    className="w-28 accent-white cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHAPTER 2 CONTROLS */}
        <div className="space-y-3 border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-2 font-display text-zinc-200 text-xs uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-zinc-400" />
            <span>Chapter 2: Champagne Supernova</span>
          </div>

          <div className="p-3 bg-zinc-900/70 border border-zinc-800 rounded-lg space-y-3">
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 mb-1">Active Pathway:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onUpdateCh2Config({ ...ch2Config, activeOption: 'optionA' })}
                  className={`py-1 rounded text-[11px] font-semibold cursor-pointer border ${
                    ch2Config.activeOption === 'optionA'
                      ? 'bg-white text-black border-white'
                      : 'bg-black text-zinc-400 border-zinc-800'
                  }`}
                >
                  Option A (Video)
                </button>
                <button
                  onClick={() => onUpdateCh2Config({ ...ch2Config, activeOption: 'optionB' })}
                  className={`py-1 rounded text-[11px] font-semibold cursor-pointer border ${
                    ch2Config.activeOption === 'optionB'
                      ? 'bg-white text-black border-white'
                      : 'bg-black text-zinc-400 border-zinc-800'
                  }`}
                >
                  Option B (Layered)
                </button>
              </div>
            </div>

            {ch2Config.activeOption === 'optionA' ? (
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                  YouTube Video ID:
                </label>
                <input
                  type="text"
                  value={ch2Config.youtubeId}
                  onChange={(e) =>
                    onUpdateCh2Config({ ...ch2Config, youtubeId: e.target.value })
                  }
                  className="w-full bg-black border border-zinc-700 px-2 py-1 text-white font-mono text-xs rounded focus:border-white focus:outline-none"
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                    Headline Lyrics:
                  </label>
                  <textarea
                    rows={2}
                    value={ch2Config.headlineQuote}
                    onChange={(e) =>
                      onUpdateCh2Config({ ...ch2Config, headlineQuote: e.target.value })
                    }
                    className="w-full bg-black border border-zinc-700 px-2 py-1 text-white font-display text-xs uppercase rounded focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                    Secondary Sub-Quote:
                  </label>
                  <input
                    type="text"
                    value={ch2Config.subQuote}
                    onChange={(e) =>
                      onUpdateCh2Config({ ...ch2Config, subQuote: e.target.value })
                    }
                    className="w-full bg-black border border-zinc-700 px-2 py-1 text-white font-condensed text-xs uppercase rounded focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                    Cosmic Background URL:
                  </label>
                  <input
                    type="text"
                    value={ch2Config.bgImageUrl}
                    onChange={(e) =>
                      onUpdateCh2Config({ ...ch2Config, bgImageUrl: e.target.value })
                    }
                    className="w-full bg-black border border-zinc-700 px-2 py-1 text-zinc-300 font-mono text-[10px] rounded focus:border-white focus:outline-none"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* CHAPTER 3 CONTROLS */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-display text-zinc-200 text-xs uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-zinc-400" />
            <span>Chapter 3: Stand By Me (Scrapbook)</span>
          </div>

          <div className="p-3 bg-zinc-900/70 border border-zinc-800 rounded-lg space-y-3">
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 mb-1">
                Left IMAG Feed (Liam):
              </label>
              <input
                type="text"
                value={ch3Config.leftFeed.videoUrl}
                onChange={(e) =>
                  onUpdateCh3Config({
                    ...ch3Config,
                    leftFeed: { ...ch3Config.leftFeed, videoUrl: e.target.value },
                  })
                }
                className="w-full bg-black border border-zinc-700 px-2 py-1 text-zinc-300 font-mono text-[10px] rounded focus:border-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 mb-1">
                Right IMAG Feed (Noel):
              </label>
              <input
                type="text"
                value={ch3Config.rightFeed.videoUrl}
                onChange={(e) =>
                  onUpdateCh3Config({
                    ...ch3Config,
                    rightFeed: { ...ch3Config.rightFeed, videoUrl: e.target.value },
                  })
                }
                className="w-full bg-black border border-zinc-700 px-2 py-1 text-zinc-300 font-mono text-[10px] rounded focus:border-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 mb-1">
                Collage Items Count ({ch3Config.items.length} active):
              </label>
              <p className="text-zinc-500 text-[10px] font-sans">
                Click any newspaper clipping or polaroid directly on the canvas in the main view to edit its text, rotation, and photo!
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Drawer Footer */}
      <div className="p-4 border-t border-zinc-800 bg-black flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-white text-black font-semibold text-xs rounded hover:bg-zinc-200 cursor-pointer"
        >
          Apply & Close
        </button>
      </div>
    </div>
  );
};
