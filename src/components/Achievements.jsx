import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ============================================================================
// Apple-Style Frosted Glass 3D Milestone Medallions
// ============================================================================

// 1. Hexagon Algorithmic Core Medallion (LeetCode 320+)
const HexAlgoMedallion = ({ color, theme }) => {
  const isLight = theme === 'light';
  const rimColor = isLight ? 'rgba(148, 163, 184, 0.65)' : 'rgba(255, 255, 255, 0.85)';
  const innerGlass = isLight ? 'url(#glass-light-hex)' : 'url(#glass-dark-hex)';

  return (
    <svg viewBox="0 0 100 100" className="medallion-svg">
      <defs>
        <radialGradient id="glass-dark-hex" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="40%" stopColor="rgba(99, 102, 241, 0.25)" />
          <stop offset="85%" stopColor="rgba(30, 27, 75, 0.65)" />
          <stop offset="100%" stopColor="rgba(15, 15, 24, 0.9)" />
        </radialGradient>
        <radialGradient id="glass-light-hex" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="50%" stopColor="rgba(241, 245, 249, 0.85)" />
          <stop offset="85%" stopColor="rgba(226, 232, 240, 0.75)" />
          <stop offset="100%" stopColor="rgba(203, 213, 225, 0.60)" />
        </radialGradient>
        <linearGradient id="hex-edge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="30%" stopColor={color} />
          <stop offset="70%" stopColor="rgba(255, 255, 255, 0.4)" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>

      {/* Outer Hexagon Bevel */}
      <polygon
        points="50,6 88,28 88,72 50,94 12,72 12,28"
        fill={innerGlass}
        stroke="url(#hex-edge-grad)"
        strokeWidth="1.5"
      />

      {/* Inner Hexagon Frame */}
      <polygon
        points="50,14 80,31 80,69 50,86 20,69 20,31"
        fill="none"
        stroke={rimColor}
        strokeWidth="1"
        strokeDasharray="4 2"
      />

      {/* Diagonal Optical Facet Sheen */}
      <path
        d="M 12 28 L 88 28 L 50 6 Z"
        fill="url(#hex-edge-grad)"
        opacity={isLight ? 0.35 : 0.25}
      />

      {/* Central Algorithmic Code Core Symbol (< />) */}
      <g stroke={isLight ? '#4f46e5' : '#ffffff'} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M 40 40 L 33 48 L 40 56" />
        <path d="M 60 40 L 67 48 L 60 56" />
        <path d="M 54 38 L 46 58" stroke={isLight ? '#6366f1' : '#38bdf8'} strokeWidth="2.5" />
      </g>

      {/* Algorithmic Node Points */}
      <circle cx="50" cy="24" r="2.5" fill={isLight ? '#4f46e5' : '#38bdf8'} />
      <circle cx="72" cy="50" r="2" fill={isLight ? '#6366f1' : '#818cf8'} />
      <circle cx="28" cy="50" r="2" fill={isLight ? '#6366f1' : '#818cf8'} />
      <circle cx="50" cy="76" r="2.5" fill={isLight ? '#4f46e5' : '#38bdf8'} />
    </svg>
  );
};

// 2. Shield of Excellence Medallion (9+ Credentials)
const ShieldExcellenceMedallion = ({ color, theme }) => {
  const isLight = theme === 'light';
  const rimColor = isLight ? 'rgba(148, 163, 184, 0.65)' : 'rgba(255, 255, 255, 0.85)';
  const innerGlass = isLight ? 'url(#glass-light-shield)' : 'url(#glass-dark-shield)';

  return (
    <svg viewBox="0 0 100 100" className="medallion-svg">
      <defs>
        <radialGradient id="glass-dark-shield" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="40%" stopColor="rgba(13, 148, 136, 0.3)" />
          <stop offset="85%" stopColor="rgba(4, 47, 46, 0.7)" />
          <stop offset="100%" stopColor="rgba(15, 15, 24, 0.9)" />
        </radialGradient>
        <radialGradient id="glass-light-shield" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="50%" stopColor="rgba(240, 253, 250, 0.85)" />
          <stop offset="85%" stopColor="rgba(204, 251, 241, 0.70)" />
          <stop offset="100%" stopColor="rgba(153, 246, 228, 0.50)" />
        </radialGradient>
        <linearGradient id="shield-edge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="35%" stopColor={color} />
          <stop offset="70%" stopColor="rgba(255, 255, 255, 0.4)" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>

      {/* Shield Outer Bevel */}
      <path
        d="M 50 8 L 86 20 C 86 54 50 88 50 88 C 50 88 14 54 14 20 Z"
        fill={innerGlass}
        stroke="url(#shield-edge-grad)"
        strokeWidth="1.5"
      />

      {/* Shield Inner Inset Frame */}
      <path
        d="M 50 16 L 78 26 C 78 50 50 78 50 78 C 50 78 22 50 22 26 Z"
        fill="none"
        stroke={rimColor}
        strokeWidth="1"
        strokeDasharray="4 2"
      />

      {/* Center 3D Faceted Star */}
      <g stroke={color} strokeWidth="0.8" strokeLinejoin="round">
        <polygon points="50,26 53,35 62,35 55,41 58,50 50,44 42,50 45,41 38,35 47,35" fill={isLight ? '#0d9488' : '#ffffff'} />
      </g>

      {/* Verified Credential Ribbon Drape at Bottom */}
      <path
        d="M 43 62 L 35 78 L 43 74 L 48 78 L 47 67 Z"
        fill={isLight ? 'rgba(13, 148, 136, 0.25)' : 'rgba(13, 148, 136, 0.45)'}
        stroke={color}
        strokeWidth="1"
      />
      <path
        d="M 57 62 L 65 78 L 57 74 L 52 78 L 53 67 Z"
        fill={isLight ? 'rgba(13, 148, 136, 0.25)' : 'rgba(13, 148, 136, 0.45)'}
        stroke={color}
        strokeWidth="1"
      />
    </svg>
  );
};

// 3. Laurel Crown Medallion (2+ Cohorts Mentored)
const LaurelCrownMedallion = ({ color, theme }) => {
  const isLight = theme === 'light';
  const rimColor = isLight ? 'rgba(148, 163, 184, 0.65)' : 'rgba(255, 255, 255, 0.85)';
  const innerGlass = isLight ? 'url(#glass-light-laurel)' : 'url(#glass-dark-laurel)';

  return (
    <svg viewBox="0 0 100 100" className="medallion-svg">
      <defs>
        <radialGradient id="glass-dark-laurel" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="40%" stopColor="rgba(14, 165, 233, 0.28)" />
          <stop offset="85%" stopColor="rgba(12, 26, 48, 0.7)" />
          <stop offset="100%" stopColor="rgba(15, 15, 24, 0.9)" />
        </radialGradient>
        <radialGradient id="glass-light-laurel" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="50%" stopColor="rgba(240, 249, 255, 0.85)" />
          <stop offset="85%" stopColor="rgba(224, 242, 254, 0.70)" />
          <stop offset="100%" stopColor="rgba(186, 230, 253, 0.50)" />
        </radialGradient>
        <linearGradient id="laurel-edge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="35%" stopColor={color} />
          <stop offset="70%" stopColor="rgba(255, 255, 255, 0.4)" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>

      {/* Circular Medallion Outer Bevel */}
      <circle
        cx="50"
        cy="50"
        r="42"
        fill={innerGlass}
        stroke="url(#laurel-edge-grad)"
        strokeWidth="1.5"
      />

      {/* Concentric Calibration Ring */}
      <circle
        cx="50"
        cy="50"
        r="34"
        fill="none"
        stroke={rimColor}
        strokeWidth="1"
        strokeDasharray="3 3"
      />

      {/* Sculpted Laurel Wreath Branches */}
      <path
        d="M 28 32 C 22 42 24 58 36 68 M 72 32 C 78 42 76 58 64 68"
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Laurel Berries / Leaf Nodes */}
      <circle cx="26" cy="38" r="2.2" fill={isLight ? '#0284c7' : '#ffffff'} />
      <circle cx="27" cy="48" r="2.2" fill={isLight ? '#0ea5e9' : '#38bdf8'} />
      <circle cx="32" cy="58" r="2.2" fill={isLight ? '#0284c7' : '#ffffff'} />

      <circle cx="74" cy="38" r="2.2" fill={isLight ? '#0284c7' : '#ffffff'} />
      <circle cx="73" cy="48" r="2.2" fill={isLight ? '#0ea5e9' : '#38bdf8'} />
      <circle cx="68" cy="58" r="2.2" fill={isLight ? '#0284c7' : '#ffffff'} />

      {/* Center Mentorship Flame / Torch */}
      <path
        d="M 50 30 C 54 36 58 42 54 50 C 51 54 49 56 50 62 C 45 58 42 52 46 44 C 48 40 47 36 50 30 Z"
        fill={isLight ? '#0284c7' : '#ffffff'}
        stroke={color}
        strokeWidth="0.8"
      />
      <circle cx="50" cy="48" r="2" fill={isLight ? '#ffffff' : '#38bdf8'} />
    </svg>
  );
};

// 4. Ambassador Diplomatic Crest Medallion (1 Govt. Campus Ambassador)
const AmbassadorCrestMedallion = ({ color, theme }) => {
  const isLight = theme === 'light';
  const rimColor = isLight ? 'rgba(148, 163, 184, 0.65)' : 'rgba(255, 255, 255, 0.85)';
  const innerGlass = isLight ? 'url(#glass-light-crest)' : 'url(#glass-dark-crest)';

  return (
    <svg viewBox="0 0 100 100" className="medallion-svg">
      <defs>
        <radialGradient id="glass-dark-crest" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="40%" stopColor="rgba(139, 92, 246, 0.28)" />
          <stop offset="85%" stopColor="rgba(46, 16, 101, 0.7)" />
          <stop offset="100%" stopColor="rgba(15, 15, 24, 0.9)" />
        </radialGradient>
        <radialGradient id="glass-light-crest" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="50%" stopColor="rgba(245, 243, 255, 0.85)" />
          <stop offset="85%" stopColor="rgba(237, 233, 254, 0.70)" />
          <stop offset="100%" stopColor="rgba(221, 214, 254, 0.50)" />
        </radialGradient>
        <linearGradient id="crest-edge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="35%" stopColor={color} />
          <stop offset="70%" stopColor="rgba(255, 255, 255, 0.4)" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>

      {/* Pentagonal Crest Bevel */}
      <polygon
        points="50,8 90,37 75,86 25,86 10,37"
        fill={innerGlass}
        stroke="url(#crest-edge-grad)"
        strokeWidth="1.5"
      />

      {/* Inner Inset Pentagonal Rim */}
      <polygon
        points="50,16 82,39 70,78 30,78 18,39"
        fill="none"
        stroke={rimColor}
        strokeWidth="1"
        strokeDasharray="4 2"
      />

      {/* 8-Point Ambassador Starburst Emblem */}
      <g stroke={color} strokeWidth="0.8" strokeLinejoin="round">
        <polygon points="50,24 53,36 65,36 55,44 59,56 50,48 41,56 45,44 35,36 47,36" fill={isLight ? '#7c3aed' : '#ffffff'} />
      </g>

      {/* Gateway / Pedestal Pillars of Governance */}
      <path
        d="M 38 64 L 62 64 M 43 64 L 43 72 M 50 64 L 50 72 M 57 64 L 57 72 M 36 72 L 64 72"
        stroke={isLight ? '#6d28d9' : '#a78bfa'}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
};

function CountUp({ to, suffix = "", duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    
    const end = parseInt(to, 10);
    if (isNaN(end)) {
      setCount(to);
      return;
    }
    
    const startTime = performance.now();
    
    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / (duration * 1000), 1);
      
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * end);
      
      if (progress < 1) {
        setCount(currentCount);
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(updateCount);
  }, [to, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const STATS = [
  {
    id: 1,
    value: '320',
    suffix: '+',
    title: 'LeetCode Problems Solved',
    desc: 'Advanced problem-solving proficiency in core Data Structures and Algorithms, covering Arrays, Strings, Graphs, and DP.',
    category: 'ALGORITHMS',
    accent: 'var(--accent)',
    pedestalHeight: '140px',
    renderMedallion: (color, theme) => <HexAlgoMedallion color={color} theme={theme} />
  },
  {
    id: 2,
    value: '9',
    suffix: '+',
    title: 'Technical Credentials',
    desc: 'Verified academic and industrial certifications, including Elite-tier NPTEL credentials from IIT Madras.',
    category: 'CERTIFICATIONS',
    accent: '#0d9488', // Deep Teal
    pedestalHeight: '170px',
    renderMedallion: (color, theme) => <ShieldExcellenceMedallion color={color} theme={theme} />
  },
  {
    id: 3,
    value: '2',
    suffix: '+',
    title: 'Mentored Cohorts',
    desc: 'Guided high school students on foundational AI/ML structures, deep neural networks, and generative models.',
    category: 'LEADERSHIP',
    accent: '#0ea5e9', // Electric Cyan / Ice Blue
    pedestalHeight: '155px',
    renderMedallion: (color, theme) => <LaurelCrownMedallion color={color} theme={theme} />
  },
  {
    id: 4,
    value: '1',
    suffix: '',
    title: 'Govt. Campus Ambassador',
    desc: "Represented the official MyGov digital governance platform, promoting key public tech initiatives.",
    category: 'REPRESENTATION',
    accent: '#8b5cf6', // Purple
    pedestalHeight: '185px',
    renderMedallion: (color, theme) => <AmbassadorCrestMedallion color={color} theme={theme} />
  }
];

function Achievements({ theme = 'dark' }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="achievements" className="achievements-section">
      <div className="container">
        <div className="achievements-header">
          <span className="section-label">05 / ACHIEVEMENTS</span>
          <h2 className="section-title">Milestones & Numbers</h2>
        </div>

        <motion.div 
          className="podium-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '180px 0px 50px 0px' }}
        >
          {STATS.map((stat) => (
            <motion.div 
              key={stat.id} 
              className="podium-item"
              variants={itemVariants}
            >
              {/* Medallion Floating Showcase Area (Perspective-enabled) */}
              <div className="trophy-showcase">
                <motion.div 
                  className="trophy-float-wrapper"
                  animate={{ 
                    y: [0, -8, 0],
                    rotateY: [0, 14, -14, 0]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: stat.id * 0.35
                  }}
                >
                  {stat.renderMedallion(stat.accent, theme)}
                </motion.div>
              </div>

              {/* Stepped Pedestal Base */}
              <div 
                className="pedestal-block" 
                style={{ 
                  height: stat.pedestalHeight,
                  '--accent-color': stat.accent
                }}
              >
                {/* Clean non-glowing top rim */}
                <div className="pedestal-top" style={{ borderTopColor: stat.accent }} />
                
                {/* Pedestal core */}
                <div className="pedestal-body">
                  <span className="category-tag">{stat.category}</span>
                  <div className="number-display" style={{ color: stat.accent }}>
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </div>
                </div>
              </div>

              {/* Detail Content underneath pedestal */}
              <div className="podium-content">
                <h3 className="achievement-title">{stat.title}</h3>
                <p className="achievement-desc">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default React.memo(Achievements);
