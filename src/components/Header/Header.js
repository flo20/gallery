import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  // const styles = {
  //   textDecoration: "none",
  //   paddingTop: "6px",
  //   padding: "1rem",
  //   color: "rgb(27, 27, 27)",
  // };
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/upload">Upload Image</Link>
        <Link to="/myGallery">MyGallery</Link>
      </div>
    </>
  );
};

export default Header;
