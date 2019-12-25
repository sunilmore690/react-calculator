import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Calculator from "./components/Calculator";
function App() {
  return (
    <div className="App container">
      <Calculator />
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
