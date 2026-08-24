// ===============================
// SKILLS.TS — Skill highlight circles + their story slides.
//
// Each category has its own `slides` array — Tools, Skills, Languages,
// Automation, whatever fits. Tool/tech items use `iconify` (a string
// icon name from https://icones.js.org — search the brand, copy the
// "set:name" string shown, paste it in). No icon = falls back to a
// text monogram, which is fine for niche tools that don't have a logo
// in Iconify.
//
// NOTE: CapCut has no logo in any Iconify collection as of this writing —
// there's an open, unresolved request for it on simple-icons' GitHub — so
// it intentionally has no `iconify` and falls back to its "CA" monogram.
// Viber's icon (simple-icons:viber) hasn't been double-checked at
// icones.js.org — flag it if it doesn't render.
// ===============================

export interface SkillItem {
  label: string;
  iconify?: string;   // e.g. 'logos:react' — verify at icones.js.org first
}

export interface SkillCategorySlide {
  id: string;
  title: string;
  items: SkillItem[];
}

export interface SkillCategory {
  id: string;
  icon: string;         // iconify icon name — fallback for the highlight circle
  image?: string;        // photo for the highlight circle
  label: string;
  slides: SkillCategorySlide[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'crm-automation',
    icon: 'mdi:cog',
    image: '/skills/crm-automation.jpg',
    label: 'CRM & Automation',
    slides: [
      {
        id: 'tools',
        title: 'CRM Tools',
        items: [
          { label: 'HubSpot', iconify: 'logos:hubspot' },
          { label: 'Monday.com', iconify: 'logos:monday-icon' },
          { label: 'Excel', iconify: 'simple-icons:microsoftexcel' },
        ],
      },
      {
        id: 'automation',
        title: 'Automation',
        items: [
          { label: 'n8n', iconify: 'simple-icons:n8n' },
          { label: 'API Integrations', iconify: 'mdi:api' },
          { label: 'JavaScript', iconify: 'logos:javascript' },
          { label: 'Custom Python Tool', iconify: 'logos:python' },
        ],
      },
      {
        id: 'skills',
        title: 'Skills',
        items: [
          { label: 'CRM Management' },
          { label: 'Lead Generation' },
          { label: 'Cold Outreach' },
          { label: 'Follow-Up Systems' },
          { label: 'Pipeline Tracking' },
          { label: 'Data Entry' },
        ],
      },
    ],
  },
  {
    id: 'webdev',
    icon: 'mdi:web',
    image: '/skills/webdev.jpg',
    label: 'Web Dev',
    slides: [
      {
        id: 'languages',
        title: 'Languages',
        items: [
          { label: 'TypeScript (TSX)', iconify: 'logos:typescript-icon' },
          { label: 'JavaScript', iconify: 'logos:javascript' },
          { label: 'HTML', iconify: 'logos:html-5' },
          { label: 'CSS', iconify: 'logos:css-3' },
          { label: 'Tailwind CSS', iconify: 'logos:tailwindcss-icon' },
        ],
      },
      {
        id: 'tools',
        title: 'Tools & IDEs',
        items: [
          { label: 'WordPress', iconify: 'logos:wordpress-icon' },
          { label: 'VS Code', iconify: 'logos:visual-studio-code' },
          { label: 'API Integration', iconify: 'mdi:api' },
          { label: 'Git', iconify: 'logos:git-icon' },
          { label: 'GitHub', iconify: 'logos:github-icon' },
          { label: 'Figma', iconify: 'logos:figma' },
          { label: 'PostgreSQL', iconify: 'logos:postgresql' },
        ],
      },
      {
        id: 'skills',
        title: 'Skills',
        items: [
          { label: 'Responsive Design' },
          { label: 'REST API Integration' },
          { label: 'Problem-Solving' },
        ],
      },
    ],
  },
  {
    id: 'virtualassist',
    icon: 'mdi:file-document-outline',
    image: '/skills/virtual-assist.jpg',
    label: 'Virtual Assist',
    slides: [
      {
        id: 'tools-google',
        title: 'Google Workspace',
        items: [
          { label: 'Gmail', iconify: 'logos:google-gmail' },
          { label: 'Google Calendar', iconify: 'logos:google-calendar' },
          { label: 'Google Drive', iconify: 'logos:google-drive' },
          { label: 'Google Docs', iconify: 'simple-icons:googledocs' },
          { label: 'Google Sheets', iconify: 'simple-icons:googlesheets' },
        ],
      },
      {
        id: 'tools-office',
        title: 'Microsoft Office',
        items: [
          { label: 'MS Word', iconify: 'simple-icons:microsoftword' },
          { label: 'MS Excel', iconify: 'simple-icons:microsoftexcel' },
          { label: 'MS Teams', iconify: 'logos:microsoft-teams' },
          { label: 'MS Outlook', iconify: 'simple-icons:microsoftoutlook' },
        ],
      },
      {
        id: 'tools-comms',
        title: 'Communication',
        items: [
          { label: 'Slack', iconify: 'logos:slack-icon' },
          { label: 'Viber', iconify: 'simple-icons:viber' },
          { label: 'WhatsApp', iconify: 'logos:whatsapp-icon' },
          { label: 'Calendly', iconify: 'simple-icons:calendly' },
        ],
      },
      {
        id: 'tools-creative',
        title: 'Creative & Other Tools',
        items: [
          { label: 'Canva', iconify: 'simple-icons:canva' },
          { label: 'CapCut' },
          { label: 'Photoshop', iconify: 'logos:adobe-photoshop' },
          { label: 'Monday.com', iconify: 'logos:monday-icon' },
          { label: 'Custom Python Tool', iconify: 'logos:python' },
        ],
      },
      {
        id: 'skills',
        title: 'Skills',
        items: [
          { label: 'Data Entry' },
          { label: 'Inquiry Handling' },
          { label: 'Attention to Detail' },
          { label: 'Email & Calendar Management' },
          { label: 'Legal Document Editing' },
          { label: 'Photo & Video Editing' },
        ],
      },
    ],
  },
  {
    id: 'transcription',
    icon: 'mdi:microphone',
    image: '/skills/transcription.jpg',
    label: 'Transcription',
    slides: [
      {
        id: 'tools',
        title: 'Tools I Use',
        items: [
          { label: 'Custom Python Tool', iconify: 'logos:python' },
          { label: 'SQL / Database', iconify: 'mdi:database' },
          { label: 'MS Excel', iconify: 'simple-icons:microsoftexcel' },
          { label: 'MS Word', iconify: 'simple-icons:microsoftword' },
        ],
      },
      {
        id: 'skills',
        title: 'Skills',
        items: [
          { label: 'Attention to Detail' },
          { label: 'Audio Transcription' },
          { label: 'Image-to-Text Transcription' },
          { label: 'Accuracy & QA' },
          { label: 'Fast Turnaround' },
        ],
      },
    ],
  },
];

export interface CertificationItem {
  icon: string;   // iconify icon name
  label: string;
  detail: string;
}

export const CERTIFICATION_ITEMS: CertificationItem[] = [
  { icon: 'mdi:shield-check-outline', label: 'EF SET B2 Certified', detail: 'English proficiency certification' },
  { icon: 'mdi:medal-outline', label: 'NAPOLCOM Exam Passer', detail: 'National Police Commission exam' },
  { icon: 'mdi:shield-check-outline', label: 'HIPAA-Compliant Data Handling', detail: 'Trained in compliant data-entry practices' },
];