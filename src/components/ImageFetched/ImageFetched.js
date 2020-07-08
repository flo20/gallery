import React, { Component } from "react";
import reuslts from "../../axios-gallery";
import ImageDisplay from "../ImageDisplay/ImageDisplay";
import "./ImageFetched.css";

export class ImageFetched extends Component {
  state = {
    outcome: [],
  };

  //fetching data from backend of firebase
  componentDidMount() {
    reuslts.get("./gallery.json").then((response) => {
      console.log(response.data);
      const fetchedOutcome = [];
      for (let key in response.data) {
        fetchedOutcome.unshift({
          ...response.data[key],
          id: key,
        });
      }
      this.setState({ outcome: fetchedOutcome });
    });
  }

  render() {
    return (
      <>
        <div>
          <div className="display_wrapper">
            {this.state.outcome.map((outcomes) => (
              <ImageDisplay
                key={outcomes.id}
                name={outcomes.name}
                image={outcomes.image}
                tags={outcomes.tags}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default ImageFetched;
