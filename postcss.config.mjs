// Tailwind is handled by @tailwindcss/vite in vite.config.ts.
// Keep PostCSS config empty so Vite's postcss-import does not
// try to resolve `@import "tailwindcss"` as a local file.
const config = {
  plugins: {},
};

export default config;
