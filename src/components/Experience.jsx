import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';

const EXPERIENCES = [
  {
    id: 1,
    company: 'Prodigy Infotech',
    role: 'Software Development Intern',
    period: 'Jul 2025 – Aug 2025',
    bullets: [
      'Designed and built a reusable React component library adopted across 3+ product feature areas, reducing duplicate code and accelerating feature development.',
      'Diagnosed and resolved 10+ production bugs through a peer-reviewed CI/CD pipeline, improving release reliability.'
    ]
  },
  {
    id: 2,
    company: 'Codtech IT Solutions',
    role: 'Web Development Intern',
    period: 'Oct 2024 – Jan 2025',
    bullets: [
      'Developed and shipped 3 responsive web pages integrated with live backend APIs for a client-facing production product.'
    ]
  }
];

export default function Experience() {
  const [coords, setCoords] = useState({});
  const [hoveredId, setHoveredId] = useState(null);
  const containerRef = useRef(null);

  // Scroll Progress Tracker for active timeline line drawing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleMouseMove = (id, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords(prev => ({
      ...prev,
      [id]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }));
  };

  const bulletContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const bulletVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.45, ease: 'easeOut' }
    }
  };

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="experience-header">
          <span className="section-label">03 / TIMELINE</span>
          <h2 className="section-title">Professional Experience</h2>
        </div>

        <div className="timeline-container" ref={containerRef}>
          {/* Static Background Line */}
          <div className="timeline-line" />
          
          {/* Active Drawing Scroll Line */}
          <motion.div 
            className="timeline-line-active" 
            style={{ scaleY }} 
          />
          
          {EXPERIENCES.map((exp) => (
            <motion.div 
              key={exp.id} 
              className="timeline-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Marker Anchor */}
              <div className="timeline-marker">
                <motion.div 
                  className="marker-dot"
                  animate={{
                    scale: hoveredId === exp.id ? 1.35 : 1,
                    borderColor: hoveredId === exp.id ? 'var(--accent)' : 'var(--border)',
                    boxShadow: hoveredId === exp.id ? '0 0 15px rgba(99, 102, 241, 0.35)' : 'none',
                    backgroundColor: hoveredId === exp.id ? 'rgba(99, 102, 241, 0.08)' : 'var(--surface)'
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.div
                    animate={{ rotate: hoveredId === exp.id ? 360 : 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{ 
                      display: 'flex',
                      color: hoveredId === exp.id ? 'var(--accent)' : 'var(--text-secondary)'
                    }}
                  >
                    <FiBriefcase size={10} />
                  </motion.div>
                </motion.div>
              </div>

              {/* Card Container */}
              <motion.div 
                className="timeline-content-card"
                onMouseMove={(e) => handleMouseMove(exp.id, e)}
                onMouseEnter={() => setHoveredId(exp.id)}
                onMouseLeave={() => setHoveredId(null)}
                whileHover={{ 
                  x: 8,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } 
                }}
              >
                {/* Custom Spotlight Glow Layer */}
                <div 
                  className="card-glow-spotlight"
                  style={{
                    background: `radial-gradient(120px circle at ${coords[exp.id]?.x || 0}px ${coords[exp.id]?.y || 0}px, rgba(99, 102, 241, 0.08) 0%, transparent 80%)`
                  }}
                />
                
                <span className="experience-period">{exp.period}</span>
                <h3 className="experience-role">{exp.role}</h3>
                <h4 className="experience-company">{exp.company}</h4>
                
                {/* Staggered Bullet lists */}
                <motion.ul 
                  className="experience-bullets"
                  variants={bulletContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {exp.bullets.map((bullet, bIdx) => (
                    <motion.li key={bIdx} variants={bulletVariants}>
                      {bullet}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
