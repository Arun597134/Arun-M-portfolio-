import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { 
  FiSun, 
  FiMoon, 
  FiFileText, 
  FiHome, 
  FiFolder, 
  FiBriefcase, 
  FiUser, 
  FiMail, 
  FiCpu,
  FiAward,
  FiBookOpen,
  FiSmartphone
} from 'react-icons/fi';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'technologies', label: 'Tech Stack' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'certifications', label: 'Credentials' },
  { id: 'contact', label: 'Contact' }
];

// Ultra-fast linear piecewise interpolation helper for silky smooth 120 FPS tracking
function interpolateProgress(val, inputArr, outputArr) {
  if (!inputArr || !outputArr || inputArr.length === 0 || outputArr.length === 0) {
    return 0;
  }
  const len = Math.min(inputArr.length, outputArr.length);
  if (val <= inputArr[0]) return outputArr[0];
  if (val >= inputArr[len - 1]) return outputArr[len - 1];

  for (let i = 0; i < len - 1; i++) {
    if (val >= inputArr[i] && val <= inputArr[i + 1]) {
      const range = inputArr[i + 1] - inputArr[i];
      if (range === 0) return outputArr[i];
      const t = (val - inputArr[i]) / range;
      return outputArr[i] + t * (outputArr[i + 1] - outputArr[i]);
    }
  }
  return outputArr[len - 1];
}

function Navbar({ 
  theme, 
  toggleTheme, 
  spaceMode = false, 
  toggleSpaceMode, 
  activeSection: activeSectionProp, 
  setActiveSection: setActiveSectionProp 
}) {
  const [scrolled, setScrolled] = useState(false);
  const [internalActiveSection, setInternalActiveSection] = useState('hero');
  const activeSection = activeSectionProp !== undefined ? activeSectionProp : internalActiveSection;
  const setActiveSection = setActiveSectionProp || setInternalActiveSection;
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  // Listen for PWA installation capability prompt
  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowInstallBtn(false);
      console.log('App was successfully installed!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User installation decision: ${outcome}`);
    setDeferredPrompt(null);
    setShowInstallBtn(false);
  };

  const mobileLinksRef = useRef(null);
  const observerActive = useRef(true);
  const [btnPositions, setBtnPositions] = useState([]);
  
  const sectionCount = NAV_ITEMS.length;
  const progressBreaks = NAV_ITEMS.map((_, i) => i / (sectionCount - 1)); // [0, 0.143, 0.286, ...]
  const [scrollBreakpoints, setScrollBreakpoints] = useState(progressBreaks);
  
  const breakpointsRef = useRef(progressBreaks);
  const btnPositionsRef = useRef([]);

  // Global window scroll progress (0 at top, 1 at bottom)
  const { scrollYProgress } = useScroll();

  // Critically damped Apple spring for instantaneous, buttery 120 FPS momentum (Zero sluggishness, zero sticking)
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    mass: 0.2,
    restDelta: 0.0005
  });

  // 1. Measure mobile bottom nav button X-center positions relative to track on mount and resize
  useEffect(() => {
    const measure = () => {
      if (!mobileLinksRef.current) return;
      const container = mobileLinksRef.current;
      const track = container.querySelector('.mobile-robot-track-horizontal');
      const trackRect = track ? track.getBoundingClientRect() : container.getBoundingClientRect();
      const buttons = container.querySelectorAll('.mobile-nav-btn');
      if (buttons.length === 0) return;

      const positions = Array.from(buttons).map(btn => {
        const r = btn.getBoundingClientRect();
        return (r.left - trackRect.left) + (r.width / 2);
      });
      btnPositionsRef.current = positions;
      setBtnPositions(positions);
    };

    measure();
    const timer1 = setTimeout(measure, 150);
    const timer2 = setTimeout(measure, 500);
    window.addEventListener('resize', measure);
    return () => { 
      clearTimeout(timer1); 
      clearTimeout(timer2); 
      window.removeEventListener('resize', measure); 
    };
  }, []);

  // 2. Measure actual section offset tops dynamically to build strictly monotonic physical scroll progress breakpoints
  useEffect(() => {
    const computeBreakpoints = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
      const viewHeight = window.innerHeight;
      const maxScroll = Math.max(1, docHeight - viewHeight);

      const rawTops = NAV_ITEMS.map((item, idx) => {
        if (idx === 0) return 0;
        if (idx === NAV_ITEMS.length - 1) return maxScroll;
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementAbsTop = rect.top + window.scrollY;
          return Math.max(0, Math.min(maxScroll, elementAbsTop - viewHeight * 0.35));
        }
        return (idx / (NAV_ITEMS.length - 1)) * maxScroll;
      });

      const f = rawTops.map(top => Math.max(0, Math.min(1, top / maxScroll)));

      // Forward pass: strictly increasing with minimum 0.02 spacing
      for (let i = 1; i < f.length - 1; i++) {
        if (f[i] <= f[i - 1] + 0.02) {
          f[i] = f[i - 1] + 0.02;
        }
      }

      // Backward pass: keep breathing room before 1.0
      for (let i = f.length - 2; i >= 1; i--) {
        const maxAllowed = 1 - (f.length - 1 - i) * 0.025;
        if (f[i] >= maxAllowed) {
          f[i] = maxAllowed;
        }
      }

      f[0] = 0;
      f[f.length - 1] = 1;

      breakpointsRef.current = f;
      setScrollBreakpoints(f);
    };

    computeBreakpoints();
    const t1 = setTimeout(computeBreakpoints, 250);
    const t2 = setTimeout(computeBreakpoints, 800);
    window.addEventListener('resize', computeBreakpoints);
    window.addEventListener('load', computeBreakpoints);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', computeBreakpoints);
      window.removeEventListener('load', computeBreakpoints);
    };
  }, []);

  // Map scroll progress to continuous X pixel positions between buttons for mobile
  // Uses dynamic functional transform reading latest refs - never gets stale or stuck!
  const smoothRobotX = useTransform(smoothScrollProgress, (latest) => {
    const bps = breakpointsRef.current;
    const pts = btnPositionsRef.current;
    if (!pts || pts.length < sectionCount) {
      const fallbackPositions = progressBreaks.map(p => 20 + p * 300);
      return interpolateProgress(latest, bps, fallbackPositions);
    }
    return interpolateProgress(latest, bps, pts);
  });

  // Desktop horizontal robot: uses its own independent smooth scroll progress from 0% to 100%
  const desktopRobotLeft = useTransform(smoothScrollProgress, [0, 1], ['0%', '100%']);
  const desktopTrailFill = smoothScrollProgress;

  const sectionTopsRef = useRef({});
  const docHeightRef = useRef(0);

  // Active section scroll tracking & navbar background scrolled state (0 Layout Thrashing, Pure RAF)
  useEffect(() => {
    const measureSectionTops = () => {
      const tops = {};
      NAV_ITEMS.forEach(item => {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          tops[item.id] = rect.top + window.scrollY;
        }
      });
      sectionTopsRef.current = tops;
      docHeightRef.current = document.documentElement.scrollHeight || document.body.scrollHeight;
    };

    measureSectionTops();
    const settleTimer = setTimeout(measureSectionTops, 600);

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const isScrolled = scrollY > 50;
          setScrolled(prev => (prev !== isScrolled ? isScrolled : prev));

          if (observerActive.current) {
            const viewHeight = window.innerHeight;
            const docHeight = docHeightRef.current || 3000;

            if (scrollY + viewHeight >= docHeight - 70) {
              setActiveSection(prev => (prev !== 'contact' ? 'contact' : prev));
              ticking = false;
              return;
            }

            const focalLine = scrollY + viewHeight * 0.38;
            let current = 'hero';

            for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
              const id = NAV_ITEMS[i].id;
              const top = sectionTopsRef.current[id];
              if (top !== undefined && focalLine >= top - 30) {
                current = id;
                break;
              }
            }

            setActiveSection(prev => (prev !== current ? current : prev));
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', measureSectionTops);

    return () => {
      clearTimeout(settleTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', measureSectionTops);
    };
  }, []);

  const handleScrollTo = (id) => {
    observerActive.current = false;
    setActiveSection(id);
    
    const element = document.getElementById(id);
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { 
          duration: 1.2,
          onComplete: () => {
            setTimeout(() => {
              observerActive.current = true;
            }, 100);
          }
        });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          observerActive.current = true;
        }, 1000);
      }
    }
  };

  const getNavbarIcon = (id) => {
    switch (id) {
      case 'hero':
        return <FiHome size={18} />;
      case 'about':
        return <FiUser size={18} />;
      case 'work':
        return <FiFolder size={18} />;
      case 'experience':
        return <FiBriefcase size={18} />;
      case 'technologies':
        return <FiCpu size={18} />;
      case 'achievements':
        return <FiAward size={18} />;
      case 'certifications':
        return <FiBookOpen size={18} />;
      case 'contact':
        return <FiMail size={18} />;
      default:
        return <FiHome size={18} />;
    }
  };

  return (
    <>
      {/* Desktop Top Header Navbar (Visible only on screens > 1024px) */}
      <header className={`navbar-container desktop-header-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-wrapper">
          <a href="#hero" onClick={(e) => { e.preventDefault(); handleScrollTo('hero'); }} className="navbar-logo">
            ARUN M<span className="logo-dot">.</span>
          </a>

          <nav className="desktop-nav">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); handleScrollTo(item.id); }}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </a>
            ))}

            <a 
              href="/ARUN_M_Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-link resume-btn"
              style={{ marginLeft: '12px' }}
            >
              <FiFileText size={14} style={{ marginRight: '6px' }} />
              Resume
            </a>

            {/* Bespoke Celestial 3D Orbit Precision Toggle */}
            <button
              onClick={toggleSpaceMode}
              className={`celestial-toggle-btn ${spaceMode && theme === 'dark' ? 'active' : ''} ${theme === 'light' ? 'light-locked' : ''}`}
              title={
                theme === 'light'
                  ? '3D Orbit is exclusive to Dark Mode (disabled in Light Theme)'
                  : (spaceMode ? 'Switch to Clean Minimalist View' : 'Engage 3D Solar System Orrery')
              }
              aria-label="Toggle 3D Solar System Orrery"
              aria-disabled={theme === 'light'}
            >
              <span className="celestial-icon-wrap">
                <svg className="celestial-orbit-svg" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="2.6" className="orbit-sun" />
                  <ellipse cx="10" cy="10" rx="7.6" ry="3.6" transform="rotate(-28 10 10)" className="orbit-ellipse" strokeWidth="1.1" />
                  <circle cx="16" cy="7.2" r="1.3" className="orbit-satellite" />
                </svg>
              </span>
              <span className="celestial-label-group">
                <span className="celestial-label-title">3D ORBIT</span>
                <span className="celestial-status-pill">{spaceMode && theme === 'dark' ? 'ON' : 'OFF'}</span>
              </span>
            </button>

            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
          </nav>
        </div>

        {/* Horizontal AI Robot track & traveler for Desktop */}
        <div className="desktop-robot-track">
          <motion.div 
            className="desktop-robot-track-active"
            style={{ scaleX: desktopTrailFill }}
          />
          <motion.div 
            className="desktop-ai-robot-traveler"
            style={{ 
              left: desktopRobotLeft
            }}
          >
            <div className="desktop-robot-scanner-eye" />
            <FiCpu size={12} className="desktop-robot-travel-icon" />
            <div className="desktop-robot-hud-tag">
              <span className="robot-hud-dot" />
              <span className="robot-hud-text">
                {NAV_ITEMS.find(i => i.id === activeSection)?.label || 'Home'}
              </span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Mobile Top Header (Visible only on screens <= 1024px) */}
      <header className="mobile-top-header">
        <a href="#hero" onClick={(e) => { e.preventDefault(); handleScrollTo('hero'); }} className="navbar-logo">
          ARUN M<span className="logo-dot">.</span>
        </a>
        <div className="mobile-header-actions">
          {showInstallBtn && (
            <button 
              onClick={handleInstallApp} 
              className="mobile-header-btn install-app-btn"
              aria-label="Install App"
              style={{ color: 'var(--accent)' }}
            >
              <FiSmartphone size={16} style={{ animation: 'installPulse 2s infinite' }} />
            </button>
          )}
          <a 
            href="/ARUN_M_Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mobile-header-btn"
            aria-label="Resume"
          >
            <FiFileText size={16} />
          </a>
          {/* Bespoke Celestial 3D Orbit Mobile Toggle */}
          <button 
            onClick={toggleSpaceMode} 
            className={`mobile-header-btn celestial-mobile-btn ${spaceMode && theme === 'dark' ? 'active' : ''} ${theme === 'light' ? 'light-locked' : ''}`} 
            title={
              theme === 'light'
                ? '3D Orbit is exclusive to Dark Mode (disabled in Light Theme)'
                : (spaceMode ? 'Switch to Clean Minimalist View' : 'Engage 3D Solar System Orrery')
            }
            aria-label="Toggle 3D Solar View"
            aria-disabled={theme === 'light'}
          >
            <svg className="celestial-orbit-svg" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="2.6" className="orbit-sun" />
              <ellipse cx="10" cy="10" rx="7.6" ry="3.6" transform="rotate(-28 10 10)" className="orbit-ellipse" strokeWidth="1.1" />
              <circle cx="16" cy="7.2" r="1.3" className="orbit-satellite" />
            </svg>
            <span className="celestial-mobile-dot" />
          </button>
          <button 
            onClick={toggleTheme} 
            className="mobile-header-btn" 
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
        </div>
      </header>

      {/* Floating Spaceful Bottom Navigation Dock (Visible only on screens <= 1024px) */}
      <nav className="mobile-bottom-dock">
        <div className="mobile-dock-links-container" ref={mobileLinksRef}>
          {/* AI Robot traveling path track (Horizontal on mobile bottom dock!) */}
          <div className="mobile-robot-track-horizontal">
            {/* Traveled path in glow */}
            <motion.div 
              className="mobile-robot-track-active-horizontal"
              style={{ width: smoothRobotX }}
            />
            {/* The traveling AI Robot (Smooth continuous horizontal scroll-linked position) */}
            <motion.div 
              className="mobile-ai-robot-traveler"
              style={{ 
                left: smoothRobotX
              }}
            >
              <div className="robot-scanner-eye" />
              <FiCpu size={14} className="robot-travel-icon" />
              <div className="robot-hud-tag">
                <span className="robot-hud-dot" />
                <span className="robot-hud-text">
                  {NAV_ITEMS.find(i => i.id === activeSection)?.label || 'Home'}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Individual Navigation Icons */}
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
                aria-label={`Scroll to ${item.label}`}
              >
                {getNavbarIcon(item.id)}
                <span className="mobile-btn-tooltip">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default React.memo(Navbar);
