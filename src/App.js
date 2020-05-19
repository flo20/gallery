import React, { Component } from "react";
import ImageSearch from "./components/ImageSearch/ImageSearch";
import ImageList from "./components/ImageList/ImageList";

const api_key = "16628696-7ff6f3f64089c2a1c30e04a40";

class App extends Component {
  state = {
    images: [],
  };
  handleGetRequest = async (e) => {
    e.preventDefault(); //prevent reload of page

    const searchTerm = e.target.elements.searchValue.value;

    const url = `https://pixabay.com/api/?key=${api_key}&q=${searchTerm}&image_type=photo`;

    console.log(this.state.images);

    const request = await fetch(url);

    const response = await request.json();
    // console.log(response.hits);

    this.setState({ images: response.hits });

    console.log(searchTerm);
  };

  // componentDidMount() {
  //   this.handleGetRequest();
  // }
  render() {
    return (
      <div>
        <ImageSearch handleGetRequest={this.handleGetRequest} />

        {/* {this.state.images.length > 0 &&
          this.state.images.map((image) => {
            return <p key={image.id}>{image.tags}</p>;
          })} */}
        <ImageList images={this.state.images} />
      </div>
    );
  }
}

export default App;
