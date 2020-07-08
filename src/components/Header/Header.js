import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="wrap">
        <Link to="/" id="logo">
          GALLERY
        </Link>
        <div className="head">
          <Link to="/upload" id="links">
            Upload Image
          </Link>
          <Link to="/myGallery" id="links">
            MyGallery
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
