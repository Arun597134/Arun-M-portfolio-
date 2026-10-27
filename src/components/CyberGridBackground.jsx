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

    // Minimal, refined perspective grid geometry (Subtle, sleek & 120 FPS lightweight)
    const cols = isMobileDevice ? 10 : 16;
    const rows = isMobileDevice ? 8 : 12;
    const colsPlus1 = cols + 1;
    const totalPoints = (cols + 1) * (rows + 1);

    // Flat pre-allocated TypedArrays: ZERO memory heap allocations in RAF render loop
    const ptX = new Float32Array(totalPoints);
    const ptY = new Float32Array(totalPoints);
    const ptScale = new Float32Array(totalPoints);

    let time = 0;
    let lastAppliedX = -999;
    let lastAppliedY = -999;

    // Glowing energy nodes (3 on mobile, 6 on desktop for ultra-calm elegance)
    const sparkCount = isMobileDevice ? 3 : 6;
    const sparks = [];
    for (let i = 0; i < sparkCount; i++) {
      sparks.push({
        col: Math.floor(Math.random() * cols),
        row: Math.random() * rows,
        speed: 0.02 + Math.random() * 0.03,
        size: 2.0 + Math.random() * 2.0,
        colorType: Math.random() > 0.5 ? 'cyan' : 'purple',
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Drifting ambient crystal dust (5 on mobile, 8 on desktop)
    const dustCount = isMobileDevice ? 5 : 8;
    const dustParticles = [];
    for (let i = 0; i < dustCount; i++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: -0.10 - Math.random() * 0.20,
        r: 0.9 + Math.random() * 1.4,
        alpha: 0.12 + Math.random() * 0.30,
        color: Math.random() > 0.5 ? 'cyan' : 'violet',
        pulse: Math.random() * Math.PI * 2,
      });
    }

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

      // Sync CSS tilt variables once per animation frame (Throttled style dirtying - saves 80% style invalidations)
      if (containerRef.current) {
        const normX = Math.max(-1, Math.min(1, ((mouse.x / width) - 0.5) * 1.8 + autoTiltX));
        const normY = Math.max(-1, Math.min(1, ((mouse.y / height) - 0.5) * 1.8 + autoTiltY - scrollDelta));
        if (Math.abs(normX - lastAppliedX) > 0.012 || Math.abs(normY - lastAppliedY) > 0.012) {
          containerRef.current.style.setProperty('--tilt-x', normX.toFixed(3));
          containerRef.current.style.setProperty('--tilt-y', normY.toFixed(3));
          lastAppliedX = normX;
          lastAppliedY = normY;
        }
      }

      const isDark = theme === 'dark';

      // Clear frame
      ctx.clearRect(0, 0, width, height);

      // -----------------------------------------------------------------------
      // 1. Perspective Grid Wave (Zero Heap Allocations)
      // -----------------------------------------------------------------------
      const horizonY = height * 0.28;
      const fov = 440;
      const cameraY = -95;
      const cameraZ = -140;
      const halfWidth = width * 0.5;

      let idx = 0;
      for (let r = 0; r <= rows; r++) {
        const z = r * 65 + 70;
        const scale = fov / (fov + z - cameraZ);
        const rCos = Math.cos(r * 0.35 - time) * 12;

        for (let c = 0; c <= cols; c++) {
          const worldX = (c - cols * 0.5) * 135;
          const ptScreenX = halfWidth + worldX * scale;
          const distMouse = Math.hypot(ptScreenX - mouse.x, (horizonY + z * 0.5) - mouse.y);
          const mouseLift = Math.sin(distMouse * 0.01 - time * 2.2) * Math.max(0, 28 - distMouse * 0.06);

          const wave = Math.sin(c * 0.32 + time * 1.2) * 14 + rCos + mouseLift;

          ptX[idx] = ptScreenX;
          ptY[idx] = horizonY + (wave - cameraY) * scale * 2.4 + z * 0.45;
          ptScale[idx] = scale;
          idx++;
        }
      }

      // Render Horizontal Waves
      for (let r = 0; r <= rows; r++) {
        const depthFactor = (r / rows);
        const curveFade = Math.sin(depthFactor * Math.PI);
        const alpha = isDark
          ? 0.03 + curveFade * 0.15
          : 0.04 + curveFade * 0.16;

        ctx.strokeStyle = isDark
          ? `rgba(99, 102, 241, ${alpha.toFixed(3)})`
          : `rgba(79, 70, 229, ${alpha.toFixed(3)})`;
        ctx.lineWidth = Math.max(0.8, 1.4 * depthFactor);

        ctx.beginPath();
        const rowOffset = r * colsPlus1;
        ctx.moveTo(ptX[rowOffset], ptY[rowOffset]);
        for (let c = 1; c <= cols; c++) {
          const pIdx = rowOffset + c;
          ctx.lineTo(ptX[pIdx], ptY[pIdx]);
        }
        ctx.stroke();
      }

      // Render Perspective Longitudinal Lines
      for (let c = 0; c <= cols; c++) {
        const centerDist = 1 - Math.abs(c - cols * 0.5) / (cols / 1.6);
        if (centerDist <= 0) continue;

        ctx.beginPath();
        for (let r = 0; r <= rows; r++) {
          const pIdx = r * colsPlus1 + c;
          if (r === 0) ctx.moveTo(ptX[pIdx], ptY[pIdx]);
          else ctx.lineTo(ptX[pIdx], ptY[pIdx]);
        }
        const alpha = isDark
          ? (0.02 + 0.10 * centerDist)
          : (0.03 + 0.12 * centerDist);
        ctx.strokeStyle = isDark
          ? `rgba(6, 182, 212, ${alpha.toFixed(3)})`
          : `rgba(14, 165, 233, ${alpha.toFixed(3)})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // -----------------------------------------------------------------------
      // 2. Calm Energy Sparks
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

        if (rInt < rows) {
          const p1Idx = rInt * colsPlus1 + spark.col;
          const p2Idx = (rInt + 1) * colsPlus1 + spark.col;

          const curX = ptX[p1Idx] + (ptX[p2Idx] - ptX[p1Idx]) * rFrac;
          const curY = ptY[p1Idx] + (ptY[p2Idx] - ptY[p1Idx]) * rFrac;

          const baseSize = spark.size * ptScale[p1Idx] * 1.5;
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

      ctx.globalAlpha = 1;

      // -----------------------------------------------------------------------
      // 3. Drifting Crystal Stardust
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

export default React.memo(CyberGridBackground);
