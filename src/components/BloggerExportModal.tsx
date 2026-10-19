import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Download,
  Code2,
  ExternalLink,
  Sliders,
  HelpCircle,
  FileCode,
} from 'lucide-react';

interface BloggerExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BloggerExportModal: React.FC<BloggerExportModalProps> = ({ isOpen, onClose }) => {
  const [siteName, setSiteName] = useState('VelvetNoir');
  const [accentTheme, setAccentTheme] = useState<'purple' | 'crimson' | 'amber'>('purple');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'instructions' | 'placeholders'>('code');

  if (!isOpen) return null;

  const getPrimaryColor = () => {
    switch (accentTheme) {
      case 'crimson':
        return '#e11d48';
      case 'amber':
        return '#d97706';
      default:
        return '#8b5cf6';
    }
  };

  const codeTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- ==========================================
       PLACEHOLDER: SEO_TITLE & DESCRIPTION
       ========================================== -->
  <title>${siteName} | Premium Entertainment & Cinema</title>
  <meta name="description" content="${siteName} - Modern premium 4K entertainment platform featuring curated releases, consenting adult productions, and high-dynamic-range cinema.">
  <meta name="robots" content="index, follow">

  <!-- Typography: Plus Jakarta Sans & Cinzel -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

  <style>
    :root {
      --bg-canvas: #09090d;
      --bg-surface: #11111a;
      --bg-surface-card: #14141f;
      --border-subtle: #242436;
      --text-main: #f1f5f9;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      --accent-main: ${getPrimaryColor()};
      --accent-gradient: linear-gradient(135deg, ${getPrimaryColor()} 0%, #e11d48 100%);
      --radius-md: 12px;
      --font-body: 'Plus Jakarta Sans', system-ui, sans-serif;
      --font-display: 'Cinzel', serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg-canvas); color: var(--text-main); font-family: var(--font-body); line-height: 1.5; }
    a { color: inherit; text-decoration: none; }
    button { font-family: inherit; cursor: pointer; border: none; background: none; }
    .container { width: 100%; max-width: 1360px; margin: 0 auto; padding: 0 1.25rem; }

    /* Age Gate Overlay */
    .age-gate { position: fixed; inset: 0; z-index: 9999; background: rgba(5,5,8,0.95); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
    .age-gate.hidden { display: none; }
    .age-box { background: var(--bg-surface); border: 1px solid #36224c; border-radius: 16px; max-width: 500px; width: 100%; padding: 2rem; text-align: center; }
    .age-badge { display: inline-block; padding: 0.25rem 0.75rem; background: rgba(225,29,72,0.15); border: 1px solid rgba(225,29,72,0.3); color: #fda4af; border-radius: 999px; font-size: 0.75rem; font-weight: 700; margin-bottom: 1rem; }
    .age-btn-enter { padding: 0.75rem 1.5rem; background: var(--accent-gradient); color: #fff; border-radius: 10px; font-weight: 700; font-size: 0.875rem; }
    .age-btn-exit { padding: 0.75rem 1.5rem; background: #1c1c2b; border: 1px solid #33334d; color: var(--text-muted); border-radius: 10px; font-weight: 600; font-size: 0.875rem; }

    /* Header (3-Zone Contract) */
    .site-header { position: sticky; top: 0; z-index: 100; background: rgba(9,9,13,0.92); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border-subtle); }
    .header-inner { display: flex; align-items: center; justify-content: space-between; height: 72px; gap: 2rem; }
    .brand-logo { font-family: var(--font-display); font-size: 1.4rem; font-weight: 900; letter-spacing: 0.08em; color: #fff; }
    .nav-links { display: flex; align-items: center; gap: 1.75rem; }
    .nav-link { font-size: 0.875rem; font-weight: 500; color: var(--text-muted); }
    .nav-link:hover { color: #fff; }
    .search-input { width: 220px; background: #141420; border: 1px solid var(--border-subtle); border-radius: 999px; padding: 0.5rem 1rem; font-size: 0.8125rem; color: #fff; outline: none; }

    /* Hero */
    .hero-section { padding: 2rem 0; }
    .hero-card { position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 21/9; min-height: 380px; background: #11111a; border: 1px solid var(--border-subtle); display: flex; align-items: flex-end; }
    .hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: brightness(0.85); }
    .hero-scrim { position: absolute; inset: 0; background: linear-gradient(to top, rgba(9,9,13,0.98) 0%, rgba(9,9,13,0.5) 50%, transparent 100%); }
    .hero-content { position: relative; z-index: 10; padding: 2.5rem; max-width: 750px; }
    .hero-title { font-size: clamp(1.75rem, 3.5vw, 2.75rem); font-weight: 800; color: #fff; margin-bottom: 0.5rem; }

    /* Categories */
    .category-bar { display: flex; gap: 0.6rem; overflow-x: auto; padding: 1rem 0; }
    .category-btn { padding: 0.5rem 1.1rem; border-radius: 999px; font-size: 0.8125rem; font-weight: 600; background: #13131e; border: 1px solid var(--border-subtle); color: var(--text-muted); }
    .category-btn.active { background: var(--accent-main); color: #fff; }

    /* Cards Grid */
    .video-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1.5rem; }
    .video-card { background: var(--bg-surface-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden; transition: 0.25s; cursor: pointer; }
    .video-card:hover { transform: translateY(-4px); border-color: var(--accent-main); }
    .card-thumb-wrap { position: relative; aspect-ratio: 16/9; background: #000; overflow: hidden; }
    .card-thumb { width: 100%; height: 100%; object-fit: cover; }
    .badge-dur { position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.8); color: #fff; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; }
    .card-body { padding: 1rem; }
    .card-title { font-size: 0.9375rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem; }
    .card-desc { font-size: 0.75rem; color: var(--text-muted); line-height: 1.4; }

    /* Footer */
    .site-footer { background: #060609; border-top: 1px solid var(--border-subtle); padding: 3rem 0; margin-top: 4rem; font-size: 0.8125rem; color: var(--text-dim); }
  </style>
</head>
<body>

  <!-- Age Gate -->
  <div id="ageGate" class="age-gate">
    <div class="age-box">
      <div class="age-badge">RESTRICTED · 18+ ADULTS ONLY</div>
      <!-- PLACEHOLDER: WEBSITE_NAME -->
      <h2 style="font-size: 1.75rem; color: #fff; margin-bottom: 0.5rem;">${siteName}</h2>
      <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1.5rem;">
        This platform contains mature adult entertainment intended exclusively for consenting adults aged 18+.
      </p>
      <div style="display: flex; gap: 0.75rem; justify-content: center;">
        <button class="age-btn-exit" onclick="window.location.href='https://www.google.com'">Exit</button>
        <button class="age-btn-enter" onclick="confirmAge()">I Am 18+ · Enter</button>
      </div>
    </div>
  </div>

  <!-- Header -->
  <header class="site-header">
    <div class="container header-inner">
      <!-- PLACEHOLDER: LOGO_TEXT -->
      <a href="#" class="brand-logo">${siteName.toUpperCase()}<span>.</span></a>
      <nav class="nav-links">
        <a href="#featured" class="nav-link">Featured</a>
        <a href="#trending" class="nav-link">Trending</a>
        <a href="#compliance" class="nav-link">18 U.S.C. 2257</a>
      </nav>
      <div>
        <input type="text" class="search-input" placeholder="Search..." oninput="searchPosts(this.value)">
      </div>
    </div>
  </header>

  <!-- Hero -->
  <div class="container hero-section" id="featured">
    <div class="hero-card">
      <!-- PLACEHOLDER: HERO_IMAGE_URL -->
      <img class="hero-bg" src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80" alt="Hero">
      <div class="hero-scrim"></div>
      <div class="hero-content">
        <div style="color: var(--accent-main); font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">★ Featured Premiere</div>
        <!-- PLACEHOLDER: HERO_HEADLINE -->
        <h1 class="hero-title">Midnight Velvet: The Penthouse Sessions</h1>
        <p style="color: #cbd5e1; font-size: 0.875rem; margin-bottom: 1rem;">Experience atmospheric penthouse cinema in 4K HDR quality.</p>
        <button style="padding: 0.75rem 1.75rem; background: var(--accent-gradient); color: #fff; border-radius: 8px; font-weight: 700;" onclick="alert('Playing full release...')">Watch Now</button>
      </div>
    </div>
  </div>

  <!-- Categories -->
  <div class="container">
    <div class="category-bar">
      <!-- PLACEHOLDER: CATEGORIES_LIST -->
      <button class="category-btn active" onclick="filterPosts('all', this)">All</button>
      <button class="category-btn" onclick="filterPosts('VIP', this)">VIP Premiere</button>
      <button class="category-btn" onclick="filterPosts('Cinema', this)">Cinema Noir</button>
      <button class="category-btn" onclick="filterPosts('Glamour', this)">Glamour & Style</button>
      <button class="category-btn" onclick="filterPosts('Romance', this)">Midnight Romance</button>
    </div>

    <!-- Video Grid -->
    <div class="video-grid" id="postsGrid">
      <!-- PLACEHOLDER: POST_ITEM_LOOP_START -->
      <div class="video-card" data-cat="VIP" data-title="Midnight Velvet">
        <div class="card-thumb-wrap">
          <img class="card-thumb" src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80" alt="Card">
          <span class="badge-dur">42:15</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">Midnight Velvet: Penthouse Sessions</h3>
          <p class="card-desc">Atmospheric penthouse lounge views and intimate champagne night.</p>
        </div>
      </div>

      <div class="video-card" data-cat="Cinema" data-title="Venice Masquerade">
        <div class="card-thumb-wrap">
          <img class="card-thumb" src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80" alt="Card">
          <span class="badge-dur">36:40</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">The Venice Masquerade: Midnight Ball</h3>
          <p class="card-desc">Theatrical ballroom costumes and mysterious classical score.</p>
        </div>
      </div>

      <div class="video-card" data-cat="Glamour" data-title="Satin and Amber">
        <div class="card-thumb-wrap">
          <img class="card-thumb" src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80" alt="Card">
          <span class="badge-dur">29:50</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">Satin & Amber: Private Studio Haute</h3>
          <p class="card-desc">Sensual high-fashion studio editorial with dramatic lighting.</p>
        </div>
      </div>
      <!-- PLACEHOLDER: POST_ITEM_LOOP_END -->
    </div>
  </div>

  <!-- Footer & Compliance -->
  <footer class="site-footer" id="compliance">
    <div class="container" style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div>
          <!-- PLACEHOLDER: WEBSITE_NAME -->
          <div style="font-family: var(--font-display); font-size: 1.2rem; color: #fff; font-weight: 800;">${siteName.toUpperCase()}</div>
          <p style="max-width: 400px; margin-top: 0.5rem;">High-fidelity adult entertainment featuring consenting adults. Strictly 18+.</p>
        </div>
        <div>
          <div style="font-weight: 700; color: #fff; margin-bottom: 0.5rem;">Compliance</div>
          <p>18 U.S.C. 2257 Record-Keeping Notice</p>
          <p>DMCA Copyright Takedown Procedure</p>
          <p>Strict Anti-Exploitation Policy</p>
        </div>
      </div>
      <div style="border-top: 1px solid var(--border-subtle); padding-top: 1rem; display: flex; justify-content: space-between; flex-wrap: wrap; font-size: 0.75rem;">
        <span>&copy; ${siteName} Media. All rights reserved.</span>
        <span>18+ Consenting Adults Only</span>
      </div>
    </div>
  </footer>

  <script>
    function confirmAge() {
      localStorage.setItem('velvetnoir_age_verified', 'true');
      document.getElementById('ageGate').classList.add('hidden');
    }
    if (localStorage.getItem('velvetnoir_age_verified') === 'true') {
      document.getElementById('ageGate').classList.add('hidden');
    }
    function filterPosts(cat, btn) {
      if (btn) {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
      document.querySelectorAll('.video-card').forEach(c => {
        c.style.display = (cat === 'all' || c.getAttribute('data-cat') === cat) ? 'block' : 'none';
      });
    }
    function searchPosts(q) {
      const query = q.toLowerCase();
      document.querySelectorAll('.video-card').forEach(c => {
        const title = (c.getAttribute('data-title') || '').toLowerCase();
        c.style.display = title.includes(query) ? 'block' : 'none';
      });
    }
  </script>
</body>
</html>`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(codeTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([codeTemplate], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${siteName.toLowerCase().replace(/\s+/g, '-')}-blogger-template.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-8 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0c0c14] border border-[#2d2044] rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-200">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#12121e] border-b border-[#232336]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Single-File Blogger HTML Generator</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 font-mono">
                  Ready to Paste
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Self-contained HTML5, CSS3, &amp; Vanilla JS with customizable placeholders.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customization Controls Strip */}
        <div className="px-6 py-3 bg-[#151522] border-b border-[#242438] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-slate-400" />
              <span className="font-semibold text-slate-300">Site Name:</span>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="bg-[#1c1c2b] border border-[#33334d] rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-purple-500 w-36"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300">Brand Color:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setAccentTheme('purple')}
                  className={`w-6 h-6 rounded-full bg-purple-600 border-2 transition-transform ${
                    accentTheme === 'purple' ? 'border-white scale-110 ring-2 ring-purple-500/50' : 'border-transparent'
                  }`}
                  title="Electric Velvet Purple"
                />
                <button
                  onClick={() => setAccentTheme('crimson')}
                  className={`w-6 h-6 rounded-full bg-rose-600 border-2 transition-transform ${
                    accentTheme === 'crimson' ? 'border-white scale-110 ring-2 ring-rose-500/50' : 'border-transparent'
                  }`}
                  title="Crimson Rose"
                />
                <button
                  onClick={() => setAccentTheme('amber')}
                  className={`w-6 h-6 rounded-full bg-amber-600 border-2 transition-transform ${
                    accentTheme === 'amber' ? 'border-white scale-110 ring-2 ring-amber-500/50' : 'border-transparent'
                  }`}
                  title="Gold Amber"
                />
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-950/40'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied HTML!' : 'Copy Entire HTML'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#202033] hover:bg-[#2b2b42] text-slate-200 text-xs font-semibold border border-[#373752] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .html</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#202030] bg-[#0e0e17] px-6">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'code'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Complete HTML Source</span>
          </button>

          <button
            onClick={() => setActiveTab('instructions')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'instructions'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Blogger Integration Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('placeholders')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'placeholders'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Placeholders Reference</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#08080d]">
          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Standalone single-file template (CSS &amp; JS included)</span>
                <span className="font-mono text-[11px] text-purple-400">
                  {codeTemplate.split('\n').length} lines · UTF-8
                </span>
              </div>
              <pre className="p-4 bg-[#050508] border border-[#1e1e2d] rounded-xl text-xs font-mono text-slate-300 overflow-x-auto select-all max-h-[50vh] leading-relaxed">
                <code>{codeTemplate}</code>
              </pre>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="space-y-4 max-w-2xl text-xs sm:text-sm text-slate-300">
              <h3 className="text-base font-bold text-white">How to Install in Google Blogger</h3>
              
              <div className="p-4 bg-[#11111a] border border-[#242436] rounded-xl space-y-3">
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-600/20 text-purple-400 font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </span>
                  <div>
                    <strong className="text-white">Log into Blogger &amp; Back Up Theme:</strong>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Navigate to <span className="font-mono text-purple-300">blogger.com</span> &gt; Choose your Blog &gt; Go to <strong>Theme</strong> tab. Click the three dots next to &quot;Customize&quot; &gt; <strong>Backup</strong> so you have your existing blog safe.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-600/20 text-purple-400 font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </span>
                  <div>
                    <strong className="text-white">Edit Theme HTML:</strong>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Click the three dots next to &quot;Customize&quot; &gt; Select <strong>Edit HTML</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-600/20 text-purple-400 font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </span>
                  <div>
                    <strong className="text-white">Paste the Generated Code:</strong>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Copy the code using the &quot;Copy Entire HTML&quot; button above, paste it into the Blogger HTML editor (or inside a Page / HTML Gadget), and click <strong>Save</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-600/20 text-purple-400 font-bold flex items-center justify-center shrink-0 text-xs">
                    4
                  </span>
                  <div>
                    <strong className="text-white">Adult Content Flag in Blogger Settings:</strong>
                    <p className="text-xs text-slate-400 mt-0.5">
                      In Blogger Dashboard &gt; <strong>Settings</strong> &gt; Under &quot;Adult Content&quot;, toggle <strong>&quot;Show warning to blog readers&quot;</strong> and <strong>&quot;Require age confirmation&quot;</strong> to ensure full Blogger terms compliance alongside our built-in 18+ modal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'placeholders' && (
            <div className="space-y-4 max-w-2xl text-xs sm:text-sm text-slate-300">
              <h3 className="text-base font-bold text-white">Placeholder Customization Reference</h3>
              <p className="text-xs text-slate-400">
                You can easily find and replace these placeholders in any text editor before publishing:
              </p>

              <div className="space-y-2">
                <div className="p-3 bg-[#11111a] border border-[#222232] rounded-xl flex flex-col gap-1">
                  <span className="font-mono text-purple-400 text-xs">&lt;!-- PLACEHOLDER: WEBSITE_NAME --&gt;</span>
                  <span className="text-xs text-slate-300">Replaces site brand name across header, age gate, and footer.</span>
                </div>

                <div className="p-3 bg-[#11111a] border border-[#222232] rounded-xl flex flex-col gap-1">
                  <span className="font-mono text-purple-400 text-xs">&lt;!-- PLACEHOLDER: HERO_BACKGROUND_IMAGE --&gt;</span>
                  <span className="text-xs text-slate-300">URL to your featured release banner (1920x1080 recommended).</span>
                </div>

                <div className="p-3 bg-[#11111a] border border-[#222232] rounded-xl flex flex-col gap-1">
                  <span className="font-mono text-purple-400 text-xs">&lt;!-- PLACEHOLDER: POST_ITEM_START --&gt;</span>
                  <span className="text-xs text-slate-300">Wrap each video release in this block. Set data-category and data-title for auto-filtering.</span>
                </div>

                <div className="p-3 bg-[#11111a] border border-[#222232] rounded-xl flex flex-col gap-1">
                  <span className="font-mono text-purple-400 text-xs">&lt;!-- PLACEHOLDER: CATEGORIES_LIST --&gt;</span>
                  <span className="text-xs text-slate-300">Category buttons matching your post categories.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
