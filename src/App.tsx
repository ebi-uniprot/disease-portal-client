import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FranklinSite, Header } from "franklin-sites";
import "./App.css";
import logo from "./svg/uniprot-rgb.svg";
import DiseaseCardContainer from "./components/DiseaseCardContainer";
import ProteinCardContainer from "./components/ProteinCardContainer";
import PathwayCardContainer from "./components/PathwayCardContainer";
import VariantCardContainer from "./components/VariantCardContainer";
import DrugsCardContainer from "./components/DrugsCardContainer";
import SearchContainer from "./components/SearchContainer";
import { Context } from "./types/context";
import InteractionCardContainer from "./components/InteractionCardContainer";

class App extends Component {
  render() {
    return (
      <FranklinSite>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div className="wrapper">
            <Header
              className="main-header"
              logo={<img src={logo} alt="logo" width={120} height={50} />}
            />
            <div className="main-content">
              <Switch>
                <Route path={"/"} exact={true} component={SearchContainer} />
                <Route path={"/search/:term"} component={SearchContainer} />
                <Route
                  path={`/${Context.DISEASE}/:id`}
                  component={DiseaseCardContainer}
                />
                <Route
                  path={`/${Context.PROTEIN}/:id`}
                  component={ProteinCardContainer}
                />
                <Route
                  path={`/${Context.PATHWAY}/:id`}
                  component={PathwayCardContainer}
                />
                <Route
                  path={`/${Context.VARIANT}/:id`}
                  component={VariantCardContainer}
                />
                <Route
                  path={`/${Context.INTERACTION}/:id`}
                  component={InteractionCardContainer}
                />
                <Route
                  path={`/${Context.DRUGS}/:id`}
                  component={DrugsCardContainer}
                />
              </Switch>
            </div>
            <div className="main-footer">
              <small>&copy; 2019 UniProt Consortium</small>
            </div>
          </div>
        </BrowserRouter>
      </FranklinSite>
    );
  }
}

export default App;
