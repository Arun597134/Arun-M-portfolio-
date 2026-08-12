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
  FiBookOpen
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

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const mobileLinksRef = useRef(null);
  const observerActive = useRef(true);
  const [btnPositions, setBtnPositions] = useState([]);
  
  const sectionCount = NAV_ITEMS.length;
  const progressBreaks = NAV_ITEMS.map((_, i) => i / (sectionCount - 1)); // [0, 0.143, 0.286, ...]
  const [scrollBreakpoints, setScrollBreakpoints] = useState(progressBreaks);

  // Global window scroll progress (0 at top, 1 at bottom)
  const { scrollYProgress } = useScroll();

  // 1. Measure mobile bottom nav button X-center positions on mount and resize
  useEffect(() => {
    const measure = () => {
      if (!mobileLinksRef.current) return;
      const container = mobileLinksRef.current;
      const containerRect = container.getBoundingClientRect();
      const buttons = container.querySelectorAll('.mobile-nav-btn');
      const positions = Array.from(buttons).map(btn => {
        const r = btn.getBoundingClientRect();
        return (r.left - containerRect.left) + (r.width / 2);
      });
      setBtnPositions(positions);
    };
    // Measure after a short delay to ensure layout is settled
    const timer = setTimeout(measure, 300);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(timer); window.removeEventListener('resize', measure); };
  }, []);

  // 2. Measure actual section heights dynamically to build physical scroll progress breakpoints
  useEffect(() => {
    const computeBreakpoints = () => {
      const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const viewHeight = window.innerHeight;
      const totalScrollable = Math.max(1, docHeight - viewHeight);
      
      let cumulative = 0;
      const breakpoints = NAV_ITEMS.map((item, idx) => {
        if (idx === 0) return 0;
        const prevEl = document.getElementById(NAV_ITEMS[idx - 1].id);
        if (prevEl) {
          cumulative += prevEl.offsetHeight;
        }
        return Math.min(1, cumulative / totalScrollable);
      });
      // Force last breakpoint to be exactly 1
      breakpoints[breakpoints.length - 1] = 1;
      setScrollBreakpoints(breakpoints);
    };

    const timer = setTimeout(computeBreakpoints, 400);
    window.addEventListener('resize', computeBreakpoints);
    return () => { clearTimeout(timer); window.removeEventListener('resize', computeBreakpoints); };
  }, []);

  // Map scroll progress to continuous X pixel positions between buttons for mobile
  const robotTargetX = useTransform(
    scrollYProgress,
    scrollBreakpoints,
    btnPositions.length === sectionCount ? btnPositions : progressBreaks.map(p => p * 320)
  );

  // Smooth spring for continuous mobile robot movement
  const smoothRobotX = useSpring(robotTargetX, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001
  });

  // Mobile bottom dock: derive trail fill FROM the robot's actual X position
  const lastBtnX = btnPositions.length > 0 ? btnPositions[btnPositions.length - 1] : 320;
  const firstBtnX = btnPositions.length > 0 ? btnPositions[0] : 6;
  const mobileTrailFill = useTransform(smoothRobotX, [firstBtnX, lastBtnX], [0, 1]);

  // Desktop horizontal robot: uses its own independent smooth scroll progress
  const desktopScrollSpring = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001
  });
  const desktopRobotLeft = useTransform(desktopScrollSpring, [0, 1], ['0%', '100%']);
  const desktopTrailFill = desktopScrollSpring;

  // Active section scroll tracking & navbar background scrolled state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -35% 0px',
      threshold: 0.15
    };

    const observerCallback = (entries) => {
      if (!observerActive.current) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    NAV_ITEMS.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
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
          </motion.div>
        </div>
      </header>

      {/* Mobile Top Header (Visible only on screens <= 1024px) */}
      <header className="mobile-top-header">
        <a href="#hero" onClick={(e) => { e.preventDefault(); handleScrollTo('hero'); }} className="navbar-logo">
          ARUN M<span className="logo-dot">.</span>
        </a>
        <div className="mobile-header-actions">
          <a 
            href="/ARUN_M_Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mobile-header-btn"
            aria-label="Resume"
          >
            <FiFileText size={16} />
          </a>
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
              style={{ scaleX: mobileTrailFill }}
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
