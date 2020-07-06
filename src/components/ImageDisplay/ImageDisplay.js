import React from "react";
import "./ImageDisplay.css";

const ImageDisplay = (props) => {
  //displaying data on myGallery screen
  return (
    <div>
      <div className="display_cont">
        <img src={props.image} alt="uploaded_img" className="display_size" />
        Name:{props.name}
        <br />
        Tags:{props.tags}
      </div>
    </div>
  );
};

export default ImageDisplay;
