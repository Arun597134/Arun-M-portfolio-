import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBookOpen, FiActivity, FiAward, FiCalendar, FiMapPin, FiCpu, FiUser } from 'react-icons/fi';

const cardsData = [
  {
    id: 'name',
    title: 'Name',
    value: 'Arun M.',
    pos: { x: '12%', y: '12%' },
    center: { x: 185, y: 132 }, // Legacy desktop center
    mobileCenter: { x: 165, y: 114 }, // Re-aligned mobile center
    rot: -2,
    icon: <FiUser size={14} />
  },
  {
    id: 'role',
    title: 'Role',
    value: (
      <>
        <div className="role-main">AIML Engineer</div>
        <div className="role-sub">Full Stack Developer</div>
      </>
    ),
    pos: { x: '73%', y: '10%' },
    center: { x: 820, y: 118 }, // Legacy desktop center
    mobileCenter: { x: 775, y: 98 }, // Re-aligned mobile center
    rot: 2,
    icon: <FiCpu size={14} />
  },
  {
    id: 'degree',
    title: 'Degree',
    value: (
      <>
        <div className="degree-main">B.Tech</div>
        <div className="degree-sub">Artificial Intelligence & Data Science</div>
      </>
    ),
    pos: { x: '75%', y: '36%' },
    center: { x: 870, y: 330 }, // Legacy desktop center
    mobileCenter: { x: 802, y: 306 }, // Re-aligned mobile center
    rot: -1.5,
    icon: <FiBookOpen size={14} />,
    style: { maxWidth: '240px' }
  },
  {
    id: 'cgpa',
    title: 'CGPA',
    value: '8.21',
    pos: { x: '72%', y: '68%' },
    center: { x: 785, y: 580 }, // Legacy desktop center
    mobileCenter: { x: 765, y: 562 }, // Re-aligned mobile center
    rot: 3,
    icon: <FiAward size={14} />
  },
  {
    id: 'graduation',
    title: 'Graduation',
    value: '2027',
    pos: { x: '54%', y: '84%' },
    center: { x: 605, y: 708 }, // Legacy desktop center
    mobileCenter: { x: 607, y: 690 }, // Re-aligned mobile center
    rot: -1,
    icon: <FiCalendar size={14} />
  },
  {
    id: 'college',
    title: 'College',
    value: "St. Joseph's Institute of Technology",
    pos: { x: '24%', y: '83%' },
    center: { x: 360, y: 704 }, // Legacy desktop center
    mobileCenter: { x: 292, y: 682 }, // Re-aligned mobile center
    rot: 2,
    icon: <FiBookOpen size={14} />,
    style: { maxWidth: '240px' }
  },
  {
    id: 'location',
    title: 'Location',
    value: 'Chennai, India',
    pos: { x: '10%', y: '68%' },
    center: { x: 180, y: 580 }, // Legacy desktop center
    mobileCenter: { x: 160, y: 562 }, // Re-aligned mobile center
    rot: -2.5,
    icon: <FiMapPin size={14} />
  },
  {
    id: 'about',
    title: 'About Me',
    value: 'Passionate AI Engineer and Full Stack Developer focused on building intelligent, scalable, and user-centric digital products using Artificial Intelligence and modern web technologies.',
    pos: { x: '3%', y: '36%' },
    center: { x: 165, y: 353 }, // Shifted further left to keep gap to portrait clean
    mobileCenter: { x: 140, y: 306 }, // Re-aligned mobile center
    rot: 1,
    icon: <FiActivity size={14} />,
    style: { maxWidth: '270px' }
  }
];

// Portrait parameters inside the 1000x800 coordinate system
const PX = 500;
const PY = 400;
const PW = 110;
const PH = 155;

// Pre-calculate bezier paths statically from portrait edge to card center coordinate (No getBoundingClientRect)
const calculateStaticPath = (cx, cy) => {
  const angle = Math.atan2(cy - PY, cx - PX);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  let edgeX = PX;
  let edgeY = PY;

  // Find exact intersection point on portrait boundary box
  if (Math.abs(cos * PH) > Math.abs(sin * PW)) {
    edgeX += Math.sign(cos) * PW;
    edgeY += Math.sign(cos) * PW * (sin / cos);
  } else {
    edgeX += Math.sign(sin) * PH * (cos / sin);
    edgeY += Math.sign(sin) * PH;
  }

  const dx = cx - edgeX;
  const dy = cy - edgeY;

  // Bezier control coordinates
  const cp1x = edgeX + dx * 0.45;
  const cp1y = edgeY + pathYClamp(dy, dx);
  const cp2x = edgeX + dx * 0.55;
  const cp2y = edgeY + dy * 0.9;

  return `M ${edgeX} ${edgeY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${cx} ${cy}`;
};

// Clamp control points slightly to yield aesthetic routing curls
const pathYClamp = (dy, dx) => {
  if (Math.abs(dx) > Math.abs(dy)) {
    return dy * 0.05;
  }
  return dy * 0.15;
};

export default function About() {
  const [activeCardId, setActiveCardId] = useState(null);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const boardRef = useRef(null);
  const wrapperRef = useRef(null);

  // Center scroll position of scaled canvas board on mobile viewports on mount / orientation changes
  useEffect(() => {
    if (isMobile && wrapperRef.current) {
      const clientWidth = wrapperRef.current.clientWidth;
      wrapperRef.current.scrollLeft = (1000 - clientWidth) / 2;
    }
  }, [isMobile, scale]);

  // Dynamic Scale calculation to fit the 1000px layout width responsive on mobile screen sizes
  useEffect(() => {
    const handleScaleResize = () => {
      const width = window.innerWidth;
      const isMobileNav = width <= 768;
      setIsMobile(isMobileNav);
      const sidebarWidth = isMobileNav ? 64 : 0;
      const gutter = 32; // Total side gutters (16px left, 16px right)
      
      if (width < 1080) {
        const targetWidth = width - sidebarWidth - gutter;
        const scaleFactor = targetWidth / 1000;
        setScale(Math.max(0.55, Math.min(1, scaleFactor))); // Raised minimum scale limit to 0.55
      } else {
        setScale(1);
      }
    };
    
    handleScaleResize();
    window.addEventListener('resize', handleScaleResize);
    return () => window.removeEventListener('resize', handleScaleResize);
  }, []);

  // Magnetic portrait reaction offset calculations (runs on canvas scale)
  const getPortraitAnimation = () => {
    if (!activeCardId) return { x: 0, y: 0, scale: 1 };
    const card = cardsData.find(c => c.id === activeCardId);
    if (!card) return { x: 0, y: 0, scale: 1 };

    const xPercent = parseFloat(card.pos.x);
    const yPercent = parseFloat(card.pos.y);

    const dx = (xPercent - 50) * 1.1;
    const dy = (yPercent - 50) * 1.1;

    return {
      x: dx,
      y: dy,
      scale: 1.025
    };
  };

  const handleMouseEnter = (id) => {
    // Disable hover-trigger active state on touch/mobile screens to prevent hover-leave flash conflict
    if (window.matchMedia('(hover: none)').matches) return;
    setActiveCardId(id);
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: none)').matches) return;
    setActiveCardId(null);
  };

  const handleCardClick = (id, e) => {
    e.stopPropagation(); // Prevent board reset trigger
    setActiveCardId(prev => (prev === id ? null : id));
  };

  const handleBoardClick = () => {
    setActiveCardId(null); // Clear selected state when tapping layout gutters
  };

  // Generate wire paths dynamically based on screen size (isMobile check)
  const getWirePath = (card) => {
    const cx = isMobile ? card.mobileCenter.x : card.center.x;
    const cy = isMobile ? card.mobileCenter.y : card.center.y;
    return calculateStaticPath(cx, cy);
  };

  return (
    <section id="about" className="about-section" onClick={handleBoardClick}>
      {/* Background Film Grain Overlay */}
      <div className="identity-grain-overlay" />

      <div className="container">
        <div className="identity-section-header">
          <span className="section-label">01 / STORY</span>
          <h2 className="section-title">Knowledge Network</h2>
        </div>
      </div>

      <div className="about-board-container">
        {/* Dynamic Scale Wrapper adjusts container heights to prevent empty page gutters on mobile */}
        <div 
          className="about-scale-wrapper"
          ref={wrapperRef}
          style={{
            height: `${800 * scale}px`,
            display: 'flex',
            justifyContent: isMobile ? 'flex-start' : 'center',
            alignItems: 'flex-start',
            overflowX: isMobile ? 'auto' : 'hidden',
            overflowY: 'hidden',
            width: '100%',
            position: 'relative'
          }}
        >
          {/* Symmetrical Knowledge Network Board */}
          <div 
            className="about-identity-board"
            ref={boardRef}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              flexShrink: 0
            }}
          >
            {/* SVG Connection Canvas */}
            <svg className="identity-svg-canvas" viewBox="0 0 1000 800" preserveAspectRatio="none">
              {cardsData.map((card) => (
                <path
                  key={card.id}
                  d={getWirePath(card)}
                  fill="none"
                  className={`connection-line ${activeCardId === card.id ? 'active-line' : ''} ${activeCardId && activeCardId !== card.id ? 'dimmed-line' : ''}`}
                />
              ))}
            </svg>

            {/* Central Portrait Visual Anchor */}
            <motion.div 
              className="central-portrait-wrapper"
              animate={getPortraitAnimation()}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="portrait-spotlight" />
              <div className="portrait-image-container">
                <img 
                  src="/arun_photo.jpg" 
                  alt="Arun M." 
                  className="portrait-avatar-img" 
                />
              </div>
            </motion.div>

            {/* Floating Information Capsule Badges */}
            {cardsData.map((card, idx) => (
              <motion.div
                key={card.id}
                className={`identity-info-card card-${card.id} ${activeCardId === card.id ? 'active-card' : ''} ${activeCardId && activeCardId !== card.id ? 'dimmed-card' : ''}`}
                style={{ 
                  left: card.pos.x, 
                  top: card.pos.y,
                  transform: `rotate(${card.rot}deg)`,
                  ...card.style
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.05 * idx + 0.1 }}
                onMouseEnter={() => handleMouseEnter(card.id)}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => handleCardClick(card.id, e)}
                whileHover={{ 
                  scale: 1.05,
                  y: -4,
                  rotate: card.rot * 0.4,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                }}
              >
                <div className="metallic-pin" />
                <div className="card-header-label">
                  {card.icon}
                  <span>{card.title}</span>
                </div>
                <div className="card-body-val">
                  {card.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
}
