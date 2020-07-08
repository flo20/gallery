import React from "react";
import "./ImageSearch.css";
import Header from "../Header/Header";
import ImageBackground from "../ImageBackground/ImageBackground";
const ImageSearch = ({ handleGetRequest }) => {
  // console.log(props.handleGetRequest);

  return (
    <div>
      <div>
        <Header />
        <ImageBackground />
        <h1 className="heading">Explore your imagination.</h1>
        <p>Browse through amazing images captured for you</p>
        <div className="imageSearch">
          <form onSubmit={handleGetRequest} className="imageSearch__form">
            <input
              type="text"
              autoComplete="off"
              name="searchValue"
              placeholder="Search for photos..."
            />
            <button>Search</button>
          </form>
        </div>
        <div className="capture">
          Home to millions of photo lovers.
          <br />
          Over 1.8 million+ high quality stock images shared by our talented
          community.
        </div>
      </div>
    </div>
  );
};

export default ImageSearch;
