import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { FranklinSite, Header } from "franklin-sites";

import DiseasesForProteinCardContainer from "./components/DiseasesForProteinCardContainer";
import ProteinsForDiseaseCardContainer from "./components/ProteinsForDiseaseCardContainer";
import PathwaysForProteinCardContainer from "./components/PathwaysForProteinCardContainer";
import VariantsForProteinCardContainer from "./components/VariantsForProteinCardContainer";
import DrugsForProteinCardContainer from "./components/DrugsForProteinCardContainer";
import LayoutTemplate from "./layout/LayoutTemplate";
import DiseaseContainer from "./components/DiseaseContainer";
import InteractionsForProteinCardContainer from "./components/InteractionsForProteinCardContainer";
import ProteinContainer from "./components/ProteinContainer";
import DrugsForDiseaseContainer from "./components/DrugsForDiseaseContainer";
import { ContextObj, Context } from "./types/context";
import ProteinsForDrugsCardContainer from "./components/ProteinsForDrugsCardContainer";
import VariantsForDiseaseContainer from "./components/VariantsForDiseaseContainer";

import logo from "./svg/uniprot-rgb.svg";

import "./App.css";
class App extends Component {
  render() {
    return (
      <FranklinSite>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Route exact path="/">
            <Redirect
              to={`/${ContextObj[Context.DISEASE].id}/DI-03832/${
                ContextObj[Context.PROTEIN].id
              }`}
            />
          </Route>
          <LayoutTemplate
            header={
              <Header
                className="main-header"
                logo={<img src={logo} alt="logo" width={120} height={50} />}
                links={[
                  {
                    label: "UniProt website",
                    href: "https://www.uniprot.org",
                  },
                  {
                    label: "Feedback",
                    href: "https://forms.gle/cYB8jScHtjaAsTuB8",
                  },
                ]}
              />
            }
            top={
              <Route
                path={`/${ContextObj[Context.DISEASE].id}/:id`}
                component={DiseaseContainer}
              />
            }
            left={
              <>
                <Route
                  path={`/${ContextObj[Context.DISEASE].id}/:diseaseid/${
                    ContextObj[Context.PROTEIN].id
                  }/:proteinid?`}
                  component={ProteinsForDiseaseCardContainer}
                />
              </>
            }
            right={
              <>
                <Route
                  path={`/${ContextObj[Context.DISEASE].id}/:id/${
                    ContextObj[Context.PROTEIN].id
                  }/:proteinid/${ContextObj[Context.PROTEIN].id}`}
                  exact
                  component={ProteinContainer}
                />
                <Route
                  path={`/${ContextObj[Context.DISEASE].id}/:id/${
                    ContextObj[Context.PROTEIN].id
                  }/:proteinid/${ContextObj[Context.INTERACTION].id}`}
                  component={InteractionsForProteinCardContainer}
                />
                <Route
                  path={`/${ContextObj[Context.DISEASE].id}/:id/${
                    ContextObj[Context.PROTEIN].id
                  }/:proteinid/${ContextObj[Context.VARIANT].id}`}
                  component={VariantsForProteinCardContainer}
                />
                <Route
                  path={`/${ContextObj[Context.DISEASE].id}/:id/${
                    ContextObj[Context.PROTEIN].id
                  }/:proteinid/${ContextObj[Context.DISEASE].id}`}
                  component={DiseasesForProteinCardContainer}
                />
                <Route
                  path={`/${ContextObj[Context.DISEASE].id}/:id/${
                    ContextObj[Context.PROTEIN].id
                  }/:proteinid/${ContextObj[Context.PATHWAY].id}`}
                  component={PathwaysForProteinCardContainer}
                />
                <Route
                  path={`/${ContextObj[Context.DISEASE].id}/:id/${
                    ContextObj[Context.PROTEIN].id
                  }/:proteinid/${ContextObj[Context.DRUG].id}`}
                  component={DrugsForProteinCardContainer}
                />
                <Route
                  path={`/${ContextObj[Context.DISEASE].id}/:id/${
                    ContextObj[Context.DRUG].id
                  }/:drugid/${ContextObj[Context.PROTEIN].id}`}
                  component={ProteinsForDrugsCardContainer}
                />
                <Route
                  path={`/${ContextObj[Context.DISEASE].id}/:diseaseid/${
                    ContextObj[Context.DRUG].id
                  }`}
                  component={DrugsForDiseaseContainer}
                />
                <Route
                  path={`/${ContextObj[Context.DISEASE].id}/:diseaseid/${
                    ContextObj[Context.VARIANT].id
                  }`}
                  component={VariantsForDiseaseContainer}
                />
              </>
            }
            footer={<small>&copy;2020 UniProt Consortium</small>}
          />
        </BrowserRouter>
      </FranklinSite>
    );
  }
}

export default App;
