import React from "react";
//import { Link } from "react-router-dom";
//import axios from "axios";
import "./ImageUpload.css";
import results from "../../axios-gallery";
import Header from "../Header/Header";
//import Spinner from "../Spinner/Spinner";

class ImageUpload extends React.Component {
  //initial input state for data
  state = {
    name: "",
    image: "",
    tags: "",
  };

  postDataHandler = (event) => {
    event.preventDefault();
    const data = {
      name: this.state.name,
      image: this.state.image,
      tags: this.state.tags,
    };
    results.post("./gallery.json", data).then((response) => {
      console.log(response);
    });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="upload_wrap">
          <form onSubmit={this.postDataHandler} className="ui_form">
            <div>
              <label>Name </label>
              <input
                type="text"
                placeholder="Enter name"
                className="insert"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <div>
              <label>Image link </label>
              <input
                type="text"
                placeholder="Image url"
                className="insert"
                value={this.state.image}
                onChange={(e) => this.setState({ image: e.target.value })}
              />
            </div>
            <div>
              <label>Tags </label>
              <input
                type="text"
                placeholder="cats,nature,etc"
                className="insert"
                value={this.state.tags}
                onChange={(e) => this.setState({ tags: e.target.value })}
              />
            </div>

            <button type="submit" className="btn">
              Upload
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ImageUpload;
