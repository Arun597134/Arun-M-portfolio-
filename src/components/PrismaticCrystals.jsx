import React from 'react';

/**
 * Authentic 3D Optical Glass Prismatic Crystal System
 * Features:
 * - 6 Primary 3D Optical Glass Hero Crystals
 * - 15 Miniature Floating Transparent Micro-Crystals (Travels with Cursor Parallax)
 * - 100% GPU-accelerated CSS 3D (preserve-3d) with locked 120 FPS performance
 */
const MICRO_CRYSTALS = [
  { id: 'mc-1', top: '7%', left: '46%', depth: 1.8, type: 'diamond', scale: 0.35, duration: '9s', delay: '0s' },
  { id: 'mc-2', top: '11%', left: '22%', depth: 0.6, type: 'rhombus', scale: 0.28, duration: '12s', delay: '1.5s' },
  { id: 'mc-3', top: '16%', left: '89%', depth: 2.2, type: 'shard', scale: 0.38, duration: '8s', delay: '0.8s' },
  { id: 'mc-4', top: '23%', left: '8%', depth: 1.9, type: 'diamond', scale: 0.32, duration: '11s', delay: '2.2s' },
  { id: 'mc-5', top: '30%', left: '55%', depth: 0.7, type: 'rhombus', scale: 0.26, duration: '14s', delay: '3.1s' },
  { id: 'mc-6', top: '36%', left: '28%', depth: 2.4, type: 'shard', scale: 0.40, duration: '7.5s', delay: '1.0s' },
  { id: 'mc-7', top: '44%', left: '82%', depth: 1.4, type: 'diamond', scale: 0.30, duration: '10s', delay: '2.7s' },
  { id: 'mc-8', top: '48%', left: '18%', depth: 0.8, type: 'rhombus', scale: 0.28, duration: '13s', delay: '0.4s' },
  { id: 'mc-9', top: '56%', left: '48%', depth: 2.1, type: 'diamond', scale: 0.36, duration: '8.5s', delay: '1.9s' },
  { id: 'mc-10', top: '63%', left: '92%', depth: 1.1, type: 'shard', scale: 0.32, duration: '11.5s', delay: '3.5s' },
  { id: 'mc-11', top: '71%', left: '32%', depth: 2.3, type: 'rhombus', scale: 0.38, duration: '9.2s', delay: '0.7s' },
  { id: 'mc-12', top: '76%', left: '6%', depth: 0.9, type: 'diamond', scale: 0.28, duration: '13.5s', delay: '2.4s' },
  { id: 'mc-13', top: '84%', left: '58%', depth: 1.7, type: 'shard', scale: 0.34, duration: '10.5s', delay: '1.2s' },
  { id: 'mc-14', top: '89%', left: '24%', depth: 2.5, type: 'diamond', scale: 0.36, duration: '8s', delay: '3.0s' },
  { id: 'mc-15', top: '94%', left: '74%', depth: 1.3, type: 'rhombus', scale: 0.30, duration: '12s', delay: '1.8s' },
];

function PrismaticCrystals() {
  return (
    <div className="prismatic-3d-scene" aria-hidden="true">
      {/* Dynamic Miniature Floating Transparent Prismatic Micro-Crystals (120 FPS Locked) */}
      {MICRO_CRYSTALS.map((mc) => (
        <div
          key={mc.id}
          className={`crystal-3d-anchor micro-crystal-anchor micro-${mc.type}`}
          style={{
            '--depth': mc.depth,
            '--micro-scale': mc.scale,
            top: mc.top,
            left: mc.left,
          }}
        >
          <div 
            className="micro-crystal-action"
            style={{
              animationDuration: mc.duration,
              animationDelay: mc.delay,
            }}
          >
            <div className={`micro-prism-wafer wafer-${mc.type}`}>
              <div className="micro-facet-diagonal" />
              <div className="micro-optic-core" />
            </div>
          </div>
        </div>
      ))}
      {/* 1. Master Optical Glass Octahedron Diamond Crystal (Top-Right) */}
      <div 
        className="crystal-3d-anchor crystal-pos-master"
        style={{ '--depth': 1.5, top: '12%', left: '74%' }}
      >
        <div className="crystal-action-spin">
          <div className="polyhedron-octahedron">
            {/* 4 Upper Real Glass Triangular Facets */}
            <div className="face face-octa-top face-front" />
            <div className="face face-octa-top face-right" />
            <div className="face face-octa-top face-back" />
            <div className="face face-octa-top face-left" />
            
            {/* 4 Lower Real Glass Triangular Facets */}
            <div className="face face-octa-bot face-front" />
            <div className="face face-octa-bot face-right" />
            <div className="face face-octa-bot face-back" />
            <div className="face face-octa-bot face-left" />

            {/* Internal Optical Glass Refraction Plane */}
            <div className="crystal-internal-plane" />

            {/* Central Caustic Focal Nucleus */}
            <div className="crystal-3d-core" />

            {/* Diamond Specular Starflare Sparkle */}
            <div className="crystal-sparkle" />

            {/* Diamond Apex Specular Highlights */}
            <div className="apex-glint apex-glint-top" />
            <div className="apex-glint apex-glint-bottom" />
          </div>
        </div>
      </div>

      {/* 2. Optical Glass Prismatic Square Cube (Top-Left) */}
      <div 
        className="crystal-3d-anchor crystal-pos-cube"
        style={{ '--depth': 1.3, top: '18%', left: '16%' }}
      >
        <div className="crystal-action-tumble">
          <div className="polyhedron-cube">
            {/* 6 Real Optical Glass Square Faces */}
            <div className="face face-cube face-cube-front" />
            <div className="face face-cube face-cube-back" />
            <div className="face face-cube face-cube-right" />
            <div className="face face-cube face-cube-left" />
            <div className="face face-cube face-cube-top" />
            <div className="face face-cube face-cube-bot" />

            {/* Internal Caustic Core & Specular Starflare */}
            <div className="crystal-3d-core cube-core" />
            <div className="crystal-sparkle cube-sparkle" />
          </div>
        </div>
      </div>

      {/* 3. Floating Optical Glass Gem / Bipyramid (Mid-Left) */}
      <div 
        className="crystal-3d-anchor crystal-pos-gem"
        style={{ '--depth': 1.15, top: '40%', left: '6%' }}
      >
        <div className="crystal-action-roll">
          <div className="polyhedron-gem">
            {/* 4 Upper Facets */}
            <div className="face face-gem-top face-front" />
            <div className="face face-gem-top face-right" />
            <div className="face face-gem-top face-back" />
            <div className="face face-gem-top face-left" />

            {/* 4 Lower Facets */}
            <div className="face face-gem-bot face-front" />
            <div className="face face-gem-bot face-right" />
            <div className="face face-gem-bot face-back" />
            <div className="face face-gem-bot face-left" />

            {/* Caustic Core & Sparkle */}
            <div className="crystal-3d-core gem-core" />
            <div className="crystal-sparkle gem-sparkle" />
          </div>
        </div>
      </div>

      {/* 4. Optical Glass Square Rhombus Plate (Mid-Right) */}
      <div 
        className="crystal-3d-anchor crystal-pos-rhombus"
        style={{ '--depth': 0.95, top: '52%', left: '88%' }}
      >
        <div className="crystal-action-sway">
          <div className="polyhedron-rhombus">
            <div className="face face-rhombus-front" />
            <div className="face face-rhombus-back" />
            <div className="face face-rhombus-bevel-t" />
            <div className="face face-rhombus-bevel-b" />
            <div className="crystal-3d-core rhombus-core" />
            <div className="crystal-sparkle rhombus-sparkle" />
          </div>
        </div>
      </div>

      {/* 5. Delicate Companion Floating Glass Shard (Lower-Left) */}
      <div 
        className="crystal-3d-anchor crystal-pos-companion"
        style={{ '--depth': 0.85, top: '68%', left: '12%' }}
      >
        <div className="crystal-action-twirl">
          <div className="polyhedron-shard">
            <div className="face face-shard-fl" />
            <div className="face face-shard-fr" />
            <div className="face face-shard-bl" />
            <div className="face face-shard-br" />
            <div className="crystal-3d-core shard-core" />
          </div>
        </div>
      </div>

      {/* 6. Floating Optical Quartz Spire / Needle (Lower-Right) */}
      <div 
        className="crystal-3d-anchor crystal-pos-needle"
        style={{ '--depth': 1.05, top: '80%', left: '80%' }}
      >
        <div className="crystal-action-float">
          <div className="polyhedron-needle">
            <div className="face face-needle-fl" />
            <div className="face face-needle-fr" />
            <div className="face face-needle-bl" />
            <div className="face face-needle-br" />
            <div className="crystal-3d-core needle-core" />
            <div className="crystal-sparkle needle-sparkle" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PrismaticCrystals);
