import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FranklinSite, Header } from "franklin-sites";
import "./App.css";
import logo from "./svg/uniprot-rgb.svg";
import DiseasesForProteinCardContainer from "./components/DiseasesForProteinCardContainer";
import ProteinsForDiseaseCardContainer from "./components/ProteinsForDiseaseCardContainer";
import PathwaysForProteinCardContainer from "./components/PathwaysForProteinCardContainer";
import VariantsForProteinCardContainer from "./components/VariantsForProteinCardContainer";
import DrugsForDiseaseCardContainer from "./components/DrugsForDiseaseCardContainer";
import DiseaseContainer from "./components/DiseaseContainer";
import { Context } from "./types/context";
import InteractionCardContainer from "./components/InteractionsForProteinCardContainer";
import VariantsForDiseaseCardContainer from "./components/VariantsForDiseaseCardContainer";
import DrugsForProteinCardContainer from "./components/DrugsForProteinCardContainer";

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
                <Route path={"/"} exact={true} component={DiseaseContainer} />
                <Route
                  path={`/${Context.DISEASE}/:id`}
                  component={DiseaseContainer}
                />
                <Route
                  path={`/${Context.DISEASE}/:id/${Context.PROTEIN}`}
                  component={DiseasesForProteinCardContainer}
                />
                <Route
                  path={`/${Context.PROTEIN}/:id/${Context.DISEASE}`}
                  component={ProteinsForDiseaseCardContainer}
                />
                <Route
                  path={`/${Context.PATHWAY}/:id/${Context.PROTEIN}`}
                  component={PathwaysForProteinCardContainer}
                />
                <Route
                  path={`/${Context.VARIANT}/:id/${Context.PROTEIN}`}
                  component={VariantsForProteinCardContainer}
                />
                <Route
                  path={`/${Context.INTERACTION}/:id`}
                  component={InteractionCardContainer}
                />
                <Route
                  path={`/${Context.DRUG}/:id/${Context.DISEASE}`}
                  component={DrugsForDiseaseCardContainer}
                />
                <Route
                  path={`/${Context.DRUG}/:id/${Context.PROTEIN}`}
                  component={DrugsForProteinCardContainer}
                />
                <Route
                  path={`/${Context.VARIANT}/:id/${Context.DISEASE}`}
                  component={VariantsForDiseaseCardContainer}
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
