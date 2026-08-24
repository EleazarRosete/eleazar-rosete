// ===============================
// APP.TSX — Main Application Shell
// Add new sections here as one-line imports. Nothing else in this
// file should need to change when you edit content — content lives
// in src/data/*.
// ===============================

import HeroSection from './sections/HeroSection';

export default function App() {
  return (
    <>
      <HeroSection />
      {/* Next sections (About, Projects overview, Services, etc.)
          get added here the same way, once you build them. */}
    </>
  );
}
