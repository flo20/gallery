import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import ResultDisplayed from "./components/ResultDisplayed/ResultDisplayed";
import SignUp from "./components/Authentication/SignUp";
import SignIn from "./components/Authentication/SignIn";
import { AuthProvider } from "./context/AuthContext";

const Router = () => {
  return (
		<BrowserRouter>
			<AuthProvider>
				<Switch>
					<Route
						exact
						path="/"
						component={App}
					/>
					<Route
						path="/signin"
						component={SignIn}
					/>
					<Route
						path="/signup"
						component={SignUp}
					/>
					<Route
						path="/upload"
						component={ImageUpload}
					/>
					<Route
						path="/gallery"
						component={ResultDisplayed}
					/>
				</Switch>
			</AuthProvider>
		</BrowserRouter>
	)
};

export default Router;
