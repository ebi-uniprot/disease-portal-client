import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FranklinSite, Header } from "franklin-sites";
import "./App.css";
import logo from "./svg/uniprot-rgb.svg";
import DiseasesForProteinCardContainer from "./components/DiseasesForProteinCardContainer";
import ProteinsForDiseaseCardContainer from "./components/ProteinsForDiseaseCardContainer";
import PathwaysForProteinCardContainer from "./components/PathwaysForProteinCardContainer";
import VariantsForProteinCardContainer from "./components/VariantsForProteinCardContainer";
import DrugsForProteinCardContainer from "./components/DrugsForProteinCardContainer";
import LayoutTemplate from "./layout/LayoutTemplate";
import DiseaseContainer from "./components/DiseaseContainer";
import InteractionsForProteinCardContainer from "./components/InteractionsForProteinCardContainer";

class App extends Component {
  render() {
    return (
      <FranklinSite>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div className="wrapper">
            <div className="main-content">
              <LayoutTemplate
                header={
                  <Header
                    className="main-header"
                    logo={<img src={logo} alt="logo" width={120} height={50} />}
                  />
                }
                top={
                  <Route path={"/disease/:id"} component={DiseaseContainer} />
                }
                left={
                  <Switch>
                    <Route
                      path={"/disease/:diseaseid/proteins"}
                      component={ProteinsForDiseaseCardContainer}
                    />
                  </Switch>
                }
                right={
                  <Switch>
                    <Route
                      path={"/disease/:id/proteins/:proteinid/interaction"}
                      component={InteractionsForProteinCardContainer}
                    />
                    <Route
                      path={"/disease/:id/proteins/:proteinid/variants"}
                      component={VariantsForProteinCardContainer}
                    />
                    <Route
                      path={"/disease/:id/proteins/:proteinid/diseases"}
                      component={DiseasesForProteinCardContainer}
                    />
                    <Route
                      path={"/disease/:id/proteins/:proteinid/pathways"}
                      component={PathwaysForProteinCardContainer}
                    />
                    <Route
                      path={"/disease/:id/proteins/:proteinid/drugs"}
                      component={DrugsForProteinCardContainer}
                    />
                  </Switch>
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
            </div>
          </div>
        </BrowserRouter>
      </FranklinSite>
    );
  }
}

export default App;
