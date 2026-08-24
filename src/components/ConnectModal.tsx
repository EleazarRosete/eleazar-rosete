// ===============================
// CONNECTMODAL.TSX — "Let's Connect" modal showing social/contact cards.
// Cards themselves come from src/data/profile.ts (SOCIAL_LINKS).
// ===============================

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SOCIAL_LINKS } from '@/data/profile';
import { cardVariants } from '@/theme/animations';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="connect-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Connect with Eleazar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 420, borderRadius: 20,
              background: 'var(--bg-base)', border: '1px solid var(--border-bright)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
              padding: '28px 26px 26px', position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 600, letterSpacing: '-0.01em', margin: 0, color: 'var(--text-primary)' }}>
                  Let's Connect
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>Reach out on any of these</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {SOCIAL_LINKS.map((link, i) => {
                const isOdd = SOCIAL_LINKS.length % 2 === 1;
                const isLast = i === SOCIAL_LINKS.length - 1;
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -3 }}
                    style={{
                      gridColumn: isOdd && isLast ? '1 / -1' : 'auto',
                      display: 'flex', flexDirection: 'column', gap: 10,
                      padding: '16px 14px', borderRadius: 14,
                      border: '1px solid var(--border)', background: 'var(--bg-card)',
                      textDecoration: 'none', color: 'var(--text-primary)',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-violet)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                  >
                    <span style={{
                      width: 38, height: 38, borderRadius: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-primary)', background: 'var(--bg-base)',
                      border: '1px solid var(--border)',
                    }}>
                      <Icon size={19} />
                    </span>
                    <span>
                      <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600 }}>{link.label}</span>
                      <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{link.value}</span>
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
