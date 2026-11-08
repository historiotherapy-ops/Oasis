import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateChapter1Html,
  generateChapter2OptionAHtml,
  generateChapter2OptionBHtml,
  generateChapter3Html,
  generateFullProductionHtml,
} from './templateGenerator';
import {
  DEFAULT_CHAPTER_1_SCREENS,
  DEFAULT_CHAPTER_2_CONFIG,
  DEFAULT_CHAPTER_3_CONFIG,
} from '../data/defaultTemplates';

test('generateChapter1Html produces responsive grid with white digital frames and user swap comments', () => {
  const html = generateChapter1Html(DEFAULT_CHAPTER_1_SCREENS);

  assert.ok(html.includes('grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))'), 'Contains responsive grid CSS');
  assert.ok(html.includes('border: 12px solid #FFFFFF'), 'Contains iconic 12px white digital border');
  assert.ok(html.includes('HELLO'), 'Contains default opening frame badge');
  assert.ok(html.includes('<!-- USER EDIT: Change the \'src\' URL below'), 'Contains clear user edit instruction comment');
  assert.ok(html.includes('filter: grayscale(100%) contrast(155%);'), 'Applies authentic contrast and grayscale');
});

test('generateChapter2OptionAHtml produces 16:9 responsive auto-playing video embed', () => {
  const html = generateChapter2OptionAHtml(DEFAULT_CHAPTER_2_CONFIG);

  assert.ok(html.includes('padding-bottom: 56.25%'), 'Enforces 16:9 responsive video wrapper');
  assert.ok(html.includes('youtube.com/embed/tI-5uv4wryI'), 'Includes correct YouTube embed URL');
  assert.ok(html.includes('autoplay=1&mute=1&loop=1'), 'Enables muted continuous loop');
  assert.ok(html.includes('<!-- USER EDIT: Replace both instances'), 'Provides clear swap instructions for video ID');
});

test('generateChapter2OptionBHtml produces layered image and typography banners', () => {
  const html = generateChapter2OptionBHtml(DEFAULT_CHAPTER_2_CONFIG);

  assert.ok(html.includes('SOME DAY YOU WILL FIND ME'), 'Contains headline lyric quote');
  assert.ok(html.includes('IN A CHAMPAGNE SUPERNOVA IN THE SKY'), 'Contains sub quote');
  assert.ok(html.includes('background-image: url('), 'Contains customizable background image layer');
  assert.ok(html.includes('<!-- USER EDIT: Swap primary lyric line here -->'), 'Includes lyric swap comment');
});

test('generateChapter3Html produces 3-column stadium layout with IMAG feeds and scrapbook clippings', () => {
  const html = generateChapter3Html(DEFAULT_CHAPTER_3_CONFIG);

  assert.ok(html.includes('flex: 1 1 25%'), 'Includes 25% left and right IMAG camera columns');
  assert.ok(html.includes('flex: 2 1 50%'), 'Includes 50% center scrapbook collage canvas');
  assert.ok(html.includes('THE DAILY TELEGRAPH'), 'Includes newspaper clipping title');
  assert.ok(html.includes('MAINE ROAD ’96'), 'Includes polaroid item');
  assert.ok(html.includes('<!-- COLLAGE ITEM 1: NEWSPAPER CLIPPING'), 'Explains how to adjust positions/rotations');
});

test('generateFullProductionHtml packages all 3 chapters into a complete standalone HTML document', () => {
  const fullHtml = generateFullProductionHtml(
    DEFAULT_CHAPTER_1_SCREENS,
    DEFAULT_CHAPTER_2_CONFIG,
    DEFAULT_CHAPTER_3_CONFIG
  );

  assert.ok(fullHtml.startsWith('<!DOCTYPE html>'), 'Starts with valid doctype');
  assert.ok(fullHtml.includes('CHAPTER 1: THE OPENING FRAMES'), 'Contains Chapter 1 section');
  assert.ok(fullHtml.includes('CHAPTER 2: "CHAMPAGNE SUPERNOVA"'), 'Contains Chapter 2 section');
  assert.ok(fullHtml.includes('CHAPTER 3: "STAND BY ME"'), 'Contains Chapter 3 section');
  assert.ok(fullHtml.includes('fonts.googleapis.com/css2?family=Archivo+Black'), 'Loads typography fonts');
});
