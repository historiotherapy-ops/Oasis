export interface Chapter1Screen {
  id: string;
  badgeText: string;
  videoUrl: string;
  mediaType: 'video' | 'image';
  altText: string;
  grayscale: number; // percentage
  contrast: number; // percentage
  brightness?: number; // percentage
  isMuted?: boolean;
}

export interface Chapter2Config {
  activeOption: 'optionA' | 'optionB';
  // Option A (Responsive Video)
  youtubeId: string;
  customVideoUrl?: string; // Optional direct mp4/webm loop
  videoTitle: string;
  autoPlay: boolean;
  loop: boolean;
  // Option B (Layered Typography & Image)
  trackKicker: string; // e.g. "CHAMPAGNE SUPERNOVA · LIVE ’25"
  headlineQuote: string; // e.g. "SOME DAY YOU WILL FIND ME CAUGHT BENEATH THE LANDSLIDE"
  subQuote: string; // e.g. "IN A CHAMPAGNE SUPERNOVA IN THE SKY"
  bottomCreditLeft: string; // e.g. "Noel Gallagher Guitar Solo"
  bottomCreditRight: string; // e.g. "Cosmic Transit 96KHz"
  bgImageUrl: string;
  bgVideoUrl?: string; // Optional background video loop
  mediaType?: 'video' | 'image';
  cosmicColorGrade: 'cosmic-purple' | 'supersonic-blue' | 'oasis-emerald' | 'amber-nebula';
  typographyWeight: 'heavy' | 'condensed' | 'italic';
  letterSpacing: string;
}

export interface ScrapbookItem {
  id: string;
  type: 'newspaper' | 'polaroid' | 'tape' | 'sticker' | 'ticket';
  title: string;
  subtitle?: string;
  bodyText?: string;
  source?: string;
  date?: string;
  imageUrl?: string;
  videoUrl?: string; // Support motion polaroids
  isFullImageOnly?: boolean; // When true, renders raw uploaded newspaper photo with NO text overlay
  topPercent: number;
  leftPercent: number;
  rotationDeg: number;
  widthPx: number;
  zIndex: number;
}

export interface Chapter3Config {
  leftFeed: {
    label: string;
    videoUrl: string;
    mediaType: 'video' | 'image';
    filter: string;
    tallyActive: boolean;
  };
  rightFeed: {
    label: string;
    videoUrl: string;
    mediaType: 'video' | 'image';
    filter: string;
    tallyActive: boolean;
  };
  paperTextureUrl: string;
  items: ScrapbookItem[];
}

export interface ClipPreset {
  id: string;
  name: string;
  category: 'crowd' | 'stage-lighting' | 'instruments' | 'psychedelic' | 'silhouette' | 'newspaper';
  url: string;
  type: 'video' | 'image';
  thumbnail: string;
  description: string;
}

export type StageRigPreset = 'wembley' | 'heaton-park' | 'croke-park' | 'mobile';

export interface StageSettings {
  rigPreset: StageRigPreset;
  ledMeshEnabled: boolean;
  crtScanlinesEnabled: boolean;
  stadiumCrowdSilhouettes: boolean;
  stadiumBloom: boolean;
  globalVideoPlaying: boolean;
  globalAudioMuted: boolean;
}
