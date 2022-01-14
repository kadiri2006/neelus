import React from "react";
import "../stylesheets/product.css";
import "../stylesheets/layout.css";

export default function Spinner() {
  return (
    <div className="loader">
      <div className="spinner-border text-primary" role="status"></div>
      <div className="spinner-border text-secondary" role="status"></div>
      <div className="spinner-border text-success" role="status"></div>
      <div className="spinner-border text-danger" role="status"></div>
      <div className="spinner-border text-warning" role="status"></div>
      <div className="spinner-border text-info" role="status"></div>

      <div className="spinner-border text-dark" role="status"></div>
    </div>
  );
}
