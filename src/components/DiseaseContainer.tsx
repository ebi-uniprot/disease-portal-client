import React, { FunctionComponent } from "react";
import { useParams } from "react-router";
import useApi from "./hooks/UseApi";
import { DiseaseData } from "./cards/DiseaseCard";
import DiseaseCardCompact from "./cards/DiseaseCardCompact";
import { diseasesUrl } from "../urls";

const DiseaseContainer: FunctionComponent = () => {
  const { id } = useParams();
  const { data } = useApi<{ result: DiseaseData }>(diseasesUrl(id));
  if (!data) {
    return null;
  }
  const { result } = data;
  if (!result) {
    return null;
  }
  return <DiseaseCardCompact data={result} />;
};

export default DiseaseContainer;
