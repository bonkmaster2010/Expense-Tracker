import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Layout from "./Components/Layout"; 
import PageNotFound from "./Components/404";
const Dash = React.lazy(() => import("./Components/dashboard"))

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={ <React.Suspense fallback='Loading...'> <Dash /> </React.Suspense> } />
          <Route path="*" element={<PageNotFound/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
