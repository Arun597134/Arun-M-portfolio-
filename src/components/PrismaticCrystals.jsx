import React from 'react';

/**
 * Real 3D Prismatic Crystal Elements
 * Each element is a real geometric 3D polyhedron constructed of 3D facets (preserve-3d).
 * Each element has its OWN unique 3D work/action:
 * 1. Master Octahedron: Continuous 3D Axial Spin (360° rotation)
 * 2. Crystal Pyramid: 3D Conical Tumbling Precession
 * 3. Frosted Glass Block: 3D Diagonal Orbital Roll
 * 4. Jewel Shard: 3D Jewel Twirl & Levitation
 * 5. Micro-Octahedron: 3D Gyroscopic Spin & Pulse
 * 6. Architectural Step: 3D Pendulum Glide
 *
 * All elements dynamically track the cursor with depth-scaled 3D parallax.
 */

function PrismaticCrystals({ theme }) {
  const isDark = theme === 'dark';

  return (
    <div className="prismatic-3d-scene" aria-hidden="true">
      {/* 1. Master 3D Double-Pyramid (Octahedron Diamond) - Continuous 3D Axial Spin */}
      <div 
        className="crystal-3d-anchor crystal-pos-hero-right"
        style={{ '--depth': 1.6, top: '14%', left: '70%' }}
      >
        <div className="crystal-action-spin">
          <div className="polyhedron-octahedron">
            {/* 4 Upper Triangular Facets */}
            <div className="face face-octa-top face-front" />
            <div className="face face-octa-top face-right" />
            <div className="face face-octa-top face-back" />
            <div className="face face-octa-top face-left" />
            {/* 4 Lower Triangular Facets */}
            <div className="face face-octa-bot face-front" />
            <div className="face face-octa-bot face-right" />
            <div className="face face-octa-bot face-back" />
            <div className="face face-octa-bot face-left" />
            {/* Internal Optical Glow & Diamond Sparkle */}
            <div className="crystal-3d-core" />
            <div className="crystal-sparkle" />
          </div>
        </div>
      </div>

      {/* 2. 3D Crystal Pyramid - Conical Tumbling Precession */}
      <div 
        className="crystal-3d-anchor crystal-pos-top-left"
        style={{ '--depth': 1.25, top: '16%', left: '8%' }}
      >
        <div className="crystal-action-tumble">
          <div className="polyhedron-pyramid">
            <div className="face face-pyr face-front" />
            <div className="face face-pyr face-right" />
            <div className="face face-pyr face-back" />
            <div className="face face-pyr face-left" />
            <div className="face face-pyr-base" />
            <div className="crystal-3d-core" />
            <div className="crystal-sparkle" />
          </div>
        </div>
      </div>

      {/* 3. 3D Frosted Glass Block (Cuboid) - Diagonal Orbital Roll */}
      <div 
        className="crystal-3d-anchor crystal-pos-mid-right"
        style={{ '--depth': 0.95, top: '54%', left: '80%' }}
      >
        <div className="crystal-action-roll">
          <div className="polyhedron-cuboid">
            <div className="face face-cube-front" />
            <div className="face face-cube-back" />
            <div className="face face-cube-left" />
            <div className="face face-cube-right" />
            <div className="face face-cube-top" />
            <div className="face face-cube-bottom" />
          </div>
        </div>
      </div>

      {/* 4. 3D Jewel Shard - Jewel Twirl & Levitation */}
      <div 
        className="crystal-3d-anchor crystal-pos-center-bottom"
        style={{ '--depth': 1.4, top: '72%', left: '48%' }}
      >
        <div className="crystal-action-twirl">
          <div className="polyhedron-shard">
            <div className="face face-shard-fl" />
            <div className="face face-shard-fr" />
            <div className="face face-shard-bl" />
            <div className="face face-shard-br" />
            <div className="crystal-3d-core" />
          </div>
        </div>
      </div>

      {/* 5. 3D Micro-Octahedron - Gyroscopic Spin & Pulse */}
      <div 
        className="crystal-3d-anchor crystal-pos-center-top"
        style={{ '--depth': 0.75, top: '9%', left: '42%' }}
      >
        <div className="crystal-action-gyro">
          <div className="polyhedron-micro-octa">
            <div className="face face-micro-top face-front" />
            <div className="face face-micro-top face-right" />
            <div className="face face-micro-top face-back" />
            <div className="face face-micro-top face-left" />
            <div className="face face-micro-bot face-front" />
            <div className="face face-micro-bot face-right" />
            <div className="face face-micro-bot face-back" />
            <div className="face face-micro-bot face-left" />
          </div>
        </div>
      </div>

      {/* 6. 3D Architectural Glass Platform - Pendulum Tilt Glide */}
      <div 
        className="crystal-3d-anchor crystal-pos-bottom-left"
        style={{ '--depth': 1.1, top: '70%', left: '10%' }}
      >
        <div className="crystal-action-pendulum">
          <div className="polyhedron-platform">
            <div className="face face-plat-front" />
            <div className="face face-plat-back" />
            <div className="face face-plat-left" />
            <div className="face face-plat-right" />
            <div className="face face-plat-top" />
            <div className="face face-plat-bottom" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PrismaticCrystals);
