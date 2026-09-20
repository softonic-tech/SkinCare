/**
 * Database access was originally wired to Cloudflare D1.
 * This project now targets Vercel via Nitro; wire a Vercel-compatible
 * database (Postgres, Turso, etc.) before calling getDb().
 */
export function getDb(): never {
  throw new Error(
    "Database is not configured for Vercel. Replace db/index.ts with a Vercel-compatible client before using getDb().",
  );
}
