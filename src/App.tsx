import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FranklinSite, Header, Card } from "franklin-sites";
import "./App.css";
import logo from "./svg/uniprot-rgb.svg";
import CardContainer, { Context } from "./components/CardContainer";

class App extends Component {
  render() {
    return (
      <FranklinSite>
        <BrowserRouter>
          <Switch>
            <Route
              path={`/:context/:id`}
              render={() => (
                <Fragment>
                  <Header
                    logo={<img src={logo} alt="logo" width={120} height={50} />}
                  />
                  <CardContainer />
                </Fragment>
              )}
            />
          </Switch>
        </BrowserRouter>
      </FranklinSite>
    );
  }
}

export default App;
