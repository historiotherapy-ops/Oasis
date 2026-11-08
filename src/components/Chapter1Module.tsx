import React, { useState } from 'react';
import { Chapter1Screen } from '../types';
import { ClipUploadModal } from './ClipUploadModal';
import { Code2, Plus, Trash2, Edit3, Check, RefreshCw, Sparkles, Upload, Play, Pause, Film } from 'lucide-react';

interface Chapter1ModuleProps {
  screens: Chapter1Screen[];
  onUpdateScreens: (screens: Chapter1Screen[]) => void;
  showAnnotations: boolean;
  onOpenCodeExport: () => void;
}

export const Chapter1Module: React.FC<Chapter1ModuleProps> = ({
  screens,
  onUpdateScreens,
  showAnnotations,
  onOpenCodeExport,
}) => {
  const [columns, setColumns] = useState<3 | 4>(3);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempText, setTempText] = useState('');
  
  // Clip manager modal state
  const [activeClipModalScreenId, setActiveClipModalScreenId] = useState<string | null>(null);
  const [isAddingNewScreen, setIsAddingNewScreen] = useState(false);

  const activeScreenForClip = screens.find((s) => s.id === activeClipModalScreenId);

  const handleStartEdit = (screen: Chapter1Screen) => {
    setEditingId(screen.id);
    setTempText(screen.badgeText);
  };

  const handleSaveEdit = (id: string) => {
    onUpdateScreens(
      screens.map((s) => (s.id === id ? { ...s, badgeText: tempText.trim() || 'HELLO' } : s))
    );
    setEditingId(null);
  };

  const handleAddScreenWithClip = (clipData: {
    url: string;
    type: 'video' | 'image';
    badge?: string;
    grayscale?: number;
    contrast?: number;
  }) => {
    const newScreen: Chapter1Screen = {
      id: `c1-${Date.now()}`,
      badgeText: clipData.badge || 'WHAT’S THE STORY',
      videoUrl: clipData.url,
      mediaType: clipData.type,
      altText: 'Custom Tour Clip Feed',
      grayscale: clipData.grayscale ?? 100,
      contrast: clipData.contrast ?? 160,
    };
    onUpdateScreens([...screens, newScreen]);
    setIsAddingNewScreen(false);
  };

  const handleUpdateScreenClip = (
    id: string,
    clipData: {
      url: string;
      type: 'video' | 'image';
      badge?: string;
      grayscale?: number;
      contrast?: number;
    }
  ) => {
    onUpdateScreens(
      screens.map((s) =>
        s.id === id
          ? {
              ...s,
              videoUrl: clipData.url,
              mediaType: clipData.type,
              badgeText: clipData.badge || s.badgeText,
              grayscale: clipData.grayscale ?? s.grayscale,
              contrast: clipData.contrast ?? s.contrast,
            }
          : s
      )
    );
    setActiveClipModalScreenId(null);
  };

  const handleRemoveScreen = (id: string) => {
    if (screens.length <= 1) return;
    onUpdateScreens(screens.filter((s) => s.id !== id));
  };

  return (
    <section id="chapter-1" className="relative bg-black border-b border-zinc-800 py-10 px-4 md:px-8">
      {/* Chapter Editorial Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1.5 uppercase tracking-wider">
              <span>Chapter 01</span>
              <span>·</span>
              <span className="text-white font-bold">Stadium Disguise Multi-Screen Canvas</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-white">
              The Opening Frames ("Hello")
            </h2>
            <p className="text-zinc-400 text-sm max-w-2xl mt-1.5 leading-relaxed">
              Emulates the massive canvas logic of stadium video servers—independent video feeds framed inside sharp, branded 12px white digital boxes with real-time video playback and custom clip drop-ins.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Grid density selector */}
            <div className="inline-flex rounded-md p-0.5 bg-zinc-900 border border-zinc-800 text-xs">
              <button
                onClick={() => setColumns(3)}
                className={`px-3 py-1 rounded font-medium cursor-pointer transition-colors ${
                  columns === 3 ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                3 Columns
              </button>
              <button
                onClick={() => setColumns(4)}
                className={`px-3 py-1 rounded font-medium cursor-pointer transition-colors ${
                  columns === 4 ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                4 Columns
              </button>
            </div>

            {/* Add screen with custom clip button */}
            <button
              onClick={() => setIsAddingNewScreen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-white text-black hover:bg-zinc-200 rounded-md cursor-pointer transition-colors shadow-xs"
              title="Add screen with your own video clip or upload"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Add My Clip</span>
            </button>

            <button
              onClick={onOpenCodeExport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-md cursor-pointer transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Get Code</span>
            </button>
          </div>
        </div>

        {/* Swap Points Explanation Callout Bar */}
        {showAnnotations && (
          <div className="mt-4 p-3 bg-amber-950/40 border border-amber-500/40 rounded-lg text-amber-200 text-xs flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-amber-300">
                Template Swap Rules (Chapter 1):
              </p>
              <p className="text-zinc-300 leading-relaxed">
                1. <strong>Play & Preview Clips:</strong> Hover any tile to click <strong>"Swap / Preview Clip"</strong>. Upload your own video (MP4/WebM) or select from authentic preloaded pyro and crowd loops.
                <br />
                2. <strong>Branded White Box:</strong> Styled with <code className="bg-black/60 px-1 py-0.5 rounded text-amber-300 font-mono">border: 12px solid #FFFFFF</code> and high-contrast drop-shadow.
                <br />
                3. <strong>Badge Text:</strong> Double-click any badge to edit live, or swap the inner text in the <code className="bg-black/60 px-1 py-0.5 rounded text-amber-300 font-mono">position: absolute</code> bottom overlay box.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* START OF GRID CONTAINER (Exact template implementation from prompt) */}
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid gap-5 bg-black p-4 md:p-6 rounded-xl border border-zinc-900 ${
            columns === 4
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {screens.map((screen, idx) => (
            <div
              key={screen.id}
              className="group relative overflow-hidden bg-black transition-transform duration-200"
              style={{
                border: '12px solid #FFFFFF',
                boxShadow: '0 0 16px rgba(0,0,0,0.7)',
                aspectRatio: '16/9',
              }}
            >
              {/* Media Feed: Real video loop or image */}
              {screen.mediaType === 'video' ? (
                <video
                  src={screen.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover block transition-all duration-300"
                  style={{
                    filter: `grayscale(${screen.grayscale}%) contrast(${screen.contrast}%)`,
                  }}
                />
              ) : (
                <img
                  src={screen.videoUrl}
                  alt={screen.altText}
                  className="w-full h-full object-cover block transition-all duration-300 group-hover:scale-105"
                  style={{
                    filter: `grayscale(${screen.grayscale}%) contrast(${screen.contrast}%)`,
                  }}
                />
              )}

              {/* CRT / LED grid overlay effect */}
              <div className="absolute inset-0 pointer-events-none led-pixel-mesh opacity-30" />

              {/* Editable Overlay Text Box */}
              <div className="absolute bottom-2.5 left-2.5 z-20">
                {editingId === screen.id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveEdit(screen.id);
                    }}
                    className="flex items-center gap-1 bg-white p-1 shadow-lg"
                  >
                    <input
                      type="text"
                      value={tempText}
                      onChange={(e) => setTempText(e.target.value)}
                      className="text-black font-display text-xs px-1.5 py-0.5 uppercase tracking-wider outline-none w-36"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="p-1 bg-black text-white hover:bg-zinc-800 rounded cursor-pointer"
                    >
                      <Check className="w-3 h-3" />
                    </button>
                  </form>
                ) : (
                  <div
                    onClick={() => handleStartEdit(screen)}
                    className="cursor-pointer group/badge relative bg-white text-black px-3 py-1 font-display text-xs md:text-sm tracking-wider uppercase shadow-md flex items-center gap-1.5 hover:bg-zinc-200 transition-colors"
                    title="Click to edit badge text"
                  >
                    <span>{screen.badgeText}</span>
                    <Edit3 className="w-2.5 h-2.5 opacity-0 group-hover/badge:opacity-100 transition-opacity" />
                  </div>
                )}
              </div>

              {/* Action Toolbar on Hover */}
              <div className="absolute top-2.5 right-2.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-black/85 p-1 border border-zinc-700 rounded backdrop-blur-xs">
                <button
                  onClick={() => setActiveClipModalScreenId(screen.id)}
                  className="flex items-center gap-1 px-2 py-0.5 text-zinc-200 hover:text-white rounded hover:bg-zinc-800 cursor-pointer text-[10px] font-mono font-bold"
                  title="Swap or upload your own clip"
                >
                  <Upload className="w-3 h-3 text-amber-400" />
                  <span>Swap Clip</span>
                </button>
                <button
                  onClick={() => handleStartEdit(screen)}
                  className="p-1 text-zinc-300 hover:text-white rounded hover:bg-zinc-800 cursor-pointer"
                  title="Edit badge text"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
                {screens.length > 1 && (
                  <button
                    onClick={() => handleRemoveScreen(screen.id)}
                    className="p-1 text-zinc-400 hover:text-red-400 rounded hover:bg-zinc-800 cursor-pointer"
                    title="Remove screen"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Annotation Overlay Callout if Active */}
              {showAnnotations && idx === 0 && (
                <div className="absolute top-2 left-2 z-30 bg-amber-400 text-black font-mono text-[10px] font-bold px-2 py-0.5 shadow-sm">
                  12px White Border + Live Video Loop
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Clip Upload / Swap Modal for Existing Screen Tile */}
      {activeScreenForClip && (
        <ClipUploadModal
          isOpen={true}
          onClose={() => setActiveClipModalScreenId(null)}
          targetTitle={`Screen Tile "${activeScreenForClip.badgeText}"`}
          initialUrl={activeScreenForClip.videoUrl}
          initialType={activeScreenForClip.mediaType}
          initialBadge={activeScreenForClip.badgeText}
          onApplyClip={(data) => handleUpdateScreenClip(activeScreenForClip.id, data)}
        />
      )}

      {/* Clip Upload Modal for Adding a New Screen Tile */}
      {isAddingNewScreen && (
        <ClipUploadModal
          isOpen={true}
          onClose={() => setIsAddingNewScreen(false)}
          targetTitle="Add New Stage Screen Frame"
          initialBadge="WHAT’S THE STORY"
          initialType="video"
          onApplyClip={handleAddScreenWithClip}
        />
      )}
    </section>
  );
};
