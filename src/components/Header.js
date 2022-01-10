import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary  ">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-white" to="/">
            Neelus
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse  " id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto ">
              <Link
                className="nav-link active text-white"
                aria-current="page"
                to="/"
              >
                users
              </Link>
              <Link className="nav-link text-white" to="/">
                orders
              </Link>
              <Link className="nav-link text-white" to="/">
                logout
              </Link>
              <Link className="nav-link text-white" to="/">
                cart
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
