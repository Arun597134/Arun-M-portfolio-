import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiExternalLink } from 'react-icons/fi';

// Sorted ascending certifications 01 to 07
const CERTIFICATIONS = [
  {
    id: 1,
    num: '01',
    title: 'PYTHON FOR DATA SCIENCE',
    issuer: 'NPTEL · IIT Madras',
    year: '2025',
    elite: true,
    x: '15%',
    y: '25%',
    align: 'left',
    credId: 'NPTEL25CS04S829103',
    verifyUrl: 'https://nptel.ac.in/',
    skills: ['Python', 'NumPy', 'Pandas'],
    desc: 'Elite NPTEL certification verifying core programming, database analysis, and modeling using Python.'
  },
  {
    id: 2,
    num: '02',
    title: 'GETTING STARTED WITH DL',
    issuer: 'NVIDIA DLI',
    year: '2026',
    elite: false,
    x: '15%',
    y: '75%',
    align: 'left',
    credId: 'NVDLI-CS994821',
    verifyUrl: 'https://courses.nvidia.com/',
    skills: ['Neural Networks', 'PyTorch'],
    desc: 'Practical validation in training convolutional neural networks and deploying model architectures.'
  },
  {
    id: 3,
    num: '03',
    title: 'INTRODUCTION TO GEN AI',
    issuer: 'Google Cloud',
    year: '2025',
    elite: false,
    x: '50%',
    y: '16.6%',
    align: 'center',
    credId: 'GCP-GENAI-118839',
    verifyUrl: 'https://cloud.google.com/training',
    skills: ['LLMs', 'Vertex AI'],
    desc: 'Covers generative models, large language model deployment structures, and responsible AI guardrails.'
  },
  {
    id: 4,
    num: '04',
    title: 'OCI AI FOUNDATIONS',
    issuer: 'Oracle University',
    year: '2025',
    elite: false,
    x: '50%',
    y: '50%',
    align: 'center',
    credId: 'ORCL-OCI-AI-20519',
    verifyUrl: 'https://education.oracle.com/',
    skills: ['Cloud AI', 'Oracle OCI'],
    desc: 'Validates Oracle cloud cognitive features, anomaly detection pipelines, and serverless AI endpoints.'
  },
  {
    id: 5,
    num: '05',
    title: 'DATABASE MGMT SYSTEMS',
    issuer: 'NPTEL · IIT Madras',
    year: '2026',
    elite: true,
    x: '50%',
    y: '83.3%',
    align: 'center',
    credId: 'NPTEL26CS12S904818',
    verifyUrl: 'https://nptel.ac.in/',
    skills: ['SQL', 'RDBMS Schema'],
    desc: 'Elite validation covering database design, relational algebra, normalizations, and transaction locks.'
  },
  {
    id: 6,
    num: '06',
    title: 'BASICS OF MONGODB',
    issuer: 'MongoDB University',
    year: '2025',
    elite: false,
    x: '85%',
    y: '30%',
    align: 'right',
    credId: 'MDB-BAS-9018241',
    verifyUrl: 'https://university.mongodb.com/',
    skills: ['NoSQL', 'Document Database'],
    desc: 'Validates proficiency in JSON document architecture, aggregations, query commands, and indexing.'
  },
  {
    id: 7,
    num: '07',
    title: 'FRONT END DEVELOPMENT',
    issuer: 'Infosys Springboard',
    year: '2025',
    elite: false,
    x: '85%',
    y: '70%',
    align: 'right',
    credId: 'INFY-FED-884210',
    verifyUrl: 'https://infyspringboard.onwingspan.com/',
    skills: ['HTML5 & CSS3', 'JavaScript'],
    desc: 'Validates front-end development standards, responsive scripting, and browser runtime performance.'
  }
];

// Fully connected mesh network paths (Every node is connected to the network)
const CONNECTIONS = [
  { from: 1, to: 2, pId: 'wire-1-2', d: 'M 150,150 L 150,450', dur: '2.5s' },
  { from: 1, to: 3, pId: 'wire-1-3', d: 'M 150,150 L 500,100', dur: '3.0s' },
  { from: 1, to: 4, pId: 'wire-1-4', d: 'M 150,150 L 500,300', dur: '2.2s' },
  { from: 2, to: 4, pId: 'wire-2-4', d: 'M 150,450 L 500,300', dur: '2.8s' },
  { from: 2, to: 5, pId: 'wire-2-5', d: 'M 150,450 L 500,500', dur: '3.2s' },
  { from: 3, to: 4, pId: 'wire-3-4', d: 'M 500,100 L 500,300', dur: '2.0s' },
  { from: 4, to: 5, pId: 'wire-4-5', d: 'M 500,300 L 500,500', dur: '2.4s' },
  { from: 3, to: 6, pId: 'wire-3-6', d: 'M 500,100 L 850,180', dur: '2.6s' },
  { from: 4, to: 6, pId: 'wire-4-6', d: 'M 500,300 L 850,180', dur: '3.1s' },
  { from: 4, to: 7, pId: 'wire-4-7', d: 'M 500,300 L 850,420', dur: '2.9s' },
  { from: 5, to: 7, pId: 'wire-5-7', d: 'M 500,500 L 850,420', dur: '3.5s' },
  { from: 6, to: 7, pId: 'wire-6-7', d: 'M 850,180 L 850,420', dur: '2.7s' }
];

export default function Certifications() {
  const [hoveredId, setHoveredId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Close node card on click outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setHoveredId(null);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  // Detect mobile width to switch details rendering strategies
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = (id) => {
    if (!isMobile && window.matchMedia('(hover: hover)').matches) {
      setHoveredId(id);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && window.matchMedia('(hover: hover)').matches) {
      setHoveredId(null);
    }
  };

  const handleNodeClick = (e, id) => {
    e.stopPropagation(); // prevent triggering window close click
    setHoveredId(prev => prev === id ? null : id);
  };

  const isConnectionActive = (conn) => {
    return hoveredId === conn.from || hoveredId === conn.to;
  };

  // Shared card interior content renderer
  const renderCardInterior = (cert) => (
    <>
      <div className="card-top-header">
        <span className="card-issuer-lbl">{cert.issuer}</span>
        <FiAward size={20} className="card-award-seal" />
      </div>

      <div className="card-body-details">
        {cert.elite && <span className="card-elite-badge">ELITE CERTIFICATION</span>}
        <h4 className="card-cert-title">{cert.title}</h4>
        <p className="card-desc-txt">{cert.desc}</p>
      </div>

      <div className="card-skills-block">
        {cert.skills.map((skill, sIdx) => (
          <span key={sIdx} className="skill-chip">{skill}</span>
        ))}
      </div>

      <div className="card-footer-row">
        <div className="meta-col">
          <span>Credential ID</span>
          <p className="meta-mono">{cert.credId}</p>
        </div>
        <div className="meta-col text-right">
          <span>Timeline</span>
          <p>{cert.year}</p>
        </div>
      </div>

      <a
        href={cert.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="card-verify-btn"
        onClick={(ev) => ev.stopPropagation()}
      >
        <span>Verify Original Certificate</span>
        <FiExternalLink size={14} />
      </a>
    </>
  );

  return (
    <section id="certifications" className="certs-section">
      <div className="container">
        
        {/* Title Block (Left aligned) */}
        <div className="certs-neural-header">
          <span className="section-label">06 / VALIDATION</span>
          <h2 className="section-title">Credentials</h2>
          <p className="certs-neural-subtitle">
            An interactive neural network representing core competency branches. Hover nodes to inspect credentials.
          </p>
        </div>

        {/* Neural Map Area (Unified for Desktop and Mobile) */}
        <div className="neural-board-container">
          <div className="neural-board">
            
            {/* SVG Connections Wires with Traveling Agents */}
            <svg className="neural-svg" viewBox="0 0 1000 600" width="100%" height="100%" preserveAspectRatio="none">
              <defs>
                <filter id="wire-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Wire lines */}
              {CONNECTIONS.map((conn, idx) => {
                const active = isConnectionActive(conn);
                return (
                  <g key={idx}>
                    {/* Base Path Wire */}
                    <path
                      id={conn.pId}
                      d={conn.d}
                      className={`neural-wire ${active ? 'wire-active' : ''}`}
                      fill="none"
                    />
                    {/* The Walking Agent Circle */}
                    <circle
                      r="4.5"
                      fill="var(--accent)"
                      filter="url(#wire-glow)"
                      className="walking-agent"
                    >
                      <animateMotion
                        dur={active ? '0.8s' : conn.dur}
                        repeatCount="indefinite"
                      >
                        <mpath href={`#${conn.pId}`} />
                      </animateMotion>
                    </circle>
                  </g>
                );
              })}
            </svg>

            {/* Interactive Nodes */}
            {CERTIFICATIONS.map((cert) => {
              const isHovered = hoveredId === cert.id;
              // On mobile, never morph the inline node dot (keep it as a compact dot)
              const showExpandedInline = !isMobile && isHovered;

              return (
                <div
                  key={cert.id}
                  className={`neural-node-anchor ${showExpandedInline ? 'z-top' : ''}`}
                  style={{ left: cert.x, top: cert.y }}
                  onMouseEnter={() => handleMouseEnter(cert.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={(e) => handleNodeClick(e, cert.id)}
                >
                  <motion.div
                    className={`neural-node-wrapper ${cert.align}`}
                    layoutId={`node-card-${cert.id}`}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  >
                    <AnimatePresence mode="wait">
                      {!showExpandedInline ? (
                        /* Default Node Circle Dot */
                        <motion.div
                          key="compact"
                          className={`node-compact-dot ${cert.elite ? 'elite-node' : ''}`}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                        >
                          <div className="node-pulse-ring" />
                          <div className="node-pulse-ring ring-delay-1" />
                          <span className="node-num-label">{cert.num}</span>
                          <span className="node-caption-label">{cert.issuer.split(' · ')[0]}</span>
                        </motion.div>
                      ) : (
                        /* Magnified Full Zoom Card (Desktop only) */
                        <motion.div
                          key="expanded"
                          className="node-expanded-card"
                          initial={{ scale: 0.9, opacity: 0, y: 10 }}
                          animate={{ scale: 1, opacity: 1, y: 0 }}
                          exit={{ scale: 0.9, opacity: 0, y: 10 }}
                          transition={{ duration: 0.25 }}
                        >
                          {renderCardInterior(cert)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}

          </div>
        </div>

        {/* Mobile Fixed Portaled Bottom Drawer Sheet (Bypasses transformed parent constraints) */}
        <AnimatePresence>
          {isMobile && hoveredId && (() => {
            const activeCert = CERTIFICATIONS.find(c => c.id === hoveredId);
            if (!activeCert) return null;
            return (
              <motion.div 
                className="mobile-cert-drawer-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setHoveredId(null)}
              >
                <motion.div
                  className="node-expanded-card mobile-drawer-card"
                  initial={{ y: 150, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 150, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mobile-drawer-handle" onClick={() => setHoveredId(null)} />
                  {renderCardInterior(activeCert)}
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

      </div>
    </section>
  );
}
