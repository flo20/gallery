import React from "react";
import Header from "../Header/Header";
import ImageDisplay from "../ImageDisplay/ImageDisplay";
import ImageFetched from "../ImageFetched/ImageFetched";

const ResultDisplayed = () => {
  return (
    <div>
      <Header />
      <h1 style={{ color: "black", marginTop: "5rem" }}>MyGallery</h1>
      <ImageDisplay />
      <ImageFetched />
    </div>
  );
};

export default ResultDisplayed;
