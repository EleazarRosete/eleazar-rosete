// ===============================
// ANIMATIONS.TS — Shared framer-motion variants used across components.
// ===============================

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.06, type: 'spring' as const, stiffness: 380, damping: 24 },
  }),
};

export const storyItemVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.25 + i * 0.16, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export const chipVariants = {
  hidden: { opacity: 0, y: 6, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  }),
};
