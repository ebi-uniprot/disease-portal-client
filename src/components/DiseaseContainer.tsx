import React, { Fragment, FunctionComponent, FC } from "react";
import useApi from "./UseApi";
import DiseaseCard, { DiseaseData } from "./cards/DiseaseCard";

const DiseaseContainer: FunctionComponent<{ id: string }> = ({ id }) => {
  const { data } = useApi(
    `//wwwdev.ebi.ac.uk/uniprot/api/diseaseservice/diseases/${id}`
  );
  if (!data) {
    return null;
  }
  return <DiseaseCard data={data.result} />;
};

export default DiseaseContainer;
