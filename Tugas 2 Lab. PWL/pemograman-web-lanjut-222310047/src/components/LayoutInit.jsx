import React, { Children } from 'react'
import Headers from "./Headers";
import Footers from "./Footers";

export default function LayoutInit({ children }) {
  return (
    <div>
      <Headers/>

        <section className="container">
            {children}
        </section>

      <Footers/>
    </div>
  )
}
