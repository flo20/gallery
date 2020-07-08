import React from "react";
import "./ImageDisplay.css";

const ImageDisplay = (props) => {
  return (
    <div>
      <div className="display_cont">
        <img src={props.image} alt="upload_img" className="display_size" />
        <div className="details">
          Name: <span />
          {props.name}
        </div>
        <div className="details">Tags: {props.tags}</div>
      </div>
    </div>
  );
};

export default ImageDisplay;
