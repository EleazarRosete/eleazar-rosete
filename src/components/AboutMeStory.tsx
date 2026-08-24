// ===============================
// ABOUTMESTORY.TSX — Full-screen "About Me" story opened by tapping the
// avatar. Slide copy lives in src/data/storyContent.ts and profile.ts;
// this file only handles layout/animation.
// ===============================

import type { CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Pause, Play, Award, ArrowRight, ChevronLeft, ChevronRight, Target, Check } from 'lucide-react';
import { HERO_NAME, HERO_ROLE, HERO_STATS, NOTE_TEXT, AVATAR_URL } from '@/data/profile';
import { STORY_SLIDES, SERVICE_ITEMS, VALUE_ITEMS, INTRO_CONTENT, GOALS_CONTENT, CTA_CONTENT } from '@/data/storyContent';
import { storyItemVariants } from '@/theme/animations';
import { useStoryPlayer } from '@/hooks/useStoryPlayer';

interface AboutMeStoryProps {
  isOpen: boolean;
  onClose: () => void;
  onMessageClick: () => void;
  onConnectClick: () => void;
}

export default function AboutMeStory({ isOpen, onClose, onMessageClick, onConnectClick }: AboutMeStoryProps) {
  const { slideIndex, isPaused, totalSlides, progressRefs, goNext, goPrev, handlePauseToggle, handleTouchStart, handleTouchEnd } =
    useStoryPlayer(STORY_SLIDES, { isOpen, onClose });

  const activeSlideId = STORY_SLIDES[slideIndex]?.id;

  return (
    <AnimatePresence>
      {isOpen && (
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
          <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: 360 }}>
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
                {STORY_SLIDES.map((slide, i) => (
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
                  <div style={{
  width: 30, height: 30, borderRadius: '50%',
  border: '1px solid var(--accent-violet)', overflow: 'hidden',
}}>
  <img src={AVATAR_URL} alt={HERO_NAME} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
</div>
                  <span style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 600 }}>{HERO_NAME}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button type="button" onClick={handlePauseToggle} aria-label={isPaused ? 'Resume story' : 'Pause story'} style={circleBtnStyle}>
                    {isPaused ? <Play size={13} style={{ marginLeft: 1 }} /> : <Pause size={13} />}
                  </button>
                  <button type="button" onClick={onClose} aria-label="Close story" style={circleBtnStyle}>
                    <X size={15} />
                  </button>
                </div>
              </div>

              <div onClick={goPrev} aria-label="Previous slide" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '32%', zIndex: 2, cursor: slideIndex > 0 ? 'pointer' : 'default' }} />
              <div onClick={goNext} aria-label="Next slide" style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '68%', zIndex: 2, cursor: 'pointer' }} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlideId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '76px 26px 44px', position: 'relative', zIndex: 1 }}
                >
                  {activeSlideId === 'intro' && (
                    <div style={{ textAlign: 'center' }}>
                      <motion.div
  initial={{ scale: 0.7, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  style={{
    width: 76, height: 76, borderRadius: '50%', margin: '0 auto 20px',
    overflow: 'hidden', border: '2px solid var(--border-bright)',
  }}
>
  <img src={AVATAR_URL} alt={HERO_NAME} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
</motion.div>
                      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }}
                        style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10, lineHeight: 1.4 }}>
                        {INTRO_CONTENT.greeting}
                      </motion.p>
                      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}
                        style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 6 }}>
                        {HERO_ROLE}
                      </motion.p>
                      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }}
                        style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 18 }}>
                        {INTRO_CONTENT.hint}
                      </motion.p>
                    </div>
                  )}

                  {activeSlideId === 'services' && (
                    <div>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 22 }}>What I Do</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {SERVICE_ITEMS.map((item, i) => {
                          const Icon = item.icon;
                          return (
                            <motion.div key={item.label} custom={i} variants={storyItemVariants} initial="hidden" animate="visible" style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                              <span style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, background: 'var(--bg-card)', border: '1px solid var(--border-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon size={16} color="var(--text-primary)" />
                              </span>
                              <span>
                                <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
                                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.4 }}>{item.copy}</span>
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {activeSlideId === 'stats' && (
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 26 }}>Experience &amp; Achievements</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        {HERO_STATS.map((stat, i) => (
                          <motion.div key={stat.label} custom={i} variants={storyItemVariants} initial="hidden" animate="visible" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 10 }}>
                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2rem', color: 'var(--text-primary)' }}>{stat.num}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{stat.label}</span>
                          </motion.div>
                        ))}
                      </div>
                      {/* <motion.div custom={HERO_STATS.length} variants={storyItemVariants} initial="hidden" animate="visible"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 22, padding: '6px 12px', borderRadius: 20, border: '1px solid var(--border-bright)', background: 'var(--bg-card)' }}>
                        <Award size={13} color="var(--text-muted)" />
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>NAPOLCOM Exam Passer</span>
                      </motion.div> */}
                    </div>
                  )}

                  {activeSlideId === 'values' && (
                    <div>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 22 }}>What I Value</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {VALUE_ITEMS.map((item, i) => (
                          <motion.div key={item.label} custom={i} variants={storyItemVariants} initial="hidden" animate="visible" style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                            <span style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 1, background: 'var(--bg-card)', border: '1px solid var(--border-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Check size={12} color="var(--text-primary)" />
                            </span>
                            <span>
                              <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
                              <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.45 }}>{item.copy}</span>
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSlideId === 'goals' && (
                    <div style={{ textAlign: 'center' }}>
                      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} style={{ marginBottom: 18, display: 'flex', justifyContent: 'center' }}>
                        <Target size={24} color="var(--text-muted)" />
                      </motion.div>
                      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.4 }}
                        style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>
                        {GOALS_CONTENT.title}
                      </motion.p>
                      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.45 }}
                        style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {GOALS_CONTENT.body}
                      </motion.p>
                    </div>
                  )}

                  {activeSlideId === 'cta' && (
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.4 }}>{CTA_CONTENT.title}</p>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 26 }}>{NOTE_TEXT}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <button type="button" onClick={() => { onClose(); onMessageClick(); }} style={ctaPrimaryBtnStyle}>
                          <MessageSquare size={14} /> Let's Talk <ArrowRight size={13} />
                        </button>
                        <button type="button" onClick={() => { onClose(); onConnectClick(); }} style={ctaSecondaryBtnStyle}>
                          Connect With Me
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {slideIndex > 0 && (
              <button type="button" onClick={goPrev} aria-label="Previous slide" style={sideNavBtnStyle('left')}>
                <ChevronLeft size={20} />
              </button>
            )}
            {slideIndex < totalSlides - 1 && (
              <button type="button" onClick={goNext} aria-label="Next slide" style={sideNavBtnStyle('right')}>
                <ChevronRight size={20} />
              </button>
            )}
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

const ctaPrimaryBtnStyle: CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
  padding: '11px 20px', borderRadius: 10,
  background: 'var(--gradient-btn)', color: 'var(--bg-base)',
  fontWeight: 700, fontSize: '0.82rem', border: 'none', cursor: 'pointer',
  appearance: 'none', position: 'relative', zIndex: 3,
};

const ctaSecondaryBtnStyle: CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
  padding: '11px 20px', borderRadius: 10,
  background: 'transparent', color: 'var(--text-primary)',
  fontWeight: 600, fontSize: '0.82rem', border: '1px solid var(--border-bright)', cursor: 'pointer',
  appearance: 'none', position: 'relative', zIndex: 3,
};

const sideNavBtnStyle = (side: 'left' | 'right'): CSSProperties => ({
  position: 'absolute', [side]: -56, top: '50%', transform: 'translateY(-50%)',
  width: 40, height: 40, borderRadius: '50%',
  border: '1px solid var(--border-bright)',
  background: 'var(--bg-card-hover)',
  backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
  color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', zIndex: 3,
});
