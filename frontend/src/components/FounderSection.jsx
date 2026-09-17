import React from 'react';
import { motion } from 'framer-motion';
import founderImg from '../assets/founder.png';
import './FounderSection.css';

const FounderSection = () => {
  return (
    <section className="founder-container">
      <div className="founder-content">
        
        {/* Left Column: Founder Info */}
        <motion.div 
          className="founder-info-col"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="founder-badge">Meet the Founder Director</div>
          
          <div className="founder-details-wrapper">
            <div className="founder-image-wrapper">
              <div className="founder-blob"></div>
              <img 
                src={founderImg} 
                alt="Ms. Asha Sharma" 
                className="founder-img" 
              />
              <div className="founder-deco-wave"></div>
            </div>
            
            <div className="founder-text">
              <h2 className="founder-name">Ms. Asha Sharma</h2>
              <p className="founder-roles">Educationist | Curriculum Developer | Author | Early Childhood Specialist</p>
              
              <p className="founder-bio">
                Ms. Asha Sharma is an educationist by soul, an explorer by mind and a curious leader in the field of early childhood education. She began her journey in Early Childhood Care and Development in 2004 and brings over 22 years of experience to the field.
              </p>
              
              <p className="founder-bio">
                Over the years, she has worked across various roles in early education—from being a kindergarten teacher and educator to a curriculum developer, teacher trainer and author. She has authored 100+ books for preschool learners.
              </p>

              <p className="founder-bio">
                A certified language coach from the UK, Ms. Sharma has developed a strong focus on early literacy and phonics. She believes that stories, songs and meaningful experiences can play a powerful role in developing language, values and positive behaviour in young children.
              </p>

              <p className="founder-bio">
                Her philosophy is rooted in curiosity, exploration and learning through experience. This reflects in the way HOOT's curriculum progresses from concrete experiences to abstract understanding.
              </p>

              <p className="founder-bio">
                She has also worked with educators and institutions internationally, bringing together global perspectives, best practices and practical classroom experiences.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Vision */}
        <motion.div 
          className="founder-vision-col"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="vision-card">
            <h3 className="vision-title">Her Vision</h3>
            <div className="vision-content">
              <p className="vision-statement"><strong>To nurture childhood, not hurry it.</strong></p>
              <p className="vision-text">
                To create spaces where curiosity can wander, imagination can take flight, and every child is free to explore, wonder, question, create and simply be a child.
              </p>
              <p className="vision-quote">
                “We do not seek to shape childhood into something it is not; we seek to honour it, embrace it and give it the space to flourish.”
              </p>
            </div>
            <div className="vision-deco-leaf">✨</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FounderSection;
