// ===============================
// STORYCONTENT.TS — Text/content for the "About Me" avatar story.
// Change slide copy here without touching the story component itself.
// ===============================

import { Cog, Globe, FileText, Mic, type LucideIcon } from 'lucide-react';

export interface StorySlideMeta {
  id: 'intro' | 'services' | 'stats' | 'values' | 'goals' | 'cta';
  duration: number; // ms, how long the slide auto-advances after
}

export const STORY_SLIDES: StorySlideMeta[] = [
  { id: 'intro', duration: 4500 },
  { id: 'services', duration: 6500 },
  { id: 'stats', duration: 5000 },
  { id: 'values', duration: 6500 },
  { id: 'goals', duration: 6000 },
  { id: 'cta', duration: 6500 },
];

export interface ServiceItem {
  icon: LucideIcon;
  label: string;
  copy: string;
}

export const SERVICE_ITEMS: ServiceItem[] = [
  { icon: Cog, label: 'CRM & Automation', copy: 'Monday.com workflows, automated follow-ups, and clean, organized data.' },
  { icon: Globe, label: 'Web Development', copy: 'React, Next.js & Tailwind sites, deployed for real clients.' },
  { icon: FileText, label: 'Virtual Assistance', copy: 'Document processing, data entry, calendar & inquiry handling.' },
  { icon: Mic, label: 'Transcription', copy: 'Audio and image-to-text transcription, done with accuracy and speed.' },
];

export interface ValueItem {
  label: string;
  copy: string;
}

export const VALUE_ITEMS: ValueItem[] = [
  { label: 'Systems Thinker', copy: 'I map the workflow before I touch a single tool — automation only works if the process is right first.' },
  { label: 'Cross-Trained by Design', copy: 'Dev, data, and customer-facing work aren\'t separate skills for me — I build the system and run it.' },
  { label: 'Trained on Real Stakes', copy: 'Handled sensitive customer data at a US insurance BPO — I bring that same accuracy to every board and sheet.' },
];

export const INTRO_CONTENT = {
  greeting: "👋 Hey, I'm Eleazar",
  hint: 'Tap to see what I actually do →',
};

export const GOALS_CONTENT = {
  title: "Where I'm Headed",
  body:
    "I'm looking to grow into long-term remote roles in CRM automation, web development, or virtual assistance — helping businesses abroad run smoother, the way I already have for clients in the UK.",
};

export const CTA_CONTENT = {
  title: "Let's Build Something",
};