import React, { Fragment, FunctionComponent, FC } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import useApi from "./UseApi";
import DiseaseCard, { DiseaseData } from "./cards/DiseaseCard";
import "../PageContainer.css";

const DiseaseContainer: FunctionComponent<{ id: string }> = ({ id }) => {
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

export default DiseaseContainer;
