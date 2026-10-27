/**
 * Pre-render script — runs after `vite build`
 * Injects server-rendered HTML into dist/index.html so Google crawlers
 * see real content without executing JavaScript.
 *
 * Usage: node scripts/prerender.mjs
 */

import { createServer as createViteServer } from "vite";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

async function prerender() {
  console.log("⚙️  Pre-rendering homepage...");

  // Create a Vite SSR server (no browser, pure Node)
  const vite = await createViteServer({
    root,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "error",
  });

  try {
    // Load the server-side entry via Vite's module runner
    const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");

    // Render to HTML string
    const appHtml = render();

    // Read the built index.html from dist/
    const templatePath = resolve(root, "dist/index.html");
    let template = readFileSync(templatePath, "utf-8");

    // Inject rendered HTML into the root div
    const injected = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    writeFileSync(templatePath, injected);
    console.log("✅  Pre-render complete — dist/index.html now contains static HTML");
  } finally {
    await vite.close();
  }
}

prerender().catch((err) => {
  console.error("❌  Pre-render failed:", err);
  process.exit(1);
});
