import React from "react";
import "./ImageDisplay.css";

const ImageDisplay = (props) => {
  //displaying data on myGallery screen

  // const displayDetailsHandler = () => {
  //   alert("Hi");
  // };

  return (
    <div className="contain">
      <div className="display_cont">
        {/* <div onClick={displayDetailsHandler}></div> */}
        <img src={props.image} alt="upload_img" className="display_size" />
        <div className="details">Name:{props.name}</div>
        <div className="details">Tags:{props.tags}</div>
      </div>
    </div>
  );
};

export default ImageDisplay;
