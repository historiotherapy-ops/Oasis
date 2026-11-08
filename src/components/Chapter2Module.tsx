import React, { useState } from 'react';
import { Chapter2Config } from '../types';
import { ClipUploadModal } from './ClipUploadModal';
import { Code2, Video, Type, Sparkles, RefreshCw, Layers, Upload, Edit3, Check } from 'lucide-react';

interface Chapter2ModuleProps {
  config: Chapter2Config;
  onUpdateConfig: (config: Chapter2Config) => void;
  showAnnotations: boolean;
  onOpenCodeExport: () => void;
}

export const Chapter2Module: React.FC<Chapter2ModuleProps> = ({
  config,
  onUpdateConfig,
  showAnnotations,
  onOpenCodeExport,
}) => {
  const [editingQuotes, setEditingQuotes] = useState(false);
  const [trackKicker, setTrackKicker] = useState(config.trackKicker || 'CHAMPAGNE SUPERNOVA · LIVE ’25');
  const [headline, setHeadline] = useState(config.headlineQuote);
  const [subquote, setSubquote] = useState(config.subQuote);
  const [bottomLeft, setBottomLeft] = useState(config.bottomCreditLeft || 'Noel Gallagher Guitar Solo');
  const [bottomRight, setBottomRight] = useState(config.bottomCreditRight || 'Cosmic Transit 96KHz');
  const [letterSpacing, setLetterSpacing] = useState(config.letterSpacing || '-0.04em');

  const [ytInput, setYtInput] = useState(config.youtubeId);
  const [isClipModalOpen, setIsClipModalOpen] = useState(false);

  const colorGrades = {
    'cosmic-purple': {
      label: 'Cosmic Purple (Default)',
      gradient: 'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.45) 0%, rgba(30, 2, 60, 0.9) 65%, #000000 100%)',
      accent: '#C084FC',
    },
    'supersonic-blue': {
      label: 'Supersonic Cobalt',
      gradient: 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.5) 0%, rgba(2, 20, 60, 0.92) 65%, #000000 100%)',
      accent: '#60A5FA',
    },
    'oasis-emerald': {
      label: 'Oasis Emerald',
      gradient: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.45) 0%, rgba(2, 45, 25, 0.9) 65%, #000000 100%)',
      accent: '#34D399',
    },
    'amber-nebula': {
      label: 'Amber Nebula',
      gradient: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.45) 0%, rgba(55, 20, 2, 0.9) 65%, #000000 100%)',
      accent: '#FBBF24',
    },
  };

  const handleSaveAllLyrics = () => {
    onUpdateConfig({
      ...config,
      trackKicker,
      headlineQuote: headline,
      subQuote: subquote,
      bottomCreditLeft: bottomLeft,
      bottomCreditRight: bottomRight,
      letterSpacing,
    });
    setEditingQuotes(false);
  };

  const handleSaveYtId = () => {
    onUpdateConfig({
      ...config,
      youtubeId: ytInput.trim(),
    });
  };

  const sampleCosmicBgs = [
    'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1600&q=80',
  ];

  const handleApplyCustomCosmicBg = (clipData: {
    url: string;
    type: 'video' | 'image';
  }) => {
    onUpdateConfig({
      ...config,
      bgImageUrl: clipData.url,
      mediaType: clipData.type,
    });
    setIsClipModalOpen(false);
  };

  return (
    <section id="chapter-2" className="relative bg-black border-b border-zinc-800 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1.5 uppercase tracking-wider">
              <span>Chapter 02</span>
              <span>·</span>
              <span className="text-white font-bold">Continuous Fluid Upward Loop</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-white">
              "Champagne Supernova" (Psychedelic Cosmic Journey)
            </h2>
            <p className="text-zinc-400 text-sm max-w-2xl mt-1.5 leading-relaxed">
              A fluid upward looping visual journey transitioning through vivid, surreal cosmic backdrops. Preview live YouTube video embeds or layered typographic stage banners with fully editable lyrics and credits.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Pathway Method Toggle (Option A vs Option B) */}
            <div className="inline-flex rounded-md p-0.5 bg-zinc-900 border border-zinc-800 text-xs">
              <button
                onClick={() => onUpdateConfig({ ...config, activeOption: 'optionA' })}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-semibold cursor-pointer transition-colors ${
                  config.activeOption === 'optionA'
                    ? 'bg-white text-black shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Option A (Responsive Video)</span>
              </button>
              <button
                onClick={() => onUpdateConfig({ ...config, activeOption: 'optionB' })}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-semibold cursor-pointer transition-colors ${
                  config.activeOption === 'optionB'
                    ? 'bg-white text-black shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>Option B (Layered Typography)</span>
              </button>
            </div>

            <button
              onClick={onOpenCodeExport}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-white text-black hover:bg-zinc-200 rounded-md cursor-pointer transition-colors shadow-xs"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Get Code</span>
            </button>
          </div>
        </div>

        {/* Swap Points Explanation Callout */}
        {showAnnotations && (
          <div className="mt-4 p-3 bg-purple-950/40 border border-purple-500/40 rounded-lg text-purple-200 text-xs flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-purple-300">
                Template Swap Rules (Chapter 2):
              </p>
              <p className="text-zinc-300 leading-relaxed">
                {config.activeOption === 'optionA' ? (
                  <>
                    <strong>Option A (Video):</strong> In the <code className="bg-black/60 px-1 py-0.5 rounded text-purple-300 font-mono">iframe src</code>, swap <code className="bg-black/60 px-1 py-0.5 rounded text-purple-300 font-mono">YOUR_VIDEO_ID</code> in both the URL path and the <code className="bg-black/60 px-1 py-0.5 rounded text-purple-300 font-mono">playlist=</code> parameter to keep it auto-playing on seamless stage loop.
                  </>
                ) : (
                  <>
                    <strong>Option B (Layered):</strong> Click <strong>"Edit All Texts"</strong> to change all lines (Track Kicker, Primary Headline, Sub-Quote, and Solo Credits). Click <strong>"Swap / Upload Backdrop"</strong> to drop in your own video loop or starfield.
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* RENDER ACTIVE OPTION */}
      <div className="max-w-7xl mx-auto">
        {config.activeOption === 'optionA' ? (
          /* OPTION A: Responsive Video Embed */
          <div className="space-y-4">
            {/* Quick config strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-zinc-400 font-mono">YouTube Video ID:</span>
                <input
                  type="text"
                  value={ytInput}
                  onChange={(e) => setYtInput(e.target.value)}
                  placeholder="e.g. tI-5uv4wryI"
                  className="bg-black border border-zinc-700 px-2 py-1 text-white font-mono text-xs rounded w-36 focus:border-white focus:outline-none"
                />
                <button
                  onClick={handleSaveYtId}
                  className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded font-medium cursor-pointer"
                >
                  Update Embed
                </button>
              </div>

              <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                <span>Preset IDs:</span>
                <button
                  onClick={() => {
                    setYtInput('tI-5uv4wryI');
                    onUpdateConfig({ ...config, youtubeId: 'tI-5uv4wryI' });
                  }}
                  className="px-2 py-0.5 bg-zinc-900 hover:bg-zinc-800 rounded border border-zinc-800 cursor-pointer"
                >
                  Champagne Supernova
                </button>
                <button
                  onClick={() => {
                    setYtInput('bx1Bh8ZvH84');
                    onUpdateConfig({ ...config, youtubeId: 'bx1Bh8ZvH84' });
                  }}
                  className="px-2 py-0.5 bg-zinc-900 hover:bg-zinc-800 rounded border border-zinc-800 cursor-pointer"
                >
                  Live '25 Announcement
                </button>
              </div>
            </div>

            {/* Ready-to-copy HTML Container Option A */}
            <div className="relative w-full rounded-xl overflow-hidden border-4 border-zinc-900 shadow-2xl">
              <div className="relative pb-[56.25%] h-0 overflow-hidden bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${config.youtubeId || 'tI-5uv4wryI'}?autoplay=1&mute=1&loop=1&playlist=${config.youtubeId || 'tI-5uv4wryI'}&controls=0&modestbranding=1&rel=0`}
                  title={config.videoTitle}
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Stadium Scanline & LED Mesh Screen Overlay */}
              <div className="absolute inset-0 pointer-events-none led-pixel-mesh opacity-20" />
              <div className="absolute inset-0 pointer-events-none crt-scanlines opacity-25" />
            </div>
          </div>
        ) : (
          /* OPTION B: Layered Image / Typography Method */
          <div className="space-y-4">
            {/* Quick Controls Strip for Option B */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-zinc-400 font-mono text-[11px]">Color Grade:</span>
                {(Object.keys(colorGrades) as Array<keyof typeof colorGrades>).map((key) => (
                  <button
                    key={key}
                    onClick={() => onUpdateConfig({ ...config, cosmicColorGrade: key })}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer border ${
                      config.cosmicColorGrade === key
                        ? 'bg-zinc-800 text-white border-white'
                        : 'bg-black text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    {colorGrades[key].label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setIsClipModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1 bg-white text-black font-semibold rounded hover:bg-zinc-200 cursor-pointer text-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Swap Backdrop</span>
                </button>
                <button
                  onClick={() => {
                    const currentIdx = sampleCosmicBgs.indexOf(config.bgImageUrl);
                    const nextUrl = sampleCosmicBgs[(currentIdx + 1) % sampleCosmicBgs.length];
                    onUpdateConfig({ ...config, bgImageUrl: nextUrl });
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded border border-zinc-700 cursor-pointer text-[11px]"
                  title="Cycle cosmic nebula background"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Cycle Nebula</span>
                </button>
                <button
                  onClick={() => setEditingQuotes(!editingQuotes)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded font-bold cursor-pointer text-xs transition-colors ${
                    editingQuotes
                      ? 'bg-amber-400 text-black'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{editingQuotes ? 'Hide Text Editor' : 'Edit All Texts'}</span>
                </button>
              </div>
            </div>

            {/* FULL EDITABLE TEXTS PANEL (Satisfies user request: "edit all the text on the supernova page") */}
            {editingQuotes && (
              <div className="p-5 bg-zinc-900 border border-zinc-700 rounded-xl space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                  <span className="font-display uppercase text-white text-xs tracking-wider">
                    Supernova Kinetic Text Suite
                  </span>
                  <button
                    onClick={handleSaveAllLyrics}
                    className="flex items-center gap-1.5 px-3.5 py-1 bg-white text-black font-bold rounded hover:bg-zinc-200 cursor-pointer text-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Apply Changes</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      1. Top Track Kicker Badge:
                    </label>
                    <input
                      type="text"
                      value={trackKicker}
                      onChange={(e) => setTrackKicker(e.target.value)}
                      className="w-full bg-black border border-zinc-700 px-3 py-1.5 text-white font-display text-xs uppercase rounded focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      2. Letter Spacing:
                    </label>
                    <select
                      value={letterSpacing}
                      onChange={(e) => setLetterSpacing(e.target.value)}
                      className="w-full bg-black border border-zinc-700 px-3 py-1.5 text-white font-mono text-xs rounded focus:border-white focus:outline-none"
                    >
                      <option value="-0.05em">Ultra Tight (-0.05em)</option>
                      <option value="-0.04em">Tight (-0.04em · Default)</option>
                      <option value="0em">Normal (0em)</option>
                      <option value="0.05em">Wide (+0.05em)</option>
                      <option value="0.1em">Super Wide (+0.1em)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      3. Primary Main Lyric Headline:
                    </label>
                    <textarea
                      rows={2}
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      className="w-full bg-black border border-zinc-700 px-3 py-2 text-white font-display text-sm uppercase rounded focus:border-white focus:outline-none leading-snug"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      4. Secondary Sub-Lyric Quote Banner:
                    </label>
                    <input
                      type="text"
                      value={subquote}
                      onChange={(e) => setSubquote(e.target.value)}
                      className="w-full bg-black border border-zinc-700 px-3 py-1.5 text-white font-condensed text-base uppercase rounded focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      5. Bottom Left Credit / Subtitle:
                    </label>
                    <input
                      type="text"
                      value={bottomLeft}
                      onChange={(e) => setBottomLeft(e.target.value)}
                      className="w-full bg-black border border-zinc-700 px-3 py-1.5 text-zinc-300 font-mono text-xs rounded focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      6. Bottom Right Audio / Transit Tag:
                    </label>
                    <input
                      type="text"
                      value={bottomRight}
                      onChange={(e) => setBottomRight(e.target.value)}
                      className="w-full bg-black border border-zinc-700 px-3 py-1.5 text-zinc-300 font-mono text-xs rounded focus:border-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* FULL-WIDTH STAGE CONTAINER (OPTION B) */}
            <div className="relative w-full min-h-[480px] md:min-h-[560px] bg-black rounded-xl overflow-hidden flex items-center justify-center p-6 md:p-14 border border-zinc-900 shadow-2xl">
              {/* Layer 1: Background Nebula Image with continuous upward cosmic drift */}
              {config.mediaType === 'video' ? (
                <video
                  src={config.bgImageUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    filter: 'contrast(160%) saturate(140%) brightness(55%)',
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-700 animate-cosmic-drift"
                  style={{
                    backgroundImage: `url('${config.bgImageUrl}')`,
                    filter: 'contrast(160%) saturate(140%) brightness(55%)',
                    height: '200%',
                  }}
                />
              )}

              {/* Layer 2: Psychedelic radial gradient wash */}
              <div
                className="absolute inset-0 transition-all duration-500 pointer-events-none mix-blend-screen"
                style={{
                  background: colorGrades[config.cosmicColorGrade].gradient,
                }}
              />

              {/* Layer 3: Stadium LED sub-pixel mesh */}
              <div className="absolute inset-0 pointer-events-none led-pixel-mesh opacity-30" />

              {/* Layer 4: CRT Scanlines */}
              <div className="absolute inset-0 pointer-events-none crt-scanlines opacity-25" />

              {/* Foreground Kinetic Typography Layer */}
              <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6 px-4">
                {/* 1. Track Kicker Badge (Click to edit) */}
                <div
                  onClick={() => setEditingQuotes(true)}
                  className="inline-block bg-white text-black px-4 py-1 font-display text-xs md:text-sm tracking-widest uppercase shadow-lg cursor-pointer hover:bg-zinc-200 transition-colors"
                  title="Click to edit kicker badge"
                >
                  {config.trackKicker || 'CHAMPAGNE SUPERNOVA · LIVE ’25'}
                </div>

                {/* 2. Primary Lyric Headline (Click to edit) */}
                <h2
                  onClick={() => setEditingQuotes(true)}
                  className="font-display text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl uppercase leading-[1.05] tracking-tight drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] cursor-pointer hover:opacity-90 transition-opacity"
                  style={{
                    letterSpacing: config.letterSpacing || '-0.04em',
                    textShadow: '0 0 40px rgba(255,255,255,0.4), 0 10px 40px rgba(0,0,0,0.95)',
                  }}
                  title="Click to edit primary lyric headline"
                >
                  {config.headlineQuote}
                </h2>

                {/* 3. Sub-quote Banner (Click to edit) */}
                <p
                  onClick={() => setEditingQuotes(true)}
                  className="font-condensed text-zinc-200 text-xl sm:text-2xl md:text-4xl tracking-widest uppercase py-2 px-6 border-y-2 border-white/40 drop-shadow-md cursor-pointer hover:text-white transition-colors"
                  title="Click to edit sub-quote banner"
                >
                  {config.subQuote}
                </p>

                {/* 4. Ambient Bottom Credits (Click to edit) */}
                <div
                  onClick={() => setEditingQuotes(true)}
                  className="flex items-center gap-3 text-zinc-400 font-mono text-[11px] uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  title="Click to edit bottom credits"
                >
                  <span>{config.bottomCreditLeft || 'Noel Gallagher Guitar Solo'}</span>
                  <span>·</span>
                  <span>{config.bottomCreditRight || 'Cosmic Transit 96KHz'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for uploading/changing cosmic backdrop */}
      {isClipModalOpen && (
        <ClipUploadModal
          isOpen={true}
          onClose={() => setIsClipModalOpen(false)}
          targetTitle="Champagne Supernova Cosmic Backdrop"
          initialUrl={config.bgImageUrl}
          initialType={config.mediaType || 'image'}
          onApplyClip={handleApplyCustomCosmicBg}
        />
      )}
    </section>
  );
};
