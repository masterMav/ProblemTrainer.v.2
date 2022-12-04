import { useEffect, useState } from "react";

const Test = () => {
  const [tmp, setTmp] = useState("");

  let intervalID;
  useEffect(() => {
    async function init() {
      await setTimeout(() => setTmp(0), 1000);

      intervalID = setInterval(() => {
        console.log("Every 2 sec.");
        setTmp((prvsTmp) => prvsTmp + 1);
      }, 2000);
    }
    init();

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="container">
      <h2>Testing</h2>
      <p>{tmp}</p>
    </div>
  );
};

export default Test;
