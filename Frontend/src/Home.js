import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
const Home = () => {
  document.body.style.backgroundColor = "#282c34";
  document.body.classList.add("d-flex");
  const [handle, setHandle] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`https://codeforces.com/api/user.info?handles=${handle}`)
      .then((data) =>
        history.push({
          pathname: "/dashboard",
          state: data.data.result[0].handle,
        })
      )
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx i.e wrong handle
          setError(error.response.data.comment);
        } else if (error.request) {
          // The request was made but no response was received i.e CF API error.
          setError("CF API ERROR: Please try again after sometime.");
        } else {
          // Something happened in setting up the request that triggered an Error
          setError("Request Error");
        }
      });
  };

  return (
    <div className="d-flex myHeading flex-column">
      <nav className="navbar navbar-expand-sm navbar-dark mb-auto">
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
                    pathname: "https://github.com/masterMav/ProblemTrainer.v.2",
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
      <main className="px-3 text-white text-center mb-5 pb-5">
        <h1 className="fw-bold mb-2">Solve Better</h1>
        <p className="lead">
          Simply paste the Problem Code of the problem you want to solve. The
          Problem Verdict's will be updated automatically using the{" "}
          <span className="text-warning">Codeforces API</span>. All rows in the
          list will redirect to that particular problem for{" "}
          <span className="text-warning">direct access</span> from the list
          itself.
        </p>
        <form className="d-flex headForm" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            type="text"
            required
            placeholder="Your codeforces handle"
            value={handle}
            onChange={(e) => {
              setHandle(e.target.value);
              setError("");
            }}
          />
          <button className="btn btn-outline-info btn-md fw-bold" type="submit">
            Login
          </button>
        </form>
        {error && <p className="mt-4 badge bg-danger">{error}</p>}
      </main>

      <div className="text-center text-muted mt-auto">
        <p>Copyright &copy;2022 Mav </p>
      </div>
    </div>
  );
};

export default Home;
