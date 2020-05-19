import React from "react";
//import { Link } from "react-router-dom";
import "./ImageList.css";

const ImageList = (props) => {
  console.log(props);
  return (
    <div className="container">
      <div className="row">
        {props.images.map(({ id, largeImageURL, tags }) => {
          return (
            <div key={id} className="col-md-4" style={{ marginBottom: "2rem" }}>
              <div className="imageList__container">
                <img
                  className="imageList__image"
                  src={largeImageURL}
                  alt={tags}
                />
              </div>
              <div className="image__details">
                <button>View full image</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageList;
