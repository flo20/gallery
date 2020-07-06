import React from "react";
import "./ImageSearch.css";
import Header from "../Header/Header";
import ImageBackground from "../ImageBackground/ImageBackground";

const ImageSearch = ({ handleGetRequest }) => {
  // console.log(props.handleGetRequest);

  return (
    <div>
      <Header />
      <ImageBackground />
      <h1 className="heading">GALLERY</h1>
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
  );
};

export default ImageSearch;
