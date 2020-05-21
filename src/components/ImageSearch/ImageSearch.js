import React from "react";
import "./ImageSearch.css";

const ImageSearch = ({ handleGetRequest }) => {
  // console.log(props.handleGetRequest);

  return (
    <div>
      <h1 className="heading">GALLERY</h1>
      <p>Browse through amazing images</p>
      <div className="imageSearch">
        {/* <h1>Welcome to Pixy Gallery</h1> */}
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
