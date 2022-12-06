import { useState } from "react";

const Test = () => {
  const [tmp, setTmp] = useState([
    { k1: "v1", k2: "v2" },
    { k1: "v3", k2: "v4" },
  ]);

  const handleClick = () => {
    setTmp((tmp) => [...tmp, { k1: "v5", k2: "v6" }]);
  };

  return (
    <div className="container">
      <h2>Testing</h2>
      <button onClick={handleClick}>Button</button>
      {tmp.map((i) => (
        <div key={i.k1}>
          {i.k1} & {i.k2}
        </div>
      ))}
    </div>
  );
};

export default Test;
