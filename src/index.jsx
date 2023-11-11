import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import ToDoProvider from "./context/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToDoProvider>
      <App />
    </ToDoProvider>
  </React.StrictMode>
);
