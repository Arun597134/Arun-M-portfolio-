import React, { useEffect, useRef } from 'react';
import ArchitecturalGlassPanels from './ArchitecturalGlassPanels';
import RealisticSolarSystem from './RealisticSolarSystem';

/**
 * Pure 3D Optical Glass Architecture & Interactive 3D Solar Lab Background (Option B)
 * - Default Background: Architectural Frosted Glass Blueprint Panels (Apple / Drafting Style)
 * - Space Mode (Interactive Toggle): Realistic 3D Solar System (Heliocentric Orrery with 8 Planets, Moons & 3D IMAX flyby)
 * 100% GPU compositor-driven with buttery 120 FPS momentum.
 */
function CyberGridBackground({ theme, spaceMode = false, activeSection = 'hero' }) {
  const containerRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);

  useEffect(() => {
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Target and current tilt coordinates with spring momentum
    const tilt = {
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
    };

    let baseGamma = null;
    let baseBeta = null;
    const shake = { x: 0, y: 0 };

    // 1. MOBILE: Device Orientation Tracking (Phone Tilt & Turn)
    const handleOrientation = (e) => {
      if (e.gamma === null || e.beta === null) return;

      // Auto-calibrate resting baseline on first readings
      if (baseGamma === null) {
        baseGamma = e.gamma;
        baseBeta = e.beta;
      } else {
        // Slow adaptive baseline drift so re-positioning hands re-centers naturally
        baseGamma += (e.gamma - baseGamma) * 0.005;
        baseBeta += (e.beta - baseBeta) * 0.005;
      }

      // e.gamma: left/right tilt [-90 to 90]
      // e.beta: front/back tilt [-180 to 180]
      const deltaX = (e.gamma - baseGamma) / 16;
      const deltaY = (e.beta - baseBeta) / 16;

      tilt.targetX = Math.max(-2.2, Math.min(2.2, deltaX));
      tilt.targetY = Math.max(-2.2, Math.min(2.2, deltaY));
    };

    // 2. MOBILE: Shake & Physical Motion Impulse (DeviceMotion)
    const handleMotion = (e) => {
      const acc = e.acceleration || e.accelerationIncludingGravity;
      if (!acc) return;
      const ax = acc.x || 0;
      const ay = acc.y || 0;

      // When the user physically shakes the phone, add velocity kick in the shake direction
      if (Math.abs(ax) > 1.2 || Math.abs(ay) > 1.2) {
        shake.x = Math.max(-2.5, Math.min(2.5, shake.x + (ax * 0.22)));
        shake.y = Math.max(-2.5, Math.min(2.5, shake.y - (ay * 0.22)));
      }
    };

    // 3. MOBILE: Touch Drag Fallback & Hybrid Travel
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        const normX = ((touch.clientX / width) - 0.5) * 2.2;
        const normY = ((touch.clientY / height) - 0.5) * 2.2;
        tilt.targetX = Math.max(-2.0, Math.min(2.0, normX));
        tilt.targetY = Math.max(-2.0, Math.min(2.0, normY));
      }
    };

    // 4. DESKTOP: Mouse Movement Tracking
    const handleMouseMove = (e) => {
      const normX = ((e.clientX / width) - 0.5) * 2.2;
      const normY = ((e.clientY / height) - 0.5) * 2.2;
      tilt.targetX = Math.max(-2.0, Math.min(2.0, normX));
      tilt.targetY = Math.max(-2.0, Math.min(2.0, normY));
    };

    // Attach listeners conditionally
    if (isMobile) {
      // Support DeviceOrientation
      if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        window.addEventListener('deviceorientation', handleOrientation, { passive: true });
        // Handle iOS 13+ permission request on user tap
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
          const requestIOSPerm = () => {
            DeviceOrientationEvent.requestPermission()
              .then((state) => {
                if (state === 'granted') {
                  window.addEventListener('deviceorientation', handleOrientation, { passive: true });
                }
              })
              .catch(() => {});
            window.removeEventListener('touchstart', requestIOSPerm);
          };
          window.addEventListener('touchstart', requestIOSPerm, { passive: true, once: true });
        }
      }

      // Support DeviceMotion (shake impulse)
      if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) {
        window.addEventListener('devicemotion', handleMotion, { passive: true });
      }

      // Support touch drag
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
    } else {
      // Desktop mousemove
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Scroll throttle: pause DOM writes during active scrolling so the scroll thread runs at locked 120 FPS
    let isScrolling = false;
    let scrollDebounceTimer = null;
    const handleScroll = () => {
      isScrolling = true;
      if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer);
      scrollDebounceTimer = setTimeout(() => {
        isScrolling = false;
      }, 90);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let time = 0;
    let lastAppliedX = null;
    let lastAppliedY = null;

    // Silky Spring Render Loop (Locked 120 FPS momentum)
    const render = () => {
      time += 0.015;

      // Gentle ambient floating oscillation (breathing zero-gravity motion)
      const autoTiltX = Math.sin(time * 0.8) * 0.08;
      const autoTiltY = Math.cos(time * 0.6) * 0.06;

      // Decay shake impulse smoothly like a physical spring damper
      shake.x *= 0.90;
      shake.y *= 0.90;

      const combinedTargetX = Math.max(-2.8, Math.min(2.8, tilt.targetX + shake.x));
      const combinedTargetY = Math.max(-2.8, Math.min(2.8, tilt.targetY + shake.y));

      // Critically damped Apple spring lerp
      tilt.currentX += (combinedTargetX - tilt.currentX) * 0.085;
      tilt.currentY += (combinedTargetY - tilt.currentY) * 0.085;

      // When actively scrolling, skip DOM custom property mutations to guarantee 100% scroll frame rate
      if (!isScrolling && containerRef.current) {
        const finalX = (tilt.currentX + autoTiltX).toFixed(3);
        const finalY = (tilt.currentY + autoTiltY).toFixed(3);

        if (finalX !== lastAppliedX || finalY !== lastAppliedY) {
          lastAppliedX = finalX;
          lastAppliedY = finalY;
          containerRef.current.style.setProperty('--tilt-x', finalX);
          containerRef.current.style.setProperty('--tilt-y', finalY);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer);
      if (isMobile) {
        window.removeEventListener('deviceorientation', handleOrientation);
        window.removeEventListener('devicemotion', handleMotion);
        window.removeEventListener('touchmove', handleTouchMove);
      } else {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  // Space mode runs on both Desktop and Mobile when toggled
  const isSolarActive = Boolean(spaceMode);

  return (
    <div
      ref={containerRef}
      className={`cyber-grid-container ${isSolarActive ? 'solar-active' : ''}`}
      aria-hidden={!isSolarActive}
    >
      {isSolarActive ? (
        <RealisticSolarSystem />
      ) : (
        <ArchitecturalGlassPanels theme={theme} activeSection={activeSection} />
      )}
    </div>
  );
}

export default React.memo(CyberGridBackground);
