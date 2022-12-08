import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
const Home = () => {
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
          state: handle,
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
    <div className="nothing">
      <h2 className="text-center">This is HomePage.</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          value={handle}
          onChange={(e) => {
            setHandle(e.target.value);
            setError("");
          }}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="mt-4 badge bg-danger">{error}</p>}
    </div>
  );
};

export default Home;
