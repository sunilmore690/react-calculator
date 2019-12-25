import React, { useState } from "react";
import store from "../store";
let actions = ["+", "-", "X", "/", "CL"];
const { dispatch } = store;
function MyButton(props) {
  return (
    <button
      onClick={e => props.handleClick(props.value)}
      className={"my-button " + (props.className || "")}
      style={{
        backgroundColor: props.type === "action" ? "goldenrod" : "white"
      }}
    >
      {props.value}
    </button>
  );
}
function Calculator() {
  let array = new Array(9);
  let [number, setNumber] = useState("");
  let [result, setResult] = useState("");
  let [history, setHistory] = useState([]);
  store.subscribe(() => {
    setResult(store.getState().result);
    setHistory(store.getState().history);
  });
  function handleNumberClick(value) {
    console.log("handleNumberClick", number + value + "");
    if (number) {
      console.log("number", number);
      dispatch({ type: "POPHISTORY" });
    }
    dispatch({ type: "ADDHISTORY", payload: number + value + "" });
    if (number + value + "") {
      dispatch({ type: "=" });
    }
    setNumber(number + value + "");
  }
  function handleActionClick(action) {
    if (action === "=") {
      dispatch({ type: action, payload: true });
    } else if (action === "CL") {
      dispatch({ type: "CL" });
    } else {
      dispatch({ type: "ADDHISTORY", payload: action });
    }
    setNumber("");
  }
  return (
    <div>
      <div className="display">
        <div className="result">{result}</div>
        <div className="history">
          {history.map(a => (
            <span>{a}</span>
          ))}
        </div>
      </div>
      <div className="main">
        <div className="number-section">
          {array.fill(null).map((value, index) => {
            if ((index + 1) % 3 === 0) {
              return (
                <>
                  <MyButton
                    type="number"
                    value={index + 1 + ""}
                    key={index + "number"}
                    handleClick={handleNumberClick}
                  />
                  <br />
                </>
              );
            }
            return (
              <MyButton
                type="number"
                value={index + 1 + ""}
                key={index + "number"}
                handleClick={handleNumberClick}
              />
            );
          })}
          <MyButton
            className="x"
            type="number"
            value={0}
            handleClick={handleNumberClick}
          />
          <MyButton type="number" value={"."} handleClick={handleNumberClick} />
          <br />
          <MyButton
            type="action"
            className="xy"
            value={"="}
            handleClick={handleActionClick}
          />
        </div>
        <div className="action-section">
          {actions.map(action => (
            <MyButton
              className="col-sm-4"
              type="action"
              value={action}
              key={action}
              handleClick={handleActionClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
