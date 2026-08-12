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

  const sidebarLinksRef = useRef(null);
  const observerActive = useRef(true);
  const [btnPositions, setBtnPositions] = useState([]);

  // Global window scroll progress (0 at top, 1 at bottom)
  const { scrollYProgress } = useScroll();

  // Measure sidebar button Y-center positions on mount and resize
  useEffect(() => {
    const measure = () => {
      if (!sidebarLinksRef.current) return;
      const container = sidebarLinksRef.current;
      const containerRect = container.getBoundingClientRect();
      const buttons = container.querySelectorAll('.sidebar-nav-btn');
      const positions = Array.from(buttons).map(btn => {
        const r = btn.getBoundingClientRect();
        return (r.top - containerRect.top) + (r.height / 2);
      });
      setBtnPositions(positions);
    };
    // Measure after a short delay to ensure layout is settled
    const timer = setTimeout(measure, 300);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(timer); window.removeEventListener('resize', measure); };
  }, []);

  // Build scroll-progress breakpoints: evenly space sections across 0-1 range
  const sectionCount = NAV_ITEMS.length;
  const progressBreaks = NAV_ITEMS.map((_, i) => i / (sectionCount - 1)); // [0, 0.143, 0.286, ...]

  // Map scroll progress to continuous Y pixel positions between buttons
  const robotTargetY = useTransform(
    scrollYProgress,
    progressBreaks,
    btnPositions.length === sectionCount ? btnPositions : progressBreaks.map(p => p * 426)
  );

  // Smooth spring for continuous mobile robot movement
  const smoothRobotY = useSpring(robotTargetY, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001
  });

  // Mobile sidebar: derive trail fill FROM the robot's actual Y position
  // This ensures the glowing trail always ends exactly where the robot is
  const lastBtnY = btnPositions.length > 0 ? btnPositions[btnPositions.length - 1] : 426;
  const firstBtnY = btnPositions.length > 0 ? btnPositions[0] : 6;
  const sidebarTrailFill = useTransform(smoothRobotY, [firstBtnY, lastBtnY], [0, 1]);

  // Desktop horizontal robot: uses its own independent smooth scroll progress
  // (Desktop doesn't have sidebar buttons rendered, so it tracks raw scroll progress directly)
  const desktopScrollSpring = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001
  });
  const desktopRobotLeft = useTransform(desktopScrollSpring, [0, 1], ['0%', '100%']);
  // Desktop trail fills to exactly where the desktop robot is (same spring source)
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

    // High performance Intersection Observer replaces offset calculations to prevent layout thrashing
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -35% 0px', // triggers active section transitions as they enter center-viewport focus
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
    
    // Observe all 8 main page sections
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
    // Temporarily bypass scroll tracker to prevent jumping during anchor click scrolls
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

  const getSidebarIcon = (id) => {
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
      {/* Desktop Top Header Navbar (Visible only on screens > 768px) */}
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

        {/* Horizontal AI Robot track & traveler for Desktop! */}
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

      {/* Mobile Left Sidebar Navbar (Visible only on screens <= 768px) */}
      <nav className="mobile-left-sidebar">
        {/* Small Logo / Top Indicator */}
        <div className="sidebar-logo">
          <span>A</span>
        </div>

        {/* Vertical Links Wrapper */}
        <div className="sidebar-links-container" ref={sidebarLinksRef}>
          {/* AI Robot traveling path track */}
          <div className="sidebar-robot-track">
            {/* Traveled path in glow */}
            <motion.div 
              className="sidebar-robot-track-active"
              style={{ scaleY: sidebarTrailFill }}
            />
            {/* The traveling AI Robot (Smooth continuous scroll-linked position) */}
            <motion.div 
              className="ai-robot-traveler"
              style={{ 
                y: smoothRobotY
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
                className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}
                aria-label={`Scroll to ${item.label}`}
              >
                {getSidebarIcon(item.id)}
                <span className="sidebar-btn-label">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Actions (Theme Toggle & Resume) */}
        <div className="sidebar-bottom-actions">
          <a 
            href="/ARUN_M_Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="sidebar-action-btn"
            aria-label="Resume"
          >
            <FiFileText size={16} />
          </a>
          <button 
            onClick={toggleTheme} 
            className="sidebar-action-btn" 
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
        </div>
      </nav>
    </>
  );
}
