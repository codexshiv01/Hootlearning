import './Hero.css';

const stats = [
  { value: '34+', label: 'Books' },
  { value: '3', label: 'Categories' },
  { value: '100+', label: 'Schools' },
];

const Hero = () => (
  <section className="hero">
    {/* Decorative blobs */}
    <div className="hero-blob hero-blob-1" aria-hidden="true" />
    <div className="hero-blob hero-blob-2" aria-hidden="true" />
    <div className="hero-blob hero-blob-3" aria-hidden="true" />

    <div className="container hero-container">
      <div className="hero-content">

        <span className="eyebrow">✦ Learning Resource Portal</span>

        <h1 className="hero-heading">
          Elevate Teaching.<br />
          <em className="hero-heading-em">Inspire Learning.</em>
        </h1>

        <p className="hero-sub">
          Hoot is your school's curated digital library — books, planners,
          teaching aids and SOPs in one beautifully organised space.
        </p>

        {/* Search bar */}
        <div className="hero-search">
          <span className="search-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </span>
          <input
            id="hero-search-input"
            type="text"
            className="search-input"
            placeholder="Search books, planners, SOPs…"
          />
          <button className="btn btn-primary search-btn">Search</button>
        </div>

        {/* Stats row */}
        <div className="hero-stats">
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero illustration card stack */}
      <div className="hero-visual" aria-hidden="true">
        <div className="book-stack">
          <div className="stack-card stack-card-3" />
          <div className="stack-card stack-card-2" />
          <div className="stack-card stack-card-1">
            <div className="stack-inner">
              <div className="stack-label">EXPLORERS</div>
              <div className="stack-title">The Art of Discovery</div>
              <div className="stack-footer">
                <span className="stack-tag">PDF • 128 pages</span>
                <span className="stack-owl">🦉</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
