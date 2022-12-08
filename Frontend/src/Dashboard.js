import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProblemList from "./ProblemList";

const Dashboard = () => {
  const [list, setList] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const handle = location.state;
  const url = `http://localhost:5000/api/userlist/${handle}`;

  //Get's Raw List without verdict's from DB
  const abortCont = new AbortController();
  const loadList = () => {
    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        // Invalid input
        if (!res.ok) throw Error("Database invoked error.");
        return res.json();
      })
      .then((data) => {
        // Create Problem list
        let newList = data.map((i) => {
          return {
            _id: i._id,
            problemName: i.problemName,
            problemLink: i.problemLink,
            verdict: 0,
          };
        });

        setList(newList);
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        setList("");
        setError(err.message);
        setLoading(false);
      });
  };

  //Get problem's saved by user without verdict's from DB
  useEffect(() => {
    loadList();
    return () => abortCont.abort();
  }, []);

  return (
    <div className="nothing">
      {list && <ProblemList list={list} handle={handle} />}
      {error && <p className="badge bg-danger">{error}</p>}
      {loading && <p>Loading....</p>}
    </div>
  );
};

export default Dashboard;
