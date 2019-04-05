import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FranklinSite } from "franklin-sites";
import "./App.css";
import CardContainer from "./components/CardContainer";

class App extends Component {
  render() {
    return (
      <FranklinSite>
        <BrowserRouter>
          <Switch>
            <Route path={["/:context/:id", "/"]} component={CardContainer} />
          </Switch>
        </BrowserRouter>
      </FranklinSite>
    );
  }
}

export default App;
