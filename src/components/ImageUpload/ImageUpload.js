import React from "react";
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

  //display message
  onButtonClickHandler = () => {
    window.alert("Your image has been saved in MyGallery.");
  };

  render() {
    return (
      <div>
        <Header />

        <div className="texts">
          <img src="mail.png" alt="icon" className="ico" />

          <div>
            <h1 className="heads">
              Create a personalized <br />
              image library.
            </h1>
            <h6>
              “Photography is a way of feeling, of touching, of loving. <br />
              What you have caught on film is captured forever… It remembers
              little things, long after you have forgotten everything.”
              <br /> — Aaron Siskind
            </h6>
          </div>
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

              <button
                type="submit"
                className="btn"
                onClick={this.onButtonClickHandler}
              >
                Upload
              </button>
            </form>
          </div>
          <img src="mail.png" alt="icon" className="ico2" />
        </div>
        <img src="swirl .png" alt="icon" id="icos2" />
        <img src="swirl .png" alt="icon" className="icos" />
      </div>
    );
  }
}

export default ImageUpload;
