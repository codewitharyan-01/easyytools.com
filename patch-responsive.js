const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Aryan\\Desktop\\Idea';

// ─── Per-file patches (style block injection + HTML transforms) ───────────────

const patches = {

  'youtube-title-generator.html': {
    // title-card: stack copy btn on mobile
    styleAppend: `
        @media (max-width: 640px) {
            .title-card { flex-direction: column; align-items: flex-start; }
            .copy-btn   { width: 100%; text-align: center; }
            .title-text { font-size: 1rem; }
        }`,
    // Remove JS-only responsive shim (none here), nothing else
  },

  'hashtag-generator.html': {
    styleAppend: `
        @media (max-width: 640px) {
            .output-box { padding: 1rem; font-size: 1rem; }
            #results-wrapper > div { flex-direction: column; }
            #results-wrapper > div .btn-prestige,
            #results-wrapper > div .btn-secondary { width: 100%; }
        }`,
  },

  'utm-builder.html': {
    // Remove the JS grid hack at bottom, rely on CSS
    removeJsHack: true,
    styleAppend: `
        @media (max-width: 768px) {
            #result { font-size: 0.95rem; }
        }`,
  },

  'lorem-ipsum.html': {
    styleAppend: `
        @media (max-width: 640px) {
            .search-input { font-size: 1rem !important; }
        }`,
  },

  'meme-generator.html': {
    styleAppend: `
        @media (max-width: 640px) {
            .canvas-container { min-height: 200px; padding: 0.5rem; }
        }`,
  },

  'text-to-pdf.html': {
    styleAppend: `
        @media (max-width: 640px) {
            #pdfTitle, #pdfContent { font-size: 1rem !important; }
            #pdfContent { height: 260px !important; }
        }`,
  },

  'text-to-speech.html': {
    removeJsHack: false,
    styleAppend: `
        @media (max-width: 640px) {
            .control-group { flex-wrap: wrap; }
            .control-group label { min-width: unset; width: 100%; margin-bottom: 0.25rem; }
            .val-display { width: auto; }
        }`,
  },

  'voice-typing.html': {
    styleAppend: `
        @media (max-width: 640px) {
            #statusText { font-size: 0.95rem; }
            #startBtn, #stopBtn { padding: 0.7rem 1rem !important; font-size: 0.9rem !important; }
            #transcript { height: 280px !important; font-size: 1rem !important; }
            /* Stack the top bar */
            .voice-topbar { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
        }`,
    // Also add class to the top bar div
    htmlReplaces: [
      {
        from: `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">`,
        to:   `<div class="voice-topbar" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.75rem;">`
      }
    ]
  },

  'bmr-calculator.html': {
    styleAppend: `
        @media (max-width: 640px) {
            #bmrResult { font-size: 2.2rem !important; }
        }`,
  },

  'discount-calculator.html': {
    styleAppend: `
        @media (max-width: 640px) {
            #finalPrice { font-size: 2.5rem !important; }
        }`,
  },

  'password-strength.html': {
    styleAppend: `
        @media (max-width: 640px) {
            .req-list { grid-template-columns: 1fr; }
            .toggle-btn { right: 10px; font-size: 0.75rem; }
        }`,
  },

  'jwt-decoder.html': {
    removeJsHack: true,
    styleAppend: `
        @media (max-width: 640px) {
            .json-box { font-size: 0.9rem; }
            .section-label { font-size: 0.95rem; }
        }`,
  },

  'html-beautifier.html': {
    styleAppend: `
        @media (max-width: 640px) {
            .header-label { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
            textarea.code-area { height: 280px; }
        }`,
  },

  'color-converter.html': {
    styleAppend: `
        @media (max-width: 640px) {
            .color-preview { height: 160px !important; font-size: 1.4rem !important; }
            #hexInput, #rgbInput { font-size: 1.1rem !important; }
        }`,
  },

  'fake-data-generator.html': {
    removeJsHack: true,
    styleAppend: `
        @media (max-width: 640px) {
            .output-format { flex-direction: column; }
            .format-btn { width: 100%; }
            #outputArea { min-height: 300px !important; }
        }`,
  },
};

// ── Global responsive injection added to ALL 15 files ────────────────────────

const GLOBAL_MOBILE_CSS = `
        /* ── Global responsive tweaks ────────────────────────────────────── */
        @media (max-width: 768px) {
            .prestige-panel { padding: 1.75rem 1.25rem !important; border-radius: 20px !important; }
            .hero-title { margin-bottom: 1.5rem !important; }
            .ad-zone { margin: 2rem 0 !important; }
        }
        @media (max-width: 480px) {
            .prestige-panel { padding: 1.25rem 1rem !important; }
        }
`;

// ── JS shim pattern to remove ────────────────────────────────────────────────
const JS_SHIM_PATTERN = /\/\/ (?:Responsive|Mobile)\s[\s\S]{0,200}?\.style\.gridTemplateColumns\s*=\s*['"]1fr['"];?\s*/g;

// ── Main loop ────────────────────────────────────────────────────────────────

const targets = Object.keys(patches);
let updated = 0;

targets.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠  Skipping (not found): ${file}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf-8');

  const patch = patches[file];

  // 1. HTML string replacements
  if (patch.htmlReplaces) {
    patch.htmlReplaces.forEach(({ from, to }) => {
      html = html.replace(from, to);
    });
  }

  // 2. Remove JS shims
  if (patch.removeJsHack) {
    html = html.replace(JS_SHIM_PATTERN, '// responsive handled via CSS\n        ');
  }

  // 3. Inject CSS into the existing <style> block
  const styleBlock = patch.styleAppend || '';
  const combined = GLOBAL_MOBILE_CSS + styleBlock;

  // Insert before closing </style>
  if (html.includes('</style>')) {
    html = html.replace('</style>', combined + '\n    </style>');
  } else {
    // No <style> block exists, inject one
    html = html.replace('</head>', `    <style>${combined}\n    </style>\n</head>`);
  }

  fs.writeFileSync(filePath, html, 'utf-8');
  updated++;
  console.log(`✓  Updated ${file}`);
});

console.log(`\nDone — ${updated} files patched with full responsive CSS.`);
