import React from 'react';
import { StageSettings, StageRigPreset } from '../types';
import { Grid, Tv, Sparkles, HelpCircle, Eye, Monitor } from 'lucide-react';

interface StadiumControlsBarProps {
  settings: StageSettings;
  onUpdateSettings: (newSettings: Partial<StageSettings>) => void;
  showSwapAnnotations: boolean;
  onToggleSwapAnnotations: () => void;
  activeChapter: string;
}

export const StadiumControlsBar: React.FC<StadiumControlsBarProps> = ({
  settings,
  onUpdateSettings,
  showSwapAnnotations,
  onToggleSwapAnnotations,
  activeChapter,
}) => {
  return (
    <div className="bg-zinc-950 border-b border-zinc-800/80 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Rig Presets */}
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 font-mono uppercase tracking-wider text-[11px] hidden sm:inline">
            Stage Canvas:
          </span>
          <div className="inline-flex rounded-md p-0.5 bg-zinc-900 border border-zinc-800">
            {(
              [
                { id: 'wembley', label: 'Wembley 32:9' },
                { id: 'heaton-park', label: 'Heaton Park' },
                { id: 'croke-park', label: 'Croke Park 16:9' },
                { id: 'mobile', label: 'Mobile' },
              ] as { id: StageRigPreset; label: string }[]
            ).map((rig) => (
              <button
                key={rig.id}
                onClick={() => onUpdateSettings({ rigPreset: rig.id })}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                  settings.rigPreset === rig.id
                    ? 'bg-white text-black shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {rig.label}
              </button>
            ))}
          </div>
        </div>

        {/* Display Visual FX Toggles */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onUpdateSettings({ ledMeshEnabled: !settings.ledMeshEnabled })}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-medium transition-colors cursor-pointer ${
              settings.ledMeshEnabled
                ? 'bg-zinc-800 text-white border-zinc-600'
                : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
            }`}
            title="Toggle Stadium LED Wall Pixel Grid"
          >
            <Grid className="w-3 h-3" />
            <span>LED Mesh</span>
          </button>

          <button
            onClick={() => onUpdateSettings({ crtScanlinesEnabled: !settings.crtScanlinesEnabled })}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-medium transition-colors cursor-pointer ${
              settings.crtScanlinesEnabled
                ? 'bg-zinc-800 text-white border-zinc-600'
                : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
            }`}
            title="Toggle CRT Broadcast Scanlines"
          >
            <Tv className="w-3 h-3" />
            <span>Scanlines</span>
          </button>

          <button
            onClick={() => onUpdateSettings({ stadiumBloom: !settings.stadiumBloom })}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-medium transition-colors cursor-pointer ${
              settings.stadiumBloom
                ? 'bg-zinc-800 text-amber-200 border-amber-500/40'
                : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
            }`}
            title="Toggle Stadium Floodlight Bloom"
          >
            <Sparkles className="w-3 h-3" />
            <span>Stage Bloom</span>
          </button>

          {/* Swap Annotation Guides */}
          <button
            onClick={onToggleSwapAnnotations}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-semibold transition-colors cursor-pointer ${
              showSwapAnnotations
                ? 'bg-amber-400 text-black border-amber-300'
                : 'bg-zinc-900 text-amber-300 border-amber-500/30 hover:bg-zinc-800'
            }`}
            title="Show or hide template code swap markers"
          >
            <HelpCircle className="w-3 h-3" />
            <span>{showSwapAnnotations ? 'Hide Swap Guides' : 'Show Swap Guides'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
