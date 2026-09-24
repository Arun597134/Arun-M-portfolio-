import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiArrowUpRight } from 'react-icons/fi';

const PROJECTS = [
  {
    id: 1,
    title: 'CivicFlow',
    subtitle: 'AI Civic Complaint Platform',
    desc: 'Engineered a full-stack civic complaint platform for all 38 Tamil Nadu districts with a CNN-based image classifier that auto-categorizes and routes complaints, cutting manual triage effort by 90%. Deployed a Random Forest model to predict resolution timelines and flag repair quotes above Rs.500 as potential overcharges.',
    image: '/civicflow_mockup.png',
    video: '/civicflow_video.mp4',
    tech: ['React.js', 'Flask', 'SQLite', 'CNN', 'Random Forest'],
    impact: 'Reduced manual complaint triage by 90%',
    github: 'https://github.com/Arun597134/CivicflowAI'
  },
  {
    id: 2,
    title: 'HireWise',
    subtitle: 'AI Voice Mock Interviewer',
    desc: 'Built an AI-driven mock interview simulator that parses resumes via PyMuPDF and generates role-specific interview questions. Features built-in speech-to-text and text-to-speech pipelines to provide an intuitive, hands-free voice conversational experience for candidates.',
    image: '/hirewise_mockup.png',
    video: '/hirewise_video.mp4',
    tech: ['Python', 'Mistral AI API', 'Speech Recognition', 'Resume Parsing', 'Real-time Voice Pipeline'],
    impact: 'Built real-time speech-to-text/text-to-speech pipelines for hands-free feedback',
    github: 'https://github.com/AjayJ19/HireWise-AI'
  },
  {
    id: 3,
    title: 'AI Online Assessment Platform',
    subtitle: 'Proctored Examination Console',
    desc: 'Developed a MERN-based exam platform with AI-generated MCQs, timed auto-submission, and role-based access controls. Integrated a client-side TensorFlow.js proctoring module detecting face absence and tab-switching, successfully deployed to certify students in a college AI internship program.',
    image: '/assessment_mockup.png',
    video: '/assessment_video.mp4',
    tech: ['MERN Stack', 'TensorFlow.js', 'AI Generated Questions', 'AI Proctoring', 'Role Based Auth'],
    impact: 'Deployed TensorFlow.js face absence detector to certify college students',
    github: 'https://github.com/Arun597134/AI-Exam-portal'
  },
  {
    id: 4,
    title: 'IngestaX Framework',
    subtitle: 'Enterprise SQL-Pushdown Ingestion Engine',
    desc: 'Architected an enterprise data quality gateway and resilient ingestion pipeline built on PostgreSQL 16. Compiles YAML validation rules dynamically into native relational set operations, flattening memory consumption to a flat 12.4 MB (36.4× reduction vs legacy 452 MB Python loops). Features an active timeout watchdog circuit breaker (TTL = 3.0s) that isolates lagging batches into overflow staging without pipeline starvation, alongside zero-duplicate idempotent upserts.',
    image: '/ingestax_mockup.png',
    video: '/ingestax_video.mp4',
    tech: ['PostgreSQL 16', 'Python', 'Apache Airflow', 'Docker', 'YAML', 'FastAPI'],
    impact: '36.4× memory reduction (flat 12.4 MB) & zero-duplicate idempotent upserts',
    github: 'https://github.com/Arun597134/IngestaX-Framework'
  }
];

export default function SelectedWork({ activeTech }) {
  const matchTech = (techList, hoveredTech) => {
    if (!hoveredTech) return false;
    const cleanHovered = hoveredTech.toLowerCase().replace(/[^a-z0-9]/g, '');
    return techList.some(t => {
      const cleanT = t.toLowerCase().replace(/[^a-z0-9]/g, '');
      return cleanT.includes(cleanHovered) || cleanHovered.includes(cleanT);
    });
  };

  return (
    <section id="work" className="work-section">
      <div className="container">
        <div className="work-header">
          <span className="section-label">02 / PRODUCTS</span>
          <h2 className="section-title">Selected Work</h2>
          <p className="work-header-p">
            A showcase of production-ready systems and applications built with a focus on machine learning intelligence and user-centered frontend development.
          </p>
        </div>

        <div className="projects-list">
          {PROJECTS.map((proj, idx) => {
            const isEven = idx % 2 === 0;
            const isMatched = activeTech ? matchTech(proj.tech, activeTech) : true;
            const isAnyHovered = activeTech !== null;

            return (
              <React.Fragment key={proj.id}>
                {idx > 0 && <div className="project-separator" />}
                <motion.div 
                  className={`project-case-study ${isEven ? 'row-normal' : 'row-reverse'} ${
                    isAnyHovered ? (isMatched ? 'highlighted' : 'dimmed') : ''
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                {/* Project Visual Mockup */}
                <div className="project-visual">
                  <div className="visual-wrapper">
                    <video 
                      src={proj.video} 
                      poster={proj.image} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="project-video"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.parentElement) {
                          e.target.parentElement.style.backgroundImage = `url(${proj.image})`;
                          e.target.parentElement.style.backgroundSize = 'cover';
                          e.target.parentElement.style.backgroundPosition = 'center';
                        }
                      }}
                    />
                    <div className="visual-glow-overlay" />
                  </div>
                </div>

                {/* Project Details Panel */}
                <div className="project-details">
                  <span className="project-subtitle">{proj.subtitle}</span>
                  <h3 className="project-title">{proj.title}</h3>
                  
                  <p className="project-desc">{proj.desc}</p>
                  
                  <div className="project-metric-card">
                    <div className="metric-tag">IMPACT</div>
                    <div className="metric-content">{proj.impact}</div>
                  </div>

                  <div className="project-tech-tags">
                    {proj.tech.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <a 
                      href={proj.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-github"
                    >
                      <FiGithub size={16} />
                      <span>GitHub Repository</span>
                      <FiArrowUpRight size={14} className="arrow-icon" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </React.Fragment>
          );
        })}
        </div>
      </div>
    </section>
  );
}
