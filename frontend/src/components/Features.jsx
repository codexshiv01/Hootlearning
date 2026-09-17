import './Features.css';

const features = [
  { icon: '🛡️', title: 'Safe & Secure', desc: 'No ads, no pop-ups. Just a safe place to play and learn.' },
  { icon: '📱', title: 'Play Anywhere', desc: 'Works on tablets, phones, and computers!' },
  { icon: '🎓', title: 'Teacher Approved', desc: 'Books and activities chosen by real teachers.' },
];

const Features = () => (
  <section className="feat-fun-section">
    <div className="container">
      <h2 className="section-heading-fun text-center">Why Parents Love Hoot ❤️</h2>
      
      <div className="feat-fun-grid">
        {features.map((f, i) => (
          <div key={i} className="feat-fun-card">
            <div className="feat-fun-icon">{f.icon}</div>
            <h3 className="feat-fun-title">{f.title}</h3>
            <p className="feat-fun-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
