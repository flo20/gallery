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
      <div className="row">
        <div className="col-sm-12">
          <div className="imageView__container">
            <img
              src={image}
              alt={tags}
              className="imageView__img img-responsive"
            />
            {/* <div className="imageView__copyright"></div> */}

            <p>
              Credit : <span>{owner}</span>
            </p>

            <p>
              <span>
                <a target="_blank" href={pageURL}>
                  Download
                </a>
              </span>
            </p>
            <div className="home_btn">
              <button
                style={{
                  color: "#04264b",
                  borderRadius: "5px",
                }}
              >
                <Link to="/" style={{ textDecoration: "none", border: "none" }}>
                  Back to Home Page
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageView;
