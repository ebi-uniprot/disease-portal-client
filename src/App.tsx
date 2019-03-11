import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FranklinSite, Header, Card } from "franklin-sites";
import "./App.css";
import logo from "./svg/uniprot-rgb.svg";
import SearchComponent from "./search/SearchComponent";

class App extends Component {
  render() {
    return (
      <FranklinSite>
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              exact={true}
              render={() => (
                <Fragment>
                  <Header
                    isHomePage={false}
                    search={<SearchComponent />}
                    logo={<img src={logo} alt="logo" width={120} height={50} />}
                  />
                  <Card title="P05067" children={<p>Some example content</p>} />
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
