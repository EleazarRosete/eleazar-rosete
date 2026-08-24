// ===============================
// SKILLHIGHLIGHTSTORY.TSX — Full-screen story opened by tapping a skill
// highlight circle. Shows ONLY that category's own slides (Tools,
// Skills, Languages, etc. from src/data/skills.ts) — it does not flow
// into other categories. Reaching the last slide and pressing next
// closes the story, so each category stays self-contained.
//
// Items render as a scattered cloud of icon chips (no bullets, no card
// grid) using Iconify — icon names are plain strings from skills.ts,
// so a typo just means that one icon doesn't render, nothing breaks.
// ===============================

import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { SKILL_CATEGORIES, type SkillItem } from '@/data/skills';
import { chipVariants } from '@/theme/animations';
import { useStoryPlayer } from '@/hooks/useStoryPlayer';
import Avatar from '@/components/Avatar';

interface CategorySlide {
  id: string;
  title: string;
  items: SkillItem[];
  duration: number;
}

interface SkillHighlightStoryProps {
  isOpen: boolean;
  categoryId?: string;
  onClose: () => void;
}

// Deterministic pseudo-random scatter per label, so it looks randomly
// tossed but never jitters between renders. Now also varies icon size
// and vertical baseline so chips feel hand-placed instead of gridded.
function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function scatterFor(label: string) {
  const h = hashCode(label);
  return {
    rotate: (Math.abs(h) % 14) - 7,         // -7deg .. 7deg — subtle tilt, not spinning
    x: (Math.abs(h >> 3) % 16) - 8,         // -8px .. 8px
    y: (Math.abs(h >> 6) % 18) - 9,         // -9px .. 9px
    scale: 0.96 + (Math.abs(h >> 9) % 16) / 100, // 0.96 .. 1.12
    z: Math.abs(h >> 12) % 3,               // 0,1,2 stagger for layering
  };
}

// With flex-wrap, items naturally fall into rows of ~2. This adds a
// light up/down stagger by position so a "row" doesn't sit perfectly
// straight — kept small so it still reads as tidy, just not gridded.
function rowStaggerFor(index: number) {
  return index % 2 === 0 ? -8 : 10;
}

export default function SkillHighlightStory({ isOpen, categoryId, onClose }: SkillHighlightStoryProps) {
  const category = useMemo(() => SKILL_CATEGORIES.find((c) => c.id === categoryId), [categoryId]);

  const slides: CategorySlide[] = useMemo(() => {
    if (!category) return [];
    return category.slides.map((s) => ({ id: s.id, title: s.title, items: s.items, duration: 5000 }));
  }, [category]);

  const { slideIndex, isPaused, totalSlides, progressRefs, goNext, goPrev, handlePauseToggle, handleTouchStart, handleTouchEnd } =
    useStoryPlayer(slides, { isOpen, initialIndex: 0, onClose });

  const activeSlide = slides[slideIndex];

  return (
    <AnimatePresence>
      {isOpen && category && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: 'min(100%, 360px, calc((100vh - 40px) * 9 / 16))' }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{
                width: '100%', aspectRatio: '9 / 16',
                borderRadius: 20, overflow: 'hidden', position: 'relative',
                background: 'linear-gradient(165deg, var(--bg-card) 0%, var(--bg-base) 65%)',
                border: '1px solid var(--border)',
                display: 'flex', flexDirection: 'column',
                touchAction: 'pan-y',
              }}
            >
              <div style={{ position: 'absolute', top: 10, left: 10, right: 10, display: 'flex', gap: 4, zIndex: 3 }}>
                {slides.map((slide, i) => (
                  <div key={slide.id} style={{ flex: 1, height: 3, borderRadius: 3, background: 'var(--border-bright)', overflow: 'hidden' }}>
                    {i < slideIndex && <div style={{ width: '100%', height: '100%', background: 'var(--text-primary)' }} />}
                    {i === slideIndex && (
                      <div ref={(el) => { progressRefs.current[i] = el; }} style={{ width: '0%', height: '100%', background: 'var(--text-primary)' }} />
                    )}
                  </div>
                ))}
              </div>

              <div style={{ position: 'absolute', top: 22, left: 14, right: 14, zIndex: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Avatar src={category.image} alt={category.label} size={30} fallbackText="ER" />
                  <span style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 600 }}>{category.label}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button type="button" onClick={handlePauseToggle} aria-label={isPaused ? 'Resume story' : 'Pause story'} style={circleBtnStyle}>
                    {isPaused
                      ? <Icon icon="mdi:play" width={13} height={13} style={{ marginLeft: 1 }} />
                      : <Icon icon="mdi:pause" width={13} height={13} />}
                  </button>
                  <button type="button" onClick={onClose} aria-label="Close story" style={circleBtnStyle}>
                    <Icon icon="mdi:close" width={15} height={15} />
                  </button>
                </div>
              </div>

              <div onClick={goPrev} aria-label="Previous slide" style={{ position: 'absolute', top: '5%', height: '90%', left: 0, width: '18%', zIndex: 2, cursor: slideIndex > 0 ? 'pointer' : 'default' }} />
              <div onClick={goNext} aria-label="Next slide" style={{ position: 'absolute', top: '5%', height: '90%', right: 0, width: '18%', zIndex: 2, cursor: 'pointer' }} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide?.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '76px 26px 44px', position: 'relative', zIndex: 1, overflowY: 'auto' }}
                >
                  {activeSlide && (
                    <div style={{ textAlign: 'center' }}>
                      <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                        style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 30 }}>
                        {activeSlide.title}
                      </motion.p>

                      {activeSlide.id === 'skills' ? (
                        // Skills slides are plain text, no icons — a bulleted list reads
                        // clean and calm. The scattered mess is reserved for icon clouds.
                        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'inline-flex', flexDirection: 'column', gap: 16, textAlign: 'left' }}>
                          {activeSlide.items.map((item, i) => (
                            <motion.li
                              key={item.label}
                              custom={i} variants={chipVariants} initial="hidden" animate="visible"
                              style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 500 }}
                            >
                              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', flexShrink: 0 }} />
                              {item.label}
                            </motion.li>
                          ))}
                        </ul>
                      ) : (
                        // Icon slides — playful scattered cloud, icons only, no labels
                        // underneath (labels caused clutter next to the tilted icons).
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start', gap: '26px 24px', padding: '16px 4px 30px' }}>
                          {activeSlide.items.map((item, i) => {
                            const scatter = scatterFor(item.label);
                            const rowStagger = rowStaggerFor(i);
                            return (
                              <motion.div
                                key={item.label}
                                custom={i} variants={chipVariants} initial="hidden" animate="visible"
                                style={{
                                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                                  width: 84,
                                  zIndex: scatter.z,
                                  transform: `translateY(${rowStagger}px) rotate(${scatter.rotate}deg) translate(${scatter.x}px, ${scatter.y}px) scale(${scatter.scale})`,
                                }}
                              >
                                <div style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  {item.iconify ? (
                                    <Icon icon={item.iconify} width={40} height={40} />
                                  ) : (
                                    <span style={{
                                      width: 40, height: 40, borderRadius: '50%',
                                      background: 'var(--bg-card)', border: '1px solid var(--border-bright)',
                                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                                      fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)',
                                    }}>
                                      {item.label.slice(0, 2).toUpperCase()}
                                    </span>
                                  )}
                                </div>

                                <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.2 }}>
                                  {item.label}
                                </span>
                              </motion.div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const circleBtnStyle: CSSProperties = {
  width: 30, height: 30, borderRadius: '50%',
  border: '1px solid var(--border-bright)',
  background: 'var(--bg-card-hover)',
  backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
  color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
};