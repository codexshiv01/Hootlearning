import './KidsHero.css';

const KidsHero = () => {
  return (
    <section className="khero-section">
      {/* Animated Clouds Background */}
      <div className="khero-clouds">
        <div className="cloud cloud-1">☁️</div>
        <div className="cloud cloud-2">☁️</div>
        <div className="cloud cloud-3">☁️</div>
        <div className="cloud cloud-4">☁️</div>
      </div>

      <div className="container khero-container">
        <div className="khero-content">
          <div className="khero-badge">✨ Welcome to Hoot!</div>
          
          <h1 className="section-heading-fun khero-title">
            Let's Read,<br/>
            Play & Learn!
          </h1>
          
          <p className="section-sub-fun khero-sub">
            A magical library filled with amazing story books, fun activities, and cool things to print! Ask your teacher or parents to help you explore.
          </p>
          
          <div className="khero-actions">
            <button className="btn-fun btn-fun-pink">
              Start Playing! 🚀
            </button>
            <button className="btn-fun btn-fun-blue">
              Parents Info 👨‍👩‍👧‍👦
            </button>
          </div>
        </div>

        <div className="khero-visual">
          <div className="khero-mascot-wrap">
            {/* The owl logo as the hero mascot */}
            <img src="/logo.jpeg" alt="Hoot Owl Mascot" className="khero-mascot" />
            <div className="khero-sparkle sp-1">✨</div>
            <div className="khero-sparkle sp-2">⭐</div>
            <div className="khero-sparkle sp-3">🎈</div>
          </div>
        </div>
      </div>

      {/* Wavy bottom divider */}
      <div className="khero-wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,197.4,109.98,242.49,103.46,283.47,81.16,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>
    </section>
  );
};

export default KidsHero;
