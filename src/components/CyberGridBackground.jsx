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

    // Mouse coordinates with easing
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

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

    // Cyber perspective wave parameters
    const cols = 28;
    const rows = 22;
    let time = 0;

    // Sparks flowing along grid lines
    const sparks = [];
    const maxSparks = 26;

    for (let i = 0; i < maxSparks; i++) {
      sparks.push({
        col: Math.floor(Math.random() * cols),
        row: Math.random() * rows,
        speed: 0.04 + Math.random() * 0.08,
        length: 1.2 + Math.random() * 1.5,
        colorType: Math.random() > 0.5 ? 'cyan' : 'accent',
        opacity: 0.4 + Math.random() * 0.6
      });
    }

    const render = () => {
      time += 0.016;

      // Smooth mouse tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const isDark = theme === 'dark';

      // Clear canvas with subtle transparency for trails
      ctx.clearRect(0, 0, width, height);

      // Color palettes based on theme
      const gridBaseColor = isDark ? 'rgba(79, 70, 229, ' : 'rgba(99, 102, 241, ';
      const cyanGlow = isDark ? '#06b6d4' : '#0284c7';
      const accentGlow = isDark ? '#818cf8' : '#4f46e5';

      // Perspective horizon parameters
      const horizonY = height * 0.28;
      const fov = 380;
      const cameraY = -120;
      const cameraZ = -140;

      // Calculate 3D grid vertices with sine wave undulating ripple
      const gridPoints = [];

      for (let r = 0; r <= rows; r++) {
        const rowArr = [];
        // Z extends into the distance
        const z = r * 45 + 50;
        const scale = fov / (fov + z - cameraZ);

        for (let c = 0; c <= cols; c++) {
          // X spreads out from center
          const worldX = (c - cols / 2) * 95;

          // Undulating wave heights: combination of distance wave and mouse ripple
          const distToMouse = Math.hypot(
            width / 2 + worldX * scale - mouse.x,
            horizonY + (z + cameraY) * scale - mouse.y
          );
          const mouseWave = Math.sin(distToMouse * 0.015 - time * 3) * Math.max(0, 35 - distToMouse * 0.06);

          const wave = Math.sin(c * 0.35 + time * 1.5) * 16 +
                       Math.cos(r * 0.4 - time * 1.2) * 18 +
                       mouseWave;

          const screenX = width / 2 + worldX * scale;
          const screenY = horizonY + (wave - cameraY) * scale * 2.2 + (z * 0.45);

          rowArr.push({
            x: screenX,
            y: screenY,
            z: z,
            scale: scale,
            waveIntensity: Math.abs(wave)
          });
        }
        gridPoints.push(rowArr);
      }

      // Draw horizontal curved grid lines
      ctx.lineWidth = 1;
      for (let r = 0; r <= rows; r++) {
        const rowAlpha = Math.max(0, Math.min(1, (r / rows) * (1 - r / (rows * 1.35))));
        const strokeAlpha = (isDark ? 0.07 : 0.05) * rowAlpha;

        ctx.strokeStyle = `${gridBaseColor}${strokeAlpha})`;
        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const pt = gridPoints[r][c];
          if (c === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // Draw perspective longitudinal grid lines
      for (let c = 0; c <= cols; c++) {
        const colAlpha = 1 - Math.abs(c - cols / 2) / (cols / 1.7);
        if (colAlpha <= 0) continue;

        ctx.beginPath();
        for (let r = 0; r <= rows; r++) {
          const pt = gridPoints[r][c];
          const strokeAlpha = (isDark ? 0.06 : 0.045) * colAlpha * (r / rows);
          ctx.strokeStyle = `${gridBaseColor}${strokeAlpha})`;
          if (r === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // Render and update glowing neon sparks traveling along grid lines
      for (let i = 0; i < sparks.length; i++) {
        const spark = sparks[i];
        spark.row += spark.speed;

        if (spark.row >= rows - 1) {
          spark.row = 1;
          spark.col = Math.floor(Math.random() * cols);
          spark.speed = 0.04 + Math.random() * 0.08;
        }

        const rInt = Math.floor(spark.row);
        const rFrac = spark.row - rInt;

        if (gridPoints[rInt] && gridPoints[rInt + 1] && gridPoints[rInt][spark.col] && gridPoints[rInt + 1][spark.col]) {
          const p1 = gridPoints[rInt][spark.col];
          const p2 = gridPoints[rInt + 1][spark.col];

          const curX = p1.x + (p2.x - p1.x) * rFrac;
          const curY = p1.y + (p2.y - p1.y) * rFrac;
          const size = Math.max(1.5, p1.scale * 3.5);

          const glowColor = spark.colorType === 'cyan' ? cyanGlow : accentGlow;
          const sparkAlpha = Math.sin((spark.row / rows) * Math.PI) * spark.opacity * (isDark ? 0.85 : 0.7);

          // Spark glow circle
          ctx.save();
          ctx.shadowBlur = isDark ? 12 : 8;
          ctx.shadowColor = glowColor;
          ctx.fillStyle = glowColor;
          ctx.globalAlpha = sparkAlpha;
          ctx.beginPath();
          ctx.arc(curX, curY, size, 0, Math.PI * 2);
          ctx.fill();

          // Spark bright center
          ctx.fillStyle = isDark ? '#ffffff' : '#f8fafc';
          ctx.globalAlpha = Math.min(1, sparkAlpha * 1.3);
          ctx.beginPath();
          ctx.arc(curX, curY, size * 0.45, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // Dynamic ambient vignette gradient (dark vs light)
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, 80,
        width / 2, height / 2, Math.max(width, height) * 0.75
      );

      if (isDark) {
        vignette.addColorStop(0, 'rgba(9, 9, 9, 0)');
        vignette.addColorStop(0.65, 'rgba(9, 9, 9, 0.45)');
        vignette.addColorStop(1, 'rgba(9, 9, 9, 0.92)');
      } else {
        vignette.addColorStop(0, 'rgba(249, 249, 251, 0)');
        vignette.addColorStop(0.65, 'rgba(249, 249, 251, 0.4)');
        vignette.addColorStop(1, 'rgba(249, 249, 251, 0.9)');
      }

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

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
