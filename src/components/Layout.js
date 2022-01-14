import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Spinner from "./Spinner";

export default function Layout(props) {
  return (
    <div>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <div className="content">{props.children}</div>
        </>
      )}
    </div>
  );
}
