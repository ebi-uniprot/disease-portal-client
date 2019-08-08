import React, { Fragment, FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { v1 } from "uuid";
import useApi from "./UseApi";
import DiseaseCard, { DiseaseData } from "./DiseaseCard";

const DiseaseCardContainer: FunctionComponent<RouteComponentProps<any>> = ({
  match
}) => {
  const { id } = match.params;
  const { data } = useApi(
    `//wwwdev.ebi.ac.uk/uniprot/api/diseaseservice/protein/${id}/diseases`
  );
  if (!data) {
    return null;
  }
  return (
    <Fragment>
      <div className="page-header">
        <h2>
          {data.results.length} disease(s) for {id}
        </h2>
      </div>
      {data.results.map((item: DiseaseData) => (
        <DiseaseCard data={item} key={v1()} />
      ))}
    </Fragment>
  );
};

export default DiseaseCardContainer;
