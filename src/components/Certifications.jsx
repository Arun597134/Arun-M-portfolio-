import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiExternalLink, FiCheckCircle, FiShield, FiCpu, FiDatabase, FiCloud, FiLayers } from 'react-icons/fi';

const CATEGORIES = [
  { id: 'all', label: 'All Credentials', count: 7, icon: FiLayers },
  { id: 'ai', label: 'AI & Deep Learning', count: 3, icon: FiCpu },
  { id: 'data', label: 'Database & Systems', count: 2, icon: FiDatabase },
  { id: 'cloud', label: 'Cloud & Web', count: 2, icon: FiCloud },
];

const CERTIFICATIONS = [
  {
    id: 1,
    num: '01',
    category: 'ai',
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
    category: 'ai',
    title: 'Getting Started with Deep Learning',
    issuer: 'NVIDIA Deep Learning Institute',
    year: '2026',
    elite: false,
    credId: 'NVDLI-CS994821',
    verifyUrl: 'https://courses.nvidia.com/',
    skills: ['CNN Architectures', 'PyTorch', 'Computer Vision'],
    desc: 'Hands-on validation in training deep neural networks, loss optimization, and edge inference model deployment.',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    issuerBadge: 'NVIDIA DLI'
  },
  {
    id: 3,
    num: '03',
    category: 'ai',
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud Skills Boost',
    year: '2025',
    elite: false,
    credId: 'GCP-GENAI-118839',
    verifyUrl: 'https://cloud.google.com/training',
    skills: ['LLM Architecture', 'Vertex AI', 'Prompt Engineering'],
    desc: 'Covers foundation transformer models, generative model pipelines, and responsible AI safety guardrails.',
    accentColor: '#0ea5e9',
    glowColor: 'rgba(14, 165, 233, 0.25)',
    issuerBadge: 'GOOGLE CLOUD'
  },
  {
    id: 4,
    num: '04',
    category: 'cloud',
    title: 'OCI AI Foundations Associate',
    issuer: 'Oracle University',
    year: '2025',
    elite: false,
    credId: 'ORCL-OCI-AI-20519',
    verifyUrl: 'https://education.oracle.com/',
    skills: ['Cloud AI Services', 'OCI Vision', 'Anomaly Detection'],
    desc: 'Validates Oracle Cloud cognitive architectures, speech synthesis services, and enterprise AI workflows.',
    accentColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.25)',
    issuerBadge: 'ORACLE OCI'
  },
  {
    id: 5,
    num: '05',
    category: 'data',
    title: 'Database Management Systems',
    issuer: 'NPTEL · IIT Madras',
    year: '2026',
    elite: true,
    eliteText: 'ELITE · RDBMS CORE',
    credId: 'NPTEL26CS12S904818',
    verifyUrl: 'https://nptel.ac.in/',
    skills: ['Relational Algebra', 'SQL Pushdown', 'ACID Locks'],
    desc: 'Elite validation covering relational schema calculus, B+ tree indexing, query execution planning, and transactions.',
    accentColor: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.25)',
    issuerBadge: 'IITM / NPTEL'
  },
  {
    id: 6,
    num: '06',
    category: 'data',
    title: 'Basics of MongoDB',
    issuer: 'MongoDB University',
    year: '2025',
    elite: false,
    credId: 'MDB-BAS-9018241',
    verifyUrl: 'https://university.mongodb.com/',
    skills: ['BSON Schema', 'Aggregation Pipeline', 'Atlas NoSQL'],
    desc: 'Comprehensive validation in document database modeling, index optimization, and aggregation operators.',
    accentColor: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.25)',
    issuerBadge: 'MONGODB'
  },
  {
    id: 7,
    num: '07',
    category: 'cloud',
    title: 'Front End Development Standards',
    issuer: 'Infosys Springboard',
    year: '2025',
    elite: false,
    credId: 'INFY-FED-884210',
    verifyUrl: 'https://infyspringboard.onwingspan.com/',
    skills: ['Modern ES6+', 'Component Architecture', 'Performance'],
    desc: 'Validates modern responsive user interfaces, DOM lifecycle execution, and cross-browser production deployment.',
    accentColor: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.25)',
    issuerBadge: 'INFOSYS'
  }
];

function HolographicCredentialCard({ cert }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -7;
    const rY = ((x - centerX) / centerX) * 7;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="credential-pass-wrapper"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="credential-pass-card"
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        style={{
          '--pass-accent': cert.accentColor,
          '--pass-glow': cert.glowColor,
          '--mouse-x': `${glarePos.x}%`,
          '--mouse-y': `${glarePos.y}%`,
        }}
      >
        {/* Holographic Shimmer Foil Overlay */}
        <div
          className="holo-shimmer-layer"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)`
          }}
        />

        {/* AI/ML Neural Synaptic Architecture & Full-Stack Telemetry Watermark */}
        <div className="security-watermark-grid">
          {/* Background Blueprint Grid Lines */}
          <div className="grid-blueprint-lines" />

          {/* Neural Network Architecture Vector */}
          <svg className="neural-network-canvas" viewBox="0 0 380 220" fill="none" preserveAspectRatio="none">
            {/* Passive Synaptic Connection Paths */}
            <path d="M 35 55 Q 90 25 150 75 T 325 55" className="synapse-path" />
            <path d="M 35 55 Q 100 110 150 145 T 325 165" className="synapse-path" />
            <path d="M 35 165 Q 90 120 150 75 T 325 55" className="synapse-path" />
            <path d="M 35 165 Q 90 195 150 145 T 325 165" className="synapse-path" />
            <path d="M 150 75 L 150 145" className="synapse-path" />
            <path d="M 90 110 L 240 110" className="synapse-path" />

            {/* Active Synaptic Forward & Back-Prop Pulses */}
            <path d="M 35 55 Q 90 25 150 75 T 325 55" className="synapse-active-stream stream-1" />
            <path d="M 35 165 Q 90 120 150 75 T 325 55" className="synapse-active-stream stream-2" />
            <path d="M 35 55 Q 100 110 150 145 T 325 165" className="synapse-active-stream stream-3" />
            <path d="M 150 75 L 150 145" className="synapse-active-stream stream-4" />

            {/* Neural Network Nodes (Neurons) */}
            <circle cx="35" cy="55" r="4.5" className="neuron-node" />
            <circle cx="35" cy="165" r="4.5" className="neuron-node" />
            <circle cx="95" cy="110" r="5" className="neuron-node neuron-hub" />
            <circle cx="150" cy="75" r="5" className="neuron-node" />
            <circle cx="150" cy="145" r="5" className="neuron-node" />
            <circle cx="235" cy="110" r="5" className="neuron-node neuron-hub" />
            <circle cx="325" cy="55" r="4.5" className="neuron-node" />
            <circle cx="325" cy="165" r="4.5" className="neuron-node" />
          </svg>

          {/* AI/ML & Full Stack Live Telemetry Metadata */}
          <div className="telemetry-watermark-row">
            <span className="telemetry-badge">
              {cert.category === 'ai' ? '⚡ NEURAL LOSS: 0.0014' : '⚡ REST API: 200 OK'}
            </span>
            <span className="telemetry-badge">
              {cert.category === 'ai' ? 'VAL_ACC: 99.8%' : 'LATENCY: 12ms'}
            </span>
            <span className="telemetry-badge">
              {cert.category === 'ai' ? 'TENSOR[512]' : 'SHA-256 VERIFIED'}
            </span>
          </div>
        </div>

        {/* Card Header Banner */}
        <div className="pass-header-row">
          <div className="pass-issuer-chip">
            <span className="issuer-indicator-dot" />
            <span className="issuer-badge-text">{cert.issuerBadge}</span>
          </div>

          <div className="pass-status-pill">
            <FiCheckCircle size={12} className="status-check-icon" />
            <span>VERIFIED ON-CHAIN</span>
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
      </motion.div>
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
            <span className="section-label">06 / VERIFIED CREDENTIALS</span>
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
              <div className="telemetry-val">2 × Elite Honours</div>
              <div className="telemetry-lbl">IIT Madras NPTEL High Honors</div>
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
