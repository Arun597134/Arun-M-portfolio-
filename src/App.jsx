import React, { useState, useEffect, useRef } from 'react';
import Loader from './components/Loader';
import CyberGridBackground from './components/CyberGridBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SelectedWork from './components/SelectedWork';
import Experience from './components/Experience';
import Technologies from './components/Technologies';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [activeTech, setActiveTech] = useState(null); // Lifted state for project highlights
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
  });

  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const appRef = useRef(null);
  const cursorTypeRef = useRef('default');
  const followerPos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Handle Theme Toggle
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Reset scroll position to top on page reload/first mount
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.history && window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Failsafe: guarantee loader dismisses even if timers are throttled in inactive background tabs
  useEffect(() => {
    const failsafeTimer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(failsafeTimer);
  }, []);

  // Detect mobile width and pointer properties
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Custom Cursor (Desktop only - 0 DOM dirtying, pure GPU transform)
  useEffect(() => {
    if (loading || isMobile) return;

    const handleMouseMove = (e) => {
      followerPos.current.targetX = e.clientX;
      followerPos.current.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId;
    const render = () => {
      // Lerp logic for smooth follower lag (tuned to 0.10 for responsive, silky glide)
      const dx = followerPos.current.targetX - followerPos.current.x;
      const dy = followerPos.current.targetY - followerPos.current.y;
      
      followerPos.current.x += dx * 0.10;
      followerPos.current.y += dy * 0.10;
 
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(calc(${followerPos.current.x}px - 50%), calc(${followerPos.current.y}px - 50%), 0)`;
      }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(calc(${followerPos.current.targetX}px - 50%), calc(${followerPos.current.targetY}px - 50%), 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Event delegation for hover states (Direct DOM update - 0 React re-renders)
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      let newType = 'default';
      const hoverable = target.closest('a, button, input, textarea, select, .magnetic-btn, .hover-card, [data-hover]');
      if (hoverable) {
        newType = 'hover';
      } else {
        const projectCard = target.closest('.project-case-study');
        if (projectCard) {
          newType = 'project';
        }
      }

      if (cursorTypeRef.current !== newType) {
        cursorTypeRef.current = newType;
        if (appRef.current) {
          appRef.current.classList.remove('cursor-default', 'cursor-hover', 'cursor-project');
          appRef.current.classList.add(`cursor-${newType}`);
        }
      }
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [loading, isMobile]);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <div ref={appRef} className="app-container cursor-default">
      {/* Dynamic Cyber Grid Wave Background with Neon Sparks */}
      <CyberGridBackground theme={theme} />
      <div className="noise-overlay" />
      
      {/* Custom Cursor elements (Desktop only) */}
      {!isMobile && (
        <>
          <div ref={cursorRef} className="custom-cursor" />
          <div ref={followerRef} className="custom-cursor-follower" />
        </>
      )}

      {/* Main site pages */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} />
        <About />
        <SelectedWork activeTech={activeTech} />
        <Experience />
        <Technologies activeTech={activeTech} setActiveTech={setActiveTech} />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
