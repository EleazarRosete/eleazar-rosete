import type { CSSProperties } from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: number;
  fallbackText?: string;
}

export default function Avatar({ src, alt, size = 30, fallbackText }: AvatarProps) {
  const containerStyle: CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid var(--accent-violet)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  };

  if (!src) {
    return (
      <div style={containerStyle}>
        <span style={{ fontSize: size * 0.23, fontWeight: 800, color: '#fff' }}>
          {fallbackText}
        </span>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </div>
  );
}