import React from "react";
import "./MyGallery.css";
import Header from "../Header/Header";

const MyGallery = () => {
  return (
    <div>
      <Header />
      <h1 style={{ color: "white", marginTop: "5rem" }}>MyGallery</h1>
      <div className="imageList__image"></div>
    </div>
  );
};

export default MyGallery;
