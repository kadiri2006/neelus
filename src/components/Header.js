import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { FaUser } from "react-icons/fa";

export default function Header() {
  let reduxState = useSelector((state) => state.cartReducer.cartItems);
  const logout = () => {
    localStorage.removeItem("verifiedUser");
  };

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
                <FaUser />
                {JSON.parse(localStorage.getItem("verifiedUser")).email ??
                  "TestUser"}
              </Link>
              <Link className="nav-link text-white" to="/orders">
                orders
              </Link>
              <Link
                className="nav-link text-white"
                to="/login"
                onClick={logout}
              >
                logout
              </Link>
              <Link className="nav-link text-white" to="/cart">
                <TiShoppingCart /> {reduxState.length}
              </Link>
              {JSON.parse(localStorage.getItem("verifiedUser")).uid ===
                "nIViJDa2lQQIVF2KNEkkW0yUI4I2" && (
                <Link className="nav-link text-white" to="/admin">
                  Admin
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
