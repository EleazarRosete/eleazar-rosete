// ===============================
// PROFILE.TS — Your name, tagline, stats, and contact/social links.
// Edit the values below. Nothing else needs to change.
// ===============================

import { Linkedin, Instagram, Facebook, type LucideIcon } from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
// import avatar from '../assets/eleazar.png';


export const AVATAR_URL = '/eleazar.png'; // put your image in the public/ folder with this name
export const HERO_NAME = 'ELEAZAR ROSETE';
export const NOTE_TEXT = "Let's work together";
export const AVAILABLE_TEXT = 'Available';
export const HERO_ROLE = 'CRM Specialist | Automation, Data Management & Remote Support';
export const HERO_TAGLINE =
  "IT graduate specializing in CRM management, workflow automation, and data-driven remote support. I build and maintain clean, organized CRM systems — from data entry and de-duplication to automated follow-up sequences — backed by real customer service experience from a US insurance BPO. Fully remote, detail-obsessed, and built for teams that can't afford messy data.";

export interface HeroStat {
  num: string;
  label: string;
}

export const HERO_STATS: HeroStat[] = [
  { num: '4 +', label: 'Year Experience' },
  { num: '7', label: 'Clients Served' },
  { num: '5', label: 'International Client' },
];

export interface SocialLink {
  icon: LucideIcon | typeof WhatsAppIcon;
  label: string;
  value: string;
  href: string;
}

// Add / remove / reorder cards shown in the "Let's Connect" modal here.
export const SOCIAL_LINKS: SocialLink[] = [
  { icon: Linkedin, label: 'LinkedIn', value: 'Connect professionally', href: 'https://www.linkedin.com/in/eleazar-rosete-461564370/' },
  { icon: Instagram, label: 'Instagram', value: 'Visit Profile', href: 'https://www.instagram.com/dsgnbyzar/' },
  { icon: Facebook, label: 'Facebook', value: 'Visit Profile', href: 'https://www.facebook.com/eleazar.rosete.2024' },
  { icon: WhatsAppIcon, label: 'WhatsApp', value: '+63-968-282-3420', href: 'https://wa.me/+639682823420' },
];

export const CONTACT_EMAIL = 'eleazar.rosete@example.com';

// Options shown in the "Project Type" dropdown of the message form.
export const PROJECT_TYPES = [
  'CRM Specialist',
  'Web Development',
  'Virtual Assistant',
  'Transcription',
  'Other',
];
