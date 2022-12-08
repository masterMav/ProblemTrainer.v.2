import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark m-0 p-0">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <h2 className="m-0 p-0 pt-1">Problem Trainer</h2>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
