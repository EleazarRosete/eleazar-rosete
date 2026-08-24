// ===============================
// SKILLHIGHLIGHTSROW.TSX — The row of circular skill icons under the hero.
// Tapping one opens SkillHighlightStory at that category's slide.
// ===============================

import { SKILL_CATEGORIES } from '@/data/skills';

interface SkillHighlightsRowProps {
  onSelect: (categoryId: string) => void;
}

export default function SkillHighlightsRow({ onSelect }: SkillHighlightsRowProps) {
  return (
    <div className="ig-scroll-row" style={{ display: 'flex', gap: 22, flexWrap: 'nowrap', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      {SKILL_CATEGORIES.map(({ id, icon: Icon, label, image }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          aria-haspopup="dialog"
          aria-label={`View ${label} highlights`}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 68, flexShrink: 0,
            background: 'transparent', border: 'none', cursor: 'pointer', appearance: 'none', padding: 0,
          }}
        >
          <div
            style={{
              width: 62, height: 62, borderRadius: '50%',
              background: 'var(--gradient-ring)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2,
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
              fontSize: 21, color: 'var(--text-secondary)', lineHeight: 1,
            }}>
              {image ? (
                <img src={image} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : Icon ? (
                <Icon />
              ) : (
                <span>{label.charAt(0).toUpperCase()}</span>
              )}
            </div>
          </div>
          <span style={{ fontSize: '0.72rem', textAlign: 'center', color: 'var(--text-muted)', fontWeight: 400 }}>
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}