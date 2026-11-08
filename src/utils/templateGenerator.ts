import { Chapter1Screen, Chapter2Config, Chapter3Config } from '../types';

/**
 * Generate fully commented, ready-to-copy HTML/CSS for Chapter 1: The Opening Frames
 */
export function generateChapter1Html(screens: Chapter1Screen[], columns = 3): string {
  const screensHtml = screens
    .map((s, idx) => {
      const mediaElement =
        s.mediaType === 'video'
          ? `    <!-- USER EDIT: Change the 'src' URL below to your own video loop (MP4 / WebM) -->
    <video 
      src="${s.videoUrl}" 
      autoplay 
      loop 
      muted 
      playsinline 
      style="width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(${s.grayscale}%) contrast(${s.contrast}%);"
    ></video>`
          : `    <!-- USER EDIT: Change the 'src' URL below to your own video clip, GIF, or image loop -->
    <img 
      src="${s.videoUrl}" 
      alt="${s.altText || 'Oasis Stage Video Feed'}" 
      style="width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(${s.grayscale}%) contrast(${s.contrast}%);" 
    />`;

      return `  <!-- GRID ITEM ${idx + 1}: SWAP CORE ASSETS HERE -->
  <div style="border: 12px solid #FFFFFF; box-shadow: 0 0 10px rgba(0,0,0,0.5); overflow: hidden; background: #000000; position: relative; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center;">
${mediaElement}

    <!-- USER EDIT: Change or delete this overlay text box badge -->
    <div style="position: absolute; bottom: 12px; left: 12px; background: #FFFFFF; color: #000000; padding: 6px 14px; font-family: 'Archivo Black', 'Arial Black', sans-serif; font-size: 14px; font-weight: 900; letter-spacing: 0.05em; text-transform: uppercase; box-shadow: 0 2px 8px rgba(0,0,0,0.4);">
      ${s.badgeText}
    </div>
  </div>`;
    })
    .join('\n\n');

  return `<!-- ==========================================================================
   CHAPTER 1: THE OPENING FRAMES ("HELLO" & THE MULTI-SCREEN LOOK)
   Concept: Stadium Disguise video server canvas with sharp 12px white digital frames.
   Responsive CSS Grid: Auto-reflows smoothly across 4K LED screens down to mobile.
   ========================================================================== -->

<!-- START OF GRID CONTAINER -->
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; background: #000000; padding: 24px; box-sizing: border-box; width: 100%;">
${screensHtml}
</div>
<!-- END OF GRID CONTAINER -->`;
}

/**
 * Generate fully commented HTML/CSS for Chapter 2: Option A (Responsive Video YouTube embed)
 */
export function generateChapter2OptionAHtml(config: Chapter2Config): string {
  const ytId = config.youtubeId || 'YOUR_YOUTUBE_ID';
  return `<!-- ==========================================================================
   CHAPTER 2: "CHAMPAGNE SUPERNOVA" — OPTION A (THE RESPONSIVE VIDEO METHOD)
   Concept: Fluid, upward looping journey via responsive auto-playing muted iframe.
   Aspect Ratio: Modern intrinsic 16:9 responsive wrapper (padding-bottom: 56.25%).
   ========================================================================== -->

<!-- FULL-WIDTH STADIUM CONTAINER -->
<div style="position: relative; width: 100%; background: #000000; overflow: hidden; padding: 0; margin: 0;">
  
  <!-- RESPONSIVE 16:9 VIDEO WRAPPER -->
  <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: #000000;">
    <!-- USER EDIT: Replace both instances of '${ytId}' below with your own YouTube video ID.
         Parameters:
         - autoplay=1 & mute=1: Ensures instant autoplay across modern browsers without user gesture blocks.
         - loop=1 & playlist=${ytId}: Creates a continuous seamless stage loop.
         - controls=0: Hides YouTube UI chrome to mimic an LED concert screen feed. -->
    <iframe 
      src="https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&modestbranding=1&rel=0" 
      title="${config.videoTitle || 'Champagne Supernova Stage Loop'}"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  </div>

  <!-- OPTIONAL STADIUM SCANLINE OVERLAY -->
  <div style="position: absolute; inset: 0; pointer-events: none; background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%); background-size: 100% 4px;"></div>
</div>`;
}

/**
 * Generate fully commented HTML/CSS for Chapter 2: Option B (Layered Image & Typography Method)
 */
export function generateChapter2OptionBHtml(config: Chapter2Config): string {
  return `<!-- ==========================================================================
   CHAPTER 2: "CHAMPAGNE SUPERNOVA" — OPTION B (LAYERED IMAGE & TYPOGRAPHY)
   Concept: Hypnotic stacked textured banners, continuous cosmic drift, and 
            oversized Oasis tour typography quotes.
   ========================================================================== -->

<!-- FULL-WIDTH COSMIC STAGE CONTAINER -->
<div style="position: relative; width: 100%; min-height: 520px; background: #000000; overflow: hidden; display: flex; align-items: center; justify-content: center; padding: 60px 24px; box-sizing: border-box;">

  <!-- USER EDIT: Change background cosmic texture or nebula URL below -->
  <div style="position: absolute; inset: 0; background-image: url('${config.bgImageUrl}'); background-size: cover; background-position: center; filter: contrast(160%) saturate(140%) brightness(55%); transform: scale(1.05);"></div>

  <!-- PSYCHEDELIC GRADIENT WASH -->
  <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.45) 0%, rgba(20, 2, 45, 0.85) 65%, #000000 100%); mix-blend-mode: screen;"></div>

  <!-- LED MESH SUB-PIXEL GRID (Mimics stadium jumbotron diodes) -->
  <div style="position: absolute; inset: 0; background-image: linear-gradient(rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.4) 1px, transparent 1px); background-size: 3px 3px; pointer-events: none;"></div>

  <!-- STACKED TYPOGRAPHIC BANNER WRAPPER -->
  <div style="position: relative; z-index: 10; max-width: 1100px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; gap: 24px; align-items: center;">
    
    <!-- TRACK KICKER -->
    <div style="display: inline-block; background: #FFFFFF; color: #000000; padding: 4px 16px; font-family: 'Archivo Black', 'Arial Black', sans-serif; font-size: 13px; font-weight: 900; letter-spacing: 0.15em; text-transform: uppercase;">
      ${config.trackKicker || 'CHAMPAGNE SUPERNOVA · LIVE ’25'}
    </div>

    <!-- USER EDIT: Swap primary lyric line here -->
    <h2 style="margin: 0; color: #FFFFFF; font-family: 'Archivo Black', 'Impact', sans-serif; font-size: clamp(2rem, 5.5vw, 4.5rem); font-weight: 900; line-height: 1.05; letter-spacing: ${config.letterSpacing || '-0.04em'}; text-transform: uppercase; text-shadow: 0 0 30px rgba(255,255,255,0.4), 0 10px 40px rgba(0,0,0,0.9);">
      ${config.headlineQuote}
    </h2>

    <!-- USER EDIT: Swap secondary lyric line or chorus here -->
    <p style="margin: 0; color: rgba(255, 255, 255, 0.85); font-family: 'Bebas Neue', sans-serif; font-size: clamp(1.4rem, 3.2vw, 2.4rem); letter-spacing: 0.12em; text-transform: uppercase; border-top: 2px solid rgba(255,255,255,0.3); border-bottom: 2px solid rgba(255,255,255,0.3); padding: 8px 24px;">
      ${config.subQuote}
    </p>

    <!-- USER EDIT: Ambient Bottom Credits -->
    <div style="display: flex; gap: 12px; font-family: monospace; font-size: 11px; color: #A1A1AA; text-transform: uppercase; letter-spacing: 0.05em;">
      <span>${config.bottomCreditLeft || 'Noel Gallagher Guitar Solo'}</span>
      <span>·</span>
      <span>${config.bottomCreditRight || 'Cosmic Transit 96KHz'}</span>
    </div>

  </div>
</div>`;
}

/**
 * Generate fully commented HTML/CSS for Chapter 3: "Stand By Me" (Scrapbook / Collage Aesthetic)
 */
export function generateChapter3Html(config: Chapter3Config): string {
  const itemsHtml = config.items
    .map((item, idx) => {
      if (item.type === 'polaroid') {
        return `    <!-- COLLAGE ITEM ${idx + 1}: POLAROID PHOTO
         USER EDIT:
         - Change top and left percentages to reposition on canvas.
         - Change transform: rotate(${item.rotationDeg}deg) to angle the photo.
         - Replace 'src' URL with your archival image link.
         - Change caption text at the bottom. -->
    <div style="position: absolute; top: ${item.topPercent}%; left: ${item.leftPercent}%; width: ${item.widthPx}px; transform: rotate(${item.rotationDeg}deg); z-index: ${item.zIndex}; background: #FFFFFF; padding: 12px 12px 28px 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.6); transition: transform 0.2s ease;">
      <!-- Masking tape strip on top -->
      <div style="position: absolute; top: -10px; left: 35%; width: 55px; height: 18px; background: rgba(238, 230, 205, 0.85); transform: rotate(-3deg); box-shadow: 0 1px 3px rgba(0,0,0,0.2);"></div>
      <img src="${item.imageUrl || 'YOUR_POLAROID_IMAGE_URL'}" alt="${item.title}" style="width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; filter: grayscale(100%) contrast(135%); margin-bottom: 10px;" />
      <div style="font-family: 'Special Elite', 'Courier New', monospace; font-size: 12px; color: #111111; font-weight: bold; text-align: center; text-transform: uppercase;">
        ${item.title}
      </div>
      ${item.subtitle ? `<div style="font-family: sans-serif; font-size: 10px; color: #555555; text-align: center; margin-top: 2px;">${item.subtitle}</div>` : ''}
    </div>`;
      }

      if (item.type === 'ticket') {
        return `    <!-- COLLAGE ITEM ${idx + 1}: CONCERT TICKET STUB
         USER EDIT:
         - Change top (${item.topPercent}%) and left (${item.leftPercent}%) to reposition.
         - Change rotation (${item.rotationDeg}deg).
         - Modify ticket headlines and venue information. -->
    <div style="position: absolute; top: ${item.topPercent}%; left: ${item.leftPercent}%; width: ${item.widthPx}px; transform: rotate(${item.rotationDeg}deg); z-index: ${item.zIndex}; background: #1a1a1a; color: #FFFFFF; border: 2px dashed rgba(255,255,255,0.4); padding: 14px; box-shadow: 0 6px 18px rgba(0,0,0,0.7);">
      <div style="font-family: 'Archivo Black', sans-serif; font-size: 12px; letter-spacing: 0.1em; color: #FFFFFF; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 4px; text-transform: uppercase;">
        ${item.title}
      </div>
      <div style="font-family: sans-serif; font-size: 10px; color: #CCCCCC; margin-top: 6px; text-transform: uppercase;">
        ${item.subtitle || ''}
      </div>
      <div style="font-family: 'Special Elite', monospace; font-size: 9px; color: #888888; margin-top: 6px;">
        ${item.bodyText || ''}
      </div>
    </div>`;
      }

      // Full Picture Newspaper (with Zero Text Overlay)
      if (item.isFullImageOnly && item.imageUrl) {
        return `    <!-- COLLAGE ITEM ${idx + 1}: FULL PICTURE NEWSPAPER (NO TEXT OVERLAY)
         USER EDIT:
         - Change top (${item.topPercent}%) and left (${item.leftPercent}%) to reposition.
         - Change rotation: rotate(${item.rotationDeg}deg).
         - Replace 'src' with your scanned full picture newspaper clipping PNG/JPG. -->
    <div style="position: absolute; top: ${item.topPercent}%; left: ${item.leftPercent}%; width: ${item.widthPx}px; transform: rotate(${item.rotationDeg}deg); z-index: ${item.zIndex}; background: #FAF6EC; padding: 6px; border: 1px solid #D5C9A8; box-shadow: 0 10px 28px rgba(0,0,0,0.65);">
      <!-- Top masking tape strip -->
      <div style="position: absolute; top: -10px; left: 20px; width: 55px; height: 16px; background: rgba(238, 230, 205, 0.85); transform: rotate(-5deg); box-shadow: 0 1px 3px rgba(0,0,0,0.2);"></div>
      <img src="${item.imageUrl}" alt="${item.title}" style="width: 100%; height: auto; display: block; filter: contrast(125%) sepia(0.15);" />
    </div>`;
      }

      // Standard Newspaper clipping with typeset text
      return `    <!-- COLLAGE ITEM ${idx + 1}: NEWSPAPER CLIPPING (TYPESET)
         USER EDIT:
         - Change top (${item.topPercent}%) and left (${item.leftPercent}%) to reposition.
         - Change rotation: rotate(${item.rotationDeg}deg) for authentic aged pasteboard tilt.
         - Replace Newspaper Title, Headline, and Article body text below. -->
    <div style="position: absolute; top: ${item.topPercent}%; left: ${item.leftPercent}%; width: ${item.widthPx}px; transform: rotate(${item.rotationDeg}deg); z-index: ${item.zIndex}; background: #F4EEDF; color: #111111; padding: 16px; border: 1px solid #D8CCA8; box-shadow: 0 8px 24px rgba(0,0,0,0.55);">
      <!-- Masking tape strip on corner -->
      <div style="position: absolute; top: -8px; right: 15px; width: 60px; height: 16px; background: rgba(238, 230, 205, 0.85); transform: rotate(5deg); box-shadow: 0 1px 3px rgba(0,0,0,0.2);"></div>
      <div style="font-family: 'Newsreader', Georgia, serif; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-align: center; border-bottom: 2px solid #111111; padding-bottom: 4px; text-transform: uppercase;">
        ${item.title}
      </div>
      <div style="font-size: 9px; text-align: center; color: #555555; padding: 4px 0; border-bottom: 1px solid #CCCCCC; font-family: sans-serif;">
        ${item.date || 'AUGUST 1996'} · ${item.source || 'ARCHIVE'}
      </div>
      <div style="font-family: 'Newsreader', Georgia, serif; font-size: 14px; font-weight: 800; line-height: 1.15; margin: 8px 0; text-transform: uppercase;">
        ${item.subtitle || ''}
      </div>
      <div style="font-family: 'Newsreader', Georgia, serif; font-size: 11px; line-height: 1.35; color: #222222; text-align: justify;">
        ${item.bodyText || ''}
      </div>
    </div>`;
    })
    .join('\n\n');

  const leftElement =
    config.leftFeed.mediaType === 'video'
      ? `<video src="${config.leftFeed.videoUrl}" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; display: block; filter: ${config.leftFeed.filter};"></video>`
      : `<img src="${config.leftFeed.videoUrl}" alt="IMAG Stage Left Feed" style="width: 100%; height: 100%; object-fit: cover; display: block; filter: ${config.leftFeed.filter};" />`;

  const rightElement =
    config.rightFeed.mediaType === 'video'
      ? `<video src="${config.rightFeed.videoUrl}" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; display: block; filter: ${config.rightFeed.filter};"></video>`
      : `<img src="${config.rightFeed.videoUrl}" alt="IMAG Stage Right Feed" style="width: 100%; height: 100%; object-fit: cover; display: block; filter: ${config.rightFeed.filter};" />`;

  return `<!-- ==========================================================================
   CHAPTER 3: "STAND BY ME" (THE SCRAPBOOK / COLLAGE AESTHETIC)
   Layout: Stadium 3-Column Display (25% Left IMAG / 50% Center Collage / 25% Right IMAG)
   Center Column: Freeform layered newspaper clippings, polaroid photos, and tape.
   Left & Right Columns: Live stadium camera feeds with tally indicators.
   ========================================================================== -->

<!-- STADIUM SCRAPBOOK CONTAINER -->
<div style="display: flex; flex-wrap: wrap; width: 100%; min-height: 560px; background: #000000; box-sizing: border-box; border-top: 4px solid #FFFFFF;">

  <!-- LEFT COLUMN (25% STADIUM IMAG FEED: LIAM) -->
  <div style="flex: 1 1 25%; min-width: 260px; position: relative; background: #0A0A0A; border-right: 2px solid #222222; overflow: hidden; min-height: 380px;">
    <!-- USER EDIT: Change Left Video/Camera Feed URL below -->
    ${leftElement}
    <!-- IMAG FEED HUD OVERLAY -->
    <div style="position: absolute; top: 12px; left: 12px; display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.75); padding: 4px 10px; border: 1px solid rgba(255,255,255,0.2);">
      <div style="width: 8px; height: 8px; background: #EF4444; border-radius: 50%;"></div>
      <span style="font-family: monospace; font-size: 11px; color: #FFFFFF; font-weight: bold; letter-spacing: 0.05em;">
        ${config.leftFeed.label}
      </span>
    </div>
  </div>

  <!-- CENTER COLUMN (50% SCRAPBOOK & COLLAGE CANVAS) -->
  <div style="flex: 2 1 50%; min-width: 320px; position: relative; background: #121212; min-height: 560px; overflow: hidden;">
    <!-- USER EDIT: Paper texture background for scrapbook canvas -->
    <div style="position: absolute; inset: 0; background-image: url('${config.paperTextureUrl}'); background-size: cover; opacity: 0.18; filter: contrast(140%);"></div>

    <!-- CANVAS HEADER WATERMARK -->
    <div style="position: absolute; top: 16px; left: 20px; font-family: 'Archivo Black', sans-serif; font-size: 16px; color: rgba(255,255,255,0.2); letter-spacing: 0.2em; text-transform: uppercase;">
      STAND BY ME // ARCHIVAL SCRAPBOOK
    </div>

    <!-- START OF COLLAGE ITEMS -->
${itemsHtml}
    <!-- END OF COLLAGE ITEMS -->
  </div>

  <!-- RIGHT COLUMN (25% STADIUM IMAG FEED: NOEL) -->
  <div style="flex: 1 1 25%; min-width: 260px; position: relative; background: #0A0A0A; border-left: 2px solid #222222; overflow: hidden; min-height: 380px;">
    <!-- USER EDIT: Change Right Video/Camera Feed URL below -->
    ${rightElement}
    <!-- IMAG FEED HUD OVERLAY -->
    <div style="position: absolute; top: 12px; right: 12px; display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.75); padding: 4px 10px; border: 1px solid rgba(255,255,255,0.2);">
      <div style="width: 8px; height: 8px; background: #EF4444; border-radius: 50%;"></div>
      <span style="font-family: monospace; font-size: 11px; color: #FFFFFF; font-weight: bold; letter-spacing: 0.05em;">
        ${config.rightFeed.label}
      </span>
    </div>
  </div>

</div>`;
}

/**
 * Generate full standalone HTML production template incorporating all 3 chapters
 */
export function generateFullProductionHtml(
  screens: Chapter1Screen[],
  ch2Config: Chapter2Config,
  ch3Config: Chapter3Config
): string {
  const ch1 = generateChapter1Html(screens);
  const ch2 = ch2Config.activeOption === 'optionA' 
    ? generateChapter2OptionAHtml(ch2Config) 
    : generateChapter2OptionBHtml(ch2Config);
  const ch3 = generateChapter3Html(ch3Config);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Oasis Live '25 - Stage Visuals Template</title>
  <!-- Google Fonts: Archivo Black, Bebas Neue, Newsreader, Special Elite -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Bebas+Neue&family=Newsreader:wght@400;700;800&family=Special+Elite&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #000000;
      color: #FFFFFF;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }
    .tour-header {
      background: #000000;
      border-bottom: 4px solid #FFFFFF;
      padding: 18px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tour-title {
      font-family: 'Archivo Black', sans-serif;
      font-size: 18px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #FFFFFF;
    }
    .tour-badge {
      background: #FFFFFF;
      color: #000000;
      padding: 4px 12px;
      font-family: 'Archivo Black', sans-serif;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.05em;
    }
    .chapter-divider {
      padding: 14px 24px;
      background: #0a0a0a;
      border-top: 1px solid #222222;
      border-bottom: 1px solid #222222;
      font-family: 'Archivo Black', sans-serif;
      font-size: 12px;
      letter-spacing: 0.15em;
      color: #888888;
      text-transform: uppercase;
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header class="tour-header">
    <div class="tour-title">OASIS LIVE ’25 // STAGE VISUAL RIG</div>
    <div class="tour-badge">DISGUISE CANVAS TEMPLATE</div>
  </header>

  <!-- CHAPTER 1 -->
  <div class="chapter-divider">CHAPTER 1: THE OPENING FRAMES ("HELLO" MULTI-SCREEN)</div>
${ch1}

  <!-- CHAPTER 2 -->
  <div class="chapter-divider">CHAPTER 2: "CHAMPAGNE SUPERNOVA" (COSMIC JOURNEY)</div>
${ch2}

  <!-- CHAPTER 3 -->
  <div class="chapter-divider">CHAPTER 3: "STAND BY ME" (SCRAPBOOK & IMAG FEEDS)</div>
${ch3}

</body>
</html>`;
}
