import { Link } from 'react-router-dom';
import { X, LogOut, LogIn } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ sections, activeSection, onSelect, isOpen, onClose, isLoggedIn, onLogout, onLogin }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <Link to="/" className="sidebar-logo-link">
          <img src="/logo.jpeg" alt="Hoot" className="sidebar-logo" />
          <span>Hoot</span>
        </Link>
        {/* Mobile close button */}
        <button className="mobile-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-label">Library</div>
        {sections.map((section) => (
          <button
            key={section.id}
            className={`sidebar-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => onSelect(section.id)}
          >
            <span className="sidebar-icon">{section.icon}</span>
            {section.label}
          </button>
        ))}
      </nav>

      {/* Mobile Auth Buttons (visible mostly on mobile or at the bottom of the sidebar) */}
      <div className="sidebar-auth-section">
        {isLoggedIn ? (
          <button className="sidebar-auth-btn" onClick={onLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        ) : (
          <button className="sidebar-auth-btn login-btn" onClick={onLogin}>
            <LogIn size={20} />
            <span>Login</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
