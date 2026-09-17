import './Marquee.css';

const slides = [
  { title: 'The Magic Tree', icon: '🌳', color: 'mq-pink' },
  { title: 'Space Adventure', icon: '🚀', color: 'mq-blue' },
  { title: 'Dinosaur Friends', icon: '🦖', color: 'mq-green' },
  { title: 'Counting Stars', icon: '⭐', color: 'mq-yellow' },
  { title: 'Ocean Explorers', icon: '🐋', color: 'mq-purple' },
  { title: 'The Brave Lion', icon: '🦁', color: 'mq-red' },
];

const track = [...slides, ...slides, ...slides];

const MarqueeSlideshow = () => (
  <section className="mq-fun-section">
    <div className="container mq-fun-header">
      <h2 className="section-heading-fun">Look at all these books!</h2>
    </div>

    <div className="mq-fun-track-wrap">
      <div className="mq-fun-track">
        {track.map((s, i) => (
          <div key={i} className={`mq-fun-card ${s.color}`}>
            <div className="mq-fun-icon">{s.icon}</div>
            <h3 className="mq-fun-title">{s.title}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MarqueeSlideshow;
