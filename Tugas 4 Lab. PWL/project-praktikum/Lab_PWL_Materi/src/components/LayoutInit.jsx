import React from "react";
import Headers from "./Headers";
import Footers from "./Footers";

export default function LayoutInit({ children }) {
  return (
    <div style={{ height: "100vh" }}>
      <Headers />

      <section className="container">{children}</section>

      <Footers />
    </div>
  );
}
