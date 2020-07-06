import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import ImageView from "./components/ImageView/ImageView";
import ImageUpload from "./components/ImageUpload/ImageUpload";
// import Header from "./components/Header/Header";
import ResultDisplayed from "./components/ResultDisplayed/ResultDisplayed";

const Router = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/image/:id" component={ImageView} />
        <Route path="/upload" component={ImageUpload} />
        <Route path="/myGallery" component={ResultDisplayed} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
