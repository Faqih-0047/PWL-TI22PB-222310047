import React from "react";
import { BrowserRouter } from "react-router-dom";
import LayoutInit from "./components/LayoutInit";
import BaseRoute from "./apps/BaseRoute";

function App() {
  return (
    <BrowserRouter>
      <LayoutInit>
        <BaseRoute />
      </LayoutInit>
    </BrowserRouter>
  );
}

export default App;
