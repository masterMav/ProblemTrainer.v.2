import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nothing">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark m-0 p-0">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <h2 className="m-0 p-0 pt-1">Problem Trainer</h2>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item me-3">
                <Link to="/test" className="nav-link">
                  Test
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
