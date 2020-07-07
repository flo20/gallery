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
        <h1 className="heading">Explore your imaginations.</h1>
        <p>Browse through amazing images</p>
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
      </div>
    </div>
  );
};

export default ImageSearch;
