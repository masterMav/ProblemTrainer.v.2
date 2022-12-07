import { useEffect, useState } from "react";
import ProblemList from "./ProblemList";

const Dashboard = () => {
  const [list, setList] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const handle = "manav_kp";
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
    <div className="container">
      <h2 className="text-center">Dashboard</h2>
      {list && <ProblemList list={list} />}
      {error && <p className="badge bg-danger">{error}</p>}
      {loading && <p>Loading....</p>}
    </div>
  );
};

export default Dashboard;
