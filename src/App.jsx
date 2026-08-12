import React, { useState, useEffect, useRef } from 'react';
import Loader from './components/Loader';
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
import Lenis from 'lenis';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'hover' | 'project'
  const [activeTech, setActiveTech] = useState(null); // Lifted state for project highlights
  const [isMobile, setIsMobile] = useState(false);

  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const appRef = useRef(null);
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

  // Detect mobile width and pointer properties
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth Scroll - Lenis (Tuned to macOS native desktop inertial wheel curves - Desktop only)
  useEffect(() => {
    if (loading || isMobile) return;

    const lenis = new Lenis({
      duration: 1.1, // Snappier, faster scroll speed
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      wheelMultiplier: 1.0,
      autoRaf: true,
    });

    window.lenis = lenis;

    const handleResize = () => {
      lenis.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
      window.lenis = null;
    };
  }, [loading, isMobile]);

  // Custom Cursor and Grid Background Movement (Desktop only)
  useEffect(() => {
    if (loading || isMobile) return;

    let activeFrame = false;

    const handleMouseMove = (e) => {
      followerPos.current.targetX = e.clientX;
      followerPos.current.targetY = e.clientY;

      // Throttle CSS variable updates to mouse movements instead of every animation frame
      if (!activeFrame) {
        activeFrame = true;
        requestAnimationFrame(() => {
          if (appRef.current) {
            appRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
            appRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
          }
          activeFrame = false;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const render = () => {
      // Lerp logic for smooth follower lag (tuned to 0.09 for soft magnetic slide follow)
      const dx = followerPos.current.targetX - followerPos.current.x;
      const dy = followerPos.current.targetY - followerPos.current.y;
      
      followerPos.current.x += dx * 0.09;
      followerPos.current.y += dy * 0.09;
 
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(calc(${followerPos.current.x}px - 50%), calc(${followerPos.current.y}px - 50%), 0)`;
      }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(calc(${followerPos.current.targetX}px - 50%), calc(${followerPos.current.targetY}px - 50%), 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Event delegation for hover states (Highly performant, covers dynamic elements)
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const hoverable = target.closest('a, button, input, textarea, select, .magnetic-btn, .hover-card, [data-hover]');
      if (hoverable) {
        setCursorType('hover');
      } else {
        const projectCard = target.closest('.project-case-study');
        if (projectCard) {
          setCursorType('project');
        } else {
          setCursorType('default');
        }
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

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
    <div ref={appRef} className={`app-container cursor-${cursorType}`}>
      {/* Visual background layers */}
      <div className="noise-overlay" />
      <div className="grid-background" />
      
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
        <Hero />
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
