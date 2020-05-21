import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
//import { Redirect } from "react-router-dom";

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

  //event handler
  const changeValueHandler = (e) => {
    setNewImage({
      ...newImage,
      [e.target.name]: e.target.value,
    });
  };

  const addImageHandler = (event) => {
    event.preventDefault();

    axios
      .post("https://jsonplaceholder.typicode.com/photos", newImage)
      .then((response) => {
        console.log(response.data);
      });
  };
  return (
    <div>
      <form style={styles}>
        <h4 style={titleStyles}>Upload Your Images </h4>
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

        <Link to="/myGallery">
          <Button
            type="submit"
            onClick={addImageHandler}
            style={{
              borderRadius: "5px",
            }}
          >
            Upload
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default ImageUpload;
