// ===============================
// HEROSECTION.TSX — Main hero section. Composes the smaller components
// and holds only the state that needs to be shared between them (theme,
// which modal is open, which project is selected). Edit copy/content in
// src/data/*, not here.
// ===============================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Share, Sun, Moon, UserPlus, Check } from 'lucide-react';

import { HERO_NAME, HERO_ROLE, HERO_TAGLINE, HERO_STATS, NOTE_TEXT, AVAILABLE_TEXT, AVATAR_URL } from '@/data/profile';
import type { ProjectItem, TabMeta } from '@/data/projects';
import { darkVars, lightVars } from '@/theme/theme';
import { fadeUp } from '@/theme/animations';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

import SkillHighlightsRow from '@/components/SkillHighlightsRow';
import ProfileTabs from '@/components/ProfileTabs';
import AboutMeStory from '@/components/AboutMeStory';
import SkillHighlightStory from '@/components/SkillHighlightStory';
import ConnectModal from '@/components/ConnectModal';
import MessageModal from '@/components/MessageModal';
import ProjectCaseModal from '@/components/ProjectCaseModal';

export default function HeroSection() {
  const [isDark, setIsDark] = useState(true);
  const [followed, setFollowed] = useState(false);

  const [aboutStoryOpen, setAboutStoryOpen] = useState(false);
  const [skillStoryOpen, setSkillStoryOpen] = useState(false);
  const [skillStorySlideId, setSkillStorySlideId] = useState<string | undefined>(undefined);
  const [showSocials, setShowSocials] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{ item: ProjectItem; meta: TabMeta } | null>(null);

  const anyModalOpen = aboutStoryOpen || skillStoryOpen || showSocials || messageOpen || !!selectedProject;
  useBodyScrollLock(anyModalOpen);

  const themeVars = isDark ? darkVars : lightVars;

  const handleFollowClick = () => {
    setFollowed((f) => !f);
    setShowSocials((s) => !s);
  };

  const handleShare = async () => {
    const shareData = {
      title: HERO_NAME,
      text: `${HERO_NAME} — ${HERO_ROLE}`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
      }
    } catch {
      // user cancelled the share sheet — nothing to do
    }
  };

  const openSkillStory = (categoryId: string) => {
    setSkillStorySlideId(categoryId);
    setSkillStoryOpen(true);
  };

  return (
    <section
      id="hero"
      className="bg-noise"
      style={{
        ...themeVars,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--hero-gradient)',
        color: 'var(--text-primary)',
        transition: 'background 0.35s ease, color 0.35s ease',
      }}
    >
      <div style={{ position: 'absolute', width: 640, height: 640, borderRadius: '50%', background: 'var(--glow-indigo)', filter: 'blur(170px)', top: -220, left: -120, pointerEvents: 'none', opacity: 0.7 }} />
      <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: 'var(--glow-violet)', filter: 'blur(140px)', bottom: -100, right: 100, pointerEvents: 'none', opacity: 0.5 }} />
      <div style={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', background: 'var(--glow-1)', filter: 'blur(100px)', top: '18%', left: '38%', pointerEvents: 'none', opacity: 0.5 }} />
      <div className="stage-vignette" />

      <div className="hero-inner" style={{ maxWidth: 760, margin: '0 auto', padding: '128px 32px 96px', position: 'relative', zIndex: 2, width: '100%' }}>
        <motion.div {...fadeUp(0)} style={{ display: 'flex', alignItems: 'flex-start', gap: 36, flexWrap: 'wrap', marginBottom: 36 }}>
          <div style={{ position: 'relative', flexShrink: 0, zIndex: 1 }}>
            <div style={{ position: 'absolute', bottom: 'calc(100% + 14px)', left: '50%', transform: 'translateX(-50%)', zIndex: 4 }}>
              <div style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-bright)',
                borderRadius: 18, padding: '8px 14px',
                fontSize: '0.75rem', color: 'var(--text-primary)', whiteSpace: 'nowrap',
                backdropFilter: 'blur(8px)', boxShadow: 'var(--shadow-lift)',
              }}>
                {NOTE_TEXT}
              </div>
              <span style={{ position: 'absolute', bottom: -8, left: '58%', width: 12, height: 12, borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border-bright)', backdropFilter: 'blur(8px)' }} />
              <span style={{ position: 'absolute', bottom: -17, left: '70%', width: 6, height: 6, borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border-bright)', backdropFilter: 'blur(8px)' }} />
            </div>

            <button
              type="button"
              onClick={() => setAboutStoryOpen(true)}
              aria-label="View About Me story"
              style={{
                width: 128, height: 128, borderRadius: '50%',
                background: 'var(--gradient-ring)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 4, border: 'none', cursor: 'pointer', appearance: 'none',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
    <img
      src={AVATAR_URL}
      alt={HERO_NAME}
      style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
    />
  </div>
              </div>
            </button>

            <span style={{ position: 'absolute', bottom: 6, right: 6, width: 16, height: 16, borderRadius: '50%', background: 'var(--accent-violet)', border: '3px solid var(--bg-base)', boxShadow: 'var(--shadow-accent-glow)', pointerEvents: 'none' }} />
          </div>

          <div style={{ flex: '1 1 320px', minWidth: 280, paddingTop: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 3vw, 2.1rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>
                {HERO_NAME}
              </h1>

              <button
                type="button"
                onClick={handleShare}
                aria-label="Share profile"
                style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  border: 'none', background: 'transparent',
                  color: 'var(--text-secondary)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-violet)'; e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <Share size={16} />
              </button>
            </div>

            <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--accent-violet)', margin: '6px 0 14px' }}>{HERO_ROLE}</p>

            <div className="ig-scroll-row" style={{ display: 'flex', gap: 22, marginBottom: 14, flexWrap: 'nowrap', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              {HERO_STATS.map((stat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 5, flexShrink: 0, whiteSpace: 'nowrap' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem' }}>{stat.num}</span>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{stat.label}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 11px', borderRadius: 20, marginBottom: 16, border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-violet)', boxShadow: '0 0 8px var(--accent-violet)' }} />
              <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{AVAILABLE_TEXT}</span>
            </div>

            <div style={{ maxWidth: 480, marginBottom: 20 }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{HERO_TAGLINE}</p>
            </div>

            <div className="hero-actions" style={{ display: 'flex', gap: 10, flexWrap: 'nowrap', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setMessageOpen(true)}
                aria-haspopup="dialog"
                className="hero-action-btn"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '11px 22px', borderRadius: 9,
                  background: 'var(--gradient-btn)', color: 'var(--bg-base)',
                  fontWeight: 600, fontSize: '0.88rem', border: 'none', cursor: 'pointer',
                  boxShadow: 'var(--shadow-lift)', transition: 'all 0.25s',
                  appearance: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-accent-glow)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-lift)'; }}
              >
                <MessageSquare size={14} /> Message Me
              </button>

              <button
                type="button"
                onClick={handleFollowClick}
                aria-pressed={followed}
                aria-haspopup="dialog"
                className="hero-action-btn"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '11px 22px', borderRadius: 9,
                  border: '1px solid var(--border-bright)',
                  background: followed ? 'var(--gradient-btn)' : 'var(--bg-card)',
                  color: followed ? 'var(--bg-base)' : 'var(--text-primary)',
                  fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer',
                  transition: 'all 0.25s', appearance: 'none',
                }}
                onMouseEnter={(e) => { if (!followed) e.currentTarget.style.borderColor = 'var(--accent-violet)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { if (!followed) e.currentTarget.style.borderColor = 'var(--border-bright)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {followed ? <Check size={14} /> : <UserPlus size={14} />}
                {followed ? 'Following' : 'Follow'}
              </button>

              <button
                type="button"
                onClick={() => setIsDark((d) => !d)}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                style={{
                  width: 40, height: 40, borderRadius: 9,
                  border: '1px solid var(--border-bright)', background: 'var(--bg-card)',
                  color: 'var(--text-primary)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.25s', flexShrink: 0,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-violet)'; e.currentTarget.style.transform = 'scale(1.06)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-bright)'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.18)}>
          <SkillHighlightsRow onSelect={openSkillStory} />
        </motion.div>

        <motion.div {...fadeUp(0.28)} style={{ marginTop: 44 }}>
          <ProfileTabs onSelectProject={(item, meta) => setSelectedProject({ item, meta })} />
        </motion.div>
      </div>

      <AboutMeStory
        isOpen={aboutStoryOpen}
        onClose={() => setAboutStoryOpen(false)}
        onMessageClick={() => setMessageOpen(true)}
        onConnectClick={() => setShowSocials(true)}
      />

      <SkillHighlightStory
        isOpen={skillStoryOpen}
        categoryId={skillStorySlideId}
        onClose={() => setSkillStoryOpen(false)}
      />

      <ConnectModal isOpen={showSocials} onClose={() => setShowSocials(false)} />

      <MessageModal isOpen={messageOpen} onClose={() => setMessageOpen(false)} />

      <ProjectCaseModal
        project={selectedProject?.item ?? null}
        meta={selectedProject?.meta ?? null}
        onClose={() => setSelectedProject(null)}
        onMessageClick={() => setMessageOpen(true)}
      />
    </section>
  );
}