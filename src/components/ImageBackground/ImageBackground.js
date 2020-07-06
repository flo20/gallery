import React from "react";
import Nature from "../Video/nature.mp4";
import "./ImageBackground.css";

const ImageBackground = () => {
  return (
    <div>
      <div className="back_cont"></div>
      <video autoPlay loop>
        <source src={Nature} type="video/mp4" />
      </video>
    </div>
  );
};

export default ImageBackground;
