import React from "react";
import "./ImageSearch.css";
import Nature from "../Video/nature.mp4";
import Header from "../Header/Header";

const ImageSearch = ({ handleGetRequest }) => {
  // console.log(props.handleGetRequest);

  return (
    <div className="back_cont">
      <Header />
      <div>
        <video autoPlay loop>
          <source src={Nature} type="video/mp4" />
        </video>
      </div>

      <h1 className="heading">GALLERY</h1>

      <p>Browse through amazing images</p>
      <div className="imageSearch">
        <form onSubmit={handleGetRequest} className="imageSearch__form">
          <input
            type="text"
            autoComplete="off"
            name="searchValue"
            placeholder="Search for images..."
          />
          <button>Search</button>
        </form>
      </div>
    </div>
  );
};

export default ImageSearch;
