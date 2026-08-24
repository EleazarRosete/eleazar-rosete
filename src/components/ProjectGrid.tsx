// ===============================
// PROJECTGRID.TSX — Instagram-style tile grid + filter chips. Shared by
// all four profile tabs. You should never need to edit this file to add
// a project — add it to the arrays in src/data/projects.ts instead.
// ===============================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import { TAG_ICON_MAP, type ProjectItem, type TabMeta } from '@/data/projects';
import { chipVariants } from '@/theme/animations';
import { getProjectThumbnail } from '@/lib/projectMedia';

interface ProjectGridProps {
  items: ProjectItem[];
  meta: TabMeta;
  emptyTitle: string;
  emptyDesc: string;
  onSelect: (item: ProjectItem, meta: TabMeta) => void;
}

export default function ProjectGrid({ items, meta, emptyTitle, emptyDesc, onSelect }: ProjectGridProps) {
  const [filterValue, setFilterValue] = useState('All');

  if (items.length === 0) {
    const EmptyIcon = meta.badgeIcon;
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', gap: 8, padding: '36px 16px',
        border: '1px dashed var(--border)', borderRadius: 14,
      }}>
        <EmptyIcon size={22} color="var(--text-muted)" />
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, fontWeight: 600 }}>{emptyTitle}</p>
        <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: 0, maxWidth: 260 }}>{emptyDesc}</p>
      </div>
    );
  }

  const tagOptions = ['All', ...Array.from(new Set(items.map((p) => p.tag)))];
  const visibleItems = filterValue === 'All' ? items : items.filter((p) => p.tag === filterValue);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {tagOptions.map((tag) => {
          const TagIcon = TAG_ICON_MAP[tag];
          const active = filterValue === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setFilterValue(tag)}
              aria-pressed={active}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '7px 13px', borderRadius: 20,
                border: active ? '1px solid var(--accent-violet)' : '1px solid var(--border)',
                background: active ? 'var(--gradient-btn)' : 'var(--bg-card)',
                color: active ? 'var(--bg-base)' : 'var(--text-secondary)',
                fontSize: '0.74rem', fontWeight: active ? 600 : 500,
                cursor: 'pointer', appearance: 'none', transition: 'all 0.2s',
              }}
            >
              {TagIcon && <TagIcon size={12} />}
              {tag}
            </button>
          );
        })}
      </div>

      {visibleItems.length === 0 ? (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center', gap: 6, padding: '32px 16px',
          border: '1px dashed var(--border)', borderRadius: 14,
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, fontWeight: 600 }}>No projects in this category yet</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
          {visibleItems.map((item, i) => {
            const CoverIcon = item.cover?.icon || meta.badgeIcon;
            const TagIcon = TAG_ICON_MAP[item.tag];
            const BadgeIcon = meta.badgeIcon;
            const thumbnail = getProjectThumbnail(item.id);
            return (
              <motion.button
                key={item.id || item.title}
                type="button"
                onClick={() => onSelect(item, meta)}
                custom={i} variants={chipVariants} initial="hidden" animate="visible"
                aria-label={`View case study: ${item.title} — ${meta.badge}, ${item.tag}`}
                style={{
                  position: 'relative', width: '100%', aspectRatio: '4 / 5',
                  border: 'none', padding: 0, cursor: 'pointer', appearance: 'none',
                  overflow: 'hidden',
                  background: 'linear-gradient(150deg, var(--bg-card) 0%, var(--bg-base) 100%)',
                }}
                className="ig-tile"
              >
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                    />
                  ) : (
                    <CoverIcon size={26} color="var(--text-muted)" strokeWidth={1.4} />
                  )}
                </div>

                <span style={{
                  position: 'absolute', top: 6, left: 6,
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '3px 7px', borderRadius: 20,
                  background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
                }}>
                  <BadgeIcon size={9} color="#fff" />
                  <span style={{ fontSize: '0.56rem', fontWeight: 600, color: '#fff', letterSpacing: '0.02em' }}>{meta.badge}</span>
                </span>

                {item.media && item.media.length > 1 && (
                  <span style={{
                    position: 'absolute', top: 6, right: 6,
                    width: 18, height: 18, borderRadius: 4,
                    background: 'rgba(0,0,0,0.45)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <LayoutGrid size={10} color="#fff" />
                  </span>
                )}

                <span style={{
                  position: 'absolute', bottom: 6, left: 6,
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '3px 8px', borderRadius: 20,
                  background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
                }}>
                  {TagIcon && <TagIcon size={10} color="#fff" />}
                  <span style={{ fontSize: '0.6rem', fontWeight: 600, color: '#fff' }}>{item.tag}</span>
                </span>

                <div className="ig-tile-overlay" style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.62)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '10px', textAlign: 'center',
                  opacity: 0, transition: 'opacity 0.2s',
                }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>{item.title}</span>
                </div>
              </motion.button>
            );
          })}
          <style>{`
            .ig-tile:hover .ig-tile-overlay, .ig-tile:focus-visible .ig-tile-overlay { opacity: 1; }
          `}</style>
        </div>
      )}
    </div>
  );
}