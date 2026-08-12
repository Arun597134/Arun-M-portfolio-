import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiFileText, FiSend, FiCheckCircle, FiAlertCircle, FiCpu } from 'react-icons/fi';

export default function Contact() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isMobile, setIsMobile] = useState(false);

  // Chatbot states for mobile-only dialog terminal
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: "Systems online. Welcome! I am your connection terminal. What should I call you?" }
  ]);
  const chatLogRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll chat console to latest message bubble (Strictly container-scoped, prevents window scroll jumping)
  useEffect(() => {
    if (chatLogRef.current) {
      setTimeout(() => {
        if (chatLogRef.current) {
          chatLogRef.current.scrollTo({
            top: chatLogRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 50);
    }
  }, [chatMessages]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Chat console send submission workflow
  const handleChatSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setInputValue('');

    // Append user's input bubble
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);

    if (step === 0) {
      // Capture Name
      setFormData(prev => ({ ...prev, name: userText }));
      setStep(1);
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          sender: 'bot', 
          text: `Great to meet you, ${userText}! What email address should Arun use to write back?` 
        }]);
      }, 600);
    } else if (step === 1) {
      // Capture Email with basic format validation
      if (!userText.includes('@')) {
        setTimeout(() => {
          setChatMessages(prev => [...prev, { 
            sender: 'bot', 
            text: "That doesn't look like a valid email. Please re-type your email address." 
          }]);
        }, 500);
        return;
      }
      setFormData(prev => ({ ...prev, email: userText }));
      setStep(2);
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          sender: 'bot', 
          text: "Understood. Finally, tell me about your project details or vision?" 
        }]);
      }, 600);
    } else if (step === 2) {
      // Capture Message and auto-trigger Formspree post
      const finalMsg = userText;
      setFormData(prev => ({ ...prev, message: finalMsg }));
      setStep(3);
      
      setTimeout(async () => {
        setChatMessages(prev => [...prev, { 
          sender: 'bot', 
          text: "Opening transmission line. Submitting Arun M's packet...",
          isSystem: true
        }]);

        try {
          const response = await fetch('https://formspree.io/f/xaqrrjzo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              name: formData.name || chatMessages.find(m => m.sender === 'user')?.text || 'Visitor',
              email: formData.email || chatMessages.filter(m => m.sender === 'user')[1]?.text || 'noemail@guest.com',
              message: finalMsg
            })
          });

          if (response.ok) {
            setStep(4);
            setChatMessages(prev => [...prev, { 
              sender: 'bot', 
              text: "TRANSMISSION SUCCESSFUL! Thank you for getting in touch. Arun has been notified and will write back soon.",
              isSuccess: true
            }]);
          } else {
            throw new Error('Formspree submit failed');
          }
        } catch (err) {
          setStep(5);
          setChatMessages(prev => [...prev, { 
            sender: 'bot', 
            text: "TRANSMISSION FAILED. Please retry or contact directly at arun.m.dev06@gmail.com.",
            isError: true
          }]);
        }
      }, 700);
    }
  };

  const handleResetChat = () => {
    setStep(0);
    setInputValue('');
    setFormData({ name: '', email: '', message: '' });
    setChatMessages([
      { sender: 'bot', text: "Systems online. Welcome! I am your connection terminal. What should I call you?" }
    ]);
  };

  // Legacy Desktop Submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/xaqrrjzo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setLoading(false);
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Formspree submission failed');
      }
    } catch (error) {
      console.error('Formspree Error:', error);
      setLoading(false);
      setStatus('error');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 14 }
    }
  };

  return (
    <section id="contact" className="contact-section">
      {/* Interactive Background Tech Radar */}
      <div className="mobile-contact-decor">
        <div className="contact-radar-circle ring-1" />
        <div className="contact-radar-circle ring-2" />
      </div>

      <div className="container">
        <div className="contact-grid">
          {/* Left Column: Contact info & channels */}
          <div className="contact-info-panel">
            <span className="section-label">07 / CONNECT</span>
            <h2 className="section-title">Let's build<br />something great.</h2>
            <p className="contact-intro-p">
              Whether you are looking to hire a software engineer with product sensibilities, discuss machine learning, or collaborate on a product launch—get in touch.
            </p>

            <div className="contact-channels-list">
              <div className="channel-item">
                <div className="channel-icon">
                  <FiMail size={18} />
                </div>
                <div>
                  <div className="channel-label">Email</div>
                  <a href="mailto:arun.m.dev06@gmail.com" className="channel-value link-underline">
                    arun.m.dev06@gmail.com
                  </a>
                </div>
              </div>

              <div className="channel-item">
                <div className="channel-icon">
                  <FiPhone size={18} />
                </div>
                <div>
                  <div className="channel-label">Phone</div>
                  <a href="tel:8825521904" className="channel-value link-underline">
                    +91 88255 21904
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-socials-group">
              <a href="https://github.com/Arun597134" target="_blank" rel="noopener noreferrer" className="contact-social-btn">
                <FiGithub size={18} />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/arunvijay-5a2845317" target="_blank" rel="noopener noreferrer" className="contact-social-btn">
                <FiLinkedin size={18} />
                <span>LinkedIn</span>
              </a>
              <a href="/ARUN_M_Resume.pdf" target="_blank" rel="noopener noreferrer" className="contact-social-btn">
                <FiFileText size={18} />
                <span>Resume</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact form (Interactive Chatbot Console) */}
          <div className="contact-form-panel">
            <div className="chat-terminal-console">
              <div ref={chatLogRef} className="chat-log-window" data-lenis-prevent>
                {chatMessages.map((msg, i) => (
                  <motion.div 
                    key={i} 
                    className={`chat-message-row ${msg.sender}`}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 140 }}
                  >
                    <div className={`chat-bubble ${msg.isSystem ? 'system-log' : ''} ${msg.isSuccess ? 'success-log' : ''} ${msg.isError ? 'error-log' : ''}`}>
                      {msg.sender === 'bot' && <FiCpu size={12} className="chat-bot-avatar-icon" />}
                      <span>{msg.text}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Chat Console Footer Input Bar */}
              {step < 3 ? (
                <form onSubmit={handleChatSend} className="chat-entry-form">
                  <input
                    type={step === 1 ? 'email' : 'text'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={
                      step === 0 ? "Type your name..." :
                      step === 1 ? "Type your email..." :
                      "Type your message..."
                    }
                    className="chat-entry-input"
                    required
                  />
                  <button type="submit" className="chat-entry-send">
                    <FiSend size={15} />
                  </button>
                </form>
              ) : (
                <div className="chat-console-footer">
                  {step === 3 && <div className="chat-submitting-spinner">Syncing...</div>}
                  {step === 4 && <button onClick={handleResetChat} className="chat-reset-btn success">Reset Console</button>}
                  {step === 5 && <button onClick={handleResetChat} className="chat-reset-btn error">Retry Channel</button>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
