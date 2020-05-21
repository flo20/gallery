import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const styles = {
    textDecoration: "none",
    paddingTop: "6px",
    padding: "1rem",
    color: "rgb(27, 27, 27)",
  };
  return (
    <>
      <Navbar bg="light" variant="light" fixed="top">
        <Nav className="mr-auto">
          <Link to="/" style={styles}>
            Home
          </Link>
          <Link to="/upload" style={styles}>
            Upload Image
          </Link>
          <Link to="/myGallery" style={styles}>
            MyGallery
          </Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
