import React, { useState } from 'react';
import { Chapter1Screen, Chapter2Config, Chapter3Config } from '../types';
import {
  generateChapter1Html,
  generateChapter2OptionAHtml,
  generateChapter2OptionBHtml,
  generateChapter3Html,
  generateFullProductionHtml,
} from '../utils/templateGenerator';
import { X, Copy, Check, Download, FileCode, Sparkles } from 'lucide-react';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  screens: Chapter1Screen[];
  ch2Config: Chapter2Config;
  ch3Config: Chapter3Config;
  defaultTab?: string;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({
  isOpen,
  onClose,
  screens,
  ch2Config,
  ch3Config,
  defaultTab = 'full',
}) => {
  const [activeTab, setActiveTab] = useState<'full' | 'c1' | 'c2a' | 'c2b' | 'c3'>(
    (defaultTab as any) || 'full'
  );
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  let currentCode = '';
  let chapterTitle = '';
  let swapGuide = '';

  switch (activeTab) {
    case 'c1':
      currentCode = generateChapter1Html(screens);
      chapterTitle = 'Chapter 1: The Opening Frames ("Hello" & The Multi-Screen Look)';
      swapGuide = `1. VIDEO / GIF FEEDS: In each grid item, locate <img src="YOUR_GIF_OR_LOOP_URL_HERE"> and paste your own CDN or local media URL. For video, replace <img> with <video autoPlay loop muted src="..."></video>.
2. WHITE DIGITAL BOXES: Frame is styled with border: 12px solid #FFFFFF and box-shadow: 0 0 10px rgba(0,0,0,0.5).
3. BADGE TEXT OVERLAYS: Find the absolute-positioned text box at the bottom-left and replace "HELLO" with your custom city or tour name.
4. RESPONSIVE GRID: Change minmax(280px, 1fr) to adjust minimum column width for different stadium display pixel ratios.`;
      break;

    case 'c2a':
      currentCode = generateChapter2OptionAHtml(ch2Config);
      chapterTitle = 'Chapter 2: "Champagne Supernova" — Option A (Responsive Video)';
      swapGuide = `1. YOUTUBE ID PLACEHOLDER: Replace both instances of '${ch2Config.youtubeId || 'YOUR_VIDEO_ID'}' in the iframe URL with your YouTube video ID.
2. CONTINUOUS AUTOPLAY & LOOP: The parameters "autoplay=1&mute=1&loop=1&playlist=ID" ensure silent auto-looping without user interaction blockers.
3. 16:9 INTRINSIC CONTAINER: The parent padding-bottom: 56.25% guarantees responsive scaling across 4K stadium displays down to mobile phones without letterbox bars.`;
      break;

    case 'c2b':
      currentCode = generateChapter2OptionBHtml(ch2Config);
      chapterTitle = 'Chapter 2: "Champagne Supernova" — Option B (Layered Image & Typography)';
      swapGuide = `1. BACKGROUND NEBULA IMAGE: In the first absolute container, swap the background-image URL with your cosmic or tour backdrop.
2. KINETIC LYRIC HEADLINE: Change the <h2> text ("SOME DAY YOU WILL FIND ME...") to feature your preferred Oasis chorus or quote.
3. SUB-QUOTE & CHORUS: Change the <p> text inside the bordered banner.
4. TYPOGRAPHY SCALING: Headline uses font-size: clamp(2rem, 5.5vw, 4.5rem) for seamless stadium LED and mobile viewport responsiveness.`;
      break;

    case 'c3':
      currentCode = generateChapter3Html(ch3Config);
      chapterTitle = 'Chapter 3: "Stand By Me" (Scrapbook / Collage Aesthetic)';
      swapGuide = `1. 3-COLUMN STADIUM RATIO: The flex container splits display into 25% (Left IMAG feed), 50% (Center Scrapbook Canvas), and 25% (Right IMAG feed).
2. LIVE CAMERA FEEDS: Swap Left & Right <img src="..."> URLs with live performance feeds or NDI / WebRTC streams.
3. NEWSPAPER CLIPPINGS: In the center column, adjust top: % and left: % to position articles, change transform: rotate(..deg) to adjust the authentic newspaper tilt, and edit the publication titles and headlines.
4. POLAROID PHOTOS: Swap the polaroid <img src="..."> with vintage photos, and edit handwritten captions at the bottom.`;
      break;

    case 'full':
    default:
      currentCode = generateFullProductionHtml(screens, ch2Config, ch3Config);
      chapterTitle = 'Complete Oasis Live ’25 Stage Visual Production Template';
      swapGuide = `This standalone HTML document includes all three tour chapters ready for immediate browser playback or Disguise / OBS stage server rendering.
- Embedded Google Fonts (Archivo Black, Bebas Neue, Newsreader, Special Elite)
- Zero external build tools required
- Fully responsive across 4K/8K LED video walls and mobile spectator viewports`;
      break;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download =
      activeTab === 'full'
        ? 'oasis-live25-stage-template.html'
        : `oasis-live25-${activeTab}-component.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-black">
          <div className="flex items-center gap-2.5">
            <FileCode className="w-5 h-5 text-white" />
            <div>
              <h3 className="font-display text-sm md:text-base uppercase tracking-wider text-white">
                Stage Template Code & Export Center
              </h3>
              <p className="text-zinc-400 text-xs">
                Clean, modular, fully commented HTML/CSS ready to copy or deploy.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 px-6 pt-3 pb-2 border-b border-zinc-800 bg-zinc-900/60 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('full')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'full'
                ? 'bg-white text-black shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Full Production HTML
          </button>
          <button
            onClick={() => setActiveTab('c1')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'c1'
                ? 'bg-white text-black shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Chapter 1 (Hello Multi-Screen)
          </button>
          <button
            onClick={() => setActiveTab('c2a')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'c2a'
                ? 'bg-white text-black shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Chapter 2 (Option A Video)
          </button>
          <button
            onClick={() => setActiveTab('c2b')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'c2b'
                ? 'bg-white text-black shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Chapter 2 (Option B Typography)
          </button>
          <button
            onClick={() => setActiveTab('c3')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'c3'
                ? 'bg-white text-black shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Chapter 3 (Scrapbook 25/50/25)
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* Swap Guide Box */}
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg text-xs space-y-2">
            <div className="flex items-center gap-2 font-display text-white text-[13px] uppercase">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Asset Swap & Customization Instructions:</span>
            </div>
            <pre className="font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed text-[11px] bg-black/50 p-3 rounded border border-zinc-800">
              {swapGuide}
            </pre>
          </div>

          {/* Code Viewer */}
          <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-black">
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-xs">
              <span className="font-mono text-zinc-400">{chapterTitle}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-3 py-1 bg-white text-black font-semibold rounded hover:bg-zinc-200 cursor-pointer transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1 px-3 py-1 bg-zinc-800 text-white font-semibold rounded hover:bg-zinc-700 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .html</span>
                </button>
              </div>
            </div>

            <pre className="p-4 text-xs font-mono text-zinc-200 overflow-x-auto max-h-[380px] leading-relaxed selection:bg-white selection:text-black">
              <code>{currentCode}</code>
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-black flex items-center justify-between text-xs text-zinc-500">
          <div>Oasis Live '25 Stadium Visual Framework · Modern CSS Grid & Flexbox</div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded font-medium cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
