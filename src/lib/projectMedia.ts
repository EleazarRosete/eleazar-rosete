// ===============================
// PROJECTMEDIA.TS — Auto-loads every image inside
// src/assets/<project-id>/ and exposes them sorted by filename,
// with a display label derived straight from the filename.
//
// HOW TO ADD IMAGES: drop a file into that project's folder, e.g.
//   src/assets/simple-serve/Simple Serve homepage.png
// The filename (minus extension) becomes the caption shown in the
// case study modal — name it exactly how you want it to read.
// Dashes/underscores are turned into spaces automatically, so
// "checkout-flow.png" also displays as "checkout flow".
//
// The first image alphabetically becomes the grid thumbnail;
// all images become the case-study slideshow, in that order.
// (Tip: prefix filenames with 01-, 02-, etc. if you want a specific
// order — the numbers won't show up in the caption.)
// ===============================

export interface ProjectImage {
  url: string;
  label: string;
}

const modules = import.meta.glob<{ default: string }>(
  '/src/assets/*/*.{png,jpg,jpeg,webp,gif}',
  { eager: true }
);

// projectId -> sorted list of images (url + readable label)
const projectImageMap: Record<string, ProjectImage[]> = {};

for (const path in modules) {
  // path looks like: /src/assets/simple-serve/Simple Serve homepage.png
  const match = path.match(/\/src\/assets\/([^/]+)\/([^/]+)$/);
  if (!match) continue;
  const projectId = match[1];
  const filename = match[2];
  const url = modules[path].default;

  const label = filename
    .replace(/\.[^.]+$/, '')          // strip extension
    .replace(/^\d+[-_.\s]*/, '')      // strip a leading order prefix like "01-"
    .replace(/[-_]+/g, ' ')           // dashes/underscores -> spaces
    .trim();

  if (!projectImageMap[projectId]) projectImageMap[projectId] = [];
  projectImageMap[projectId].push({ url, label });
}

// Sort each project's images by original filename for a predictable order.
for (const id in projectImageMap) {
  projectImageMap[id].sort((a, b) => a.url.localeCompare(b.url));
}

export function getProjectImages(projectId: string): ProjectImage[] {
  return projectImageMap[projectId] || [];
}

// Same as getProjectImages, but leaves out the file named "thumbnail" —
// used by the case study modal so the grid-only cover shot doesn't
// also show up again in the slideshow.
export function getProjectGalleryImages(projectId: string): ProjectImage[] {
  return getProjectImages(projectId).filter((img) => img.label.toLowerCase() !== 'thumbnail');
}

export function getProjectThumbnail(projectId: string): string | undefined {
  const images = getProjectImages(projectId);
  const named = images.find((img) => img.label.toLowerCase() === 'thumbnail');
  return (named || images[0])?.url;
}