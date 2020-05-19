import React from "react";

const ImageSearch = (props) => {
  // console.log(props.handleGetRequest);

  return (
    <div>
      <h1>Welcome to Pixy Gallery</h1>
      <form onSubmit={props.handleGetRequest}>
        <input
          type="text"
          autoComplete="off"
          name="searchValue"
          placeholder="Search for images..."
        />
        <button>Search</button>
      </form>
    </div>
  );
};

export default ImageSearch;
