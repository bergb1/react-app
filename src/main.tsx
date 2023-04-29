import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// Global Bootstrap CSS import
import 'bootstrap/dist/css/bootstrap.css';

// Root Interface
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.Fragment>
    <App />
  </React.Fragment>
);
