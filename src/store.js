import { createStore } from "redux";
/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
function performAction(history, action) {
  let index = history.indexOf(action);
  let operand1 = history[index - 1];
  let operand2 = history[index + 1];
  let result = 0;
  switch (action) {
    case "+":
      result = parseFloat(operand1) + parseFloat(operand2, 10);
      break;
    case "-":
      result = parseFloat(operand1, 10) - parseFloat(operand2, 10);
      break;
    case "X":
      result = parseFloat(operand1, 10) * parseFloat(operand2, 10);
      break;
    case "/":
      result = parseFloat(operand1, 10) / parseFloat(operand2, 10);
      break;
    default:
  }
  history.splice(index - 1, 3, result);
}
function calculate(stathistory) {
  let history = [...stathistory];

  ["X", "/", "+", "-"].forEach(function(action) {
    while (history.includes(action)) {
      performAction(history, action);
    }
  });
  return history[0];
}
const initailState = {
  history: [],
  result: 0
};
function calcReducer(state = initailState, action) {
  switch (action.type) {
    case "POPHISTORY":
      console.log("pophistory");
      let myhistory = [...state.history];
      myhistory.pop();
      return { result: state.result, history: myhistory };
    case "ADDHISTORY":
      return {
        result: state.result,
        history: [...state.history, action.payload]
      };
    case "CL":
      return { result: 0, history: [] };
    case "=":
      let result = calculate(state.history);
      return { result, history: action.payload ? [result] : state.history };
    case "SET":
      return action.payload;
    default:
      return state;
  }
}
let store = createStore(
  calcReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.
export default store;
