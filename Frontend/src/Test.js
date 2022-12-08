import { Link } from "react-router-dom";

const Test = () => {
  document.body.style.backgroundColor = "#282c34";
  return (
    <div className="myHeading">
      <nav className="navbar navbar-expand-sm navbar-dark">
        <div className="container-fluid">
          <span className="navbar-brand text-white">
            <h2>Problem Trainer</h2>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item me-3">
                <Link
                  className="nav-link active text-white h6 mt-md-2"
                  to={{
                    pathname: "https://github.com/masterMav/ProblemTrainer",
                  }}
                  target="_blank"
                >
                  <i className="bi-github me-2" />
                  Github
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link
                  className="nav-link active text-white h6 mt-md-2"
                  to={{
                    pathname: "https://codeforces.com/profile/manav_kp",
                  }}
                  target="_blank"
                >
                  <i className="bi-code-slash me-2" />
                  <span className="text-warning">code</span>
                  forces
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Test;
