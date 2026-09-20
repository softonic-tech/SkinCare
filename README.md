# NYVA SKIN

Complete React + TypeScript skincare website, including all 20 supplied products and the five-product animated hero.

## Run locally
1. Install Node.js 22.13 or newer.
2. Install pnpm 11.25.0: `npm install -g pnpm@11.25.0`.
3. Open this folder in Cursor or VS Code.
4. Run `pnpm install --frozen-lockfile`.
5. Run `pnpm dev` and open http://localhost:5173.

## Build
Run `pnpm build`. The project uses Vinext (React/Next-compatible routing on Vite) and produces a Cloudflare Worker build. Deploying elsewhere requires adapting the hosting configuration.

## Edit
- `components/nyva-hero.tsx`: five floating products, pointer tilt, scroll movement, pause control, reduced-motion support.
- `components/nyva.tsx`: full product list and landing-page sections.
- `app/page.tsx`: page composition, search, product details and browsing bag.
- `app/globals.css`: typography, light/dark themes, responsive layout and hero styling.
- `public/images`: all included imagery.

Hero animation uses transparent product images with CSS 3D transforms and Framer Motion; it does not include 3D mesh models. Packaging images are illustrative. Real prices, formulas, checkout, newsletter delivery and contact accounts are not connected. Font loading uses Google Fonts and needs internet access.

The source passed TypeScript and production build checks. Browser visual testing was unavailable in the authoring environment.
