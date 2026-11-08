import { useState } from "react";
import "./Navbar.css";

function Navbar({ onHome, onLearn, onPractice, onAbout, onSettings, onProfile }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand-section">
        <button className="brand" onClick={onHome}>
          LinguaLearn<span>.</span>
        </button>

        <div className="navbar-tagline">
          Learn a little every day ✨
        </div>
      </div>

      <div className="navbar-links">
        <button className="navbar-link" onClick={onHome}>
          Home
        </button>

        <button className="navbar-link" onClick={onLearn}>
          Learn
        </button>

        <button className="navbar-link" onClick={onPractice}>
          Practice
        </button>

        <button className="navbar-link" onClick={onAbout}>
          About
        </button>

        <button className="navbar-link" onClick={onSettings}>
          Settings
        </button>

        <div className="profile-container">
          <button
            className="profile-button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <span>👤</span> Profile
          </button>

          {showProfileMenu && (
            <div className="profile-dropdown">
              <button onClick={onProfile}>My Profile</button>
              <button onClick={onProfile}>Login / Register</button>
              <p>Account features coming soon</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
