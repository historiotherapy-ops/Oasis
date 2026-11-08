import React, { useState, useRef } from 'react';
import { ClipPreset } from '../types';
import { CLIP_PRESETS } from '../data/defaultTemplates';
import { X, Upload, Link, Play, Pause, Volume2, VolumeX, Check, Film, Image as ImageIcon, Sparkles } from 'lucide-react';

interface ClipUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetTitle: string;
  initialUrl?: string;
  initialType?: 'video' | 'image';
  initialBadge?: string;
  onApplyClip: (clipData: {
    url: string;
    type: 'video' | 'image';
    badge?: string;
    grayscale?: number;
    contrast?: number;
  }) => void;
}

export const ClipUploadModal: React.FC<ClipUploadModalProps> = ({
  isOpen,
  onClose,
  targetTitle,
  initialUrl = '',
  initialType = 'video',
  initialBadge = 'HELLO',
  onApplyClip,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'library'>('library');
  const [clipUrl, setClipUrl] = useState(initialUrl || CLIP_PRESETS[0].url);
  const [mediaType, setMediaType] = useState<'video' | 'image'>(initialType);
  const [badgeText, setBadgeText] = useState(initialBadge);
  const [grayscale, setGrayscale] = useState(100);
  const [contrast, setContrast] = useState(155);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const [uploadFileName, setUploadFileName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (file: File) => {
    const isVid = file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|mov|mkv)$/i);
    const objectUrl = URL.createObjectURL(file);
    setClipUrl(objectUrl);
    setMediaType(isVid ? 'video' : 'image');
    setUploadFileName(file.name);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSelectPreset = (preset: ClipPreset) => {
    setClipUrl(preset.url);
    setMediaType(preset.type);
    setUploadFileName(null);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleApply = () => {
    onApplyClip({
      url: clipUrl,
      type: mediaType,
      badge: badgeText,
      grayscale,
      contrast,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-black">
          <div className="flex items-center gap-2.5">
            <Film className="w-5 h-5 text-white" />
            <div>
              <h3 className="font-display text-sm md:text-base uppercase tracking-wider text-white">
                Clip Manager & Video Preview
              </h3>
              <p className="text-zinc-400 text-xs">
                {targetTitle}: Upload your own media, paste URLs, or pick authentic tour loops.
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
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-zinc-800 bg-zinc-900/60 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('library')}
            className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
              activeTab === 'library'
                ? 'bg-white text-black shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Tour Clip Library
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
              activeTab === 'upload'
                ? 'bg-white text-black shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Upload My Own Clip
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
              activeTab === 'url'
                ? 'bg-white text-black shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Paste Media URL
          </button>
        </div>

        {/* Content Body: Split view (Left: Source selector, Right: Stage Live Preview) */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* LEFT COLUMN: Input Mode */}
          <div className="space-y-4">
            
            {activeTab === 'library' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span>PRELOADED TOUR LOOPS</span>
                  <span>CLICK TO PREVIEW</span>
                </div>
                <div className="grid grid-cols-1 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
                  {CLIP_PRESETS.map((preset) => {
                    const isSelected = clipUrl === preset.url;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => handleSelectPreset(preset)}
                        className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-zinc-800 border-white ring-1 ring-white'
                            : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                        }`}
                      >
                        <div className="relative w-16 h-12 bg-black rounded overflow-hidden shrink-0 border border-zinc-700">
                          <img
                            src={preset.thumbnail}
                            alt={preset.name}
                            className="w-full h-full object-cover grayscale"
                          />
                          <span className="absolute bottom-0.5 right-0.5 bg-black/80 text-[8px] font-mono px-1 rounded text-white uppercase">
                            {preset.type}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-display text-xs text-white uppercase tracking-tight truncate">
                            {preset.name}
                          </div>
                          <div className="text-zinc-400 text-[11px] truncate">
                            {preset.description}
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-white shrink-0 mr-1" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'upload' && (
              <div className="space-y-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="video/*,image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                    dragOver
                      ? 'border-white bg-zinc-900'
                      : 'border-zinc-700 bg-zinc-900/50 hover:border-zinc-500 hover:bg-zinc-900'
                  }`}
                >
                  <Upload className="w-8 h-8 text-zinc-400 mx-auto mb-3" />
                  <div className="font-display text-sm uppercase text-white tracking-wider">
                    Click to browse or drop file here
                  </div>
                  <p className="text-zinc-400 text-xs mt-1">
                    Supports MP4, WebM, MOV, GIF, PNG, JPG (Local preview without upload limits)
                  </p>
                  {uploadFileName && (
                    <div className="mt-4 inline-flex items-center gap-2 bg-white text-black px-3 py-1 rounded text-xs font-mono font-bold">
                      <Check className="w-3.5 h-3.5" />
                      <span>Loaded: {uploadFileName}</span>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-400 leading-relaxed">
                  💡 <strong>Stage Tip:</strong> For authentic Oasis ’25 aesthetics, 1080p high-contrast concert footage, audience flare shots, and silhouette loops look best inside the white digital frames.
                </div>
              </div>
            )}

            {activeTab === 'url' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">
                    Direct Video / GIF / Image URL:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={clipUrl}
                      onChange={(e) => {
                        const val = e.target.value;
                        setClipUrl(val);
                        if (val.match(/\.(mp4|webm|mov)(\?.*)?$/i)) {
                          setMediaType('video');
                        }
                      }}
                      placeholder="https://example.com/tour-clip.mp4"
                      className="flex-1 bg-black border border-zinc-700 px-3 py-2 text-white font-mono text-xs rounded focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Media Type:</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setMediaType('video')}
                      className={`py-1.5 rounded font-semibold cursor-pointer border ${
                        mediaType === 'video'
                          ? 'bg-white text-black border-white'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                      }`}
                    >
                      HTML5 Video Loop
                    </button>
                    <button
                      type="button"
                      onClick={() => setMediaType('image')}
                      className={`py-1.5 rounded font-semibold cursor-pointer border ${
                        mediaType === 'image'
                          ? 'bg-white text-black border-white'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                      }`}
                    >
                      Image / GIF Loop
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Customizer Attributes */}
            <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-lg space-y-3 text-xs">
              <div>
                <label className="block text-zinc-400 font-mono text-[11px] mb-1">
                  Overlay Text Badge:
                </label>
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  className="w-full bg-black border border-zinc-700 px-2.5 py-1 text-white font-display text-xs uppercase rounded focus:border-white focus:outline-none"
                  placeholder="HELLO"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400 mb-1">
                    <span>Grayscale:</span>
                    <span>{grayscale}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={grayscale}
                    onChange={(e) => setGrayscale(parseInt(e.target.value))}
                    className="w-full accent-white cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400 mb-1">
                    <span>Contrast:</span>
                    <span>{contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="220"
                    value={contrast}
                    onChange={(e) => setContrast(parseInt(e.target.value))}
                    className="w-full accent-white cursor-pointer"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Stage Frame Video Live Preview */}
          <div className="space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-2">
                <span>STAGE FRAME SIMULATION</span>
                <span className="text-white font-bold">12PX WHITE BORDER</span>
              </div>

              {/* Exact Oasis Stage Screen Simulation Frame */}
              <div
                className="relative w-full aspect-video bg-black overflow-hidden shadow-2xl rounded-xs flex items-center justify-center group"
                style={{
                  border: '12px solid #FFFFFF',
                  boxShadow: '0 0 20px rgba(0,0,0,0.8)',
                }}
              >
                {mediaType === 'video' ? (
                  <video
                    ref={videoRef}
                    key={clipUrl}
                    src={clipUrl}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover block"
                    style={{
                      filter: `grayscale(${grayscale}%) contrast(${contrast}%)`,
                    }}
                  />
                ) : (
                  <img
                    src={clipUrl}
                    alt={badgeText}
                    className="w-full h-full object-cover block"
                    style={{
                      filter: `grayscale(${grayscale}%) contrast(${contrast}%)`,
                    }}
                  />
                )}

                {/* Sub-pixel mesh overlay */}
                <div className="absolute inset-0 pointer-events-none led-pixel-mesh opacity-30" />

                {/* Badge Overlay */}
                <div className="absolute bottom-2 left-2 bg-white text-black px-2.5 py-0.5 font-display text-xs uppercase tracking-wider shadow-md">
                  {badgeText || 'HELLO'}
                </div>

                {/* Media Playback Controls Overlay on Hover (for video) */}
                {mediaType === 'video' && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 bg-black/80 p-1 border border-zinc-700 rounded backdrop-blur-xs">
                    <button
                      onClick={togglePlay}
                      className="p-1 text-white hover:bg-zinc-800 rounded cursor-pointer"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-1 text-white hover:bg-zinc-800 rounded cursor-pointer"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded font-medium text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="flex items-center gap-1.5 px-5 py-2 bg-white text-black hover:bg-zinc-200 font-bold text-xs uppercase tracking-wider rounded cursor-pointer shadow-sm"
              >
                <Check className="w-4 h-4" />
                <span>Apply Clip to Stage</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
