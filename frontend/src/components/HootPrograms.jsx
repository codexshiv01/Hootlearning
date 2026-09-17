import React from 'react';
import { motion } from 'framer-motion';
import './HootPrograms.css';

const HootPrograms = () => {
  const levels = [
    {
      title: 'EXPLORERS',
      age: '3+',
      description: 'A stage of wonder, exploration and discovery, where children learn through play, sensory experiences, stories, movement and simple inquiry.',
      color: '#3b82f6',
      bg: '#eff6ff'
    },
    {
      title: 'THINKERS',
      age: '4+',
      description: 'Children begin to question, connect and communicate their ideas through hands-on experiences, conversations, exploration and collaborative learning.',
      color: '#8b5cf6',
      bg: '#f5f3ff'
    },
    {
      title: 'DOERS',
      age: '5+',
      description: 'Children are encouraged to think independently, express ideas, solve problems and apply their learning through meaningful experiences and inquiry.',
      color: '#10b981',
      bg: '#ecfdf5'
    }
  ];

  return (
    <section className="programs-section" id="programs">
      <div className="programs-container">
        
        {/* Programs Column */}
        <motion.div 
          className="programs-content"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">Our Curriculum</div>
          <h2 className="section-title">HOOT Programs</h2>
          <p className="section-subtitle">
            HOOT offers a progressive learning journey across <strong>three levels</strong>, designed to meet the developmental needs of young learners:
          </p>

          <div className="levels-grid">
            {levels.map((level, index) => (
              <div 
                key={index} 
                className="level-card" 
                style={{ '--theme-color': level.color, '--theme-bg': level.bg }}
              >
                <div className="level-header">
                  <h3 className="level-title">{level.title}</h3>
                  <span className="level-age">{level.age}</span>
                </div>
                <p className="level-desc">{level.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Philosophy Column */}
        <motion.div 
          className="philosophy-content"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="philosophy-card">
            <h2>The HOOT Philosophy</h2>
            <h3 className="quote">“Learning from the Hands, Growing through the Heart.”</h3>
            
            <p>
              HOOT follows a <strong>Hands & Heart</strong> approach—where children learn by doing, exploring and experiencing, while developing empathy, confidence, kindness and a sense of responsibility.
            </p>

            <div className="philosophy-tags">
              <span>Curious Minds</span>
              <span>Active Hands</span>
              <span>Kind Hearts</span>
              <span>Confident Learners</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HootPrograms;
