import './CategoryNav.css';

const categories = [
  {
    id: 'books',
    emoji: '📚',
    title: 'Story Books',
    desc: 'Read magical stories and learn new things!',
    color: 'bg-fun-pink',
  },
  {
    id: 'activities',
    emoji: '🎨',
    title: 'Fun Activities',
    desc: 'Games, puzzles, and interactive fun.',
    color: 'bg-fun-yellow',
  },
  {
    id: 'printables',
    emoji: '🖍️',
    title: 'Print & Color',
    desc: 'Cool pictures to print and color at home.',
    color: 'bg-fun-green',
  },
  {
    id: 'parents',
    emoji: '👨‍🏫',
    title: 'For Parents',
    desc: 'Guides and tips for grown-ups.',
    color: 'bg-fun-purple',
  },
];

const CategoryNav = () => (
  <section className="cat-fun-section" id="resources">
    <div className="container">
      <div className="cat-fun-header">
        <h2 className="section-heading-fun">Pick an Adventure!</h2>
        <p className="section-sub-fun">Choose what you want to do today. Tap on a block to start playing!</p>
      </div>

      <div className="cat-fun-grid">
        {categories.map((cat) => (
          <div key={cat.id} className={`cat-fun-card ${cat.color}`} tabIndex={0} role="button">
            <div className="cat-fun-emoji">{cat.emoji}</div>
            <h3 className="cat-fun-title">{cat.title}</h3>
            <p className="cat-fun-desc">{cat.desc}</p>
            <div className="cat-fun-btn">Go! 🚀</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryNav;
