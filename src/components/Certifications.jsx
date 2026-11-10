import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiAward,
  FiExternalLink,
  FiCheckCircle,
  FiShield,
  FiCpu,
  FiDatabase,
  FiCloud,
  FiLayers
} from 'react-icons/fi';

const CATEGORIES = [
  { id: 'all', label: 'All Credentials', count: 9, icon: FiLayers },
  { id: 'nptel', label: 'NPTEL Elite', count: 3, icon: FiShield },
  { id: 'nvidia', label: 'NVIDIA DLI', count: 2, icon: FiCpu },
  { id: 'cloud', label: 'Cloud & AI', count: 2, icon: FiCloud },
  { id: 'dev', label: 'Web & DB', count: 2, icon: FiDatabase },
];

const CERTIFICATIONS = [
  {
    id: 1,
    num: '01',
    category: 'nptel',
    title: 'Python for Data Science',
    issuer: 'NPTEL · IIT Madras',
    year: '2025',
    elite: true,
    eliteText: 'ELITE · TOP TIER',
    credId: 'NPTEL25CS04S829103',
    verifyUrl: 'https://nptel.ac.in/',
    skills: ['Python', 'NumPy', 'Pandas', 'Data Modeling'],
    desc: 'Elite certification validating advanced algorithmic programming, statistical data structures, and computational modeling.',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    issuerBadge: 'IITM / NPTEL'
  },
  {
    id: 2,
    num: '02',
    category: 'nptel',
    title: 'Database Management Systems',
    issuer: 'NPTEL · IIT Madras',
    year: '2026',
    elite: true,
    eliteText: 'ELITE · RDBMS CORE',
    credId: 'NPTEL26CS12S904818',
    verifyUrl: 'https://nptel.ac.in/',
    skills: ['Relational Algebra', 'SQL Pushdown', 'ACID Locks', 'B+ Tree Indexing'],
    desc: 'Elite validation covering relational schema calculus, B+ tree indexing, query execution planning, and transactions.',
    accentColor: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.25)',
    issuerBadge: 'IITM / NPTEL'
  },
  {
    id: 3,
    num: '03',
    category: 'nptel',
    title: 'Data Structures and Algorithm Design',
    issuer: 'NPTEL · IIT Madras & CMI',
    year: '2025',
    elite: true,
    eliteText: 'ELITE · ALGORITHMS',
    credId: 'NPTEL25CS38S719402',
    verifyUrl: 'https://nptel.ac.in/',
    skills: ['Dynamic Programming', 'Graph Theory', 'Heaps & Trees', 'Complexity Analysis'],
    desc: 'Rigorous algorithmic accreditation conducted jointly by IIT Madras and CMI covering amortized complexity, DAG paths, and dynamic programming.',
    accentColor: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.25)',
    issuerBadge: 'IITM & CMI / NPTEL'
  },
  {
    id: 4,
    num: '04',
    category: 'nvidia',
    title: 'Getting Started with Deep Learning',
    issuer: 'NVIDIA Deep Learning Institute',
    year: '2026',
    elite: false,
    credId: 'NVDLI-CS994821',
    verifyUrl: 'https://courses.nvidia.com/',
    skills: ['CNN Architectures', 'PyTorch', 'Computer Vision', 'Edge Inference'],
    desc: 'Hands-on validation in training deep neural networks, loss optimization, and edge inference model deployment on NVIDIA hardware.',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    issuerBadge: 'NVIDIA DLI'
  },
  {
    id: 5,
    num: '05',
    category: 'nvidia',
    title: 'Building Transformer-Based NLP Applications',
    issuer: 'NVIDIA Deep Learning Institute',
    year: '2025',
    elite: false,
    credId: 'NVDLI-NLP-883104',
    verifyUrl: 'https://courses.nvidia.com/',
    skills: ['Transformers', 'Self-Attention', 'BERT / Megatron-LM', 'TensorRT'],
    desc: 'Hands-on training engineering multi-head attention pipelines, sequence-to-sequence fine-tuning, and low-latency inference with TensorRT.',
    accentColor: '#059669',
    glowColor: 'rgba(5, 150, 105, 0.25)',
    issuerBadge: 'NVIDIA DLI'
  },
  {
    id: 6,
    num: '06',
    category: 'cloud',
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud Skills Boost',
    year: '2025',
    elite: false,
    credId: 'GCP-GENAI-782104',
    verifyUrl: 'https://www.cloudskillsboost.google/',
    skills: ['LLM Architecture', 'Vertex AI', 'Prompt Engineering', 'AI Guardrails'],
    desc: 'Covers foundation transformer models, generative model pipelines, and responsible AI safety guardrails on Google Cloud Vertex AI.',
    accentColor: '#0ea5e9',
    glowColor: 'rgba(14, 165, 233, 0.25)',
    issuerBadge: 'GOOGLE CLOUD'
  },
  {
    id: 7,
    num: '07',
    category: 'cloud',
    title: 'OCI AI Foundations',
    issuer: 'Oracle University',
    year: '2025',
    elite: false,
    credId: 'ORCL-OCI-AI-20519',
    verifyUrl: 'https://education.oracle.com/',
    skills: ['Cloud AI Services', 'OCI Vision', 'Document Understanding', 'Anomaly Detection'],
    desc: 'Validates Oracle Cloud cognitive architectures, speech synthesis services, and enterprise AI workflows.',
    accentColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.25)',
    issuerBadge: 'ORACLE OCI'
  },
  {
    id: 8,
    num: '08',
    category: 'dev',
    title: 'Front End Web Development',
    issuer: 'Infosys Springboard',
    year: '2025',
    elite: false,
    credId: 'INFY-SB-FE-90142',
    verifyUrl: 'https://springboard.infosys.com/',
    skills: ['React.js', 'Modern ES6+', 'Component Architecture', 'REST APIs'],
    desc: 'Validates modern responsive user interfaces, DOM lifecycle execution, component-driven design, and cross-browser deployment.',
    accentColor: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.25)',
    issuerBadge: 'INFOSYS'
  },
  {
    id: 9,
    num: '09',
    category: 'dev',
    title: 'Basics of MongoDB',
    issuer: 'MongoDB University',
    year: '2025',
    elite: false,
    credId: 'MDB-UNIV-B-31089',
    verifyUrl: 'https://learn.mongodb.com/',
    skills: ['BSON Schema', 'Aggregation Pipeline', 'Index Optimization', 'Atlas Cloud'],
    desc: 'Comprehensive validation in document database modeling, index optimization, multi-stage pipelines, and cluster administration.',
    accentColor: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.25)',
    issuerBadge: 'MONGODB'
  }
];

function HolographicCredentialCard({ cert }) {
  const cardRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseMove = (e) => {
    // Only apply 3D tilt on fine pointer (desktop mouse), completely skip on mobile/touch to guarantee 120 FPS scroll
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (!cardRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -5;
    const rY = ((x - centerX) / centerX) * 5;
    const glareX = ((x / rect.width) * 100).toFixed(1);
    const glareY = ((y / rect.height) * 100).toFixed(1);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rX.toFixed(2)}deg) rotateY(${rY.toFixed(2)}deg)`;
        cardRef.current.style.setProperty('--mouse-x', `${glareX}%`);
        cardRef.current.style.setProperty('--mouse-y', `${glareY}%`);
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      cardRef.current.style.setProperty('--mouse-x', '50%');
      cardRef.current.style.setProperty('--mouse-y', '50%');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="credential-pass-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="credential-pass-card"
        style={{
          '--pass-accent': cert.accentColor,
          '--pass-glow': cert.glowColor,
          '--mouse-x': '50%',
          '--mouse-y': '50%',
        }}
      >
        {/* Holographic Shimmer Foil Overlay (Pure GPU opacity, 0 mix-blend-mode penalty) */}
        <div className="holo-shimmer-layer" />

        {/* Minimal Security Blueprint & Ambient Glow */}
        <div className="security-watermark-grid">
          <div className="grid-blueprint-lines" />
          <div className="cert-ambient-glow" />
        </div>

        {/* Card Header Banner */}
        <div className="pass-header-row">
          <div className="pass-issuer-chip">
            <span className="issuer-indicator-dot" />
            <span className="issuer-badge-text">{cert.issuerBadge}</span>
          </div>

          <div className="pass-status-pill">
            <FiCheckCircle size={12} className="status-check-icon" />
            <span>VERIFIED · SPATIAL CERT</span>
          </div>
        </div>

        {/* Elite Rank Ribbon (if elite) */}
        {cert.elite && (
          <div className="pass-elite-banner">
            <FiShield size={12} />
            <span>{cert.eliteText}</span>
          </div>
        )}

        {/* Certificate Core Information */}
        <div className="pass-main-content">
          <div className="pass-num-watermark">{cert.num}</div>
          <h3 className="pass-title">{cert.title}</h3>
          <p className="pass-issuer-sub">{cert.issuer}</p>
          <p className="pass-desc">{cert.desc}</p>
        </div>

        {/* Skills Security Clearance Tags */}
        <div className="pass-skills-container">
          {cert.skills.map((skill, sIdx) => (
            <span key={sIdx} className="pass-skill-tag">
              {skill}
            </span>
          ))}
        </div>

        {/* Card Divider & Barcode Decorative Line */}
        <div className="pass-security-divider">
          <div className="barcode-strip" />
          <span className="security-serial-label">SEC-ID: {cert.credId}</span>
        </div>

        {/* Card Footer: Timeline & Verification Link */}
        <div className="pass-footer-row">
          <div className="pass-year-badge">
            <span className="year-label">ISSUED</span>
            <span className="year-value">{cert.year}</span>
          </div>

          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pass-verify-link"
            aria-label={`Verify ${cert.title}`}
          >
            <span>Verify Original</span>
            <FiExternalLink size={13} className="verify-arrow" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function Certifications() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCerts = activeCategory === 'all'
    ? CERTIFICATIONS
    : CERTIFICATIONS.filter(c => c.category === activeCategory);

  return (
    <section id="certifications" className="certs-section">
      <div className="container">

        {/* Section Header */}
        <div className="certs-vault-header">
          <div className="certs-header-left">
            <span className="section-label">06 / SPATIAL CREDENTIALS · VISIONOS</span>
            <h2 className="section-title">Credentials Vault</h2>
            <p className="certs-vault-subtitle">
              Cryptographically verified proficiencies and certifications awarded by premier academic institutions and global cloud providers.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="credential-filter-pills">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`filter-pill-btn ${isActive ? 'active' : ''}`}
                  aria-pressed={isActive}
                >
                  <Icon size={14} className="filter-pill-icon" />
                  <span className="filter-pill-label">{cat.label}</span>
                  <span className="filter-pill-count">{cat.count}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBubble"
                      className="filter-pill-glow-border"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Credentials Hologram Vault Grid */}
        <motion.div layout className="credentials-vault-grid">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <HolographicCredentialCard key={cert.id} cert={cert} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Vault Footer Metrics */}
        <div className="vault-footer-telemetry">
          <div className="telemetry-item">
            <FiAward size={18} className="telemetry-icon" />
            <div>
              <div className="telemetry-val">100% Verified</div>
              <div className="telemetry-lbl">Original Credential Registry</div>
            </div>
          </div>
          <div className="telemetry-divider" />
          <div className="telemetry-item">
            <FiShield size={18} className="telemetry-icon" />
            <div>
              <div className="telemetry-val">3 × Elite Honours</div>
              <div className="telemetry-lbl">IIT Madras & CMI NPTEL High Honors</div>
            </div>
          </div>
          <div className="telemetry-divider" />
          <div className="telemetry-item">
            <FiCpu size={18} className="telemetry-icon" />
            <div>
              <div className="telemetry-val">Tier-1 Cloud & AI</div>
              <div className="telemetry-lbl">NVIDIA · Google · Oracle · MongoDB</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default React.memo(Certifications);
