import React from 'react';

/**
 * Architectural Frosted Glass Blueprint Panels (Apple / Drafting Studio Style)
 * Dedicated exclusively to Light Theme:
 * - Ultra-clean frosted optical glass panels with fine hairline silver borders
 * - Subtle technical drafting crosshairs (+), coordinate labels, and ratio ticks
 * - Multi-depth 3D spatial parallax that smoothly tilts and travels with cursor movement
 * - 100% GPU compositor-driven CSS 3D (preserve-3d) with locked 120 FPS performance
 */

const MICRO_GLASS_TILES = [
  { id: 'mgt-1', top: '9%', left: '44%', depth: 1.8, size: 28, delay: '0s' },
  { id: 'mgt-2', top: '17%', left: '86%', depth: 0.7, size: 22, delay: '1.2s' },
  { id: 'mgt-3', top: '24%', left: '7%', depth: 2.1, size: 32, delay: '2.5s' },
  { id: 'mgt-4', top: '32%', left: '52%', depth: 1.3, size: 24, delay: '0.8s' },
  { id: 'mgt-5', top: '46%', left: '80%', depth: 2.3, size: 30, delay: '1.8s' },
  { id: 'mgt-6', top: '55%', left: '16%', depth: 0.8, size: 26, delay: '3.1s' },
  { id: 'mgt-7', top: '65%', left: '88%', depth: 1.9, size: 34, delay: '0.4s' },
  { id: 'mgt-8', top: '74%', left: '38%', depth: 2.2, size: 28, delay: '2.2s' },
  { id: 'mgt-9', top: '83%', left: '6%', depth: 1.1, size: 25, delay: '1.5s' },
  { id: 'mgt-10', top: '92%', left: '68%', depth: 2.4, size: 32, delay: '2.8s' },
];

function ArchitecturalGlassPanels() {
  return (
    <div className="architectural-glass-scene" aria-hidden="true">
      {/* Subtle Architectural Drafting Grid Watermark */}
      <div className="drafting-blueprint-grid" />

      {/* 0. HERO CENTERPIECE: Circular Frosted Iris Lens (Apple Style) */}
      <div 
        className="arch-glass-anchor arch-panel-center-hero"
        style={{ '--depth': 1.0, top: '48%', left: '50%' }}
      >
        <div className="center-iris-lens">
          <div className="iris-glare-sheen" />
          
          {/* Outer Rotating Calibration Ticks Ring */}
          <div className="iris-dial-ring">
            {[...Array(12)].map((_, i) => (
              <span 
                key={i} 
                className="iris-dial-tick" 
                style={{ transform: `rotate(${i * 30}deg)` }} 
              />
            ))}
          </div>

          {/* Concentric Drafting Blueprint Rings */}
          <div className="iris-concentric-outer" />
          <div className="iris-concentric-mid" />
          <div className="iris-concentric-inner" />

          {/* Crosshair Datum Axes (+) */}
          <div className="iris-datum-axis-h" />
          <div className="iris-datum-axis-v" />

          {/* Focal Blue Optical Nucleus */}
          <div className="iris-focal-nucleus">
            <div className="nucleus-glint" />
          </div>

          {/* Technical Blueprint Labels */}
          <div className="iris-spec-label top">FOCAL LENS // Ø 340mm</div>
          <div className="iris-spec-label bottom">INDEX: 1.517 // 120Hz</div>

          {/* 4 Cardinal Crosshair Datum Marks (+) */}
          <span className="iris-crosshair cardinal-n">+</span>
          <span className="iris-crosshair cardinal-s">+</span>
          <span className="iris-crosshair cardinal-e">+</span>
          <span className="iris-crosshair cardinal-w">+</span>
        </div>
      </div>

      {/* Floating Micro Glass Tiles (Field of frosted wafer chips) */}
      {MICRO_GLASS_TILES.map((tile) => (
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
            <span className="micro-crosshair top-l">+</span>
            <span className="micro-crosshair bot-r">+</span>
          </div>
        </div>
      ))}

      {/* 1. Precision Blueprint Master Panel (Top-Right) */}
      <div 
        className="arch-glass-anchor arch-panel-pos-1"
        style={{ '--depth': 1.6, top: '10%', left: '72%' }}
      >
        <div className="arch-glass-card panel-master">
          <div className="panel-glare-sheen" />
          <div className="panel-header-bar">
            <span className="panel-tag">SPEC // 01</span>
            <span className="panel-coord">44.2° N</span>
          </div>
          <div className="panel-blueprint-mesh">
            <div className="mesh-line-h" />
            <div className="mesh-line-v" />
            <div className="mesh-focal-ring" />
          </div>
          <div className="panel-footer-meta">
            <span>INDEX: 1.517</span>
            <span>120Hz OPTIC</span>
          </div>
          {/* Corner Crosshairs */}
          <span className="corner-crosshair ch-tl">+</span>
          <span className="corner-crosshair ch-tr">+</span>
          <span className="corner-crosshair ch-bl">+</span>
          <span className="corner-crosshair ch-br">+</span>
        </div>
      </div>

      {/* 2. Frosted Dot Matrix Plate (Top-Left) */}
      <div 
        className="arch-glass-anchor arch-panel-pos-2"
        style={{ '--depth': 1.25, top: '16%', left: '12%' }}
      >
        <div className="arch-glass-card panel-matrix">
          <div className="panel-glare-sheen" />
          <div className="panel-header-bar">
            <span className="panel-tag">MATRIX // MOD</span>
          </div>
          <div className="panel-dot-matrix">
            {[...Array(9)].map((_, i) => (
              <span key={i} className="matrix-dot" />
            ))}
          </div>
          <div className="panel-footer-meta">
            <span>PLATINUM FROST</span>
          </div>
          <span className="corner-crosshair ch-tl">+</span>
          <span className="corner-crosshair ch-br">+</span>
        </div>
      </div>

      {/* 3. Slender Architectural Glass Slat (Mid-Left) */}
      <div 
        className="arch-glass-anchor arch-panel-pos-3"
        style={{ '--depth': 1.85, top: '38%', left: '5%' }}
      >
        <div className="arch-glass-card panel-slat">
          <div className="panel-glare-sheen" />
          <div className="slat-metric-ticks">
            <span className="tick-mark major" />
            <span className="tick-mark" />
            <span className="tick-mark" />
            <span className="tick-mark major" />
            <span className="tick-mark" />
            <span className="tick-mark major" />
          </div>
          <span className="vertical-label">DRAFT // 0.85</span>
          <span className="corner-crosshair ch-bl">+</span>
        </div>
      </div>

      {/* 4. Horizontal Horizon Slate (Mid-Right) */}
      <div 
        className="arch-glass-anchor arch-panel-pos-4"
        style={{ '--depth': 1.45, top: '50%', left: '80%' }}
      >
        <div className="arch-glass-card panel-horizon">
          <div className="panel-glare-sheen" />
          <div className="panel-header-bar">
            <span className="panel-tag">HORIZON // 16:10</span>
            <span className="panel-status-dot" />
          </div>
          <div className="horizon-datum-line" />
          <div className="panel-footer-meta">
            <span>AXIS X/Y ALIGNED</span>
          </div>
          <span className="corner-crosshair ch-tr">+</span>
          <span className="corner-crosshair ch-bl">+</span>
        </div>
      </div>

      {/* 5. Technical Drafting Aspect Card (Lower-Left) */}
      <div 
        className="arch-glass-anchor arch-panel-pos-5"
        style={{ '--depth': 2.05, top: '68%', left: '10%' }}
      >
        <div className="arch-glass-card panel-aspect">
          <div className="panel-glare-sheen" />
          <div className="panel-header-bar">
            <span className="panel-tag">ASPECT // RATIO</span>
          </div>
          <div className="aspect-geometry-box">
            <div className="geom-inner-rect" />
            <div className="geom-diagonal" />
          </div>
          <div className="panel-footer-meta">
            <span>FROSTED GLASS</span>
          </div>
          <span className="corner-crosshair ch-tl">+</span>
          <span className="corner-crosshair ch-tr">+</span>
        </div>
      </div>

      {/* 6. Diamond Architectural Rhombus Wafer (Lower-Right) */}
      <div 
        className="arch-glass-anchor arch-panel-pos-6"
        style={{ '--depth': 1.15, top: '82%', left: '82%' }}
      >
        <div className="arch-glass-card panel-diamond">
          <div className="panel-glare-sheen" />
          <div className="diamond-inner-frame">
            <span className="diamond-coord-label">45° ROT</span>
          </div>
          <span className="corner-crosshair ch-tl">+</span>
          <span className="corner-crosshair ch-br">+</span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ArchitecturalGlassPanels);
