import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style.scss";

// Strict Mode will fire the useEffect twice. To test whether it works properly, remove StrictMode elements.
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
