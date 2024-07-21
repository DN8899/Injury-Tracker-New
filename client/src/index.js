import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import "./styles/index.css";
import "./styles/InjuryHistory.css";
import App from "./views/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CompletedInjury from "./views/CompletedInjury";
import UpdateInjury from "./views/UpdateInjury";
import InjuryHistory from "./views/InjuryHistory";
import LoginFile from "./components/LoginForm/LoginFile";
import RegisterFile from "./components/RegisterForm/RegisterFile";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/completed-injury",
    element: <CompletedInjury />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/injury-history",
    element: <InjuryHistory />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/update-injury",
    element: <UpdateInjury />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/login",
    element: <LoginFile />,
    errorElement: <div>404 Not Found</div>,
  },

  {
    path: "/register",
    element: <RegisterFile />,
    errorElement: <div>404 Not Found</div>,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
