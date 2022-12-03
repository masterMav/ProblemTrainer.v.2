import { useEffect, useState } from "react";

function App() {
  const [backData, setBackData] = useState("");

  const handleClick = () => {
    fetch("http://localhost:5000/test")
      .then((res) => {
        if (!res.ok) throw Error("not ok");
        return res.json();
      })
      .then((data) => setBackData(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="nothing">
      <h1>Reacted page</h1>
      <button onClick={handleClick}>Button</button>
      {backData ? (
        <div>
          {backData.map((i) => (
            <p key={i.name}>
              {i.name}'s age is {i.age}
            </p>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;
