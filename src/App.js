import React, { useState, useEffect } from "react";
import FlameGraph from "./AutoSizedFlameGraph";

export default function App() {
  const [flameGraph, setFlameGraph] = useState(false);
  const [content, setContent] = useState([]);
  const id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  setTimeout(() => {
    setFlameGraph(true);
  }, 5000);

  useEffect(() => {
    fetch(`https://5fc05dcefd14be0016749acf.mockapi.io/v1/rum/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("result", res);
        let result = [];
        Object.keys(res).map((el) => {
          if (res[el] && res[el].data) {
            result.push(res[el]);
          }
        });
        console.log("result", result);
        setContent(result);
      });
  }, content.length);
  const Loading = () => (
    <h2>Profiler started, generating flame graph data...</h2>
  );

  return (
    <div className="App">
      {flameGraph ? <FlameGraph flamegraphs={content} /> : <Loading />}
      <style jsx global>
        {`
          body {
            margin: 0;
            font-family: sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background-color: lightgrey;
            font-weight: lighter;
          }
          h2 {
            padding: 20px;
            color: coral;
          }
          .App {
            max-width: 1200px;
            margin: auto;
          }
          .Tooltip {
            position: absolute;
            z-index: 3;
            background-color: #000;
            color: #fff;
            padding: 0.5rem;
            font-size: 13px;
          }
        `}
      </style>
    </div>
  );
}
