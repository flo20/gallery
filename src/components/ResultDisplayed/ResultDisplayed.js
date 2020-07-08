import React from "react";
import Header from "../Header/Header";
import ImageFetched from "../ImageFetched/ImageFetched";
import "./ResultDisplayed.css";
import { Link } from "react-router-dom";

const ResultDisplayed = () => {
  return (
    <div>
      <Header />
      <div className="backs">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            border: "none",
            fontFamily: "Raleway",
            color: "rgb(252, 127, 105)",
          }}
        >
          Back to upload
        </Link>
      </div>
      <h1 id="heads">
        Compile your images for later... <br />
      </h1>
      <ImageFetched />
    </div>
  );
};

export default ResultDisplayed;
