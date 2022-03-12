import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import {GiHamburgerMenu} from "react-icons/gi"
import {GrClose} from "react-icons/gr"


import "./Header.css";

const Header = () => {
  const [openHamburger,setOpenHamburger] = useState(false)
 // const [isMobileView, setIsMobileView] = useState(false)

  const handleToggle = () =>{
   setOpenHamburger(!openHamburger)
   //setIsMobileView(true)
  }


  return (
    <Fragment>
      <div className="wrap">
        <div>
        <Link to="/" id="logo">
          GALLERY
        </Link>
        </div>

        <div className={openHamburger ? "head active" : "head"}>
          <div className="navMenu">
          <Link to="/upload" className="links">
            Upload Image
          </Link>
          </div>
        <div className="navMenu">
        <Link to="/myGallery" className="links">
            MyGallery
          </Link>
        </div>  
        </div>
{openHamburger ? <GrClose className="hamburgerMenu" onClick={handleToggle}/> : <GiHamburgerMenu className="hamburgerMenu" onClick={handleToggle}/> }
      </div>
    </Fragment>
  );
};

export default Header;
