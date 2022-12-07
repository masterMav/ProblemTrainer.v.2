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
          const listWithVerdict = finalList.map((listItem) => {
            let updatedVerdict;
            if (subMap.get(listItem.problemName) === undefined)
              updatedVerdict = 0;
            else updatedVerdict = subMap.get(listItem.problemName);

            return {
              _id: listItem._id,
              problemName: listItem.problemName,
              problemLink: listItem.problemLink,
              verdict: updatedVerdict,
            };
          });
          setFinalList(listWithVerdict);
        })
        .catch((err) => console.log(err.message));
    }, 30000);

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
              _id: res.data._id,
              problemName: res.data.problemName,
              problemLink: res.data.problemLink,
              verdict: 0,
            },
          ]);
          //Change listChanged state to update useEffect as well.
          setListChanged(!listChanged);
        })
        .catch((err) => setError(err.response.statusText));
    }
  };

  //DELETE FROM userDB & update finalList here.
  const deleteClick = (_id) => {
    axios
      .delete(`http://localhost:5000/api/delete/${_id}`)
      .then((res) => {
        // Successfully removed from userDB now update the finalList here.
        const updatedList = finalList.filter((listItem) => {
          return listItem._id !== _id;
        });

        setFinalList(updatedList);
        //Change listChanged state to update useEffect as well.
        setListChanged(!listChanged);
      })
      .catch((err) => setError(err.response.statusText));
  };

  // Table row will redirect to problemLink by this function
  const gotoProblemLink = (problemLink) => {
    window.open(problemLink, "_blank");
  };

  return (
    <div className="nothing">
      {/* Black BG */}
      <div className="bg-dark text-secondary p-4 text-center">
        <div className="pb-5">
          <h5 className="display-6 fw-bold text-white">Welcome {handle}</h5>
          <p className="fs-5">
            Simply paste the Problem Code which is made by the contestID (Eg:
            1760, 80, etc.) & Problem Index (Eg: A, B, D1).
            <br />
            Use this format contestID_problemIndex.
          </p>
          <form
            className="col-lg-6 mx-auto problemCodeForm"
            onSubmit={handleSubmit}
          >
            <input
              className="form-control mb-3"
              placeholder="Eg: 1760_A"
              type="text"
              required
              value={problemCode}
              onChange={(e) => {
                setProblemCode(e.target.value);
                setError("");
              }}
            />
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button
                className="btn btn-outline-info btn-md px-4 me-sm-3 fw-bold"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          {error && <p className="mt-4 badge bg-danger">{error}</p>}
        </div>
      </div>
      {/* LIST */}
      <table className="mt-5 table text-center myTable shadow">
        <thead>
          <tr>
            <th scope="col" width="5%">
              #
            </th>
            <th scope="col" width="80%">
              Problem Name
            </th>
            <th scope="col" width="7%">
              Verdict
            </th>
            <th scope="col" width="8%"></th>
          </tr>
        </thead>
        <tbody>
          {finalList.map((qn, counter) => (
            <tr key={qn._id} className={"trow-" + qn.verdict}>
              <th scope="row" onClick={() => gotoProblemLink(qn.problemLink)}>
                {1 + counter}
              </th>
              <td onClick={() => gotoProblemLink(qn.problemLink)}>
                {qn.problemName}
              </td>
              {qn.verdict === 0 && (
                <td onClick={() => gotoProblemLink(qn.problemLink)}>NA</td>
              )}
              {qn.verdict === 1 && (
                <td onClick={() => gotoProblemLink(qn.problemLink)}>WA</td>
              )}
              {qn.verdict === 2 && (
                <td onClick={() => gotoProblemLink(qn.problemLink)}>AC</td>
              )}
              <td onClick={() => deleteClick(qn._id)}>
                <i className="bi-x-lg"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemList;
