import "./App.css";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [res, setRes] = useState("");
  const but = () => {
    let local = "127.0.0.1:8000/api/v1/tours";
    axios
      .get("http://127.0.0.1:8000/api/v1/tours")
      .then((response) => {
        setRes(response.data);
        console.log(res);
      })
      .catch((err) => {
        console.log("reeeedy");
      });
  };

  return (
    <div className="App">
      <button onClick={but}>click</button>
      {/* <h2>{res ? res : "hello"}</h2> */}
    </div>
  );
};

export default App;
