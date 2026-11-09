import React, { useState, useEffect } from 'react';

/**
 * Architectural Developer Blueprint Panels (Apple / Drafting Studio Style)
 * Arun M's Live Engineering Architecture:
 * - HTML5 Semantic DOM Structure Wireframe (Top-Right)
 * - CSS3 Modern Design System & GPU Compositor Engine (Top-Left)
 * - Central React 19 Component Motherboard with Mini OLED/LED Screen (Center)
 * - React Hooks & State Management Architecture (Mid-Left)
 * - REST API & Database Pipeline (FastAPI / PostgreSQL) (Mid-Right)
 * - DevOps & Cloud Deployment Pipeline (Docker / OCI / Git) (Lower-Left)
 * - Creative 3D WebGL Shader Module (Three.js) (Lower-Right)
 * 
 * Luminous Silver Hairline Conduits:
 * - Pure orthogonal PCB bus lines connecting Central CPU to all 6 surrounding modules
 * - Static glowing silver hairline traces (clean, luminous, zero heavy running pulse animations)
 * - 100% GPU compositor-driven CSS 3D parallax with locked 120 FPS momentum
 */

const TYPEWRITER_PHRASES = [
  'ARUN M PORTFOLIO IS RUNNING...',
  'FULLSTACK & AI/ML SYSTEMS...',
  'REACT 19 // VITE 120Hz ENGINE...',
  'ALL RUNTIME THREADS NOMINAL...',
];

const SECTION_READOUT = {
  hero: '01 // HERO [HOME]',
  about: '02 // ABOUT [PROFILE]',
  work: '03 // SELECTED WORK',
  experience: '04 // EXPERIENCE',
  technologies: '05 // TECHNICAL STACK',
  achievements: '06 // ACHIEVEMENTS',
  certifications: '07 // CREDENTIALS',
  contact: '08 // TRANSMISSION',
};

// Precision PCB Orthogonal Bus Routing connecting Center CPU to all 6 modules
const MOTHERBOARD_BUS_CONDUITS = [
  // 1. Center CPU -> HTML5 Semantic Structure (Top-Right)
  {
    id: 'bus-html',
    path: 'M 620 410 H 690 L 730 330 V 190 L 750 170',
    terminals: [
      { cx: 620, cy: 410 },
      { cx: 690, cy: 410 },
      { cx: 730, cy: 330 },
      { cx: 750, cy: 170 },
    ],
  },
  // 2. Center CPU -> CSS3 Design System (Top-Left)
  {
    id: 'bus-css',
    path: 'M 380 410 H 310 L 260 330 V 230 L 210 210',
    terminals: [
      { cx: 380, cy: 410 },
      { cx: 310, cy: 410 },
      { cx: 260, cy: 330 },
      { cx: 210, cy: 210 },
    ],
  },
  // 3. Center CPU -> React Hooks Module (Mid-Left)
  {
    id: 'bus-hooks',
    path: 'M 370 480 H 260 L 210 440 H 110',
    terminals: [
      { cx: 370, cy: 480 },
      { cx: 260, cy: 480 },
      { cx: 210, cy: 440 },
      { cx: 110, cy: 440 },
    ],
  },
  // 4. Center CPU -> REST API & Database (Mid-Right)
  {
    id: 'bus-api',
    path: 'M 630 480 H 730 L 760 510 H 810',
    terminals: [
      { cx: 630, cy: 480 },
      { cx: 730, cy: 480 },
      { cx: 760, cy: 510 },
      { cx: 810, cy: 510 },
    ],
  },
  // 5. Center CPU -> DevOps Cloud Pipeline (Lower-Left)
  {
    id: 'bus-devops',
    path: 'M 390 550 H 320 L 260 630 V 670 L 200 690',
    terminals: [
      { cx: 390, cy: 550 },
      { cx: 320, cy: 550 },
      { cx: 260, cy: 630 },
      { cx: 200, cy: 690 },
    ],
  },
  // 6. Center CPU -> Three.js 3D WebGL Core (Lower-Right)
  {
    id: 'bus-three',
    path: 'M 610 550 H 690 L 750 660 V 770 L 820 810',
    terminals: [
      { cx: 610, cy: 550 },
      { cx: 690, cy: 550 },
      { cx: 750, cy: 660 },
      { cx: 820, cy: 810 },
    ],
  },
];

const MICRO_CODE_TILES = [
  { id: 'mct-1', token: '⚛', top: '9%', left: '44%', depth: 1.8, size: 30, delay: '0s' },
  { id: 'mct-2', token: '</>', top: '17%', left: '86%', depth: 0.7, size: 28, delay: '1.2s' },
  { id: 'mct-3', token: '{ }', top: '24%', left: '7%', depth: 2.1, size: 32, delay: '2.5s' },
  { id: 'mct-4', token: 'div', top: '32%', left: '52%', depth: 1.3, size: 26, delay: '0.8s' },
  { id: 'mct-5', token: 'css', top: '46%', left: '80%', depth: 2.3, size: 30, delay: '1.8s' },
  { id: 'mct-6', token: 'js', top: '55%', left: '16%', depth: 0.8, size: 26, delay: '3.1s' },
  { id: 'mct-7', token: '120', top: '65%', left: '88%', depth: 1.9, size: 34, delay: '0.4s' },
  { id: 'mct-8', token: 'fn()', top: '74%', left: '38%', depth: 2.2, size: 30, delay: '2.2s' },
  { id: 'mct-9', token: 'DOM', top: '83%', left: '6%', depth: 1.1, size: 28, delay: '1.5s' },
  { id: 'mct-10', token: 'API', top: '92%', left: '68%', depth: 2.4, size: 32, delay: '2.8s' },
];

function OledTypewriter() {
  const [displayText, setDisplayText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[phraseIdx];
    let timer;

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 65);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        }, 30);
      } else {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIdx]);

  return <span className="typewriter-text">{displayText}</span>;
}

function ArchitecturalGlassPanels({ theme = 'light', activeSection = 'hero' }) {
  return (
    <div className={`architectural-glass-scene theme-${theme}`} data-theme={theme} aria-hidden="true">
      {/* Subtle Architectural Drafting Grid Watermark */}
      <div className="drafting-blueprint-grid" />

      {/* Silver Hairline PCB Conduits connecting Center CPU to the 6 modules (Clean glowing silver lines, zero orbital circles) */}
      <svg 
        className="motherboard-bus-conduits" 
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {MOTHERBOARD_BUS_CONDUITS.map((bus) => (
          <g key={bus.id} className="bus-conduit-group">
            {/* Glowing Silver Hairline PCB Trace */}
            <path 
              d={bus.path} 
              className="conduit-hairline-trace" 
              fill="none" 
            />

            {/* Solder Pad / Terminal Connection Dots */}
            {bus.terminals.map((pt, idx) => (
              <circle 
                key={idx} 
                cx={pt.cx} 
                cy={pt.cy} 
                r={idx === 0 || idx === bus.terminals.length - 1 ? 3.5 : 2.2} 
                className={`conduit-terminal-dot ${idx === 0 ? 'root-terminal' : ''}`}
              />
            ))}
          </g>
        ))}
      </svg>

      {/* 0. HERO CENTERPIECE: React Component Motherboard with Interactive Typewriter OLED/LED Screen */}
      <div 
        className="arch-glass-anchor arch-panel-center-hero"
        style={{ '--depth': 1.0, top: '48%', left: '50%' }}
      >
        <div className="react-core-module">
          <div className="module-glare-sheen" />

          {/* PCB Circuit Traces & Quantum Electron Calibration Ring */}
          <div className="react-quantum-ring">
            {[...Array(12)].map((_, i) => (
              <span 
                key={i} 
                className="quantum-orbital-tick" 
                style={{ transform: `rotate(${i * 30}deg)` }} 
              />
            ))}
          </div>

          {/* Concentric Quantum Blueprint Rings */}
          <div className="module-concentric-outer" />
          <div className="module-concentric-inner" />

          {/* Crosshair Bus Datum Axes */}
          <div className="module-datum-axis-h" />
          <div className="module-datum-axis-v" />

          {/* CENTER CHISELED MINI OLED / LED TELEMETRY SCREEN */}
          <div className="mini-oled-screen">
            <div className="oled-bezel-screws">
              <span className="screw s-tl">+</span>
              <span className="screw s-tr">+</span>
              <span className="screw s-bl">+</span>
              <span className="screw s-br">+</span>
            </div>
            
            <div className="oled-screen-body">
              {/* Scanline CRT Texture Overlay */}
              <div className="oled-scanlines" />

              {/* Top Status Bar */}
              <div className="oled-status-bar">
                <span className="oled-live-badge">
                  <span className="oled-live-dot" /> LIVE
                </span>
                <span className="oled-chip-id">CORE // REACT 19</span>
              </div>

              {/* Main Telemetry Display with Typewriter & Live Section Tracker */}
              <div className="oled-main-display">
                <div className="oled-readout-line primary" aria-live="polite">
                  <span className="typewriter-prefix">&gt; </span>
                  <OledTypewriter />
                  <span className="typewriter-cursor">_</span>
                </div>
                
                {/* Live Section Tracker: Synchronized directly with User Scroll */}
                <div className="oled-section-tracker">
                  <span className="tracker-label">CURRENT VIEW:</span>
                  <span className="tracker-value">
                    <span className="tracker-radar-dot" />
                    {SECTION_READOUT[activeSection] || '01 // HERO [HOME]'}
                  </span>
                </div>
              </div>

              {/* Micro Metric Telemetry */}
              <div className="oled-footer-meta">
                <span>MEM: 18.4MB</span>
                <span>VITE: 120Hz</span>
                <span className="oled-green-tag">NOMINAL</span>
              </div>
            </div>
          </div>

          {/* Technical Blueprint Architecture Labels */}
          <div className="module-spec-label top">&lt;COMPONENT // APP_ROOT&gt;</div>
          <div className="module-spec-label bottom">100% GPU COMPOSITED // ARCHITECTURE ACTIVE</div>

          {/* 4 Cardinal Crosshair Datum Marks (+) */}
          <span className="module-crosshair cardinal-n">+</span>
          <span className="module-crosshair cardinal-s">+</span>
          <span className="module-crosshair cardinal-e">+</span>
          <span className="module-crosshair cardinal-w">+</span>
        </div>
      </div>

      {/* Floating Micro Code Chips (Field of frosted wafer chips) */}
      {MICRO_CODE_TILES.map((tile) => (
        <div
          key={tile.id}
          className="arch-glass-anchor micro-tile-anchor"
          style={{
            '--depth': tile.depth,
            top: tile.top,
            left: tile.left,
            width: `${tile.size}px`,
            height: `${tile.size}px`,
            animationDelay: tile.delay,
          }}
        >
          <div className="micro-tile-panel">
            <span className="micro-code-token">{tile.token}</span>
            <span className="micro-crosshair top-l">+</span>
            <span className="micro-crosshair bot-r">+</span>
          </div>
        </div>
      ))}

      {/* 1. HTML5 Semantic DOM Structure Box (Top-Right) */}
      <div 
        className="arch-glass-anchor arch-panel-pos-1"
        style={{ '--depth': 1.6, top: '10%', left: '72%' }}
      >
        <div className="arch-glass-card panel-html-structure">
          <div className="panel-glare-sheen" />
          <div className="panel-header-bar">
            <span className="panel-tag">&lt;HTML5 / STRUCTURE&gt;</span>
            <span className="panel-coord">DOM TREE</span>
          </div>
          <div className="code-blueprint-preview">
            <div className="code-line indent-0">&lt;<span className="code-tag">main</span> id="portfolio"&gt;</div>
            <div className="code-line indent-1">&lt;<span className="code-tag">section</span> class="hero" /&gt;</div>
            <div className="code-line indent-1">&lt;<span className="code-tag">section</span> class="projects" /&gt;</div>
            <div className="code-line indent-1">&lt;<span className="code-tag">section</span> class="stack" /&gt;</div>
            <div className="code-line indent-0">&lt;/<span className="code-tag">main</span>&gt;</div>
          </div>
          <div className="panel-footer-meta">
            <span>SEMANTIC DOM</span>
            <span>100% VALIDATED</span>
          </div>
          <span className="corner-crosshair ch-tl">+</span>
          <span className="corner-crosshair ch-tr">+</span>
          <span className="corner-crosshair ch-bl">+</span>
          <span className="corner-crosshair ch-br">+</span>
        </div>
      </div>

      {/* 2. CSS3 Design System & GPU Compositor Box (Top-Left) */}
      <div 
        className="arch-glass-anchor arch-panel-pos-2"
        style={{ '--depth': 1.25, top: '16%', left: '12%' }}
      >
        <div className="arch-glass-card panel-css-engine">
          <div className="panel-glare-sheen" />
          <div className="panel-header-bar">
            <span className="panel-tag">&lt;CSS3 / DESIGN_SYS&gt;</span>
          </div>
          <div className="code-blueprint-preview">
            <div className="code-line">display: <span className="code-val">flex</span>;</div>
            <div className="code-line">backdrop-filter: <span className="code-val">blur(8px)</span>;</div>
            <div className="code-line">transform: <span className="code-val">preserve-3d</span>;</div>
            <div className="palette-preview-dots">
              <span className="palette-chip chip-cyan" />
              <span className="palette-chip chip-emerald" />
              <span className="palette-chip chip-slate" />
              <span className="palette-chip chip-amber" />
            </div>
          </div>
          <div className="panel-footer-meta">
            <span>GPU COMPOSITOR</span>
            <span>120 FPS GLIDE</span>
          </div>
          <span className="corner-crosshair ch-tl">+</span>
          <span className="corner-crosshair ch-br">+</span>
        </div>
      </div>

      {/* 3. React State & Hooks Engine Slat (Mid-Left) */}
      <div 
        className="arch-glass-anchor arch-panel-pos-3"
        style={{ '--depth': 1.85, top: '38%', left: '5%' }}
      >
        <div className="arch-glass-card panel-react-hooks">
          <div className="panel-glare-sheen" />
          <div className="hooks-metric-list">
            <span className="hook-pill">useState()</span>
            <span className="hook-pill">useEffect()</span>
            <span className="hook-pill">useRef()</span>
            <span className="hook-pill">useMemo()</span>
          </div>
          <span className="vertical-label">HOOKS // REACT 19</span>
          <span className="corner-crosshair ch-bl">+</span>
        </div>
      </div>

      {/* 4. Backend REST API & Database Slate (Mid-Right) */}
      <div 
        className="arch-glass-anchor arch-panel-pos-4"
        style={{ '--depth': 1.45, top: '50%', left: '80%' }}
      >
        <div className="arch-glass-card panel-api-data">
          <div className="panel-glare-sheen" />
          <div className="panel-header-bar">
            <span className="panel-tag">&lt;API / REST_DATA&gt;</span>
            <span className="panel-status-dot" />
          </div>
          <div className="api-flow-datum">
            <div className="datum-endpoint">GET /api/v1/projects</div>
            <div className="horizon-datum-line" />
            <div className="datum-status-row">
              <span className="status-200">200 OK</span>
              <span>4.2ms LATENCY</span>
            </div>
          </div>
          <div className="panel-footer-meta">
            <span>PYTHON // FASTAPI</span>
            <span>POSTGRESQL</span>
          </div>
          <span className="corner-crosshair ch-tr">+</span>
          <span className="corner-crosshair ch-bl">+</span>
        </div>
      </div>

      {/* 5. DevOps & CI/CD Cloud Pipeline Card (Lower-Left) */}
      <div 
        className="arch-glass-anchor arch-panel-pos-5"
        style={{ '--depth': 2.05, top: '68%', left: '10%' }}
      >
        <div className="arch-glass-card panel-devops-cloud">
          <div className="panel-glare-sheen" />
          <div className="panel-header-bar">
            <span className="panel-tag">&lt;DEVOPS / CI-CD&gt;</span>
          </div>
          <div className="devops-pipeline-flow">
            <div className="pipeline-step">GIT</div>
            <div className="pipeline-arrow">&rarr;</div>
            <div className="pipeline-step">DOCKER</div>
            <div className="pipeline-arrow">&rarr;</div>
            <div className="pipeline-step">OCI CLOUD</div>
          </div>
          <div className="panel-footer-meta">
            <span>CONTAINERIZED</span>
            <span>AUTO DEPLOY</span>
          </div>
          <span className="corner-crosshair ch-tl">+</span>
          <span className="corner-crosshair ch-tr">+</span>
        </div>
      </div>

      {/* 6. Creative 3D WebGL Shader Core Rhombus (Lower-Right) */}
      <div 
        className="arch-glass-anchor arch-panel-pos-6"
        style={{ '--depth': 1.15, top: '82%', left: '82%' }}
      >
        <div className="arch-glass-card panel-three-core">
          <div className="panel-glare-sheen" />
          <div className="three-inner-frame">
            <span className="three-coord-label">THREE.JS</span>
            <div className="three-axis-matrix">
              <span>X: 120°</span>
              <span>Y: 45°</span>
            </div>
          </div>
          <span className="corner-crosshair ch-tl">+</span>
          <span className="corner-crosshair ch-br">+</span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ArchitecturalGlassPanels);
