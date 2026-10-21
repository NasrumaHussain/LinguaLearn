
import "./Navbar.css";

function Navbar({ onHome }) {
  return (
    <nav className="navbar">
      <button className="brand" onClick={onHome}>
        LinguaLearn<span>.</span>
      </button>

      <div className="navbar-tagline">
        Learn a little every day ✨
      </div>
    </nav>
  );
}

export default Navbar;
