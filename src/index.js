import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

ReactDOM.render(<App />, document.getElementById("root"));

// HMP (Hot Module Remplacement)
if (module.hot) module.hot.accept();
