import React, { lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Fertilizer from "../components/Fertilizer/Fertilizer";
import Crop from "../components/Crop/Crop";
import Disease from "../components/Disease/Disease";

function MainRouter() {
  return (
    <Router>
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path={`/fertilizer`} element={<Fertilizer />}></Route>
          <Route path={`/crop`} element={<Crop />}></Route>
          <Route path={`/disease`} element={<Disease />}></Route>
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default MainRouter;
