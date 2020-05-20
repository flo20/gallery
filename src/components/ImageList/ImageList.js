import React from "react";
import { Link } from "react-router-dom";
import "./ImageList.css";

const ImageList = (props) => {
  console.log(props);
  return (
    <div className="container">
      <div className="row">
        {props.images.map((image) => {
          return (
            <div
              key={image.id}
              className="col-md-4"
              style={{ marginBottom: "2rem" }}
            >
              <div className="imageList__container">
                <img
                  className="imageList__image"
                  src={image.largeImageURL}
                  alt={image.tags}
                />
              </div>
              <div className="image__details">
                <Link
                  to={{
                    pathname: `/image/${image.id}`,
                    state: { image: image },
                  }}
                >
                  <button>View full image</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageList;
