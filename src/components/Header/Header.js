import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar bg="light" variant="light" fixed="top">
        <Nav className="mr-auto">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              paddingTop: "6px",
              padding: "1rem",
              color: "rgb(27, 27, 27)",
            }}
          >
            Home
          </Link>
          <Link
            to="/newsletter"
            style={{
              textDecoration: "none",
              paddingTop: "6px",
              padding: "1rem",
              color: "rgb(27, 27, 27)",
            }}
          >
            Upload Image
          </Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
