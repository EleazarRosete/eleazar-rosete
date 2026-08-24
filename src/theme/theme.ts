// ===============================
// THEME.TS — Dark/light color tokens as CSS custom properties.
// Tweak colors here; components just read var(--token-name).
// Pure black-and-white monochrome — no tinted accent color. Depth and
// emphasis come from opacity, glow, and the stage-lighting layer
// (spotlight/vignette/grain), not from hue.
// ===============================

import type { CSSProperties } from 'react';

export const darkVars: CSSProperties = {
  ['--bg-base' as any]: '#0d0d0d',
  ['--bg-card' as any]: 'rgba(255,255,255,0.05)',
  ['--bg-card-hover' as any]: 'rgba(255,255,255,0.08)',
  ['--border' as any]: 'rgba(255,255,255,0.10)',
  ['--border-bright' as any]: 'rgba(255,255,255,0.25)',
  ['--text-primary' as any]: '#fafafa',
  ['--text-secondary' as any]: '#a3a3a3',
  ['--text-muted' as any]: '#5c5c5c',

  ['--accent-violet' as any]: '#fafafa',
  ['--accent-indigo' as any]: '#8a8a8a',
  ['--accent-cyan' as any]: '#e5e5e5',

  // The hero's actual backdrop — a soft radial fade from a natural
  // charcoal center to true black at the edges. Flat #000 reads dead on
  // screen; this keeps it deep but alive, like the reference.
  ['--hero-gradient' as any]: 'radial-gradient(ellipse 85% 65% at 50% 10%, #1c1c1c 0%, #101010 48%, #000000 100%)',

  ['--gradient-hero' as any]: 'linear-gradient(135deg, #fafafa 0%, #737373 100%)',
  ['--gradient-btn' as any]: 'linear-gradient(135deg, #fafafa 0%, #d4d4d4 100%)',
  ['--gradient-ring' as any]: 'conic-gradient(from 220deg, #fafafa, #737373, #1a1a1a, #fafafa)',

  ['--glow-1' as any]: 'rgba(255,255,255,0.10)',
  ['--glow-2' as any]: 'rgba(255,255,255,0.05)',
  ['--glow-indigo' as any]: 'rgba(255,255,255,0.06)',
  ['--glow-violet' as any]: 'rgba(255,255,255,0.04)',

  // Stage lighting — soft top-down spotlight + edge vignette, like a lit set.
  // Vignette is lighter than before since --hero-gradient now does most
  // of the edge-darkening work; this just adds a touch more falloff.
  ['--spotlight-color' as any]: 'rgba(255,255,255,0.14)',
  ['--spotlight-color-soft' as any]: 'rgba(255,255,255,0.05)',
  ['--vignette-color' as any]: 'rgba(0,0,0,0.45)',
  ['--grain-opacity' as any]: '0.06',

  ['--shadow-card' as any]: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 60px -24px rgba(0,0,0,0.65)',
  ['--shadow-lift' as any]: '0 10px 28px -10px rgba(0,0,0,0.55)',
  ['--shadow-accent-glow' as any]: '0 10px 32px -8px rgba(255,255,255,0.35)',

  ['--font-display' as any]: "'General Sans', 'Clash Display', sans-serif",
  ['--font-body' as any]: "'Sora', system-ui, sans-serif",
};

export const lightVars: CSSProperties = {
  ['--bg-base' as any]: '#fafafa',
  ['--bg-card' as any]: 'rgba(0,0,0,0.04)',
  ['--bg-card-hover' as any]: 'rgba(0,0,0,0.07)',
  ['--border' as any]: 'rgba(0,0,0,0.10)',
  ['--border-bright' as any]: 'rgba(0,0,0,0.25)',
  ['--text-primary' as any]: '#0d0d0d',
  ['--text-secondary' as any]: '#525252',
  ['--text-muted' as any]: '#a3a3a3',

  ['--accent-violet' as any]: '#0d0d0d',
  ['--accent-indigo' as any]: '#525252',
  ['--accent-cyan' as any]: '#262626',

  // Same idea in reverse — a visible radial fade, not a flat fill.
  ['--hero-gradient' as any]: 'radial-gradient(ellipse 85% 65% at 50% 10%, #ffffff 0%, #eeeeee 45%, #d4d4d4 100%)',

  ['--gradient-hero' as any]: 'linear-gradient(135deg, #0d0d0d 0%, #525252 100%)',
  ['--gradient-btn' as any]: 'linear-gradient(135deg, #0d0d0d 0%, #262626 100%)',
  ['--gradient-ring' as any]: 'conic-gradient(from 220deg, #0d0d0d, #525252, #d4d4d4, #0d0d0d)',

  ['--glow-1' as any]: 'rgba(0,0,0,0.06)',
  ['--glow-2' as any]: 'rgba(0,0,0,0.03)',
  ['--glow-indigo' as any]: 'rgba(0,0,0,0.05)',
  ['--glow-violet' as any]: 'rgba(0,0,0,0.03)',

  // Stage lighting — much softer in light mode; the drama is a dark-mode signature.
  ['--spotlight-color' as any]: 'rgba(0,0,0,0.05)',
  ['--spotlight-color-soft' as any]: 'rgba(0,0,0,0.02)',
  ['--vignette-color' as any]: 'rgba(0,0,0,0.13)',
  ['--grain-opacity' as any]: '0.02',

  ['--shadow-card' as any]: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 24px 50px -24px rgba(0,0,0,0.2)',
  ['--shadow-lift' as any]: '0 10px 24px -12px rgba(0,0,0,0.22)',
  ['--shadow-accent-glow' as any]: '0 10px 26px -8px rgba(0,0,0,0.25)',

  ['--font-display' as any]: "'General Sans', 'Clash Display', sans-serif",
  ['--font-body' as any]: "'Sora', system-ui, sans-serif",
};