import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import './HeroSection.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const HeroSection = () => {
  return (
    <section className="hero-container" id="home">
      <div className="hero-content">
        {/* Left Column: Text */}
        <motion.div 
          className="hero-text-col"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="hero-badge">
            <span className="badge-highlight">Early Years Learning Program</span>
            <span className="badge-divider">|</span>
            <span className="badge-text">Ages 3 – 6</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="hero-title">
            Welcome to <span className="hoot-text"><span className="h-blue">H</span><span className="o-yellow">O</span><span className="o-red">O</span><span className="t-teal">T</span></span>
          </motion.h1>

          <motion.h2 variants={fadeUp} className="hero-subtitle">
            Learning that sparks curiosity. Learning that inspires children to discover and do.
          </motion.h2>

          <motion.p variants={fadeUp} className="hero-desc">
            HOOT is a comprehensive early years learning program designed for children in their foundational years, ages 3 to 6 years. HOOT brings together curriculum, learner readers and learning engagements to create meaningful, hands-on learning experiences for young children.
          </motion.p>

          <Link to="/dashboard" className="hero-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            Explore Our Programs
            <span className="arrow">→</span>
          </Link>
        </motion.div>

        {/* Right Column: Image & Graphics */}
        <motion.div 
          className="hero-image-col"
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <div className="hero-image-wrapper">
            {/* Background Blob Layer */}
            <div className="blob-bg"></div>
            
            {/* The main image */}
            <img src="/src/assets/image.png" alt="Curious child" className="hero-main-img" />

            {/* Decorative elements */}
            <div className="deco-sun">
              <Sun size={48} color="#FBBF24" strokeWidth={1.5} />
            </div>
            
            <div className="deco-text-bubble">
              <p>Curious<br/>Minds<br/><span className="highlight-text">Bright<br/>Futures</span></p>
            </div>
            
            {/* Simple CSS-based Owl representation (or placeholder if icon not available) */}
            <div className="deco-owl">
              <div className="owl-body">
                <div className="owl-eyes">
                  <div className="owl-eye"><div className="owl-pupil"></div></div>
                  <div className="owl-eye"><div className="owl-pupil"></div></div>
                </div>
                <div className="owl-beak"></div>
              </div>
            </div>
            
            <div className="deco-leaves">
              <Leaf size={32} color="#22C55E" fill="#22C55E" className="leaf-1"/>
              <Leaf size={24} color="#4ADE80" fill="#4ADE80" className="leaf-2"/>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
