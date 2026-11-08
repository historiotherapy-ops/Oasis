import React, { useState, useRef } from 'react';
import { Chapter1Screen, Chapter2Config, Chapter3Config } from '../types';
import { exportStageVisualVideo } from '../utils/videoExporter';
import { X, Film, Download, Play, Check, AlertCircle, Loader2, Sparkles, Video } from 'lucide-react';

interface VideoExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  screens: Chapter1Screen[];
  ch2Config: Chapter2Config;
  ch3Config: Chapter3Config;
  activeChapterDefault?: 'c1' | 'c2' | 'c3' | 'all';
}

export const VideoExportModal: React.FC<VideoExportModalProps> = ({
  isOpen,
  onClose,
  screens,
  ch2Config,
  ch3Config,
  activeChapterDefault = 'c2',
}) => {
  const [selectedChapter, setSelectedChapter] = useState<'c1' | 'c2' | 'c3' | 'all'>(
    activeChapterDefault
  );
  const [durationSec, setDurationSec] = useState<number>(10);
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [exportedVideoUrl, setExportedVideoUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStartRender = async () => {
    setIsRendering(true);
    setRenderProgress(0);
    setErrorMsg(null);
    setExportedVideoUrl(null);

    try {
      const blob = await exportStageVisualVideo(
        {
          durationSeconds: durationSec,
          fps: 30,
          chapter: selectedChapter,
          onProgress: (progress, seconds) => {
            setRenderProgress(progress);
            setElapsedSec(Math.round(seconds * 10) / 10);
          },
        },
        ch2Config,
        screens,
        ch3Config
      );

      const url = URL.createObjectURL(blob);
      setExportedVideoUrl(url);
      setIsRendering(false);
    } catch (err: any) {
      console.error('Video export error:', err);
      setErrorMsg(err?.message || 'Could not encode video. Your browser may restrict canvas stream capture.');
      setIsRendering(false);
    }
  };

  const handleDownloadVideo = () => {
    if (!exportedVideoUrl) return;
    const a = document.createElement('a');
    a.href = exportedVideoUrl;
    a.download = `oasis-live25-${selectedChapter}-stage-loop.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-black">
          <div className="flex items-center gap-2.5">
            <Film className="w-5 h-5 text-white" />
            <div>
              <h3 className="font-display text-sm md:text-base uppercase tracking-wider text-white">
                Export Stage Visual as Video (.webm)
              </h3>
              <p className="text-zinc-400 text-xs">
                Render and export high-resolution 1080p stadium video loops for media servers or presentation.
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

        {/* Modal Content */}
        <div className="p-6 space-y-5 text-xs">
          
          {/* Chapter Selector */}
          <div>
            <label className="block text-zinc-400 font-mono mb-2">Select Visual Chapter to Export:</label>
            <div className="grid grid-cols-3 gap-2 font-semibold">
              <button
                type="button"
                onClick={() => setSelectedChapter('c2')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                  selectedChapter === 'c2'
                    ? 'bg-zinc-800 border-white text-white ring-1 ring-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <div className="font-display text-xs uppercase mb-1">Ch 2: Supernova</div>
                <div className="text-[10px] text-zinc-400 font-normal">Cosmic flow & kinetic lyrics</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedChapter('c1')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                  selectedChapter === 'c1'
                    ? 'bg-zinc-800 border-white text-white ring-1 ring-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <div className="font-display text-xs uppercase mb-1">Ch 1: Opening Frames</div>
                <div className="text-[10px] text-zinc-400 font-normal">Disguise 12px white boxes</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedChapter('c3')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                  selectedChapter === 'c3'
                    ? 'bg-zinc-800 border-white text-white ring-1 ring-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <div className="font-display text-xs uppercase mb-1">Ch 3: Stand By Me</div>
                <div className="text-[10px] text-zinc-400 font-normal">Scrapbook + IMAG cameras</div>
              </button>
            </div>
          </div>

          {/* Loop Duration Selector */}
          <div>
            <label className="block text-zinc-400 font-mono mb-2">Loop Duration:</label>
            <div className="flex gap-2">
              {[5, 10, 15].map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setDurationSec(sec)}
                  className={`px-4 py-2 rounded-md font-semibold cursor-pointer border ${
                    durationSec === sec
                      ? 'bg-white text-black border-white'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  {sec} Seconds Loop
                </button>
              ))}
            </div>
          </div>

          {/* Rendering Progress View */}
          {isRendering && (
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg space-y-2.5">
              <div className="flex items-center justify-between text-zinc-300 font-mono">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                  <span>Encoding 1080p Video Stream...</span>
                </div>
                <span>{renderProgress}%</span>
              </div>
              <div className="w-full bg-black rounded-full h-2 overflow-hidden border border-zinc-800">
                <div
                  className="bg-white h-full transition-all duration-150"
                  style={{ width: `${renderProgress}%` }}
                />
              </div>
              <div className="text-zinc-500 font-mono text-[10px] text-right">
                {elapsedSec}s / {durationSec}s frames captured
              </div>
            </div>
          )}

          {/* Export Result Preview */}
          {exportedVideoUrl && (
            <div className="p-4 bg-zinc-900 border border-zinc-700 rounded-lg space-y-3">
              <div className="flex items-center justify-between text-xs text-white font-mono font-bold">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Stage Video Rendered Successfully!</span>
                </div>
                <button
                  onClick={handleDownloadVideo}
                  className="flex items-center gap-1.5 px-3 py-1 bg-white text-black rounded font-bold hover:bg-zinc-200 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .webm</span>
                </button>
              </div>

              <div className="rounded overflow-hidden border border-zinc-800 bg-black aspect-video max-h-56 mx-auto">
                <video
                  src={exportedVideoUrl}
                  controls
                  autoPlay
                  loop
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-950/40 border border-red-500/40 rounded-lg text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg text-[11px] text-zinc-400 leading-relaxed">
            💡 <strong>Pro Tip:</strong> The rendered <code>.webm</code> video file carries the exact kinetic lyrics, upward starry drift, and stadium rasterization, ready to import directly into stage playback software (Resolume, Arena, QLab, OBS Studio, or Premier/After Effects).
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-zinc-800 bg-black flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded font-medium cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={handleStartRender}
            disabled={isRendering}
            className="flex items-center gap-2 px-5 py-2 bg-white text-black font-bold text-xs uppercase tracking-wider rounded hover:bg-zinc-200 cursor-pointer disabled:opacity-50 shadow-sm"
          >
            {isRendering ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Rendering...</span>
              </>
            ) : (
              <>
                <Video className="w-3.5 h-3.5" />
                <span>{exportedVideoUrl ? 'Re-Render Video' : 'Render & Export Video'}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
