import { Chapter1Screen, Chapter2Config, Chapter3Config } from '../types';

export interface VideoExportOptions {
  durationSeconds: number;
  fps: number;
  chapter: 'c1' | 'c2' | 'c3' | 'all';
  onProgress: (progress: number, secondsElapsed: number) => void;
}

/**
 * Record and export an animated stage visual video loop using HTML5 Canvas & MediaRecorder
 */
export async function exportStageVisualVideo(
  options: VideoExportOptions,
  ch2Config: Chapter2Config,
  screens: Chapter1Screen[],
  ch3Config: Chapter3Config
): Promise<Blob> {
  const { durationSeconds = 10, fps = 30, chapter = 'c2', onProgress } = options;
  const width = 1920;
  const height = 1080;

  // Create high-res offscreen rendering canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D rendering context not supported');
  }

  // Pre-load background image if available
  let bgImg: HTMLImageElement | null = null;
  if (ch2Config.bgImageUrl) {
    bgImg = new Image();
    bgImg.crossOrigin = 'anonymous';
    bgImg.src = ch2Config.bgImageUrl;
    await new Promise((res) => {
      bgImg!.onload = () => res(true);
      bgImg!.onerror = () => res(false); // Graceful fallback if CORS blocks
    });
  }

  // Set up MediaStream from canvas
  const stream = canvas.captureStream(fps);
  const mimeTypes = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
    'video/mp4',
  ];
  const supportedMime = mimeTypes.find((m) => MediaRecorder.isTypeSupported(m)) || '';

  const recorder = new MediaRecorder(stream, supportedMime ? { mimeType: supportedMime } : undefined);
  const recordedChunks: Blob[] = [];

  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  };

  return new Promise((resolve, reject) => {
    recorder.onstop = () => {
      const finalBlob = new Blob(recordedChunks, { type: supportedMime || 'video/webm' });
      resolve(finalBlob);
    };

    recorder.onerror = (err) => reject(err);

    // Start recording
    recorder.start(100);

    const totalFrames = durationSeconds * fps;
    let currentFrame = 0;
    const startTime = performance.now();

    // Particle array for cosmic upward travel
    const stars: { x: number; y: number; r: number; speed: number; opacity: number }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.5,
        speed: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }

    const renderLoop = () => {
      const elapsedSec = (currentFrame / fps);
      onProgress(Math.min(100, Math.round((currentFrame / totalFrames) * 100)), elapsedSec);

      // Clean canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      if (chapter === 'c2' || chapter === 'all') {
        // Render Chapter 2: Champagne Supernova Cosmic Journey
        const t = currentFrame * 0.05;

        // Draw background nebula image with gentle upward pan
        if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
          const panY = (currentFrame * 1.2) % height;
          ctx.globalAlpha = 0.65;
          ctx.drawImage(bgImg, 0, -panY, width, height * 1.5);
          ctx.drawImage(bgImg, 0, height * 1.5 - panY, width, height * 1.5);
          ctx.globalAlpha = 1.0;
        }

        // Psychedelic radial glow
        const radGrad = ctx.createRadialGradient(
          width / 2,
          height / 2,
          50,
          width / 2,
          height / 2,
          width * 0.6
        );
        radGrad.addColorStop(0, 'rgba(147, 51, 234, 0.45)');
        radGrad.addColorStop(0.5, 'rgba(30, 2, 60, 0.8)');
        radGrad.addColorStop(1, '#000000');
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, width, height);

        // Animated stars drifting upward
        for (const star of stars) {
          star.y -= star.speed * 2.5;
          if (star.y < 0) star.y = height;
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.fill();
        }

        // Stadium LED pixel mesh overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        for (let y = 0; y < height; y += 4) {
          ctx.fillRect(0, y, width, 1);
        }

        // Kinetic Oasis Typography
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Track Kicker
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(width / 2 - 220, height * 0.28 - 20, 440, 40);
        ctx.fillStyle = '#000000';
        ctx.font = '900 18px "Archivo Black", sans-serif';
        ctx.fillText(ch2Config.trackKicker || 'CHAMPAGNE SUPERNOVA · LIVE ’25', width / 2, height * 0.28);

        // Headline with subtle pulse & glow
        const glowPulse = Math.sin(t) * 10 + 25;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = glowPulse;
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '900 68px "Archivo Black", sans-serif';

        // Word wrap headline
        const words = (ch2Config.headlineQuote || 'SOME DAY YOU WILL FIND ME').split(' ');
        const line1 = words.slice(0, Math.ceil(words.length / 2)).join(' ');
        const line2 = words.slice(Math.ceil(words.length / 2)).join(' ');
        ctx.fillText(line1, width / 2, height * 0.44);
        ctx.fillText(line2, width / 2, height * 0.53);

        ctx.shadowBlur = 0; // reset

        // Sub-quote Banner
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(width / 2 - 400, height * 0.65);
        ctx.lineTo(width / 2 + 400, height * 0.65);
        ctx.moveTo(width / 2 - 400, height * 0.73);
        ctx.lineTo(width / 2 + 400, height * 0.73);
        ctx.stroke();

        ctx.fillStyle = '#E4E4E7';
        ctx.font = '36px "Bebas Neue", sans-serif';
        ctx.fillText(ch2Config.subQuote || 'IN A CHAMPAGNE SUPERNOVA IN THE SKY', width / 2, height * 0.69);

        // Bottom Credits
        ctx.font = '14px monospace';
        ctx.fillStyle = '#A1A1AA';
        ctx.fillText(
          `${ch2Config.bottomCreditLeft || 'Noel Gallagher'} · ${ch2Config.bottomCreditRight || 'Cosmic Transit 96KHz'}`,
          width / 2,
          height * 0.82
        );
      } else if (chapter === 'c1') {
        // Render Chapter 1 Multi-Screen Disguise Grid
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, width, height);

        const cols = 3;
        const rows = 2;
        const pad = 40;
        const cellW = (width - pad * 4) / cols;
        const cellH = (height - pad * 3) / rows;

        screens.slice(0, 6).forEach((sc, idx) => {
          const c = idx % cols;
          const r = Math.floor(idx / cols);
          const x = pad + c * (cellW + pad);
          const y = pad + r * (cellH + pad);

          // 12px white digital frame
          ctx.fillStyle = '#000000';
          ctx.fillRect(x, y, cellW, cellH);
          ctx.lineWidth = 14;
          ctx.strokeStyle = '#FFFFFF';
          ctx.strokeRect(x, y, cellW, cellH);

          // Simulated monochrome stage feed
          const grad = ctx.createLinearGradient(x, y, x + cellW, y + cellH);
          const phase = Math.sin(currentFrame * 0.1 + idx);
          grad.addColorStop(0, phase > 0 ? '#111111' : '#333333');
          grad.addColorStop(1, phase > 0 ? '#555555' : '#111111');
          ctx.fillStyle = grad;
          ctx.fillRect(x + 14, y + 14, cellW - 28, cellH - 28);

          // Badge
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(x + 20, y + cellH - 55, 180, 35);
          ctx.fillStyle = '#000000';
          ctx.font = '900 15px "Archivo Black", sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(sc.badgeText, x + 30, y + cellH - 32);
        });
      } else {
        // Chapter 3 Scrapbook stage layout
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);

        // Left IMAG (25%)
        ctx.fillStyle = '#111111';
        ctx.fillRect(20, 20, width * 0.25 - 30, height - 40);
        ctx.strokeStyle = '#333333';
        ctx.strokeRect(20, 20, width * 0.25 - 30, height - 40);

        // Center Scrapbook (50%)
        ctx.fillStyle = '#141312';
        ctx.fillRect(width * 0.25, 20, width * 0.5, height - 40);
        ctx.strokeStyle = '#222222';
        ctx.strokeRect(width * 0.25, 20, width * 0.5, height - 40);

        // Right IMAG (25%)
        ctx.fillStyle = '#111111';
        ctx.fillRect(width * 0.75 + 10, 20, width * 0.25 - 30, height - 40);
        ctx.strokeStyle = '#333333';
        ctx.strokeRect(width * 0.75 + 10, 20, width * 0.25 - 30, height - 40);

        // Watermark
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.font = '900 24px "Archivo Black", sans-serif';
        ctx.fillText('STAND BY ME // ARCHIVAL SCRAPBOOK', width / 2, 70);
      }

      currentFrame++;
      if (currentFrame < totalFrames) {
        requestAnimationFrame(renderLoop);
      } else {
        recorder.stop();
      }
    };

    renderLoop();
  });
}
