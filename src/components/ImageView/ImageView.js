import React from "react";

import { Link } from "react-router-dom";

import "./ImageView.css";

const ImageView = (props) => {
  //console.log(props.location.state.image);
  const {
    largeImageURL: image,
    user: owner,
    tags,
    pageURL,
  } = props.location.state.image;
  return (
    <div className="container">
      <Link
        to="/"
        style={{
          textDecoration: "none",
          border: "none",
          fontFamily: "Raleway",
          color: "rgb(252, 127, 105)",
        }}
      >
        Back to search
      </Link>
      <div className="row">
        <div className="col-sm-12">
          <div className="imageView__container">
            <img
              src={image}
              alt={tags}
              className="imageView__img img-responsive"
            />
            {/* <div className="imageView__copyright"></div> */}

            <p className="owner">
              Credit : <span>{owner}</span>
            </p>

            <p className="download">
              <span>
                <a target="_blank" href={pageURL}>
                  Download Image
                </a>
              </span>
            </p>
            <div className="home_btn"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageView;
