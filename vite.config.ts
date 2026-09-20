import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import vinext from "vinext";
import { defineConfig } from "vite";
import { readExecutionProfile } from "./scripts/execution-profile.mjs";
import { sites } from "./build/sites-vite-plugin";

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";
const managedLinux = readExecutionProfile() === "managed-linux";

export default defineConfig({
  server: {
    ...(managedLinux ? { host: "0.0.0.0", allowedHosts: ["terminal.local"] } : {}),
    ...(isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : {}),
  },
  // Use @tailwindcss/vite so `@import "tailwindcss"` resolves as a package,
  // not a local file (Vite postcss-import would look for ./tailwindcss).
  plugins: [
    tailwindcss(),
    vinext(),
    sites({ mockAuth: !managedLinux }),
    nitro(),
  ],
});
