import React from 'react';
import { motion } from 'framer-motion';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-container" id="about">
      <div className="about-content">
        {/* Left Column */}
        <motion.div 
          className="about-text-col"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="about-badge">About HOOT</div>
          
          <h2 className="about-title">
            A strong foundation for a brighter future <span className="sparkle">✨</span>
          </h2>
          
          <p className="about-highlight">
            HOOT is an early years learning program created with a simple belief: <strong>Curiosity is the beginning of learning.</strong>
          </p>
          
          <p className="about-desc">
            Designed for children <strong>aged 3 to 6 years</strong>, HOOT focuses on building strong foundational skills through inquiry, play, hands-on experiences, stories, language, exploration and meaningful engagement.
          </p>
          
          <p className="about-desc">
            The program is designed to help children become curious learners, confident communicators, independent thinkers and responsible individuals.
          </p>

          <p className="about-desc">
            HOOT values the learning process as much as the outcome. Children are encouraged to ask questions, explore possibilities, make connections, collaborate with others and learn by doing.
          </p>
          
        </motion.div>

        {/* Right Column (Card) */}
        <motion.div 
          className="about-card-col"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="approach-card">
            <h3 className="approach-title">Our Approach</h3>
            <p className="approach-desc">
              HOOT follows a concrete-to-abstract approach, allowing children to first experience, explore and understand concepts before moving towards more abstract learning.
            </p>
            
            <h4 className="approach-list-title">Our learning experiences integrate:</h4>
            <ul className="approach-list">
              <li><span className="bullet bullet-green"></span> Inquiry-based learning</li>
              <li><span className="bullet bullet-yellow"></span> Experiential and hands-on learning</li>
              <li><span className="bullet bullet-red"></span> Play-based learning</li>
              <li><span className="bullet bullet-blue"></span> Literacy and language development</li>
              <li><span className="bullet bullet-yellow"></span> Mathematical thinking</li>
              <li><span className="bullet bullet-red"></span> Stories and storytelling</li>
              <li><span className="bullet bullet-green"></span> Creative expression</li>
              <li><span className="bullet bullet-teal"></span> Collaboration and communication</li>
              <li><span className="bullet bullet-blue"></span> Life skills and values</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
