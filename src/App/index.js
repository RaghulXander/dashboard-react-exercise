import React, { useState, lazy, Suspense } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

const Dashboard = lazy(() => import("../Pages/Dashboard"));
const Movie = lazy(() => import("../Pages/Movie"));

import "./style.css";
import Loader from "../Components/Loader/index";

const App = () => {
  return (
    <Router>
      <div className="appContainer">
        <Suspense fallback={<Loader />}>
          <main className="pageContainer">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/movie" element={<Movie />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </main>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
