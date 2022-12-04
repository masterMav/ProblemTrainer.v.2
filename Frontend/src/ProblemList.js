import { useEffect, useState } from "react";

const ProblemList = ({ list }) => {
  const [finalList, setFinalList] = useState(list);
  const handle = "manav_kp";

  //Get user submission verdict's for saved problem's & keep updating every 10sec.
  useEffect(() => {
    //Checking for updates & processing verdict's
    const intervalID = setInterval(() => {
      fetch(`https://codeforces.com/api/user.status?handle=${handle}&lang=en`)
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
          let listWithVerdict = list.map((listItem) => {
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
    }, 10000);

    //stop interval on dismount
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="container">
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
            <tr key={qn.problemName}>
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
