import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./Context/Login-context";
import { LoginShowProvider } from "./Context/LoginShow-context";
import { DoneProvider } from "./Context/DoneContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DoneProvider>
      <LoginProvider>
        <LoginShowProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LoginShowProvider>
      </LoginProvider>
    </DoneProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
