import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiFileText, FiCode, FiCpu } from 'react-icons/fi';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';

function Interactive3DScene({ isInView = true }) {
  const outerWireRef = useRef();
  const innerBlobRef = useRef();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const segments = isMobile ? 32 : 64;

  useFrame((state) => {
    if (!isInView) return; // Complete skip when off-screen to save 100% GPU
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    // Smooth hover/parallax rotation
    if (outerWireRef.current) {
      outerWireRef.current.rotation.y = state.clock.getElapsedTime() * 0.15 + mouseX * 0.3;
      outerWireRef.current.rotation.x = mouseY * 0.3;
    }
    if (innerBlobRef.current) {
      innerBlobRef.current.rotation.y = -state.clock.getElapsedTime() * 0.1 - mouseX * 0.2;
      innerBlobRef.current.rotation.x = -mouseY * 0.2;
    }
  });

  return (
    <group>
      {/* Outer Wireframe Shell */}
      <mesh ref={outerWireRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial 
          color="#6366f1" 
          wireframe 
          transparent 
          opacity={0.14} 
        />
      </mesh>

      {/* Secondary outer orbit ring */}
      <mesh ref={outerWireRef}>
        <torusGeometry args={[2.5, 0.02, 8, 100]} />
        <meshBasicMaterial
          color="#818cf8"
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Central Organic Blob representing AI & Code */}
      <Sphere ref={innerBlobRef} args={[1.2, segments, segments]} scale={1.1}>
        <MeshDistortMaterial
          color="#4F46E5"
          attach="material"
          distort={0.45}
          speed={2.2}
          roughness={0.2}
          metalness={0.95}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>

      {/* Lights */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} color="#818CF8" />
      <pointLight position={[-5, -5, -5]} intensity={1.5} color="#4F46E5" />
    </group>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const [isInView, setIsInView] = useState(true);

  // Pause WebGL rendering entirely when Hero is scrolled out of view
  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const handleScrollToWork = (e) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      if (window.lenis) {
        window.lenis.scrollTo(workSection, { duration: 1.2 });
      } else {
        workSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="hero" ref={heroRef} className="hero-section">
      {/* Dynamic Background Particles (Aesthetic Floating Quantum sparks) */}
      <div className="hero-bg-particles">
        {[...Array(18)].map((_, i) => {
          const colors = ['var(--accent)', '#818cf8', '#f43f5e'];
          const color = colors[i % colors.length];
          // We generate static deterministic weights to avoid hydration mismatches in Vite production builds
          const delay = (i * 0.6).toFixed(1);
          const duration = (10 + (i * 1.7) % 14).toFixed(1);
          const size = (3 + (i * 7) % 6).toFixed(0);
          const left = ((i * 17) % 95 + 2.5).toFixed(1);
          return (
            <div 
              key={i}
              className="bg-particle"
              style={{
                left: `${left}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                width: `${size}px`,
                height: `${size}px`,
                background: color,
                boxShadow: `0 0 10px ${color}`
              }}
            />
          );
        })}
      </div>

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Product-Launch Copy */}
          <div className="hero-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
            >
              <h1 className="hero-title">
                Building software<br />
                <span className="text-glow">that solves</span><br />
                real-world problems.
              </h1>
            </motion.div>

            {/* Alternating Subtitle Tags */}
            <motion.div
              className="hero-subtitle-container"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            >
              <span className="hero-role-tag">Full Stack Developer</span>
              <span className="hero-role-divider">•</span>
              <span className="hero-role-tag">AI Engineer</span>
              <span className="hero-role-divider">•</span>
              <span className="hero-role-tag">Product Builder</span>
            </motion.div>

            <motion.p
              className="hero-paragraph"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
            >
              I build intelligent web applications, scalable backend systems, and AI-powered products focused on solving meaningful real-world challenges. Currently final-year AI & Data Science student at St. Joseph's Institute of Technology.
            </motion.p>

            {/* CTA Actions */}
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
            >
              <a href="#work" onClick={handleScrollToWork} className="btn-primary magnetic-btn">
                View Selected Work
                <FiArrowRight size={16} style={{ marginLeft: '8px' }} />
              </a>
              <a 
                href="/ARUN_M_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary magnetic-btn"
              >
                <FiFileText size={16} style={{ marginRight: '8px' }} />
                Download Resume
              </a>
            </motion.div>

            {/* Social Channels */}
            <motion.div
              className="hero-socials"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <a href="https://github.com/Arun597134" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FiGithub size={20} />
              </a>
              <a href="https://linkedin.com/in/arunvijay-5a2845317" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FiLinkedin size={20} />
              </a>
              <a href="mailto:arun.m.dev06@gmail.com" aria-label="Email">
                <FiMail size={20} />
              </a>
            </motion.div>
          </div>

          {/* Right Column: 3D Visualization & Floating UI Cards */}
          <div className="hero-right">
            <div className="canvas-wrapper">
              <Canvas 
                frameloop={isInView ? 'always' : 'never'}
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}
              >
                <Interactive3DScene isInView={isInView} />
              </Canvas>
            </div>

            {/* Floating Glassmorphic UI Cards */}
            <motion.div
              className="floating-card card-leetcode"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
              style={{ top: '20%', right: '10%' }}
            >
              <div className="floating-card-icon">
                <FiCode size={18} />
              </div>
              <div>
                <div className="floating-card-title">LeetCode</div>
                <div className="floating-card-desc">320+ Solved</div>
              </div>
            </motion.div>

            <motion.div
              className="floating-card card-ai"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
              style={{ bottom: '25%', left: '5%' }}
            >
              <div className="floating-card-icon">
                <FiCpu size={18} />
              </div>
              <div>
                <div className="floating-card-title">TensorFlow AI</div>
                <div className="floating-card-desc">Proctoring Active</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a href="#work" onClick={handleScrollToWork} aria-label="Scroll to work">
            <div className="mouse-icon">
              <motion.div 
                className="scroll-dot"
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
            <span>SCROLL TO BUILD</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default React.memo(Hero);
