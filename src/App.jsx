import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
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
  // Option B: 3D Solar Lab interactive mode (clean default dark background; 3D Solar System launches on click)
  const [spaceMode, setSpaceMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') return false;
    return localStorage.getItem('spaceMode') === 'true';
  });
  const [activeTech, setActiveTech] = useState(null); // Lifted state for project highlights
  const [activeSection, setActiveSection] = useState('hero'); // Lifted state for live HUD & telemetry tracking
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
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      // Precaution: If switching to light theme, disable 3D solar background
      if (nextTheme === 'light') {
        setSpaceMode(false);
        localStorage.setItem('spaceMode', 'false');
      }
      return nextTheme;
    });
  };

  // Handle 3D Solar Lab Toggle
  const toggleSpaceMode = () => {
    // If clicked while in light theme, auto-switch to dark theme so 3D Solar System shines
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setSpaceMode(true);
      localStorage.setItem('spaceMode', 'true');
      return;
    }
    setSpaceMode((prev) => {
      const next = !prev;
      localStorage.setItem('spaceMode', String(next));
      return next;
    });
  };

  // Precautionary Guard: Ensure spaceMode is disabled if theme becomes Light
  useEffect(() => {
    if (theme === 'light' && spaceMode) {
      setSpaceMode(false);
      localStorage.setItem('spaceMode', 'false');
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync body class for space mode background interactions
  useEffect(() => {
    if (spaceMode) {
      document.body.classList.add('space-mode-active');
    } else {
      document.body.classList.remove('space-mode-active');
    }
    return () => {
      document.body.classList.remove('space-mode-active');
    };
  }, [spaceMode]);

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

  // Initialize Studio Freight Lenis for ultra-luxurious, butter-smooth 120 FPS momentum scrolling
  // Enabled on both Desktop and Mobile with native touch sync & Apple-grade exponential inertia
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-grade exponential inertia
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: true, // Mimics native touch with silky RAF sync on mobile
      syncTouchLerp: 0.08, // Buttery inertia on mobile touch
      touchInertiaExponent: 1.7,
      touchMultiplier: 1.2,
      infinite: false,
    });

    window.lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
    };
  }, [loading]);

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
      // Lerp logic for smooth follower lag (tuned to 0.16 for responsive, silky glide)
      const dx = followerPos.current.targetX - followerPos.current.x;
      const dy = followerPos.current.targetY - followerPos.current.y;
      
      // Update primary cursor immediately for crisp, zero-latency response
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(calc(${followerPos.current.targetX}px - 50%), calc(${followerPos.current.targetY}px - 50%), 0)`;
      }

      // Smooth trailing follower interpolation
      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        followerPos.current.x += dx * 0.16;
        followerPos.current.y += dy * 0.16;
   
        if (followerRef.current) {
          followerRef.current.style.transform = `translate3d(calc(${followerPos.current.x.toFixed(1)}px - 50%), calc(${followerPos.current.y.toFixed(1)}px - 50%), 0)`;
        }
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
      {/* Dynamic Cyber Grid Wave Background with Neon Sparks & 3D Solar Lab */}
      <CyberGridBackground theme={theme} spaceMode={spaceMode} activeSection={activeSection} />
      
      {/* Custom Cursor elements (Desktop only) */}
      {!isMobile && (
        <>
          <div ref={cursorRef} className="custom-cursor" />
          <div ref={followerRef} className="custom-cursor-follower" />
        </>
      )}

      {/* Main site pages */}
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        spaceMode={spaceMode} 
        toggleSpaceMode={toggleSpaceMode} 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main>
        <Hero theme={theme} />
        <About />
        <SelectedWork activeTech={activeTech} />
        <Experience />
        <Technologies activeTech={activeTech} setActiveTech={setActiveTech} />
        <Achievements theme={theme} />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
