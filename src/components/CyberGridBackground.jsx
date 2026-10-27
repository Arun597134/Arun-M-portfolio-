import React, { useEffect, useRef } from 'react';

export default function CyberGridBackground({ theme }) {
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

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Grid geometry
    const cols = 32;
    const rows = 24;
    let time = 0;

    // Glowing spark particles traveling along lines
    const sparkCount = 42;
    const sparks = [];
    for (let i = 0; i < sparkCount; i++) {
      sparks.push({
        col: Math.floor(Math.random() * cols),
        row: Math.random() * rows,
        speed: 0.035 + Math.random() * 0.065,
        size: 2.2 + Math.random() * 2.8,
        colorType: Math.random() > 0.45 ? 'cyan' : 'purple',
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Drifting ambient aurora orbs
    const orbs = [
      { x: width * 0.25, y: height * 0.3, vx: 0.25, vy: 0.18, r: 380, color: 'indigo' },
      { x: width * 0.75, y: height * 0.45, vx: -0.22, vy: 0.2, r: 420, color: 'cyan' },
      { x: width * 0.5, y: height * 0.75, vx: 0.15, vy: -0.16, r: 400, color: 'violet' },
    ];

    const render = () => {
      time += 0.018;

      // Mouse smoothing
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      const isDark = theme === 'dark';

      // Clear frame
      ctx.clearRect(0, 0, width, height);

      // -----------------------------------------------------------------------
      // 1. Drifting Ambient Aurora Glow Clouds
      // -----------------------------------------------------------------------
      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1;
        if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1;

        const g = ctx.createRadialGradient(orb.x, orb.y, 10, orb.x, orb.y, orb.r);

        if (isDark) {
          if (orb.color === 'indigo') {
            g.addColorStop(0, 'rgba(79, 70, 229, 0.18)');
            g.addColorStop(0.5, 'rgba(79, 70, 229, 0.07)');
            g.addColorStop(1, 'transparent');
          } else if (orb.color === 'cyan') {
            g.addColorStop(0, 'rgba(6, 182, 212, 0.14)');
            g.addColorStop(0.5, 'rgba(6, 182, 212, 0.05)');
            g.addColorStop(1, 'transparent');
          } else {
            g.addColorStop(0, 'rgba(139, 92, 246, 0.15)');
            g.addColorStop(0.5, 'rgba(139, 92, 246, 0.05)');
            g.addColorStop(1, 'transparent');
          }
        } else {
          // Vibrant modern light theme aurora clouds
          if (orb.color === 'indigo') {
            g.addColorStop(0, 'rgba(99, 102, 241, 0.16)');
            g.addColorStop(0.5, 'rgba(99, 102, 241, 0.06)');
            g.addColorStop(1, 'transparent');
          } else if (orb.color === 'cyan') {
            g.addColorStop(0, 'rgba(14, 165, 233, 0.15)');
            g.addColorStop(0.5, 'rgba(14, 165, 233, 0.05)');
            g.addColorStop(1, 'transparent');
          } else {
            g.addColorStop(0, 'rgba(168, 85, 247, 0.12)');
            g.addColorStop(0.5, 'rgba(168, 85, 247, 0.04)');
            g.addColorStop(1, 'transparent');
          }
        }

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // -----------------------------------------------------------------------
      // 2. Interactive Cursor Energy Halo
      // -----------------------------------------------------------------------
      const mouseGlow = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, isDark ? 320 : 260
      );
      if (isDark) {
        mouseGlow.addColorStop(0, 'rgba(99, 102, 241, 0.22)');
        mouseGlow.addColorStop(0.4, 'rgba(6, 182, 212, 0.08)');
        mouseGlow.addColorStop(1, 'transparent');
      } else {
        mouseGlow.addColorStop(0, 'rgba(79, 70, 229, 0.16)');
        mouseGlow.addColorStop(0.4, 'rgba(14, 165, 233, 0.07)');
        mouseGlow.addColorStop(1, 'transparent');
      }
      ctx.fillStyle = mouseGlow;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, isDark ? 320 : 260, 0, Math.PI * 2);
      ctx.fill();

      // -----------------------------------------------------------------------
      // 3. Perspective 3D Undulating Cyber Grid Wave
      // -----------------------------------------------------------------------
      const horizonY = height * 0.25;
      const fov = 420;
      const cameraY = -110;
      const cameraZ = -160;

      const gridPoints = [];

      for (let r = 0; r <= rows; r++) {
        const rowArr = [];
        const z = r * 50 + 60;
        const scale = fov / (fov + z - cameraZ);

        for (let c = 0; c <= cols; c++) {
          const worldX = (c - cols / 2) * 110;

          // Interactive ripples when mouse hovers nearby
          const ptScreenX = width / 2 + worldX * scale;
          const distMouse = Math.hypot(ptScreenX - mouse.x, (horizonY + z * 0.5) - mouse.y);
          const mouseLift = Math.sin(distMouse * 0.012 - time * 2.8) * Math.max(0, 40 - distMouse * 0.08);

          // Natural undulating ocean-like cyber wave
          const wave =
            Math.sin(c * 0.38 + time * 1.6) * 22 +
            Math.cos(r * 0.42 - time * 1.3) * 20 +
            mouseLift;

          const screenX = width / 2 + worldX * scale;
          const screenY = horizonY + (wave - cameraY) * scale * 2.6 + z * 0.48;

          rowArr.push({
            x: screenX,
            y: screenY,
            z: z,
            scale: scale,
            waveHeight: wave,
          });
        }
        gridPoints.push(rowArr);
      }

      // Render Horizontal Waves
      for (let r = 0; r <= rows; r++) {
        const depthFactor = (r / rows);
        const curveFade = Math.sin(depthFactor * Math.PI);

        const alpha = isDark
          ? 0.05 + curveFade * 0.22
          : 0.06 + curveFade * 0.25;

        ctx.strokeStyle = isDark
          ? `rgba(99, 102, 241, ${alpha})`
          : `rgba(79, 70, 229, ${alpha})`;
        ctx.lineWidth = Math.max(1, 1.8 * depthFactor);

        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const pt = gridPoints[r][c];
          if (c === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // Render Perspective Longitudinal Grid Lines
      for (let c = 0; c <= cols; c++) {
        const centerDist = 1 - Math.abs(c - cols / 2) / (cols / 1.6);
        if (centerDist <= 0) continue;

        ctx.beginPath();
        for (let r = 0; r <= rows; r++) {
          const pt = gridPoints[r][c];
          const depthFactor = r / rows;
          const alpha = isDark
            ? (0.04 + depthFactor * 0.18) * centerDist
            : (0.05 + depthFactor * 0.22) * centerDist;

          ctx.strokeStyle = isDark
            ? `rgba(6, 182, 212, ${alpha})`
            : `rgba(14, 165, 233, ${alpha})`;
          ctx.lineWidth = Math.max(0.8, 1.6 * depthFactor);

          if (r === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // -----------------------------------------------------------------------
      // 4. Glowing Neon Sparks & Intersection Energy Nodes
      // -----------------------------------------------------------------------
      for (let i = 0; i < sparks.length; i++) {
        const spark = sparks[i];
        spark.row += spark.speed;
        spark.pulse += 0.05;

        if (spark.row >= rows - 1) {
          spark.row = 1;
          spark.col = Math.floor(Math.random() * cols);
          spark.speed = 0.035 + Math.random() * 0.065;
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

          const baseSize = spark.size * p1.scale * 1.8;
          const pulseEffect = Math.sin(spark.pulse) * 0.3 + 1;
          const finalSize = Math.max(2, baseSize * pulseEffect);

          const glowColor =
            spark.colorType === 'cyan'
              ? isDark ? '#22d3ee' : '#0284c7'
              : isDark ? '#a78bfa' : '#6366f1';

          const sparkAlpha = Math.sin((spark.row / rows) * Math.PI) * (isDark ? 0.95 : 0.85);

          ctx.save();
          // Outer Glow
          ctx.shadowBlur = isDark ? 14 : 9;
          ctx.shadowColor = glowColor;
          ctx.fillStyle = glowColor;
          ctx.globalAlpha = sparkAlpha;
          ctx.beginPath();
          ctx.arc(curX, curY, finalSize * 1.5, 0, Math.PI * 2);
          ctx.fill();

          // Intense Core
          ctx.fillStyle = isDark ? '#ffffff' : '#f8fafc';
          ctx.globalAlpha = Math.min(1, sparkAlpha * 1.4);
          ctx.beginPath();
          ctx.arc(curX, curY, finalSize * 0.55, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="cyber-grid-canvas"
      aria-hidden="true"
    />
  );
}
