import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
//import { Link } from "react-router-dom";
//import axios from "axios";
import axios from "../../axios-gallery";
//import Spinner from "../Spinner/Spinner";

const ImageUpload = (e) => {
  //styling form
  const styles = {
    marginLeft: "47rem",
    color: "#c4e1ff",
    paddingTop: "2rem",
    marginRight: "30rem",
  };
  const titleStyles = {
    paddingTop: "5rem",
    textAlign: "center",
    color: "#c4e1ff",
    paddingRight: "13rem",
    paddingBottom: "2rem",
  };

  const inputStyle = {
    borderRadius: "5px",
    border: "none",
    padding: "1rem",
    display: "block",
  };

  //input for data
  const [newImage, setNewImage] = useState({
    owner: "",
    image: "",
    tags: "",
  });

  useEffect(() => {
    axios
      .get("https://react-my-gallery.firebaseio.com/gallery.json")
      .then((response) => {
        setNewImage({ newImage: response.data });
      });
  }, []);

  //event handler
  const changeValueHandler = (e) => {
    setNewImage({
      ...newImage,
      [e.target.name]: e.target.value,
    });
    return null;
  };

  const addImageHandler = (event) => {
    event.preventDefault();

    axios
      .post("/gallery.json", newImage)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <form style={styles}>
        <h4 style={titleStyles}>Upload Images </h4>
        <div className="form-group">
          <label htmlFor="owner">Name</label>
          <input
            style={inputStyle}
            type="text"
            name="owner"
            placeholder="Enter name"
            onChange={changeValueHandler}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image link</label>
          <input
            style={inputStyle}
            type="text"
            name="image"
            placeholder="Image url"
            onChange={changeValueHandler}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            style={inputStyle}
            type="text"
            name="tags"
            placeholder="e.g,cat,dog"
            onChange={changeValueHandler}
          />
        </div>

        {/* <Link to="/myGallery"> */}
        <Button type="submit" onClick={addImageHandler}>
          Upload
        </Button>
        {/* </Link> */}
      </form>
    </div>
  );
};

export default ImageUpload;
