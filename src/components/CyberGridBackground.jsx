import React, { useEffect, useRef } from 'react';
import PrismaticCrystals from './PrismaticCrystals';
import ArchitecturalGlassPanels from './ArchitecturalGlassPanels';

/**
 * Pure 3D Optical Glass Architecture Background
 * - Dark Theme: Authentic Photorealistic 3D Prismatic Crystals with Spectral Caustics
 * - Light Theme: Architectural Frosted Glass Blueprint Panels (Apple / Drafting Style)
 * 100% GPU compositor-driven with buttery 120 FPS momentum.
 */
function CyberGridBackground({ theme }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);

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

    window.addEventListener('resize', handleResize, { passive: true });
    
    // Pause style mutations during active scroll to free 100% GPU bandwidth for buttery scroll
    let isScrolling = false;
    let scrollTimer = null;
    const handleScroll = () => {
      isScrolling = true;
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isScrolling = false;
      }, 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // On mobile devices: 100% bypass JS RAF loop to free 100% CPU thread for buttery 120Hz native touch scroll
    if (isMobile) {
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimer) clearTimeout(scrollTimer);
      };
    }

    // Desktop only mouse tracking with smooth spring inertia
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let time = 0;

    const render = () => {
      if (isScrolling) {
        // Skip DOM property mutations during active scroll for 0-jank compositor momentum
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.015;

      // Gentle ambient floating oscillation
      const autoTiltX = Math.sin(time * 0.8) * 0.16;
      const autoTiltY = Math.cos(time * 0.6) * 0.12;

      // Silky-smooth spring inertia on desktop (responsive, fluid 120 FPS glide)
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

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
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="cyber-grid-container" aria-hidden="true">
      {theme === 'dark' ? (
        <PrismaticCrystals theme={theme} />
      ) : (
        <ArchitecturalGlassPanels />
      )}
    </div>
  );
}

export default React.memo(CyberGridBackground);
