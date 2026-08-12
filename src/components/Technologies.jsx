import React from 'react';
import { motion } from 'framer-motion';

const LANGUAGES = ['Python', 'Java', 'SQL', 'JavaScript'];
const DATABASES = ['MongoDB', 'SQLite', 'PostgreSQL'];

const WEB_TAPE_1 = ['React.js', 'Redux Toolkit', 'Node.js', 'Express.js', 'HTML5', 'CSS3'];
const WEB_TAPE_2 = ['Flask', 'REST APIs', 'JWT Auth', 'JavaScript', 'Tailwind CSS'];

const AI_TAPE_1 = ['TensorFlow', 'scikit-learn', 'Random Forest', 'Deep Learning'];
const AI_TAPE_2 = ['Machine Learning', 'NLP', 'Computer Vision', 'Neural Networks'];

const INFRA_TAPE = ['Git', 'GitHub', 'CI/CD', 'Docker', 'Oracle Cloud Infrastructure (OCI)', 'Vercel', 'Render'];

export default function Technologies({ activeTech, setActiveTech }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="technologies" className="tech-section">
      <div className="container">
        <div className="tech-header">
          <span className="section-label">04 / CAPABILITIES</span>
          <h2 className="section-title">Technical Stack</h2>
          <p className="tech-header-p">
            A specialized stack optimized for deep learning applications, database architectures, and responsive web products. Hover over any technology to see which products utilize it.
          </p>
        </div>

        <motion.div 
          className="tech-bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Bento Card 1: Core Languages (Static Interactive Chips) */}
          <motion.div className="bento-tech-card col-span-1" variants={itemVariants}>
            <h3 className="bento-tech-title">Core Languages</h3>
            <p className="bento-tech-desc">Foundational programming systems.</p>
            <div className="bento-tech-chips">
              {LANGUAGES.map((lang) => (
                <motion.span 
                  key={lang} 
                  className="static-tech-chip"
                  onMouseEnter={() => setActiveTech(lang)}
                  onMouseLeave={() => setActiveTech(null)}
                  whileHover={{ scale: 1.05, y: -2, borderColor: 'var(--accent)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {lang}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Bento Card 2: Web & Backend Systems (Endless Double Marquees) */}
          <motion.div className="bento-tech-card col-span-2 overflow-hidden relative" variants={itemVariants}>
            <h3 className="bento-tech-title">Web & Backend Systems</h3>
            <p className="bento-tech-desc">Continuous integration across client and server layers.</p>
            
            <div className="marquee-wrapper">
              <div className="marquee-fade-left" />
              <div className="marquee-fade-right" />
              
              {/* Marquee Row 1 (Left) */}
              <div className="marquee-row marquee-left-anim">
                <div className="marquee-track">
                  {[...WEB_TAPE_1, ...WEB_TAPE_1].map((tech, idx) => (
                    <span 
                      key={`w1-${idx}`} 
                      className="marquee-badge"
                      onMouseEnter={() => setActiveTech(tech)}
                      onMouseLeave={() => setActiveTech(null)}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Marquee Row 2 (Right) */}
              <div className="marquee-row marquee-right-anim mt-10">
                <div className="marquee-track">
                  {[...WEB_TAPE_2, ...WEB_TAPE_2].map((tech, idx) => (
                    <span 
                      key={`w2-${idx}`} 
                      className="marquee-badge badge-accent"
                      onMouseEnter={() => setActiveTech(tech)}
                      onMouseLeave={() => setActiveTech(null)}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 3: AI & Deep Learning (Endless Double Marquees) */}
          <motion.div className="bento-tech-card col-span-2 overflow-hidden relative" variants={itemVariants}>
            <h3 className="bento-tech-title">AI & Deep Learning</h3>
            <p className="bento-tech-desc">Neural networks, computer vision models, and natural language processing.</p>
            
            <div className="marquee-wrapper">
              <div className="marquee-fade-left" />
              <div className="marquee-fade-right" />
              
              {/* Marquee Row 1 (Left) */}
              <div className="marquee-row marquee-left-anim">
                <div className="marquee-track">
                  {[...AI_TAPE_1, ...AI_TAPE_1].map((tech, idx) => (
                    <span 
                      key={`ai1-${idx}`} 
                      className="marquee-badge"
                      onMouseEnter={() => setActiveTech(tech)}
                      onMouseLeave={() => setActiveTech(null)}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Marquee Row 2 (Right) */}
              <div className="marquee-row marquee-right-anim mt-10">
                <div className="marquee-track">
                  {[...AI_TAPE_2, ...AI_TAPE_2].map((tech, idx) => (
                    <span 
                      key={`ai2-${idx}`} 
                      className="marquee-badge badge-accent"
                      onMouseEnter={() => setActiveTech(tech)}
                      onMouseLeave={() => setActiveTech(null)}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 4: Databases (Static Interactive Chips) */}
          <motion.div className="bento-tech-card col-span-1" variants={itemVariants}>
            <h3 className="bento-tech-title">Database Systems</h3>
            <p className="bento-tech-desc">Structured query schemas and NoSQL stores.</p>
            <div className="bento-tech-chips">
              {DATABASES.map((db) => (
                <motion.span 
                  key={db} 
                  className="static-tech-chip"
                  onMouseEnter={() => setActiveTech(db)}
                  onMouseLeave={() => setActiveTech(null)}
                  whileHover={{ scale: 1.05, y: -2, borderColor: 'var(--accent)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {db}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Bento Card 5: Cloud & Infrastructure (Single Marquee Tape) */}
          <motion.div className="bento-tech-card col-span-3 overflow-hidden relative" variants={itemVariants}>
            <h3 className="bento-tech-title">Cloud & Infrastructure</h3>
            <p className="bento-tech-desc">Containerization, CI/CD automated workflows, and production hosting environments.</p>
            <div className="marquee-wrapper mt-4">
              <div className="marquee-fade-left" />
              <div className="marquee-fade-right" />
              
              <div className="marquee-row marquee-left-anim">
                <div className="marquee-track">
                  {[...INFRA_TAPE, ...INFRA_TAPE].map((tech, idx) => (
                    <span 
                      key={`inf-${idx}`} 
                      className="marquee-badge"
                      onMouseEnter={() => setActiveTech(tech)}
                      onMouseLeave={() => setActiveTech(null)}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
