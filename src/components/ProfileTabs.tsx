// ===============================
// PROFILETABS.TSX — The 4-tab nav (Client / Personal / Products /
// Affiliated) plus the grid for whichever tab is active. Pulls straight
// from src/data/projects.ts — add a project there, it shows up here.
// ===============================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PROFILE_TABS, TAB_META, CLIENT_PROJECTS, PRODUCT_ITEMS,
  type ProfileTabId, type ProjectItem, type TabMeta,
} from '@/data/projects';
import ProjectGrid from './ProjectGrid';

interface ProfileTabsProps {
  onSelectProject: (item: ProjectItem, meta: TabMeta) => void;
}

const TAB_CONTENT: Record<ProfileTabId, { items: ProjectItem[]; emptyTitle: string; emptyDesc: string }> = {
  clientwork: { items: CLIENT_PROJECTS, emptyTitle: 'No client projects yet', emptyDesc: 'Client projects will show up here once added.' },
  products: { items: PRODUCT_ITEMS, emptyTitle: 'No products yet', emptyDesc: 'Tools and templates will show up here once available.' },
};

export default function ProfileTabs({ onSelectProject }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<ProfileTabId>('clientwork');
  const content = TAB_CONTENT[activeTab];

  return (
    <div>
      <div style={{ display: 'flex', borderTop: '1px solid var(--border)' }}>
        {PROFILE_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={active}
              aria-label={tab.label}
              title={tab.label}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '16px 4px 12px', background: 'transparent',
                border: 'none', borderTop: active ? '2px solid var(--text-primary)' : '2px solid transparent',
                marginTop: -1, cursor: 'pointer', appearance: 'none',
                color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                transition: 'color 0.25s',
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'var(--text-secondary)'; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              <Icon size={19} strokeWidth={active ? 2.2 : 1.7} />
              <span style={{ fontSize: '0.6rem', fontWeight: active ? 600 : 500, textAlign: 'center', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ paddingTop: 22 }}
        >
          <ProjectGrid
            items={content.items}
            meta={TAB_META[activeTab]}
            emptyTitle={content.emptyTitle}
            emptyDesc={content.emptyDesc}
            onSelect={onSelectProject}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
