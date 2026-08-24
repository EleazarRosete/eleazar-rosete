import { Globe, Cog, FileText, Mic, Briefcase, Package, type LucideIcon } from 'lucide-react';

export type ProjectTag = 'CRM & Automation' | 'Web Dev' |'Virtual Assist' | 'Transcription';

export interface MediaItem {
  type: 'image' | 'video';
  src?: string;
  caption: string;
}

// Add a new tool name here + its Iconify icon string to make it available
// to any project. Browse icons at https://icon-sets.iconify.design/
export const TOOL_ICON_MAP: Record<string, string> = {
  'React': 'logos:react',
  'Vite': 'logos:vitejs',
  'Tailwind CSS': 'logos:tailwindcss-icon',
  'Git': 'logos:git-icon',
  'GitHub': 'mdi:github',
  'API Integration': 'tabler:api',
  'Hostinger': 'simple-icons:hostinger',
  'Gmail API': 'logos:google-gmail',
};

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  role: string;
  about: string;
  tag: ProjectTag;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  quote?: string | null;
  cta?: string;
  hasLink: boolean;
  link?: string;
  tools?: (keyof typeof TOOL_ICON_MAP)[];   // NEW — tools/stack used, shown as icons in the modal
  cover: { type: 'gradient'; icon: LucideIcon };
  media: MediaItem[];
}

export const TAG_ICON_MAP: Record<string, LucideIcon> = {
  'Web Dev': Globe,
  'CRM & Automation': Cog,
  'Virtual Assist': FileText,
  'Transcription': Mic,
};

export type ProfileTabId = 'clientwork' | 'products';

export interface ProfileTab {
  id: ProfileTabId;
  icon: LucideIcon;
  label: string;
}

export const PROFILE_TABS: ProfileTab[] = [
  { id: 'clientwork', icon: Briefcase, label: 'Client Projects' },
  { id: 'products', icon: Package, label: 'Products' },
];

export interface TabMeta {
  badge: string;
  badgeIcon: LucideIcon;
  fieldLabel: string;
  ctaLabel: string;
}

export const TAB_META: Record<ProfileTabId, TabMeta> = {
  clientwork: { badge: 'CLIENT', badgeIcon: Briefcase, fieldLabel: 'Client', ctaLabel: 'Start a similar project' },
  products: { badge: 'PRODUCT', badgeIcon: Package, fieldLabel: 'Product', ctaLabel: 'Ask about this product' },
};

export const CLIENT_PROJECTS: ProjectItem[] = [
  {
    id: 'simple-serve',
    title: 'Simple Serve — Vending Machine Ops Site',
    client: 'Simple Serve Ltd (UK)',
    role: 'Operations & Web Support',
    about: 'Simple Serve is a service-focused company committed to supporting businesses, organisations, individuals and families with reliable, fully managed solutions. They take a practical, dependable approach to service delivery — removing the hassle from everyday needs so our clients can focus on what matters most.',
    tag: 'Web Dev',
    summary: '[One-sentence summary of what you actually did for Simple Serve.]',
    problem: 'Simple Serve had no online presence to point customers to — their flyers were the only way people could learn about their services, with no way to browse offerings or get in touch outside of direct contact. Since flyers are handed out and viewed on the go, most of that traffic would be on phones, not desktops.',
    solution: 'Built a fully responsive website designed mobile-first, so anyone scanning a QR code or typing in the URL from a flyer gets a fast, clean experience on their phone — not a shrunk-down desktop layout. The site gives Simple Serve a proper digital home to showcase their services and make it easy for people to get in touch.',
    result: 'A live, mobile-optimized website that works smoothly across phones, tablets, and desktops — giving Simple Serve flyers something solid to point to and making it easy for potential clients to learn about their services and reach out, wherever they find them.',
    quote: null,
    hasLink: true,
    link: 'https://www.simpleserveltd.co.uk/',
    tools: ['React', 'Vite', 'Tailwind CSS', 'Git', 'GitHub', 'API Integration', 'Hostinger', 'Gmail API'],
    cover: { type: 'gradient', icon: Globe },
    media: [
      { type: 'image', caption: 'Simple Serve homepage' },
    ],
  },
];

export const PRODUCT_ITEMS: ProjectItem[] = [

];