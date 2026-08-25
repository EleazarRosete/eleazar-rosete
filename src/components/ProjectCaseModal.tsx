// ===============================
// PROJECTCASEMODAL.TSX — Case study modal (Problem / Solution / Result)
// shown when a project tile is clicked. Content comes from whichever
// item was selected in src/data/projects.ts. Images are auto-loaded
// from src/assets/projects/<project-id>/ via src/lib/projectMedia.ts.
// ===============================

import { useState, useEffect, useRef, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ImageIcon, AlertCircle, Lightbulb, TrendingUp, ArrowRight, Briefcase, Quote, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import type { ProjectItem, TabMeta } from '@/data/projects';
import { getProjectGalleryImages } from '@/lib/projectMedia';
import { Icon } from '@iconify/react';
import { TOOL_ICON_MAP } from '@/data/projects';

interface ProjectCaseModalProps {
  project: ProjectItem | null;
  meta: TabMeta | null;
  onClose: () => void;
  onMessageClick: () => void;
}

const SLIDE_INTERVAL_MS = 4000;

export default function ProjectCaseModal({ project, meta, onClose, onMessageClick }: ProjectCaseModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const images = project ? getProjectGalleryImages(project.id) : [];

  // Reset to the first slide whenever a new project is opened.
  useEffect(() => {
    setActiveIndex(0);
    setIsPaused(false);
  }, [project?.id]);

  // Autoplay through the images every few seconds. Paused on hover.
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (isPaused || images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, images.length, project?.id]);

  const goNext = () => {
    if (images.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    if (images.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Case study: ${project.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 12, overflowY: 'auto',
          }}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 860, borderRadius: 20,
              background: 'var(--bg-base)', border: '1px solid var(--border-bright)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
              overflow: 'hidden', position: 'relative', margin: 'auto',
              display: 'flex', flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <span style={{
                  width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)',
                }}>
                  {(() => {
                    const ModalBadgeIcon = meta?.badgeIcon || Briefcase;
                    return <ModalBadgeIcon size={16} />;
                  })()}
                </span>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>{project.tag}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                style={{
                  width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                  border: '1px solid var(--border)', background: 'var(--bg-card)',
                  color: 'var(--text-secondary)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-violet)'; e.currentTarget.style.color = 'var(--accent-violet)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                <X size={14} />
              </button>
            </div>

            <style>{`
              .case-modal-body { grid-template-columns: 1fr 1fr; }
              .case-modal-media { border-right: 1px solid var(--border); border-bottom: none; }
              @media (max-width: 560px) {
                .case-modal-body { grid-template-columns: 1fr !important; max-height: none !important; }
                .case-modal-media { border-right: none !important; border-bottom: 1px solid var(--border); max-height: none !important; overflow-y: visible !important; }
                .case-modal-info { max-height: none !important; overflow-y: visible !important; }
              }
            `}</style>

            <div className="case-modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxHeight: '76vh' }}>
              <div
                className="case-modal-media"
                style={{ minWidth: 0, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', maxHeight: '76vh', overflowY: 'auto' }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div style={{
                  position: 'relative', width: '100%', aspectRatio: '1 / 1',
                  background: 'radial-gradient(circle at 50% 40%, var(--bg-card) 0%, var(--bg-base) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  {images.length > 0 ? (
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={images[activeIndex].url}
                        src={images[activeIndex].url}
                        alt={images[activeIndex].label || project.title}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        style={{
                          width: '100%', height: '100%',
                          objectFit: 'contain', objectPosition: 'center',
                          display: 'block',
                        }}
                      />
                    </AnimatePresence>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                      <ImageIcon size={40} color="var(--text-muted)" strokeWidth={1.3} />
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', padding: '0 20px', textAlign: 'center' }}>
                        Project proof goes here
                      </span>
                    </div>
                  )}

                  {images[activeIndex]?.label && (
                    <span style={{
                      position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
                      padding: '4px 12px', borderRadius: 20,
                      background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
                      fontSize: '0.7rem', color: '#fff', whiteSpace: 'nowrap',
                      maxWidth: '90%', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {images[activeIndex].label}
                    </span>
                  )}

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Previous image"
                        style={navArrowStyle('left')}
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        aria-label="Next image"
                        style={navArrowStyle('right')}
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}
                </div>

                {images.length > 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px 10px' }}>
                    {images.map((img, i) => {
                      const active = i === activeIndex;
                      return (
                        <button
                          key={img.url}
                          type="button"
                          onClick={() => setActiveIndex(i)}
                          aria-label={img.label ? `View ${img.label}` : `View image ${i + 1} of ${images.length}`}
                          aria-current={active}
                          style={{
                            width: active ? 20 : 6, height: 6, borderRadius: 4,
                            border: 'none', padding: 0, cursor: 'pointer', appearance: 'none',
                            background: active ? 'var(--gradient-btn)' : 'var(--border)',
                            transition: 'all 0.25s ease',
                          }}
                        />
                      );
                    })}
                  </div>
                )}

                {project.quote && (
                  <div style={{ padding: '4px 16px 18px' }}>
                    <div style={{ borderLeft: '2px solid var(--border-bright)', paddingLeft: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <Quote size={14} color="var(--text-muted)" />
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.55, margin: 0 }}>{project.quote}</p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{project.client}</span> — {project.role}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="case-modal-info" style={{ minWidth: 0, padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 18, maxHeight: '76vh', overflowY: 'auto' }}>
                <div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {meta?.fieldLabel || 'Client'}
                  </span>
                  <p style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)', margin: '4px 0 0' }}>
                    {project.client} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>— {project.role}</span>
                  </p>
                  {project.about && (
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '6px 0 0' }}>{project.about}</p>
                  )}
                </div>

                <CaseSection icon={AlertCircle} title="The Problem" body={project.problem || project.summary} />
                <CaseSection icon={Lightbulb} title="My Solution" body={project.solution || project.summary} />
                <CaseSection icon={TrendingUp} title="The Result" body={project.result || 'Result details coming soon.'} />

                {project.tools && project.tools.length > 0 && (
                  <div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Tools Used
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                      {project.tools.map((tool) => {
                        const iconStr = TOOL_ICON_MAP[tool];
                        if (!iconStr) return null;
                        return (
                          <span
                            key={tool}
                            title={tool}
                            style={{
                              width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                              background: 'var(--bg-card)', border: '1px solid var(--border)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                          >
                            <Icon icon={iconStr} width={16} height={16} />
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 4 }}>
                  <button
                    type="button"
                    onClick={() => { onClose(); onMessageClick(); }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      padding: '11px 20px', borderRadius: 10,
                      background: 'var(--gradient-btn)', color: 'var(--bg-base)',
                      fontWeight: 600, fontSize: '0.82rem', border: 'none', cursor: 'pointer',
                      appearance: 'none', transition: 'transform 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    {meta?.ctaLabel || 'Start a similar project'} <ArrowRight size={13} />
                  </button>

                  {project.hasLink && project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        padding: '11px 20px', borderRadius: 10,
                        background: 'var(--bg-card)', color: 'var(--text-primary)',
                        fontWeight: 600, fontSize: '0.82rem', border: '1px solid var(--border-bright)',
                        cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-violet)'; e.currentTarget.style.color = 'var(--accent-violet)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-bright)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                    >
                      Visit<ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CaseSection({ icon: Icon, title, body }: { icon: typeof AlertCircle; title: string; body: string | string[] }) {
  const items = Array.isArray(body) ? body : null;

  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <span style={{
        width: 26, height: 26, borderRadius: 8, flexShrink: 0, marginTop: 1,
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={13} color="var(--text-primary)" />
      </span>
      <div style={{ minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>{title}</span>
        {items ? (
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {items.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{
                  width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                  marginTop: 7, background: 'var(--accent-violet)',
                }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>{body}</p>
        )}
      </div>
    </div>
  );
}

function navArrowStyle(side: 'left' | 'right'): CSSProperties {
  return {
    position: 'absolute', [side]: 8, top: '50%', transform: 'translateY(-50%)',
    width: 32, height: 32, borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.18)',
    background: 'rgba(0,0,0,0.4)',
    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', appearance: 'none', padding: 0,
    transition: 'background 0.2s',
  };
}