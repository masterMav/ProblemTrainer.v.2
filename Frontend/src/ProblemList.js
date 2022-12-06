import { useEffect, useState } from "react";
import axios from "axios";

const ProblemList = ({ list }) => {
  const [finalList, setFinalList] = useState(list);
  const [listChanged, setListChanged] = useState(false);
  const [problemCode, setProblemCode] = useState("");
  const [error, setError] = useState("");
  const handle = "manav_kp";

  //Get user submission verdict's for saved problem's & keep updating every 30sec.
  //For that it compares all user subs & finalList
  useEffect(() => {
    const abortCont = new AbortController();
    //Checking for updates & processing verdict's
    const intervalID = setInterval(() => {
      fetch(`https://codeforces.com/api/user.status?handle=${handle}&lang=en`, {
        signal: abortCont.signal,
      })
        .then((res) => {
          if (!res.ok) throw Error("CF API ERROR");
          return res.json();
        })
        .then((data) => {
          console.log("fetched successfully");
          //mark all submitted problems
          const subMap = new Map();
          data.result.forEach((i) => {
            const str = `${i.problem.index}. ${i.problem.name}`;
            let prvsVerdict, newVerdict;
            if (subMap.get(str) === undefined) prvsVerdict = 0;
            else prvsVerdict = subMap.get(str);

            if (i.verdict === "OK") newVerdict = 2;
            else newVerdict = 1;

            subMap.set(str, Math.max(newVerdict, prvsVerdict));
          });

          //now compare them to saved problems
          let listWithVerdict = finalList.map((listItem) => {
            let updatedVerdict;
            if (subMap.get(listItem.problemName) === undefined)
              updatedVerdict = 0;
            else updatedVerdict = subMap.get(listItem.problemName);

            return {
              problemName: listItem.problemName,
              problemLink: listItem.problemLink,
              verdict: updatedVerdict,
            };
          });
          setFinalList(listWithVerdict);
        })
        .catch((err) => console.log(err.message));
    }, 5000);

    //stop interval on dismount & abort fetch.
    return () => {
      clearInterval(intervalID);
      abortCont.abort();
    };
  }, [listChanged]);

  // append to finalList & to update useEffect listChanged is used.
  const handleSubmit = (e) => {
    e.preventDefault();

    //Check problemCode format errors
    const codeArray = problemCode.split("_");
    if (codeArray.length !== 2 || codeArray[0] === "" || codeArray[1] === "") {
      setError("Please enter correct Problem Code.");
    } else {
      // Post data
      const postData = {
        handle: handle,
        contestId: codeArray[0],
        index: codeArray[1],
      };
      axios
        .post(`http://localhost:5000/api/add`, postData)
        .then((res) => {
          // Successfully added to userDB now update the finalList here.
          setFinalList((prvs) => [
            ...prvs,
            {
              problemName: res.data.problemName,
              problemLink: res.data.problemLink,
              verdict: 0,
            },
          ]);
          //Change listChanged state to render it here.
          setListChanged(!listChanged);
        })
        .catch((err) => setError(err.response.statusText));
    }
  };

  return (
    <div className="container">
      {/* INPUT FORM */}
      <form className="mt-5 problemLink-form" onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter ContestId_index of CF problem"
            required
            value={problemCode}
            onChange={(e) => {
              setProblemCode(e.target.value);
              setError("");
            }}
          />
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
          >
            Add
          </button>
        </div>
      </form>
      {error && <p className="badge bg-danger">{error}</p>}
      {/* LIST */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Problem Name</th>
            <th scope="col">Verdict</th>
          </tr>
        </thead>
        <tbody>
          {finalList.map((qn, counter) => (
            <tr key={qn.problemName} className={"trow-" + qn.verdict}>
              <th scope="row">{1 + counter}</th>
              <td>{qn.problemName}</td>
              {qn.verdict === 0 && <td>NA</td>}
              {qn.verdict === 1 && <td>WA</td>}
              {qn.verdict === 2 && <td>AC</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemList;
