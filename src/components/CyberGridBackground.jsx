import React, { useEffect, useRef } from 'react';
import PrismaticCrystals from './PrismaticCrystals';

/**
 * Pure Optical Glass Prismatic Background
 * Dedicated solely to the realistic 3D optical glass prismatic crystal.
 * Zero heavy 2D canvas draw loops, zero particle arrays, zero performance drag.
 * 100% GPU compositor-driven with buttery 120 FPS momentum.
 */
function CyberGridBackground({ theme }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Mouse coordinates with silky smooth spring inertia
    const mouse = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
      targetX: window.innerWidth * 0.5,
      targetY: window.innerHeight * 0.5,
    };

    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.015;

      // Silky-smooth spring inertia (responsive, fluid 120 FPS glide)
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Gentle ambient floating oscillation
      const autoTiltX = Math.sin(time * 0.8) * 0.16;
      const autoTiltY = Math.cos(time * 0.6) * 0.12;

      // High-precision continuous cursor travel (Zero deadzone, zero stepped stutter)
      if (containerRef.current) {
        const normX = ((mouse.x / width) - 0.5) * 1.8;
        const normY = ((mouse.y / height) - 0.5) * 1.8;
        const finalTiltX = Math.max(-1.5, Math.min(1.5, normX + autoTiltX));
        const finalTiltY = Math.max(-1.5, Math.min(1.5, normY + autoTiltY));

        containerRef.current.style.setProperty('--tilt-x', finalTiltX.toFixed(4));
        containerRef.current.style.setProperty('--tilt-y', finalTiltY.toFixed(4));
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="cyber-grid-container" aria-hidden="true">
      {/* Authentic Photorealistic 3D Optical Glass Prismatic Crystal */}
      <PrismaticCrystals theme={theme} />
    </div>
  );
}

export default React.memo(CyberGridBackground);
