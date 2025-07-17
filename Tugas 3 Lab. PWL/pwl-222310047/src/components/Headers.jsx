import React from "react";
import { NavLink } from "react-router-dom";

export default function Headers() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to={"/"}>
          PWL | Web-Chat
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to={"/"}>
                Chapter-One
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"chapter-two"}>
                Chapter-Two
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"login"}>
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
