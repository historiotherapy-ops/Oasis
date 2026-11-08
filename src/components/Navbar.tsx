import React from 'react';
import { Download, Sliders, MonitorPlay, Code2, Film } from 'lucide-react';

interface NavbarProps {
  activeChapter: 'all' | 'c1' | 'c2' | 'c3';
  setActiveChapter: (ch: 'all' | 'c1' | 'c2' | 'c3') => void;
  onOpenCustomizer: () => void;
  onOpenCodeExport: (defaultTab?: string) => void;
  onOpenVideoExport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeChapter,
  setActiveChapter,
  onOpenCustomizer,
  onOpenCodeExport,
  onOpenVideoExport,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-zinc-800 px-3 sm:px-6 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => setActiveChapter('all')}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded shrink-0"
        >
          <span className="font-display text-xs sm:text-base tracking-wider text-white uppercase whitespace-nowrap group-hover:text-zinc-300 transition-colors">
            OASIS LIVE ’25 RIG
          </span>
        </button>

        {/* Zone 2: Single-line Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-semibold tracking-wide uppercase text-zinc-400">
          <button
            onClick={() => setActiveChapter('all')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white py-1 ${
              activeChapter === 'all' ? 'text-white border-b-2 border-white' : ''
            }`}
          >
            Full Stage Rig
          </button>
          <button
            onClick={() => setActiveChapter('c1')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white py-1 ${
              activeChapter === 'c1' ? 'text-white border-b-2 border-white' : ''
            }`}
          >
            Ch 1: Opening Frames
          </button>
          <button
            onClick={() => setActiveChapter('c2')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white py-1 ${
              activeChapter === 'c2' ? 'text-white border-b-2 border-white' : ''
            }`}
          >
            Ch 2: Supernova
          </button>
          <button
            onClick={() => setActiveChapter('c3')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white py-1 ${
              activeChapter === 'c3' ? 'text-white border-b-2 border-white' : ''
            }`}
          >
            Ch 3: Stand By Me
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Quick Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenVideoExport}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/40 rounded-md transition-colors whitespace-nowrap cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400"
            title="Export Stage Visual Loop as 1080p WebM Video"
          >
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Export Video</span>
          </button>

          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-md transition-colors whitespace-nowrap cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
            title="Open Live Customizer Panel"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Customize</span>
          </button>

          <button
            onClick={() => onOpenCodeExport()}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 text-xs font-bold text-black bg-white hover:bg-zinc-200 rounded-md transition-colors whitespace-nowrap cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-zinc-400"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Copy Embed Code</span>
            <span className="sm:hidden">Get Code</span>
          </button>
        </div>
      </div>
    </header>
  );
};
