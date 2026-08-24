// ===============================
// USESTORYPLAYER.TS — Shared Instagram-style story logic: auto-advancing
// progress bars, pause/resume, and swipe navigation. Both AboutMeStory
// and SkillHighlightStory use this so the timer logic only lives once.
// ===============================

import { useState, useEffect, useRef, type TouchEvent } from 'react';

export interface StoryPlayerSlide {
  id: string;
  duration?: number;
}

interface UseStoryPlayerOptions {
  isOpen: boolean;
  initialIndex?: number;
  onClose: () => void;
}

export function useStoryPlayer(slides: StoryPlayerSlide[], { isOpen, initialIndex = 0, onClose }: UseStoryPlayerOptions) {
  const [slideIndex, setSlideIndex] = useState(initialIndex);
  const [isPaused, setIsPaused] = useState(false);

  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const startTimeRef = useRef<number | null>(null);
  const remainingRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const totalSlides = slides.length;

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Jump to the requested starting slide every time the story opens.
  useEffect(() => {
    if (isOpen) {
      setSlideIndex(initialIndex);
      setIsPaused(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const goNext = () => {
    setSlideIndex((i) => {
      if (i >= totalSlides - 1) {
        onClose();
        return i;
      }
      return i + 1;
    });
  };

  const goPrev = () => setSlideIndex((i) => Math.max(0, i - 1));

  const handleTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  const handlePauseToggle = () => {
    setIsPaused((prev) => {
      const next = !prev;
      const bar = progressRefs.current[slideIndex];
      if (next) {
        clearTimeout(timeoutRef.current);
        if (startTimeRef.current != null && remainingRef.current != null) {
          const elapsed = Date.now() - startTimeRef.current;
          remainingRef.current = Math.max(0, remainingRef.current - elapsed);
        }
        if (bar) {
          const currentWidth = bar.getBoundingClientRect().width;
          const trackWidth = bar.parentElement?.getBoundingClientRect().width || 1;
          const pct = Math.min(100, (currentWidth / trackWidth) * 100);
          bar.style.transition = 'none';
          bar.style.width = `${pct}%`;
        }
      } else {
        const remaining = remainingRef.current;
        if (remaining && remaining > 0) {
          startTimeRef.current = Date.now();
          if (bar) {
            requestAnimationFrame(() => {
              bar.style.transition = `width ${remaining / 1000}s linear`;
              bar.style.width = '100%';
            });
          }
          timeoutRef.current = setTimeout(goNext, remaining);
        }
      }
      return next;
    });
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    clearTimeout(timeoutRef.current);
    const duration = slides[slideIndex]?.duration;
    const bar = progressRefs.current[slideIndex];

    if (!duration) {
      if (bar) {
        bar.style.transition = 'none';
        bar.style.width = '100%';
      }
      return undefined;
    }

    remainingRef.current = duration;
    startTimeRef.current = Date.now();

    if (bar) {
      bar.style.transition = 'none';
      bar.style.width = '0%';
      void bar.offsetWidth;
    }

    if (isPausedRef.current) return undefined;

    if (bar) {
      requestAnimationFrame(() => {
        bar.style.transition = `width ${duration / 1000}s linear`;
        bar.style.width = '100%';
      });
    }
    timeoutRef.current = setTimeout(goNext, duration);
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, slideIndex]);

  return {
    slideIndex,
    isPaused,
    totalSlides,
    progressRefs,
    goNext,
    goPrev,
    handlePauseToggle,
    handleTouchStart,
    handleTouchEnd,
  };
}
