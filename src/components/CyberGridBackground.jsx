import React, { useEffect, useRef } from 'react';
import PrismaticCrystals from './PrismaticCrystals';

function CyberGridBackground({ theme }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smooth spring inertia
    const mouse = {
      x: width * 0.5,
      y: height * 0.5,
      targetX: width * 0.5,
      targetY: height * 0.5,
    };

    const isMobileDevice = window.innerWidth < 768;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let time = 0;

    // Calm drifting stardust particles (4 on mobile, 8 on desktop for pure elegance)
    const dustCount = isMobileDevice ? 4 : 8;
    const dustParticles = [];
    for (let i = 0; i < dustCount; i++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.14,
        vy: -0.10 - Math.random() * 0.16,
        r: 1.0 + Math.random() * 1.5,
        alpha: 0.15 + Math.random() * 0.35,
        color: Math.random() > 0.5 ? 'cyan' : 'violet',
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      time += 0.01;

      // Silky-smooth spring inertia (responsive, fluid 120 FPS glide)
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Gentle ambient floating oscillation
      const autoTiltX = Math.sin(time * 0.8) * 0.14;
      const autoTiltY = Math.cos(time * 0.6) * 0.10;

      // High-precision continuous cursor travel (Zero deadzone, zero stepped stutter)
      if (containerRef.current) {
        const normX = ((mouse.x / width) - 0.5) * 1.8;
        const normY = ((mouse.y / height) - 0.5) * 1.8;
        const finalTiltX = Math.max(-1.5, Math.min(1.5, normX + autoTiltX));
        const finalTiltY = Math.max(-1.5, Math.min(1.5, normY + autoTiltY));

        containerRef.current.style.setProperty('--tilt-x', finalTiltX.toFixed(4));
        containerRef.current.style.setProperty('--tilt-y', finalTiltY.toFixed(4));
      }

      const isDark = theme === 'dark';

      // Clear frame
      ctx.clearRect(0, 0, width, height);

      // -----------------------------------------------------------------------
      // 1. Soft Interactive Cursor Spotlight (Clean, Modern & Lightweight)
      // -----------------------------------------------------------------------
      const spotlightRadius = isMobileDevice ? 240 : 380;
      const spotGrad = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, spotlightRadius
      );

      if (isDark) {
        spotGrad.addColorStop(0, 'rgba(56, 189, 248, 0.12)');
        spotGrad.addColorStop(0.45, 'rgba(168, 85, 247, 0.04)');
        spotGrad.addColorStop(1, 'transparent');
      } else {
        spotGrad.addColorStop(0, 'rgba(99, 102, 241, 0.09)');
        spotGrad.addColorStop(0.45, 'rgba(56, 189, 248, 0.03)');
        spotGrad.addColorStop(1, 'transparent');
      }

      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, spotlightRadius, 0, Math.PI * 2);
      ctx.fill();

      // -----------------------------------------------------------------------
      // 2. Calm Drifting Celestial Stardust (Grid is rendered natively via GPU CSS)
      // -----------------------------------------------------------------------
      for (let i = 0; i < dustParticles.length; i++) {
        const p = dustParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        const pAlpha = p.alpha * (0.6 + Math.sin(p.pulse) * 0.4);
        ctx.fillStyle = isDark
          ? (p.color === 'cyan' ? `rgba(56, 189, 248, ${pAlpha * 0.8})` : `rgba(168, 85, 247, ${pAlpha * 0.8})`)
          : (p.color === 'cyan' ? `rgba(14, 165, 233, ${pAlpha * 0.65})` : `rgba(99, 102, 241, ${pAlpha * 0.65})`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div ref={containerRef} className="cyber-grid-container" aria-hidden="true">
      {/* 1. Individual Code-Generated Authentic 3D Prismatic Crystal Elements */}
      <PrismaticCrystals theme={theme} />

      {/* 2. Clean Minimal Architectural Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="cyber-grid-canvas"
      />
    </div>
  );
}

export default React.memo(CyberGridBackground);
