import React from "react";
import Header from "../Header/Header";
import ImageFetched from "../ImageFetched/ImageFetched";
import "./ResultDisplayed.css";

const ResultDisplayed = () => {
  return (
    <div>
      <Header />
      <h1 id="heads">
        Compile your images for later... <br />
      </h1>
      <ImageFetched />
    </div>
  );
};

export default ResultDisplayed;
