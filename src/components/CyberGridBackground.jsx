import React, { useEffect, useRef } from 'react';
import PrismaticCrystals from './PrismaticCrystals';

export default function CyberGridBackground({ theme }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isDark = theme === 'dark';

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

    let lastScrollY = window.scrollY;
    let scrollDelta = 0;

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

    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollDelta = Math.max(-12, Math.min(12, (currentY - lastScrollY) * 0.06));
      lastScrollY = currentY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Minimal, refined perspective grid geometry (Pakka rich grid on mobile at 120 FPS)
    const cols = isMobileDevice ? 14 : 22;
    const rows = isMobileDevice ? 10 : 16;
    let time = 0;

    // Glowing energy nodes (6 on mobile, 12 on desktop)
    const sparkCount = isMobileDevice ? 6 : 12;
    const sparks = [];
    for (let i = 0; i < sparkCount; i++) {
      sparks.push({
        col: Math.floor(Math.random() * cols),
        row: Math.random() * rows,
        speed: 0.02 + Math.random() * 0.04,
        size: 2.0 + Math.random() * 2.2,
        colorType: Math.random() > 0.5 ? 'cyan' : 'purple',
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Drifting ambient crystal dust (8 on mobile, 16 on desktop)
    const dustCount = isMobileDevice ? 8 : 16;
    const dustParticles = [];
    for (let i = 0; i < dustCount; i++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -0.12 - Math.random() * 0.22,
        r: 0.9 + Math.random() * 1.5,
        alpha: 0.15 + Math.random() * 0.35,
        color: Math.random() > 0.5 ? 'cyan' : 'violet',
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Subtle ambient aurora glow pools
    const orbs = [
      { x: width * 0.25, y: height * 0.3, vx: 0.18, vy: 0.12, r: 420, color: 'indigo' },
      { x: width * 0.78, y: height * 0.45, vx: -0.16, vy: 0.14, r: 450, color: 'cyan' },
    ];

    const render = () => {
      time += 0.012;

      // Mouse smoothing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Inertial damping of scroll delta
      scrollDelta *= 0.90;

      // Gentle ambient oscillation so crystals always have a subtle live 3D shimmer
      const autoTiltX = Math.sin(time * 0.9) * 0.22;
      const autoTiltY = Math.cos(time * 0.7) * 0.18;

      // Sync CSS tilt variables once per animation frame (100% hardware composite, zero transition churn)
      if (containerRef.current) {
        const normX = Math.max(-1, Math.min(1, ((mouse.x / width) - 0.5) * 1.8 + autoTiltX));
        const normY = Math.max(-1, Math.min(1, ((mouse.y / height) - 0.5) * 1.8 + autoTiltY - scrollDelta));
        containerRef.current.style.setProperty('--tilt-x', normX.toFixed(3));
        containerRef.current.style.setProperty('--tilt-y', normY.toFixed(3));
      }

      const isDark = theme === 'dark';

      // Clear frame
      ctx.clearRect(0, 0, width, height);

      // -----------------------------------------------------------------------
      // 1. Soft Ambient Aurora Glow
      // -----------------------------------------------------------------------
      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1;
        if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1;

        const g = ctx.createRadialGradient(orb.x, orb.y, 10, orb.x, orb.y, orb.r);

        if (isDark) {
          if (orb.color === 'indigo') {
            g.addColorStop(0, 'rgba(79, 70, 229, 0.12)');
            g.addColorStop(0.5, 'rgba(79, 70, 229, 0.04)');
            g.addColorStop(1, 'transparent');
          } else {
            g.addColorStop(0, 'rgba(6, 182, 212, 0.10)');
            g.addColorStop(0.5, 'rgba(6, 182, 212, 0.03)');
            g.addColorStop(1, 'transparent');
          }
        } else {
          if (orb.color === 'indigo') {
            g.addColorStop(0, 'rgba(99, 102, 241, 0.10)');
            g.addColorStop(0.5, 'rgba(99, 102, 241, 0.03)');
            g.addColorStop(1, 'transparent');
          } else {
            g.addColorStop(0, 'rgba(14, 165, 233, 0.09)');
            g.addColorStop(0.5, 'rgba(14, 165, 233, 0.03)');
            g.addColorStop(1, 'transparent');
          }
        }

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // -----------------------------------------------------------------------
      // 2. Clean, Quiet Perspective Grid Wave
      // -----------------------------------------------------------------------
      const horizonY = height * 0.28;
      const fov = 440;
      const cameraY = -95;
      const cameraZ = -140;

      const gridPoints = [];

      for (let r = 0; r <= rows; r++) {
        const rowArr = [];
        const z = r * 65 + 70;
        const scale = fov / (fov + z - cameraZ);

        for (let c = 0; c <= cols; c++) {
          const worldX = (c - cols / 2) * 135;

          const ptScreenX = width / 2 + worldX * scale;
          const distMouse = Math.hypot(ptScreenX - mouse.x, (horizonY + z * 0.5) - mouse.y);
          const mouseLift = Math.sin(distMouse * 0.01 - time * 2.2) * Math.max(0, 28 - distMouse * 0.06);

          const wave =
            Math.sin(c * 0.32 + time * 1.2) * 14 +
            Math.cos(r * 0.35 - time * 1.0) * 12 +
            mouseLift;

          const screenX = width / 2 + worldX * scale;
          const screenY = horizonY + (wave - cameraY) * scale * 2.4 + z * 0.45;

          rowArr.push({
            x: screenX,
            y: screenY,
            z: z,
            scale: scale,
          });
        }
        gridPoints.push(rowArr);
      }

      // Render Horizontal Waves (Subtle, Clean)
      for (let r = 0; r <= rows; r++) {
        const depthFactor = (r / rows);
        const curveFade = Math.sin(depthFactor * Math.PI);

        const alpha = isDark
          ? 0.03 + curveFade * 0.15
          : 0.04 + curveFade * 0.16;

        ctx.strokeStyle = isDark
          ? `rgba(99, 102, 241, ${alpha})`
          : `rgba(79, 70, 229, ${alpha})`;
        ctx.lineWidth = Math.max(0.8, 1.4 * depthFactor);

        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const pt = gridPoints[r][c];
          if (c === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // Render Perspective Longitudinal Lines
      for (let c = 0; c <= cols; c++) {
        const centerDist = 1 - Math.abs(c - cols / 2) / (cols / 1.6);
        if (centerDist <= 0) continue;

        ctx.beginPath();
        for (let r = 0; r <= rows; r++) {
          const pt = gridPoints[r][c];
          const depthFactor = r / rows;
          const alpha = isDark
            ? (0.02 + depthFactor * 0.12) * centerDist
            : (0.03 + depthFactor * 0.14) * centerDist;

          ctx.strokeStyle = isDark
            ? `rgba(6, 182, 212, ${alpha})`
            : `rgba(14, 165, 233, ${alpha})`;
          ctx.lineWidth = Math.max(0.6, 1.2 * depthFactor);

          if (r === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // -----------------------------------------------------------------------
      // 3. Calm Energy Sparks
      // -----------------------------------------------------------------------
      for (let i = 0; i < sparks.length; i++) {
        const spark = sparks[i];
        spark.row += spark.speed;
        spark.pulse += 0.04;

        if (spark.row >= rows - 1) {
          spark.row = 1;
          spark.col = Math.floor(Math.random() * cols);
          spark.speed = 0.02 + Math.random() * 0.04;
        }

        const rInt = Math.floor(spark.row);
        const rFrac = spark.row - rInt;

        if (
          gridPoints[rInt] &&
          gridPoints[rInt + 1] &&
          gridPoints[rInt][spark.col] &&
          gridPoints[rInt + 1][spark.col]
        ) {
          const p1 = gridPoints[rInt][spark.col];
          const p2 = gridPoints[rInt + 1][spark.col];

          const curX = p1.x + (p2.x - p1.x) * rFrac;
          const curY = p1.y + (p2.y - p1.y) * rFrac;

          const baseSize = spark.size * p1.scale * 1.5;
          const pulseEffect = Math.sin(spark.pulse) * 0.25 + 1;
          const finalSize = Math.max(1.8, baseSize * pulseEffect);

          const glowColor =
            spark.colorType === 'cyan'
              ? isDark ? '#22d3ee' : '#0284c7'
              : isDark ? '#a78bfa' : '#6366f1';

          const sparkAlpha = Math.sin((spark.row / rows) * Math.PI) * (isDark ? 0.75 : 0.65);

          // Fast 2-pass glow (Zero shadowBlur overhead)
          ctx.fillStyle = glowColor;
          ctx.globalAlpha = sparkAlpha * 0.35;
          ctx.beginPath();
          ctx.arc(curX, curY, finalSize * 2.2, 0, Math.PI * 2);
          ctx.fill();

          // Intense Core
          ctx.fillStyle = isDark ? '#ffffff' : '#f8fafc';
          ctx.globalAlpha = Math.min(1, sparkAlpha * 1.2);
          ctx.beginPath();
          ctx.arc(curX, curY, finalSize * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // -----------------------------------------------------------------------
      // 4. Subtle Micro-Stardust
      // -----------------------------------------------------------------------
      for (const p of dustParticles) {
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
          ? (p.color === 'cyan' ? `rgba(34, 211, 238, ${pAlpha * 0.75})` : `rgba(168, 85, 247, ${pAlpha * 0.75})`)
          : (p.color === 'cyan' ? `rgba(14, 165, 233, ${pAlpha * 0.6})` : `rgba(99, 102, 241, ${pAlpha * 0.6})`);

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
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div ref={containerRef} className="cyber-grid-container" aria-hidden="true">
      {/* 1. Individual Code-Generated 3D Prismatic Crystal Elements */}
      <PrismaticCrystals theme={theme} />

      {/* 2. Minimal Clean Perspective Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="cyber-grid-canvas"
      />
    </div>
  );
}
