import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { FranklinSite, Header } from "franklin-sites";
import DiseasesForProteinCardContainer from "./components/DiseasesForProteinCardContainer";
import ProteinsForDiseaseCardContainer from "./components/ProteinsForDiseaseCardContainer";
import PathwaysForProteinCardContainer from "./components/PathwaysForProteinCardContainer";
import VariantsForProteinCardContainer from "./components/VariantsForProteinCardContainer";
import DrugsForProteinCardContainer from "./components/DrugsForProteinCardContainer";
import LayoutTemplate from "./layout/LayoutTemplate";
import DiseaseContainer from "./components/DiseaseContainer";
import InteractionsForProteinCardContainer from "./components/InteractionsForProteinCardContainer";
import logo from "./svg/uniprot-rgb.svg";

import "./App.css";
import ProteinContainer from "./components/ProteinContainer";

class App extends Component {
  render() {
    return (
      <FranklinSite>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/disease/Alzheimer%20disease/proteins" />
            </Route>
            <LayoutTemplate
              header={
                <Header
                  className="main-header"
                  logo={<img src={logo} alt="logo" width={120} height={50} />}
                />
              }
              top={<Route path={"/disease/:id"} component={DiseaseContainer} />}
              left={
                <Route
                  path={"/disease/:diseaseid/proteins/:proteinid?"}
                  component={ProteinsForDiseaseCardContainer}
                />
              }
              right={
                <>
                  <Route
                    path={"/disease/:id/proteins/:proteinid/protein"}
                    component={ProteinContainer}
                  />
                  <Route
                    path={"/disease/:id/proteins/:proteinid/interaction"}
                    component={InteractionsForProteinCardContainer}
                  />
                  <Route
                    path={"/disease/:id/proteins/:proteinid/variant"}
                    component={VariantsForProteinCardContainer}
                  />
                  <Route
                    path={"/disease/:id/proteins/:proteinid/disease"}
                    component={DiseasesForProteinCardContainer}
                  />
                  <Route
                    path={"/disease/:id/proteins/:proteinid/pathway"}
                    component={PathwaysForProteinCardContainer}
                  />
                  <Route
                    path={"/disease/:id/proteins/:proteinid/drug"}
                    component={DrugsForProteinCardContainer}
                  />
                </>
              }
              footer={<small>&copy; 2019 UniProt Consortium</small>}
            />
            {/* <Switch>
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
                <Route
                  path={`/${Context.DISEASE}/:id/${Context.DRUG}`}
                  component={DiseasesForDrugsCardContainer}
                />
                <Route
                  path={`/${Context.PROTEIN}/:id/${Context.DRUG}`}
                  component={ProteinsForDrugsCardContainer}
                />
              </Switch> */}
          </Switch>
        </BrowserRouter>
      </FranklinSite>
    );
  }
}

export default App;
