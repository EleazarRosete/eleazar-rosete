// ===============================
// MESSAGEMODAL.TSX — "Send a Message" contact form. Submits via mailto:
// to CONTACT_EMAIL (src/data/profile.ts). Swap the submit handler for a
// real API call later if you want a proper backend.
// ===============================

import { useState, type ChangeEvent, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail } from 'lucide-react';
import { CONTACT_EMAIL, PROJECT_TYPES } from '@/data/profile';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  fullName: string;
  email: string;
  projectType: string;
  message: string;
}

const emptyForm: FormState = { fullName: '', email: '', projectType: '', message: '' };

export default function MessageModal({ isOpen, onClose }: MessageModalProps) {
  const [form, setForm] = useState<FormState>(emptyForm);

  const handleChange = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    const subject = `New project inquiry from ${form.fullName || 'website visitor'}`;
    const bodyLines = [
      `Name: ${form.fullName}`,
      `Email: ${form.email}`,
      `Project type: ${form.projectType || 'Not specified'}`,
      '',
      form.message,
    ];
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailto;
    onClose();
    setForm(emptyForm);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="message-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Send a message"
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
            padding: 20, overflowY: 'auto',
          }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 460, borderRadius: 20,
              background: 'var(--bg-base)', border: '1px solid var(--border-bright)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
              padding: '28px 26px 26px', position: 'relative', margin: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 600, letterSpacing: '-0.01em', margin: 0, color: 'var(--text-primary)' }}>
                  Send a Message
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>Tell me a bit about your project</p>
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={fieldLabelStyle}>Full Name</label>
                <input type="text" required placeholder="John Doe" value={form.fullName} onChange={handleChange('fullName')} style={inputStyle} />
              </div>

              <div>
                <label style={fieldLabelStyle}>Email Address</label>
                <input type="email" required placeholder="johndoe@company.com" value={form.email} onChange={handleChange('email')} style={inputStyle} />
              </div>

              <div>
                <label style={fieldLabelStyle}>Project Type</label>
                <select
                  value={form.projectType}
                  onChange={handleChange('projectType')}
                  style={{ ...inputStyle, color: form.projectType ? 'var(--text-primary)' : 'var(--text-muted)', appearance: 'none', cursor: 'pointer' }}
                >
                  <option value="" disabled>Select a service...</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={fieldLabelStyle}>Tell me about your project</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your project, goals, and any relevant details..."
                  value={form.message}
                  onChange={handleChange('message')}
                  style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>

              <button type="button" onClick={handleSubmit} style={submitBtnStyle}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <Mail size={15} /> Send Message
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const fieldLabelStyle: CSSProperties = {
  display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 6,
};

const inputStyle: CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: 10,
  border: '1px solid var(--border)', background: 'var(--bg-card)',
  color: 'var(--text-primary)', fontSize: '0.86rem',
  outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
};

const submitBtnStyle: CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  width: '100%', padding: '13px 22px', borderRadius: 10,
  background: 'var(--gradient-btn)', color: 'var(--bg-base)',
  fontWeight: 600, fontSize: '0.88rem', border: 'none', cursor: 'pointer',
  boxShadow: '0 4px 20px rgba(0,0,0,0.4)', transition: 'all 0.25s',
  marginTop: 4, appearance: 'none',
};
