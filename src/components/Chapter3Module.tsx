import React, { useState, useRef } from 'react';
import { Chapter3Config, ScrapbookItem } from '../types';
import { ClipUploadModal } from './ClipUploadModal';
import { Code2, Plus, Sparkles, Move, Edit3, Image as ImageIcon, FileText, Check, Trash2, Camera, Upload, Video, ToggleLeft, ToggleRight } from 'lucide-react';

interface Chapter3ModuleProps {
  config: Chapter3Config;
  onUpdateConfig: (config: Chapter3Config) => void;
  showAnnotations: boolean;
  onOpenCodeExport: () => void;
}

export const Chapter3Module: React.FC<Chapter3ModuleProps> = ({
  config,
  onUpdateConfig,
  showAnnotations,
  onOpenCodeExport,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<ScrapbookItem | null>(null);
  const [activeImagModalSide, setActiveImagModalSide] = useState<'left' | 'right' | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const fullNewspaperInputRef = useRef<HTMLInputElement>(null);

  const handleSelectItem = (item: ScrapbookItem) => {
    setSelectedItemId(item.id);
    setEditingItem({ ...item });
  };

  const handleSaveItemEdit = () => {
    if (!editingItem) return;
    onUpdateConfig({
      ...config,
      items: config.items.map((it) => (it.id === editingItem.id ? editingItem : it)),
    });
    setEditingItem(null);
  };

  const handleAddNewClipping = () => {
    const newItem: ScrapbookItem = {
      id: `clip-${Date.now()}`,
      type: 'newspaper',
      title: 'NME ARCHIVE 1995',
      subtitle: 'ROLL WITH IT: THE BATTLE OF BRITPOP',
      bodyText: '"They represent the hopes, dreams, and sheer unfiltered rock and roll defiance of a generation." The Gallagher phenomenon takes over the charts.',
      source: 'NME FRONT COVER',
      date: 'AUGUST 1995',
      imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
      isFullImageOnly: false,
      topPercent: 25,
      leftPercent: 20,
      rotationDeg: -3,
      widthPx: 290,
      zIndex: config.items.length + 10,
    };
    onUpdateConfig({
      ...config,
      items: [...config.items, newItem],
    });
    handleSelectItem(newItem);
  };

  const handleAddNewFullPictureNewspaper = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    const newItem: ScrapbookItem = {
      id: `full-news-${Date.now()}`,
      type: 'newspaper',
      title: file.name.replace(/\.[^/.]+$/, '').toUpperCase().slice(0, 24),
      imageUrl: objectUrl,
      isFullImageOnly: true, // FULL PICTURE OVER IT WITH NO TEXT
      date: 'ARCHIVAL PRINT',
      topPercent: 20,
      leftPercent: 15,
      rotationDeg: 2.5,
      widthPx: 320,
      zIndex: config.items.length + 12,
    };
    onUpdateConfig({
      ...config,
      items: [...config.items, newItem],
    });
    handleSelectItem(newItem);
  };

  const handleAddNewPolaroid = () => {
    const newItem: ScrapbookItem = {
      id: `polaroid-${Date.now()}`,
      type: 'polaroid',
      title: 'BACKSTAGE 1994',
      subtitle: 'Earls Court soundcheck acoustic session',
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80',
      date: 'NOVEMBER 1994',
      isFullImageOnly: false,
      topPercent: 35,
      leftPercent: 35,
      rotationDeg: 4,
      widthPx: 210,
      zIndex: config.items.length + 10,
    };
    onUpdateConfig({
      ...config,
      items: [...config.items, newItem],
    });
    handleSelectItem(newItem);
  };

  const handleUploadScrapbookPhoto = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    const newItem: ScrapbookItem = {
      id: `custom-polaroid-${Date.now()}`,
      type: 'polaroid',
      title: file.name.replace(/\.[^/.]+$/, '').toUpperCase().slice(0, 20),
      subtitle: 'Custom User Uploaded Archival Photo',
      imageUrl: objectUrl,
      date: 'LIVE ’25 TOUR',
      topPercent: 28,
      leftPercent: 30,
      rotationDeg: -2,
      widthPx: 220,
      zIndex: config.items.length + 12,
    };
    onUpdateConfig({
      ...config,
      items: [...config.items, newItem],
    });
    handleSelectItem(newItem);
  };

  const handleRemoveItem = (id: string) => {
    onUpdateConfig({
      ...config,
      items: config.items.filter((it) => it.id !== id),
    });
    if (selectedItemId === id) {
      setSelectedItemId(null);
      setEditingItem(null);
    }
  };

  const handleApplyImagClip = (data: { url: string; type: 'video' | 'image' }) => {
    if (activeImagModalSide === 'left') {
      onUpdateConfig({
        ...config,
        leftFeed: {
          ...config.leftFeed,
          videoUrl: data.url,
          mediaType: data.type,
        },
      });
    } else if (activeImagModalSide === 'right') {
      onUpdateConfig({
        ...config,
        rightFeed: {
          ...config.rightFeed,
          videoUrl: data.url,
          mediaType: data.type,
        },
      });
    }
    setActiveImagModalSide(null);
  };

  return (
    <section id="chapter-3" className="relative bg-black border-b border-zinc-800 py-10 px-4 md:px-8">
      
      {/* Hidden file input for generic photos */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*,video/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleUploadScrapbookPhoto(e.target.files[0]);
          }
        }}
        className="hidden"
      />

      {/* Hidden file input specifically for Full Picture Newspaper with no text */}
      <input
        type="file"
        ref={fullNewspaperInputRef}
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleAddNewFullPictureNewspaper(e.target.files[0]);
          }
        }}
        className="hidden"
      />

      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1.5 uppercase tracking-wider">
              <span>Chapter 03</span>
              <span>·</span>
              <span className="text-white font-bold">Stadium 25% / 50% / 25% IMAG & Scrapbook</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-white">
              "Stand By Me" (Scrapbook / Collage Aesthetic)
            </h2>
            <p className="text-zinc-400 text-sm max-w-2xl mt-1.5 leading-relaxed">
              An emotional scrapbook journey using raw archival photos, vintage newspaper clippings (with full picture support and zero text overlays), and live camera feeds.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Primary Action: Upload Full Picture Newspaper */}
            <button
              onClick={() => fullNewspaperInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-amber-400 text-black hover:bg-amber-300 rounded-md cursor-pointer transition-colors shadow-xs"
              title="Upload a full picture over the newspaper clipping with zero text"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Full Newspaper Picture (No Text)</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white text-black hover:bg-zinc-200 rounded-md cursor-pointer transition-colors shadow-xs"
              title="Upload your own polaroid photo"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>+ Polaroid</span>
            </button>

            <button
              onClick={handleAddNewClipping}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-md cursor-pointer transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>+ Typeset Article</span>
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

        {/* Swap Points Explanation Callout */}
        {showAnnotations && (
          <div className="mt-4 p-3 bg-amber-950/40 border border-amber-500/40 rounded-lg text-amber-200 text-xs flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-amber-300">
                Newspaper & Full Picture Options (Chapter 3):
              </p>
              <p className="text-zinc-300 leading-relaxed">
                1. <strong>Full Picture Newspaper:</strong> Click <strong>"Upload Full Newspaper Picture (No Text)"</strong> to upload any scanned broadsheet, concert headline PNG, or vintage clipping photo. It displays cleanly with aged edges, tape, and shadow without any overlaid typography.
                <br />
                2. <strong>Toggle Text vs Full Picture:</strong> Click any newspaper clipping on the canvas to toggle between <em>"Full Picture (No Text)"</em> and <em>"Typeset Newspaper"</em>.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Selected Item Editor Modal/Bar */}
      {editingItem && (
        <div className="max-w-7xl mx-auto mb-6 p-4 bg-zinc-900 border border-zinc-700 rounded-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase text-zinc-400">Editing Collage Item:</span>
              <span className="font-bold text-white text-xs">{editingItem.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleRemoveItem(editingItem.id)}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded hover:bg-red-950/50 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
              <button
                onClick={handleSaveItemEdit}
                className="flex items-center gap-1.5 px-3 py-1 bg-white text-black font-semibold text-xs rounded hover:bg-zinc-200 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Done</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* For newspaper items: Render mode switch (Full picture vs Typeset text) */}
            {editingItem.type === 'newspaper' && (
              <div className="md:col-span-3 p-3 bg-black/60 border border-zinc-700 rounded-lg flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-display uppercase text-white text-xs block mb-0.5">
                    Newspaper Display Mode
                  </span>
                  <span className="text-zinc-400 text-[11px]">
                    Choose whether to display a raw full picture scan with no text, or editable typeset prose.
                  </span>
                </div>
                <div className="inline-flex rounded-md p-0.5 bg-zinc-900 border border-zinc-700 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setEditingItem({ ...editingItem, isFullImageOnly: true })}
                    className={`px-3 py-1.5 rounded cursor-pointer transition-colors ${
                      editingItem.isFullImageOnly
                        ? 'bg-amber-400 text-black font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Full Picture (No Text)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingItem({ ...editingItem, isFullImageOnly: false })}
                    className={`px-3 py-1.5 rounded cursor-pointer transition-colors ${
                      !editingItem.isFullImageOnly
                        ? 'bg-white text-black font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Typeset Headline & Body
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-zinc-400 font-mono mb-1">Title / Identifier:</label>
              <input
                type="text"
                value={editingItem.title}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                className="w-full bg-black border border-zinc-700 px-2.5 py-1.5 rounded text-white font-mono focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-zinc-400 font-mono mb-1">Image / Scan URL:</label>
              <input
                type="text"
                value={editingItem.imageUrl || ''}
                onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                placeholder="https://... or upload local file"
                className="w-full bg-black border border-zinc-700 px-2.5 py-1.5 rounded text-white font-mono focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-zinc-400 font-mono mb-1">
                Rotation ({editingItem.rotationDeg}°):
              </label>
              <input
                type="range"
                min="-15"
                max="15"
                step="0.5"
                value={editingItem.rotationDeg}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, rotationDeg: parseFloat(e.target.value) })
                }
                className="w-full accent-white cursor-pointer"
              />
            </div>

            {/* If newspaper is in typeset mode, show headline and body inputs */}
            {editingItem.type === 'newspaper' && !editingItem.isFullImageOnly && (
              <>
                <div className="md:col-span-3">
                  <label className="block text-zinc-400 font-mono mb-1">Headline / Subtitle:</label>
                  <input
                    type="text"
                    value={editingItem.subtitle || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                    className="w-full bg-black border border-zinc-700 px-2.5 py-1.5 rounded text-white font-mono focus:border-white focus:outline-none"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-zinc-400 font-mono mb-1">Article Body Text:</label>
                  <textarea
                    rows={2}
                    value={editingItem.bodyText || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, bodyText: e.target.value })}
                    className="w-full bg-black border border-zinc-700 px-2.5 py-1.5 rounded text-white font-serif text-xs focus:border-white focus:outline-none"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* START OF STADIUM 3-COLUMN DISPLAY (25% / 50% / 25%) */}
      <div className="max-w-7xl mx-auto rounded-xl overflow-hidden border border-zinc-800 shadow-2xl">
        <div className="flex flex-col lg:flex-row w-full min-h-[580px] bg-black">
          
          {/* LEFT COLUMN (25% STADIUM IMAG FEED: LIAM) */}
          <div className="lg:w-1/4 relative bg-zinc-950 border-b lg:border-b-0 lg:border-r border-zinc-800 min-h-[300px] lg:min-h-[580px] flex items-center justify-center overflow-hidden group">
            {config.leftFeed.mediaType === 'video' ? (
              <video
                src={config.leftFeed.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover block"
                style={{ filter: config.leftFeed.filter }}
              />
            ) : (
              <img
                src={config.leftFeed.videoUrl}
                alt="IMAG Stage Left Feed"
                className="w-full h-full object-cover block"
                style={{ filter: config.leftFeed.filter }}
              />
            )}

            {/* LED mesh & scanlines */}
            <div className="absolute inset-0 pointer-events-none led-pixel-mesh opacity-35" />
            <div className="absolute inset-0 pointer-events-none crt-scanlines opacity-25" />

            {/* Broadcast Tally HUD */}
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/80 px-2.5 py-1 rounded border border-zinc-700/80 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-[10px] text-white font-bold tracking-wider">
                {config.leftFeed.label}
              </span>
            </div>

            {/* Action button to swap clip or upload video */}
            <button
              onClick={() => setActiveImagModalSide('left')}
              className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/85 hover:bg-black text-white text-[11px] font-mono px-3 py-1 rounded border border-zinc-700 cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              <Upload className="w-3 h-3 text-amber-400" />
              <span>Swap Feed / Upload Video</span>
            </button>
          </div>

          {/* CENTER COLUMN (50% SCRAPBOOK & COLLAGE CANVAS) */}
          <div className="lg:w-1/2 relative bg-[#121110] min-h-[560px] lg:min-h-[580px] overflow-hidden border-b lg:border-b-0 border-zinc-800 select-none">
            {/* Paper Texture Background */}
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-25 filter contrast-125"
              style={{ backgroundImage: `url('${config.paperTextureUrl}')` }}
            />

            {/* Subtle stadium backdrop watermark */}
            <div className="absolute top-4 left-5 pointer-events-none">
              <span className="font-display text-white/10 text-xl tracking-widest uppercase">
                STAND BY ME // ARCHIVAL SCRAPBOOK
              </span>
            </div>

            {/* Quick Actions to Add Items directly onto canvas */}
            <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
              <button
                onClick={() => fullNewspaperInputRef.current?.click()}
                className="bg-amber-400 hover:bg-amber-300 text-black px-2.5 py-1 rounded text-[10px] font-display uppercase tracking-wider flex items-center gap-1 cursor-pointer shadow-sm font-bold"
              >
                <Upload className="w-3 h-3" />
                <span>Upload Newspaper Picture</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-black/80 hover:bg-black text-zinc-300 hover:text-white px-2.5 py-1 rounded border border-zinc-700 text-[10px] font-mono flex items-center gap-1 cursor-pointer"
              >
                <Camera className="w-3 h-3 text-white" />
                <span>+ Polaroid</span>
              </button>
            </div>

            {/* COLLAGE ITEMS CONTAINER */}
            <div className="relative w-full h-full min-h-[560px]">
              {config.items.map((item) => {
                const isSelected = selectedItemId === item.id;

                if (item.type === 'polaroid') {
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      className={`absolute cursor-pointer transition-transform duration-150 group/polaroid ${
                        isSelected ? 'ring-2 ring-amber-400' : ''
                      }`}
                      style={{
                        top: `${item.topPercent}%`,
                        left: `${item.leftPercent}%`,
                        width: `${item.widthPx}px`,
                        transform: `rotate(${item.rotationDeg}deg)`,
                        zIndex: item.zIndex,
                      }}
                    >
                      {/* Top Masking Tape */}
                      <div className="absolute -top-2.5 left-1/3 w-14 h-4 masking-tape -rotate-3 z-30" />

                      <div className="bg-white p-2.5 pb-6 shadow-2xl transition-shadow group-hover/polaroid:shadow-amber-500/10">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full aspect-square object-cover block grayscale contrast-125 mb-2"
                        />
                        <div className="font-typewriter text-zinc-900 text-xs font-bold text-center uppercase tracking-wider">
                          {item.title}
                        </div>
                        {item.subtitle && (
                          <div className="text-[10px] text-zinc-500 text-center mt-0.5 font-sans leading-tight">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }

                if (item.type === 'ticket') {
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      className={`absolute cursor-pointer transition-transform duration-150 ${
                        isSelected ? 'ring-2 ring-amber-400' : ''
                      }`}
                      style={{
                        top: `${item.topPercent}%`,
                        left: `${item.leftPercent}%`,
                        width: `${item.widthPx}px`,
                        transform: `rotate(${item.rotationDeg}deg)`,
                        zIndex: item.zIndex,
                      }}
                    >
                      <div className="bg-zinc-950 text-white p-3 border-2 border-dashed border-zinc-600 shadow-2xl">
                        <div className="font-display text-[11px] tracking-wider text-amber-300 border-b border-zinc-700 pb-1 uppercase">
                          {item.title}
                        </div>
                        <div className="font-sans text-[9px] text-zinc-300 mt-1 uppercase">
                          {item.subtitle}
                        </div>
                        <div className="font-typewriter text-[8px] text-zinc-500 mt-1.5">
                          {item.bodyText}
                        </div>
                      </div>
                    </div>
                  );
                }

                // Newspaper Item: Support FULL PICTURE WITH NO TEXT
                if (item.isFullImageOnly && item.imageUrl) {
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      className={`absolute cursor-pointer transition-transform duration-150 group/fullnews ${
                        isSelected ? 'ring-2 ring-amber-400' : ''
                      }`}
                      style={{
                        top: `${item.topPercent}%`,
                        left: `${item.leftPercent}%`,
                        width: `${item.widthPx}px`,
                        transform: `rotate(${item.rotationDeg}deg)`,
                        zIndex: item.zIndex,
                      }}
                      title="Full Newspaper Picture (Click to adjust rotation or swap image)"
                    >
                      {/* Top Masking Tape Strips */}
                      <div className="absolute -top-3 left-6 w-14 h-4 masking-tape -rotate-6 z-30" />
                      <div className="absolute -bottom-2 right-8 w-12 h-4 masking-tape rotate-3 z-30" />

                      {/* Raw Full Newspaper Picture Container with Zero Text Overlay */}
                      <div className="relative bg-[#FAF6EC] p-1.5 shadow-2xl border border-[#D5C9A8] overflow-hidden rounded-xs">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-auto object-cover block filter contrast-125 sepia-[0.15]"
                        />
                      </div>
                    </div>
                  );
                }

                // Standard Newspaper Clipping with Typeset Text
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    className={`absolute cursor-pointer transition-transform duration-150 group/news ${
                      isSelected ? 'ring-2 ring-amber-400' : ''
                    }`}
                    style={{
                      top: `${item.topPercent}%`,
                      left: `${item.leftPercent}%`,
                      width: `${item.widthPx}px`,
                      transform: `rotate(${item.rotationDeg}deg)`,
                      zIndex: item.zIndex,
                    }}
                  >
                    {/* Corner tape */}
                    <div className="absolute -top-2 right-4 w-14 h-4 masking-tape rotate-6 z-30" />

                    <div className="bg-[#FAF6EC] text-zinc-950 p-4 border border-[#D5C9A8] shadow-2xl transition-all">
                      {/* Newspaper Masthead */}
                      <div className="font-editorial text-xs font-black tracking-widest text-center border-b-2 border-black pb-1 uppercase">
                        {item.title}
                      </div>
                      <div className="text-[9px] text-zinc-600 text-center py-1 border-b border-zinc-300 font-sans uppercase">
                        {item.date} · {item.source}
                      </div>
                      {item.subtitle && (
                        <div className="font-editorial text-[13px] font-bold leading-tight my-2 text-zinc-900 uppercase">
                          {item.subtitle}
                        </div>
                      )}
                      {item.bodyText && (
                        <p className="font-editorial text-[10px] leading-relaxed text-zinc-800 text-justify">
                          {item.bodyText}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN (25% STADIUM IMAG FEED: NOEL) */}
          <div className="lg:w-1/4 relative bg-zinc-950 lg:border-l border-zinc-800 min-h-[300px] lg:min-h-[580px] flex items-center justify-center overflow-hidden group">
            {config.rightFeed.mediaType === 'video' ? (
              <video
                src={config.rightFeed.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover block"
                style={{ filter: config.rightFeed.filter }}
              />
            ) : (
              <img
                src={config.rightFeed.videoUrl}
                alt="IMAG Stage Right Feed"
                className="w-full h-full object-cover block"
                style={{ filter: config.rightFeed.filter }}
              />
            )}

            {/* LED mesh & scanlines */}
            <div className="absolute inset-0 pointer-events-none led-pixel-mesh opacity-35" />
            <div className="absolute inset-0 pointer-events-none crt-scanlines opacity-25" />

            {/* Broadcast Tally HUD */}
            <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/80 px-2.5 py-1 rounded border border-zinc-700/80 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-[10px] text-white font-bold tracking-wider">
                {config.rightFeed.label}
              </span>
            </div>

            {/* Action button to swap clip or upload video */}
            <button
              onClick={() => setActiveImagModalSide('right')}
              className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/85 hover:bg-black text-white text-[11px] font-mono px-3 py-1 rounded border border-zinc-700 cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              <Upload className="w-3 h-3 text-amber-400" />
              <span>Swap Feed / Upload Video</span>
            </button>
          </div>

        </div>
      </div>

      {/* Modal for uploading/changing IMAG video feed */}
      {activeImagModalSide && (
        <ClipUploadModal
          isOpen={true}
          onClose={() => setActiveImagModalSide(null)}
          targetTitle={
            activeImagModalSide === 'left' ? 'Stage Left IMAG Feed (Liam)' : 'Stage Right IMAG Feed (Noel)'
          }
          initialUrl={
            activeImagModalSide === 'left'
              ? config.leftFeed.videoUrl
              : config.rightFeed.videoUrl
          }
          initialType={
            activeImagModalSide === 'left'
              ? config.leftFeed.mediaType
              : config.rightFeed.mediaType
          }
          onApplyClip={handleApplyImagClip}
        />
      )}
    </section>
  );
};
