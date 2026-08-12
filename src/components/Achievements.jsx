import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// 3D Gradient Definitions Component to avoid duplicating in each SVG
const SVG3DDefs = ({ id, color, darkerColor }) => (
  <defs>
    {/* 3D Metallic Cylinder Gradient for base & stems */}
    <linearGradient id={`metal-cyl-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor={darkerColor} />
      <stop offset="25%" stopColor={color} />
      <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
      <stop offset="75%" stopColor={color} />
      <stop offset="100%" stopColor={darkerColor} />
    </linearGradient>

    {/* 3D Spherical Sphere Gradient for cup bowls */}
    <radialGradient id={`metal-bowl-${id}`} cx="45%" cy="35%" r="60%" fx="35%" fy="25%">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
      <stop offset="40%" stopColor={color} />
      <stop offset="85%" stopColor={darkerColor} />
      <stop offset="100%" stopColor="#080710" />
    </radialGradient>

    {/* Inner shadow gradient for cup depth */}
    <linearGradient id={`inner-depth-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#050508" />
      <stop offset="100%" stopColor={darkerColor} />
    </linearGradient>
  </defs>
);

// 1. Coding Cup SVG (3D Shaded)
const CodeTrophySVG = ({ color }) => {
  const darker = '#1e1b4b'; // Deep Indigo shadow
  return (
    <svg viewBox="0 0 100 100" className="trophy-svg">
      <SVG3DDefs id="code" color={color} darkerColor={darker} />
      
      {/* Back handle rings (for 3D layering) */}
      <path d="M 28 26 C 18 26 18 42 28 44" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.6" />
      <path d="M 72 26 C 82 26 82 42 72 44" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.6" />

      {/* Front handles overlay */}
      <path d="M 29 28 C 20 28 20 40 29 42" fill="none" stroke="url(#metal-cyl-code)" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M 71 28 C 80 28 80 40 71 42" fill="none" stroke="url(#metal-cyl-code)" strokeWidth="4.5" strokeLinecap="round" />

      {/* Cup Bowl Interior Depth */}
      <path d="M 32 20 C 32 20, 50 25, 68 20 L 68 22 C 68 22, 50 27, 32 22 Z" fill="url(#inner-depth-code)" />

      {/* Cup Bowl (3D Radial Gradient) */}
      <path d="M 32 21 L 68 21 L 66 43 C 66 54 58 61 50 61 C 42 61 34 54 34 43 Z" fill="url(#metal-bowl-code)" stroke={color} strokeWidth="1" />

      {/* Stem (3D Cylinder Gradient) */}
      <path d="M 47 60 L 53 60 L 53 74 L 47 74 Z" fill="url(#metal-cyl-code)" />
      
      {/* 3D Circular Base Plates */}
      <ellipse cx="50" cy="74" rx="16" ry="4" fill="url(#metal-bowl-code)" stroke={color} strokeWidth="1" />
      <ellipse cx="50" cy="79" rx="22" ry="5" fill="url(#metal-cyl-code)" stroke={color} strokeWidth="1" />

      {/* Front Code Symbol Badge (Glint Overlay) */}
      <path d="M 43 33 L 38 37 L 43 41" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 57 33 L 62 37 L 57 41" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 52 31 L 48 43" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};

// 2. Academic Shield Plaque SVG (3D Shaded)
const ShieldTrophySVG = ({ color }) => {
  const darker = '#042f2e'; // Deep Teal shadow
  return (
    <svg viewBox="0 0 100 100" className="trophy-svg">
      <SVG3DDefs id="shield" color={color} darkerColor={darker} />

      {/* Shield 3D Outer Rim (Thick bevel) */}
      <path d="M 30 16 L 70 16 L 68 44 C 68 56 50 64 50 64 C 50 64 32 56 32 44 Z" fill="url(#metal-cyl-shield)" stroke={color} strokeWidth="1.5" />
      
      {/* Shield Core Interior (3D Radial Gradient) */}
      <path d="M 35 21 L 65 21 L 63 42 C 63 51 50 58 50 58 C 50 58 37 51 37 42 Z" fill="url(#metal-bowl-shield)" />

      {/* Ribbon drape behind pedestal */}
      <path d="M 42 60 L 36 78 L 44 75 L 48 78 Z" fill={darker} stroke={color} strokeWidth="1" />
      <path d="M 58 60 L 64 78 L 56 75 L 52 78 Z" fill={darker} stroke={color} strokeWidth="1" />

      {/* Stem & Base */}
      <path d="M 47 58 L 53 58 L 53 72 L 47 72 Z" fill="url(#metal-cyl-shield)" />
      <ellipse cx="50" cy="72" rx="16" ry="4" fill="url(#metal-bowl-shield)" />
      <ellipse cx="50" cy="77" rx="22" ry="5" fill="url(#metal-cyl-shield)" />

      {/* Central 3D Embossed Star */}
      <polygon points="50,26 52.5,32 59,32 54,36 56.5,42 50,38 43.5,42 46,36 41,32 47.5,32" fill="#ffffff" stroke={color} strokeWidth="1" />
    </svg>
  );
};

// 3. Mentorship Laurel Cup SVG (3D Shaded)
const LaurelTrophySVG = ({ color }) => {
  const darker = '#0c1a30'; // Deep Sky Blue shadow
  return (
    <svg viewBox="0 0 100 100" className="trophy-svg">
      <SVG3DDefs id="laurel" color={color} darkerColor={darker} />

      {/* Back Leaves */}
      <path d="M 24 22 C 20 30 24 44 34 52 M 76 22 C 80 30 76 44 66 52" fill="none" stroke={darker} strokeWidth="3" strokeLinecap="round" opacity="0.5" />

      {/* Cup Bowl Interior Depth */}
      <ellipse cx="50" cy="22" rx="15" ry="3.5" fill="url(#inner-depth-laurel)" />

      {/* 3D Cup Bowl */}
      <path d="M 35 22 L 65 22 L 63 44 C 63 52 57 58 50 58 C 43 58 37 52 37 44 Z" fill="url(#metal-bowl-laurel)" stroke={color} strokeWidth="1" />

      {/* Stem & Base */}
      <path d="M 48 57 L 52 57 L 52 72 L 48 72 Z" fill="url(#metal-cyl-laurel)" />
      <ellipse cx="50" cy="72" rx="14" ry="3.5" fill="url(#metal-bowl-laurel)" />
      <ellipse cx="50" cy="77" rx="20" ry="4.5" fill="url(#metal-cyl-laurel)" />

      {/* Front Laurel Branches (Overlay) */}
      <path d="M 25 24 C 21 32 25 44 35 50 M 75 24 C 79 32 75 44 65 50" fill="none" stroke="url(#metal-cyl-laurel)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="23" cy="28" r="2.5" fill="#ffffff" />
      <circle cx="26" cy="38" r="2.5" fill={color} />
      <circle cx="31" cy="46" r="2.5" fill="#ffffff" />
      <circle cx="77" cy="28" r="2.5" fill="#ffffff" />
      <circle cx="74" cy="38" r="2.5" fill={color} />
      <circle cx="69" cy="46" r="2.5" fill="#ffffff" />
    </svg>
  );
};

// 4. Ambassador Pillar Star SVG (3D Shaded)
const StarTrophySVG = ({ color }) => {
  const darker = '#2e1065'; // Deep Purple shadow
  return (
    <svg viewBox="0 0 100 100" className="trophy-svg">
      <SVG3DDefs id="star" color={color} darkerColor={darker} />

      {/* 3D Faceted Obelisk Pillar */}
      {/* Left dark shadow facet */}
      <path d="M 42 42 L 50 42 L 50 72 L 45 72 Z" fill={darker} stroke={color} strokeWidth="0.5" />
      {/* Right metallic light reflection facet */}
      <path d="M 50 42 L 58 42 L 55 72 L 50 72 Z" fill="url(#metal-cyl-star)" stroke={color} strokeWidth="0.5" />

      {/* Base Pedestals */}
      <ellipse cx="50" cy="72" rx="16" ry="4.5" fill="url(#metal-bowl-star)" stroke={color} strokeWidth="1" />
      <ellipse cx="50" cy="77" rx="22" ry="5.5" fill="url(#metal-cyl-star)" stroke={color} strokeWidth="1" />

      {/* 3D Faceted Star on Top */}
      {/* We draw the star facets individually to create a true beveled 3D look */}
      <g stroke={color} strokeWidth="0.75" strokeLinejoin="round">
        {/* Top Point Facets */}
        <polygon points="50,12 50,32 54,22" fill="#ffffff" />
        <polygon points="50,12 50,32 46,22" fill={darker} />
        {/* Right Point Facets */}
        <polygon points="63,22 50,32 54,22" fill="url(#metal-cyl-star)" />
        <polygon points="63,22 50,32 56,29" fill={darker} />
        {/* Bottom Right Facets */}
        <polygon points="59,37 50,32 56,29" fill="#ffffff" />
        <polygon points="59,37 50,32 50,33" fill={darker} />
        {/* Bottom Left Facets */}
        <polygon points="41,37 50,32 50,33" fill="url(#metal-cyl-star)" />
        <polygon points="41,37 50,32 44,29" fill={darker} />
        {/* Left Point Facets */}
        <polygon points="37,22 50,32 44,29" fill="#ffffff" />
        <polygon points="37,22 50,32 46,22" fill={darker} />
      </g>
    </svg>
  );
};

function CountUp({ to, suffix = "", duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
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
    pedestalHeight: '140px', // Stepped podium heights
    renderTrophy: (color) => <CodeTrophySVG color={color} />
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
    renderTrophy: (color) => <ShieldTrophySVG color={color} />
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
    renderTrophy: (color) => <LaurelTrophySVG color={color} />
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
    renderTrophy: (color) => <StarTrophySVG color={color} />
  }
];

export default function Achievements() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
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
          viewport={{ once: true, margin: '-50px' }}
        >
          {STATS.map((stat) => (
            <motion.div 
              key={stat.id} 
              className="podium-item"
              variants={itemVariants}
            >
              {/* Trophy Floating Showcase Area (Perspective-enabled) */}
              <div className="trophy-showcase">
                <motion.div 
                  className="trophy-float-wrapper"
                  animate={{ 
                    y: [0, -8, 0],
                    rotateY: [0, 15, -15, 0] // 3D slow yaw rotation!
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: stat.id * 0.4
                  }}
                >
                  {stat.renderTrophy(stat.accent)}
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
