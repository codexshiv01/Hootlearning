import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Leaf } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrame = useRef(0);
  const targetFrame = useRef(0);
  const frameCount = 45;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Fade in subtitle between 15% and 30% of scroll
  const subtitleOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.15, 0.3], [20, 0]);

  useEffect(() => {
    // Preload images
    const loadImages = () => {
      const loadedImages = [];
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(3, '0');
        img.src = `/frames-webp/ezgif-frame-${paddedIndex}.webp`;
        loadedImages.push(img);
      }
      imagesRef.current = loadedImages;
    };
    
    loadImages();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const end = rect.height - window.innerHeight;
      const scrollPosition = -rect.top;
      
      let progress = scrollPosition / end;
      progress = Math.max(0, Math.min(1, progress));
      
      const animationProgress = Math.min(1, progress / 0.85);
      targetFrame.current = animationProgress * (frameCount - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let animationFrameId;
    const render = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReducedMotion) {
        currentFrame.current = targetFrame.current;
      } else {
        currentFrame.current += (targetFrame.current - currentFrame.current) * 0.15;
      }

      const frameIndex = Math.round(currentFrame.current);
      if (imagesRef.current[frameIndex] && imagesRef.current[frameIndex].complete) {
        const img = imagesRef.current[frameIndex];
        
        const canvasWidth = canvas.clientWidth;
        const canvasHeight = canvas.clientHeight;
        
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;
        
        let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
        
        if (canvasRatio > imgRatio) {
           drawWidth = canvasWidth;
           drawHeight = canvasWidth / imgRatio;
           offsetY = (canvasHeight - drawHeight) / 2;
        } else {
           drawHeight = canvasHeight;
           drawWidth = canvasHeight * imgRatio;
           
           // On mobile, the subject (owl/girl) appears on the right side ONLY at the end.
           // To avoid cutting the center of the first frame, we dynamically PAN the camera.
           // Starts centered (0.5), and ends shifted to the right (0.85) as it plays.
           if (window.innerWidth <= 768) {
             const progress = currentFrame.current / (frameCount - 1);
             const alignPercent = 0.5 + (0.35 * progress);
             offsetX = (canvasWidth - drawWidth) * alignPercent;
           } else {
             offsetX = (canvasWidth - drawWidth) / 2;
           }
        }
        
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="hero-scroll-container" id="home" ref={containerRef}>
      <div className="hero-sticky-container">
        <canvas ref={canvasRef} className="hero-canvas"></canvas>
        <div className="hero-container">
          <div className="hero-content">
        {/* Top Text Block */}
        <motion.div 
          className="hero-top-text"
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

          <motion.h2 
            className="hero-subtitle"
            style={{ opacity: subtitleOpacity, y: subtitleY }}
          >
            Learning that sparks curiosity and inspires discovery.
          </motion.h2>
        </motion.div>

        {/* Bottom Button Block */}
        <motion.div
          className="hero-bottom-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link to="/dashboard" className="hero-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            Explore Our Programs
            <span className="arrow">→</span>
          </Link>
        </motion.div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
