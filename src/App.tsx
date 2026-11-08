import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { StadiumControlsBar } from './components/StadiumControlsBar';
import { Chapter1Module } from './components/Chapter1Module';
import { Chapter2Module } from './components/Chapter2Module';
import { Chapter3Module } from './components/Chapter3Module';
import { CustomizerDrawer } from './components/CustomizerDrawer';
import { CodeExportModal } from './components/CodeExportModal';
import { VideoExportModal } from './components/VideoExportModal';
import {
  DEFAULT_CHAPTER_1_SCREENS,
  DEFAULT_CHAPTER_2_CONFIG,
  DEFAULT_CHAPTER_3_CONFIG,
} from './data/defaultTemplates';
import { Chapter1Screen, Chapter2Config, Chapter3Config, StageSettings } from './types';
import { Sparkles, Terminal, Download, ArrowUpRight, HelpCircle, Layers, Grid, Video, Film } from 'lucide-react';

export default function App() {
  const [activeChapter, setActiveChapter] = useState<'all' | 'c1' | 'c2' | 'c3'>('all');
  const [screens, setScreens] = useState<Chapter1Screen[]>(DEFAULT_CHAPTER_1_SCREENS);
  const [ch2Config, setCh2Config] = useState<Chapter2Config>(DEFAULT_CHAPTER_2_CONFIG);
  const [ch3Config, setCh3Config] = useState<Chapter3Config>(DEFAULT_CHAPTER_3_CONFIG);

  const [settings, setSettings] = useState<StageSettings>({
    rigPreset: 'wembley',
    ledMeshEnabled: true,
    crtScanlinesEnabled: false,
    stadiumCrowdSilhouettes: true,
    stadiumBloom: true,
    globalVideoPlaying: true,
    globalAudioMuted: true,
  });

  const [showSwapAnnotations, setShowSwapAnnotations] = useState(true);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isVideoExportOpen, setIsVideoExportOpen] = useState(false);
  const [exportModalTab, setExportModalTab] = useState<string | null>(null);

  const handleUpdateSettings = (newSettings: Partial<StageSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Rig container styling based on preset
  const getRigWrapperClass = () => {
    switch (settings.rigPreset) {
      case 'wembley':
        return 'w-full transition-all';
      case 'heaton-park':
        return 'max-w-[1380px] mx-auto border-x border-zinc-800 transition-all';
      case 'croke-park':
        return 'max-w-[1100px] mx-auto border-x border-zinc-800 transition-all';
      case 'mobile':
        return 'max-w-[420px] mx-auto border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl my-6 transition-all';
      default:
        return 'w-full';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black flex flex-col font-sans">
      
      {/* 3-Zone Navigation Header */}
      <Navbar
        activeChapter={activeChapter}
        setActiveChapter={setActiveChapter}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenCodeExport={(tab = 'full') => setExportModalTab(tab)}
        onOpenVideoExport={() => setIsVideoExportOpen(true)}
      />

      {/* Stadium Rig Controls Bar */}
      <StadiumControlsBar
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        showSwapAnnotations={showSwapAnnotations}
        onToggleSwapAnnotations={() => setShowSwapAnnotations(!showSwapAnnotations)}
        activeChapter={activeChapter}
      />

      {/* Hero / Studio Introduction Banner */}
      <div className="bg-gradient-to-b from-zinc-950 to-black border-b border-zinc-800/80 px-4 lg:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest">
              <span>Tour Visual Production Suite</span>
              <span>·</span>
              <span>Disguise D3 & Web Canvas Logic</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-tight text-white leading-none">
              Oasis Live ’25 Stage Visuals Template
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Production-ready, highly customizable stage modules engineered for massive stadium displays and responsive web embeds. Swap out video feeds, drop in transparent PNG newspaper clippings, adjust typography/lyrics, and export clean, fully commented HTML/CSS components.
            </p>
          </div>

          {/* Quick Action Matrix */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => setIsVideoExportOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-400 text-black font-display text-xs uppercase tracking-wider rounded-md hover:bg-amber-300 transition-all shadow-md cursor-pointer font-bold"
            >
              <Film className="w-4 h-4 text-black" />
              <span>Export Stage Video (.webm)</span>
            </button>
            <button
              onClick={() => setExportModalTab('full')}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black font-display text-xs uppercase tracking-wider rounded-md hover:bg-zinc-200 transition-all shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Full HTML File</span>
            </button>
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-900 border border-zinc-700 text-zinc-200 font-display text-xs uppercase tracking-wider rounded-md hover:bg-zinc-800 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Open Visual Customizer</span>
            </button>
          </div>
        </div>

        {/* 3 Chapters Overview Cards Strip */}
        <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => setActiveChapter('c1')}
            className={`p-4 rounded-lg border transition-all cursor-pointer ${
              activeChapter === 'c1' || activeChapter === 'all'
                ? 'bg-zinc-900/60 border-zinc-700 hover:border-zinc-500'
                : 'bg-zinc-950 border-zinc-800 opacity-60 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
              <span>Chapter 01</span>
              <span className="text-[11px] font-bold text-white uppercase">CSS Grid</span>
            </div>
            <h3 className="font-display text-sm text-white uppercase tracking-wide">
              The Opening Frames ("Hello")
            </h3>
            <p className="text-zinc-400 text-xs mt-1 leading-normal">
              12px white digital boxes, monochrome feeds, customizable badge text overlays.
            </p>
          </div>

          <div
            onClick={() => setActiveChapter('c2')}
            className={`p-4 rounded-lg border transition-all cursor-pointer ${
              activeChapter === 'c2' || activeChapter === 'all'
                ? 'bg-zinc-900/60 border-zinc-700 hover:border-zinc-500'
                : 'bg-zinc-950 border-zinc-800 opacity-60 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
              <span>Chapter 02</span>
              <span className="text-[11px] font-bold text-white uppercase">Full Width</span>
            </div>
            <h3 className="font-display text-sm text-white uppercase tracking-wide">
              "Champagne Supernova"
            </h3>
            <p className="text-zinc-400 text-xs mt-1 leading-normal">
              Fluid cosmic journey: Option A (16:9 Video iframe) & Option B (Layered Typography).
            </p>
          </div>

          <div
            onClick={() => setActiveChapter('c3')}
            className={`p-4 rounded-lg border transition-all cursor-pointer ${
              activeChapter === 'c3' || activeChapter === 'all'
                ? 'bg-zinc-900/60 border-zinc-700 hover:border-zinc-500'
                : 'bg-zinc-950 border-zinc-800 opacity-60 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
              <span>Chapter 03</span>
              <span className="text-[11px] font-bold text-white uppercase">25% / 50% / 25%</span>
            </div>
            <h3 className="font-display text-sm text-white uppercase tracking-wide">
              "Stand By Me" (Scrapbook)
            </h3>
            <p className="text-zinc-400 text-xs mt-1 leading-normal">
              Flanked live IMAG cameras with center vintage newspaper clippings & polaroid collage.
            </p>
          </div>
        </div>
      </div>

      {/* Main Rig Canvas Stage Area */}
      <main className="flex-1 relative">
        <div className={getRigWrapperClass()}>
          
          {/* Chapter 1 Module */}
          {(activeChapter === 'all' || activeChapter === 'c1') && (
            <Chapter1Module
              screens={screens}
              onUpdateScreens={setScreens}
              showAnnotations={showSwapAnnotations}
              onOpenCodeExport={() => setExportModalTab('c1')}
            />
          )}

          {/* Chapter 2 Module */}
          {(activeChapter === 'all' || activeChapter === 'c2') && (
            <Chapter2Module
              config={ch2Config}
              onUpdateConfig={setCh2Config}
              showAnnotations={showSwapAnnotations}
              onOpenCodeExport={() =>
                setExportModalTab(ch2Config.activeOption === 'optionA' ? 'c2a' : 'c2b')
              }
            />
          )}

          {/* Chapter 3 Module */}
          {(activeChapter === 'all' || activeChapter === 'c3') && (
            <Chapter3Module
              config={ch3Config}
              onUpdateConfig={setCh3Config}
              showAnnotations={showSwapAnnotations}
              onOpenCodeExport={() => setExportModalTab('c3')}
            />
          )}

        </div>
      </main>

      {/* Production Footnote & Architecture Specs */}
      <footer className="border-t border-zinc-800 bg-black py-8 px-4 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-zinc-400">
          <div>
            <div className="font-display text-sm uppercase text-white tracking-wider mb-1">
              Oasis Live ’25 Stage Visuals Architecture
            </div>
            <p className="text-zinc-400 max-w-xl text-[11px] leading-relaxed">
              Constructed with pure CSS Grid, Flexbox, and standard inline-style drop-ins. All components function standalone without React or build pipelines, allowing drop-in staging into Disguise D3, Resolume, vMix, or modern web portals.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setExportModalTab('full')}
              className="text-white hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <span>View Source Code</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="text-white hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <span>Customizer Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* Live Customizer Side Drawer */}
      <CustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        screens={screens}
        onUpdateScreens={setScreens}
        ch2Config={ch2Config}
        onUpdateCh2Config={setCh2Config}
        ch3Config={ch3Config}
        onUpdateCh3Config={setCh3Config}
      />

      {/* Code Export & Swap Guide Modal */}
      <CodeExportModal
        isOpen={exportModalTab !== null}
        onClose={() => setExportModalTab(null)}
        screens={screens}
        ch2Config={ch2Config}
        ch3Config={ch3Config}
        defaultTab={exportModalTab || 'full'}
      />

      {/* Video Loop Export Modal (WebM 1080p Stage Loop) */}
      <VideoExportModal
        isOpen={isVideoExportOpen}
        onClose={() => setIsVideoExportOpen(false)}
        screens={screens}
        ch2Config={ch2Config}
        ch3Config={ch3Config}
        activeChapterDefault={activeChapter === 'all' ? 'c2' : activeChapter}
      />

    </div>
  );
}
