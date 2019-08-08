import React, { Fragment, FunctionComponent, FC } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import useApi from "./UseApi";
import DiseaseCard, { DiseaseData } from "./DiseaseCard";

const SearchContainer: FunctionComponent<RouteComponentProps<any>> = ({
  match
}) => {
  const { id = "Alzheimer disease" } = match.params;
  const { data } = useApi(
    `//wwwdev.ebi.ac.uk/uniprot/api/diseaseservice/diseases/${id}`
  );
  if (!data) {
    return null;
  }
  return (
    <Fragment>
      <div className="page-header">
        <h2>"{id}"</h2>
      </div>
      <DiseaseCard data={data.result} />
    </Fragment>
  );
};

export default withRouter(SearchContainer);
